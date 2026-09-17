// Programme-wise fee and eligibility tables. Shared by the Fee Details and
// Eligibility pages and by the Amaltas Assistant, so all three always agree.
import { C } from "../theme.js";

export const FEE_CATEGORIES = [
  {
    id: "medical",
    label: "Medical",
    color: C.burg,
    courses: [
      { course: "MBBS", specialization: null, fee: 1698000, seats: 250 },
      { course: "MD / MS", specialization: "Dermatology, Radio-Diagnosis", fee: 2184000, seats: null },
      { course: "MD / MS", specialization: "General Medicine, OBS-Gynae", fee: 1950000, seats: null },
      { course: "MD / MS", specialization: "Orthopaedic, Anaesthesia, Paediatric, Psychiatry, Respiratory, ENT, General Surgery, Ophthalmology, Emergency Medicine", fee: 1838000, seats: 134 },
      { course: "MD", specialization: "Pathology", fee: 950000, seats: null },
      { course: "DM", specialization: "Cardiology, Nephrology", fee: 1215000, seats: null },
      { course: "M.Ch", specialization: "Neurosurgery, Urology", fee: 1805000, seats: null },
      { course: "MD", specialization: "Anatomy, Biochemistry, Physiology, Forensic Medicine", fee: 10000, seats: null },
      { course: "MD", specialization: "Pharmacology, Community Medicine, Microbiology", fee: 100000, seats: null },
    ],
  },
  {
    id: "ayurveda",
    label: "Ayurveda",
    color: "#2d7a4f",
    courses: [
      { course: "BAMS", specialization: "Bachelor of Ayurvedic Medicine & Surgery", fee: 310000, seats: 100 },
    ],
  },
  {
    id: "homoeopathy",
    label: "Homoeopathy",
    color: "#3f8f63",
    courses: [
      { course: "BHMS", specialization: "Bachelor of Homeopathic Medicine & Surgery", fee: 155000, seats: 100 },
    ],
  },
  {
    id: "nursing",
    label: "Nursing",
    color: "#a0522d",
    courses: [
      { course: "B.Sc Nursing", specialization: null, fee: 90000, seats: 100 },
      { course: "B.Sc Post Basic Nursing", specialization: null, fee: 61000, seats: 40 },
      { course: "M.Sc Nursing", specialization: null, fee: 135000, seats: 34 },
      { course: "GNM", specialization: "General Nursing & Midwifery", fee: 51000, seats: 100 },
      { course: "PhD Nursing", specialization: null, fee: 135000, seats: null },
    ],
  },
  {
    id: "pharmacy",
    label: "Pharmacy",
    color: "#1a7a6e",
    courses: [
      { course: "B.Pharm", specialization: "Bachelor of Pharmacy", fee: 69500, seats: 60 },
      { course: "D.Pharm", specialization: "Diploma in Pharmacy", fee: 75000, seats: 60 },
    ],
  },
  {
    id: "allied",
    label: "Paramedical",
    color: "#5a3e8a",
    courses: [
      { course: "BPT", specialization: "Bachelor of Physiotherapy", fee: 75000, seats: 50 },
      { course: "BMLT", specialization: "Bachelor of Medical Lab Technology", fee: 75000, seats: 50 },
      { course: "BXRT", specialization: "Bachelor of X-Ray Technology", fee: 55000, seats: null },
      { course: "DMLT", specialization: "Diploma in Medical Lab Technology", fee: 40000, seats: 50 },
      { course: "Dialysis Technician", specialization: null, fee: 30000, seats: null },
      { course: "Cath Lab Technician", specialization: null, fee: 30000, seats: null },
      { course: "OT Technician", specialization: "Operation Theatre Technician", fee: 30000, seats: 50 },
      { course: "X-Ray Technician", specialization: null, fee: 20000, seats: 50 },
      { course: "USG Technician", specialization: "Ultrasonography Technician", fee: 20000, seats: 50 },
    ],
  },
  // Hidden — Allied and Rehabilitation fee category temporarily unlisted.
  // {
  //   id: "psychology",
  //   label: "Allied and Rehabilitation",
  //   color: "#7a5c1a",
  //   courses: [
  //     { course: "B.Sc (Hons) Clinical Psychology", specialization: null, fee: 110000, seats: 20 },
  //     { course: "BASLP", specialization: "Audiology & Speech Language Pathology", fee: 110000, seats: null },
  //     { course: "ISITEP (HI)", specialization: "Hearing Impairment", fee: 110000, seats: null },
  //     { course: "ISITEP (ID)", specialization: "Intellectual Disability", fee: 110000, seats: 20 },
  //     { course: "Prof. Diploma", specialization: "Clinical Psychology", fee: 230000, seats: 12 },
  //   ],
  // },
];

export const ELIGIBILITY_CATEGORIES = [
  {
    id: "medical-sciences",
    label: "Medical Sciences",
    color: C.burg,
    courses: [
      { course: "MBBS",     eligibility: "12th passed with Physics, Chemistry & Biology — NEET UG required" },
      { course: "MD / MS",  eligibility: "MBBS from an NMC-recognised institution — NEET PG required" },
      { course: "DM / M.Ch", eligibility: "MD / MS / DNB in the relevant broad specialty from an NMC-recognised institution — NEET SS required" },
    ],
  },
  {
    id: "ayurveda",
    label: "Ayurveda",
    color: "#2f7d4f",
    courses: [
      { course: "BAMS", eligibility: "12th passed with Physics, Chemistry & Biology — NEET UG required" },
    ],
  },
  {
    id: "homoeopathy",
    label: "Homoeopathy",
    color: "#1a6fa6",
    courses: [
      { course: "BHMS", eligibility: "12th passed with Physics, Chemistry & Biology — NEET UG required" },
    ],
  },
  {
    id: "nursing",
    label: "Nursing Sciences",
    color: "#a0522d",
    courses: [
      { course: "B.Sc Nursing",            eligibility: "12th with PCB, subject to qualifying the Pre-Nursing Selection Test (PNST)" },
      { course: "Post Basic B.Sc Nursing", eligibility: "As per UGC / Nursing Council guidelines" },
      { course: "GNM",                     eligibility: "As per UGC / Nursing Council guidelines" },
      { course: "M.Sc Nursing",            eligibility: "As per UGC / Nursing Council guidelines" },
      { course: "PhD Nursing",             eligibility: "As per UGC / Nursing Council guidelines" },
    ],
  },
  {
    id: "pharmacy",
    label: "Pharmacy",
    color: "#1a7a6e",
    courses: [
      { course: "B.Pharm", eligibility: "12th passed with PCB / PCM" },
      { course: "D.Pharm", eligibility: "12th passed with PCB / PCM" },
    ],
  },
  {
    id: "paramedical",
    label: "Paramedical Sciences",
    color: "#5a3e8a",
    courses: [
      { course: "BPT",                           eligibility: "12th with PCB" },
      { course: "BMLT",                          eligibility: "12th with PCB" },
      { course: "BXRT",                          eligibility: "12th with PCB" },
      { course: "DMLT",                          eligibility: "12th with PCB" },
      { course: "Diploma – Cath Lab Technology", eligibility: "12th with PCB" },
      { course: "Diploma – Dialysis Technology", eligibility: "12th with PCB" },
      { course: "Certificate – OT Technician",   eligibility: "12th with PCB" },
      { course: "Certificate – X-Ray Technician", eligibility: "12th with PCB" },
      { course: "Certificate – USG Technician",  eligibility: "12th with PCB" },
    ],
  },
  // Hidden — Allied & Rehabilitation eligibility category temporarily unlisted.
  // {
  //   id: "allied-rehab",
  //   label: "Allied & Rehabilitation",
  //   color: "#7a5c1a",
  //   courses: [
  //     { course: "B.Sc (Hons.) Clinical Psychology",         eligibility: "12th with PCB / PCM" },
  //     { course: "BASLP",                                     eligibility: "12th with PCB / PCM" },
  //     { course: "ISITEP (HI)",                               eligibility: "12th with PCB / PCM" },
  //     { course: "ISITEP (ID)",                               eligibility: "12th with PCB / PCM" },
  //     { course: "Prof. Diploma – Clinical Psychology (PDCP)", eligibility: "12th with PCB / PCM" },
  //   ],
  // },
];
