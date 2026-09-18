import "server-only";

/**
 * Server-only jurisdiction review configuration.
 *
 * This file is never imported by UI code and its contents never appear in
 * copy (handoff §13). It only produces internal tags on a submission so the
 * team can prioritise review. Maintain with compliance/legal input.
 *
 * The PUBLIC list of jurisdictions GDA currently supports lives in
 * src/lib/jurisdictions/supported.ts — that list is displayed on the site.
 */

/** ISO-3166 alpha-2 codes that should be tagged for additional internal review. */
export const internalReviewCountries: ReadonlySet<string> = new Set<string>(
  (process.env.JURISDICTION_REVIEW_LIST ?? "")
    .split(",")
    .map((code) => code.trim().toUpperCase())
    .filter(Boolean),
);

export function reviewTagsForCountry(code: string | undefined): string[] {
  if (!code) return [];
  return internalReviewCountries.has(code.toUpperCase()) ? ["jurisdiction-review"] : [];
}
