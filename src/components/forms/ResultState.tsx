"use client";

import Link from "next/link";
import { content } from "@/content";
import type { FlowDefinition } from "@/forms/types";
import { Disclosure } from "@/components/content/Disclosure";
import { StagePosition } from "@/components/content/StagePosition";
import { Eyebrow } from "@/components/typography/Eyebrow";
import { Arrow } from "@/components/actions/ArrowLink";

type ResultStateProps = {
  flow: FlowDefinition;
  outcome: { id: string; result?: string; emailed?: boolean };
  headingRef: React.RefObject<HTMLHeadingElement | null>;
};

/** Renders the result copy for the returned key, verbatim from content, with the reference and the stage position. */
export function ResultState({ flow, outcome, headingRef }: ResultStateProps) {
  const ui = content.flowUi;
  const keys = Object.keys(flow.results);
  const result = flow.results[outcome.result ?? ""] ?? flow.results[keys[keys.length - 1]];
  const showPosition = flow.kind === "fit-check";
  const positionState = outcome.result === "potential-fit" ? ui.position.fitPotential : ui.position.fitReview;

  return (
    <section aria-labelledby="flow-heading" className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <Eyebrow>{result.eyebrow}</Eyebrow>
        <h1 id="flow-heading" ref={headingRef} tabIndex={-1} className="text-display-l text-fg outline-none">
          {result.heading}
        </h1>
      </div>
      <div className="flex flex-col gap-4">
        {result.paragraphs.map((p) => (
          <p key={p} className="text-body text-fg-2">
            {p}
          </p>
        ))}
      </div>
      <div className="flex flex-col gap-2 border-t border-b border-rule py-5">
        <span className="text-eyebrow text-fg-3">{ui.reference}</span>
        <span className="font-mono text-h4 tabular text-fg">{outcome.id}</span>
        <span className="text-small text-fg-2">{outcome.emailed ? flow.afterResult.emailNote : flow.afterResult.keepNote}</span>
      </div>
      {showPosition ? <StagePosition stages={content.shared.stages} current={1} currentState={positionState} /> : null}
      <Disclosure variant={flow.intro.disclosure} />
      <ul className="flex flex-col gap-3">
        {flow.afterResult.links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="group inline-flex items-center gap-2 font-medium text-fg">
              <span className="link-draw">{l.label}</span>
              <Arrow />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
