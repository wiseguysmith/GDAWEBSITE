"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { localeCookie, localeMeta, localePath, locales, splitLocale, type Locale } from "@/lib/i18n/locales";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { useContent } from "@/content/useContent";

type LanguageSwitcherProps = {
  className?: string;
  /** "inline" — EN / ES in a row (header, footer). "list" — full names stacked (mobile menu). */
  variant?: "inline" | "list";
};

function remember(locale: Locale) {
  try {
    document.cookie = localeCookie(locale);
  } catch {
    // Cookies blocked — the link still navigates; the choice just is not remembered.
  }
}

/**
 * Links to the same page in every other locale. An explicit choice is stored
 * in a functional cookie so it wins over the browser language on later visits.
 */
export function LanguageSwitcher({ className, variant = "inline" }: LanguageSwitcherProps) {
  const current = useLocale();
  const pathname = usePathname();
  const { nav } = useContent();
  const { path } = splitLocale(pathname);

  return (
    <nav aria-label={nav.language.label} className={cn(variant === "inline" ? "flex items-center gap-3" : "flex flex-col gap-2", className)}>
      {locales.map((locale) => {
        const active = locale === current;
        const meta = localeMeta[locale];
        return (
          <Link
            key={locale}
            href={localePath(locale, path)}
            hrefLang={meta.htmlLang}
            lang={meta.htmlLang}
            onClick={() => remember(locale)}
            aria-current={active ? "true" : undefined}
            aria-label={active ? meta.native : `${nav.language.switchTo} ${meta.native}`}
            className={cn(
              variant === "inline" ? "text-eyebrow transition-colors duration-(--d-micro)" : "text-body font-medium",
              active ? "text-fg" : "text-fg-3 hover:text-fg",
            )}
          >
            {variant === "inline" ? locale.toUpperCase() : meta.native}
          </Link>
        );
      })}
    </nav>
  );
}
