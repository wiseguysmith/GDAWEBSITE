import { retention } from "@/config/retention";
import { site } from "@/config/site";
import type { LegalDocument } from "../types";

/**
 * Working copy until reviewed by counsel. Must reflect actual behaviour
 * (handoff §31). Data-protection regimes in the operating footprint include
 * US state law, Brazil's LGPD and Colombia's Ley 1581 — counsel to confirm
 * the applicable framework and rights language.
 */
export const privacy: LegalDocument = {
  meta: {
    title: "Privacy Policy — Global Digital Access",
    description: "How Global Digital Access collects, uses and retains personal information submitted through this website.",
  },
  title: "Privacy policy",
  intro: "This policy explains what personal information this website collects, why, who it is shared with, how long it is kept, and the choices you have.",
  version: "0.1 (working copy — pending counsel review)",
  updatedAt: "2026-09-18",
  sections: [
    {
      heading: "Who is responsible",
      paragraphs: [
        `${site.legal.entityName}, ${site.legal.address}, is responsible for personal information collected through this website. Privacy enquiries: ${site.contact.privacyEmail}.`,
      ],
    },
    {
      heading: "What we collect",
      paragraphs: ["We collect only what you provide through the website's forms:"],
      bullets: [
        "Project Fit Check: project type, location and jurisdiction, stage, your relationship to the project, objective, approximate value ranges, and your name, organisation, role, email, optional phone, preferred language and optional comments.",
        "Investor Access request: investor type, jurisdiction, areas of interest, optional allocation range, your self-described investor status, and your name, organisation, role, email, optional phone and preferred language.",
        "Contact form: enquiry type, name, organisation, email and message.",
        "Technical information needed to protect the forms: a salted one-way hash of your network address, the time the form was started, and standard request metadata such as browser type and referring page.",
      ],
    },
    {
      heading: "What we do not collect",
      paragraphs: [
        "We do not collect identity documents, government identifiers, financial account details, source-of-funds documentation or other sensitive verification information through this website. We do not use advertising trackers. If analytics is enabled, it is cookieless and receives no personal information.",
      ],
    },
    {
      heading: "Why we use it",
      paragraphs: [],
      bullets: [
        "To review your submission and respond to you, which is the purpose you submitted it for.",
        "To determine appropriate next steps for a project or investor profile, including which jurisdiction and partners may be relevant.",
        "To protect the website and its forms from abuse.",
        "To meet legal obligations that apply to GDA.",
      ],
    },
    {
      heading: "Who we share it with",
      paragraphs: [
        "Service providers that store submissions and deliver email on GDA's behalf: [PROCESSORS]. Independent professional partners, only where you proceed with a project or investor relationship and only as needed for their scope. Authorities, where the law requires. We do not sell personal information.",
      ],
    },
    {
      heading: "How long we keep it",
      paragraphs: [
        `Fit Check and Investor Access submissions: up to ${Math.round(retention.submissionsDays / 365)} years from submission. Contact enquiries: up to ${Math.round(retention.contactDays / 365)} year. Rate-limiting hashes: up to ${retention.rateLimitHashDays} days. Browser drafts of unfinished flows: cleared on submission or after ${retention.localDraftDays} days.`,
        retention.enforcement === "manual"
          ? "Retention is currently applied manually by the GDA team on a periodic review of the submission record."
          : "Retention is applied automatically by a scheduled process.",
      ],
    },
    {
      heading: "Your choices and rights",
      paragraphs: [
        `Depending on where you are, you may have rights to access, correct, delete or restrict the use of your personal information, to object to certain processing, to data portability, and to withdraw consent. To exercise any of these, contact ${site.contact.privacyEmail}. We will respond within the period required by the applicable law.`,
        "[RIGHTS_BY_JURISDICTION]",
      ],
    },
    {
      heading: "International transfers",
      paragraphs: [
        "GDA operates across several jurisdictions and its service providers may store information outside the country you are in. Where the law requires safeguards for such transfers, GDA relies on those safeguards. [TRANSFER_MECHANISM]",
      ],
    },
    {
      heading: "Children",
      paragraphs: ["This website is intended for professional use and is not directed at children. We do not knowingly collect information from anyone under 18."],
    },
    {
      heading: "Changes",
      paragraphs: ["This policy may be updated. The version and date at the top of this page identify the current text."],
    },
  ],
};
