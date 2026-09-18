import type { Metadata } from "next";
import { content } from "@/content";
import { pageMetadata } from "@/lib/seo/metadata";
import { LegalDocument } from "@/components/content/LegalDocument";

const doc = content.privacy;

export const metadata: Metadata = pageMetadata({ ...doc.meta, path: "/privacy" });

export default function PrivacyPage() {
  return <LegalDocument doc={doc} eyebrow="Privacy" />;
}