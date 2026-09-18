import { displayName } from "@/lib/countries";
import { defaultLocale, localeMeta, type Locale } from "@/lib/i18n/locales";
import { supportedJurisdictions } from "./supported";

const conjunction: Record<Locale, string> = { en: "and", es: "y" };

/** Joins names as "A, B, C and D" with the locale's conjunction. */
export function listNames(names: readonly string[], locale: Locale = defaultLocale): string {
  if (names.length === 0) return "";
  if (names.length === 1) return names[0];
  return `${names.slice(0, -1).join(", ")} ${conjunction[locale]} ${names[names.length - 1]}`;
}

/** Jurisdiction names for a locale: the curated English forms, or Intl display names otherwise. */
export function jurisdictionNames(locale: Locale = defaultLocale): string[] {
  return supportedJurisdictions.map((j) => (locale === defaultLocale ? (j.inSentence ?? j.name) : displayName(j.code, localeMeta[locale].intl)));
}

const sentence: Record<Locale, (list: string) => string> = {
  en: (list) => `Currently supporting projects across ${list}.`,
  es: (list) => `Actualmente apoyamos proyectos en ${list}.`,
};

/**
 * The approved public sentence (handoff §5). Generated so that adding a
 * jurisdiction never requires touching copy.
 */
export function footprintSentence(locale: Locale = defaultLocale): string {
  return sentence[locale](listNames(jurisdictionNames(locale), locale));
}

export const footprintQualifier: Record<Locale, string> = {
  en: "Each jurisdiction requires its own legal, compliance and structuring pathway. GDA coordinates the process with the appropriate local and specialized partners.",
  es: "Cada jurisdicción requiere su propia vía legal, de cumplimiento y de estructuración. GDA coordina el proceso con los socios locales y especializados correspondientes.",
};
