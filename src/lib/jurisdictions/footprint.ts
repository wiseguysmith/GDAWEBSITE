import { supportedJurisdictions } from "./supported";

/** Joins names as "A, B, C and D" — English list grammar. */
export function listNames(names: readonly string[]): string {
  if (names.length === 0) return "";
  if (names.length === 1) return names[0];
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

/**
 * The approved public sentence (handoff §5). Generated so that adding a
 * jurisdiction never requires touching copy.
 */
export function footprintSentence(): string {
  return `Currently supporting projects across ${listNames(supportedJurisdictions.map((j) => j.inSentence ?? j.name))}.`;
}

export const footprintQualifier =
  "Each jurisdiction requires its own legal, compliance and structuring pathway. GDA coordinates the process with the appropriate local and specialized partners.";
