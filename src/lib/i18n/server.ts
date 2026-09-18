import { locale as rootLocale } from "next/root-params";
import { defaultLocale, isLocale, type Locale } from "./locales";

/** The current route locale, for Server Components and server utilities. */
export async function getLocale(): Promise<Locale> {
  const value = await rootLocale();
  return isLocale(value) ? value : defaultLocale;
}
