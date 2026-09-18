import "server-only";
import type { Submission, SubmissionAdapter } from "./types";

/**
 * HubSpot adapter via the Forms API (no private app token needed).
 * Map each submission kind to a HubSpot form and its portal:
 *   HUBSPOT_PORTAL_ID, HUBSPOT_FORM_FIT_CHECK, HUBSPOT_FORM_INVESTOR_ACCESS, HUBSPOT_FORM_CONTACT
 * Field names in HubSpot must match the keys sent below (email, firstname… are
 * standard; custom properties like gda_reference must be created in the portal).
 */
export function createHubspotAdapter(): SubmissionAdapter | null {
  const portalId = process.env.HUBSPOT_PORTAL_ID;
  if (!portalId) return null;

  const formFor = (kind: Submission["kind"]) =>
    ({
      "fit-check": process.env.HUBSPOT_FORM_FIT_CHECK,
      "investor-access": process.env.HUBSPOT_FORM_INVESTOR_ACCESS,
      contact: process.env.HUBSPOT_FORM_CONTACT,
    })[kind];

  return {
    name: "hubspot",
    async notify(submission: Submission) {
      const formGuid = formFor(submission.kind);
      if (!formGuid) return; // Not configured for this kind — skip quietly.
      const a = submission.answers;
      const fields = [
        { name: "email", value: String(a.email ?? "") },
        { name: "firstname", value: String(a.name ?? "") },
        { name: "company", value: String(a.organisation ?? "") },
        { name: "jobtitle", value: String(a.role ?? "") },
        { name: "phone", value: String(a.phone ?? "") },
        { name: "gda_reference", value: submission.id },
        { name: "gda_kind", value: submission.kind },
        { name: "gda_result", value: submission.result ?? "" },
        { name: "gda_tags", value: submission.tags.join(", ") },
        { name: "gda_answers", value: JSON.stringify(a) },
      ].filter((f) => f.value !== "");

      const res = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields,
          context: { pageUri: submission.meta.referrer, pageName: submission.kind },
          legalConsentOptions: {
            consent: { consentToProcess: true, text: "Consent given on the GDA website form." },
          },
        }),
        cache: "no-store",
      });
      if (!res.ok) {
        const detail = await res.text().catch(() => "");
        throw new Error(`HubSpot submit failed: ${res.status} ${detail.slice(0, 200)}`);
      }
    },
  };
}
