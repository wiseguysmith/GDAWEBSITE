import type { Metadata } from "next";
import { site } from "@/config/site";
import { defaultLocale, localeMeta, localePath, locales, type Locale } from "@/lib/i18n/locales";

export type PageMeta = {
  title: string;
  description: string;
  /** Locale-free path, e.g. "/how-it-works". */
  path: string;
  /** Flows and confirmation states are never indexed (handoff §29). */
  noindex?: boolean;
  /** Use the title as-is instead of the "%s — Site" template (homepage). */
  absoluteTitle?: boolean;
};

export function absoluteUrl(locale: Locale, path: string): string {
  return new URL(localePath(locale, path), site.url).toString();
}

/**
 * Builds page metadata from a content module's `meta` block: canonical for
 * this locale, hreflang alternates for every locale (x-default = English).
 */
export function pageMetadata(meta: PageMeta, locale: Locale = defaultLocale): Metadata {
  const url = absoluteUrl(locale, meta.path);
  const languages: Record<string, string> = Object.fromEntries(locales.map((l) => [localeMeta[l].htmlLang, absoluteUrl(l, meta.path)]));
  languages["x-default"] = absoluteUrl(defaultLocale, meta.path);

  return {
    title: meta.absoluteTitle ? { absolute: meta.title } : meta.title,
    description: meta.description,
    alternates: { canonical: url, languages: meta.noindex ? undefined : languages },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      siteName: site.name,
      type: "website",
      locale: localeMeta[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeMeta[l].ogLocale),
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
    robots: meta.noindex ? { index: false, follow: false } : undefined,
  };
}
