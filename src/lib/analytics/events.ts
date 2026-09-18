/**
 * The complete list of analytics events (handoff §32).
 * Nothing outside this enum is ever sent, and no event carries form answers
 * or personal data — only the event name and, where noted, a small enum value.
 */
export const analyticsEvents = {
  heroCtaClicked: "hero_cta_clicked",
  fitCheckStarted: "fit_check_started",
  fitCheckStep: "fit_check_step",
  fitCheckCompleted: "fit_check_completed",
  investorAccessStarted: "investor_access_started",
  investorAccessStep: "investor_access_step",
  investorAccessCompleted: "investor_access_completed",
  partnerEnquirySubmitted: "partner_enquiry_submitted",
  contactSubmitted: "contact_submitted",
} as const;

export type AnalyticsEvent = (typeof analyticsEvents)[keyof typeof analyticsEvents];

/** Allowed property shapes per event. Keep these to enums and small integers. */
export type AnalyticsProps = {
  /** Which CTA: "evaluate" | "investor" | "contact" */
  cta?: "evaluate" | "investor" | "contact";
  /** Step index (1-based) inside a flow. */
  step?: number;
  /** Result key for a completed flow, e.g. "potential-fit" | "submitted-for-review". */
  result?: string;
};
