import type { ZodTypeAny } from "zod";

export type Option = { value: string; label: string };

/** Field kinds the FlowShell knows how to render. */
export type FieldDefinition =
  | { kind: "choice"; name: string; label?: string; help?: string; options: Option[]; presentation?: "list" | "tiles"; required?: boolean }
  | { kind: "multi"; name: string; label?: string; help?: string; options: Option[]; required?: boolean }
  | { kind: "country"; name: string; label: string; required?: boolean }
  | { kind: "text"; name: string; label: string; help?: string; required?: boolean; autoComplete?: string; inputMode?: "text" | "email" | "tel" }
  | { kind: "textarea"; name: string; label: string; help?: string; required?: boolean; maxLength?: number }
  | { kind: "select"; name: string; label: string; options: Option[]; required?: boolean }
  | { kind: "consent"; name: string; label: string }
  /** Shown only when another field has a given value (e.g. "other" → describe). */
  | { kind: "conditional-text"; name: string; label: string; when: { field: string; equals: string | string[] }; required?: boolean }
  | { kind: "conditional-country"; name: string; label: string; when: { field: string; equals: string | string[] }; required?: boolean };

export type StepDefinition = {
  id: string;
  title: string;
  help?: string;
  /** Rendered beneath the fields, e.g. the investor-status informational note. */
  note?: string;
  fields: FieldDefinition[];
  /** Whether the step can be skipped without answering (Skip button as prominent as Continue). */
  optional?: boolean;
  /** Persist this step's answers in the browser draft. Contact steps never are. */
  draft?: boolean;
  /** zod schema for this step's fields; also used server-side. */
  schema: ZodTypeAny;
};

export type FlowResult = {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
};

export type FlowDefinition = {
  /** Submission kind sent to the API and used for reference prefixes. */
  kind: "fit-check" | "investor-access";
  /** localStorage key, versioned so a schema change invalidates old drafts. */
  draftKey: string;
  intro: {
    eyebrow: string;
    heading: string;
    facts: string[];
    paragraphs: string[];
    begin: string;
    disclosure: "fitCheck" | "investor";
  };
  steps: StepDefinition[];
  results: Record<string, FlowResult>;
  afterResult: {
    emailNote: string;
    links: { label: string; href: string }[];
  };
  analytics: {
    started: string;
    step: string;
    completed: string;
  };
};

export type FlowAnswers = Record<string, unknown>;
