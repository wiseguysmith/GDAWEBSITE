import type { Metadata } from "next";
import { getContent } from "@/content";
import { getLocale } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo/metadata";
import { LegalDocument } from "@/components/content/LegalDocument";

const eyebrow = { en: "Privacy", es: "Privacidad" } as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return pageMetadata({ ...getContent(locale).privacy.meta, path: "/privacy" }, locale);
}

export default async function PrivacyPage() {
  const locale = await getLocale();
  return <LegalDocument doc={getContent(locale).privacy} eyebrow={eyebrow[locale]} locale={locale} />;
}