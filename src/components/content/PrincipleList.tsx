import type { Principle } from "@/content/types";

type PrincipleListProps = {
  items: readonly Principle[];
  numbered?: boolean;
};

/** Two-column list of principles with hairlines; numbered when order carries meaning. */
export function PrincipleList({ items, numbered = false }: PrincipleListProps) {
  const Tag = numbered ? "ol" : "ul";
  return (
    <Tag className="grid border-t border-rule md:grid-cols-2 md:gap-x-(--gutter)">
      {items.map((p, i) => (
        <li key={p.title} className="flex flex-col gap-2 border-b border-rule py-6">
          {numbered ? <span className="text-eyebrow text-fg-3 tabular">{String(i + 1).padStart(2, "0")}</span> : null}
          <h3 className="text-h4 text-fg">{p.title}</h3>
          <p className="max-w-[48ch] text-body text-fg-2">{p.body}</p>
        </li>
      ))}
    </Tag>
  );
}
