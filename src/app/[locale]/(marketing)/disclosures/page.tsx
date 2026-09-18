import type { Metadata } from "next";
import { getContent } from "@/content";
import { getLocale } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo/metadata";
import { LegalDocument } from "@/components/content/LegalDocument";

const eyebrow = { en: "Disclosures", es: "Avisos" } as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return pageMetadata({ ...getContent(locale).disclosures.meta, path: "/disclosures" }, locale);
}

export default async function DisclosuresPage() {
  const locale = await getLocale();
  return <LegalDocument doc={getContent(locale).disclosures} eyebrow={eyebrow[locale]} locale={locale} />;
}