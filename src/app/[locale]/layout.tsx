import type { Metadata, Viewport } from "next";
import { Geist_Mono, Instrument_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
import { getContent } from "@/content";
import { site } from "@/config/site";
import { features } from "@/config/features";
import { isLocale, localeMeta, locales } from "@/lib/i18n/locales";
import { LocaleProvider } from "@/lib/i18n/LocaleProvider";
import "../globals.css";

/* Self-hosted at build time via next/font: no third-party font requests, no layout shift. */
const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const content = getContent(isLocale(locale) ? locale : "en");
  return {
    metadataBase: new URL(site.url),
    title: {
      default: content.home.meta.title,
      template: `%s — ${site.name}`,
    },
    description: content.home.meta.description,
    applicationName: site.name,
    openGraph: { siteName: site.name, type: "website", locale: localeMeta[isLocale(locale) ? locale : "en"].ogLocale },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#070F1F",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { nav } = getContent(locale);
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  return (
    <html lang={localeMeta[locale].htmlLang} className={`${instrumentSans.variable} ${geistMono.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <LocaleProvider locale={locale}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-(--z-toast) focus:rounded-(--radius-control) focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
          >
            {nav.skipToContent}
          </a>
          {children}
        </LocaleProvider>
        {features.analytics && plausibleDomain ? (
          <Script defer data-domain={plausibleDomain} src="https://plausible.io/js/script.js" strategy="afterInteractive" />
        ) : null}
      </body>
    </html>
  );
}
