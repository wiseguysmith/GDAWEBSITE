import type { Metadata } from "next";
import { content } from "@/content";
import { pageMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ContentBlock } from "@/components/content/ContentBlock";
import { FAQ } from "@/components/content/FAQ";
import { FinalCTA } from "@/components/content/FinalCTA";
import { PageHero } from "@/components/content/PageHero";
import { PillarRow } from "@/components/content/PillarRow";
import { ProcessTimeline } from "@/components/content/ProcessTimeline";
import { ResponsibilityLedger } from "@/components/content/ResponsibilityLedger";
import { SectionHead } from "@/components/content/SectionHead";

const { howItWorks: page, shared } = content;

export const metadata: Metadata = pageMetadata({ ...page.meta, path: "/how-it-works" });

export default function HowItWorksPage() {
  return (
    <>
      <PageHero eyebrow={page.hero.eyebrow} heading={page.hero.heading} sub={page.hero.sub} />

      <Section aria-labelledby="pillars" id="evaluate">
        <Container>
          <SectionHead id="pillars" eyebrow={page.pillarsIntro.eyebrow} heading={page.pillarsIntro.heading} body={page.pillarsIntro.body} />
          <div className="mt-(--head-gap)">
            <PillarRow pillars={shared.pillars} linked={false} />
          </div>
        </Container>
      </Section>

      <Section theme="white" aria-labelledby="stages" id="structure">
        <Container>
          <SectionHead id="stages" eyebrow={page.stagesIntro.eyebrow} heading={page.stagesIntro.heading} body={page.stagesIntro.body} />
          <div className="mt-(--head-gap)">
            <ProcessTimeline stages={shared.stages} detailed />
          </div>
        </Container>
      </Section>

      <Section theme="dark" aria-labelledby="responsibilities" id="activate">
        <Container>
          <SectionHead id="responsibilities" eyebrow={page.responsibilities.eyebrow} heading={page.responsibilities.heading} body={page.responsibilities.body} />
          <div className="mt-(--head-gap)">
            <ResponsibilityLedger columns={shared.responsibilityLedger} />
          </div>
        </Container>
      </Section>

      <Section aria-label="What GDA does and does not do">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-x-(--gutter)">
            <ContentBlock block={page.does} />
            <ContentBlock block={page.doesNot} />
          </div>
        </Container>
      </Section>

      <Section theme="white" aria-labelledby="faq">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHead id="faq" eyebrow={page.faq.eyebrow} heading={page.faq.heading} />
            </div>
            <div className="lg:col-span-8">
              <FAQ items={page.faq.items} />
            </div>
          </div>
        </Container>
      </Section>

      <FinalCTA heading={page.cta.heading} body={page.cta.body} primary={page.cta.primary} secondary={page.cta.secondary} />
    </>
  );
}
