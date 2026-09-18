/**
 * Site-wide facts. Nothing here may be invented (handoff §41).
 * Values in square brackets are placeholders that block a production
 * build until they are replaced (see scripts/check-placeholders.mjs).
 */
export const site = {
  name: "Global Digital Access",
  shortName: "GDA",
  tagline: "Real-world value. Digital infrastructure. Global access.",
  description:
    "GDA coordinates the readiness and structuring process for real-world projects considering digital-asset infrastructure.",
  /** Production origin. Set NEXT_PUBLIC_SITE_URL in the environment; falls back for local development. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en",
  contact: {
    /** General enquiries inbox shown on /contact. */
    email: "[CONTACT_EMAIL]",
    /** Privacy contact shown on /privacy. */
    privacyEmail: "[PRIVACY_EMAIL]",
  },
  legal: {
    /** Registered legal entity name, e.g. "Global Digital Access, Inc." */
    entityName: "[ENTITY]",
    /** Jurisdiction of organisation, e.g. "Delaware, United States". */
    jurisdiction: "[JURISDICTION]",
    /** Registered address for legal notices. */
    address: "[ADDRESS]",
  },
} as const;

export type Site = typeof site;
