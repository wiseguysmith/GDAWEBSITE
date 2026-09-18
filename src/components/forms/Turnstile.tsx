"use client";

import Script from "next/script";
import { useEffect, useId, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, options: { sitekey: string; callback: (token: string) => void; "expired-callback"?: () => void; theme?: "light" | "dark" | "auto"; size?: "normal" | "compact" | "flexible" }) => string;
      remove: (id: string) => void;
    };
  }
}

type TurnstileProps = { onToken: (token: string | undefined) => void };

/**
 * Cloudflare Turnstile — rendered only when NEXT_PUBLIC_TURNSTILE_SITE_KEY is
 * set (decision I-10). Non-interactive for most visitors; never an image CAPTCHA.
 */
export function Turnstile({ onToken }: TurnstileProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const ref = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const id = useId();

  useEffect(() => {
    if (!siteKey || !ref.current) return;
    let cancelled = false;
    const tryRender = () => {
      if (cancelled || widgetId.current || !window.turnstile || !ref.current) return;
      widgetId.current = window.turnstile.render(ref.current, {
        sitekey: siteKey,
        callback: (token) => onToken(token),
        "expired-callback": () => onToken(undefined),
        theme: "light",
        size: "flexible",
      });
    };
    tryRender();
    const timer = window.setInterval(tryRender, 300);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
      widgetId.current = null;
    };
  }, [siteKey, onToken]);

  if (!siteKey) return null;
  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" />
      <div id={id} ref={ref} className="min-h-[65px]" />
    </>
  );
}
