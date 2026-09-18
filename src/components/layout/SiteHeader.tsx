"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { content } from "@/content";
import { Button } from "@/components/actions/Button";
import { Wordmark } from "./Wordmark";
import { MobileMenu } from "./MobileMenu";

type SiteHeaderProps = {
  /** "dark": transparent over a navy hero, glass on scroll. "light": flows — off-white with a hairline. */
  tone?: "dark" | "light";
  /** Flows show only the wordmark and a way out. */
  minimal?: boolean;
};

const GLASS_AT = 80;

export function SiteHeader({ tone = "dark", minimal = false }: SiteHeaderProps) {
  const { nav } = content;
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > GLASS_AT);
        const desktop = window.matchMedia("(min-width: 64rem)").matches;
        const goingDown = y > lastY.current && y > GLASS_AT * 3;
        setHidden(desktop && goingDown && !menuOpen);
        lastY.current = y;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [menuOpen]);

  // Close the menu on navigation (state adjusted during render, per React guidance).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  const dark = tone === "dark";

  return (
    <>
      <header
        data-theme={dark ? "navy" : undefined}
        className={cn(
          "fixed inset-x-0 top-0 z-(--z-header) transition-[transform,background-color,border-color] duration-(--d-standard) ease-gda",
          "pt-[env(safe-area-inset-top,0px)]",
          dark ? "text-fg" : "bg-bg text-fg border-b border-rule",
          dark && scrolled && !menuOpen && "glass border-b border-rule",
          dark && !scrolled && "bg-transparent border-b border-transparent",
          hidden && !menuOpen && "-translate-y-full",
        )}
      >
        <div className="mx-auto flex h-(--header-h-mobile) max-w-(--container) items-center justify-between gap-6 px-(--margin) lg:h-(--header-h)">
          <Wordmark variant="short" />

          {!minimal ? (
            <nav aria-label="Primary" className="hidden nav:block">
              <ul className="flex items-center gap-8">
                {nav.primary.map((item) => {
                  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn("link-draw text-sm text-fg-2 hover:text-fg transition-colors duration-(--d-micro)", active && "text-fg")}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ) : null}

          <div className="flex items-center gap-3">
            {!minimal ? (
              <>
                <span className="hidden md:inline-flex">
                  <Button href={nav.cta.href} event={nav.cta.event} size="small">
                    {nav.cta.label}
                  </Button>
                </span>
                <span className="inline-flex md:hidden">
                  <Button href={nav.cta.href} event={nav.cta.event} size="small">
                    {nav.ctaShort}
                  </Button>
                </span>
                <button
                  ref={toggleRef}
                  type="button"
                  className="nav:hidden inline-flex size-(--touch-min) items-center justify-center rounded-(--radius-control) border border-(--btn-outline-border) hover:border-(--btn-outline-hover) transition-colors duration-(--d-micro)"
                  aria-expanded={menuOpen}
                  aria-controls="site-menu"
                  aria-label={menuOpen ? nav.menu.close : nav.menu.open}
                  onClick={() => setMenuOpen((v) => !v)}
                >
                  <MenuIcon open={menuOpen} />
                </button>
              </>
            ) : (
              <Link href="/" className="link-draw text-sm text-fg-2 hover:text-fg">
                Exit
              </Link>
            )}
          </div>
        </div>
      </header>

      {!minimal ? (
        <MobileMenu id="site-menu" open={menuOpen} onClose={() => setMenuOpen(false)} returnFocusTo={toggleRef} />
      ) : null}
    </>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      {open ? (
        <>
          <path d="M4 4l12 12" />
          <path d="M16 4L4 16" />
        </>
      ) : (
        <>
          <path d="M3 6h14" />
          <path d="M3 14h14" />
        </>
      )}
    </svg>
  );
}
