/**
 * Data retention policy (handoff §31).
 *
 * Phase 1: the policy is documented here and on /privacy, and enforced
 * manually in the primary record store. Phase 2 adds a scheduled job.
 * /privacy must describe what actually happens — keep these values and the
 * privacy content in step.
 */
export const retention = {
  /** Fit Check and Investor Access submissions, in days, from the date of submission. */
  submissionsDays: 730,
  /** Contact enquiries, in days. */
  contactDays: 365,
  /** Hashed IP used for rate limiting, in days (kept with the submission log). */
  rateLimitHashDays: 30,
  /** Browser draft of an unfinished flow (localStorage), in days. */
  localDraftDays: 7,
  /** How enforcement happens today. Rendered on /privacy. */
  enforcement: "manual" as "manual" | "scheduled",
} as const;
