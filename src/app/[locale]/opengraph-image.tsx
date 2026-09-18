import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getContent } from "@/content";
import { site } from "@/config/site";
import { isLocale } from "@/lib/i18n/locales";

/**
 * Open Graph image generated from the design system at build time (gap K-10):
 * navy ground, wordmark, the three hero lines — in the page's language.
 */
export const alt = site.tagline;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const content = getContent(isLocale(locale) ? locale : "en");
  const font = await readFile(join(process.cwd(), "src/app/[locale]/_fonts/InstrumentSans-Medium.ttf"));
  const lines = content.home.hero.lines;
  const principles = content.home.hero.principles;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#070F1F",
          color: "#FFFFFF",
          fontFamily: "Instrument Sans",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, letterSpacing: "0.02em" }}>
          <div style={{ width: 26, height: 26, borderRadius: 13, border: "2px solid #C4CBD6", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 12, height: 12, borderRadius: 6, background: "#C4CBD6" }} />
          </div>
          <span>{site.name}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 84, lineHeight: 1.02, letterSpacing: "-0.03em" }}>
          {lines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 17, color: "#8A94A6", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          {principles.map((p) => (
            <span key={p}>{p}</span>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Instrument Sans", data: font, weight: 500, style: "normal" }],
    },
  );
}
