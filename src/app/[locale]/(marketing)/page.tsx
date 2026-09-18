import type { Metadata } from "next";
import { getContent } from "@/content";
import { footprintSentence } from "@/lib/jurisdictions/footprint";
import { supportedJurisdictions } from "@/lib/jurisdictions/supported";
import { getLocale } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo/metadata";
import { ArrowLink } from "@/components/actions/ArrowLink";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ApplicationList } from "@/components/content/ApplicationList";
import { FinalCTA } from "@/components/content/FinalCTA";
import { Hero } from "@/components/content/Hero";
import { PartnerCategories } from "@/components/content/PartnerCategories";
import { PathwaySplit } from "@/components/content/PathwaySplit";
import { PillarRow } from "@/components/content/PillarRow";
import { ProcessTimeline } from "@/components/content/ProcessTimeline";
import { ResponsibilityLedger } from "@/components/content/ResponsibilityLedger";
import { SectionHead } from "@/components/content/SectionHead";
import { TeamGrid, approvedMembers } from "@/components/content/TeamGrid";
import { ValidationMatrix } from "@/components/content/ValidationMatrix";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return pageMetadata({ ...getContent(locale).home.meta, path: "/", absoluteTitle: true }, locale);
}

export default async function HomePage() {
  const locale = await getLocale();
  const { home, shared, partnerCategories, partnerLogos, team } = getContent(locale);
  const featuredCategories = partnerCategories.filter((c) => c.featured);
  const showTeam = approvedMembers(team).length > 0;

  // Structural facts, derived — never typed — so the strip can only state what the content contains.
  const facts = [
    { value: shared.stages.length, label: home.hero.system.stages },
    { value: shared.readinessAreas.length, label: home.hero.system.areas },
    { value: supportedJurisdictions.length, label: home.hero.system.jurisdictions },
    { value: partnerCategories.length, label: home.hero.system.categories },
  ];

  return (
    <>
      {/* 01 — Hero */}
      <Hero
        lines={home.hero.lines}
        sub={home.hero.sub}
        primary={home.hero.primary}
        secondary={home.hero.secondary}
        principles={home.hero.principles}
        footprint={footprintSentence(locale)}
        coordinate={home.hero.coordinate}
        facts={facts}
      />

      {/* 02 — What GDA does */}
      <Section aria-labelledby="what-we-do" coordinate={home.whatWeDo.coordinate} ticks>
        <Container>
          <SectionHead id="what-we-do" eyebrow={home.whatWeDo.eyebrow} heading={home.whatWeDo.heading} />
          <div className="mt-(--head-gap)">
            <PillarRow pillars={shared.pillars} />
          </div>
        </Container>
      </Section>

      {/* 03 — How it works */}
      <Section theme="white" aria-labelledby="how-it-works" coordinate={home.howItWorks.coordinate} coordinateRight={home.howItWorks.coordinateRight} ticks>
        <Container>
          <SectionHead id="how-it-works" eyebrow={home.howItWorks.eyebrow} heading={home.howItWorks.heading} body={home.howItWorks.sub} />
          <div className="mt-(--head-gap)">
            <ProcessTimeline stages={shared.stages} stageLabel={home.howItWorks.stageLabel} />
          </div>
          <div className="mt-12">
            <ArrowLink href={home.howItWorks.link.href}>{home.howItWorks.link.label}</ArrowLink>
          </div>
        </Container>
      </Section>

      {/* 04 — Real-world applications */}
      <Section aria-labelledby="applications" coordinate={home.applications.coordinate} ticks>
        <Container>
          <SectionHead id="applications" eyebrow={home.applications.eyebrow} heading={home.applications.heading} />
          <div className="mt-(--head-gap)">
            <ApplicationList items={shared.applications} note={shared.instrumentsNote} />
          </div>
          <div className="mt-10">
            <ArrowLink href={home.applications.link.href}>{home.applications.link.label}</ArrowLink>
          </div>
        </Container>
      </Section>

      {/* 05 — Professional validation */}
      <Section theme="dark" aria-labelledby="validation" coordinate={home.validation.coordinate} coordinateRight={home.validation.coordinateRight} ticks>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHead id="validation" eyebrow={home.validation.eyebrow} heading={home.validation.heading} />
              <p className="mt-6 max-w-[52ch] text-body-l text-fg-2">{home.validation.body}</p>
            </div>
            <div className="lg:col-span-7">
              <ValidationMatrix principles={shared.validationPrinciples} />
            </div>
          </div>
          <div className="mt-16 hidden lg:block">
            <ResponsibilityLedger columns={shared.responsibilityLedger} />
          </div>
        </Container>
      </Section>

      {/* 06 — Two pathways */}
      <Section theme="white" aria-label={home.pathwaysCoordinate} coordinate={home.pathwaysCoordinate} ticks>
        <Container>
          <PathwaySplit project={home.pathways.project} investor={home.pathways.investor} />
        </Container>
      </Section>

      {/* 07 — Professional network */}
      <Section aria-labelledby="network" coordinate={home.network.coordinate} ticks>
        <Container>
          <SectionHead id="network" eyebrow={home.network.eyebrow} heading={home.network.heading} body={home.network.body} />
          <div className="mt-(--head-gap)">
            <PartnerCategories categories={featuredCategories} logos={partnerLogos} />
          </div>
          <div className="mt-10">
            <ArrowLink href={home.network.link.href}>{home.network.link.label}</ArrowLink>
          </div>
        </Container>
      </Section>

      {/* 08 — Team (gated on real content) */}
      {showTeam ? (
        <Section theme="white" aria-labelledby="team" coordinate={home.team.coordinate} ticks>
          <Container>
            <SectionHead id="team" eyebrow={home.team.eyebrow} heading={home.team.heading} />
            <div className="mt-(--head-gap)">
              <TeamGrid members={team} />
            </div>
            <div className="mt-10">
              <ArrowLink href={home.team.link.href}>{home.team.link.label}</ArrowLink>
            </div>
          </Container>
        </Section>
      ) : null}

      {/* 09 — Final CTA */}
      <FinalCTA heading={home.finalCta.heading} body={home.finalCta.body} primary={home.finalCta.primary} secondary={home.finalCta.secondary} />
    </>
  );
}
