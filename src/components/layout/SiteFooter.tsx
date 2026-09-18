import Link from "next/link";
import { content } from "@/content";
import { features } from "@/config/features";
import { footprintSentence } from "@/lib/jurisdictions/footprint";
import { Wordmark } from "./Wordmark";
import { Disclosure } from "@/components/content/Disclosure";

export function SiteFooter() {
  const { footer, legal } = content;
  const year = new Date().getFullYear();

  return (
    <footer data-theme="navy" className="bg-bg text-fg" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>
      <div className="mx-auto max-w-(--container) px-(--margin) pt-(--s-16) pb-(--s-12)">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4 flex flex-col gap-6">
            <Wordmark />
            <p className="text-small text-fg-2 max-w-[36ch]">{content.home.hero.sub}</p>
          </div>

          <nav aria-label="Footer" className="md:col-span-8 grid gap-10 sm:grid-cols-3">
            {footer.groups.map((group) => (
              <div key={group.title}>
                <p className="text-eyebrow text-fg-3 mb-4">{group.title}</p>
                <ul className="flex flex-col gap-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="link-draw text-small text-fg-2 hover:text-fg transition-colors duration-(--d-micro)">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 border-t border-rule pt-8 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="text-eyebrow text-fg-3 mb-3">{legal.footprintIntro}</p>
            <p className="text-small text-fg-2">{footprintSentence()}</p>
          </div>
          <div className="md:col-span-8">
            <Disclosure variant="standing" />
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-6 text-eyebrow text-fg-3">
          <span>{footer.copyright(year)}</span>
          {features.locales.length > 1 ? (
            <span className="flex items-center gap-4">
              <span>{footer.languageLabel}</span>
              {footer.languages.map((l) => (
                <span key={l.code}>{l.label}</span>
              ))}
            </span>
          ) : (
            <span>{footer.languages[0]?.label}</span>
          )}
        </div>
      </div>
    </footer>
  );
}
