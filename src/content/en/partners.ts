import type { ContentBlock, Cta, Meta, PartnerCategory, PartnerLogo } from "../types";

/** Canonical list of eleven (handoff §17). The first eight are featured on the homepage. */
export const partnerCategories: PartnerCategory[] = [
  { slug: "legal", title: "Legal", descriptor: "Entity architecture, rights, documentation and counsel in each jurisdiction.", featured: true },
  {
    slug: "compliance",
    title: "Compliance & regulatory",
    descriptor: "Regulatory pathway and compliance requirements, addressed with qualified providers.",
    featured: true,
  },
  {
    slug: "valuation",
    title: "Valuation & economics",
    descriptor: "Independent valuation and economic analysis by qualified professionals where required.",
    featured: true,
  },
  { slug: "environmental", title: "Environmental", descriptor: "Environmental assessment and natural-asset expertise.", featured: true },
  {
    slug: "diligence",
    title: "Asset / technical diligence",
    descriptor: "Engineering and asset-level diligence appropriate to the project.",
    featured: true,
  },
  {
    slug: "technical",
    title: "Technical infrastructure",
    descriptor: "Implementation and activation, performed by the appropriate provider.",
    featured: true,
  },
  { slug: "custody", title: "Custody", descriptor: "Performed by licensed providers where required.", featured: true },
  {
    slug: "distribution",
    title: "Distribution / intermediaries",
    descriptor: "Securities intermediaries and distribution, through licensed entities where required.",
    featured: true,
  },
  { slug: "securities", title: "Securities", descriptor: "Securities professionals and intermediaries, where an instrument requires them.", featured: false },
  { slug: "economic", title: "Economic analysis", descriptor: "Feasibility and economic-structure analysis.", featured: false },
  { slug: "transfer-agency", title: "Transfer agency", descriptor: "Performed by licensed providers where required.", featured: false },
];

/** Logos render only with written permission on file. None at launch. */
export const partnerLogos: PartnerLogo[] = [];

export const partners = {
  meta: {
    title: "Partners — Global Digital Access",
    description:
      "Independent expertise. Coordinated execution. How GDA works with legal, compliance, valuation, environmental, technical and infrastructure partners in each jurisdiction.",
  } satisfies Meta,

  hero: {
    eyebrow: "Partners",
    heading: "Independent expertise. Coordinated execution.",
    sub: "GDA coordinates the readiness workflow. Professional partners handle matters within their professional scopes. Technical partners handle technical implementation. GDA does not replace any of them — it makes sure the right ones are involved at the right stage.",
  },

  model: {
    eyebrow: "The model",
    heading: "Coordination is not the same as validation.",
    body: "The separation is deliberate. GDA runs the process; the people qualified to review a matter review it, and remain responsible for it. Not every project needs every category of partner, and no partner is engaged where the project does not require it.",
  },

  categories: {
    eyebrow: "Partner categories",
    heading: "Engaged by requirement.",
    body: "Categories GDA's network covers. Partners are named only with their written permission; none are shown at launch.",
  },

  selection: {
    heading: "How partners are selected",
    paragraphs: [
      "By fit to the project: asset class, instrument, jurisdiction and stage. By professional standing in their field and, where a regulated function is involved, by the licences and authorisations the jurisdiction requires. By willingness to work within a defined, transparent process where their scope is clear.",
    ],
  } satisfies ContentBlock,

  jurisdiction: {
    heading: "How jurisdiction affects partner selection",
    paragraphs: [
      "Legal structure, compliance requirements, valuation standards and the availability of licensed intermediaries all vary by country. GDA engages partners in, or qualified for, the jurisdiction where the asset, the entity and the investors sit — which may be more than one.",
    ],
  } satisfies ContentBlock,

  scope: {
    heading: "How professionals remain responsible for their scope",
    paragraphs: [
      "Each partner reviews, advises on, validates, verifies or approves only the matters within their professional scope, under their own professional obligations and, where applicable, their own licence. GDA coordinates the sequence and the hand-offs; it does not sign for the work.",
    ],
  } satisfies ContentBlock,

  cta: {
    heading: "Work with GDA.",
    body: "If you are a professional or technical firm interested in joining the network, tell us about your practice and jurisdictions.",
    primary: { label: "Partner enquiry", href: "/contact?type=partner", event: "contact" } satisfies Cta,
  },
};
