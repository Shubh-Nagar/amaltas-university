import { describe, it, expect } from "vitest";
import { digitsOnly, validateLead, redact } from "./chatLogger.js";

describe("digitsOnly (phone input filter)", () => {
  it("strips spaces, dashes and letters", () => {
    expect(digitsOnly("98765-43 2ab10")).toBe("9876543210");
  });

  it("drops a pasted +91 or leading 0 prefix", () => {
    expect(digitsOnly("+91 98765 43210")).toBe("9876543210");
    expect(digitsOnly("09876543210")).toBe("9876543210");
  });

  it("caps the value at 10 digits", () => {
    expect(digitsOnly("98765432109999")).toHaveLength(10);
  });
});

describe("validateLead (chat + brochure form rules)", () => {
  const valid = { name: "Riya Sharma", course: "BAMS", phone: "9876543210" };

  it("returns no errors for valid details", () => {
    expect(validateLead(valid)).toEqual({});
  });

  it("flags every missing field", () => {
    const errors = validateLead({ name: "", course: "", phone: "" });
    expect(Object.keys(errors)).toEqual(["name", "course", "phone"]);
  });

  it("rejects digits in a name but accepts Hindi names", () => {
    expect(validateLead({ ...valid, name: "Riya123" }).name).toMatch(/letters only/);
    expect(validateLead({ ...valid, name: "रिया शर्मा" })).toEqual({});
  });

  it("says how many digits were entered when the length is wrong", () => {
    expect(validateLead({ ...valid, phone: "98765" }).phone).toContain("(5 entered)");
  });

  it("rejects Indian mobile numbers that don't start with 6-9", () => {
    expect(validateLead({ ...valid, phone: "1234567890" }).phone).toMatch(/starting with 6, 7, 8 or 9/);
  });
});

describe("redact (privacy masking before chat logs leave the browser)", () => {
  it("masks emails and phone numbers", () => {
    expect(redact("mail me at riya.s@gmail.com or call 98765 43210"))
      .toBe("mail me at [email] or call [number]");
  });

  it("leaves ordinary text and short numbers alone", () => {
    expect(redact("BAMS fees for 2026?")).toBe("BAMS fees for 2026?");
  });
});
