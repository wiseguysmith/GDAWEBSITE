import type { ContentBlock, Cta, Meta } from "../types";

export const investors = {
  meta: {
    title: "Investors",
    description:
      "GDA is developing an investor pathway for access to appropriate real-world opportunities as projects become available and applicable requirements are satisfied. Access, in stages.",
  } satisfies Meta,

  hero: {
    eyebrow: "Investors",
    heading: "Access, in stages.",
    sub: "GDA is developing an investor pathway for access to appropriate real-world opportunities as projects become available and applicable requirements are satisfied. There is no public marketplace today, and nothing on this page is an offer.",
    cta: { label: "Request Investor Access", href: "/investors/access", event: "investor" } satisfies Cta,
  },

  means: {
    heading: "What requesting access means",
    paragraphs: [
      "A profiled relationship with GDA: who you are, where you are, and what you are interested in. As projects satisfy applicable readiness requirements, GDA can contact you about the appropriate next step for your profile and jurisdiction.",
    ],
  } satisfies ContentBlock,

  doesNotMean: {
    heading: "What requesting access does not mean",
    paragraphs: [],
    bullets: [
      "It is not an offer, solicitation or investment recommendation.",
      "It does not guarantee access to any opportunity, at any time.",
      "It is not an eligibility determination. Your answers are informational only.",
      "It does not create an account, a marketplace login or a portfolio. None exists yet.",
    ],
  } satisfies ContentBlock,

  dependsOn: {
    eyebrow: "Access depends on",
    items: ["Jurisdiction", "Investor eligibility", "Offering structure", "Professional verification", "Applicable law"],
  },

  pathway: {
    eyebrow: "The investor pathway",
    heading: "Four steps, as the pathway develops.",
    steps: [
      { title: "Request access", body: "A short profile: investor type, jurisdiction, areas of interest and contact details." },
      { title: "Investor profile", body: "GDA reviews the profile and confirms the appropriate next step for your jurisdiction." },
      {
        title: "Verification",
        body: "Identity, eligibility, KYC, KYB and related verification, where required, are performed by the appropriate licensed or qualified provider — not by GDA.",
      },
      {
        title: "Appropriate access",
        body: "Access to opportunities that have satisfied applicable readiness requirements, according to your eligibility, jurisdiction and the structure of each offering.",
      },
    ],
  },

  licensedRole: {
    heading: "The role of licensed partners",
    paragraphs: [
      "GDA owns the workflow and the experience. Regulated functions — verification, offering, custody, distribution — are performed by the appropriate licensed or qualified providers where required, through the appropriate documentation and entities. GDA does not perform them and does not claim to.",
    ],
  } satisfies ContentBlock,

  cta: {
    heading: "Request access.",
    body: "Six short questions. No documents. No commitment.",
    primary: { label: "Request Investor Access", href: "/investors/access", event: "investor" } satisfies Cta,
    secondary: { label: "Talk to GDA", href: "/contact", event: "contact" } satisfies Cta,
  },
};
