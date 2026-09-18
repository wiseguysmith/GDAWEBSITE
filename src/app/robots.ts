import type { MetadataRoute } from "next";
import { features } from "@/config/features";
import { site } from "@/config/site";
import { defaultLocale, locales } from "@/lib/i18n/locales";

export default function robots(): MetadataRoute.Robots {
  // Preview and non-production deployments are never indexed.
  const isProduction = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : process.env.NODE_ENV === "production";
  if (!isProduction) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  const prefixes = locales.map((l) => (l === defaultLocale ? "" : `/${l}`));
  const privatePaths = ["/dev/", "/evaluate", "/investors/access", ...features.reservedRoutes];
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", ...prefixes.flatMap((p) => privatePaths.map((path) => `${p}${path}`))],
      },
    ],
    sitemap: new URL("/sitemap.xml", site.url).toString(),
    host: site.url,
  };
}
