import type { Metadata } from "next";
import { content } from "@/content";
import { pageMetadata } from "@/lib/seo/metadata";
import { LegalDocument } from "@/components/content/LegalDocument";

const doc = content.terms;

export const metadata: Metadata = pageMetadata({ ...doc.meta, path: "/terms" });

export default function TermsPage() {
  return <LegalDocument doc={doc} eyebrow="Terms" />;
}