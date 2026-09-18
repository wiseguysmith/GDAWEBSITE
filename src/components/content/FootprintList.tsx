import { jurisdictionNames } from "@/lib/jurisdictions/footprint";
import { supportedJurisdictions } from "@/lib/jurisdictions/supported";
import type { Locale } from "@/lib/i18n/locales";

/** Typographic list of the current operating footprint — no map (decision I-7). */
export function FootprintList({ locale }: { locale: Locale }) {
  const names = jurisdictionNames(locale).map((n) => n.replace(/^the /, ""));
  return (
    <ol className="grid border-t border-rule sm:grid-cols-2 lg:grid-cols-3">
      {supportedJurisdictions.map((j, i) => (
        <li key={j.code} className="flex items-baseline gap-4 border-b border-rule py-5 pr-6">
          <span className="text-eyebrow text-fg-3 tabular">{String(i + 1).padStart(2, "0")}</span>
          <span className="text-h4 text-fg">{names[i]}</span>
        </li>
      ))}
    </ol>
  );
}
