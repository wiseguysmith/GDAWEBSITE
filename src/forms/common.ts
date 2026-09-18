import { z } from "zod";
import { countryCodes } from "@/lib/countries";

/** Shared zod pieces used by every flow, client and server. */

export const countryCode = z
  .string()
  .trim()
  .toUpperCase()
  .refine((c) => countryCodes.includes(c), { message: "Please choose a country." });

export const shortText = (max = 200) => z.string().trim().min(1, "This answer is required.").max(max, `Please keep this under ${max} characters.`);

export const optionalText = (max = 200) => z.string().trim().max(max, `Please keep this under ${max} characters.`).optional().or(z.literal(""));

export const email = z.string().trim().min(1, "Please enter your email.").email("Please enter a valid email address.").max(254);

export const phone = z
  .string()
  .trim()
  .max(40)
  .regex(/^[+\d()\-.\s]*$/, "Please enter a valid phone number.")
  .optional()
  .or(z.literal(""));

export const language = z.enum(["en", "es", "pt"]);

/**
 * Checkbox groups: react-hook-form reports no selection as `false` and a
 * single selection as a string in some browsers. Normalise to an array.
 */
export const multi = <T extends z.ZodTypeAny>(item: T) =>
  z.preprocess((v) => (v === false || v == null || v === "" ? [] : typeof v === "string" ? [v] : v), z.array(item));

export const consent = z.literal(true, { errorMap: () => ({ message: "Please confirm consent to continue." }) });

/** Meta sent with every submission for spam checks and idempotency. */
export const submissionMeta = z.object({
  startedAt: z.number().int().positive(),
  attemptKey: z.string().min(8).max(64),
  honeypot: z.string().max(200).optional(),
  turnstileToken: z.string().max(4096).optional(),
  locale: language.default("en"),
});

export type SubmissionMeta = z.infer<typeof submissionMeta>;
