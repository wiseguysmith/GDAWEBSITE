"use client";

import { useContent } from "@/content/useContent";
import type { Stage } from "@/content/types";
import { cn } from "@/lib/cn";

type StagePositionProps = {
  stages: readonly Stage[];
  /** 1-based index of the current stage. */
  current: number;
  /** State line for the current stage, e.g. "Preliminary indication given · pending GDA review". */
  currentState: string;
  className?: string;
};

/**
 * "You are here" on the five-stage line (design direction §02). Shows the
 * whole road and the honest state of every stage — "Not started" four times
 * is the point. CSS-only animation; the server HTML is the resting state.
 */
export function StagePosition({ stages, current, currentState, className }: StagePositionProps) {
  const ui = useContent().flowUi.position;
  const total = stages.length;
  // Fill reaches the current node's centre: nodes sit at 0, 1/(n-1) … of the track.
  const fillPct = total > 1 ? ((current - 1) / (total - 1)) * 100 : 0;

  return (
    <section aria-label={ui.eyebrow} className={cn("flex flex-col gap-5 border border-rule bg-bg-elevated p-6 md:p-7", className)}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <p className="text-eyebrow text-fg-3">{ui.eyebrow}</p>
        <p className="text-eyebrow text-fg-3 tabular">{ui.stageOf(current, total)}</p>
      </div>

      <ol className="relative grid gap-4 sm:grid-cols-5 sm:gap-0">
        {/* Track (desktop): hairline from first node centre to last node centre, with a drawn fill. */}
        <span aria-hidden="true" className="absolute top-[9px] right-[calc(20%_-_9px)] left-[9px] hidden h-px bg-rule sm:block">
          <span className="track-fill absolute inset-y-0 left-0 bg-fg" style={{ width: `${fillPct}%` }} />
        </span>

        {stages.map((stage) => {
          const isCurrent = stage.index === current;
          const isPast = stage.index < current;
          return (
            <li key={stage.name} className="relative grid grid-cols-[19px_1fr] gap-x-3 gap-y-1 sm:grid-cols-1 sm:pr-4">
              <span
                aria-hidden="true"
                className={cn(
                  "relative z-10 mt-[3px] size-[19px] rounded-full border border-fg bg-bg-elevated sm:mt-0 sm:mb-3",
                  isPast && "bg-fg",
                  isCurrent && "node-fill",
                )}
              />
              <div className="flex flex-col gap-0.5">
                <span className="text-eyebrow text-fg-3 tabular">{String(stage.index).padStart(2, "0")}</span>
                <span className="text-body font-medium text-fg">{stage.name}</span>
                <span className={cn("text-small", isCurrent ? "text-fg" : "text-fg-3")}>{isCurrent ? currentState : isPast ? "" : ui.notStarted}</span>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
