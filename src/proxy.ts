import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE, defaultLocale, isLocale, type Locale } from "@/lib/i18n/locales";

/**
 * Locale routing (Phase 2: English at the root, Spanish under /es).
 *
 *  1. /en/…            → 308 to the unprefixed URL (one canonical English URL).
 *  2. /es/…            → served as is.
 *  3. unprefixed       → if the visitor's remembered choice (cookie) or, on a
 *                        first visit, their browser language prefers Spanish,
 *                        307 to /es/…; otherwise rewrite internally to /en/…
 *                        so the URL stays clean.
 *
 * An explicit choice in the language switcher sets the cookie and always wins
 * over the browser setting. Search engines (no cookie, no Spanish preference)
 * get English at the root and discover /es through hreflang alternates.
 */

/** Best supported locale from an Accept-Language header, or undefined when nothing matches. */
function negotiate(header: string | null): Locale | undefined {
  if (!header) return undefined;
  const ranked = header
    .split(",")
    .map((part, index) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      return { tag: tag.toLowerCase(), q: q ? Number(q.slice(2)) || 0 : 1, index };
    })
    .filter((r) => r.tag && r.q > 0)
    .sort((a, b) => b.q - a.q || a.index - b.index);
  for (const { tag } of ranked) {
    const primary = tag.split("-")[0];
    if (isLocale(primary)) return primary;
  }
  return undefined;
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const [, first] = pathname.split("/");

  // 1. Canonical English lives at the root.
  if (first === defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(`/${defaultLocale}`.length) || "/";
    return NextResponse.redirect(url, 308);
  }

  // 2. Prefixed locale: pass through.
  if (isLocale(first)) return NextResponse.next();

  // 3. Unprefixed: redirect to a preferred locale, or rewrite internally to English.
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  const remembered = isLocale(cookie) ? cookie : undefined;
  const preferred = remembered ?? negotiate(request.headers.get("accept-language"));

  if (preferred && preferred !== defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${preferred}${pathname === "/" ? "" : pathname}`;
    url.search = search;
    return NextResponse.redirect(url, 307);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    /*
     * Everything except API routes, Next internals, the root metadata routes
     * and files with an extension (fonts, images, icons).
     */
    "/((?!api|_next|sitemap\\.xml|robots\\.txt|favicon\\.ico|.*\\..*).*)",
  ],
};
