"use client";

type FlowProgressProps = {
  /** 1-based step index, or `total + 1` for the review screen. */
  current: number;
  /** Number of question steps. */
  total: number;
  /** Text for the current position, e.g. "Step 3 of 7" or "Review". */
  text: string;
};

/** Hairline progress bar with a mono counter; width transitions at the standard duration. */
export function FlowProgress({ current, total, text }: FlowProgressProps) {
  const isReview = current > total;
  const pct = isReview ? 100 : Math.round(((current - 1) / total) * 100);
  return (
    <div className="mb-10 flex flex-col gap-3">
      <div className="flex items-center justify-between text-eyebrow text-fg-3">
        <span className="tabular" aria-live="polite" aria-atomic="true">
          {text}
        </span>
        <span className="tabular" aria-hidden="true">
          {isReview ? "—" : `${String(current).padStart(2, "0")} / ${String(total).padStart(2, "0")}`}
        </span>
      </div>
      <div className="h-px w-full bg-rule" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Progress">
        <div className="h-full bg-fg transition-[width] duration-[400ms] ease-gda" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
