import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent } from "@/content";
import { getLocale } from "@/lib/i18n/server";
import { supportedJurisdictions } from "@/lib/jurisdictions/supported";
import { Button } from "@/components/actions/Button";
import { ArrowLink } from "@/components/actions/ArrowLink";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Hero } from "@/components/content/Hero";
import { SectionHead } from "@/components/content/SectionHead";
import { StagePosition } from "@/components/content/StagePosition";
import { SystemStrip } from "@/components/content/SystemStrip";
import { Checkbox, CountrySelect, Input, Select, Textarea } from "@/components/forms/Controls";
import { Field } from "@/components/forms/Field";
import { InfoDrawer } from "@/components/forms/InfoDrawer";

export const metadata: Metadata = { title: "Components (dev)", robots: { index: false, follow: false } };

/**
 * Development-only gallery to review each component on both grounds.
 * Never served in production (handoff §42 step 3).
 */
export default async function ComponentsPage() {
  if (process.env.NODE_ENV === "production") notFound();
  const locale = await getLocale();
  const { home, shared, partnerCategories, fitCheck, legal, flowUi } = getContent(locale);
  const facts = [
    { value: shared.stages.length, label: home.hero.system.stages },
    { value: shared.readinessAreas.length, label: home.hero.system.areas },
    { value: supportedJurisdictions.length, label: home.hero.system.jurisdictions },
    { value: partnerCategories.length, label: home.hero.system.categories },
  ];

  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Hero
          lines={home.hero.lines}
          sub={home.hero.sub}
          primary={home.hero.primary}
          secondary={home.hero.secondary}
          principles={home.hero.principles}
          coordinate="§ DEV / Hero"
          facts={facts}
          size="page"
        />

        <Section coordinate="§ DEV / Stage position" ticks>
          <Container>
            <SectionHead id="dev-position" eyebrow="Design direction §02" heading="Stage position" />
            <div className="mt-(--head-gap) flex flex-col gap-8">
              <StagePosition stages={shared.stages} current={1} currentState={flowUi.position.fitPotential} />
              <StagePosition stages={shared.stages} current={3} currentState="—" />
            </div>
          </Container>
        </Section>

        <Section theme="dark" coordinate="§ DEV / Dark ground" ticks>
          <Container>
            <SectionHead id="dev-dark" eyebrow="Grain and controls on navy" heading="Dark ground" />
            <div className="mt-(--head-gap) flex flex-col gap-8">
              <SystemStrip facts={facts} />
              <div className="flex flex-wrap gap-3">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <ArrowLink href="#">Arrow link</ArrowLink>
              </div>
            </div>
          </Container>
        </Section>

        <Section theme="white" coordinate="§ DEV / Forms" ticks>
          <Container width="narrow">
            <SectionHead id="dev-forms" eyebrow="Design direction §04, §07" heading="Form controls" />
            <div className="mt-(--head-gap) flex flex-col gap-8">
              <div className="flex flex-wrap gap-3">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button loading>Loading</Button>
              </div>
              <Field id="dev-in" label="Text input" help="Focus to see the underline draw.">
                <Input id="dev-in" placeholder="Organisation" />
              </Field>
              <Field id="dev-sel" label="Select">
                <Select id="dev-sel" options={fitCheck.steps.economics.options} placeholder={flowUi.selectPlaceholder} />
              </Field>
              <Field id="dev-country" label="Country">
                <CountrySelect id="dev-country" />
              </Field>
              <Field id="dev-ta" label="Textarea" error="Example error state, shown by icon and text.">
                <Textarea id="dev-ta" invalid />
              </Field>
              <Checkbox id="dev-cb" label={legal.consent} />
              <InfoDrawer />
            </div>
          </Container>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
