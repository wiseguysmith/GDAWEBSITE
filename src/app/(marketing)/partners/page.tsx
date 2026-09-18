import type { Metadata } from "next";
import { content } from "@/content";
import { pageMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ContentBlock } from "@/components/content/ContentBlock";
import { FinalCTA } from "@/components/content/FinalCTA";
import { PageHero } from "@/components/content/PageHero";
import { PartnerCategories } from "@/components/content/PartnerCategories";
import { ResponsibilityLedger } from "@/components/content/ResponsibilityLedger";
import { SectionHead } from "@/components/content/SectionHead";

const { partners: page, partnerCategories, partnerLogos, shared } = content;

export const metadata: Metadata = pageMetadata({ ...page.meta, path: "/partners" });

export default function PartnersPage() {
  return (
    <>
      <PageHero eyebrow={page.hero.eyebrow} heading={page.hero.heading} sub={page.hero.sub} />

      <Section aria-labelledby="model">
        <Container>
          <SectionHead id="model" eyebrow={page.model.eyebrow} heading={page.model.heading} body={page.model.body} />
          <div className="mt-(--head-gap)">
            <ResponsibilityLedger columns={shared.responsibilityLedger} />
          </div>
        </Container>
      </Section>

      <Section theme="white" aria-labelledby="categories">
        <Container>
          <SectionHead id="categories" eyebrow={page.categories.eyebrow} heading={page.categories.heading} body={page.categories.body} />
          <div className="mt-(--head-gap)">
            <PartnerCategories categories={partnerCategories} logos={partnerLogos} descriptors columns={3} />
          </div>
        </Container>
      </Section>

      <Section theme="dark" aria-label="How partners are selected and engaged">
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
