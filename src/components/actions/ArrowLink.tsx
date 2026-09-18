import { LocalizedLink as Link } from "@/components/actions/LocalizedLink";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type ArrowLinkProps = ComponentPropsWithoutRef<typeof Link>;

/** Link with an arrow that moves 4px on hover/focus (handoff §25: small arrow movement). */
export function ArrowLink({ className, children, ...rest }: ArrowLinkProps) {
  return (
    <Link className={cn("group inline-flex items-center gap-2 font-medium text-fg no-underline", className)} {...rest}>
      <span className="link-draw">{children}</span>
      <Arrow />
    </Link>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      width="16"
      height="16"
      className={cn("shrink-0 transition-transform duration-(--d-standard) ease-gda group-hover:translate-x-1 group-focus-visible:translate-x-1", className)}
    >
      <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
