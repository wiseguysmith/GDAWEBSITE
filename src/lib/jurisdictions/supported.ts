/**
 * Jurisdictions GDA currently supports projects in (handoff §5).
 * Public — displayed on the site. Adding a jurisdiction is one entry here.
 * Order is the display order.
 */
export type SupportedJurisdiction = {
  code: string; // ISO-3166 alpha-2
  name: string;
};

export const supportedJurisdictions: readonly SupportedJurisdiction[] = [
  { code: "US", name: "United States" },
  { code: "SV", name: "El Salvador" },
  { code: "CR", name: "Costa Rica" },
  { code: "PA", name: "Panama" },
  { code: "CO", name: "Colombia" },
  { code: "BR", name: "Brazil" },
] as const;

const supportedCodes = new Set(supportedJurisdictions.map((j) => j.code));

export function isSupportedJurisdiction(code: string | undefined | null): boolean {
  return Boolean(code) && supportedCodes.has(String(code).toUpperCase());
}
