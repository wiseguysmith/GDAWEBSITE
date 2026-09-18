import type { Cta, Meta, Pathway } from "../types";

export const home = {
  meta: {
    title: "Global Digital Access — Real-world value. Digital infrastructure. Global access.",
    description:
      "GDA coordinates the readiness and structuring process for real-world projects considering digital-asset infrastructure. Evaluate. Structure. Activate.",
  } satisfies Meta,

  hero: {
    lines: ["Real-world value.", "Digital infrastructure.", "Global access."],
    sub: "GDA provides the process and infrastructure to take real-world projects from readiness to activation.",
    primary: { label: "Evaluate Your Project", href: "/evaluate", event: "evaluate" } satisfies Cta,
    secondary: { label: "Request Investor Access", href: "/investors/access", event: "investor" } satisfies Cta,
    principles: ["Readiness before activation", "Professional validation", "Global platform · Local execution"],
    /** Section coordinate shown at the top of the hero on desktop (design direction §06). */
    coordinate: "§ 00 / Home",
    /** Labels for the system strip. Values are derived from the real content arrays, never typed. */
    system: {
      stages: "Stages, one path",
      areas: "Readiness areas",
      jurisdictions: "Jurisdictions today",
      categories: "Partner categories",
    },
  },

  whatWeDo: {
    coordinate: "§ 01 / What we do",
    eyebrow: "What we do",
    heading: "Evaluate. Structure. Activate.",
  },

  howItWorks: {
    coordinate: "§ 02 / How it works",
    coordinateRight: "Fit → Ready → Validated → Structured → Activated",
    eyebrow: "How it works",
    heading: "Five stages. One clear path.",
    sub: "Every project moves through the same sequence. You always know where you stand, what comes next, and who is responsible for it.",
    link: { label: "See the full process", href: "/how-it-works" } satisfies Cta,
    /** Sticky identifier in the process timeline, e.g. "Stage 01 of 05". */
    stageLabel: "Stage {current} of {total}",
  },

  applications: {
    coordinate: "§ 03 / Applications",
    eyebrow: "Where the infrastructure applies",
    heading: "Real-world applications.",
    link: { label: "Projects GDA works with", href: "/projects" } satisfies Cta,
  },

  validation: {
    coordinate: "§ 04 / Validation",
    coordinateRight: "Coordination · Professional review · Technical implementation",
    eyebrow: "Built around professional validation",
    heading: "We coordinate the process. Specialists handle matters within their scope.",
    body: "GDA coordinates the readiness workflow from first assessment to activation. Applicable legal, compliance, economic, environmental and technical matters are reviewed by the appropriate qualified professionals where required. GDA does not replace them.",
  },

  pathwaysCoordinate: "§ 05 / Pathways",

  pathways: {
    project: {
      eyebrow: "Projects",
      title: "I have a project.",
      body: "Begin with a short Fit Check. Seven questions, about three minutes, no commitment.",
      cta: { label: "Begin Fit Check", href: "/evaluate", event: "evaluate" },
    } satisfies Pathway,
    investor: {
      eyebrow: "Investors",
      title: "I am an investor.",
      body: "Request access to GDA's developing investor pathway. Opportunities are introduced as projects become available and applicable requirements are satisfied.",
      cta: { label: "Request Investor Access", href: "/investors/access", event: "investor" },
    } satisfies Pathway,
  },

  network: {
    coordinate: "§ 06 / Network",
    eyebrow: "Professional network",
    heading: "A curated professional network.",
    body: "Independent partners are engaged for each project according to its jurisdiction, instrument and requirements, and remain responsible for matters within their own professional scope.",
    link: { label: "How GDA works with partners", href: "/partners" } satisfies Cta,
  },

  team: {
    coordinate: "§ 07 / Team",
    eyebrow: "Team",
    heading: "The people coordinating the process.",
    link: { label: "About GDA", href: "/about" } satisfies Cta,
  },

  finalCta: {
    heading: "Start with the right structure.",
    body: "A short Fit Check can help determine whether this infrastructure may be appropriate before significant time or resources are committed.",
    primary: { label: "Evaluate Your Project", href: "/evaluate", event: "evaluate" } satisfies Cta,
    secondary: { label: "Talk to GDA", href: "/contact", event: "contact" } satisfies Cta,
  },
};
