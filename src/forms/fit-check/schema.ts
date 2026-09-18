import { z } from "zod";
import { consent, countryCode, email, language, multi, optionalText, phone, shortText } from "../common";

/**
 * Fit Check answers — one schema per step, composed into the full schema
 * used by the API route. Option values match content/en/flows.ts.
 */

export const projectTypes = ["real-estate", "environmental", "infrastructure", "agriculture", "energy", "private-enterprise", "other"] as const;
export const stages = ["concept", "planning", "documented", "development", "operating", "operating-financed"] as const;
export const relationships = ["owner", "controlling", "developer", "representative", "government", "adviser", "other"] as const;
export const objectives = ["raise-capital", "broaden-access", "restructure", "investor-rights", "transferability", "governance", "explore", "other"] as const;
export const valueRanges = ["under-1m", "1m-5m", "5m-25m", "25m-100m", "over-100m", "undetermined"] as const;
export const entityElsewhere = ["no", "yes", "not-sure"] as const;

const requireWhenOther = (field: string, otherField: string) => (data: Record<string, unknown>, ctx: z.RefinementCtx) => {
  if (data[field] === "other" && !(typeof data[otherField] === "string" && (data[otherField] as string).trim().length > 0)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: [otherField], message: "Please describe." });
  }
};

export const stepProjectType = z
  .object({
    projectType: z.enum(projectTypes, { errorMap: () => ({ message: "Please choose one." }) }),
    projectTypeOther: optionalText(200),
  })
  .superRefine(requireWhenOther("projectType", "projectTypeOther"));

export const stepJurisdiction = z
  .object({
    country: countryCode,
    region: optionalText(120),
    entityElsewhere: z.enum(entityElsewhere, { errorMap: () => ({ message: "Please choose one." }) }),
    entityCountry: z.string().trim().toUpperCase().optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    if (data.entityElsewhere === "yes" && !data.entityCountry) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["entityCountry"], message: "Please choose a country." });
    }
    if (data.entityCountry && !countryCode.safeParse(data.entityCountry).success) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["entityCountry"], message: "Please choose a country." });
    }
  });

export const stepStage = z.object({
  stage: z.enum(stages, { errorMap: () => ({ message: "Please choose one." }) }),
});

export const stepRelationship = z
  .object({
    relationship: z.enum(relationships, { errorMap: () => ({ message: "Please choose one." }) }),
    relationshipOther: optionalText(200),
  })
  .superRefine(requireWhenOther("relationship", "relationshipOther"));

export const stepObjective = z
  .object({
    objective: z.enum(objectives, { errorMap: () => ({ message: "Please choose one." }) }),
    objectivesAlso: multi(z.enum(objectives)),
    objectiveOther: optionalText(200),
  })
  .superRefine(requireWhenOther("objective", "objectiveOther"));

export const stepEconomics = z.object({
  value: z.enum(valueRanges, { errorMap: () => ({ message: "Please choose a range." }) }),
  capital: z.enum(valueRanges).optional().or(z.literal("")),
});

export const stepContact = z.object({
  name: shortText(120),
  organisation: shortText(160),
  role: shortText(120),
  email,
  phone,
  language,
  comments: optionalText(2000),
  consent,
});

export const fitCheckSchema = stepProjectType.and(stepJurisdiction).and(stepStage).and(stepRelationship).and(stepObjective).and(stepEconomics).and(stepContact);

export type FitCheckAnswers = z.infer<typeof fitCheckSchema>;
