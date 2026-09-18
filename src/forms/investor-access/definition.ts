import { clientContent } from "@/content/client";
import type { Locale } from "@/lib/i18n/locales";
import { analyticsEvents } from "@/lib/analytics/events";
import type { FlowDefinition } from "../types";
import { stepAllocation, stepContact, stepInterests, stepInvestorType, stepJurisdiction, stepStatus } from "./schema";

export function investorAccessFlow(locale: Locale): FlowDefinition {
  const content = clientContent[locale];
  const c = content.investorAccess;
  return {
    kind: "investor-access",
    draftKey: "gda:investor-access:v1",
    intro: {
      eyebrow: c.intro.eyebrow,
      heading: c.intro.heading,
      facts: c.intro.facts,
      paragraphs: [c.intro.means, c.intro.doesNotMean],
      begin: c.intro.begin,
      disclosure: "investor",
    },
    steps: [
      {
        id: "investor-type",
        title: c.steps.investorType.title,
        draft: true,
        schema: stepInvestorType,
        fields: [
          { kind: "choice", name: "investorType", options: c.steps.investorType.options, presentation: "tiles", required: true },
          {
            kind: "conditional-text",
            name: "investorTypeOther",
            label: c.steps.investorType.otherLabel,
            when: { field: "investorType", equals: "other" },
            required: true,
          },
        ],
      },
      {
        id: "jurisdiction",
        title: c.steps.jurisdiction.title,
        draft: true,
        schema: stepJurisdiction,
        fields: [{ kind: "country", name: "country", label: c.steps.jurisdiction.countryLabel, required: true }],
      },
      {
        id: "interests",
        title: c.steps.interests.title,
        help: c.steps.interests.help,
        draft: true,
        schema: stepInterests,
        fields: [{ kind: "multi", name: "interests", options: c.steps.interests.options, required: true }],
      },
      {
        id: "allocation",
        title: c.steps.allocation.title,
        help: c.steps.allocation.help,
        optional: true,
        draft: true,
        schema: stepAllocation,
        fields: [{ kind: "choice", name: "allocation", options: c.steps.allocation.options }],
      },
      {
        id: "status",
        title: c.steps.status.title,
        note: c.steps.status.note,
        draft: true,
        schema: stepStatus,
        fields: [{ kind: "choice", name: "status", options: c.steps.status.options, required: true }],
      },
      {
        id: "contact",
        title: c.steps.contact.title,
        draft: false,
        handling: true,
        schema: stepContact,
        fields: [
          { kind: "text", name: "name", label: c.steps.contact.name, required: true, autoComplete: "name" },
          { kind: "text", name: "organisation", label: c.steps.contact.organisation, autoComplete: "organization" },
          { kind: "text", name: "role", label: c.steps.contact.role, autoComplete: "organization-title" },
          { kind: "text", name: "email", label: c.steps.contact.email, required: true, autoComplete: "email", inputMode: "email" },
          { kind: "text", name: "phone", label: c.steps.contact.phone, autoComplete: "tel", inputMode: "tel" },
          { kind: "select", name: "language", label: c.steps.contact.language, options: c.steps.contact.languages, required: true },
          { kind: "consent", name: "consent", label: content.legal.consent },
        ],
      },
    ],
    results: c.results,
    afterResult: c.afterResult,
    analytics: {
      started: analyticsEvents.investorAccessStarted,
      step: analyticsEvents.investorAccessStep,
      completed: analyticsEvents.investorAccessCompleted,
    },
  };
}
