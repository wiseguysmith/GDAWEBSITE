import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export type SectionTheme = "light" | "white" | "dark" | "navy";
export type SectionSpacing = "default" | "tight" | "none";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  theme?: SectionTheme;
  spacing?: SectionSpacing;
  /** Draw a hairline above the section (used between two sections on the same ground). */
  rule?: boolean;
};

/**
 * The only place a ground colour is set. Children inherit the semantic tokens
 * (--bg, --fg, --fg-2, --rule …) through data-theme, so no component takes a
 * colour prop.
 */
export function Section({ theme = "light", spacing = "default", rule = false, className, children, ...rest }: SectionProps) {
  return (
    <section
      data-theme={theme === "light" ? undefined : theme}
      className={cn(
        "bg-bg text-fg",
        spacing === "default" && "section-y",
        spacing === "tight" && "section-y-tight",
        rule && "hairline-t",
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  );
}
