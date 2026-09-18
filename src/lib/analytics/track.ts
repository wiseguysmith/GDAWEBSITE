"use client";

import type { AnalyticsEvent, AnalyticsProps } from "./events";

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string | number> }) => void;
  }
}

const allowedProps = new Set<keyof AnalyticsProps>(["cta", "step", "result"]);

/**
 * Sends an allow-listed event to the analytics provider when one is present.
 * Silently does nothing otherwise. Never pass user input into props.
 */
export function track(event: AnalyticsEvent, props?: AnalyticsProps): void {
  if (typeof window === "undefined") return;
  const safe: Record<string, string | number> = {};
  if (props) {
    for (const key of Object.keys(props) as (keyof AnalyticsProps)[]) {
      const value = props[key];
      if (allowedProps.has(key) && (typeof value === "string" || typeof value === "number")) {
        safe[key] = value;
      }
    }
  }
  try {
    window.plausible?.(event, Object.keys(safe).length ? { props: safe } : undefined);
  } catch {
    // Analytics must never break the page.
  }
}
