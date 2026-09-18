"use client";

type FlowProgressProps = {
  current: number;
  total: number;
  label: (step: number, total: number) => string;
};

/** Hairline progress bar with a mono counter; width transitions at the standard duration. */
export function FlowProgress({ current, total, label }: FlowProgressProps) {
  const pct = Math.round((Math.min(current, total) / total) * 100);
  return (
    <div className="mb-10 flex flex-col gap-3">
      <div className="flex items-center justify-between text-eyebrow text-fg-3">
        <span className="tabular" aria-live="polite" aria-atomic="true">
          {label(Math.min(current, total), total)}
        </span>
        <span className="tabular" aria-hidden="true">
          {String(Math.min(current, total)).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>
      <div className="h-px w-full bg-rule" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Progress">
        <div className="h-full bg-fg transition-[width] duration-[400ms] ease-gda" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
