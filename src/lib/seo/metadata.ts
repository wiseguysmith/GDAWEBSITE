import type { Metadata } from "next";
import { site } from "@/config/site";

export type PageMeta = {
  title: string;
  description: string;
  path: string;
  /** Flows and confirmation states are never indexed (handoff §29). */
  noindex?: boolean;
};

/** Builds page metadata from a content module's `meta` block. */
export function pageMetadata(meta: PageMeta): Metadata {
  const url = new URL(meta.path, site.url).toString();
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: url },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      siteName: site.name,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
    robots: meta.noindex ? { index: false, follow: false } : undefined,
  };
}
