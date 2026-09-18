import type { FaqItem } from "@/content/types";
import { faqJsonLd } from "@/lib/seo/structured-data";
import { JsonLd } from "@/components/utilities/JsonLd";

type FAQProps = {
  items: readonly FaqItem[];
};

/** Native <details> accordion — keyboard and screen-reader accessible without JS — plus FAQPage structured data. */
export function FAQ({ items }: FAQProps) {
  return (
    <>
      <JsonLd data={faqJsonLd([...items])} />
      <div className="border-t border-rule">
        {items.map((item) => (
          <details key={item.question} className="group border-b border-rule">
            <summary className="flex cursor-pointer items-start justify-between gap-6 py-5 text-h4 text-fg [&::-webkit-details-marker]:hidden">
              <span>{item.question}</span>
              <span
                aria-hidden="true"
                className="mt-2 inline-flex size-5 shrink-0 items-center justify-center text-fg-3 transition-transform duration-(--d-standard) ease-gda group-open:rotate-45"
              >
                <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M8 2v12M2 8h12" />
                </svg>
              </span>
            </summary>
            <p className="max-w-[66ch] pb-6 text-body text-fg-2">{item.answer}</p>
          </details>
        ))}
      </div>
    </>
  );
}
