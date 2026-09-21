// Registration sheets are Google Forms exports living in public/assets — the
// header names below were read directly from those files.
//
// Each nameBox is calibrated (PDF points, bottom-left origin) to its own
// template's blank "This is to certify that ______" line — the two designs
// differ, so they are NOT interchangeable. Recalibrate if a template is
// replaced with a different layout.
export const WORKSHOPS = {
  GCP: {
    label: "GCP Workshop",
    excelPath: "/assets/GCP%20Workshop.xlsx",
    templatePath: "/assets/certificate/GCP.pdf",
    nameKey: "Full Name",
    emailKey: "Email Address",
    nameBox: {
      textCenterX: 470, // horizontal center of the blank line, for centering the name
      baselineY: 311,   // baseline the printed name sits on, above the underline
      maxWidth: 370,    // shrink font until the name fits this width
      maxFontSize: 20,
      minFontSize: 10,
    },
  },
  ICF: {
    label: "ICF Workshop",
    excelPath: "/assets/ICF%20Workshop.xlsx",
    templatePath: "/assets/certificate/ICF.pdf",
    nameKey: "Name",
    emailKey: "Email Address",
    nameBox: {
      textCenterX: 413,
      baselineY: 348, // above the underline
      maxWidth: 340,
      maxFontSize: 20,
      minFontSize: 10,
    },
  },
  NPW: {
    label: "National Pharmacovigilance Week",
    excelPath: "/assets/National%20Pharmacovigilance%20Week.xlsx",
    templatePath: "/assets/certificate/National%20Pharmacovigilance%20Week.pdf",
    nameKey: "Full Name",
    emailKey: "Email",
    // This template's MediaBox starts at y=8.58, so PDF y = 604.08 − the y a
    // viewer/PyMuPDF reports from the top.
    nameBoxes: [
      {
        textCenterX: 468, // the "Dr./Mr./Ms. ____" line runs x 288–648
        baselineY: 375,   // clears the underline, descenders included
        maxWidth: 340,
        maxFontSize: 20,
        minFontSize: 10,
      },
      {
        textCenterX: 377, // pledge line: "I, Dr./Mr./Ms.……," dots run x 171–583
        baselineY: 226,   // clears the dots (their baseline is ≈221), descenders included
        maxWidth: 380,
        maxFontSize: 16,  // matches the surrounding 16pt pledge text
        minFontSize: 9,
      },
    ],
  },
};
