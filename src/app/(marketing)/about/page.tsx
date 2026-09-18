import type { Metadata } from "next";
import { content } from "@/content";
import { footprintQualifier } from "@/lib/jurisdictions/footprint";
import { pageMetadata } from "@/lib/seo/metadata";
import { Button } from "@/components/actions/Button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ContentBlock } from "@/components/content/ContentBlock";
import { FootprintList } from "@/components/content/FootprintList";
import { PageHero } from "@/components/content/PageHero";
import { PrincipleList } from "@/components/content/PrincipleList";
import { SectionHead } from "@/components/content/SectionHead";
import { TeamGrid, approvedMembers } from "@/components/content/TeamGrid";

const { about: page, shared, team } = content;

export const metadata: Metadata = pageMetadata({ ...page.meta, path: "/about" });

export default function AboutPage() {
  const showTeam = approvedMembers(team).length > 0;
  return (
    <>
      <PageHero eyebrow={page.hero.eyebrow} heading={page.hero.lines} sub={page.hero.sub} />

      <Section aria-label="Mission and purpose">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-x-(--gutter)">
            <ContentBlock block={page.mission} />
            <ContentBlock block={page.why} />
          </div>
        </Container>
      </Section>

      <Section theme="white" aria-labelledby="principles">
        <Container>
          <SectionHead id="principles" eyebrow={page.principlesIntro.eyebrow} heading={page.principlesIntro.heading} />
          <div className="mt-(--head-gap)">
            <PrincipleList items={shared.brandPrinciples} numbered />
          </div>
        </Container>
      </Section>

      <Section theme="dark" aria-label="Network philosophy and jurisdiction-aware model">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-x-(--gutter)">
            <ContentBlock block={page.network} />
            <ContentBlock block={page.jurisdictionModel} />
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="footprint">
        <Container>
          <SectionHead id="footprint" eyebrow={page.footprint.eyebrow} heading={page.footprint.heading} body={page.footprint.body} />
          <div className="mt-(--head-gap)">
            <FootprintList />
          </div>
          <div className="mt-8 flex max-w-(--container-prose) flex-col gap-3">
            <p className="text-small text-fg-2">{footprintQualifier}</p>
            <p className="text-small text-fg-3">{page.footprint.caveat}</p>
          </div>
        </Container>
      </Section>

      {showTeam ? (
        <Section theme="white" aria-labelledby="team">
          <Container>
            <SectionHead id="team" eyebrow={page.team.eyebrow} heading={page.team.heading} />
            <div className="mt-(--head-gap)">
              <TeamGrid members={team} bios />
            </div>
          </Container>
        </Section>
      ) : null}

      <Section theme="navy" aria-labelledby="contact">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <h2 id="contact" className="text-display-l text-fg">
                {page.contact.heading}
              </h2>
              <p className="mt-6 max-w-[56ch] text-body-l text-fg-2">{page.contact.body}</p>
              <div className="mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
                <Button href={page.contact.primary.href} event={page.contact.primary.event}>
                  {page.contact.primary.label}
                </Button>
                <Button href={page.contact.secondary.href} event={page.contact.secondary.event} variant="secondary">
                  {page.contact.secondary.label}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
