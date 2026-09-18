import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/config/site";

type WordmarkProps = {
  /** "full" shows the name; "short" shows GDA (used in tight headers). */
  variant?: "full" | "short";
  className?: string;
  asLink?: boolean;
};

/** Typographic wordmark with the ring mark. Colour follows the current ground. */
export function Wordmark({ variant = "full", className, asLink = true }: WordmarkProps) {
  const inner = (
    <>
      <span aria-hidden="true" className="relative inline-block size-[22px] rounded-full border-[1.5px] border-current">
        <span className="absolute inset-[5px] rounded-full bg-current" />
      </span>
      <span className="font-semibold tracking-[0.02em]">
        <span className={cn(variant === "short" && "sr-only sm:not-sr-only")}>{site.name}</span>
        {variant === "short" ? <span className="sm:hidden">{site.shortName}</span> : null}
      </span>
    </>
  );
  const classes = cn("inline-flex items-center gap-3 text-fg no-underline", className);
  if (!asLink) return <span className={classes}>{inner}</span>;
  return (
    <Link href="/" className={classes} aria-label={`${site.name} — home`}>
      {inner}
    </Link>
  );
}
