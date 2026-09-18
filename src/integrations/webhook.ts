import "server-only";
import { createHmac } from "node:crypto";
import type { Submission, SubmissionAdapter } from "./types";

/**
 * Generic webhook adapter for any other approved destination (Zapier, Make,
 * an internal service). Signs the body with HMAC-SHA256 when a secret is set
 * so the receiver can verify origin.
 *
 * Env: SUBMISSIONS_WEBHOOK_URL, SUBMISSIONS_WEBHOOK_SECRET (optional).
 */
export function createWebhookAdapter(): SubmissionAdapter | null {
  const url = process.env.SUBMISSIONS_WEBHOOK_URL;
  if (!url) return null;
  const secret = process.env.SUBMISSIONS_WEBHOOK_SECRET;

  return {
    name: "webhook",
    async persist(submission: Submission) {
      const body = JSON.stringify(submission);
      const headers: Record<string, string> = { "Content-Type": "application/json", "X-GDA-Submission": submission.id };
      if (secret) headers["X-GDA-Signature"] = createHmac("sha256", secret).update(body).digest("hex");
      const res = await fetch(url, { method: "POST", headers, body, cache: "no-store" });
      if (!res.ok) throw new Error(`Webhook failed: ${res.status}`);
    },
  };
}
