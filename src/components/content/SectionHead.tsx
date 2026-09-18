import { Eyebrow } from "@/components/typography/Eyebrow";
import { Heading } from "@/components/typography/Heading";
import { cn } from "@/lib/cn";

type SectionHeadProps = {
  id: string;
  eyebrow?: string;
  heading: string;
  body?: string;
  as?: "h1" | "h2" | "h3";
  size?: "xl" | "l" | "h3";
  className?: string;
};

/** Eyebrow, headline and standfirst — the head of every section. */
export function SectionHead({ id, eyebrow, heading, body, as = "h2", size = "l", className }: SectionHeadProps) {
  return (
    <div className={cn("flex max-w-(--container-prose) flex-col gap-4", className)}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Heading as={as} size={size} id={id}>
        {heading}
      </Heading>
      {body ? <p className="mt-2 max-w-[62ch] text-body-l text-fg-2">{body}</p> : null}
    </div>
  );
}
