import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type FieldProps = {
  id: string;
  label: string;
  help?: string;
  error?: string;
  required?: boolean;
  optionalLabel?: string;
  children: ReactNode;
  /** Use a fieldset/legend for grouped controls. */
  group?: boolean;
  className?: string;
};

/** Label above, control, help and error below — one layout for every control. */
export function Field({ id, label, help, error, required, optionalLabel, children, group = false, className }: FieldProps) {
  const helpId = help ? `${id}-help` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const Wrapper = group ? "fieldset" : "div";
  const LabelTag = group ? "legend" : "label";

  return (
    <Wrapper className={cn("m-0 flex min-w-0 flex-col gap-2 border-0 p-0", className)}>
      <LabelTag htmlFor={group ? undefined : id} className="text-body font-medium text-fg">
        {label}
        {!required && optionalLabel ? <span className="ml-2 text-small font-normal text-fg-3">{optionalLabel}</span> : null}
      </LabelTag>
      {help ? (
        <p id={helpId} className="text-small text-fg-2">
          {help}
        </p>
      ) : null}
      {children}
      {error ? (
        <p id={errorId} role="alert" className="flex items-start gap-2 text-small text-attention">
          <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" className="mt-[2px] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="8" cy="8" r="6.5" />
            <path d="M8 4.5v4M8 11v.5" strokeLinecap="round" />
          </svg>
          <span>{error}</span>
        </p>
      ) : null}
    </Wrapper>
  );
}

export function describedBy(id: string, help?: string, error?: string): string | undefined {
  const ids = [help ? `${id}-help` : null, error ? `${id}-error` : null].filter(Boolean);
  return ids.length ? ids.join(" ") : undefined;
}

export const controlClass =
  "h-(--input-h) w-full rounded-(--radius-control) border border-(--btn-outline-border) bg-bg-elevated px-4 text-[16px] text-fg placeholder:text-fg-3 transition-colors duration-(--d-micro) hover:border-(--btn-outline-hover) focus:border-fg focus:outline-none aria-[invalid=true]:border-attention";
