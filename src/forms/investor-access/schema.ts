import { z } from "zod";
import { consent, countryCode, email, language, optionalText, phone, shortText } from "../common";

export const investorTypes = ["individual", "family-office", "institutional", "fund", "corporate", "other"] as const;
export const interests = ["real-estate", "environmental", "infrastructure", "agriculture", "energy", "private-enterprise", "open"] as const;
export const allocations = ["under-100k", "100k-500k", "500k-2m", "2m-10m", "over-10m", "prefer-not"] as const;
export const statuses = ["yes", "no", "not-sure"] as const;

export const stepInvestorType = z
  .object({
    investorType: z.enum(investorTypes, { errorMap: () => ({ message: "Please choose one." }) }),
    investorTypeOther: optionalText(200),
  })
  .superRefine((data, ctx) => {
    if (data.investorType === "other" && !(data.investorTypeOther && data.investorTypeOther.trim().length > 0)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["investorTypeOther"], message: "Please describe." });
    }
  });

export const stepJurisdiction = z.object({
  country: countryCode,
});

export const stepInterests = z.object({
  interests: z.array(z.enum(interests)).min(1, "Please choose at least one.").max(7),
});

export const stepAllocation = z.object({
  allocation: z.enum(allocations).optional().or(z.literal("")),
});

export const stepStatus = z.object({
  status: z.enum(statuses, { errorMap: () => ({ message: "Please choose one." }) }),
});

export const stepContact = z.object({
  name: shortText(120),
  organisation: optionalText(160),
  role: optionalText(120),
  email,
  phone,
  language,
  consent,
});

export const investorAccessSchema = stepInvestorType.and(stepJurisdiction).and(stepInterests).and(stepAllocation).and(stepStatus).and(stepContact);

export type InvestorAccessAnswers = z.infer<typeof investorAccessSchema>;
