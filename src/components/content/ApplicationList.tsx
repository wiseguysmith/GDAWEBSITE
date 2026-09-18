import type { Application } from "@/content/types";
import { Reveal } from "@/components/utilities/Reveal";

type ApplicationListProps = {
  items: readonly Application[];
  note?: string;
};

/**
 * Large typographic rows with hairlines — categories GDA infrastructure may
 * support, deliberately not styled as listings (handoff §11 section 4).
 */
export function ApplicationList({ items, note }: ApplicationListProps) {
  return (
    <div>
      <ul className="border-t border-rule">
        {items.map((item, i) => (
          <Reveal as="li" key={item.slug} delay={i * 60} className="grid items-baseline gap-1 border-b border-rule py-5 md:grid-cols-[1fr_1.4fr] md:gap-x-6 md:py-6">
            <h3 className="text-[clamp(1.375rem,2.6vw,2rem)] font-medium leading-tight tracking-[-0.02em] text-fg">{item.title}</h3>
            <p className="text-body text-fg-2">{item.descriptor}</p>
          </Reveal>
        ))}
      </ul>
      {note ? <p className="mt-6 max-w-[70ch] text-small text-fg-3">{note}</p> : null}
    </div>
  );
}
