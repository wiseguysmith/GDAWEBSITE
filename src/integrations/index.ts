import "server-only";
import { createAirtableAdapter } from "./airtable";
import { createEmailAdapter } from "./email";
import { createHubspotAdapter } from "./hubspot";
import { logAdapter } from "./log";
import type { Submission, SubmissionAdapter } from "./types";
import { createWebhookAdapter } from "./webhook";

/**
 * Composes adapters from the environment (handoff §35: adapter-based, no
 * vendor coupling in components).
 *
 * SUBMISSIONS_PRIMARY names the adapter whose `persist` must succeed:
 *   "airtable" | "webhook" | "log"   (default: airtable if configured, else webhook, else log)
 * Every other configured adapter runs as a secondary, best-effort.
 *
 * In production, a primary of "log" is refused unless SUBMISSIONS_ALLOW_LOG_PRIMARY=1,
 * because a log line is not a durable record.
 */

export type DeliveryReport = {
  primary: string;
  secondaries: { name: string; ok: boolean; error?: string }[];
};

function configuredAdapters(): SubmissionAdapter[] {
  return [createAirtableAdapter(), createWebhookAdapter(), createEmailAdapter(), createHubspotAdapter()].filter(
    (a): a is SubmissionAdapter => a !== null,
  );
}

export function resolveAdapters(): { primary: SubmissionAdapter; secondaries: SubmissionAdapter[] } {
  const adapters = configuredAdapters();
  const wanted = process.env.SUBMISSIONS_PRIMARY;
  const persisters = adapters.filter((a) => typeof a.persist === "function");

  let primary = wanted ? persisters.find((a) => a.name === wanted) : persisters[0];
  if (!primary) {
    const isProd = process.env.NODE_ENV === "production" && process.env.VERCEL_ENV === "production";
    if (isProd && process.env.SUBMISSIONS_ALLOW_LOG_PRIMARY !== "1") {
      throw new Error("No durable submission adapter configured. Set AIRTABLE_* or SUBMISSIONS_WEBHOOK_URL.");
    }
    primary = logAdapter;
  }

  const secondaries = adapters.filter((a) => a !== primary);
  return { primary, secondaries };
}

/** Persists through the primary (must succeed), then fans out to secondaries. */
export async function deliver(submission: Submission): Promise<DeliveryReport> {
  const { primary, secondaries } = resolveAdapters();

  await primary.persist?.(submission);
  // The primary may also notify (e.g. webhook only persists; airtable only persists).
  const report: DeliveryReport = { primary: primary.name, secondaries: [] };

  const results = await Promise.allSettled(
    secondaries.map(async (adapter) => {
      await adapter.persist?.(submission);
      await adapter.notify?.(submission);
    }),
  );
  results.forEach((r, i) => {
    const name = secondaries[i].name;
    if (r.status === "fulfilled") report.secondaries.push({ name, ok: true });
    else {
      const error = r.reason instanceof Error ? r.reason.message : String(r.reason);
      console.error(`[submission] ${submission.id} secondary "${name}" failed: ${error}`);
      report.secondaries.push({ name, ok: false, error });
    }
  });

  // The primary's own notify (if any) runs last so a notify failure never masks a successful persist.
  if (primary.notify) {
    try {
      await primary.notify(submission);
    } catch (err) {
      console.error(`[submission] ${submission.id} primary notify failed: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
  return report;
}
