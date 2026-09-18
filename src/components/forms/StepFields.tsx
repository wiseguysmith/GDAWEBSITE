"use client";

import type { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { useContent } from "@/content/useContent";
import type { FieldDefinition, FlowAnswers } from "@/forms/types";
import { Choice } from "./Choice";
import { Checkbox, CountrySelect, Input, Select, Textarea } from "./Controls";
import { Field, describedBy } from "./Field";

type StepFieldsProps = {
  /** The step's question — used as the accessible legend for unlabelled choice groups. */
  stepTitle: string;
  fields: FieldDefinition[];
  register: UseFormRegister<FlowAnswers>;
  watch: UseFormWatch<FlowAnswers>;
  errors: FieldErrors<FlowAnswers>;
};

/** Schemas emit English messages; each locale maps them in flowUi.validation. */
function errorMessage(errors: FieldErrors<FlowAnswers>, name: string, translations: Record<string, string>): string | undefined {
  const e = errors[name];
  if (typeof e?.message !== "string") return undefined;
  return translations[e.message] ?? e.message;
}

function isShown(when: { field: string; equals: string | string[] }, watch: UseFormWatch<FlowAnswers>): boolean {
  const value = watch(when.field);
  return Array.isArray(when.equals) ? when.equals.includes(String(value)) : String(value) === when.equals;
}

/** Renders a step's fields from its definition — the only place field kinds are mapped to controls. */
export function StepFields({ stepTitle, fields, register, watch, errors }: StepFieldsProps) {
  const ui = useContent().flowUi;
  return (
    <div className="flex flex-col gap-8">
      {fields.map((field) => {
        const error = errorMessage(errors, field.name, ui.validation);
        const id = `f-${field.name}`;

        switch (field.kind) {
          case "choice":
          case "multi": {
            const hasOwnLabel = Boolean(field.label);
            return (
              <Field
                key={field.name}
                id={id}
                label={field.label ?? stepTitle}
                help={field.help}
                error={error}
                required={field.required}
                optionalLabel={ui.optional}
                group
                className={hasOwnLabel ? undefined : "[&>legend]:sr-only"}
              >
                <Choice
                  {...register(field.name)}
                  name={field.name}
                  options={field.options}
                  presentation={field.kind === "choice" ? field.presentation : "list"}
                  type={field.kind === "multi" ? "checkbox" : "radio"}
                  invalid={Boolean(error)}
                  describedBy={describedBy(id, field.help, error)}
                />
              </Field>
            );
          }
          case "country":
          case "conditional-country": {
            if (field.kind === "conditional-country" && !isShown(field.when, watch)) return null;
            return (
              <Field key={field.name} id={id} label={field.label} error={error} required={field.required} optionalLabel={ui.optional}>
                <CountrySelect id={id} {...register(field.name)} required={field.required} invalid={Boolean(error)} aria-describedby={describedBy(id, undefined, error)} />
              </Field>
            );
          }
          case "text":
            return (
              <Field key={field.name} id={id} label={field.label} help={field.help} error={error} required={field.required} optionalLabel={ui.optional}>
                <Input
                  id={id}
                  {...register(field.name)}
                  type={field.inputMode === "email" ? "email" : field.inputMode === "tel" ? "tel" : "text"}
                  inputMode={field.inputMode}
                  autoComplete={field.autoComplete}
                  required={field.required}
                  invalid={Boolean(error)}
                  aria-describedby={describedBy(id, field.help, error)}
                />
              </Field>
            );
          case "conditional-text":
            if (!isShown(field.when, watch)) return null;
            return (
              <Field key={field.name} id={id} label={field.label} error={error} required={field.required} optionalLabel={ui.optional}>
                <Input id={id} {...register(field.name)} type="text" required={field.required} invalid={Boolean(error)} aria-describedby={describedBy(id, undefined, error)} />
              </Field>
            );
          case "textarea":
            return (
              <Field key={field.name} id={id} label={field.label} help={field.help} error={error} required={field.required} optionalLabel={ui.optional}>
                <Textarea id={id} {...register(field.name)} maxLength={field.maxLength} required={field.required} invalid={Boolean(error)} aria-describedby={describedBy(id, field.help, error)} />
              </Field>
            );
          case "select":
            return (
              <Field key={field.name} id={id} label={field.label} error={error} required={field.required} optionalLabel={ui.optional}>
                <Select
                  id={id}
                  {...register(field.name)}
                  options={field.options}
                  required={field.required}
                  invalid={Boolean(error)}
                  placeholder={ui.selectPlaceholder}
                  aria-describedby={describedBy(id, undefined, error)}
                />
              </Field>
            );
          case "consent":
            return (
              <div key={field.name} className="flex flex-col gap-2 border-t border-rule pt-6">
                <Checkbox id={id} {...register(field.name)} label={field.label} invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} />
                {error ? (
                  <p id={`${id}-error`} role="alert" className="text-small text-attention">
                    {error}
                  </p>
                ) : null}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
