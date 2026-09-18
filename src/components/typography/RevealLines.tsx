import type { ElementType } from "react";
import { cn } from "@/lib/cn";

type RevealLinesProps = {
  lines: readonly string[];
  as?: ElementType;
  className?: string;
  /** Delay before the first line, in ms. */
  delay?: number;
  id?: string;
};

/**
 * Staggered line-masked rise (handoff §25). Pure CSS keyframes, so the
 * headline renders and settles visible with no JavaScript, and reduced-motion
 * removes the animation entirely.
 */
export function RevealLines({ lines, as, className, delay = 0, id }: RevealLinesProps) {
  const Tag = (as ?? "h1") as ElementType;
  return (
    <Tag id={id} className={cn(className)}>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden">
          <span className="reveal-line" style={{ animationDelay: `calc(${delay}ms + ${i} * var(--stagger))` }}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
