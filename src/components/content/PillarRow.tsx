import Link from "next/link";
import type { Pillar } from "@/content/types";
import { Reveal } from "@/components/utilities/Reveal";
import { Arrow } from "@/components/actions/ArrowLink";

type PillarRowProps = {
  pillars: readonly Pillar[];
  /** Link each pillar to its anchor on How It Works. */
  linked?: boolean;
};

/** Three columns separated by hairlines. Typography carries it — no cards, no icons. */
export function PillarRow({ pillars, linked = true }: PillarRowProps) {
  return (
    <ul className="grid border-t border-rule md:grid-cols-3">
      {pillars.map((pillar, i) => {
        const inner = (
          <>
            <span className="text-eyebrow text-fg-3 tabular">{pillar.numeral}</span>
            <span className="mt-4 flex items-center gap-3 text-h3 text-fg group-hover:text-fg">
              {pillar.title}
              {linked ? <Arrow className="opacity-0 transition-opacity duration-(--d-standard) group-hover:opacity-100 group-focus-visible:opacity-100" /> : null}
            </span>
            <span className="mt-3 block max-w-[34ch] text-body text-fg-2">{pillar.body}</span>
          </>
        );
        return (
          <Reveal
            as="li"
            key={pillar.title}
            delay={i * 80}
            className="border-b border-rule py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
          >
            {linked ? (
              <Link href={pillar.href} className="group block no-underline">
                {inner}
              </Link>
            ) : (
              <div className="group">{inner}</div>
            )}
          </Reveal>
        );
      })}
    </ul>
  );
}
