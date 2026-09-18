import type { ContentBlock, Cta, Meta } from "../types";

export const projects = {
  meta: {
    title: "Projects",
    description:
      "GDA works with owners, sponsors and developers of legitimate real-world projects — real estate, environmental and natural assets, infrastructure, agriculture, energy and private enterprise.",
  } satisfies Meta,

  hero: {
    eyebrow: "Projects",
    heading: "Built for projects with real-world value.",
    sub: "GDA works with owners, sponsors and developers of legitimate real-world projects who want to know — before committing time or capital — whether digital-asset infrastructure may be appropriate, and what it would take to be ready.",
    cta: { label: "Evaluate Your Project", href: "/evaluate", event: "evaluate" } satisfies Cta,
  },

  whoFor: {
    heading: "Who GDA works with",
    paragraphs: [
      "Project and asset owners. Majority owners and controlling parties. Developers and sponsors. Authorised representatives. Governments and public-sector entities. Advisers acting for any of the above.",
      "The common thread is a real asset or enterprise, a party with the authority to act for it, and a willingness to go through a disciplined process before any technology is involved.",
    ],
  } satisfies ContentBlock,

  whoNotFor: {
    heading: "Who GDA is not for",
    paragraphs: [
      "Projects seeking to bypass legal, compliance or economic readiness. Concepts without an identifiable asset, enterprise or controlling party. Anyone looking for a guarantee that a project will proceed or attract capital. GDA does not offer one.",
    ],
  } satisfies ContentBlock,

  categories: {
    eyebrow: "Project categories",
    heading: "Six categories. One Fit Check.",
    body: "These are the areas GDA infrastructure may support. They are not investment listings, and no project is listed here.",
  },

  readiness: {
    eyebrow: "Readiness overview",
    heading: "What a readiness assessment examines.",
    body: "Depending on the project, the assessment may cover some or all of the following areas. Not every area applies to every project, and not every area requires an external professional.",
  },

  prepare: {
    eyebrow: "Before a Fit Check",
    heading: "What project owners should prepare.",
    body: "The Fit Check itself needs no documents. If the project proceeds to a readiness assessment, the following will be useful to have available or in progress.",
    items: [
      "Evidence of ownership or control of the asset, enterprise or project, and the authority of the person acting for it.",
      "Corporate and entity documents for the owning or project entity, including where it is organised.",
      "Existing permits, licences, titles, concessions or registrations applicable to the asset.",
      "Financial information: historical performance where operating, projections where in development, and any existing financing or investor arrangements.",
      "Any existing valuations, environmental assessments, technical studies or diligence reports.",
      "A clear statement of the objective: what the project is trying to accomplish and for whom.",
    ],
  },

  cta: {
    heading: "Find out whether it fits.",
    body: "Seven questions, about three minutes, no commitment.",
    primary: { label: "Evaluate Your Project", href: "/evaluate", event: "evaluate" } satisfies Cta,
    secondary: { label: "How the process works", href: "/how-it-works" } satisfies Cta,
  },
};
