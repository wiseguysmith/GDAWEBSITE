import { z } from "zod";
import { consent, email, optionalText, shortText } from "../common";

export const enquiryTypes = ["general", "government", "partner", "media", "other"] as const;

export const contactSchema = z.object({
  type: z.enum(enquiryTypes, { errorMap: () => ({ message: "Please choose an enquiry type." }) }),
  name: shortText(120),
  organisation: optionalText(160),
  email,
  message: z.string().trim().min(10, "Please tell us a little more.").max(3000, "Please keep this under 3000 characters."),
  consent,
});

export type ContactAnswers = z.infer<typeof contactSchema>;
