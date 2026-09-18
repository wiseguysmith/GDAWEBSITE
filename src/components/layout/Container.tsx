import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
  width?: "default" | "narrow" | "prose";
} & Omit<ComponentPropsWithoutRef<T>, "as" | "width">;

const maxWidths = {
  default: "var(--container)",
  narrow: "var(--container-narrow)",
  prose: "var(--container-prose)",
} as const;

/** Page-width wrapper with the site margin. Narrow variants centre a column inside it. */
export function Container<T extends ElementType = "div">({ as, width = "default", className, style, ...rest }: ContainerProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag
      className={cn("w-full mx-auto px-(--margin)", className)}
      style={{ maxWidth: maxWidths[width], ...(style as object) }}
      {...rest}
    />
  );
}
