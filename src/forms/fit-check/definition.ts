import { content } from "@/content";
import { analyticsEvents } from "@/lib/analytics/events";
import type { FlowDefinition } from "../types";
import { stepContact, stepEconomics, stepJurisdiction, stepObjective, stepProjectType, stepRelationship, stepStage } from "./schema";

const c = content.fitCheck;

/**
 * The Fit Check as data. Adding a question is a change here and in schema.ts,
 * not in a component (handoff §36).
 */
export const fitCheckFlow: FlowDefinition = {
  kind: "fit-check",
  draftKey: "gda:fit-check:v1",
  intro: {
    eyebrow: c.intro.eyebrow,
    heading: c.intro.heading,
    facts: c.intro.facts,
    paragraphs: [c.intro.body, c.intro.whatNext],
    begin: content.flowUi.begin,
    disclosure: "fitCheck",
  },
  steps: [
    {
      id: "project-type",
      title: c.steps.projectType.title,
      draft: true,
      schema: stepProjectType,
      fields: [
        { kind: "choice", name: "projectType", options: c.steps.projectType.options, presentation: "tiles", required: true },
        { kind: "conditional-text", name: "projectTypeOther", label: c.steps.projectType.otherLabel, when: { field: "projectType", equals: "other" }, required: true },
      ],
    },
    {
      id: "jurisdiction",
      title: c.steps.jurisdiction.title,
      draft: true,
      schema: stepJurisdiction,
      fields: [
        { kind: "country", name: "country", label: c.steps.jurisdiction.countryLabel, required: true },
        { kind: "text", name: "region", label: c.steps.jurisdiction.regionLabel, autoComplete: "address-level1" },
        { kind: "choice", name: "entityElsewhere", label: c.steps.jurisdiction.entityQuestion, options: c.steps.jurisdiction.entityOptions, required: true },
        {
          kind: "conditional-country",
          name: "entityCountry",
          label: c.steps.jurisdiction.entityCountryLabel,
          when: { field: "entityElsewhere", equals: "yes" },
          required: true,
        },
      ],
    },
    {
      id: "stage",
      title: c.steps.stage.title,
      draft: true,
      schema: stepStage,
      fields: [{ kind: "choice", name: "stage", options: c.steps.stage.options, required: true }],
    },
    {
      id: "relationship",
      title: c.steps.relationship.title,
      draft: true,
      schema: stepRelationship,
      fields: [
        { kind: "choice", name: "relationship", options: c.steps.relationship.options, required: true },
        { kind: "conditional-text", name: "relationshipOther", label: c.steps.relationship.otherLabel, when: { field: "relationship", equals: "other" }, required: true },
      ],
    },
    {
      id: "objective",
      title: c.steps.objective.title,
      help: c.steps.objective.help,
      draft: true,
      schema: stepObjective,
      fields: [
        { kind: "choice", name: "objective", options: c.steps.objective.options, required: true },
        { kind: "conditional-text", name: "objectiveOther", label: c.steps.objective.otherLabel, when: { field: "objective", equals: "other" }, required: true },
        { kind: "multi", name: "objectivesAlso", label: c.steps.objective.alsoLabel, options: c.steps.objective.options.filter((o) => o.value !== "other") },
      ],
    },
    {
      id: "economics",
      title: c.steps.economics.title,
      help: c.steps.economics.help,
      draft: true,
      schema: stepEconomics,
      fields: [
        { kind: "select", name: "value", label: c.steps.economics.valueLabel, options: c.steps.economics.options, required: true },
        { kind: "select", name: "capital", label: c.steps.economics.capitalLabel, options: c.steps.economics.options },
      ],
    },
    {
      id: "contact",
      title: c.steps.contact.title,
      draft: false,
      handling: true,
      schema: stepContact,
      fields: [
        { kind: "text", name: "name", label: c.steps.contact.name, required: true, autoComplete: "name" },
        { kind: "text", name: "organisation", label: c.steps.contact.organisation, required: true, autoComplete: "organization" },
        { kind: "text", name: "role", label: c.steps.contact.role, required: true, autoComplete: "organization-title" },
        { kind: "text", name: "email", label: c.steps.contact.email, required: true, autoComplete: "email", inputMode: "email" },
        { kind: "text", name: "phone", label: c.steps.contact.phone, autoComplete: "tel", inputMode: "tel" },
        { kind: "select", name: "language", label: c.steps.contact.language, options: c.steps.contact.languages, required: true },
        { kind: "textarea", name: "comments", label: c.steps.contact.comments, help: c.steps.contact.commentsHelp, maxLength: 2000 },
        { kind: "consent", name: "consent", label: content.legal.consent },
      ],
    },
  ],
  results: c.results,
  afterResult: c.afterResult,
  analytics: {
    started: analyticsEvents.fitCheckStarted,
    step: analyticsEvents.fitCheckStep,
    completed: analyticsEvents.fitCheckCompleted,
  },
};
