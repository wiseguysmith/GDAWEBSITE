import { content } from "@/content";
import { cn } from "@/lib/cn";

type DisclosureProps = {
  variant: "standing" | "investor" | "fitCheck";
  className?: string;
};

/** The legal line for a surface. Text lives in content/en/legal.ts only. */
export function Disclosure({ variant, className }: DisclosureProps) {
  return (
    <p className={cn("text-small text-fg-3 max-w-[80ch]", className)} data-disclosure={variant}>
      {content.legal[variant]}
    </p>
  );
}
