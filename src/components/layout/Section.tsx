import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export type SectionTheme = "light" | "white" | "dark" | "navy";
export type SectionSpacing = "default" | "tight" | "none";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  theme?: SectionTheme;
  spacing?: SectionSpacing;
  /** Draw a hairline above the section (used between two sections on the same ground). */
  rule?: boolean;
  /** Blueprint coordinate at the top-left edge, e.g. "§ 02 / How it works". Desktop only. */
  coordinate?: string;
  /** Optional right-hand coordinate, e.g. the stage sequence. Desktop only. */
  coordinateRight?: string;
  /** Twelve-column tick rule along the top edge. Desktop only. */
  ticks?: boolean;
};

/**
 * The only place a ground colour is set. Children inherit the semantic tokens
 * (--bg, --fg, --fg-2, --rule …) through data-theme, so no component takes a
 * colour prop. Navy grounds carry the material grain.
 */
export function Section({
  theme = "light",
  spacing = "default",
  rule = false,
  coordinate,
  coordinateRight,
  ticks = false,
  className,
  children,
  ...rest
}: SectionProps) {
  const isNavy = theme === "dark" || theme === "navy";
  return (
    <section
      data-theme={theme === "light" ? undefined : theme}
      className={cn(
        "relative bg-bg text-fg",
        isNavy && "grain",
        spacing === "default" && "section-y",
        spacing === "tight" && "section-y-tight",
        rule && "hairline-t",
        className,
      )}
      {...rest}
    >
      {ticks ? <span aria-hidden="true" className="col-ticks hidden lg:block" /> : null}
      {coordinate || coordinateRight ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-4 hidden lg:block">
          <div className="mx-auto flex max-w-(--container) justify-between px-(--margin) text-eyebrow text-fg-3 opacity-80">
            <span>{coordinate}</span>
            <span>{coordinateRight}</span>
          </div>
        </div>
      ) : null}
      {children}
    </section>
  );
}
