"use client";

import { useContent } from "@/content/useContent";
import { retention } from "@/config/retention";
import { cn } from "@/lib/cn";
import { LocalizedLink } from "@/components/actions/LocalizedLink";

type InfoDrawerProps = { className?: string };

/**
 * The four facts about information handling, inline where a person types
 * their contact details (design direction §04). Native <details>, no JS.
 * Retention values come from config so this can never disagree with /security.
 */
export function InfoDrawer({ className }: InfoDrawerProps) {
  const h = useContent().handling;
  const rows = [
    h.rows.collected,
    h.rows.sentTo,
    h.rows.seenBy,
    { label: h.rows.keptFor.label, body: h.rows.keptFor.body(Math.round(retention.submissionsDays / 365), retention.localDraftDays) },
  ];
  return (
    <details className={cn("group border border-rule bg-bg-elevated", className)}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-body font-medium text-fg [&::-webkit-details-marker]:hidden">
        <span>{h.summary}</span>
        <span aria-hidden="true" className="relative size-[18px] shrink-0">
          <span className="absolute inset-x-0 top-1/2 h-px bg-fg" />
          <span className="absolute inset-y-0 left-1/2 w-px bg-fg transition-transform duration-(--d-standard) ease-gda group-open:rotate-90" />
        </span>
      </summary>
      <dl className="grid gap-3 border-t border-rule px-5 pt-4 pb-5">
        {rows.map((row) => (
          <div key={row.label} className="grid gap-1 sm:grid-cols-[110px_1fr] sm:gap-4">
            <dt className="text-eyebrow text-fg-3 sm:pt-[3px]">{row.label}</dt>
            <dd className="m-0 text-small text-fg-2">{row.body}</dd>
          </div>
        ))}
        <div className="pt-1">
          <LocalizedLink href="/security" className="link-draw text-small text-fg">
            {h.more}
          </LocalizedLink>
        </div>
      </dl>
    </details>
  );
}
