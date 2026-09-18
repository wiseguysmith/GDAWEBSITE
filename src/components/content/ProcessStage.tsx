import type { Stage } from "@/content/types";
import { cn } from "@/lib/cn";

type ProcessStageProps = {
  stage: Stage;
  reached: boolean;
  detailed?: boolean;
};

export function ProcessStage({ stage, reached, detailed = false }: ProcessStageProps) {
  const id = `stage-${stage.name.toLowerCase()}`;
  return (
    <li
      id={id}
      className="group relative grid gap-3 border-b border-rule py-8 pl-10 first:pt-0 last:border-b-0 lg:grid-cols-[200px_1fr] lg:gap-x-8 lg:pl-14"
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-0 top-8 size-[15px] rounded-full border border-fg bg-bg transition-colors duration-(--d-standard) ease-gda group-first:top-0 lg:size-[19px]",
          reached && "bg-fg",
        )}
      />
      <div className="flex flex-col gap-1">
        <span className="text-eyebrow text-fg-3 tabular">{String(stage.index).padStart(2, "0")}</span>
        <h3 className="text-h3 text-fg">{stage.name}</h3>
      </div>
      <div className="flex max-w-[60ch] flex-col gap-3">
        <p className="text-body font-semibold text-fg">{stage.lead}</p>
        <p className="text-body text-fg-2">{stage.body}</p>
        {detailed ? (
          <p className="text-small text-fg-3">
            <span className="text-eyebrow mr-2">Responsible</span>
            {stage.responsible}
          </p>
        ) : null}
      </div>
    </li>
  );
}
