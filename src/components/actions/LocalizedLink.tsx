"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { localePath } from "@/lib/i18n/locales";
import { useLocale } from "@/lib/i18n/LocaleProvider";

type LocalizedLinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, "href"> & { href: string };

/**
 * next/link that prefixes internal paths with the current locale.
 * Content keeps locale-free hrefs ("/how-it-works"); this adds "/es" when needed.
 */
export function LocalizedLink({ href, ...rest }: LocalizedLinkProps) {
  const locale = useLocale();
  return <Link href={localePath(locale, href)} {...rest} />;
}
