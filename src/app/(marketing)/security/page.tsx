import type { Metadata } from "next";
import { content } from "@/content";
import { pageMetadata } from "@/lib/seo/metadata";
import { LegalDocument } from "@/components/content/LegalDocument";

const doc = content.security;

export const metadata: Metadata = pageMetadata({ ...doc.meta, path: "/security" });

export default function SecurityPage() {
  return <LegalDocument doc={doc} eyebrow="Security" />;
}