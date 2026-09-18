"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";
import { countries } from "@/lib/countries";
import type { Option } from "@/forms/types";
import { controlClass } from "./Field";

type InputProps = ComponentPropsWithoutRef<"input"> & { invalid?: boolean };

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ invalid, className, ...rest }, ref) {
  return <input ref={ref} aria-invalid={invalid || undefined} className={cn(controlClass, className)} {...rest} />;
});

type TextareaProps = ComponentPropsWithoutRef<"textarea"> & { invalid?: boolean };

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea({ invalid, className, ...rest }, ref) {
  return (
    <textarea
      ref={ref}
      aria-invalid={invalid || undefined}
      rows={5}
      className={cn(controlClass, "h-auto min-h-[140px] resize-y py-3 leading-relaxed", className)}
      {...rest}
    />
  );
});

type SelectProps = ComponentPropsWithoutRef<"select"> & {
  invalid?: boolean;
  options: Option[];
  placeholder?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select({ invalid, options, placeholder, className, ...rest }, ref) {
  return (
    <div className="relative">
      <select ref={ref} aria-invalid={invalid || undefined} className={cn(controlClass, "appearance-none pr-10", className)} defaultValue="" {...rest}>
        <option value="" disabled={rest.required}>
          {placeholder ?? "Select…"}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <Chevron />
    </div>
  );
});

type CountrySelectProps = ComponentPropsWithoutRef<"select"> & { invalid?: boolean; placeholder?: string };

/**
 * Full ISO-3166 list in a native select: type-to-jump on desktop, the system
 * picker on mobile, and no custom widget to maintain for accessibility.
 */
export const CountrySelect = forwardRef<HTMLSelectElement, CountrySelectProps>(function CountrySelect({ invalid, placeholder, className, ...rest }, ref) {
  return (
    <div className="relative">
      <select ref={ref} aria-invalid={invalid || undefined} className={cn(controlClass, "appearance-none pr-10", className)} defaultValue="" autoComplete="country" {...rest}>
        <option value="" disabled={rest.required}>
          {placeholder ?? "Select a country…"}
        </option>
        {countries.map((c) => (
          <option key={c.code} value={c.code}>
            {c.name}
          </option>
        ))}
      </select>
      <Chevron />
    </div>
  );
});

function Chevron() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      width="16"
      height="16"
      className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-fg-3"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6l5 5 5-5" />
    </svg>
  );
}

type CheckboxProps = ComponentPropsWithoutRef<"input"> & { invalid?: boolean; label: string };

/** Consent checkbox: unchecked by default, label is the full consent text. */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox({ invalid, label, id, className, ...rest }, ref) {
  return (
    <label htmlFor={id} className={cn("flex min-h-(--touch-min) cursor-pointer items-start gap-3 text-small text-fg-2", className)}>
      <input ref={ref} id={id} type="checkbox" aria-invalid={invalid || undefined} className="peer sr-only" {...rest} />
      <span
        aria-hidden="true"
        className="mt-[2px] flex size-[18px] shrink-0 items-center justify-center rounded-[3px] border border-fg-3 transition-colors duration-(--d-micro) peer-checked:border-fg peer-checked:bg-fg peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--focus-ring) peer-aria-[invalid=true]:border-attention"
      >
        <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="var(--bg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 6l3 3 5-6" />
        </svg>
      </span>
      <span>{label}</span>
    </label>
  );
});
