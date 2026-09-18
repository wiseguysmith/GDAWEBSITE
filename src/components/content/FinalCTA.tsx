import type { Cta } from "@/content/types";
import { Button } from "@/components/actions/Button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

type FinalCTAProps = {
  heading: string;
  body?: string;
  primary: Cta;
  secondary?: Cta;
  id?: string;
};

/** Navy closing section: large type, two actions. */
export function FinalCTA({ heading, body, primary, secondary, id = "final-cta-heading" }: FinalCTAProps) {
  return (
    <Section theme="navy" aria-labelledby={id}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 id={id} className="text-display-l text-fg max-w-[16ch]">
              {heading}
            </h2>
            {body ? <p className="mt-6 max-w-[56ch] text-body-l text-fg-2">{body}</p> : null}
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
          </div>
        </div>
      </Container>
    </Section>
  );
}
