import type { Metadata } from "next";
import { content } from "@/content";
import { pageMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ApplicationList } from "@/components/content/ApplicationList";
import { ContentBlock } from "@/components/content/ContentBlock";
import { FinalCTA } from "@/components/content/FinalCTA";
import { PageHero } from "@/components/content/PageHero";
import { SectionHead } from "@/components/content/SectionHead";

const { projects: page, shared } = content;

export const metadata: Metadata = pageMetadata({ ...page.meta, path: "/projects" });

export default function ProjectsPage() {
  return (
    <>
      <PageHero eyebrow={page.hero.eyebrow} heading={page.hero.heading} sub={page.hero.sub} cta={page.hero.cta} />

      <Section aria-label="Who GDA works with" coordinate="§ 01 / Who" ticks>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-x-(--gutter)">
            <ContentBlock block={page.whoFor} />
            <ContentBlock block={page.whoNotFor} />
          </div>
        </Container>
      </Section>

      <Section theme="white" aria-labelledby="categories" coordinate="§ 02 / Categories" ticks>
        <Container>
          <SectionHead id="categories" eyebrow={page.categories.eyebrow} heading={page.categories.heading} body={page.categories.body} />
          <div className="mt-(--head-gap)">
            <ApplicationList items={shared.applications} note={shared.instrumentsNote} />
          </div>
        </Container>
      </Section>

      <Section theme="dark" aria-labelledby="readiness" coordinate="§ 03 / Readiness" coordinateRight="13 areas · not every area applies to every project" ticks>
        <Container>
          <SectionHead id="readiness" eyebrow={page.readiness.eyebrow} heading={page.readiness.heading} body={page.readiness.body} />
          <ol className="mt-(--head-gap) grid border-t border-rule sm:grid-cols-2 lg:grid-cols-3">
            {shared.readinessAreas.map((area, i) => (
              <li key={area} className="flex items-baseline gap-4 border-b border-rule py-4 pr-6">
                <span className="text-eyebrow text-fg-3 tabular">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-body text-fg">{area}</span>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section aria-labelledby="prepare" coordinate="§ 04 / Prepare" ticks>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHead id="prepare" eyebrow={page.prepare.eyebrow} heading={page.prepare.heading} body={page.prepare.body} />
            </div>
            <ol className="lg:col-span-7 flex flex-col border-t border-rule">
              {page.prepare.items.map((item, i) => (
                <li key={item} className="flex gap-5 border-b border-rule py-5">
                  <span className="text-eyebrow text-fg-3 tabular pt-1">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-body text-fg-2">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <FinalCTA heading={page.cta.heading} body={page.cta.body} primary={page.cta.primary} secondary={page.cta.secondary} />
    </>
  );
}
