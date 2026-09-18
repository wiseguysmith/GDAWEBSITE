import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";
type HeadingSize = "xl" | "l" | "h3" | "h4";

type HeadingProps = ComponentPropsWithoutRef<"h1"> & {
  /** Semantic level — chosen for document outline, independent of size. */
  as: HeadingLevel;
  /** Visual size from the type scale. */
  size: HeadingSize;
};

const sizes: Record<HeadingSize, string> = {
  xl: "text-display-xl",
  l: "text-display-l",
  h3: "text-h3",
  h4: "text-h4",
};

export function Heading({ as, size, className, ...rest }: HeadingProps) {
  const Tag = as;
  return <Tag className={cn(sizes[size], "text-fg", className)} {...rest} />;
}
