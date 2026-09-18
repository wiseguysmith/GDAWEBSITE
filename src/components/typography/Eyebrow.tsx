import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = ComponentPropsWithoutRef<"p"> & {
  /** Optional mono numeral shown before the label, e.g. "01". */
  numeral?: string;
};

/** Mono, uppercase, tracked label — the infrastructure register of the system. */
export function Eyebrow({ numeral, className, children, ...rest }: EyebrowProps) {
  return (
    <p className={cn("text-eyebrow text-fg-3 flex items-center gap-3", className)} {...rest}>
      {numeral ? <span className="tabular">{numeral}</span> : null}
      {numeral ? <span aria-hidden="true" className="h-px w-4 bg-rule-strong" /> : null}
      <span>{children}</span>
    </p>
  );
}
