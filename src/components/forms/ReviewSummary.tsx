"use client";

import { useContent } from "@/content/useContent";
import type { FlowAnswers, FlowDefinition } from "@/forms/types";
import { displayName } from "@/lib/countries";
import { localeMeta } from "@/lib/i18n/locales";
import { useLocale } from "@/lib/i18n/LocaleProvider";

type ReviewSummaryProps = {
  flow: FlowDefinition;
  answers: FlowAnswers;
  onEdit: (stepIndex: number) => void;
};

function labelFor(flow: FlowDefinition, stepIndex: number, name: string, value: unknown, intl: string): string {
  const field = flow.steps[stepIndex].fields.find((f) => f.name === name);
  if (value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0)) return "—";
  if (typeof value === "boolean") return value ? "✓" : "—";
  if (field && (field.kind === "country" || field.kind === "conditional-country")) return displayName(String(value), intl);
  if (field && "options" in field) {
    const opts = field.options;
    if (Array.isArray(value)) return value.map((v) => opts.find((o) => o.value === v)?.label ?? String(v)).join(", ");
    return opts.find((o) => o.value === value)?.label ?? String(value);
  }
  return String(value);
}

function fieldTitle(flow: FlowDefinition, stepIndex: number, name: string): string {
  const step = flow.steps[stepIndex];
  const field = step.fields.find((f) => f.name === name);
  if (field && "label" in field && field.label) return field.label;
  return step.title;
}

/** Every answer, grouped by step, each with an Edit action that returns to that step. */
export function ReviewSummary({ flow, answers, onEdit }: ReviewSummaryProps) {
  const ui = useContent().flowUi;
  const intl = localeMeta[useLocale()].intl;
  return (
    <dl className="border-t border-rule">
      {flow.steps.map((step, i) => {
        const rows = step.fields
          .filter((f) => f.kind !== "consent")
          .map((f) => ({ name: f.name, value: answers[f.name] }))
          .filter((r) => r.value !== undefined && r.value !== "" && !(Array.isArray(r.value) && r.value.length === 0));
        return (
          <div key={step.id} className="grid gap-3 border-b border-rule py-5 md:grid-cols-[1fr_auto] md:gap-x-8">
            <div className="flex flex-col gap-3">
              <p className="text-eyebrow text-fg-3 tabular">{String(i + 1).padStart(2, "0")}</p>
              {rows.length === 0 ? (
                <p className="text-small text-fg-3">—</p>
              ) : (
                rows.map((r) => (
                  <div key={r.name} className="grid gap-0.5 sm:grid-cols-[220px_1fr] sm:gap-x-6">
                    <dt className="text-small text-fg-2">{fieldTitle(flow, i, r.name)}</dt>
                    <dd className="m-0 text-body text-fg">{labelFor(flow, i, r.name, r.value, intl)}</dd>
                  </div>
                ))
              )}
            </div>
            <div>
              <button type="button" onClick={() => onEdit(i)} className="link-draw text-small font-medium text-fg" aria-label={`${ui.edit}: ${step.title}`}>
                {ui.edit}
              </button>
            </div>
          </div>
        );
      })}
    </dl>
  );
}
