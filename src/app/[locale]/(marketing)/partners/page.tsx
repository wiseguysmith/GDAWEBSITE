import type { Metadata } from "next";
import { getContent } from "@/content";
import { getLocale } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ContentBlock } from "@/components/content/ContentBlock";
import { FinalCTA } from "@/components/content/FinalCTA";
import { PageHero } from "@/components/content/PageHero";
import { PartnerCategories } from "@/components/content/PartnerCategories";
import { ResponsibilityLedger } from "@/components/content/ResponsibilityLedger";
import { SectionHead } from "@/components/content/SectionHead";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return pageMetadata({ ...getContent(locale).partners.meta, path: "/partners" }, locale);
}

export default async function PartnersPage() {
  const locale = await getLocale();
  const { partners: page, partnerCategories, partnerLogos, shared } = getContent(locale);
  return (
    <>
      <PageHero eyebrow={page.hero.eyebrow} heading={page.hero.heading} sub={page.hero.sub} />

      <Section aria-labelledby="model" coordinate={`§ 01 / ${page.model.eyebrow}`} ticks>
        <Container>
          <SectionHead id="model" eyebrow={page.model.eyebrow} heading={page.model.heading} body={page.model.body} />
          <div className="mt-(--head-gap)">
            <ResponsibilityLedger columns={shared.responsibilityLedger} />
          </div>
        </Container>
      </Section>

      <Section theme="white" aria-labelledby="categories" coordinate={`§ 02 / ${page.categories.eyebrow}`} ticks>
        <Container>
          <SectionHead id="categories" eyebrow={page.categories.eyebrow} heading={page.categories.heading} body={page.categories.body} />
          <div className="mt-(--head-gap)">
            <PartnerCategories categories={partnerCategories} logos={partnerLogos} descriptors columns={3} />
          </div>
        </Container>
      </Section>

      <Section theme="dark" aria-label={page.selection.heading} coordinate={`§ 03 / ${page.selection.heading}`} ticks>
        <Container>
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-x-(--gutter)">
            <ContentBlock block={page.selection} as="h3" />
            <ContentBlock block={page.jurisdiction} as="h3" />
            <ContentBlock block={page.scope} as="h3" />
          </div>
        </Container>
      </Section>

      <FinalCTA heading={page.cta.heading} body={page.cta.body} primary={page.cta.primary} />
    </>
  );
}
