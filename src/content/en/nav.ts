import type { Cta, NavItem } from "../types";

export const nav = {
  primary: [
    { label: "How It Works", href: "/how-it-works" },
    { label: "Projects", href: "/projects" },
    { label: "Investors", href: "/investors" },
    { label: "Partners", href: "/partners" },
    { label: "About", href: "/about" },
  ] satisfies NavItem[],
  cta: { label: "Evaluate Your Project", href: "/evaluate", event: "evaluate" } satisfies Cta,
  /** Short label used below the md breakpoint. */
  ctaShort: "Evaluate",
  secondary: [
    { label: "Request Investor Access", href: "/investors/access", event: "investor" },
    { label: "Contact", href: "/contact", event: "contact" },
  ] satisfies Cta[],
  menu: {
    open: "Open menu",
    close: "Close menu",
    title: "Menu",
  },
  skipToContent: "Skip to content",
};

export const footer = {
  groups: [
    {
      title: "Company",
      links: [
        { label: "How It Works", href: "/how-it-works" },
        { label: "Projects", href: "/projects" },
        { label: "Investors", href: "/investors" },
        { label: "Partners", href: "/partners" },
        { label: "About", href: "/about" },
      ],
    },
    {
      title: "Begin",
      links: [
        { label: "Evaluate Your Project", href: "/evaluate" },
        { label: "Request Investor Access", href: "/investors/access" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Trust",
      links: [
        { label: "Security", href: "/security" },
        { label: "Disclosures", href: "/disclosures" },
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
        { label: "Accessibility", href: "/accessibility" },
      ],
    },
  ] satisfies { title: string; links: NavItem[] }[],
  languageLabel: "Language",
  languages: [{ code: "en", label: "English" }],
  copyright: (year: number) => `© ${year} Global Digital Access.`,
};
