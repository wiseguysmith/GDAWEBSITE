"use client";

import { useContent } from "@/content/useContent";
import { cn } from "@/lib/cn";

type DisclosureProps = {
  variant: "standing" | "investor" | "fitCheck";
  className?: string;
};

/** The legal line for a surface. Text lives in content/<locale>/legal.ts only. */
export function Disclosure({ variant, className }: DisclosureProps) {
  const { legal } = useContent();
  return (
    <p className={cn("text-small text-fg-3 max-w-[80ch]", className)} data-disclosure={variant}>
      {legal[variant]}
    </p>
  );
}
