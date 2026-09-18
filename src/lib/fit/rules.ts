import { isSupportedJurisdiction } from "@/lib/jurisdictions/supported";

/**
 * Preliminary fit routing (handoff §13).
 *
 * Two user-facing results at launch. The positive result depends on simple
 * maturity and control indicators only — never on value or capital sought,
 * and never on any internal country list. "Not a fit" is never automated;
 * a person delivers it.
 *
 * Pure function: answers in, result and internal tags out. Unit-tested.
 */

export type FitResultKey = "potential-fit" | "submitted-for-review";

export type FitInput = {
  projectType: string;
  country: string;
  entityElsewhere?: string;
  stage: string;
  relationship: string;
  objective?: string;
  value?: string;
  capital?: string;
};

export type FitOutcome = {
  result: FitResultKey;
  /** Internal-only tags for the team. Never shown to the visitor. */
  tags: string[];
};

/** Relationships that indicate control over, or authority for, the project. */
export const controlRelationships: ReadonlySet<string> = new Set(["owner", "controlling", "developer", "government"]);

/** Stages at which a readiness review can meaningfully begin. */
export const matureStages: ReadonlySet<string> = new Set(["documented", "development", "operating", "operating-financed"]);

export function evaluateFit(input: FitInput): FitOutcome {
  const tags: string[] = [];

  const hasControl = controlRelationships.has(input.relationship);
  const isMature = matureStages.has(input.stage);
  const inFootprint = isSupportedJurisdiction(input.country);
  const knownType = input.projectType !== "other";

  if (!hasControl) tags.push("authority-to-confirm");
  if (!isMature) tags.push("early-stage");
  if (!inFootprint) tags.push("outside-footprint");
  if (!knownType) tags.push("type-other");
  if (input.entityElsewhere === "yes" || input.entityElsewhere === "not-sure") tags.push("cross-border");
  if (input.value) tags.push(`size:${input.value}`);
  if (input.capital) tags.push(`capital:${input.capital}`);
  if (input.objective) tags.push(`objective:${input.objective}`);

  const result: FitResultKey = hasControl && isMature && inFootprint && knownType ? "potential-fit" : "submitted-for-review";
  return { result, tags };
}
