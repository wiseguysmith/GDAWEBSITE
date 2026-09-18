import type { Metadata } from "next";
import { Suspense } from "react";
import { getContent } from "@/content";
import { getLocale } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo/metadata";
import { ArrowLink } from "@/components/actions/ArrowLink";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/content/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return pageMetadata({ ...getContent(locale).contact.meta, path: "/contact" }, locale);
}

export default async function ContactPage() {
  const locale = await getLocale();
  const { contact: page } = getContent(locale);
  return (
    <>
      <PageHero eyebrow={page.hero.eyebrow} heading={page.hero.heading} sub={page.hero.sub} />
      <Section theme="white" aria-label={page.form.typeLabel} coordinate={`§ 01 / ${page.hero.eyebrow}`} ticks>
        <Container>
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Suspense fallback={null}>
                <ContactForm />
              </Suspense>
            </div>
            <aside className="lg:col-span-4 lg:col-start-9 flex flex-col gap-8 border-t border-rule pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
              {[page.aside.project, page.aside.investor].map((item) => (
                <div key={item.title} className="flex flex-col gap-2">
                  <h2 className="text-h4 text-fg">{item.title}</h2>
                  <p className="text-body text-fg-2">{item.body}</p>
                  <ArrowLink href={item.link.href} className="mt-2">
                    {item.link.label}
                  </ArrowLink>
                </div>
              ))}
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
