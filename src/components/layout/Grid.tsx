import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type GridProps = ComponentPropsWithoutRef<"div"> & {
  /** Twelve-column grid on lg and up; single column below. */
  cols?: 12 | 2 | 3 | 4;
};

export function Grid({ cols = 12, className, ...rest }: GridProps) {
  return (
    <div
      className={cn(
        "grid gap-x-(--gutter) gap-y-8",
        cols === 12 && "lg:grid-cols-12",
        cols === 2 && "md:grid-cols-2",
        cols === 3 && "md:grid-cols-3",
        cols === 4 && "sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
      {...rest}
    />
  );
}
