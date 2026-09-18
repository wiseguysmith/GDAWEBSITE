/**
 * Feature gates. Content that is not real yet ships hidden, not faked.
 */
export const features = {
  /** Team section renders only when content/en/team.ts has approved members. */
  team: true,
  /** Partner logo row renders only when a partner has written permission on file. */
  partnerLogos: true,
  /** Locales offered in the UI. Only "en" ships; "es" and "pt" are reserved. */
  locales: ["en"] as const,
  reservedLocales: ["es", "pt"] as const,
  /** Routes reserved for later phases. They 404 and are excluded from the sitemap. */
  reservedRoutes: ["/insights", "/projects/prepare", "/portal", "/es", "/pt"] as const,
  /** Cloudflare Turnstile is enabled automatically when a site key is configured. */
  turnstile: Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY),
  /** Plausible analytics is enabled automatically when a domain is configured. */
  analytics: Boolean(process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN),
} as const;

export type Locale = (typeof features.locales)[number];
