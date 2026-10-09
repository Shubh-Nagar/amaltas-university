// @vitest-environment node
// Pure data/PDF logic — no DOM needed, and Node's Blob (unlike jsdom's) supports arrayBuffer().
import { describe, it, expect, vi, afterEach } from "vitest";
import * as XLSX from "xlsx";
import { PDFDocument } from "pdf-lib";
import { findRegistrants, generateCertificate } from "./certificateMatch.js";

const workshop = {
  excelPath: "/registrants.xlsx",
  templatePath: "/template.pdf",
  emailKey: "Email ID",
  nameBox: { textCenterX: 300, baselineY: 200, maxWidth: 250, maxFontSize: 28, minFontSize: 12 },
};

// Build a real .xlsx file in memory so the test doesn't depend on files in /public.
function excelBytes(rows) {
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rows), "Sheet1");
  return XLSX.write(wb, { type: "array", bookType: "xlsx" });
}

// Replace the browser's fetch with a fake that returns the bytes we choose (mocking).
function mockFetch(bytes, ok = true) {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok, arrayBuffer: async () => bytes }));
}

afterEach(() => vi.unstubAllGlobals());

describe("findRegistrants", () => {
  const rows = [
    { Name: "Riya Sharma", "Email ID": "riya@example.com" },
    { Name: "Aman Verma", "Email ID": "shared@example.com" },
    { Name: "Neha Verma", "Email ID": "shared@example.com" },
  ];

  it("matches email ignoring case and surrounding spaces", async () => {
    mockFetch(excelBytes(rows));
    const found = await findRegistrants(workshop, "  RIYA@Example.com ");
    expect(found.map((r) => r.Name)).toEqual(["Riya Sharma"]);
    expect(fetch).toHaveBeenCalledWith("/registrants.xlsx");
  });

  it("returns every person who registered with a shared email", async () => {
    mockFetch(excelBytes(rows));
    const found = await findRegistrants(workshop, "shared@example.com");
    expect(found).toHaveLength(2);
  });

  it("returns an empty list when nobody matches", async () => {
    mockFetch(excelBytes(rows));
    expect(await findRegistrants(workshop, "nobody@example.com")).toEqual([]);
  });

  it("throws a friendly error when the sheet can't be loaded", async () => {
    mockFetch(new ArrayBuffer(0), false);
    await expect(findRegistrants(workshop, "riya@example.com")).rejects.toThrow("Could not load the registrant list");
  });
});

describe("generateCertificate", () => {
  it("stamps the name onto the template and returns a PDF", async () => {
    const template = await PDFDocument.create();
    template.addPage([600, 400]);
    mockFetch((await template.save()).buffer);

    const blob = await generateCertificate(workshop, "Riya Sharma");
    expect(blob.type).toBe("application/pdf");
    const out = await PDFDocument.load(await blob.arrayBuffer());
    expect(out.getPageCount()).toBe(1);
  });

  it("rejects a non-PDF response (e.g. the SPA serving index.html for a missing file)", async () => {
    mockFetch(new TextEncoder().encode("<!doctype html>").buffer);
    await expect(generateCertificate(workshop, "Riya Sharma")).rejects.toThrow(/isn't available yet/);
  });
});
