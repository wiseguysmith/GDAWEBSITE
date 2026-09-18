"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useRef, useState } from "react";
import type { Stage } from "@/content/types";
import { cn } from "@/lib/cn";
import { ProcessStage } from "./ProcessStage";

type ProcessTimelineProps = {
  stages: readonly Stage[];
  /** Show the "who is responsible" line on each stage (How It Works). */
  detailed?: boolean;
};

/**
 * Desktop: sticky stage identifier left, stages right along a line that draws
 * with scroll. Mobile: stacked, line in the left gutter, no sticky (handoff §11).
 */
export function ProcessTimeline({ stages, detailed = false }: ProcessTimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.65", "end 0.65"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.max(0, Math.min(stages.length - 1, Math.floor(v * stages.length + 0.001)));
    setActive((prev) => (prev === next ? prev : next));
  });

  const current = stages[active];

  return (
    <div ref={ref} className="grid gap-x-(--gutter) lg:grid-cols-12">
      {/* Sticky identifier — desktop only */}
      <div className="hidden lg:col-span-4 lg:block">
        <div className="sticky top-[calc(var(--header-h)+var(--s-12))] flex flex-col gap-6">
          <p className="text-eyebrow text-fg-3" aria-live="polite" aria-atomic="true">
            Stage {String(current.index).padStart(2, "0")} of {String(stages.length).padStart(2, "0")}
          </p>
          <div className="relative h-[1.1em] text-display-l text-fg" aria-hidden="true">
            {stages.map((s, i) => (
              <span
                key={s.name}
                className={cn(
                  "absolute inset-0 transition-opacity duration-(--d-standard) ease-gda",
                  i === active ? "opacity-100" : "opacity-0",
                )}
              >
                {s.name}
              </span>
            ))}
          </div>
          <ol className="mt-2 flex flex-col gap-2 border-t border-rule pt-6" aria-hidden="true">
            {stages.map((s, i) => (
              <li
                key={s.name}
                className={cn(
                  "flex items-center gap-3 font-mono text-xs tracking-[0.1em] uppercase transition-colors duration-(--d-standard)",
                  i <= active ? "text-fg" : "text-fg-3",
                )}
              >
                <span className="tabular">{String(s.index).padStart(2, "0")}</span>
                <span>{s.name}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Stages along the line */}
      <div className="relative lg:col-span-8">
        <div aria-hidden="true" className="absolute top-0 bottom-0 left-[7px] w-px bg-rule lg:left-[9px]">
          <motion.div
            className="absolute inset-x-0 top-0 h-full origin-top bg-fg"
            style={{ scaleY: reduced ? 1 : scrollYProgress }}
          />
        </div>
        <ol className="flex flex-col">
          {stages.map((stage, i) => (
            <ProcessStage key={stage.name} stage={stage} reached={i <= active} detailed={detailed} />
          ))}
        </ol>
      </div>
    </div>
  );
}
