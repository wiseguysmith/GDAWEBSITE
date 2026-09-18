import "server-only";

/**
 * Spam defences that need no third party: a honeypot field that humans never
 * see and a minimum time-to-submit. Cloudflare Turnstile is verified in
 * addition when a secret key is configured.
 */

import { minimumFillMs } from "./spam-shared";

export { honeypotField, minimumFillMs } from "./spam-shared";

export type SpamCheckInput = {
  honeypot?: string;
  startedAt?: number; // client timestamp when the flow began
  turnstileToken?: string;
  ip?: string;
};

export type SpamCheckResult = { ok: true } | { ok: false; reason: string };

export async function checkSpam(input: SpamCheckInput): Promise<SpamCheckResult> {
  if (input.honeypot && input.honeypot.trim().length > 0) {
    return { ok: false, reason: "honeypot" };
  }
  if (typeof input.startedAt === "number" && Date.now() - input.startedAt < minimumFillMs) {
    return { ok: false, reason: "too-fast" };
  }
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (secret) {
    if (!input.turnstileToken) return { ok: false, reason: "turnstile-missing" };
    const verified = await verifyTurnstile(secret, input.turnstileToken, input.ip);
    if (!verified) return { ok: false, reason: "turnstile-failed" };
  }
  return { ok: true };
}

async function verifyTurnstile(secret: string, token: string, ip?: string): Promise<boolean> {
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.set("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      cache: "no-store",
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}
