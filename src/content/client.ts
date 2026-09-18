/**
 * The subset of content Client Components need (navigation, legal lines, the
 * two flows and the contact form), for every locale. Kept separate from
 * ./index so marketing-page copy never enters the client bundle.
 */
import type { Locale } from "@/lib/i18n/locales";

import { contact as contactEn } from "./en/contact";
import { errors as errorsEn } from "./en/errors";
import { fitCheck as fitCheckEn, flowUi as flowUiEn, handling as handlingEn, investorAccess as investorAccessEn } from "./en/flows";
import { legal as legalEn } from "./en/legal";
import { footer as footerEn, nav as navEn } from "./en/nav";
import { stages as stagesEn } from "./en/shared";

import { contact as contactEs } from "./es/contact";
import { errors as errorsEs } from "./es/errors";
import { fitCheck as fitCheckEs, flowUi as flowUiEs, handling as handlingEs, investorAccess as investorAccessEs } from "./es/flows";
import { legal as legalEs } from "./es/legal";
import { footer as footerEs, nav as navEs } from "./es/nav";
import { stages as stagesEs } from "./es/shared";

const en = {
  nav: navEn,
  footer: footerEn,
  legal: legalEn,
  flowUi: flowUiEn,
  handling: handlingEn,
  fitCheck: fitCheckEn,
  investorAccess: investorAccessEn,
  contact: contactEn,
  errors: errorsEn,
  stages: stagesEn,
};

export type ClientContent = typeof en;

const es = {
  nav: navEs,
  footer: footerEs,
  legal: legalEs,
  flowUi: flowUiEs,
  handling: handlingEs,
  fitCheck: fitCheckEs,
  investorAccess: investorAccessEs,
  contact: contactEs,
  errors: errorsEs,
  stages: stagesEs,
} satisfies ClientContent;

export const clientContent: Record<Locale, ClientContent> = { en, es };
