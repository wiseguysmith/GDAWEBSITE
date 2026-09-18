import "server-only";

/**
 * Deduplicates retried submissions for a short window using the client's
 * attempt key. Shared through Upstash when configured; per-instance otherwise.
 */
const WINDOW_SECONDS = 600;
const memory = new Map<string, { id: string; result?: string; expires: number }>();

type Stored = { id: string; result?: string };

async function upstash(...args: (string | number)[]): Promise<unknown> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return undefined;
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(args),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Upstash error ${res.status}`);
  return ((await res.json()) as { result: unknown }).result;
}

const hasUpstash = () => Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);

export async function findPrevious(attemptKey: string): Promise<Stored | undefined> {
  if (hasUpstash()) {
    const raw = await upstash("GET", `idem:${attemptKey}`);
    return typeof raw === "string" ? (JSON.parse(raw) as Stored) : undefined;
  }
  const hit = memory.get(attemptKey);
  if (hit && hit.expires > Date.now()) return { id: hit.id, result: hit.result };
  if (hit) memory.delete(attemptKey);
  return undefined;
}

export async function remember(attemptKey: string, value: Stored): Promise<void> {
  if (hasUpstash()) {
    await upstash("SET", `idem:${attemptKey}`, JSON.stringify(value), "EX", WINDOW_SECONDS);
    return;
  }
  memory.set(attemptKey, { ...value, expires: Date.now() + WINDOW_SECONDS * 1000 });
  if (memory.size > 5000) {
    const now = Date.now();
    for (const [k, v] of memory) if (v.expires <= now) memory.delete(k);
  }
}
