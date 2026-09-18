import "server-only";

/**
 * Sliding-window rate limiter with two backends:
 *  - Upstash Redis over REST when UPSTASH_REDIS_REST_URL/TOKEN are set (shared across serverless instances)
 *  - In-memory fallback (per instance; adequate for development and low traffic)
 */

export type RateLimitResult = { ok: boolean; remaining: number; retryAfterSeconds: number };

export interface RateLimiter {
  check(key: string, limit: number, windowSeconds: number): Promise<RateLimitResult>;
}

class MemoryRateLimiter implements RateLimiter {
  private hits = new Map<string, number[]>();

  async check(key: string, limit: number, windowSeconds: number): Promise<RateLimitResult> {
    const now = Date.now();
    const windowMs = windowSeconds * 1000;
    const recent = (this.hits.get(key) ?? []).filter((t) => now - t < windowMs);
    if (recent.length >= limit) {
      const oldest = recent[0];
      return { ok: false, remaining: 0, retryAfterSeconds: Math.ceil((oldest + windowMs - now) / 1000) };
    }
    recent.push(now);
    this.hits.set(key, recent);
    // Opportunistic cleanup so the map cannot grow without bound.
    if (this.hits.size > 10_000) {
      for (const [k, v] of this.hits) {
        if (v.every((t) => now - t >= windowMs)) this.hits.delete(k);
      }
    }
    return { ok: true, remaining: limit - recent.length, retryAfterSeconds: 0 };
  }
}

class UpstashRateLimiter implements RateLimiter {
  constructor(
    private url: string,
    private token: string,
  ) {}

  private async command(...args: (string | number)[]): Promise<unknown> {
    const res = await fetch(this.url, {
      method: "POST",
      headers: { Authorization: `Bearer ${this.token}`, "Content-Type": "application/json" },
      body: JSON.stringify(args),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Upstash error ${res.status}`);
    const data = (await res.json()) as { result: unknown };
    return data.result;
  }

  async check(key: string, limit: number, windowSeconds: number): Promise<RateLimitResult> {
    // Fixed-window counter keyed by window start — simple, cheap and shared.
    const windowStart = Math.floor(Date.now() / 1000 / windowSeconds) * windowSeconds;
    const redisKey = `rl:${key}:${windowStart}`;
    const count = Number(await this.command("INCR", redisKey));
    if (count === 1) await this.command("EXPIRE", redisKey, windowSeconds);
    const ok = count <= limit;
    const retryAfterSeconds = ok ? 0 : windowStart + windowSeconds - Math.floor(Date.now() / 1000);
    return { ok, remaining: Math.max(0, limit - count), retryAfterSeconds };
  }
}

let instance: RateLimiter | undefined;

export function getRateLimiter(): RateLimiter {
  if (instance) return instance;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  instance = url && token ? new UpstashRateLimiter(url, token) : new MemoryRateLimiter();
  return instance;
}
