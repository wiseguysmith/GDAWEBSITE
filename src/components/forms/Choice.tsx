"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";
import type { Option } from "@/forms/types";

type ChoiceProps = {
  name: string;
  options: Option[];
  /** "list" — radio rows; "tiles" — selection tiles (project type only). */
  presentation?: "list" | "tiles";
  type?: "radio" | "checkbox";
  invalid?: boolean;
  describedBy?: string;
} & Pick<ComponentPropsWithoutRef<"input">, "onChange" | "onBlur">;

/**
 * Radio or checkbox group. Native inputs keep arrow-key navigation and
 * screen-reader semantics; the visible style is drawn on the label.
 */
export const Choice = forwardRef<HTMLInputElement, ChoiceProps>(function Choice(
  { name, options, presentation = "list", type = "radio", invalid, describedBy, onChange, onBlur },
  ref,
) {
  const tiles = presentation === "tiles";
  return (
    <div
      className={cn(tiles ? "grid gap-2 sm:grid-cols-2" : "flex flex-col border-t border-rule")}
      role={type === "radio" ? "radiogroup" : "group"}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
    >
      {options.map((opt) => {
        const id = `${name}-${opt.value}`;
        return (
          <label
            key={opt.value}
            htmlFor={id}
            className={cn(
              "group relative flex min-h-(--touch-min) cursor-pointer items-center gap-4 text-body text-fg transition-colors duration-(--d-micro)",
              tiles
                ? "rounded-(--radius-control) border border-(--btn-outline-border) bg-bg-elevated px-5 py-4 hover:border-(--btn-outline-hover) has-checked:border-fg has-checked:bg-bg has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-(--focus-ring)"
                : "border-b border-rule py-3.5 hover:text-fg has-focus-visible:outline-2 has-focus-visible:outline-offset-[-2px] has-focus-visible:outline-(--focus-ring)",
            )}
          >
            <input
              ref={ref}
              id={id}
              type={type}
              name={name}
              value={opt.value}
              onChange={onChange}
              onBlur={onBlur}
              className="peer sr-only"
            />
            <span
              aria-hidden="true"
              className={cn(
                "flex size-[18px] shrink-0 items-center justify-center border border-fg-3 transition-colors duration-(--d-micro) peer-checked:border-fg peer-checked:bg-fg",
                type === "radio" ? "rounded-full" : "rounded-[3px]",
              )}
            >
              {type === "radio" ? (
                <span className="size-[6px] rounded-full bg-bg" />
              ) : (
                <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="var(--bg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path className="tick-path" d="M2 6l3 3 5-6" />
                </svg>
              )}
            </span>
            <span>{opt.label}</span>
          </label>
        );
      })}
    </div>
  );
});
