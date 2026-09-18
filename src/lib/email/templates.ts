import { content } from "@/content";
import { site } from "@/config/site";
import { countryName } from "@/lib/countries";
import { escapeHtml } from "@/lib/security/sanitize";
import type { Submission } from "@/integrations/types";

/**
 * Plain, institutional email bodies. The confirmation restates the on-screen
 * result copy verbatim (handoff §13) and never uses "accepted" or "approved".
 */

type Email = { subject: string; text: string; html: string };

const labelFor: Record<string, string> = {
  projectType: "Project type",
  projectTypeOther: "Project type (other)",
  country: "Country",
  region: "Region / state",
  entityElsewhere: "Entity organised elsewhere",
  entityCountry: "Entity country",
  stage: "Stage",
  relationship: "Relationship",
  relationshipOther: "Relationship (other)",
  objective: "Primary objective",
  objectivesAlso: "Also relevant",
  objectiveOther: "Objective (other)",
  value: "Approximate value",
  capital: "Capital sought",
  name: "Name",
  organisation: "Organisation",
  role: "Role",
  email: "Email",
  phone: "Phone",
  language: "Preferred language",
  comments: "Comments",
  investorType: "Investor type",
  investorTypeOther: "Investor type (other)",
  interests: "Areas of interest",
  allocation: "Allocation range",
  status: "Investor status (self-described)",
  type: "Enquiry type",
  message: "Message",
};

function formatValue(key: string, value: unknown): string {
  if (value === undefined || value === null || value === "") return "—";
  if (key === "country" || key === "entityCountry") return countryName(String(value));
  if (Array.isArray(value)) return value.length ? value.join(", ") : "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
}

function answersRows(answers: Record<string, unknown>): { label: string; value: string }[] {
  return Object.entries(answers)
    .filter(([key]) => key !== "consent")
    .map(([key, value]) => ({ label: labelFor[key] ?? key, value: formatValue(key, value) }));
}

function shell(title: string, bodyHtml: string): string {
  return `<!doctype html><html><body style="margin:0;background:#f4f5f7;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#0e1420">
<div style="max-width:600px;margin:0 auto;padding:32px 20px">
  <p style="font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#4b5566;margin:0 0 24px">${escapeHtml(site.name)}</p>
  <h1 style="font-size:24px;font-weight:500;letter-spacing:-.01em;margin:0 0 16px">${escapeHtml(title)}</h1>
  ${bodyHtml}
  <p style="font-size:12px;line-height:1.6;color:#4b5566;border-top:1px solid rgba(14,20,32,.12);padding-top:16px;margin-top:32px">${escapeHtml(content.legal.standing)}</p>
</div></body></html>`;
}

function paragraphs(items: string[]): string {
  return items.map((p) => `<p style="font-size:16px;line-height:1.6;margin:0 0 12px">${escapeHtml(p)}</p>`).join("");
}

function table(rows: { label: string; value: string }[]): string {
  return `<table style="width:100%;border-collapse:collapse;font-size:14px;margin-top:16px">${rows
    .map(
      (r) =>
        `<tr><td style="padding:8px 12px 8px 0;color:#4b5566;vertical-align:top;border-top:1px solid rgba(14,20,32,.12);white-space:nowrap">${escapeHtml(r.label)}</td><td style="padding:8px 0;border-top:1px solid rgba(14,20,32,.12)">${escapeHtml(r.value)}</td></tr>`,
    )
    .join("")}</table>`;
}

/** Sent to the person who submitted. */
export function confirmationEmail(submission: Submission): Email {
  const ref = submission.id;
  let heading: string;
  let body: string[];

  if (submission.kind === "fit-check") {
    const result = content.fitCheck.results[submission.result as keyof typeof content.fitCheck.results] ?? content.fitCheck.results["submitted-for-review"];
    heading = result.heading;
    body = [...result.paragraphs];
  } else if (submission.kind === "investor-access") {
    heading = content.investorAccess.results.received.heading;
    body = [...content.investorAccess.results.received.paragraphs];
  } else {
    heading = content.contact.confirmation.heading;
    body = [content.contact.confirmation.body];
  }

  const kindLabel = submission.kind === "fit-check" ? "Fit Check" : submission.kind === "investor-access" ? "Investor Access request" : "Enquiry";
  const subject = `${kindLabel} received — reference ${ref}`;
  const text = [heading, "", ...body, "", `Reference: ${ref}`, "", content.legal.standing].join("\n");
  const html = shell(heading, `${paragraphs(body)}<p style="font-family:ui-monospace,Menlo,monospace;font-size:13px;color:#4b5566;margin-top:16px">Reference ${escapeHtml(ref)}</p>`);
  return { subject, text, html };
}

/** Sent to the GDA inbox. */
export function notificationEmail(submission: Submission): Email {
  const rows = answersRows(submission.answers);
  const subject = `[${submission.kind}] ${submission.id}${submission.result ? ` · ${submission.result}` : ""}`;
  const summary = [`Reference: ${submission.id}`, `Kind: ${submission.kind}`, `Result: ${submission.result ?? "-"}`, `Tags: ${submission.tags.join(", ") || "-"}`, `Received: ${submission.createdAt}`];
  const text = [...summary, "", ...rows.map((r) => `${r.label}: ${r.value}`)].join("\n");
  const html = shell(
    `New ${submission.kind} submission`,
    `${paragraphs(summary)}${table(rows)}`,
  );
  return { subject, text, html };
}
