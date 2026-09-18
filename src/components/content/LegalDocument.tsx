import type { LegalDocument as LegalDocumentType } from "@/content/types";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "./PageHero";

type LegalDocumentProps = {
  doc: LegalDocumentType;
  eyebrow: string;
};

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return new Intl.DateTimeFormat("en", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(d);
}

/** Legal and supporting pages: version and date in the head, sections in the prose measure. */
export function LegalDocument({ doc, eyebrow }: LegalDocumentProps) {
  return (
    <>
      <PageHero eyebrow={eyebrow} heading={doc.title} sub={doc.intro} />
      <Section theme="white" spacing="tight">
        <Container width="prose">
          <p className="text-eyebrow text-fg-3 flex flex-wrap gap-x-6 gap-y-2 border-b border-rule pb-6">
            <span>Version {doc.version}</span>
            <span>Updated {formatDate(doc.updatedAt)}</span>
          </p>
          <div className="mt-10 flex flex-col gap-10">
            {doc.sections.map((section) => (
              <section key={section.heading} className="flex flex-col gap-3">
                <h2 className="text-h4 text-fg">{section.heading}</h2>
                {section.paragraphs.map((p) => (
                  <p key={p} className="text-body text-fg-2">
                    {p}
                  </p>
                ))}
                {section.bullets?.length ? (
                  <ul className="flex flex-col gap-2">
                    {section.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-body text-fg-2">
                        <span aria-hidden="true" className="mt-[0.75em] h-px w-3 shrink-0 bg-rule-strong" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
