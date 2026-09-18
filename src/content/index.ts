/**
 * Content entry point (server). Every locale exports the same shape as "en";
 * `satisfies Content` turns a missing translation into a type error.
 * Client Components use ./client, which bundles only what they need.
 */
import type { Locale } from "@/lib/i18n/locales";

import { about as aboutEn } from "./en/about";
import { accessibility as accessibilityEn } from "./en/accessibility";
import { contact as contactEn } from "./en/contact";
import { disclosures as disclosuresEn } from "./en/disclosures";
import { fitCheck as fitCheckEn, flowUi as flowUiEn, handling as handlingEn, investorAccess as investorAccessEn } from "./en/flows";
import { home as homeEn } from "./en/home";
import { howItWorks as howItWorksEn } from "./en/how-it-works";
import { investors as investorsEn } from "./en/investors";
import { legal as legalEn } from "./en/legal";
import { footer as footerEn, nav as navEn } from "./en/nav";
import { partnerCategories as partnerCategoriesEn, partnerLogos as partnerLogosEn, partners as partnersEn } from "./en/partners";
import { privacy as privacyEn } from "./en/privacy";
import { projects as projectsEn } from "./en/projects";
import { security as securityEn } from "./en/security";
import * as sharedEn from "./en/shared";
import { team as teamEn } from "./en/team";
import { terms as termsEn } from "./en/terms";

import { about as aboutEs } from "./es/about";
import { accessibility as accessibilityEs } from "./es/accessibility";
import { contact as contactEs } from "./es/contact";
import { disclosures as disclosuresEs } from "./es/disclosures";
import { fitCheck as fitCheckEs, flowUi as flowUiEs, handling as handlingEs, investorAccess as investorAccessEs } from "./es/flows";
import { home as homeEs } from "./es/home";
import { howItWorks as howItWorksEs } from "./es/how-it-works";
import { investors as investorsEs } from "./es/investors";
import { legal as legalEs } from "./es/legal";
import { footer as footerEs, nav as navEs } from "./es/nav";
import { partnerCategories as partnerCategoriesEs, partnerLogos as partnerLogosEs, partners as partnersEs } from "./es/partners";
import { privacy as privacyEs } from "./es/privacy";
import { projects as projectsEs } from "./es/projects";
import { security as securityEs } from "./es/security";
import * as sharedEs from "./es/shared";
import { team as teamEs } from "./es/team";
import { terms as termsEs } from "./es/terms";

const en = {
  nav: navEn,
  footer: footerEn,
  legal: legalEn,
  shared: sharedEn,
  home: homeEn,
  howItWorks: howItWorksEn,
  projects: projectsEn,
  investors: investorsEn,
  partners: partnersEn,
  partnerCategories: partnerCategoriesEn,
  partnerLogos: partnerLogosEn,
  about: aboutEn,
  team: teamEn,
  contact: contactEn,
  security: securityEn,
  disclosures: disclosuresEn,
  privacy: privacyEn,
  terms: termsEn,
  accessibility: accessibilityEn,
  flowUi: flowUiEn,
  handling: handlingEn,
  fitCheck: fitCheckEn,
  investorAccess: investorAccessEn,
};

export type Content = typeof en;

const es = {
  nav: navEs,
  footer: footerEs,
  legal: legalEs,
  shared: sharedEs,
  home: homeEs,
  howItWorks: howItWorksEs,
  projects: projectsEs,
  investors: investorsEs,
  partners: partnersEs,
  partnerCategories: partnerCategoriesEs,
  partnerLogos: partnerLogosEs,
  about: aboutEs,
  team: teamEs,
  contact: contactEs,
  security: securityEs,
  disclosures: disclosuresEs,
  privacy: privacyEs,
  terms: termsEs,
  accessibility: accessibilityEs,
  flowUi: flowUiEs,
  handling: handlingEs,
  fitCheck: fitCheckEs,
  investorAccess: investorAccessEs,
} satisfies Content;

const byLocale: Record<Locale, Content> = { en, es };

export function getContent(locale: Locale = "en"): Content {
  return byLocale[locale] ?? en;
}

/** English content, for code paths that are locale-independent (tests, defaults). */
export const content = en;
