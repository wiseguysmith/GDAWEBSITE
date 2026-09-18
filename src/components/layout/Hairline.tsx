import { cn } from "@/lib/cn";

type HairlineProps = {
  orientation?: "horizontal" | "vertical";
  className?: string;
};

/** The structural device of the system: a 1px rule in the current ground's --rule. */
export function Hairline({ orientation = "horizontal", className }: HairlineProps) {
  return (
    <div
      role="presentation"
      className={cn(orientation === "horizontal" ? "h-px w-full bg-rule" : "w-px self-stretch bg-rule", className)}
    />
  );
}
