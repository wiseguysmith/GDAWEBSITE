import { jsonLdString } from "@/lib/seo/structured-data";

/** Renders a JSON-LD block. Data comes only from config and content. */
export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(data) }} />;
}
