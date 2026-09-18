/**
 * Locale registry. English is the default and lives at the root URL;
 * every other locale is path-prefixed (/es/…). Adding a locale is one entry
 * here plus a content/<locale> directory of the same shape as content/en.
 */
export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeMeta: Record<Locale, { label: string; native: string; htmlLang: string; ogLocale: string; intl: string }> = {
  en: { label: "English", native: "English", htmlLang: "en", ogLocale: "en_US", intl: "en" },
  es: { label: "Spanish", native: "Español", htmlLang: "es", ogLocale: "es_LA", intl: "es-419" },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

/** Functional cookie that remembers an explicit language choice (one year). */
export const LOCALE_COOKIE = "gda-locale";

export function localeCookie(locale: Locale): string {
  return `${LOCALE_COOKIE}=${locale}; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax`;
}

/** Prefix an internal path for a locale. External, hash and mailto links are returned untouched. */
export function localePath(locale: Locale, href: string): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  if (locale === defaultLocale) return href;
  if (href === "/") return `/${locale}`;
  return `/${locale}${href}`;
}

/** Split a pathname into its locale and the locale-free path. */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const [, first, ...rest] = pathname.split("/");
  if (isLocale(first) && first !== defaultLocale) {
    const path = `/${rest.join("/")}`;
    return { locale: first, path: path === "/" ? "/" : path.replace(/\/$/, "") };
  }
  return { locale: defaultLocale, path: pathname || "/" };
}
