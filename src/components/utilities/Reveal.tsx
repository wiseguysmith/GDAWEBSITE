"use client";

import { useEffect, useRef, useState, type ComponentPropsWithoutRef, type ElementType } from "react";

type RevealProps = {
  as?: ElementType;
  /** Extra delay in ms, for staggering siblings. */
  delay?: number;
  /** Fraction of the element that must be visible. */
  threshold?: number;
} & ComponentPropsWithoutRef<"div">;

/**
 * Scroll reveal that adds motion only. Server HTML has no data-reveal
 * attribute, so content is visible without JS; after hydration the element
 * is marked pending and revealed once when it enters view.
 */
export function Reveal({ as, delay = 0, threshold = 0.2, style, children, ...rest }: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [state, setState] = useState<"idle" | "pending" | "in">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) return;

    // Already in view on load: leave it visible rather than hiding and re-showing.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) return;

    setState("pending");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setState("in");
            io.disconnect();
          }
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      data-reveal={state === "idle" ? undefined : state}
      style={{ ...(style as object), ["--reveal-delay" as string]: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
