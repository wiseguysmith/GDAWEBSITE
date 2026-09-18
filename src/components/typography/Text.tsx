import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

type TextProps<T extends ElementType = "p"> = {
  as?: T;
  size?: "body-l" | "body" | "small";
  tone?: "default" | "secondary" | "tertiary";
  /** Cap the line length at the system measure (66ch). */
  measure?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

export function Text<T extends ElementType = "p">({
  as,
  size = "body",
  tone = "default",
  measure = false,
  className,
  ...rest
}: TextProps<T>) {
  const Tag = (as ?? "p") as ElementType;
  return (
    <Tag
      className={cn(
        size === "body-l" && "text-body-l",
        size === "body" && "text-body",
        size === "small" && "text-small",
        tone === "default" && "text-fg",
        tone === "secondary" && "text-fg-2",
        tone === "tertiary" && "text-fg-3",
        measure && "measure",
        className,
      )}
      {...rest}
    />
  );
}
