import type { ContentBlock as ContentBlockType } from "@/content/types";

type ContentBlockProps = {
  block: ContentBlockType;
  as?: "h2" | "h3";
  id?: string;
};

/** Heading, paragraphs and an optional bullet list, in the prose measure. */
export function ContentBlock({ block, as = "h2", id }: ContentBlockProps) {
  const Tag = as;
  return (
    <div className="flex max-w-(--container-prose) flex-col gap-4">
      <Tag id={id} className="text-h3 text-fg">
        {block.heading}
      </Tag>
      {block.paragraphs.map((p) => (
        <p key={p} className="text-body text-fg-2">
          {p}
        </p>
      ))}
      {block.bullets?.length ? (
        <ul className="mt-1 flex flex-col gap-3">
          {block.bullets.map((b) => (
            <li key={b} className="flex gap-3 text-body text-fg-2">
              <span aria-hidden="true" className="mt-[0.75em] h-px w-3 shrink-0 bg-rule-strong" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
