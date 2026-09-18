import "server-only";
import type { Submission, SubmissionAdapter } from "./types";

/**
 * Airtable adapter — the recommended durable record at launch (decision I-9).
 * One table per submission kind, or one table with a Kind column: configure
 * AIRTABLE_TABLE_FIT_CHECK, AIRTABLE_TABLE_INVESTOR_ACCESS, AIRTABLE_TABLE_CONTACT
 * (falling back to AIRTABLE_TABLE for all three).
 *
 * Fields written: Reference, Kind, Result, Tags, Locale, Received, Answers (JSON),
 * plus the individual contact fields for filtering. Create these columns in the
 * base; Airtable rejects unknown field names unless typecast is on.
 *
 * Env: AIRTABLE_TOKEN (personal access token with data.records:write), AIRTABLE_BASE_ID.
 */
export function createAirtableAdapter(): SubmissionAdapter | null {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  if (!token || !baseId) return null;

  const tableFor = (kind: Submission["kind"]) => {
    const specific = {
      "fit-check": process.env.AIRTABLE_TABLE_FIT_CHECK,
      "investor-access": process.env.AIRTABLE_TABLE_INVESTOR_ACCESS,
      contact: process.env.AIRTABLE_TABLE_CONTACT,
    }[kind];
    return specific ?? process.env.AIRTABLE_TABLE ?? "Submissions";
  };

  return {
    name: "airtable",
    async persist(submission: Submission) {
      const table = encodeURIComponent(tableFor(submission.kind));
      const a = submission.answers;
      const fields: Record<string, unknown> = {
        Reference: submission.id,
        Kind: submission.kind,
        Result: submission.result ?? "",
        Tags: submission.tags.join(", "),
        Locale: submission.locale,
        Received: submission.createdAt,
        Name: typeof a.name === "string" ? a.name : "",
        Email: typeof a.email === "string" ? a.email : "",
        Organisation: typeof a.organisation === "string" ? a.organisation : "",
        Country: typeof a.country === "string" ? a.country : "",
        Answers: JSON.stringify(a),
      };

      const res = await fetch(`https://api.airtable.com/v0/${baseId}/${table}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ records: [{ fields }], typecast: true }),
        cache: "no-store",
      });
      if (!res.ok) {
        const detail = await res.text().catch(() => "");
        throw new Error(`Airtable persist failed: ${res.status} ${detail.slice(0, 200)}`);
      }
    },
  };
}
