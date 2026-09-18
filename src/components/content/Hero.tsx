import type { Cta } from "@/content/types";
import { Button } from "@/components/actions/Button";
import { Container } from "@/components/layout/Container";
import { RevealLines } from "@/components/typography/RevealLines";
import { HeroGrid } from "./HeroGrid";

type HeroProps = {
  lines: readonly string[];
  sub: string;
  primary: Cta;
  secondary?: Cta;
  principles?: readonly string[];
  /** Footprint sentence shown at wide widths only. */
  footprint?: string;
  /** Headline level. Homepage uses h1. */
  as?: "h1" | "h2";
  /** Full-viewport on desktop (homepage) or content-height (inner pages). */
  size?: "full" | "page";
  grid?: boolean;
  id?: string;
};

/** Navy hero: type on columns 1–8, line grid right, principle strip beneath. */
export function Hero({ lines, sub, primary, secondary, principles, footprint, as = "h1", size = "full", grid = true, id = "hero-heading" }: HeroProps) {
  return (
    <section
      data-theme="navy"
      aria-labelledby={id}
      className="relative overflow-hidden bg-bg text-fg pt-(--header-h-mobile) lg:pt-(--header-h)"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(120% 80% at 80% 20%, rgba(255,255,255,0.05), transparent 60%)" }}
      />
      {grid ? <HeroGrid /> : null}

      <Container className="relative">
        <div
          className={
            size === "full"
              ? "flex min-h-[calc(100svh-var(--header-h))] flex-col justify-center py-(--s-24)"
              : "py-(--s-24)"
          }
        >
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

          {principles?.length ? (
            <div className="mt-auto flex flex-col gap-3 pt-(--s-16) sm:flex-row sm:flex-wrap sm:justify-between sm:gap-6">
              <ul className="flex flex-col gap-3 text-eyebrow text-fg-3 sm:flex-row sm:flex-wrap sm:gap-8">
                {principles.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              {footprint ? <p className="hidden text-eyebrow text-fg-3 xl:block">{footprint}</p> : null}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
