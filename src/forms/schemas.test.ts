import { describe, expect, it } from "vitest";
import { contactSchema } from "./contact/schema";
import { fitCheckSchema } from "./fit-check/schema";
import { investorAccessSchema } from "./investor-access/schema";

const validFitCheck = {
  projectType: "energy",
  projectTypeOther: "",
  country: "co",
  region: "Antioquia",
  entityElsewhere: "no",
  entityCountry: "",
  stage: "development",
  relationship: "developer",
  relationshipOther: "",
  objective: "raise-capital",
  objectivesAlso: ["governance"],
  objectiveOther: "",
  value: "25m-100m",
  capital: "5m-25m",
  name: "Ana Pérez",
  organisation: "Solar Andina S.A.S.",
  role: "Directora",
  email: "ANA@example.com ",
  phone: "+57 300 000 0000",
  language: "es",
  comments: "",
  consent: true,
};

describe("fitCheckSchema", () => {
  it("accepts a complete submission and normalises the country code", () => {
    const parsed = fitCheckSchema.parse(validFitCheck);
    expect(parsed.country).toBe("CO");
  });

  it("requires a description when 'other' is chosen", () => {
    const r = fitCheckSchema.safeParse({ ...validFitCheck, projectType: "other" });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.issues.some((i) => i.path.join(".") === "projectTypeOther")).toBe(true);
  });

  it("requires the entity country when the entity is organised elsewhere", () => {
    const r = fitCheckSchema.safeParse({ ...validFitCheck, entityElsewhere: "yes", entityCountry: "" });
    expect(r.success).toBe(false);
  });

  it("rejects unknown option values", () => {
    expect(fitCheckSchema.safeParse({ ...validFitCheck, stage: "moon" }).success).toBe(false);
  });

  it("requires explicit consent", () => {
    expect(fitCheckSchema.safeParse({ ...validFitCheck, consent: false }).success).toBe(false);
  });

  it("rejects invalid email", () => {
    expect(fitCheckSchema.safeParse({ ...validFitCheck, email: "not-an-email" }).success).toBe(false);
  });
});

describe("investorAccessSchema", () => {
  const valid = {
    investorType: "family-office",
    investorTypeOther: "",
    country: "US",
    interests: ["real-estate", "energy"],
    allocation: "",
    status: "not-sure",
    name: "J. Doe",
    organisation: "",
    role: "",
    email: "j@example.com",
    phone: "",
    language: "en",
    consent: true,
  };

  it("accepts a valid request with optional allocation omitted", () => {
    expect(investorAccessSchema.safeParse(valid).success).toBe(true);
  });

  it("requires at least one area of interest", () => {
    expect(investorAccessSchema.safeParse({ ...valid, interests: [] }).success).toBe(false);
  });
});

describe("contactSchema", () => {
  it("requires a message of reasonable length", () => {
    expect(contactSchema.safeParse({ type: "general", name: "A", organisation: "", email: "a@b.co", message: "hi", consent: true }).success).toBe(false);
    expect(contactSchema.safeParse({ type: "partner", name: "A", organisation: "", email: "a@b.co", message: "We are a law firm in Panama.", consent: true }).success).toBe(true);
  });
});
