import type { MetadataRoute } from "next";
import { features } from "@/config/features";
import { site } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  // Preview and non-production deployments are never indexed.
  const isProduction = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : process.env.NODE_ENV === "production";
  if (!isProduction) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dev/", "/evaluate", "/investors/access", ...features.reservedRoutes],
      },
    ],
    sitemap: new URL("/sitemap.xml", site.url).toString(),
    host: site.url,
  };
}
