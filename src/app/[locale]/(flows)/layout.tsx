import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Disclosure } from "@/components/content/Disclosure";

/** Flows: minimal header, no footer, never indexed (handoff §29). */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function FlowsLayout({ children }: LayoutProps<"/[locale]">) {
  return (
    <>
      <SiteHeader tone="light" minimal />
      <main id="main" className="flex-1 bg-bg text-fg pt-(--header-h-mobile) lg:pt-(--header-h)">
        <div className="mx-auto w-full max-w-(--container) px-(--margin) py-(--s-16) lg:py-(--s-24)">{children}</div>
      </main>
      <footer className="border-t border-rule">
        <div className="mx-auto w-full max-w-(--container) px-(--margin) py-8">
          <Disclosure variant="standing" />
        </div>
      </footer>
    </>
  );
}
