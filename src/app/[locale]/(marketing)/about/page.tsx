import type { Metadata } from "next";
import { getContent } from "@/content";
import { footprintQualifier } from "@/lib/jurisdictions/footprint";
import { getLocale } from "@/lib/i18n/server";
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

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return pageMetadata({ ...getContent(locale).about.meta, path: "/about" }, locale);
}

export default async function AboutPage() {
  const locale = await getLocale();
  const { about: page, shared, team } = getContent(locale);
  const showTeam = approvedMembers(team).length > 0;
  return (
    <>
      <PageHero eyebrow={page.hero.eyebrow} heading={page.hero.lines} sub={page.hero.sub} />

      <Section aria-label={page.mission.heading} coordinate={`§ 01 / ${page.mission.heading}`} ticks>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-x-(--gutter)">
            <ContentBlock block={page.mission} />
            <ContentBlock block={page.why} />
          </div>
        </Container>
      </Section>

      <Section theme="white" aria-labelledby="principles" coordinate={`§ 02 / ${page.principlesIntro.eyebrow}`} ticks>
        <Container>
          <SectionHead id="principles" eyebrow={page.principlesIntro.eyebrow} heading={page.principlesIntro.heading} />
          <div className="mt-(--head-gap)">
            <PrincipleList items={shared.brandPrinciples} numbered />
          </div>
        </Container>
      </Section>

      <Section theme="dark" aria-label={page.network.heading} coordinate={`§ 03 / ${page.jurisdictionModel.heading}`} ticks>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-x-(--gutter)">
            <ContentBlock block={page.network} />
            <ContentBlock block={page.jurisdictionModel} />
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="footprint" coordinate={`§ 04 / ${page.footprint.eyebrow}`} ticks>
        <Container>
          <SectionHead id="footprint" eyebrow={page.footprint.eyebrow} heading={page.footprint.heading} body={page.footprint.body} />
          <div className="mt-(--head-gap)">
            <FootprintList locale={locale} />
          </div>
          <div className="mt-8 flex max-w-(--container-prose) flex-col gap-3">
            <p className="text-small text-fg-2">{footprintQualifier[locale]}</p>
            <p className="text-small text-fg-3">{page.footprint.caveat}</p>
          </div>
        </Container>
      </Section>

      {showTeam ? (
        <Section theme="white" aria-labelledby="team" coordinate={`§ 05 / ${page.team.eyebrow}`} ticks>
          <Container>
            <SectionHead id="team" eyebrow={page.team.eyebrow} heading={page.team.heading} />
            <div className="mt-(--head-gap)">
              <TeamGrid members={team} bios />
            </div>
          </Container>
        </Section>
      ) : null}

      <Section theme="navy" aria-labelledby="contact" coordinate={`§ 06 / ${page.contact.heading}`} ticks>
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
