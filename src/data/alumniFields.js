// Alumni profile fields, shared by the Registration and Update Profile pages.
// `name` must match the column keys in scripts/alumni-apps-script.gs.
export const ALUMNI_EMAIL = "alumni@amaltasuniversity.in";

export const INSTITUTES = [
  "Amaltas Institute of Medical Sciences",
  "Amaltas Institute of Ayurveda",
  "Amaltas Institute of Homoeopathy",
  "Amaltas Institute of Pharmacy",
  "Amaltas Institute of Nursing Sciences",
  "Amaltas Institute of Paramedical Sciences",
  "Amaltas Institute of Management, Arts & Science",
];

export const ALUMNI_FIELDS = [
  { name: "first_name",        label: "First Name",                type: "text",     placeholder: "First name", maxLength: 60 },
  { name: "last_name",         label: "Last Name",                 type: "text",     placeholder: "Last name", maxLength: 60 },
  { name: "institute",         label: "Institute",                 type: "select",   options: ["Select Institute", ...INSTITUTES] },
  { name: "batch",             label: "Batch & Year of Admission", type: "text",     placeholder: "e.g. MBBS 2018", maxLength: 60 },
  { name: "dob",               label: "Date of Birth",             type: "date" },
  { name: "email",             label: "Email",                     type: "email",    placeholder: "you@example.com", maxLength: 120 },
  { name: "phone",             label: "Phone",                     type: "tel",      placeholder: "10-digit mobile number" },
  { name: "spouse",            label: "Wife / Husband Name",       type: "text",     placeholder: "Spouse's name", optional: true, maxLength: 80 },
  { name: "anniversary",       label: "Date of Anniversary",       type: "date",     optional: true },
  { name: "status",            label: "Present Status",            type: "text",     placeholder: "e.g. Consultant Physician, City Hospital", maxLength: 160 },
  { name: "qualifications",    label: "Qualifications",            type: "text",     placeholder: "e.g. MBBS, MD (Medicine)", maxLength: 160 },
  { name: "present_address",   label: "Present Address",           type: "textarea", placeholder: "Current address", maxLength: 400 },
  { name: "permanent_address", label: "Permanent Address",         type: "textarea", placeholder: "Permanent address", optional: true, maxLength: 400 },
  { name: "achievements",      label: "Achievements",              type: "textarea", placeholder: "1.\n2.\n3.", optional: true, maxLength: 1500 },
  { name: "directory",         label: "Show me in the alumni member directory (only my name, institute, batch and present status are shown)", type: "checkbox", optional: true },
];
