import { site } from "@/config/site";
import type { LegalDocument } from "../types";
import { legal } from "./legal";

/** Working copy until reviewed by counsel (handoff §21). */
export const disclosures: LegalDocument = {
  meta: {
    title: "Important Disclosures — Global Digital Access",
    description: "Plain-English company and regulatory disclosures for Global Digital Access.",
  },
  title: "Important disclosures",
  intro: "Plain-English statements about what Global Digital Access is, what it is not, and what this website does and does not do.",
  version: "0.1 (working copy — pending counsel review)",
  updatedAt: "2026-09-18",
  sections: [
    {
      heading: "Who we are",
      paragraphs: [
        `This website is operated by ${site.legal.entityName} (“GDA”, “we”, “us”), organised in ${site.legal.jurisdiction}.`,
      ],
    },
    {
      heading: "What GDA does",
      paragraphs: [legal.standing],
    },
    {
      heading: "What GDA is not",
      paragraphs: [
        "GDA is not a law firm, broker-dealer, investment adviser, securities exchange, alternative trading system, transfer agent, custodian, fund manager or other regulated intermediary, and does not hold itself out as any of these in any jurisdiction. GDA does not provide legal, tax, investment, valuation, accounting or regulatory advice. Where a project requires such services, they are performed by independent qualified professionals or licensed providers within their own scope and under their own responsibility.",
      ],
    },
    {
      heading: "No offer, solicitation or recommendation",
      paragraphs: [
        "Nothing on this website is, or should be read as, an offer to sell, a solicitation of an offer to buy, or a recommendation of any security, digital asset, instrument or investment in any jurisdiction. No investment opportunity is presented on this website. Any offering, if and when one is made, will be made only through appropriate documentation, entities and licensed intermediaries where required, and only to persons eligible to receive it under applicable law.",
      ],
    },
    {
      heading: "No guaranteed outcomes",
      paragraphs: [
        "GDA does not guarantee that any project qualifies for, proceeds through or completes the readiness and structuring process; that any project attracts capital; that any structure is available in any jurisdiction; or that any technical implementation will occur. A preliminary indication from the Project Fit Check is not an approval, legal determination, regulatory determination or investment assessment.",
      ],
    },
    {
      heading: "Jurisdictions",
      paragraphs: [
        "GDA currently supports projects across the United States, El Salvador, Costa Rica, Panama, Colombia and Brazil. Listing a jurisdiction does not mean that GDA holds regulatory licences or maintains offices there, that any product, instrument or structure is available there, or that the same legal or compliance framework applies across those jurisdictions. Each project is subject to local law, professional review and applicable regulatory requirements.",
      ],
    },
    {
      heading: "Verification",
      paragraphs: [
        "Identity, eligibility, KYC, KYB, source-of-funds and related verification, where required, are performed by the appropriate licensed or qualified providers. This website does not collect verification documents.",
      ],
    },
    {
      heading: "Third parties",
      paragraphs: [
        "References to categories of professional or technical partners describe the kinds of independent firms GDA may coordinate with. They do not imply that any specific firm is engaged, endorses GDA, or is responsible for the content of this website. Partners are named only with their permission.",
      ],
    },
    {
      heading: "Forward-looking statements",
      paragraphs: [
        "Descriptions of pathways, features or capabilities that GDA is developing describe intentions, not commitments. They may change or may not be delivered.",
      ],
    },
    {
      heading: "Changes",
      paragraphs: ["These disclosures may be updated. The version and date at the top of this page identify the current text."],
    },
  ],
};
