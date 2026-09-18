import { describe, expect, it } from "vitest";
import { evaluateFit, type FitInput } from "./rules";

const base: FitInput = {
  projectType: "real-estate",
  country: "CR",
  entityElsewhere: "no",
  stage: "operating",
  relationship: "owner",
  objective: "raise-capital",
  value: "5m-25m",
};

describe("evaluateFit", () => {
  it("returns potential-fit for a controlling party, mature stage, supported jurisdiction and known type", () => {
    expect(evaluateFit(base).result).toBe("potential-fit");
  });

  it("never uses value or capital as a qualification input", () => {
    expect(evaluateFit({ ...base, value: "under-1m" }).result).toBe("potential-fit");
    expect(evaluateFit({ ...base, value: "undetermined", capital: "under-1m" }).result).toBe("potential-fit");
  });

  it("routes advisers and authorised representatives to review so a person confirms authority", () => {
    expect(evaluateFit({ ...base, relationship: "adviser" }).result).toBe("submitted-for-review");
    expect(evaluateFit({ ...base, relationship: "representative" }).result).toBe("submitted-for-review");
    expect(evaluateFit({ ...base, relationship: "adviser" }).tags).toContain("authority-to-confirm");
  });

  it("routes early-stage projects to review", () => {
    expect(evaluateFit({ ...base, stage: "concept" }).result).toBe("submitted-for-review");
    expect(evaluateFit({ ...base, stage: "planning" }).result).toBe("submitted-for-review");
    expect(evaluateFit({ ...base, stage: "documented" }).result).toBe("potential-fit");
    expect(evaluateFit({ ...base, stage: "development" }).result).toBe("potential-fit");
  });

  it("routes projects outside the public footprint to review without exposing why", () => {
    const out = evaluateFit({ ...base, country: "DE" });
    expect(out.result).toBe("submitted-for-review");
    expect(out.tags).toContain("outside-footprint");
  });

  it("accepts every supported jurisdiction", () => {
    for (const code of ["US", "SV", "CR", "PA", "CO", "BR"]) {
      expect(evaluateFit({ ...base, country: code }).result).toBe("potential-fit");
    }
  });

  it("routes 'other' project types to review", () => {
    expect(evaluateFit({ ...base, projectType: "other" }).result).toBe("submitted-for-review");
  });

  it("tags cross-border entities without changing the result", () => {
    const out = evaluateFit({ ...base, entityElsewhere: "yes" });
    expect(out.result).toBe("potential-fit");
    expect(out.tags).toContain("cross-border");
  });

  it("only ever returns one of the two launch results", () => {
    const results = new Set<string>();
    for (const relationship of ["owner", "adviser", "other"]) {
      for (const stage of ["concept", "operating"]) {
        results.add(evaluateFit({ ...base, relationship, stage }).result);
      }
    }
    expect([...results].every((r) => r === "potential-fit" || r === "submitted-for-review")).toBe(true);
  });
});
