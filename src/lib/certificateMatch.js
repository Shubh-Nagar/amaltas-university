import * as XLSX from "xlsx";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

function normalizeEmail(v) {
  return String(v || "").trim().toLowerCase();
}

function normalizeMobile(v) {
  return String(v || "").replace(/\D/g, "").slice(-10);
}

// Looks up the registrant in the workshop's Excel sheet by email + mobile.
// Returns the matching row, or null.
export async function findRegistrant(workshop, email, mobile) {
  const res = await fetch(workshop.excelPath);
  if (!res.ok) throw new Error("Could not load the registrant list");
  const buf = await res.arrayBuffer();
  const wb = XLSX.read(buf, { type: "array", cellDates: true });
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

  const targetEmail = normalizeEmail(email);
  const targetMobile = normalizeMobile(mobile);

  return (
    rows.find((row) => {
      const rowEmail = normalizeEmail(row[workshop.emailKey]);
      const rowMobile = normalizeMobile(row[workshop.mobileKey]);
      return rowEmail === targetEmail && rowMobile === targetMobile;
    }) || null
  );
}

// Loads the workshop's certificate template, masks the placeholder name and
// stamps the matched registrant's name in its place, and returns the
// resulting PDF as a Blob.
export async function generateCertificate(workshop, fullName) {
  const res = await fetch(workshop.templatePath);
  const templateBytes = await res.arrayBuffer();

  // A missing static file on some SPA hosts still resolves with a 200
  // (index.html served as a fallback), so a status check alone isn't
  // reliable — confirm the bytes actually start with a PDF header.
  const header = new TextDecoder().decode(templateBytes.slice(0, 5));
  if (!res.ok || header !== "%PDF-") {
    throw new Error("The certificate for this workshop isn't available yet. Please contact the administration office.");
  }


  const pdfDoc = await PDFDocument.load(templateBytes);
  const page = pdfDoc.getPage(0);
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const { x, y, width, height, textCenterX, baselineY, maxWidth, maxFontSize, minFontSize } = workshop.nameBox;

  // Cover the template's placeholder name with a white patch — the template
  // background there is solid white, so this leaves no visible seam.
  page.drawRectangle({ x, y, width, height, color: rgb(1, 1, 1) });

  let fontSize = maxFontSize;
  while (fontSize > minFontSize && font.widthOfTextAtSize(fullName, fontSize) > maxWidth) {
    fontSize -= 1;
  }
  const textWidth = font.widthOfTextAtSize(fullName, fontSize);

  page.drawText(fullName, {
    x: textCenterX - textWidth / 2,
    y: baselineY,
    size: fontSize,
    font,
    color: rgb(0.08, 0.08, 0.08),
  });

  const bytes = await pdfDoc.save();
  return new Blob([bytes], { type: "application/pdf" });
}
