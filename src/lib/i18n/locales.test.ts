import { describe, expect, it } from "vitest";
import { localePath, splitLocale } from "./locales";

describe("localePath", () => {
  it("leaves English (the default) unprefixed", () => {
    expect(localePath("en", "/")).toBe("/");
    expect(localePath("en", "/how-it-works")).toBe("/how-it-works");
  });
  it("prefixes other locales", () => {
    expect(localePath("es", "/")).toBe("/es");
    expect(localePath("es", "/how-it-works#stages")).toBe("/es/how-it-works#stages");
    expect(localePath("es", "/contact?type=partner")).toBe("/es/contact?type=partner");
  });
  it("never touches external, hash or mailto links", () => {
    expect(localePath("es", "https://example.com")).toBe("https://example.com");
    expect(localePath("es", "#main")).toBe("#main");
    expect(localePath("es", "mailto:a@b.co")).toBe("mailto:a@b.co");
  });
});

describe("splitLocale", () => {
  it("detects a prefixed locale and returns the locale-free path", () => {
    expect(splitLocale("/es/about")).toEqual({ locale: "es", path: "/about" });
    expect(splitLocale("/es")).toEqual({ locale: "es", path: "/" });
  });
  it("treats unprefixed paths as English", () => {
    expect(splitLocale("/about")).toEqual({ locale: "en", path: "/about" });
    expect(splitLocale("/")).toEqual({ locale: "en", path: "/" });
  });
});
