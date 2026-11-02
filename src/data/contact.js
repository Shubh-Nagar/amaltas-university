/* ─── CONTACT page data ───────────────────────────────────────
   Source: the university's official Telephone Directory (six institutes).
   Spellings of names and emails are kept exactly as in that document. */

// "9425048393" → "tel:+919425048393"
export const telHref = (num) => {
  let d = num.replace(/\D/g, "");
  if (d.startsWith("91") && d.length === 12) d = d.slice(2);
  if (d.startsWith("0")) d = d.slice(1);
  return `tel:+91${d}`;
};

export const DIRECTORY = [
  { institute: "Medical Sciences", role: "Dean",      name: "Abhilash Kumar Pitawa", phones: ["8085952768"],               email: "medical@amaltasgroup.co.in" },
  { institute: "Nursing",          role: "Principal", name: "Dr. Sangeeta Tiwari",   phones: ["9425048393", "9406654909"], email: "nursing@amaltasgroup.co.in" },
  { institute: "Paramedical",      role: "Principal", name: "Dr. Jagat Rawat",       phones: ["9755505006"],               email: "paramedical@amaltasgroup.co.in" },
  { institute: "Pharmacy",         role: "Principal", name: "Dr. Neelam Khan",       phones: ["9685096514"],               email: "amaltaspharmacy@gmail.com" },
  { institute: "Ayurveda",         role: "Principal", name: "Dr. Anita Ghodke",      phones: ["7880154605"],               email: "amaltasayurveda1@gmail.com" },
  { institute: "Homoeopathy",      role: "Principal", name: "Dr. Yogendra Bhadoriya", phones: ["8959681230"],              email: "homoepathy@amaltasgroup.co.in" },
];
