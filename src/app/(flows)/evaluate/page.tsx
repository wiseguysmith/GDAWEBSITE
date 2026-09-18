import type { Metadata } from "next";
import { content } from "@/content";
import { pageMetadata } from "@/lib/seo/metadata";
import { FlowShell } from "@/components/forms/FlowShell";

export const metadata: Metadata = pageMetadata({ ...content.fitCheck.meta, path: "/evaluate", noindex: true });

export default function EvaluatePage() {
  return <FlowShell flowId="fit-check" />;
}
