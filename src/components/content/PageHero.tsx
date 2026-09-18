import type { Cta } from "@/content/types";
import { Button } from "@/components/actions/Button";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/typography/Eyebrow";
import { RevealLines } from "@/components/typography/RevealLines";

type PageHeroProps = {
  eyebrow?: string;
  /** One headline, or several lines for a staggered reveal. */
  heading: string | readonly string[];
  sub?: string;
  cta?: Cta;
  secondary?: Cta;
  /** Blueprint coordinate; defaults to "§ / {eyebrow}". Desktop only. */
  coordinate?: string;
};

/** Inner-page opener: navy with grain, registration marks, eyebrow + headline + standfirst. */
export function PageHero({ eyebrow, heading, sub, cta, secondary, coordinate }: PageHeroProps) {
  const lines = typeof heading === "string" ? [heading] : heading;
  const coord = coordinate ?? (eyebrow ? `§ / ${eyebrow}` : undefined);
  return (
    <section data-theme="navy" aria-labelledby="page-heading" className="grain relative overflow-hidden bg-bg text-fg pt-(--header-h-mobile) lg:pt-(--header-h)">
      <span aria-hidden="true" className="reg-mark hidden text-silver lg:block" style={{ top: "calc(var(--header-h) + 14px)", left: 14 }} />
      <span aria-hidden="true" className="reg-mark hidden text-silver lg:block" style={{ top: "calc(var(--header-h) + 14px)", right: 14 }} />
      <span aria-hidden="true" className="reg-mark hidden text-silver lg:block" style={{ bottom: 14, left: 14 }} />
      <span aria-hidden="true" className="reg-mark hidden text-silver lg:block" style={{ bottom: 14, right: 14 }} />
      <Container>
        {coord ? (
          <p aria-hidden="true" className="hidden pt-4 text-eyebrow text-fg-3 opacity-80 lg:block">
            {coord}
          </p>
        ) : null}
        <div className="flex flex-col gap-5 py-(--s-24) lg:py-(--s-32)">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <RevealLines as="h1" id="page-heading" lines={lines} className="text-display-xl max-w-[14ch] text-fg" />
          {sub ? <p className="mt-2 max-w-[56ch] text-body-l text-fg-2">{sub}</p> : null}
          {cta ? (
            <div className="mt-6 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
              <Button href={cta.href} event={cta.event}>
                {cta.label}
              </Button>
              {secondary ? (
                <Button href={secondary.href} event={secondary.event} variant="secondary">
                  {secondary.label}
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
