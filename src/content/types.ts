/**
 * Content types. Every locale exports the same shapes, so a missing
 * translation is a type error, not a blank page.
 */

export type CtaEvent = "evaluate" | "investor" | "contact";

export type Cta = {
  label: string;
  href: string;
  /** Analytics CTA key — never user data. */
  event?: CtaEvent;
};

export type Meta = {
  title: string;
  description: string;
};

export type NavItem = { label: string; href: string };

export type Pillar = {
  numeral: string;
  title: string;
  body: string;
  href: string;
};

export type Stage = {
  index: number;
  name: string;
  lead: string;
  body: string;
  /** Who is responsible at this stage — shown on How It Works. */
  responsible: string;
};

export type Application = {
  slug: string;
  title: string;
  descriptor: string;
};

export type Principle = {
  title: string;
  body: string;
};

export type LedgerColumn = {
  title: string;
  items: string[];
};

export type PartnerCategory = {
  slug: string;
  title: string;
  descriptor: string;
  /** Shown on the homepage grid (first eight). */
  featured: boolean;
};

export type PartnerLogo = {
  name: string;
  src: string;
  /** Written permission on file. Logos without it are never rendered. */
  permission: boolean;
};

export type TeamMember = {
  name: string;
  role: string;
  credential: string;
  bio: string;
  portrait: string;
  /** Rendered only when true and portrait/bio are present. */
  approved: boolean;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type LegalSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type ControlState = "implemented" | "implemented-manual" | "not-claimed";

export type SecurityControl = {
  control: string;
  state: ControlState;
  meaning: string;
};

export type LegalDocument = {
  meta: Meta;
  title: string;
  intro: string;
  version: string;
  updatedAt: string; // ISO date
  sections: LegalSection[];
  /** Optional controls matrix rendered before the sections (Security page). */
  controls?: {
    heading: string;
    columns: { control: string; state: string; meaning: string };
    states: Record<ControlState, string>;
    items: SecurityControl[];
  };
};

export type Pathway = {
  eyebrow: string;
  title: string;
  body: string;
  cta: Cta;
};

export type ContentBlock = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

/** Legal lines used inline across the site. */
export type LegalLines = {
  standing: string;
  investor: string;
  fitCheck: string;
  consent: string;
  footprintIntro: string;
};
