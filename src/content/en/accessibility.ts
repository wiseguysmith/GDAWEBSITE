import { site } from "@/config/site";
import type { LegalDocument } from "../types";

export const accessibility: LegalDocument = {
  meta: {
    title: "Accessibility",
    description: "Global Digital Access's accessibility statement for this website.",
  },
  title: "Accessibility statement",
  intro: "GDA wants this website to be usable by everyone. This statement describes the standard we work to, what we have done, and how to tell us when something does not work.",
  version: "1.0",
  updatedAt: "2026-09-18",
  sections: [
    {
      heading: "Standard",
      paragraphs: ["This website is designed and built to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA."],
    },
    {
      heading: "What we have done",
      paragraphs: [],
      bullets: [
        "Semantic HTML with a logical heading order on every page.",
        "Full keyboard operability, including the menu, the forms and the multi-step flows, with a visible focus indicator.",
        "Colour contrast at or above the AA ratio for all text, and no information conveyed by colour alone.",
        "Labels, descriptions and error messages on every form control, announced to assistive technology.",
        "Touch targets of at least 44 by 44 pixels.",
        "Respect for the reduced-motion preference: animation is removed when it is set.",
        "Text that can be resized to 200% without loss of content or function.",
      ],
    },
    {
      heading: "Known limitations",
      paragraphs: [
        "The site is new. We test with automated tools and manual keyboard and screen-reader checks, but some issues may remain. If you find one, we would like to know.",
      ],
    },
    {
      heading: "Feedback",
      paragraphs: [`If any part of this website is difficult to use, contact ${site.contact.email}. Please describe the page and the problem, and we will respond and fix what we can.`],
    },
  ],
};
