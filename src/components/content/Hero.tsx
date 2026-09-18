import type { Cta } from "@/content/types";
import { Button } from "@/components/actions/Button";
import { Container } from "@/components/layout/Container";
import { RevealLines } from "@/components/typography/RevealLines";
import { HeroGrid } from "./HeroGrid";
import { SystemStrip, type SystemFact } from "./SystemStrip";

type HeroProps = {
  lines: readonly string[];
  sub: string;
  primary: Cta;
  secondary?: Cta;
  principles?: readonly string[];
  /** Footprint sentence shown at wide widths only. */
  footprint?: string;
  /** Blueprint coordinate at the top-left, desktop only. */
  coordinate?: string;
  /** Structural facts for the system strip; omit to hide the strip. */
  facts?: SystemFact[];
  /** Headline level. Homepage uses h1. */
  as?: "h1" | "h2";
  /** Full-viewport on desktop (homepage) or content-height (inner pages). */
  size?: "full" | "page";
  grid?: boolean;
  id?: string;
};

/**
 * Navy hero: type on columns 1–8, line grid drawing itself on the right,
 * registration marks and a coordinate framing the sheet, principle strip and
 * system strip beneath (design direction §01).
 */
export function Hero({ lines, sub, primary, secondary, principles, footprint, coordinate, facts, as = "h1", size = "full", grid = true, id = "hero-heading" }: HeroProps) {
  return (
    <section data-theme="navy" aria-labelledby={id} className="grain relative overflow-hidden bg-bg text-fg pt-(--header-h-mobile) lg:pt-(--header-h)">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(120% 80% at 80% 20%, rgba(255,255,255,0.05), transparent 60%)" }}
      />
      {grid ? <HeroGrid /> : null}

      {/* Registration marks — the sheet's corners (desktop only). */}
      <span aria-hidden="true" className="reg-mark hidden text-silver lg:block" style={{ top: "calc(var(--header-h) + 14px)", left: 14 }} />
      <span aria-hidden="true" className="reg-mark hidden text-silver lg:block" style={{ top: "calc(var(--header-h) + 14px)", right: 14 }} />
      <span aria-hidden="true" className="reg-mark hidden text-silver lg:block" style={{ bottom: 14, left: 14 }} />
      <span aria-hidden="true" className="reg-mark hidden text-silver lg:block" style={{ bottom: 14, right: 14 }} />

      <Container className="relative">
        {coordinate ? (
          <p aria-hidden="true" className="hidden pt-4 text-eyebrow text-fg-3 opacity-80 lg:block">
            {coordinate}
          </p>
        ) : null}
        <div className={size === "full" ? "flex min-h-[calc(100svh-var(--header-h))] flex-col justify-center pt-(--s-16) pb-(--s-12)" : "py-(--s-24)"}>
          <RevealLines as={as} id={id} lines={lines} className="text-display-xl max-w-[12ch] text-fg" />
          <p className="mt-8 max-w-[46ch] text-body-l text-fg-2">{sub}</p>
          <div className="mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <Button href={primary.href} event={primary.event}>
              {primary.label}
            </Button>
            {secondary ? (
              <Button href={secondary.href} event={secondary.event} variant="secondary">
                {secondary.label}
              </Button>
            ) : null}
          </div>

          <div className="mt-auto flex flex-col gap-6 pt-(--s-12)">
            {principles?.length ? (
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-between sm:gap-6">
                <ul className="flex flex-col gap-3 text-eyebrow text-fg-3 sm:flex-row sm:flex-wrap sm:gap-8">
                  {principles.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                {footprint ? <p className="hidden text-eyebrow text-fg-3 xl:block">{footprint}</p> : null}
              </div>
            ) : null}
            {facts?.length ? <SystemStrip facts={facts} /> : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
