import type { Metadata } from "next";
import { content } from "@/content";
import { pageMetadata } from "@/lib/seo/metadata";
import { LegalDocument } from "@/components/content/LegalDocument";

const doc = content.accessibility;

export const metadata: Metadata = pageMetadata({ ...doc.meta, path: "/accessibility" });

export default function AccessibilityPage() {
  return <LegalDocument doc={doc} eyebrow="Accessibility" />;
}