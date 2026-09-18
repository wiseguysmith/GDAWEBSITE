import type { Metadata } from "next";
import { content } from "@/content";
import { pageMetadata } from "@/lib/seo/metadata";
import { LegalDocument } from "@/components/content/LegalDocument";

const doc = content.disclosures;

export const metadata: Metadata = pageMetadata({ ...doc.meta, path: "/disclosures" });

export default function DisclosuresPage() {
  return <LegalDocument doc={doc} eyebrow="Disclosures" />;
}