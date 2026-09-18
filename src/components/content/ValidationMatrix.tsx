import type { Principle } from "@/content/types";
import { Reveal } from "@/components/utilities/Reveal";

type ValidationMatrixProps = {
  principles: readonly Principle[];
};

/** Principle rows — title left, body right — separated by hairlines. */
export function ValidationMatrix({ principles }: ValidationMatrixProps) {
  return (
    <dl className="border-t border-rule">
      {principles.map((p, i) => (
        <Reveal key={p.title} delay={i * 60} className="grid gap-1 border-b border-rule py-5 md:grid-cols-[240px_1fr] md:gap-x-8">
          <dt className="text-body font-semibold text-fg">{p.title}</dt>
          <dd className="m-0 max-w-[60ch] text-body text-fg-2">{p.body}</dd>
        </Reveal>
      ))}
    </dl>
  );
}
