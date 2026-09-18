import { site } from "@/config/site";
import type { LegalDocument } from "../types";

/** Working copy until reviewed by counsel. */
export const terms: LegalDocument = {
  meta: {
    title: "Terms of Use",
    description: "Terms governing use of the Global Digital Access website.",
  },
  title: "Terms of use",
  intro: "These terms govern your use of this website. By using it, you accept them.",
  version: "0.1 (working copy — pending counsel review)",
  updatedAt: "2026-09-18",
  sections: [
    {
      heading: "The website",
      paragraphs: [
        `This website is operated by ${site.legal.entityName} (“GDA”). It provides information about GDA's readiness and structuring process and allows you to submit a Project Fit Check, an Investor Access request or an enquiry.`,
      ],
    },
    {
      heading: "No advice, no offer",
      paragraphs: [
        "The content of this website is general information. It is not legal, tax, investment, valuation or regulatory advice, and it is not an offer, solicitation or recommendation of any security, digital asset or investment. Please read the Important Disclosures, which form part of these terms.",
      ],
    },
    {
      heading: "Submissions",
      paragraphs: [
        "When you submit a form, you confirm that the information is accurate to the best of your knowledge and that you are authorised to provide it. A response to a submission — including a preliminary Fit Check indication — is not an approval, determination, engagement or commitment of any kind. Any engagement between GDA and a project owner, investor or partner is governed by separate written terms.",
      ],
    },
    {
      heading: "Acceptable use",
      paragraphs: ["You agree not to:"],
      bullets: [
        "Submit false, misleading or unauthorised information.",
        "Attempt to interfere with the website, its forms or its security measures, or to submit automated requests.",
        "Use the website for any unlawful purpose.",
      ],
    },
    {
      heading: "Intellectual property",
      paragraphs: [
        "The text, design and other content of this website belong to GDA or its licensors. You may view and print pages for your own reference. You may not reproduce or distribute the content commercially without permission.",
      ],
    },
    {
      heading: "Third-party links",
      paragraphs: ["Links to other websites are provided for convenience. GDA is not responsible for their content."],
    },
    {
      heading: "Disclaimer and limitation of liability",
      paragraphs: [
        "The website is provided as is. To the fullest extent permitted by law, GDA excludes all warranties in relation to the website and its content, and is not liable for any loss arising from use of, or reliance on, the website or its content. Nothing in these terms excludes liability that cannot be excluded by law.",
      ],
    },
    {
      heading: "Governing law",
      paragraphs: [`These terms are governed by the law of ${site.legal.jurisdiction}. [DISPUTE_FORUM]`],
    },
    {
      heading: "Changes",
      paragraphs: ["GDA may update these terms. The version and date at the top of this page identify the current text."],
    },
  ],
};
