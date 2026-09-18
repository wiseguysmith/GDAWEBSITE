import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/utilities/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/structured-data";
import { getLocale } from "@/lib/i18n/server";

export default async function MarketingLayout({ children }: LayoutProps<"/[locale]">) {
  const locale = await getLocale();
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd(locale)} />
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
