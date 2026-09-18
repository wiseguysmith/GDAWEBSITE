/**
 * Legal wording used inline across the site. Working copy until reviewed by
 * counsel (handoff §21). Change here, never in components.
 */
import type { LegalLines } from "../types";

export const legal: LegalLines = {
  /** Footer of every page. */
  standing:
    "Global Digital Access coordinates a readiness and structuring process for real-world projects. GDA does not replace licensed legal, compliance, investment, tax, valuation or other professional advisers. Nothing on this website constitutes an offer, solicitation, investment recommendation or guarantee of outcome. Any offering, verification or regulated activity must be conducted through the appropriate documentation, entities and professional or licensed providers where required.",

  /** Investor surfaces — page, flow intro, confirmation. */
  investor:
    "Requesting access is not an offer, solicitation or investment recommendation, and does not guarantee access to any opportunity. Identity, eligibility, KYC, KYB and related verification, where required, are performed by the appropriate licensed or qualified provider.",

  /** Fit Check intro and both result states. */
  fitCheck:
    "The Fit Check provides a preliminary indication only. It is not an approval, legal determination, regulatory determination, investment assessment or guarantee that a project will proceed. Every submission is reviewed by the GDA team before any next step is determined.",

  /** Under every form's consent checkbox. */
  consent:
    "I agree to be contacted by Global Digital Access about this submission and have read the Privacy Policy.",

  /** Short line for the footer above the standing disclosure. */
  footprintIntro: "Operating footprint",
};
