import type { ContentBlock, Cta, FaqItem, Meta } from "../types";

export const howItWorks = {
  meta: {
    title: "How It Works",
    description:
      "Three pillars, five stages, one clear path. How GDA coordinates the readiness and structuring process, who is responsible at each stage, and what GDA does not do.",
  } satisfies Meta,

  hero: {
    eyebrow: "How it works",
    heading: "Simple on the surface. Serious underneath.",
    sub: "Every project moves through the same five stages, in the same order, with the same separation between the people who coordinate and the people who review. Here is what happens at each one, who is responsible, and what you will need.",
  },

  pillarsIntro: {
    eyebrow: "Three pillars",
    heading: "Evaluate. Structure. Activate.",
    body: "At the highest level, GDA does three things. The five-stage workflow beneath them is how each is carried out.",
  },

  stagesIntro: {
    eyebrow: "Five stages",
    heading: "Fit. Ready. Validated. Structured. Activated.",
    body: "Nothing advances before it is ready. Each stage has a defined purpose, a defined owner and a defined output.",
    stageLabel: "Stage {current} of {total}",
    responsibleLabel: "Responsible",
  },

  responsibilities: {
    eyebrow: "Responsibility model",
    heading: "Three roles. Clear separation.",
    body: "GDA coordinates the workflow. Professional partners handle matters within their professional scope. Technical providers handle technical implementation.",
  },

  does: {
    heading: "What GDA does",
    paragraphs: [],
    bullets: [
      "Determines whether digital-asset infrastructure may be appropriate for a project, and says so plainly when it is not.",
      "Coordinates the readiness assessment across the areas applicable to the project.",
      "Engages the appropriate independent professional and technical partners for the jurisdiction, asset and structure.",
      "Coordinates structuring with those partners and keeps the project owner informed at every stage.",
      "Moves projects that have satisfied applicable readiness requirements toward technical implementation through the appropriate provider.",
    ],
  } satisfies ContentBlock,

  doesNot: {
    heading: "What GDA does not do",
    paragraphs: [],
    bullets: [
      "GDA does not provide legal, tax, investment, valuation or regulatory advice.",
      "GDA does not act as legal counsel, broker-dealer, investment adviser, exchange, transfer agent, custodian or other regulated intermediary.",
      "GDA does not perform identity, eligibility, KYC or KYB verification — appropriate providers do, where required.",
      "GDA does not perform technical implementation — the appropriate technical infrastructure provider does.",
      "GDA does not validate its own work, approve projects in a legal or regulatory sense, or guarantee any outcome.",
    ],
  } satisfies ContentBlock,

  faq: {
    eyebrow: "Questions",
    heading: "Frequently asked.",
    items: [
      {
        question: "Is GDA a law firm, broker-dealer, exchange or fund?",
        answer:
          "No. GDA coordinates a readiness and structuring process. Legal, compliance, securities, valuation, tax and other professional matters are handled by independent qualified partners within their scope, and regulated functions are performed by licensed providers where required.",
      },
      {
        question: "Does every project qualify?",
        answer:
          "No, and GDA does not assume it should. The Fit Check exists to determine early whether this infrastructure may be appropriate. Some projects are better served by conventional structures, and GDA will say so.",
      },
      {
        question: "What happens after I submit a Fit Check?",
        answer:
          "You receive a preliminary indication on screen and by email, with a reference number. A member of the GDA team then reviews the submission before determining appropriate next steps. The indication is not an approval or a determination of any kind.",
      },
      {
        question: "How long does the process take?",
        answer:
          "It depends on the project, its jurisdiction and how ready its documentation and structure already are. GDA does not promise a duration. What it does promise is that you will know which stage you are in and what is required to move to the next one.",
      },
      {
        question: "What does it cost?",
        answer:
          "The Fit Check is free and carries no commitment. Engagement terms for the readiness and structuring process are discussed once GDA and the project owner have agreed that proceeding makes sense.",
      },
      {
        question: "Does GDA tokenize the asset?",
        answer:
          "No. GDA coordinates the readiness and structuring process. Technical activation, where applicable, is performed by the appropriate technical infrastructure provider — and only after applicable readiness requirements have been satisfied.",
      },
      {
        question: "Which jurisdictions does GDA currently support?",
        answer:
          "GDA currently supports projects across the United States, El Salvador, Costa Rica, Panama, Colombia and Brazil. Each jurisdiction requires its own legal, compliance and structuring pathway, coordinated with the appropriate local and specialized partners.",
      },
    ] satisfies FaqItem[],
  },

  cta: {
    heading: "Start with the right structure.",
    body: "Seven questions, about three minutes, no commitment.",
    primary: { label: "Evaluate Your Project", href: "/evaluate", event: "evaluate" } satisfies Cta,
    secondary: { label: "Talk to GDA", href: "/contact", event: "contact" } satisfies Cta,
  },
};
