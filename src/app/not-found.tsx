import type { Metadata } from "next";
import { content } from "@/content";
import { Button } from "@/components/actions/Button";
import { Container } from "@/components/layout/Container";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Eyebrow } from "@/components/typography/Eyebrow";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: false } };

export default function NotFound() {
  const { home } = content;
  return (
    <>
      <SiteHeader />
      <main id="main" data-theme="navy" className="flex flex-1 flex-col bg-bg text-fg pt-(--header-h-mobile) lg:pt-(--header-h)">
        <Container className="flex flex-1 flex-col justify-center py-(--s-24)">
          <Eyebrow numeral="404">Not found</Eyebrow>
          <h1 className="mt-6 max-w-[14ch] text-display-xl text-fg">This page does not exist.</h1>
          <p className="mt-8 max-w-[46ch] text-body-l text-fg-2">The address may be out of date, or the page may not be available yet.</p>
          <div className="mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <Button href="/">Return to the homepage</Button>
            <Button href={home.hero.primary.href} event="evaluate" variant="secondary">
              {home.hero.primary.label}
            </Button>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
