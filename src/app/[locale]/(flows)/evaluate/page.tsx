import type { Metadata } from "next";
import { getContent } from "@/content";
import { getLocale } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo/metadata";
import { FlowShell } from "@/components/forms/FlowShell";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return pageMetadata({ ...getContent(locale).fitCheck.meta, path: "/evaluate", noindex: true }, locale);
}

export default function EvaluatePage() {
  return <FlowShell flowId="fit-check" />;
}
