/**
 * Content entry point. Only "en" ships at launch; "es" and "pt" are reserved
 * and will export the same shape from ./es and ./pt when translated.
 */
import type { Locale } from "@/config/features";

import { about } from "./en/about";
import { accessibility } from "./en/accessibility";
import { contact } from "./en/contact";
import { disclosures } from "./en/disclosures";
import { fitCheck, flowUi, handling, investorAccess } from "./en/flows";
import { home } from "./en/home";
import { howItWorks } from "./en/how-it-works";
import { investors } from "./en/investors";
import { legal } from "./en/legal";
import { footer, nav } from "./en/nav";
import { partnerCategories, partnerLogos, partners } from "./en/partners";
import { privacy } from "./en/privacy";
import { projects } from "./en/projects";
import { security } from "./en/security";
import * as shared from "./en/shared";
import { team } from "./en/team";
import { terms } from "./en/terms";

const en = {
  nav,
  footer,
  legal,
  shared,
  home,
  howItWorks,
  projects,
  investors,
  partners,
  partnerCategories,
  partnerLogos,
  about,
  team,
  contact,
  security,
  disclosures,
  privacy,
  terms,
  accessibility,
  flowUi,
  handling,
  fitCheck,
  investorAccess,
};

export type Content = typeof en;

const byLocale: Record<Locale, Content> = { en };

export function getContent(locale: Locale = "en"): Content {
  return byLocale[locale] ?? en;
}

export const content = en;
