import { retention } from "@/config/retention";
import type { LegalDocument } from "../types";

/**
 * Describes only controls that actually exist (handoff §10, §30).
 * If a control changes in code, change it here in the same commit.
 */
export const security: LegalDocument = {
  meta: {
    title: "Security",
    description: "How Global Digital Access handles the information submitted through this website.",
  },
  title: "Information handling",
  intro:
    "This page describes how information submitted through this website is handled today. It states what is implemented, not what is planned, and it makes no claims about certifications or controls that do not exist.",
  version: "1.0",
  updatedAt: "2026-09-18",
  sections: [
    {
      heading: "What the website collects",
      paragraphs: [
        "The website collects only what its forms ask for: the answers to the Project Fit Check, the Investor Access request and the Contact form, together with the contact details you provide. It does not collect identity documents, passports, corporate formation documents, source-of-funds documentation or other sensitive verification files. Where such verification is required in future, it will be performed through the appropriate licensed or qualified provider, not through this website.",
      ],
    },
    {
      heading: "Transport",
      paragraphs: [
        "The website is served over HTTPS. Form submissions travel over the same encrypted connection to GDA's submission endpoint.",
      ],
    },
    {
      heading: "Where submissions go",
      paragraphs: [
        "Each submission is validated on the server, assigned a reference number, written to GDA's submission record, and notified to a GDA inbox by email. A confirmation email restating the on-screen result is sent to the address you provide.",
        "Access to submission records and the notification inbox is limited to the GDA team members who handle enquiries.",
      ],
    },
    {
      heading: "Protection of the forms",
      paragraphs: [
        "Submissions are validated against a schema on the server, rate-limited per network address and per email address, and screened for automated abuse using a hidden field and a minimum completion time. Where Cloudflare Turnstile is enabled, it provides an additional bot check.",
        "For rate limiting, the website keeps a one-way salted hash of the network address for a short period. The address itself is not stored with your submission.",
      ],
    },
    {
      heading: "Your browser",
      paragraphs: [
        "While you complete a flow, your answers to the questions (but never your contact details) are saved in your own browser so you can resume if interrupted. This draft is cleared when you submit and expires after " +
          `${retention.localDraftDays} days. You can clear it at any time from the flow.`,
      ],
    },
    {
      heading: "Retention",
      paragraphs: [
        `Fit Check and Investor Access submissions are retained for up to ${Math.round(retention.submissionsDays / 365)} years from submission. Contact enquiries are retained for up to ${Math.round(retention.contactDays / 365)} year. Rate-limiting hashes are retained for up to ${retention.rateLimitHashDays} days.`,
        retention.enforcement === "manual"
          ? "Retention is currently applied manually by the GDA team on a periodic review of the submission record."
          : "Retention is applied automatically by a scheduled process.",
      ],
    },
    {
      heading: "Analytics",
      paragraphs: [
        "If analytics is enabled, it is a privacy-conscious, cookieless service that records page views and a small set of named events (for example, that a Fit Check was started or completed). Form answers, names, email addresses and other personal information are never sent to analytics.",
      ],
    },
    {
      heading: "Website security headers",
      paragraphs: [
        "The website sends standard browser security headers, including a Content Security Policy, HTTP Strict Transport Security, and headers that prevent framing by other sites and MIME-type sniffing.",
      ],
    },
    {
      heading: "What is not claimed",
      paragraphs: [
        "GDA does not claim any security certification (such as SOC 2 or ISO 27001) for this website, and does not describe controls it has not implemented. If that changes, this page will change.",
      ],
    },
  ],
};
