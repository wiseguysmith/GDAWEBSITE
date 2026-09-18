import type { Metadata } from "next";
import { content } from "@/content";
import { pageMetadata } from "@/lib/seo/metadata";
import { FlowShell } from "@/components/forms/FlowShell";

export const metadata: Metadata = pageMetadata({ ...content.investorAccess.meta, path: "/investors/access", noindex: true });

export default function InvestorAccessPage() {
  return <FlowShell flowId="investor-access" />;
}
