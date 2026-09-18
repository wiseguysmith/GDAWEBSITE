import Image from "next/image";
import type { PartnerCategory, PartnerLogo } from "@/content/types";
import { features } from "@/config/features";

type PartnerCategoriesProps = {
  categories: readonly PartnerCategory[];
  logos?: readonly PartnerLogo[];
  /** Show descriptors under each category (Partners page). */
  descriptors?: boolean;
  columns?: 3 | 4;
};

/**
 * Category labels, optionally with descriptors. A logo row renders only when
 * every logo has written permission on file — never a placeholder, never a wall.
 */
export function PartnerCategories({ categories, logos = [], descriptors = false, columns = 4 }: PartnerCategoriesProps) {
  const permitted = features.partnerLogos ? logos.filter((l) => l.permission && l.src) : [];
  return (
    <div className="flex flex-col gap-12">
      <ul className={`grid gap-x-8 gap-y-6 border-t border-rule pt-8 sm:grid-cols-2 ${columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
        {categories.map((c) => (
          <li key={c.slug} className="flex flex-col gap-1">
            <span className="text-body font-semibold text-fg">{c.title}</span>
            {descriptors ? <span className="text-small text-fg-2">{c.descriptor}</span> : null}
          </li>
        ))}
      </ul>
      {permitted.length > 0 ? (
        <ul className="flex flex-wrap items-center gap-x-12 gap-y-6 border-t border-rule pt-8 opacity-60 grayscale">
          {permitted.slice(0, 6).map((l) => (
            <li key={l.name}>
              <Image src={l.src} alt={l.name} width={120} height={32} className="h-8 w-auto" />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
