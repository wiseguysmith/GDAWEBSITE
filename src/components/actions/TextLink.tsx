import { LocalizedLink as Link } from "@/components/actions/LocalizedLink";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type TextLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  tone?: "default" | "secondary";
};

/** Inline link whose underline draws left→right on hover and focus. */
export function TextLink({ className, tone = "default", ...rest }: TextLinkProps) {
  return <Link className={cn("link-draw", tone === "secondary" ? "text-fg-2" : "text-fg", className)} {...rest} />;
}
