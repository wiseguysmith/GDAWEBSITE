"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { clientContent, type ClientContent } from "./client";

/** Localised content for Client Components. */
export function useContent(): ClientContent {
  return clientContent[useLocale()];
}
