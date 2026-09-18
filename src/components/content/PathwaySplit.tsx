"use client";

import Link from "next/link";
import type { Pathway } from "@/content/types";
import { analyticsEvents } from "@/lib/analytics/events";
import { track } from "@/lib/analytics/track";
import { Arrow } from "@/components/actions/ArrowLink";

type PathwaySplitProps = {
  project: Pathway;
  investor: Pathway;
};

/** One bordered container, one hairline divide, square corners; each half is a full click target. */
export function PathwaySplit({ project, investor }: PathwaySplitProps) {
  return (
    <div className="grid border border-rule md:grid-cols-2">
      {[project, investor].map((p, i) => (
        <Link
          key={p.title}
          href={p.cta.href}
          onClick={() => p.cta.event && track(analyticsEvents.heroCtaClicked, { cta: p.cta.event })}
          className={
            "group flex flex-col gap-4 p-7 no-underline transition-colors duration-(--d-standard) ease-gda hover:bg-bg-elevated focus-visible:bg-bg-elevated md:p-10 " +
            (i === 0 ? "border-b border-rule md:border-b-0 md:border-r" : "")
          }
        >
          <span className="text-eyebrow text-fg-3">{p.eyebrow}</span>
          <span className="text-h3 text-fg">{p.title}</span>
          <span className="max-w-[40ch] text-body text-fg-2">{p.body}</span>
          <span className="mt-auto inline-flex items-center gap-2 pt-4 font-medium text-fg">
            {p.cta.label}
            <Arrow />
          </span>
        </Link>
      ))}
    </div>
  );
}
