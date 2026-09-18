import type { ContentBlock, Cta, Meta } from "../types";

export const about = {
  meta: {
    title: "About",
    description:
      "Global platform. Local execution. GDA's mission, operating principles, professional-network philosophy, jurisdiction-aware model and current operating footprint.",
  } satisfies Meta,

  hero: {
    eyebrow: "About",
    lines: ["Global platform.", "Local execution."],
    sub: "GDA exists to give serious real-world projects a disciplined route to digital infrastructure — and to say clearly when that route is not the right one.",
  },

  mission: {
    heading: "Mission",
    paragraphs: [
      "To provide the process and infrastructure that take real-world projects from readiness to activation — coordinating the professional work that must come before technology, in every jurisdiction where GDA operates.",
    ],
  } satisfies ContentBlock,

  why: {
    heading: "Why GDA exists",
    paragraphs: [
      "Real-world projects are approached with the technology first and the readiness second, if at all. Legal structure, compliance pathway, economics, diligence and governance are treated as obstacles rather than as the work.",
      "GDA inverts that order. The Fit Check decides whether the infrastructure is appropriate at all. The readiness process, coordinated with independent professionals, does the work. Technical activation is the last step, taken only when applicable requirements have been satisfied.",
    ],
  } satisfies ContentBlock,

  principlesIntro: {
    eyebrow: "Operating principles",
    heading: "Eight commitments.",
  },

  network: {
    heading: "Professional network philosophy",
    paragraphs: [
      "GDA does not employ the lawyers, compliance providers, valuation professionals or technical firms a project needs. It coordinates them. Independence is the point: the people who review a matter are qualified for it, responsible for it, and separate from the people running the process.",
    ],
  } satisfies ContentBlock,

  jurisdictionModel: {
    heading: "Jurisdiction-aware model",
    paragraphs: [
      "No two jurisdictions treat the same asset, instrument or investor the same way. GDA does not apply one framework across all of them. Each market is approached according to its local legal, compliance, economic and technical requirements, with partners qualified for that market.",
    ],
  } satisfies ContentBlock,

  footprint: {
    eyebrow: "Current operating footprint",
    heading: "Six jurisdictions today.",
    body: "GDA currently supports projects across the United States, El Salvador, Costa Rica, Panama, Colombia and Brazil. Each market is approached according to its local legal, compliance, economic and technical requirements.",
    caveat:
      "Listing a jurisdiction does not mean GDA holds regulatory licences or maintains offices there, or that every instrument or structure is available there. It means GDA coordinates projects there, subject to local law, asset characteristics, instrument type, investor type, transaction structure, professional review and applicable regulatory requirements.",
  },

  team: {
    eyebrow: "Team",
    heading: "The people coordinating the process.",
    empty: "Team profiles are being prepared and will appear here once approved.",
  },

  contact: {
    heading: "Contact",
    body: "For project, investor, partner, government or media enquiries.",
    primary: { label: "Contact GDA", href: "/contact", event: "contact" } satisfies Cta,
    secondary: { label: "Evaluate Your Project", href: "/evaluate", event: "evaluate" } satisfies Cta,
  },
};
