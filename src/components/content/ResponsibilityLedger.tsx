import type { LedgerColumn } from "@/content/types";

type ResponsibilityLedgerProps = {
  columns: readonly LedgerColumn[];
};

/** Three-column ledger: GDA / professional partners / technical providers (handoff §7). */
export function ResponsibilityLedger({ columns }: ResponsibilityLedgerProps) {
  return (
    <div className="grid border-t border-rule md:grid-cols-3">
      {columns.map((col) => (
        <div key={col.title} className="border-b border-rule py-6 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
          <h3 className="text-eyebrow text-fg-3">{col.title}</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {col.items.map((item) => (
              <li key={item} className="flex gap-3 text-body text-fg-2">
                <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-rule-strong" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
