import type { Metadata } from "next";
import { getContent } from "@/content";
import { getLocale } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo/metadata";
import { LegalDocument } from "@/components/content/LegalDocument";

const eyebrow = { en: "Accessibility", es: "Accesibilidad" } as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return pageMetadata({ ...getContent(locale).accessibility.meta, path: "/accessibility" }, locale);
}

export default async function AccessibilityPage() {
  const locale = await getLocale();
  return <LegalDocument doc={getContent(locale).accessibility} eyebrow={eyebrow[locale]} locale={locale} />;
}