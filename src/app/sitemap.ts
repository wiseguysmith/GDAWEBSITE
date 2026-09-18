import type { MetadataRoute } from "next";
import { defaultLocale, localeMeta, locales } from "@/lib/i18n/locales";
import { absoluteUrl } from "@/lib/seo/metadata";

/**
 * Indexable marketing pages in every locale, each with hreflang alternates.
 * Flows, confirmation states, the API and reserved routes are excluded (handoff §29).
 */
const indexable: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/how-it-works", priority: 0.9, changeFrequency: "monthly" },
  { path: "/projects", priority: 0.9, changeFrequency: "monthly" },
  { path: "/investors", priority: 0.8, changeFrequency: "monthly" },
  { path: "/partners", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.5, changeFrequency: "yearly" },
  { path: "/security", priority: 0.3, changeFrequency: "yearly" },
  { path: "/disclosures", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  { path: "/accessibility", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return indexable.flatMap((entry) => {
    const languages: Record<string, string> = Object.fromEntries(locales.map((l) => [localeMeta[l].htmlLang, absoluteUrl(l, entry.path)]));
    languages["x-default"] = absoluteUrl(defaultLocale, entry.path);
    return locales.map((locale) => ({
      url: absoluteUrl(locale, entry.path),
      lastModified,
      changeFrequency: entry.changeFrequency,
      priority: locale === defaultLocale ? entry.priority : Math.round(entry.priority * 0.9 * 10) / 10,
      alternates: { languages },
    }));
  });
}
