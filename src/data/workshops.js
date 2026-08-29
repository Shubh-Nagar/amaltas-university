// Registration sheets are Google Forms exports living in public/assets — the
// header names below were read directly from those files.
//
// nameBox coordinates are calibrated (in PDF points, bottom-left origin) to
// the ICF template's exact page size and the position of its placeholder
// name "Dr. Shavi Patel" on the underline. GCP reuses the same box on the
// assumption it's the same certificate design — if its layout differs,
// recalibrate that workshop's nameBox to match.
const SHARED_NAME_BOX = {
  x: 208,          // erase-rectangle left edge
  y: 333,          // erase-rectangle bottom edge
  width: 327,      // erase-rectangle width
  height: 26,      // erase-rectangle height
  textCenterX: 371, // horizontal center of the underline, for centering the name
  baselineY: 337,   // baseline the printed name sits on
  maxWidth: 300,    // shrink font until the name fits this width
  maxFontSize: 20,
  minFontSize: 10,
};

export const WORKSHOPS = {
  GCP: {
    label: "GCP Workshop",
    excelPath: "/assets/GCP%20Workshop.xlsx",
    templatePath: "/assets/certificate/GCP%20certificate.pdf",
    nameKey: "Full Name",
    emailKey: "Email Address",
    mobileKey: "Phone number",
    nameBox: SHARED_NAME_BOX,
  },
  ICF: {
    label: "ICF Workshop",
    excelPath: "/assets/ICF%20Workshop.xlsx",
    templatePath: "/assets/certificate/ICF%20certificate.pdf",
    nameKey: "Name",
    emailKey: "Email Address",
    mobileKey: "Phone number",
    nameBox: SHARED_NAME_BOX,
  },
};
