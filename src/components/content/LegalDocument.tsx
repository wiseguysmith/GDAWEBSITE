import type { LegalDocument as LegalDocumentType } from "@/content/types";
import { cn } from "@/lib/cn";
import { localeMeta, type Locale } from "@/lib/i18n/locales";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "./PageHero";

type Controls = NonNullable<LegalDocumentType["controls"]>;

/**
 * Controls at a glance (design direction §05): every control with its state,
 * shown by word and by mark — never colour alone. "Not claimed" rows are as
 * present as "Implemented" rows.
 */
function ControlsMatrix({ controls }: { controls: Controls }) {
  return (
    <section aria-labelledby="controls-heading" className="mt-10">
      <h2 id="controls-heading" className="text-h4 text-fg">
        {controls.heading}
      </h2>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full border-collapse text-small">
          <thead>
            <tr className="text-left">
              <th scope="col" className="border-b border-fg pr-4 pb-3 text-eyebrow font-medium text-fg-3">
                {controls.columns.control}
              </th>
              <th scope="col" className="border-b border-fg pr-4 pb-3 text-eyebrow font-medium text-fg-3">
                {controls.columns.state}
              </th>
              <th scope="col" className="border-b border-fg pb-3 text-eyebrow font-medium text-fg-3">
                {controls.columns.meaning}
              </th>
            </tr>
          </thead>
          <tbody>
            {controls.items.map((item) => {
              const claimed = item.state !== "not-claimed";
              return (
                <tr key={item.control} className="align-top">
                  <td className="border-b border-rule py-3.5 pr-4 font-semibold text-fg">{item.control}</td>
                  <td className="border-b border-rule py-3.5 pr-4 whitespace-nowrap">
                    <span className={cn("inline-flex items-center gap-2 text-eyebrow", claimed ? "text-fg" : "text-fg-3")}>
                      <span aria-hidden="true" className={cn("size-[10px] rounded-full border", claimed ? "border-fg bg-fg" : "border-fg-3")} />
                      {controls.states[item.state]}
                    </span>
                  </td>
                  <td className="border-b border-rule py-3.5 text-fg-2">{item.meaning}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

type LegalDocumentProps = {
  doc: LegalDocumentType;
  eyebrow: string;
  locale: Locale;
};

const labels: Record<Locale, { version: string; updated: string }> = {
  en: { version: "Version", updated: "Updated" },
  es: { version: "Versión", updated: "Actualizado" },
};

function formatDate(iso: string, intl: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return new Intl.DateTimeFormat(intl, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(d);
}

/** Legal and supporting pages: version and date in the head, sections in the prose measure. */
export function LegalDocument({ doc, eyebrow, locale }: LegalDocumentProps) {
  const l = labels[locale];
  return (
    <>
      <PageHero eyebrow={eyebrow} heading={doc.title} sub={doc.intro} />
      <Section theme="white" spacing="tight">
        <Container width="prose">
          <p className="text-eyebrow text-fg-3 flex flex-wrap gap-x-6 gap-y-2 border-b border-rule pb-6">
            <span>
              {l.version} {doc.version}
            </span>
            <span>
              {l.updated} {formatDate(doc.updatedAt, localeMeta[locale].intl)}
            </span>
          </p>
          {doc.controls ? <ControlsMatrix controls={doc.controls} /> : null}
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
