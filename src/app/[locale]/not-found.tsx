import type { Metadata } from "next";
import { clientContent } from "@/content/client";
import { getLocale } from "@/lib/i18n/server";
import { Button } from "@/components/actions/Button";
import { Container } from "@/components/layout/Container";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Eyebrow } from "@/components/typography/Eyebrow";

export const metadata: Metadata = { title: "404", robots: { index: false, follow: false } };

export default async function NotFound() {
  const locale = await getLocale();
  const { errors, nav } = clientContent[locale];
  return (
    <>
      <SiteHeader />
      <main id="main" data-theme="navy" className="grain flex flex-1 flex-col bg-bg text-fg pt-(--header-h-mobile) lg:pt-(--header-h)">
        <Container className="flex flex-1 flex-col justify-center py-(--s-24)">
          <Eyebrow numeral="404">{errors.notFound.eyebrow}</Eyebrow>
          <h1 className="mt-6 max-w-[14ch] text-display-xl text-fg">{errors.notFound.heading}</h1>
          <p className="mt-8 max-w-[46ch] text-body-l text-fg-2">{errors.notFound.body}</p>
          <div className="mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <Button href="/">{errors.notFound.home}</Button>
            <Button href={nav.cta.href} event="evaluate" variant="secondary">
              {nav.cta.label}
            </Button>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
