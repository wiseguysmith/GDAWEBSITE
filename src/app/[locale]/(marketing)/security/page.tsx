import type { Metadata } from "next";
import { getContent } from "@/content";
import { getLocale } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo/metadata";
import { LegalDocument } from "@/components/content/LegalDocument";

const eyebrow = { en: "Security", es: "Seguridad" } as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return pageMetadata({ ...getContent(locale).security.meta, path: "/security" }, locale);
}

export default async function SecurityPage() {
  const locale = await getLocale();
  return <LegalDocument doc={getContent(locale).security} eyebrow={eyebrow[locale]} locale={locale} />;
}