import { describe, expect, it } from "vitest";
import type { Submission } from "@/integrations/types";
import { confirmationEmail, notificationEmail } from "./templates";

const base: Submission = {
  id: "GDA-FC-TEST01",
  kind: "fit-check",
  locale: "en",
  answers: { projectType: "energy", country: "CR", stage: "operating", relationship: "owner", name: "A", email: "a@example.com", language: "en" },
  result: "potential-fit",
  tags: ["size:5m-25m"],
  meta: {},
  createdAt: "2026-09-18T00:00:00.000Z",
  schemaVersion: 1,
};

describe("confirmationEmail", () => {
  it("writes the confirmation in English for English submissions", () => {
    const email = confirmationEmail(base);
    expect(email.subject).toContain("Fit Check received");
    expect(email.text).toContain("Potential Fit — Pending Review");
    expect(email.text).toContain("Not started");
  });

  it("writes the confirmation in Spanish when the submitter chose Spanish", () => {
    const email = confirmationEmail({ ...base, locale: "es" });
    expect(email.subject).toContain("Evaluación de Idoneidad recibida");
    expect(email.text).toContain("Idoneidad potencial — Pendiente de revisión");
    expect(email.text).toContain("No iniciada");
    expect(email.html).toContain('lang="es"');
  });

  it("falls back to English for languages that are not translated yet", () => {
    const email = confirmationEmail({ ...base, locale: "pt" });
    expect(email.subject).toContain("Fit Check received");
  });

  it("never uses approval language", () => {
    for (const locale of ["en", "es"]) {
      const text = confirmationEmail({ ...base, locale }).text.toLowerCase();
      expect(text).not.toMatch(/\bapproved\b|\baprobad[oa]\b|\baccepted\b|\baceptad[oa]\b/);
    }
  });
});

describe("notificationEmail", () => {
  it("stays in English and records the submitter's language", () => {
    const email = notificationEmail({ ...base, locale: "es" });
    expect(email.subject).toContain("[fit-check]");
    expect(email.text).toContain("Language: es");
  });
});
