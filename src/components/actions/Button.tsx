"use client";

import { LocalizedLink as Link } from "@/components/actions/LocalizedLink";
import type { ComponentPropsWithoutRef, MouseEvent } from "react";
import { cn } from "@/lib/cn";
import { analyticsEvents } from "@/lib/analytics/events";
import { track } from "@/lib/analytics/track";
import type { CtaEvent } from "@/content/types";

type Variant = "primary" | "secondary" | "ghost";
type Size = "default" | "small";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  /** Analytics CTA key (never user data). Sends hero_cta_clicked with { cta }. */
  event?: CtaEvent;
  loading?: boolean;
  className?: string;
};

type LinkProps = BaseProps & { href: string } & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className">;
type NativeProps = BaseProps & { href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className">;

export type ButtonProps = LinkProps | NativeProps;

const base =
  "inline-flex items-center justify-center gap-2 rounded-(--radius-control) font-medium tracking-[0.005em] whitespace-nowrap select-none transition-[background-color,color,border-color,box-shadow] duration-(--d-standard) ease-gda disabled:opacity-60 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  // Primary carries a hairline of light on its top edge that brightens on hover — a machined key, not a flat fill (design direction §07).
  primary:
    "bg-(--btn-primary-bg) text-(--btn-primary-fg) border border-(--btn-primary-bg) shadow-[inset_0_1px_0_var(--edge-light)] hover:bg-(--btn-primary-hover) hover:border-(--btn-primary-hover) hover:shadow-[inset_0_1px_0_var(--edge-light-hover),0_0_0_4px_var(--edge-ring)]",
  secondary: "bg-transparent text-fg border border-(--btn-outline-border) hover:border-(--btn-outline-hover)",
  ghost: "bg-transparent text-fg border border-transparent hover:text-fg-2 px-0!",
};

const sizes: Record<Size, string> = {
  default: "h-(--control-h) px-7 text-[15px]",
  small: "h-(--control-h-sm) px-[18px] text-sm",
};

const ownKeys = ["variant", "size", "event", "loading", "className", "href"] as const;

/** Strips the button's own props so only DOM/Link attributes are spread. */
function domProps<T extends object>(props: T): Omit<T, (typeof ownKeys)[number]> {
  const out = { ...props } as Record<string, unknown>;
  for (const key of ownKeys) delete out[key];
  return out as unknown as Omit<T, (typeof ownKeys)[number]>;
}

/** The one button. Ground is inherited from the Section, not passed in. */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "default", event, loading = false, className } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.href !== undefined) {
    const { href, onClick } = props;
    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      if (event) track(analyticsEvents.heroCtaClicked, { cta: event });
      onClick?.(e);
    };
    return <Link href={href} className={classes} {...domProps(props)} onClick={handleClick} />;
  }

  const { onClick, disabled, type } = props;
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (event) track(analyticsEvents.heroCtaClicked, { cta: event });
    onClick?.(e);
  };
  return (
    <button
      {...domProps(props)}
      type={type ?? "button"}
      className={classes}
      onClick={handleClick}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    />
  );
}
