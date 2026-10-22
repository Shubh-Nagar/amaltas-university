/* ─── CONTACT page data ───────────────────────────────────────
   Directory content mirrors https://amaltasmedicalcollege.in/contact/
   Phone numbers are stored as displayed; telHref() builds the dial link. */

import { CONTACT } from "./content.js";

// "07272-482590" → "tel:+917272482590", "9893953831" → "tel:+919893953831"
export const telHref = (num) => {
  let d = num.replace(/\D/g, "");
  if (d.startsWith("91") && d.length === 12) d = d.slice(2);
  if (d.startsWith("0")) d = d.slice(1);
  return `tel:+91${d}`;
};

const CAMPUS_ADDRESS = "Amaltas University, Village Bangar, Dewas–Ujjain Highway, District Dewas, Madhya Pradesh – 455001";

export const CONTACT_HIGHLIGHTS = [
  {
    key: "helpline",
    label: "24×7 Hospital Helpline",
    note: "Hospital helpline — 24 hours, 7 days a week",
    phones: ["9752467451", "9752447834"],
    accent: "burg",
  },
  {
    key: "admissions",
    label: "Admissions Guidance",
    note: "Courses, eligibility & counselling",
    phones: ["9893953831", "9893277382"],
    accent: "gold",
  },
  {
    key: "campus",
    label: "Campus Reception",
    note: "Village Bangar, Dewas–Ujjain Highway",
    phones: [CONTACT.tollFree],
    emails: [CONTACT.email],
    accent: "em",
  },
  {
    key: "city",
    label: "Indore City Office",
    note: "A.B. Road, near Hotel Amaltas",
    phones: ["0731-4215858", "0731-4215959"],
    accent: "em",
  },
];

export const LOCATIONS = [
  {
    key: "campus",
    label: "Campus",
    title: "Amaltas University",
    lines: ["Village Bangar, Dewas – Ujjain Highway,", "District Dewas, MP – 455001"],
    phones: [CONTACT.tollFree],
    emails: [CONTACT.email],
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.9!2d75.9739778!3d23.0270144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39631100317144b7%3A0xddadf537b5d66437!2sAmaltas%20University!5e0!3m2!1sen!2sin",
    directions: "https://www.google.com/maps/place/Amaltas+University/@23.0270144,75.9739778,17z/data=!4m6!3m5!1s0x39631100317144b7:0xddadf537b5d66437!8m2!3d23.0270144!4d75.9739778",
  },
  {
    key: "city",
    label: "City Office",
    title: "Indore City Office",
    lines: ["204, Shree Krishna Classic, 139, Phadnis Colony,", "Above Axis Bank, A.B. Road, Near Hotel Amaltas,", "Indore (M.P.) 452008"],
    phones: ["0731-4215858", "0731-4215959"],
    map: "https://maps.google.com/maps?q=Shree%20Krishna%20Classic%2C%20Phadnis%20Colony%2C%20A.B.%20Road%2C%20Indore%20452008&t=m&z=16&output=embed",
    directions: "https://www.google.com/maps/dir/?api=1&destination=Shree%20Krishna%20Classic%2C%20Phadnis%20Colony%2C%20A.B.%20Road%2C%20Indore%20452008",
  },
];

// Contact persons listed under every institution on the source page.
const COMMON_CONTACTS = [
  { name: "Mrs. Jyoti Rathore", phones: ["9752447800"] },
  { name: "Mrs. Rajshree Bisht", phones: ["7389910716"] },
];

export const DIRECTORY = [
  {
    key: "medical",
    short: "Medical Sciences",
    name: "Amaltas Institute of Medical Sciences",
    head: { role: "Dean", name: "Dr. (Prof.) Abhilash Kumar Pithawa", quals: "MS, FAIS, FMAS, FIAGES" },
    address: CAMPUS_ADDRESS,
    phones: [{ label: "Landline", num: "07272-482590" }],
    emails: ["deanmed@amaltasgroup.co.in"],
    contacts: [{ name: "Mr. Sunil Soni", phones: ["9893953831", "8085952768"] }, { name: "Dr. Pavan Bhambani", phones: ["9758538454"] }],
    courses: ["MBBS", "MD / MS"],
    approvals: ["NMC", "MPMSU, Jabalpur", "MPPURC, Bhopal"],
  },
  {
    key: "hospital",
    short: "Hospital",
    name: "Amaltas Institute of Medical Sciences (Hospital)",
    head: { role: "Medical Superintendent", name: "Dr. Mahavir Khandelwal" },
    address: CAMPUS_ADDRESS,
    phones: [{ label: "Mobile", num: "+91 98260-60562" }, { label: "Landline", num: "07272-426505" }],
    emails: ["medical@amaltasgroup.co.in"],
    contacts: [{ name: "24×7 Helpline", phones: ["9752467451", "9752447834"] }],
  },
  {
    key: "nursing",
    short: "Nursing",
    name: "Amaltas Institute of Nursing Sciences",
    head: { role: "Principal" },
    phones: [{ label: "Mobile", num: "+91 7880154601" }, { label: "Phone", num: "+91 7880154602" }],
    emails: ["nursingprincipal@amaltasgroup.co.in", "nursing@amaltasgroup.co.in"],
    contacts: [{ name: "Mr. Amit Singh", phones: ["911135005"] }],
  },
  {
    key: "homoeopathy",
    short: "Homoeopathy",
    name: "Amaltas Institute of Homoeopathy",
    head: { role: "Principal & Medical Superintendent", name: "Dr. Yogendra Bhadoriya" },
    phones: [{ label: "Mobile", num: "7880154606" }],
    emails: ["homoeopathy@amaltasgroup.co.in"],
    contacts: [{ name: "Dr. Abhijeet Tayde", role: "Head – H.R. Department", phones: ["9630098978"] }],
  },
  {
    key: "paramedical",
    short: "Paramedical",
    name: "Amaltas Institute of Medical Sciences (Paramedical Sciences)",
    head: { role: "Head", name: "Dr. Jagat Rawat" },
    phones: [{ label: "Mobile", num: "+91 7880154603" }, { label: "Mobile", num: "7880154604" }],
    emails: ["paramedical@amaltasgroup.co.in"],
    contacts: [{ name: "Dr. Pooja", phones: ["6264182588"] }],
  },
  {
    key: "ayurveda",
    short: "Ayurveda",
    name: "Amaltas Institute of Ayurveda",
    head: { role: "Principal", name: "Dr. Anita Ghodke" },
    phones: [{ label: "Mobile", num: "+91 7880154605" }],
    emails: ["ayurveda@amaltasgroup.co.in"],
    contacts: [{ name: "Dr. Abhijeet Tayde", role: "Head – H.R. Department", phones: ["9630098978"] }],
  },
  {
    key: "pharmacy",
    short: "Pharmacy",
    name: "Amaltas Institute of Pharmacy",
    head: { role: "Principal", name: "Dr. Neelam Khan" },
    phones: [{ label: "Mobile", num: "+91 7880154607" }],
    emails: ["amaltaspharmacy@gmail.com"],
    contacts: [{ name: "Dr. Neelam Khan", phones: ["7880154607"] }],
  },
].map((d) => ({ ...d, contacts: [...d.contacts, ...COMMON_CONTACTS] }));
