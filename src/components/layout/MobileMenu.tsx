"use client";

import { useEffect, useRef, type RefObject } from "react";
import { cn } from "@/lib/cn";
import { useContent } from "@/content/useContent";
import { LocalizedLink } from "@/components/actions/LocalizedLink";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Wordmark } from "./Wordmark";

type MobileMenuProps = {
  id: string;
  open: boolean;
  onClose: () => void;
  returnFocusTo: RefObject<HTMLButtonElement | null>;
};

const focusable = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Full-screen navy menu with a focus trap, Esc to close and body scroll lock. */
export function MobileMenu({ id, open, onClose, returnFocusTo }: MobileMenuProps) {
  const { nav } = useContent();
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const toggle = returnFocusTo.current;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel.current) return;
      const items = Array.from(panel.current.querySelectorAll<HTMLElement>(focusable));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      toggle?.focus();
    };
  }, [open, onClose, returnFocusTo]);

  return (
    <div
      id={id}
      ref={panel}
      role="dialog"
      aria-modal="true"
      aria-label={nav.menu.title}
      hidden={!open}
      data-theme="navy"
      className={cn(
        "fixed inset-0 z-(--z-menu) flex flex-col bg-bg text-fg",
        "pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]",
      )}
    >
      <div className="flex h-(--header-h-mobile) items-center justify-between px-(--margin) lg:h-(--header-h)">
        <Wordmark variant="short" />
        <button
          ref={closeBtn}
          type="button"
          onClick={onClose}
          aria-label={nav.menu.close}
          className="inline-flex size-(--touch-min) items-center justify-center rounded-(--radius-control) border border-(--btn-outline-border) hover:border-(--btn-outline-hover)"
        >
          <svg aria-hidden="true" viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M4 4l12 12" />
            <path d="M16 4L4 16" />
          </svg>
        </button>
      </div>

      <nav aria-label="Primary" className="flex-1 overflow-y-auto px-(--margin) pt-8">
        <ul className="flex flex-col">
          {nav.primary.map((item) => (
            <li key={item.href} className="border-t border-rule">
              <LocalizedLink
                href={item.href}
                onClick={onClose}
                className="block py-5 text-[clamp(1.75rem,6vw,2.5rem)] leading-tight tracking-[-0.02em] font-medium text-fg"
              >
                {item.label}
              </LocalizedLink>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-3 border-t border-rule pt-8">
          <LocalizedLink
            href={nav.cta.href}
            onClick={onClose}
            className="inline-flex h-(--control-h) items-center justify-center rounded-(--radius-control) bg-(--btn-primary-bg) text-(--btn-primary-fg) font-medium"
          >
            {nav.cta.label}
          </LocalizedLink>
          {nav.secondary.map((item) => (
            <LocalizedLink
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="inline-flex h-(--control-h) items-center justify-center rounded-(--radius-control) border border-(--btn-outline-border) text-fg font-medium"
            >
              {item.label}
            </LocalizedLink>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-rule pt-6 pb-8">
          <span className="text-eyebrow text-fg-3">{nav.language.label}</span>
          <LanguageSwitcher variant="list" />
        </div>
      </nav>
    </div>
  );
}
