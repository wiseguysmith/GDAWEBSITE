import type { Metadata } from "next";
import { content } from "@/content";
import { pageMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ContentBlock } from "@/components/content/ContentBlock";
import { Disclosure } from "@/components/content/Disclosure";
import { FinalCTA } from "@/components/content/FinalCTA";
import { PageHero } from "@/components/content/PageHero";
import { SectionHead } from "@/components/content/SectionHead";

const { investors: page } = content;

export const metadata: Metadata = pageMetadata({ ...page.meta, path: "/investors" });

export default function InvestorsPage() {
  return (
    <>
      <PageHero eyebrow={page.hero.eyebrow} heading={page.hero.heading} sub={page.hero.sub} cta={page.hero.cta} />

      <Section aria-label="What requesting access means" coordinate="§ 01 / Access" ticks>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-x-(--gutter)">
            <ContentBlock block={page.means} />
            <ContentBlock block={page.doesNotMean} />
          </div>
          <div className="mt-12 flex flex-col gap-4 border-t border-rule pt-8">
            <p className="text-eyebrow text-fg-3">{page.dependsOn.eyebrow}</p>
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {page.dependsOn.items.map((item) => (
                <li key={item} className="text-h4 text-fg">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section theme="dark" aria-labelledby="pathway" coordinate="§ 02 / Pathway" coordinateRight="Request → Profile → Verification → Access" ticks>
        <Container>
          <SectionHead id="pathway" eyebrow={page.pathway.eyebrow} heading={page.pathway.heading} />
          <ol className="mt-(--head-gap) grid border-t border-rule md:grid-cols-2 lg:grid-cols-4">
            {page.pathway.steps.map((step, i) => (
              <li key={step.title} className="flex flex-col gap-3 border-b border-rule py-6 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0 lg:[&:nth-child(2)]:border-r">
                <span className="text-eyebrow text-fg-3 tabular">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-h4 text-fg">{step.title}</h3>
                <p className="text-body text-fg-2">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section theme="white" aria-label="The role of licensed partners" coordinate="§ 03 / Licensed partners" ticks>
        <Container>
          <ContentBlock block={page.licensedRole} />
          <Disclosure variant="investor" className="mt-10 border-t border-rule pt-6" />
        </Container>
      </Section>

      <FinalCTA heading={page.cta.heading} body={page.cta.body} primary={page.cta.primary} secondary={page.cta.secondary} />
    </>
  );
}
