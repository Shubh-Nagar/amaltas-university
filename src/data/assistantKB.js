// Knowledge base + reply engine for the "Amaltas Assistant" chat widget.
// Rule-based (no LLM/API): every fact comes from the site's own data files,
// so it can't invent fees, seats or eligibility the university hasn't published.
//
// reply(state, text) is a pure function — it returns the bot messages and the
// next conversation state, which keeps the engine testable outside React.
import { CONTACT, INSTITUTIONS, ACCREDITATIONS, LEADERS, PHD_ADMISSION, EVENTS, STATS, AWARDS } from "./content.js";
import { FEE_CATEGORIES, ELIGIBILITY_CATEGORIES } from "./admissions.js";

/* ───────────────────────── text matching ───────────────────────── */

export function normalize(s) {
  return String(s)
    .toLowerCase()
    .replace(/[’'`]/g, "")
    .replace(/([a-z0-9])\.(?=[a-z0-9])/g, "$1") // b.sc → bsc, m.b.b.s → mbbs
    .replace(/[^a-z0-9ऀ-ॿ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const isAscii = (s) => /^[\x00-\x7f]*$/.test(s);

function lev(a, b) {
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let diag = prev[0];
    prev[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = prev[j];
      prev[j] = Math.min(prev[j] + 1, prev[j - 1] + 1, diag + (a[i - 1] === b[j - 1] ? 0 : 1));
      diag = tmp;
    }
  }
  return prev[b.length];
}

// Common corrections applied before matching (typos and Roman Hindi spelling
// variants). Applied to the visitor's words AND to every keyword in this file,
// so "kitni fees" and "kitne fees" both land on the same canonical form.
const REWRITES = {
  fess: "fees", fes: "fees", feez: "fees", fee: "fees", fees: "fees",
  kharcha: "fees", kharch: "fees", kharche: "fees", shulk: "fees",
  addmission: "admission", admision: "admission", admissin: "admission", admisson: "admission",
  dakhila: "admission", pravesh: "admission",
  eligiblity: "eligibility", eligibilty: "eligibility", yogyata: "eligibility",
  hostal: "hostel", hostle: "hostel", chatravas: "hostel",
  scolarship: "scholarship", scholership: "scholarship", scholarshp: "scholarship",
  chhatravritti: "scholarship", chatravritti: "scholarship",
  nursng: "nursing", nurshing: "nursing",
  sampark: "contact",
  kaha: "where", kahan: "where", kahaan: "where", kidhar: "where",

  /* ── Roman Hindi: one canonical spelling per word ── */
  kitni: "kitna", kitne: "kitna", kitnaa: "kitna", kitni_: "kitna", ketna: "kitna", kitnee: "kitna",
  kaisa: "kaise", kaisi: "kaise", kese: "kaise", kesa: "kaise", kaisay: "kaise",
  kon: "kaun", kaunsa: "kaun", kaunse: "kaun", kaunsi: "kaun", konsa: "kaun", konse: "kaun", kounsa: "kaun",
  nahin: "nahi", nhi: "nahi", nai: "nahi",
  chaiye: "chahiye", chahie: "chahiye", chahiy: "chahiye",
  milegi: "milega", milenge: "milega", milti: "milega", milta: "milega",
  bataiye: "batao", bataye: "batao", bata: "batao", btao: "batao", batana: "batao",
  sakti: "sakta", sakte: "sakta", sakoonga: "sakta", sakunga: "sakta",
  karni: "karna", karne: "karna", krna: "karna", karu: "karna", karoon: "karna",
  karunga: "karna", kare: "karna", karein: "karna", karna_: "karna",
  hain: "hai", hei: "hai", hay: "hai",
  paise: "paisa", rupaye: "paisa", rupay: "paisa", rupaya: "paisa", rupees: "paisa", rupee: "paisa",
  sal: "saal", varsh: "saal", baras: "saal",
  acha: "accha", achha: "accha", achcha: "accha", acchha: "accha",
  thik: "theek", tik: "theek", teek: "theek",
  dawa: "dawai", davai: "dawai", dava: "dawai", dawaiyan: "dawai", dawaiya: "dawai",
  ilaaj: "ilaj", elaj: "ilaj", ilaz: "ilaj",
  ladkiyan: "ladki", ladkiyon: "ladki", ladkiya: "ladki", ladkio: "ladki",
  ladke: "ladka", ladko: "ladka", ladkon: "ladka",
  padhaai: "padhai", padai: "padhai", padhna: "padhai", padhne: "padhai", padhai_: "padhai",
  nokri: "naukri", naukari: "naukri", nokari: "naukri",
  janakari: "jankari", jaankari: "jankari", jankary: "jankari",
  sasti: "sasta", saste: "sasta",
  mehngi: "mehnga", mahnga: "mehnga", menhga: "mehnga",
  door: "dur", duri: "dur",
  suvidhaye: "suvidha", suvidhayen: "suvidha", suvidhaen: "suvidha",
  surakshit: "suraksha", surakhsha: "suraksha",
  dastavej: "documents", dastavez: "documents", kagaz: "documents", kagzat: "documents", kagazat: "documents",
  aspatal: "hospital", haspatal: "hospital",
  sahayata: "madad",
  bagair: "bina", binaa: "bina",
  donon: "dono",
  ki: "ka", ke: "ka", // "BAMS ki fees" = "BAMS ke fees" = "BAMS ka fees"
  wale: "wala", wali: "wala", vala: "wala", wla: "wala",
  jyada: "zyada", jada: "zyada", jyaada: "zyada",
  hoon: "hu", hun: "hu", huu: "hu",
  muje: "mujhe", mujhy: "mujhe",
  meri: "mera", mere: "mera", mera_: "mera",
  suru: "shuru", shru: "shuru",
  baat: "talk", baate: "talk",
  seat: "seats", sit: "seats", seaten: "seats",
  manyata: "approved",

  /* ── misspellings seen in real chat logs ── */
  heloo: "hello", hellow: "hello", helloo: "hello", hlo: "hello",
  chiaye: "chahiye", chahye: "chahiye", chaye: "chahiye",
  kb: "kab", kha: "where",
  scoller: "scholarship", scolar: "scholarship", scholer: "scholarship", schollar: "scholarship", scholar: "scholarship",
  scholorship: "scholarship", scolership: "scholarship", scollership: "scholarship", scholarshiip: "scholarship",
  paramadicle: "paramedical", paramedicle: "paramedical", paramdical: "paramedical", parmedical: "paramedical",
  peramedical: "paramedical", paramadical: "paramedical", paramedic: "paramedical", paramedics: "paramedical",
  dylasis: "dialysis", dialisis: "dialysis", dialysys: "dialysis", dilaysis: "dialysis", dailysis: "dialysis", dialsis: "dialysis",
  cources: "courses", cource: "course", corse: "course", corses: "courses",
  pscology: "psychology", psycology: "psychology", psychologi: "psychology", phychology: "psychology",
  sycology: "psychology", psycholgy: "psychology", pyschology: "psychology", psychlogy: "psychology", saikology: "psychology",
  discpline: "discipline", dispipline: "discipline", disipline: "discipline", desipline: "discipline",
  discplines: "disciplines", dispiplines: "disciplines", disiplines: "disciplines", desiplines: "disciplines",
  clases: "classes", clas: "class", classs: "class",
  avilable: "available", availble: "available", avalable: "available", avaliable: "available",
  progrqmme: "programme", programe: "programme", progam: "program",
  genral: "general", genreal: "general",
  hidnie: "hindi", hindee: "hindi", hinid: "hindi", hindii: "hindi",
  mpharma: "mpharm", mpharmacy: "mpharm",
};

const rewriteToks = (toks) => toks.map((t) => REWRITES[t] || t);

// Keywords are folded the same way queries are, so they always meet in the middle.
const kwNorm = (s) => rewriteToks(normalize(s).split(" ").filter(Boolean)).join(" ");

function makeQuery(raw) {
  const rawToks = normalize(raw).split(" ").filter(Boolean);
  const toks = rewriteToks(rawToks);
  const text = toks.join(" ");
  return { raw, norm: text, padded: ` ${text} `, toks, rawToks };
}

/* ───────────────────── Roman Hindi (Hinglish) detection ───────────────────── */

// Words that only a Hindi speaker writes — one is enough to switch language.
const HI_STRONG = new Set([
  "kya", "kyu", "kyun", "kyunki", "kaise", "kaisa", "kaisi", "kese", "kesa",
  "kitna", "kitni", "kitne", "ketna", "kaun", "kaunsa", "kaunsi", "konsa", "kon",
  "kahan", "kaha", "kahaan", "kidhar", "kab", "kabhi",
  "mujhe", "muje", "mera", "meri", "mere", "hamara", "hamare", "aapka", "aapke", "tumhara",
  "chahiye", "chaiye", "chahie", "milega", "milegi", "milenge", "milta", "milti",
  "batao", "bataiye", "bataye", "btao", "bata", "batana", "jankari", "jaankari",
  "sakta", "sakti", "sakte", "karna", "karni", "karne", "karu", "karunga", "krna",
  "hai", "hain", "hoga", "hogi", "honge", "tha", "thi", "raha", "rahi", "rahe",
  "nahi", "nahin", "nhi", "haan", "kripya", "krpya", "dijiye", "dena", "lena", "lene",
  "paise", "paisa", "rupaye", "rupay", "kharcha", "kharch", "shulk",
  "yogyata", "dakhila", "pravesh", "padhai", "padhna", "padhne", "padai",
  "naukri", "nokri", "ilaj", "ilaaj", "suvidha", "madad", "sahayata", "sampark",
  "chhatravritti", "chatravritti", "manyata", "aspatal", "dastavej", "kagaz",
  "sasta", "sasti", "mehnga", "mehngi", "zyada", "jyada", "bina", "bagair",
  "dono", "donon", "wala", "wale", "wali", "accha", "acha", "achha", "theek", "thik",
  "saal", "sal", "varsh", "shuru", "suru", "dur", "door", "pata", "raste", "rasta",
  "ladki", "ladka", "ladke", "ladkiyan", "dekhbhal", "seva", "dawai", "dawa",
  "hu", "hoon", "hun", "namaste", "namaskar", "dhanyavad", "dhanyawad", "shukriya",
  "bhai", "sir", "mam", "sahi", "galat", "asli", "farzi", "sarkari", "prakritik",
  "mariz", "marizo", "marij", "khoj", "anusandhan", "bhasha", "angrezi",
]);

// Ambiguous on their own — two of them together still read as Hindi.
const HI_WEAK = new Set(["ka", "ki", "ke", "se", "mein", "par", "bhi", "aur", "ya", "ko", "sab", "kuch", "koi", "toh", "abhi", "phir", "wo", "yeh", "ye", "agar", "liye", "bas", "apne", "apna"]);

// If the visitor writes plain English, drop back to English.
const EN_CUES = new Set(["what", "how", "is", "are", "can", "could", "do", "does", "did", "the", "my", "i", "you", "tell", "about", "please", "want", "need", "and", "for", "of", "in", "there", "am", "me", "we", "should", "which", "where", "when", "who", "give", "any", "have", "has"]);

// Sticky: a bare follow-up ("MBBS fees") stays in whatever language we were in.
function detectLang(q, prev = "en") {
  if (/[ऀ-ॿ]/.test(q.raw)) return "hi";
  let strong = 0;
  let weak = 0;
  let english = 0;
  for (const t of q.rawToks) {
    if (HI_STRONG.has(t)) strong++;
    else if (HI_WEAK.has(t)) weak++;
    else if (EN_CUES.has(t)) english++;
  }
  if (strong >= 1 || weak >= 2) return "hi";
  if (english >= 1) return "en";
  return prev;
}

// t(lang, english, romanHindi) — the single switch used by every answer below.
const t = (lang, en, hi) => (lang === "hi" ? hi : en);

// 2 = exact phrase, 1 = exact word (or simple plural), 0.6 = typo, 0 = none
function matchKw(q, k, own) {
  if (!k) return 0;
  if (!isAscii(k)) return q.norm.includes(k) ? 2 : 0;
  if (q.padded.includes(` ${k} `)) return k.includes(" ") ? 2 : 1;
  for (const plural of [`${k}s`, `${k}es`]) {
    if (!own?.has(plural) && q.padded.includes(` ${plural} `)) return 1;
  }
  if (!k.includes(" ") && k.length >= 5) {
    const max = k.length >= 8 ? 2 : 1;
    for (const t of q.toks) {
      // a word that already matched one of this item's keywords isn't a typo
      if (own && (own.has(t) || own.has(t.replace(/e?s$/, "")))) continue;
      // nor is a Hindi word a misspelling of an English one ("sakta" ≠ "sasta")
      if (HI_STRONG.has(t) || HI_WEAK.has(t)) continue;
      if (t.length >= 4 && t[0] === k[0] && Math.abs(t.length - k.length) <= max && lev(t, k) <= max) return 0.6;
    }
  }
  return 0;
}

function scoreItem(q, item) {
  let score = 0;
  let exact = false;
  const hits = [];
  for (const k of item._kw) {
    let s = matchKw(q, k, item._own);
    // weak keywords ("kitna" = "how much/how many") only tip a tie
    if (s > 0 && item._weak?.has(k)) s = Math.min(s, 0.5);
    if (s > 0) {
      score += s;
      if (s >= 1) { exact = true; hits.push(k); }
    }
  }
  return { item, score, exact, hits };
}

const has = (q, list) => list.some((k) => matchKw(q, kwNorm(k)) >= 1);
const compile = (list) =>
  list.map((x) => {
    // deduped: folding ("rupees" → "paisa") can collapse two keywords into one,
    // and a keyword counted twice would out-score a better phrase match.
    const _kw = [...new Set(x.keywords.map(kwNorm))];
    return { ...x, _kw, _own: new Set(_kw), _weak: x.weak && new Set(x.weak.map(kwNorm)) };
  });

/* ───────────────────────── facts ───────────────────────── */

const inr = (n) => "₹" + n.toLocaleString("en-IN");
const TEL = CONTACT.tollFree.replace(/\D/g, "");
const WHATSAPP = `https://wa.me/91${TEL}?text=${encodeURIComponent("Hi, I'd like to know about admissions at Amaltas University.")}`;
const MAPS = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Amaltas University, Bangar, Dewas");
const HOSPITAL_BEDS = "1500+ bed";

const L = {
  call: { href: `tel:+91${TEL}`, label: `Call ${CONTACT.tollFree}` },
  whatsapp: { href: WHATSAPP, label: "WhatsApp admissions" },
  email: { href: `mailto:${CONTACT.email}`, label: "Email us" },
  fees: { to: "/admissions/fees", label: "Fee Details" },
  eligibility: { to: "/admissions/eligibility", label: "Eligibility Criteria" },
  procedure: { to: "/admissions/procedure", label: "Admission Procedure" },
  programs: { to: "/admissions", label: "Courses & Programs" },
  enquiry: { to: "/admissions", label: "Admission enquiry form" },
  phdCall: { href: `tel:${PHD_ADMISSION.phones[0].replace(/[^\d+]/g, "")}`, label: "Call the Ph.D. cell" },
  phdEmail: { href: `mailto:${PHD_ADMISSION.email}`, label: "Email the Ph.D. cell" },
  institutions: { to: "/institutions", label: "Institutions" },
  hostel: { to: "/student-life/hostel", label: "Hostel & Accommodation" },
  campusLife: { to: "/student-life/campus-life", label: "Campus Life" },
  academicFac: { to: "/facilities/academic", label: "Academic Facilities" },
  campusFac: { to: "/facilities/campus", label: "Campus Facilities" },
  accreditations: { to: "/about/accreditations", label: "Approvals & Accreditations" },
  about: { to: "/about/university", label: "About the University" },
  why: { to: "/why", label: "Why Amaltas" },
  awards: { to: "/about/awards", label: "Awards & Rankings" },
  leadership: { to: "/leadership", label: "Leadership" },
  events: { to: "/happenings/events", label: "Events" },
  news: { to: "/happenings/news", label: "News & Press" },
  gallery: { to: "/happenings/photo-gallery", label: "Photo Gallery" },
  refund: { to: "/admissions/refund-policy", label: "Refund Policy" },
  antiRagging: { to: "/anti-ragging-committee", label: "Anti-Ragging Committee" },
  alumni: { to: "/alumni", label: "Alumni" },
  achievers: { to: "/alumni/achievers", label: "Alumni Achievers" },
  iqac: { to: "/iqac", label: "IQAC" },
  certificates: { to: "/certificates", label: "Download Certificates" },
  disclosure: { to: "/about/disclosure", label: "Mandatory Disclosure" },
  selfDisclosure: { to: "/public-self-disclosure", label: "Public Self Disclosure" },
  healthcare: { to: "/healthcare", label: "Healthcare" },
  hospitalSite: { href: "https://amaltashospital.in/", label: "Amaltas Hospital website" },
  maps: { href: MAPS, label: "Open in Google Maps" },
};

const findInst = (key) => INSTITUTIONS.find((i) => i.name.toLowerCase().includes(key));
const feeCat = (id) => FEE_CATEGORIES.find((c) => c.id === id);
const eligOf = (course) => ELIGIBILITY_CATEGORIES.flatMap((c) => c.courses).find((r) => r.course === course)?.eligibility;
const feeRowsWhere = (catId, pred) => (feeCat(catId)?.courses || []).filter(pred);

const INSTITUTES = compile([
  {
    id: "medical", inst: findInst("medical sciences"), feeCat: "medical", eligCat: "medical-sciences",
    approval: "NMC (National Medical Commission)",
    extra: `Clinical training in a ${HOSPITAL_BEDS} superspeciality teaching hospital on campus.`,
    keywords: ["medical college", "medical sciences", "medicine", "allopathy", "medical", "एलोपैथी"],
  },
  {
    id: "ayurveda", inst: findInst("ayurved"), feeCat: "ayurveda", eligCat: "ayurveda",
    approval: "NCISM (National Commission for Indian System of Medicine)",
    extra: "100-bed Ayurvedic hospital (IPD & OPD) with an advanced Panchakarma therapy unit. BAMS helpline: +91 7880154605.",
    keywords: ["ayurveda", "ayurvedic", "ayurved", "आयुर्वेद"],
  },
  {
    id: "homoeopathy", inst: findInst("homoeopathy"), feeCat: "homoeopathy", eligCat: "homoeopathy",
    approval: "NCH (National Commission for Homoeopathy)",
    extra: "Attached 50-bed teaching hospital with an integrated OPD.",
    keywords: ["homoeopathy", "homeopathy", "homoeopathic", "homeopathic", "homeo", "होम्योपैथी"],
  },
  {
    id: "nursing", inst: findInst("nursing"), feeCat: "nursing", eligCat: "nursing",
    approval: "INC (Indian Nursing Council) & MPNRC",
    extra: `Simulation labs and clinical training in the ${HOSPITAL_BEDS} teaching hospital.`,
    keywords: ["nursing", "nurse", "nurses", "नर्सिंग"],
  },
  {
    id: "pharmacy", inst: findInst("pharmacy"), feeCat: "pharmacy", eligCat: "pharmacy",
    approval: "PCI (Pharmacy Council of India)",
    extra: "Formulation, pharmacology and analysis labs aligned to PCI standards.",
    keywords: ["pharmacy", "pharmacist", "pharma", "pharmaceutical", "mpharm", "m pharm", "फार्मेसी"],
  },
  {
    id: "paramedical", inst: findInst("paramedical"), feeCat: "allied", eligCat: "paramedical",
    approval: "MP Paramedical Council, Bhopal",
    extra: "Hands-on training in physiotherapy, imaging and laboratory technology.",
    keywords: ["paramedical", "allied health", "technician", "technician course", "पैरामेडिकल"],
  },
].filter((x) => x.inst));

const instById = (id) => INSTITUTES.find((i) => i.id === id);

// "Six disciplines" is how the site describes the university (and the Ph.D. scope).
const DISCIPLINES = [
  ["Medical Sciences", "Modern medicine"],
  ["Ayurveda", "Ayurveda"],
  ["Homoeopathy", "Homoeopathy"],
  ["Nursing", "Nursing"],
  ["Pharmacy", "Pharmacy"],
  ["Paramedical Sciences", "Paramedical"],
];
const disciplineList = () => DISCIPLINES.map(([d]) => d).join(", ");

const SPEC_ALIASES = {
  gynae: "obs gynae", gynaecology: "obs gynae", gynecology: "obs gynae", obstetrics: "obs gynae",
  radiology: "radio diagnosis", ortho: "orthopaedic", orthopedic: "orthopaedic", orthopaedics: "orthopaedic",
  anesthesia: "anaesthesia", pediatric: "paediatric", pediatrics: "paediatric", paediatrics: "paediatric",
  surgery: "general surgery", eye: "ophthalmology", skin: "dermatology", derma: "dermatology",
  chest: "respiratory", pulmonary: "respiratory", pulmonology: "respiratory",
};

function specRows(rows, q) {
  const padded = ` ${q.norm} ${q.toks.map((t) => SPEC_ALIASES[t] || "").join(" ")} `;
  const hit = rows.filter((r) =>
    (r.specialization || "").split(/,\s*/).some((s) => {
      const k = normalize(s);
      return k && padded.includes(` ${k} `);
    })
  );
  return hit.length ? hit : rows;
}

const MD_SPECS = [
  "dermatology", "radiology", "radio diagnosis", "general medicine", "gynae", "gynaecology", "obs gynae",
  "obstetrics", "orthopaedic", "orthopedic", "ortho", "anaesthesia", "anesthesia", "paediatric", "pediatric",
  "paediatrics", "pediatrics", "psychiatry", "respiratory", "pulmonology", "ent", "general surgery", "surgery",
  "ophthalmology", "emergency medicine", "pathology", "anatomy", "biochemistry", "physiology",
  "forensic medicine", "pharmacology", "community medicine", "microbiology",
];

const PROGRAMS = compile([
  {
    id: "mbbs", label: "MBBS", instId: "medical", elig: eligOf("MBBS"), duration: "5½ years (including a 1-year compulsory internship)", neet: true,
    rows: () => feeRowsWhere("medical", (r) => r.course === "MBBS"),
    keywords: ["mbbs", "bachelor of medicine", "doctor", "become a doctor", "doctor course", "एमबीबीएस"],
  },
  {
    id: "mdms", label: "MD / MS", instId: "medical", elig: eligOf("MD / MS"), duration: "3 years",
    rows: (q) => specRows(feeRowsWhere("medical", (r) => r.course.startsWith("MD")), q),
    keywords: ["md", "ms", "md ms", "mdms", "pg", "pg medical", "medical pg", "neet pg", "postgraduate medical", "post graduation", ...MD_SPECS],
  },
  {
    id: "dmmch", label: "DM / M.Ch", instId: "medical", elig: eligOf("DM / M.Ch"), duration: "3 years",
    rows: (q) => specRows(feeRowsWhere("medical", (r) => r.course === "DM" || r.course === "M.Ch"), q),
    keywords: ["dm", "mch", "dm mch", "super speciality", "super specialty", "superspeciality", "super specialisation", "super specialization", "neet ss", "cardiology", "nephrology", "neurosurgery", "urology"],
  },
  {
    id: "mscmed", label: "M.Sc. Medical (Anatomy / Physiology / Biochemistry / Pharmacology)", instId: "medical",
    rows: () => [],
    keywords: ["msc medical", "medical msc", "msc anatomy", "msc physiology", "msc biochemistry", "msc pharmacology", "msc medical anatomy", "msc medical physiology", "msc medical biochemistry", "msc medical pharmacology"],
  },
  {
    id: "bams", label: "BAMS", instId: "ayurveda", elig: eligOf("BAMS"), duration: "5½ years (including a 1-year internship)", neet: true,
    rows: () => feeRowsWhere("ayurveda", (r) => r.course === "BAMS"),
    keywords: ["bams", "ayurvedic doctor", "ayurveda doctor", "bachelor of ayurvedic medicine", "बीएएमएस"],
  },
  {
    id: "bhms", label: "BHMS", instId: "homoeopathy", elig: eligOf("BHMS"), duration: "5½ years (including a 1-year internship)", neet: true,
    rows: () => feeRowsWhere("homoeopathy", (r) => r.course === "BHMS"),
    keywords: ["bhms", "homeopathic doctor", "homoeopathic doctor", "homeopathy doctor", "bachelor of homeopathic medicine", "बीएचएमएस"],
  },
  {
    id: "bscn", label: "B.Sc Nursing", instId: "nursing", elig: eligOf("B.Sc Nursing"), duration: "4 years",
    rows: () => feeRowsWhere("nursing", (r) => r.course === "B.Sc Nursing"),
    keywords: ["bsc nursing", "b sc nursing", "bsc in nursing", "basic bsc nursing", "bachelor of nursing", "bscn", "बीएससी नर्सिंग"],
  },
  {
    id: "pbbsc", label: "Post Basic B.Sc Nursing", instId: "nursing", elig: eligOf("Post Basic B.Sc Nursing"), duration: "2 years",
    rows: () => feeRowsWhere("nursing", (r) => r.course === "B.Sc Post Basic Nursing"),
    keywords: ["post basic", "postbasic", "pb bsc", "pbbsc", "post basic bsc nursing", "post basic nursing"],
  },
  {
    id: "mscn", label: "M.Sc Nursing", instId: "nursing", elig: eligOf("M.Sc Nursing"), duration: "2 years",
    rows: () => feeRowsWhere("nursing", (r) => r.course === "M.Sc Nursing"),
    keywords: ["msc nursing", "m sc nursing", "msc in nursing", "master of nursing", "mscn", "pg nursing", "nursing pg"],
  },
  {
    id: "gnm", label: "GNM", instId: "nursing", elig: eligOf("GNM"), duration: "3 years",
    rows: () => feeRowsWhere("nursing", (r) => r.course === "GNM"),
    keywords: ["gnm", "general nursing", "general nursing and midwifery", "midwifery", "जीएनएम"],
  },
  {
    id: "phdn", label: "Ph.D. Nursing", instId: "nursing", elig: eligOf("PhD Nursing"), phd: true,
    duration: "minimum 3 years",
    rows: () => feeRowsWhere("nursing", (r) => r.course === "PhD Nursing"),
    note: `Ph.D. admission cell: ${PHD_ADMISSION.phones.join(" / ")} · ${PHD_ADMISSION.email}`,
    keywords: ["phd nursing", "phd in nursing", "nursing phd", "doctorate in nursing"],
  },
  {
    id: "phd", label: "Ph.D.", instId: null, phd: true,
    elig: "as per UGC Ph.D. regulations — generally a relevant master's / postgraduate degree",
    duration: "minimum 3 years",
    // Only the Ph.D. Nursing fee is published, so no fee row is claimed for the rest.
    rows: () => [],
    note: `Ph.D. is offered across the six health-science disciplines: ${disciplineList()}. Ph.D. admission cell: ${PHD_ADMISSION.phones.join(" / ")} · ${PHD_ADMISSION.email}`,
    noteHi: `Ph.D. in chhe health-science disciplines mein hoti hai: ${disciplineList()}. Ph.D. admission cell: ${PHD_ADMISSION.phones.join(" / ")} · ${PHD_ADMISSION.email}`,
    keywords: ["phd", "ph d", "doctorate", "doctoral", "research degree", "पीएचडी"],
  },
  {
    id: "bpharm", label: "B.Pharm", instId: "pharmacy", elig: eligOf("B.Pharm"), duration: "4 years",
    rows: () => feeRowsWhere("pharmacy", (r) => r.course === "B.Pharm"),
    keywords: ["bpharm", "b pharm", "bpharma", "b pharma", "bachelor of pharmacy", "बी फार्मा"],
  },
  {
    id: "dpharm", label: "D.Pharm", instId: "pharmacy", elig: eligOf("D.Pharm"), duration: "2 years",
    rows: () => feeRowsWhere("pharmacy", (r) => r.course === "D.Pharm"),
    keywords: ["dpharm", "d pharm", "dpharma", "d pharma", "diploma in pharmacy", "डी फार्मा"],
  },
  {
    id: "bpt", label: "BPT (Physiotherapy)", instId: "paramedical", elig: eligOf("BPT"),
    rows: () => feeRowsWhere("allied", (r) => r.course === "BPT"),
    keywords: ["bpt", "physiotherapy", "physiotherapist", "physio", "bachelor of physiotherapy", "फिजियोथेरेपी"],
  },
  {
    id: "bmlt", label: "BMLT", instId: "paramedical", elig: eligOf("BMLT"),
    rows: () => feeRowsWhere("allied", (r) => r.course === "BMLT"),
    keywords: ["bmlt", "mlt", "medical lab technology", "medical laboratory technology", "lab technology", "laboratory technology", "lab technician", "bachelor of medical lab technology"],
  },
  {
    id: "bxrt", label: "BXRT (X-Ray Technology)", instId: "paramedical", elig: eligOf("BXRT"),
    rows: () => feeRowsWhere("allied", (r) => r.course === "BXRT"),
    keywords: ["bxrt", "x ray", "xray", "x ray technology", "xray technology", "radiography", "imaging technology", "radiology technology"],
  },
  {
    id: "dmlt", label: "DMLT", instId: "paramedical", elig: eligOf("DMLT"),
    rows: () => feeRowsWhere("allied", (r) => r.course === "DMLT"),
    keywords: ["dmlt", "diploma in mlt", "diploma in medical lab technology", "lab technician", "diploma lab technician"],
  },
  {
    id: "dialysis", label: "Diploma in Dialysis Technology", instId: "paramedical", elig: eligOf("Diploma – Dialysis Technology"),
    rows: () => feeRowsWhere("allied", (r) => r.course === "Dialysis Technician"),
    keywords: ["dialysis", "dialysis technician", "dialysis technology"],
  },
  {
    id: "cathlab", label: "Diploma in Cath Lab Technology", instId: "paramedical", elig: eligOf("Diploma – Cath Lab Technology"),
    rows: () => feeRowsWhere("allied", (r) => r.course === "Cath Lab Technician"),
    keywords: ["cath lab", "cathlab", "cath lab technician", "cath lab technology", "catheterization"],
  },
  {
    id: "ot", label: "Certificate in OT Technician", instId: "paramedical", elig: eligOf("Certificate – OT Technician"),
    rows: () => feeRowsWhere("allied", (r) => r.course === "OT Technician"),
    keywords: ["ot technician", "ot tech", "operation theatre", "operation theater", "operation theatre technician"],
  },
  {
    id: "xraytech", label: "Certificate in X-Ray Technician", instId: "paramedical", elig: eligOf("Certificate – X-Ray Technician"),
    rows: () => feeRowsWhere("allied", (r) => r.course === "X-Ray Technician"),
    keywords: ["x ray technician", "xray technician", "x ray tech", "certificate in x ray", "x ray", "xray"],
  },
  {
    id: "usg", label: "Certificate in USG Technician", instId: "paramedical", elig: eligOf("Certificate – USG Technician"),
    rows: () => feeRowsWhere("allied", (r) => r.course === "USG Technician"),
    keywords: ["usg", "usg technician", "ultrasound", "ultrasonography", "sonography"],
  },
]);

const progById = (id) => PROGRAMS.find((p) => p.id === id);

function detectPrograms(q) {
  const scored = PROGRAMS.map((p) => scoreItem(q, p)).filter((s) => s.score > 0);
  const exact = scored.filter((s) => s.exact);
  if (!exact.length) {
    const best = scored.sort((a, b) => b.score - a.score)[0];
    return best ? [best.item] : [];
  }
  // A program is dropped when every word that matched it is just part of a
  // longer phrase that matched a stronger program ("bsc nursing" inside
  // "post basic bsc nursing", "doctor" inside "ayurvedic doctor").
  const within = (a, b) => b.length > a.length && ` ${b} `.includes(` ${a} `);
  const kept = exact.filter((s) =>
    !s.hits.every((h) => exact.some((o) => o !== s && o.hits.some((oh) => within(h, oh))))
  );
  // "PhD in radiology / physiotherapy / anatomy" is a Ph.D. question — the
  // subject word must not drag in MD Radio-Diagnosis, BPT or MD Anatomy.
  const phd = kept.find((s) => s.item.id === "phdn") || kept.find((s) => s.item.phd);
  if (phd) return [phd.item];
  return kept.sort((a, b) => b.score - a.score).slice(0, 4).map((s) => s.item);
}

// Subjects Amaltas doesn't list. Answering "not offered" beats a wrong fee table.
const NOT_OFFERED = compile([
  { id: "psychology", label: "Clinical Psychology / PDCP", unlisted: true, keywords: ["psychology", "clinical psychology", "pdcp", "professional diploma in clinical psychology", "psychologist", "counselling psychology", "baslp", "speech therapy", "audiology", "rehabilitation", "isitep"] },
  { id: "sociology", label: "Sociology", keywords: ["sociology", "social work", "msw", "bsw"] },
  { id: "cosmetology", label: "Aesthetic Cosmetology", keywords: ["cosmetology", "aesthetic", "aesthetics", "beauty", "cosmetic"] },
  { id: "management", label: "MBA / BBA / management", keywords: ["mba", "bba", "management course", "hospital management", "hospital administration", "hotel management"] },
  { id: "dental", label: "BDS / dental", keywords: ["bds", "mds", "dental", "dentist", "dentistry"] },
  { id: "engineering", label: "Engineering / computers", keywords: ["engineering", "btech", "b tech", "mtech", "bca", "mca", "computer science", "it course"] },
  { id: "other", label: "that subject", keywords: ["llb", "law", "bcom", "mcom", "b com", "commerce degree", "agriculture", "veterinary", "bvsc", "journalism", "fashion", "biotechnology", "biotech", "bed course", "b ed", "english literature"] },
]);

function detectNotOffered(q) {
  const best = NOT_OFFERED.map((s) => scoreItem(q, s)).filter((s) => s.exact).sort((a, b) => b.score - a.score)[0];
  return best ? best.item : null;
}

function notOfferedAnswer(subject, q, lang) {
  const phd = has(q, ["phd", "ph d", "doctorate"]);
  const list = bullet(DISCIPLINES.map(([d]) => d));
  if (phd) {
    return {
      text: t(lang,
        `Ph.D. at Amaltas is offered in the **six health-science disciplines**:\n${list}\n**${subject.label}** isn't in that published list. The Ph.D. admission cell can confirm whether a related research area is available: ${PHD_ADMISSION.phones.join(" / ")}.`,
        `Amaltas mein Ph.D. **chhe health-science disciplines** mein hoti hai:\n${list}\n**${subject.label}** is published list mein nahi hai. Koi milta-julta research area uplabdh hai ya nahi, yeh Ph.D. admission cell bata dega: ${PHD_ADMISSION.phones.join(" / ")}.`),
      links: [L.phdCall, L.phdEmail],
      chips: ["Ph.D.", "Courses", "Contact"],
    };
  }
  if (subject.unlisted) {
    return {
      text: t(lang,
        `**${subject.label}** programmes aren't in the currently published course list, so I can't share fees or eligibility for them. Please check with the admissions team whether they're running for the **2026–27** session.`,
        `**${subject.label}** ke programmes abhi published course list mein nahi hain, isliye main unki fees ya eligibility nahi bata sakti. **2026–27** session mein yeh chal rahe hain ya nahi, admission team se confirm kar lijiye.`),
      links: [L.call, L.whatsapp, L.programs],
      chips: ["Courses", "Courses without NEET", "Contact"],
    };
  }
  return {
    text: t(lang,
      `Amaltas is a health-sciences university, and **${subject.label}** isn't among its programmes. What we offer spans six disciplines:\n${list}\nIf you studied Science in 12th, try "Which course suits me?" to find a fit.`,
      `Amaltas ek health-sciences university hai, aur **${subject.label}** yahan ke courses mein nahi hai. Hamare courses in chhe disciplines mein hain:\n${list}\n12th mein Science thi to "Mera liye kaun sa course sahi hai?" puchh kar dekhiye.`),
    links: [L.programs, L.institutions],
    chips: ["Which course suits me?", "Courses", "Contact"],
  };
}

function detectInstitute(q) {
  const best = INSTITUTES.map((i) => scoreItem(q, i)).filter((s) => s.score > 0).sort((a, b) => b.score - a.score)[0];
  return best ? best.item : null;
}

/* ───────────────────────── answer builders ───────────────────────── */

const bullet = (lines) => lines.map((l) => `• ${l}`).join("\n");
const feeLine = (r, lang = "en", withSpec = true) =>
  `${r.course}${withSpec && r.specialization && r.course.match(/^(MD|DM|M\.Ch)/) ? ` (${r.specialization})` : ""} — **${inr(r.fee)}**/${t(lang, "year", "saal")}${r.seats ? ` · ${r.seats} ${t(lang, "seats", "seats")}` : ""}`;
const feeNote = (lang) => t(lang,
  "Fees are per year and indicative (as approved by MPPURC/AFSR). Hostel, transport and exam fees are charged separately.",
  "Yeh fees prati varsh (per year) hai aur anumanit hai (MPPURC/AFSR se approved). Hostel, transport aur exam fees alag se lagti hai.");

function feeRange(rows) {
  const fees = rows.map((r) => r.fee);
  const lo = Math.min(...fees), hi = Math.max(...fees);
  return lo === hi ? inr(lo) : `${inr(lo)} – ${inr(hi)}`;
}

const noteOf = (p, lang) => (lang === "hi" && p.noteHi) || p.note;

function programFeeLines(p, q, lang) {
  const rows = p.rows(q);
  if (p.id === "phd") {
    const n = feeRowsWhere("nursing", (r) => r.course === "PhD Nursing")[0];
    return [
      `${n.course} — **${inr(n.fee)}**/${t(lang, "year", "saal")}`,
      t(lang, "Other Ph.D. subjects — fee not published; the Ph.D. admission cell confirms it", "Baaki Ph.D. vishay — fees publish nahi hai; Ph.D. admission cell confirm karega"),
    ];
  }
  if (!rows.length) {
    return [t(lang,
      `${p.label} — fee not published online; our admissions team can share it`,
      `${p.label} — iski fees online nahi di gayi hai; admission team aapko bata degi`)];
  }
  return rows.map((r) => feeLine(r, lang));
}

function entityName(ctx) {
  if (ctx.progs.length) return ctx.progs.map((p) => p.label).join(", ");
  if (ctx.inst) return ctx.inst.inst.name;
  return "";
}

function aboutProgram(p, q, lang = "en") {
  const inst = p.instId ? instById(p.instId) : null;
  const lines = [];
  const rows = p.rows(q);
  if (rows.length === 1) {
    lines.push(t(lang,
      `Fee: **${inr(rows[0].fee)}** per year${rows[0].seats ? ` · ${rows[0].seats} seats` : ""}`,
      `Fees: **${inr(rows[0].fee)}** prati saal${rows[0].seats ? ` · ${rows[0].seats} seats` : ""}`));
  } else if (rows.length > 1) {
    lines.push(t(lang,
      `Fees: ${feeRange(rows)} per year depending on specialisation`,
      `Fees: ${feeRange(rows)} prati saal (specialisation ke hisaab se)`));
  }
  if (p.elig) lines.push(`${t(lang, "Eligibility", "Yogyata")}: ${p.elig}`);
  if (inst) lines.push(`${t(lang, "Approved by", "Manyata")}: ${inst.approval}`);
  if (p.id === "phd") {
    lines.unshift(...programFeeLines(p, q, lang).map((l) => `${t(lang, "Fee", "Fees")}: ${l}`));
    const area = detectInstitute(q);
    if (area) lines.unshift(t(lang,
      `**Yes** — your subject falls under **${area.inst.name.replace("Amaltas ", "")}**, one of the six Ph.D. disciplines. The Ph.D. cell confirms seats and supervisors for it each session.`,
      `**Haan** — aapka vishay **${area.inst.name.replace("Amaltas ", "")}** ke antargat aata hai, jo chhe Ph.D. disciplines mein se ek hai. Iski seats aur supervisor har session Ph.D. cell confirm karta hai.`));
  }
  let text = `**${p.label}**${inst ? ` · ${inst.inst.name}` : ""}\n${bullet(lines)}`;
  if (p.note) text += `\n${noteOf(p, lang)}`;
  if (rows.length > 1) text += `\n\n${bullet(rows.map((r) => feeLine(r, lang)))}`;
  return text;
}

function aboutInstitute(i, lang = "en") {
  const rows = feeCat(i.feeCat)?.courses || [];
  return `**${i.inst.name}**\n${i.inst.desc}\n${bullet([
    `${t(lang, "Programmes", "Courses")}: ${i.inst.programs.join(", ")}`,
    `${t(lang, "Approved by", "Manyata")}: ${i.approval}`,
    rows.length ? `${t(lang, "Fees", "Fees")}: ${feeRange(rows)} ${t(lang, "per year", "prati saal")}` : null,
    i.extra,
  ].filter(Boolean))}`;
}

const NO_NEET_IDS = ["bscn", "gnm", "bpharm", "dpharm", "bpt", "bmlt", "bxrt", "dmlt", "dialysis", "cathlab", "ot", "xraytech", "usg"];

function shortFee(p) {
  const rows = p.rows({ norm: "", toks: [] });
  return rows.length ? ` — ${feeRange(rows)}/yr` : "";
}

/* ───────────────────────── intents ───────────────────────── */

const DATA_INTENTS = new Set(["fees", "eligibility", "seats", "duration"]);

const INTENTS = compile([
  {
    id: "restart", social: true,
    keywords: ["start over", "restart", "reset", "new chat", "clear chat", "nayi chat", "phir se shuru"],
    run: (ctx) => ({ text: t(ctx.lang, WELCOME, WELCOME_HI), chips: STARTER_CHIPS, reset: true }),
  },
  {
    // "hindi me batao" is a request to switch language, not a question about the medium of teaching.
    id: "language", boost: 4, entity: false,
    keywords: ["hindi me batao", "hindi mein batao", "hindi me talk", "hindi mein talk", "hindi me bolo", "hindi mein bolo", "hindi me samjhao", "hindi mein samjhao", "hindi me likho", "hindi me jawab", "hindi me reply", "in hindi", "hindi please", "hindi plz", "speak hindi", "speak in hindi", "reply in hindi", "hindi me hi", "english me batao", "english mein batao", "english me bolo", "english me talk", "in english", "english please", "speak english", "speak in english", "reply in english"],
    run: (ctx) => {
      const lang = has(ctx.q, ["english"]) ? "en" : "hi";
      return {
        text: t(lang,
          "Sure — I'll reply in English from now on. What would you like to know?",
          "Zaroor! Ab main Hinglish (Roman Hindi) mein jawab dungi. Puchhiye — fees, course, eligibility, admission ya hostel, kuch bhi."),
        chips: STARTER_CHIPS,
        setLang: lang,
      };
    },
  },
  {
    id: "fee-quote", boost: 2, entity: true,
    // "but the college told me 1.60 lakh" — only when a number is in the message
    when: (q) => /\d/.test(q.norm),
    keywords: ["told", "bataya", "quoted", "bola", "bol rahe", "keh rahe", "different fees", "fees alag", "zyada bataya"],
    run: (ctx) => {
      const p = ctx.progs[0];
      const rows = p ? p.rows(ctx.q) : [];
      const pub = rows.length === 1 ? `**${inr(rows[0].fee)}/${t(ctx.lang, "year", "saal")}**` : null;
      return {
        text: t(ctx.lang,
          `${pub ? `The published tuition fee for **${p.label}** is ${pub}. ` : ""}A different figure from the college usually includes charges that are billed separately from tuition — registration, exam, enrolment, hostel or transport. Please ask the admissions office for a written, head-wise fee breakup so you know exactly what you're paying for.`,
          `${pub ? `**${p.label}** ki published tuition fees ${pub} hai. ` : ""}College ne jo alag amount bataya hai, usme aksar tuition ke alawa doosre charges jude hote hain — registration, exam, enrolment, hostel ya transport. Admission office se likhit mein head-wise fees breakup maang lijiye, taaki saaf rahe ki kis cheez ka kitna lag raha hai.`),
        links: [L.fees, L.call],
      };
    },
  },
  {
    id: "stipend", boost: 2, entity: true,
    keywords: ["stipend", "internship stipend", "internship salary", "internship pay", "paid internship", "internship me kitna", "internship mein kitna", "internship ka paisa", "internship me paisa", "internship me milega"],
    run: (ctx) => ({
      text: t(ctx.lang,
        `Internship stipend amounts aren't published on the website. For MBBS, BAMS and BHMS, the stipend during the compulsory internship is paid as per the regulator's and state government's norms — the admissions team can tell you the current amount${ctx.progs.length ? ` for **${entityName(ctx)}**` : ""}.`,
        `Internship stipend ki rakam website par publish nahi ki gayi hai. MBBS, BAMS aur BHMS mein compulsory internship ke dauran stipend regulator aur rajya sarkar ke niyamon ke hisaab se milta hai — ${ctx.progs.length ? `**${entityName(ctx)}** ke liye ` : ""}current amount admission team bata degi.`),
      links: [L.call, L.whatsapp],
    }),
  },
  {
    id: "disciplines", boost: 1, entity: false,
    keywords: ["six disciplines", "6 disciplines", "disciplines", "discipline", "six health", "6 health", "health disciplines", "all six", "six institutes", "6 institutes", "chhe discipline", "vishay"],
    run: (ctx) => ({
      text: t(ctx.lang,
        `The **six health-science disciplines** at Amaltas (each with its own institute):\n${bullet(INSTITUTES.map((i) => `**${i.inst.name.replace("Amaltas ", "")}** — ${i.inst.programs.join(", ")}`))}\nPh.D. is offered across all six.`,
        `Amaltas ke **chhe health-science disciplines** (har ek ka apna institute):\n${bullet(INSTITUTES.map((i) => `**${i.inst.name.replace("Amaltas ", "")}** — ${i.inst.programs.join(", ")}`))}\nPh.D. in chhe mein hoti hai.`),
      links: [L.institutions, L.programs],
      chips: ["Ph.D.", "Which course suits me?", "Fees"],
    }),
  },
  {
    id: "dress", boost: 1, entity: false,
    keywords: ["dress", "dress code", "uniform", "uniforms", "apron", "white coat", "college dress", "specific dress", "kapde", "dress kya"],
    run: (ctx) => ({
      text: t(ctx.lang,
        "The dress code isn't published online. Health-science programmes generally require a uniform or white coat/apron for classes, labs and hospital postings — your institute shares the exact dress code at admission and orientation.",
        "Dress code website par publish nahi kiya gaya hai. Health-science courses mein aam taur par class, lab aur hospital posting ke liye uniform ya white coat/apron pehna jata hai — exact dress code aapka institute admission aur orientation ke samay bata deta hai."),
      links: [L.call],
    }),
  },
  {
    id: "stream", boost: 3, entity: false,
    keywords: ["pcm", "pcb", "pcmb", "maths", "math", "mathematics", "biology", "arts", "commerce", "humanities", "non medical", "science stream", "maths student", "bio student", "bio wala", "maths wala", "science wala", "jiv vigyan", "ganit"],
    run: (ctx) => streamAnswer(parseStream(ctx.q), ctx.lang),
  },
  {
    id: "noneet", boost: 3, entity: false,
    keywords: ["without neet", "no neet", "neet not qualified", "not qualified neet", "didnt qualify neet", "not cleared neet", "neet not cleared", "failed neet", "low neet score", "neet nahi", "bina neet", "without entrance", "no entrance exam", "without entrance exam", "neet ke bina", "neet nahi diya", "neet nahi hua", "neet clear nahi", "neet nahi nikla", "bina neet wala", "neet ke bagair", "bina entrance"],
    run: (ctx) => ({
      text: t(ctx.lang,
        `These programmes don't list NEET as a requirement:\n${bullet(NO_NEET_IDS.map(progById).map((p) => `${p.label}${shortFee(p)}`))}\n\nB.Sc Nursing needs the Pre-Nursing Selection Test (PNST); most paramedical programmes need 12th with PCB, and B.Pharm/D.Pharm accept PCB or PCM.`,
        `In courses ke liye NEET zaroori nahi hai:\n${bullet(NO_NEET_IDS.map(progById).map((p) => `${p.label}${shortFee(p)}`))}\n\nB.Sc Nursing ke liye Pre-Nursing Selection Test (PNST) dena hota hai; zyadatar paramedical courses ke liye 12th PCB chahiye, aur B.Pharm/D.Pharm mein PCB ya PCM dono chalte hain.`),
      links: [L.eligibility, L.fees, L.call],
      remember: NO_NEET_IDS,
    }),
  },
  {
    id: "hostel", boost: 1, entity: false,
    keywords: ["hostel", "hostels", "accommodation", "stay", "room", "rooms", "mess", "living", "live on campus", "residence", "dormitory", "boarding", "warden", "laundry", "girls hostel", "boys hostel", "छात्रावास", "हॉस्टल", "rehne", "rehne ki", "kamra", "khana", "bhojan", "ladki hostel", "ladka hostel", "hostel kaise", "hostel hai", "hostel fees", "hostel ka fees", "hostel kitna", "hostel charges", "mess fees", "khane ka kharcha"],
    run: (ctx) => ({
      text: t(ctx.lang,
        `**Hostels at Amaltas**\n${bullet([
          "Separate hostels for boys and girls — the girls' hostels are lady-warden supervised",
          "Furnished single and double-occupancy rooms with study desks",
          "Multi-cuisine mess with nutritious meal plans (separate for boys and girls)",
          "24/7 guards, CCTV and biometric entry at every block",
          "Wi-Fi, power backup, laundry and reading rooms",
          `A ${HOSPITAL_BEDS} teaching hospital right on campus for emergencies`,
        ])}${has(ctx.q, ["fees", "cost", "charges", "price", "rent", "kitna"]) ? "\n\nHostel fees are charged separately from tuition and aren't listed online — the admissions team will share the current hostel charges." : ""}`,
        `**Amaltas ke hostel**\n${bullet([
          "Ladko aur ladkiyon ke liye alag-alag hostel — girls hostel mein lady warden rehti hain",
          "Furnished single aur double occupancy rooms, study table ke saath",
          "Multi-cuisine mess, poshtik khana (boys aur girls ke liye alag)",
          "24x7 guard, CCTV aur har block mein biometric entry",
          "Wi-Fi, power backup, laundry aur reading room",
          `Emergency ke liye campus par hi ${HOSPITAL_BEDS} ka teaching hospital`,
        ])}${has(ctx.q, ["fees", "cost", "charges", "price", "rent", "kitna"]) ? "\n\nHostel ki fees tuition fees se alag hoti hai aur online nahi di gayi hai — admission team aapko current hostel charges bata degi." : ""}`),
      links: [L.hostel, L.call],
    }),
  },
  {
    id: "fees", entity: true,
    weak: ["kitna", "kitni"],
    keywords: ["fees", "cost", "costs", "tuition", "price", "expensive", "afford", "affordable", "cheap", "cheapest", "charges", "fee structure", "total fees", "how much", "kitni", "kitna", "paisa", "rupees", "per year", "per annum", "budget", "फीस", "शुल्क", "fees kitna", "kitna fees", "fees batao", "fees kya", "kitna paisa", "paisa kitna", "fees ki jankari", "total kharcha", "sasta", "mehnga", "kam fees", "saal ka kitna", "fees lagti", "fees lagegi"],
    run: feesAnswer,
  },
  {
    id: "eligibility", entity: true,
    keywords: ["eligibility", "eligible", "criteria", "qualify", "qualification", "neet", "12th", "marks", "percentage", "cutoff", "cut off", "minimum marks", "required subjects", "who can apply", "entrance exam", "entrance", "requirement", "requirements", "pnst", "पात्रता", "योग्यता", "kya chahiye", "kaun apply kar sakta", "kaun le sakta", "eligible hu", "main eligible", "kitna percent", "kitna number", "kitna marks", "barvi", "baarvi", "12th ke baad", "12 ke baad", "kya yogyata"],
    run: eligibilityAnswer,
  },
  {
    id: "seats", entity: true,
    keywords: ["seats", "seat", "intake", "seat matrix", "how many students", "vacancy", "vacant", "सीट", "kitna seats", "seats kitna", "kitna sit", "seats khali", "seats bachi"],
    run: seatsAnswer,
  },
  {
    id: "duration", entity: true,
    keywords: ["duration", "how many years", "how long", "years course", "course length", "kitne saal", "kitne sal", "time period", "course period", "kitna saal", "saal ka course", "kitna samay", "kitna time", "kab tak chalega", "course kitna lamba", "complete", "completed", "completion", "kab complete", "kab khatam", "course khatam", "months", "kitne mahine", "part time"],
    run: durationAnswer,
  },
  {
    id: "documents", entity: false,
    keywords: ["documents", "document", "documents required", "papers", "marksheet", "mark sheet", "transfer certificate", "migration certificate", "certificates required", "certificates needed", "what to bring", "दस्तावेज", "kaun documents", "kya documents", "documents chahiye", "kya lana", "kya le jana", "kya kya lagega"],
    run: (ctx) => ({
      text: t(ctx.lang,
        `For document verification, bring the **originals** of:\n${bullet([
          "Mark sheets of your qualifying exams",
          "ID proof",
          "Category certificate (if applicable)",
          "Passport-size photographs",
        ])}\nFor NEET-based programmes, keep your NEET scorecard handy too. The admissions office will confirm the full checklist for your programme.`,
        `Document verification ke liye **original** documents laaiye:\n${bullet([
          "Qualifying exam ki mark sheets",
          "ID proof",
          "Category certificate (agar lagu ho)",
          "Passport size photos",
        ])}\nNEET wale courses ke liye NEET scorecard bhi saath rakhiye. Poori list admission office aapke course ke hisaab se confirm kar dega.`),
      links: [L.procedure, L.call],
    }),
  },
  {
    id: "apply", entity: true,
    keywords: ["apply", "application", "application form", "form", "admission", "admission process", "how to apply", "how do i apply", "take admission", "get admission", "join", "enrol", "enroll", "enrolment", "enrollment", "register", "registration", "procedure", "process", "last date", "deadline", "admission open", "how can i join", "प्रवेश", "एडमिशन", "दाखिला", "admission kaise", "kaise admission", "kaise le", "kaise milega", "apply kaise", "form kaise", "form kaise bharna", "admission chahiye", "admission lena", "join karna", "admission ki prakriya", "aakhri tarikh", "last date kya"],
    run: applyAnswer,
  },
  {
    id: "scholarship", entity: true, boost: 0.5,
    keywords: ["scholarship", "scholarships", "financial aid", "fee waiver", "waiver", "discount", "concession", "education loan", "loan", "instalment", "installment", "emi", "sc st", "obc", "ews", "chhatravritti", "छात्रवृत्ति", "स्कॉलरशिप", "scholarship milega", "fees kam ho", "fees mein chhut", "chhut", "loan milega", "kist", "kisht", "kisto mein"],
    // Deliberately no details: scholarship information hasn't been confirmed.
    run: (ctx) => ({
      text: t(ctx.lang,
        `For scholarships, fee concessions or payment options${ctx.progs.length || ctx.inst ? ` for **${entityName(ctx)}**` : ""}, please speak to our admissions team directly — they'll give you the current, confirmed details.`,
        `Scholarship, fees mein chhut ya payment options${ctx.progs.length || ctx.inst ? ` (**${entityName(ctx)}** ke liye)` : ""} ke baare mein hamari admission team se seedhe baat kar lijiye — wahi aapko current aur confirm jankari degi.`),
      links: [L.call, L.whatsapp],
      chips: ["Fees", "How to apply", "Contact"],
    }),
  },
  {
    id: "courses", entity: true, boost: -0.5,
    keywords: ["course", "courses", "program", "programs", "programme", "programmes", "degree", "degrees", "what can i study", "list of courses", "courses offered", "which courses", "what courses", "streams", "departments", "institutes", "institutions", "colleges", "kaun se course", "कोर्स", "पाठ्यक्रम", "kaun course", "kya kya course", "course batao", "course ki list", "kya padhai hoti", "kya padh sakta", "kaun sa course hai"],
    run: (ctx) => {
      if (ctx.progs.length) return { text: ctx.progs.map((p) => aboutProgram(p, ctx.q, ctx.lang)).join("\n\n"), links: [L.programs, L.fees] };
      if (ctx.inst) return { text: aboutInstitute(ctx.inst, ctx.lang), links: [L.institutions, L.fees] };
      return {
        text: t(ctx.lang,
          `Amaltas University has six health-science institutes:\n${bullet(INSTITUTES.map((i) => `**${i.inst.name.replace("Amaltas ", "")}** — ${i.inst.programs.join(", ")}`))}\nPh.D. programmes are also offered across all six disciplines.`,
          `Amaltas University mein chhe health-science institute hain:\n${bullet(INSTITUTES.map((i) => `**${i.inst.name.replace("Amaltas ", "")}** — ${i.inst.programs.join(", ")}`))}\nPh.D. bhi in chhe hi vishayon mein hoti hai.`),
        links: [L.programs, L.institutions],
        chips: ["Which course suits me?", "Courses without NEET", "Fees"],
      };
    },
  },
  {
    id: "accreditation", entity: true,
    keywords: ["approved", "approval", "approvals", "recognised", "recognized", "recognition", "accredited", "accreditation", "affiliated", "affiliation", "nmc", "ncism", "nch", "inc", "pci", "ugc", "naac", "nabh", "nabl", "mppurc", "valid degree", "own university", "state university", "deemed", "deemed university", "genuine", "fake", "government approved", "govt approved", "private or government", "government or private", "private university", "government college", "sarkari", "sarkari hai", "private hai", "degree valid", "degree sahi", "degree chalegi", "asli", "farzi", "manyata prapt", "maan"],
    run: (ctx) => {
      const inst = ctx.inst || (ctx.progs[0]?.instId && instById(ctx.progs[0].instId));
      const hi = ctx.lang === "hi";
      const lines = [];
      if (inst) lines.push(hi ? `**${inst.inst.name}** ko ${inst.approval} se manyata prapt hai.` : `**${inst.inst.name}** is approved by ${inst.approval}.`);
      lines.push(hi
        ? `Amaltas University ek private university hai, jo MP Niji Vishwavidyalaya Adhiniyam ke tahat bani hai (MPPURC dwara niyantrit) aur **UGC Section 2(f)** ke tahat manyata prapt hai.`
        : `Amaltas University is a private university established under the MP Niji Vishwavidyalaya Adhiniyam (regulated by MPPURC) and recognised by the **UGC under Section 2(f)**.`);
      if (!inst) lines.push(bullet(ACCREDITATIONS.map((a) => `**${a.short}** — ${a.scope}`)));
      if (has(ctx.q, ["naac"])) lines.push(hi
        ? "NAAC ke baare mein: IQAC university ko NAAC ke Binary Accreditation framework ke liye taiyaar kar raha hai, jaise hi wo lagu hoga."
        : "On NAAC: the IQAC is preparing the university to align with NAAC's Binary Accreditation framework once it is implemented.");
      return { text: lines.join("\n"), links: [L.accreditations, L.disclosure] };
    },
  },
  {
    id: "hospital", entity: true,
    keywords: ["hospital", "teaching hospital", "beds", "bed", "clinical exposure", "clinical training", "clinical", "practical training", "practical", "practicals", "internship", "hands on", "patient exposure", "simulation", "hospital hai", "practical hoti", "training milega", "bistar"],
    run: (ctx) => {
      const inst = ctx.inst || (ctx.progs[0]?.instId && instById(ctx.progs[0].instId));
      const hi = ctx.lang === "hi";
      const lines = hi ? [
        `Campus par hi ${HOSPITAL_BEDS} ka superspeciality teaching hospital — students pehle saal se hi asli wards mein training lete hain`,
        "NABH se juda hospital aur NABL accredited diagnostic labs",
        "Skill simulation labs, jahan asli patient se pehle practice hoti hai",
      ] : [
        `A ${HOSPITAL_BEDS} superspeciality teaching hospital on campus — students train on real wards from year one`,
        "NABH-linked hospital with NABL-accredited diagnostic labs",
        "Skill simulation labs to practise clinical skills before real placements",
      ];
      if (inst && inst.id !== "medical") lines.push(inst.extra);
      else if (!inst) lines.push(hi
        ? "Ayurveda ka apna 100-bed hospital hai Panchakarma unit ke saath; Homoeopathy ke saath 50-bed teaching hospital juda hua hai"
        : "Ayurveda has its own 100-bed hospital with a Panchakarma unit; Homoeopathy has an attached 50-bed teaching hospital");
      return {
        text: `**${hi ? "Clinical training" : "Clinical training"}${inst ? ` — ${inst.inst.name}` : ""}**\n${bullet(lines)}`,
        links: [L.institutions, L.academicFac],
      };
    },
  },
  {
    id: "healthcare", boost: 2, entity: false,
    keywords: ["appointment", "book appointment", "treatment", "consult", "consultation", "opd", "opd timing", "checkup", "check up", "health checkup", "i am sick", "sick", "emergency", "ambulance", "amaltas hospital", "patient admission", "ipd", "hospital contact", "ilaj", "ilaj karwana", "dikhana", "doctor se milna", "bimar", "tabiyat", "appointment chahiye"],
    run: (ctx) => ({
      text: t(ctx.lang,
        `${has(ctx.q, ["emergency", "ambulance"]) ? "**If this is a medical emergency, call 108 or go to the nearest emergency department right away.**\n\n" : ""}Amaltas Hospital offers 24x7 emergency & critical care alongside OPD and inpatient services. For appointments, departments and OPD timings, please use the hospital's website.`,
        `${has(ctx.q, ["emergency", "ambulance"]) ? "**Agar yeh medical emergency hai, to turant 108 par call kijiye ya nazdeeki emergency department jaaiye.**\n\n" : ""}Amaltas Hospital mein 24x7 emergency aur critical care ke saath OPD aur bharti (IPD) ki suvidha hai. Appointment, departments aur OPD timing ke liye hospital ki website dekhiye.`),
      links: [L.hospitalSite, L.healthcare],
    }),
  },
  {
    id: "placement", entity: true,
    keywords: ["placement", "placements", "job", "jobs", "career", "careers", "salary", "package", "recruit", "recruiters", "scope", "future scope", "after course", "naukri", "employment", "campus placement", "naukri milega", "job milega", "salary kitna", "kitna kamai", "kamai", "aage kya", "course ke baad kya"],
    run: (ctx) => ({
      text: t(ctx.lang,
        `Amaltas doesn't publish placement statistics online, so I won't quote numbers. What the university does offer${ctx.progs.length || ctx.inst ? ` ${entityName(ctx)} students` : ""}:\n${bullet([
          "Clinical training from year one in the on-campus teaching hospital",
          "Nursing placements across the Amaltas hospital network",
          "An active alumni network with mentorship and career support",
        ])}\nOur counsellors can walk you through career paths for your programme.`,
        `Amaltas placement ke aankde online publish nahi karta, isliye main koi number nahi bataungi. University jo deti hai${ctx.progs.length || ctx.inst ? ` (${entityName(ctx)} ke students ko)` : ""}:\n${bullet([
          "Campus ke teaching hospital mein pehle saal se clinical training",
          "Amaltas hospital network mein nursing placements",
          "Active alumni network — mentorship aur career support",
        ])}\nAapke course ke career options hamare counsellor vistaar se samjha denge.`),
      links: [L.achievers, L.call],
    }),
  },
  {
    id: "facilities", entity: false,
    keywords: ["facilities", "facility", "infrastructure", "library", "lab", "labs", "laboratory", "laboratories", "wifi", "wi fi", "internet", "sports", "gym", "gymnasium", "playground", "ground", "canteen", "cafeteria", "food", "auditorium", "smart class", "classroom", "classrooms", "transport", "bus", "computer lab", "e learning", "yoga", "solar", "suvidha", "kya suvidha", "pustakalaya", "khel", "maidan", "khana kaise", "canteen hai", "bus suvidha"],
    run: (ctx) => {
      const q = ctx.q;
      const hi = ctx.lang === "hi";
      const parts = [];
      if (has(q, ["library", "pustakalaya"])) parts.push(hi
        ? "**Central Library** — chhe hi vishayon ki print aur digital books, e-journals, research databases aur shaant reading halls."
        : "**Central Library** — print and digital collections across all six disciplines, e-journals, research databases and quiet reading halls.");
      if (has(q, ["lab", "labs", "laboratory", "laboratories", "computer lab", "simulation"])) parts.push(hi
        ? "**Labs** — anatomy, physiology, biochemistry, pharmacology, nursing aur allied-health labs, advanced research labs, skill-simulation stations aur computer centre."
        : "**Labs** — anatomy, physiology, biochemistry, pharmacology, nursing and allied-health labs, advanced research labs, skill-simulation stations and a computer centre.");
      if (has(q, ["sports", "gym", "gymnasium", "playground", "ground", "yoga", "khel", "maidan"])) parts.push(hi
        ? "**Khel** — cricket, football, volleyball, kabaddi aur badminton ke maidan, gymnasium aur yoga ki jagah."
        : "**Sports** — sports grounds (cricket, football, volleyball, kabaddi, badminton), a gymnasium and yoga spaces.");
      if (has(q, ["canteen", "cafeteria", "food", "khana"])) parts.push(hi
        ? "**Khana** — campus par cafeteria aur dining hall, aur hostel mein multi-cuisine mess."
        : "**Food** — cafeterias and dining halls on campus, plus a multi-cuisine hostel mess.");
      if (has(q, ["wifi", "wi fi", "internet", "e learning"])) parts.push(hi
        ? "**Internet** — poore campus mein fibre Wi-Fi aur e-learning portal (notes aur recorded lectures)."
        : "**Connectivity** — campus-wide fibre Wi-Fi and an e-learning portal with notes and recorded lectures.");
      if (has(q, ["transport", "bus"])) parts.push(hi
        ? "**Transport** — transport ka charge tuition se alag hai; route aur charges admission office se confirm kar lijiye."
        : "**Transport** — transport charges are separate from tuition; call admissions to confirm routes and charges.");
      if (has(q, ["smart class", "classroom", "classrooms", "auditorium"])) parts.push(hi
        ? "**Padhai ki jagah** — smart digital classrooms, seminar halls aur central auditorium."
        : "**Teaching spaces** — smart digital classrooms, seminar halls and a central auditorium.");
      if (!parts.length) {
        parts.push(hi
          ? `Campus ki suvidhaen:\n${bullet([
            "Smart classrooms, seminar halls aur central auditorium",
            "Central library — e-journals aur research databases ke saath",
            "Teaching, research aur skill-simulation labs",
            "Poore campus mein Wi-Fi aur e-learning portal",
            "Khel ke maidan, gym aur yoga ki jagah",
            "Cafeteria, hostel aur hara-bhara solar-powered campus",
          ])}`
          : `Campus facilities include:\n${bullet([
            "Smart classrooms, seminar halls and a central auditorium",
            "Central library with e-journals and research databases",
            "Teaching, research and skill-simulation labs",
            "Campus-wide Wi-Fi and an e-learning portal",
            "Sports grounds, gym and yoga spaces",
            "Cafeterias, hostels and a green, solar-powered campus",
          ])}`);
      }
      return { text: parts.join("\n\n"), links: [L.academicFac, L.campusFac] };
    },
  },
  {
    id: "life", entity: false,
    keywords: ["campus life", "student life", "cultural", "fest", "festival", "clubs", "extra curricular", "extracurricular", "activities", "fun", "campus kaise", "masti", "utsav", "sanskritik"],
    run: (ctx) => ({
      text: t(ctx.lang,
        "Campus life mixes sport (cricket, football, volleyball, kabaddi, badminton), yoga — including a 35,000+ participant world-record session — cultural festivals, community outreach and regular celebrations across all six institutes.",
        "Campus life mein khel (cricket, football, volleyball, kabaddi, badminton), yoga — jisme 35,000+ logo ka world-record session bhi shamil hai — cultural festivals, samaj seva aur chhe hi institutes ke programme hote rehte hain."),
      links: [L.campusLife, L.events, L.gallery],
    }),
  },
  {
    id: "safety", entity: false,
    keywords: ["ragging", "anti ragging", "antiragging", "bullying", "harassment", "safety", "safe", "security", "is campus safe", "girls safety", "रैगिंग", "suraksha", "safe hai", "ragging hoti", "ladki safe", "ladki suraksha"],
    run: (ctx) => ({
      text: t(ctx.lang,
        `**Safety & anti-ragging**\n${bullet([
          "Strict zero-tolerance anti-ragging policy with a dedicated committee and helpline",
          "24/7 security guards, CCTV coverage and biometric hostel entry",
          "Resident male and female wardens",
          "Mentor-faculty for every student and counselling support",
        ])}`,
        `**Suraksha aur anti-ragging**\n${bullet([
          "Ragging par sakht zero-tolerance policy — alag committee aur helpline",
          "24x7 security guard, CCTV aur hostel mein biometric entry",
          "Hostel mein rehne wale male aur female warden",
          "Har student ke liye mentor-faculty aur counselling support",
        ])}`),
      links: [L.antiRagging, L.hostel],
    }),
  },
  {
    id: "leadership", entity: false,
    keywords: ["vice chancellor", "vc", "kulguru", "chancellor", "pro chancellor", "registrar", "chairman", "founder", "who runs", "owner", "owns", "management", "leadership", "leaders", "kaun chalata", "malik", "malik kaun", "sanchalak", "adhyaksh"],
    run: (ctx) => {
      const q = ctx.q;
      const hi = ctx.lang === "hi";
      let slug = null;
      if (has(q, ["pro chancellor"])) slug = "pro-chancellor";
      else if (has(q, ["vice chancellor", "vc", "kulguru"])) slug = "vice-chancellor";
      else if (has(q, ["chancellor"])) slug = "chancellor";
      else if (has(q, ["founder"])) slug = "founder-chairman";
      else if (has(q, ["chairman"])) slug = "chairman";
      else if (has(q, ["registrar"])) slug = "registrar";
      const leader = slug && LEADERS.find((l) => l.slug === slug);
      if (leader) {
        return {
          text: hi
            ? `${leader.role} hain **${leader.nm}** (${leader.org}). ${leader.bio}`
            : `The ${leader.role} is **${leader.nm}** (${leader.org}). ${leader.bio}`,
          links: [{ to: `/leadership/${leader.slug}`, label: `Message from the ${leader.role.replace("Hon'ble ", "")}` }, L.leadership],
        };
      }
      return {
        text: hi
          ? `**University ka netritva**\n${bullet(LEADERS.map((l) => `${l.role.replace("Hon'ble ", "")} — ${l.nm}`))}\nAmaltas ka sanchalan Mayank Welfare Society karti hai.`
          : `**University leadership**\n${bullet(LEADERS.map((l) => `${l.role.replace("Hon'ble ", "")} — ${l.nm}`))}\nAmaltas is run by the Mayank Welfare Society.`,
        links: [L.leadership],
      };
    },
  },
  {
    id: "awards", entity: false,
    keywords: ["award", "awards", "ranking", "rankings", "rank", "world record", "achievement", "achievements", "puraskar", "samman", "uplabdhi"],
    run: (ctx) => ({
      text: `**${t(ctx.lang, "Awards & recognition", "Puraskar aur samman")}**\n${bullet(AWARDS.map((a) => `${a.title} (${a.year}) — ${a.org}`))}`,
      links: [L.awards],
    }),
  },
  {
    id: "about", entity: false,
    keywords: ["about amaltas", "about university", "about the university", "about you", "history", "established", "founded", "when was", "how old", "mayank welfare", "why amaltas", "why choose", "what is amaltas", "is amaltas good", "good college", "good university", "review", "reviews", "vision", "mission", "students", "faculty", "teachers", "amaltas kaise", "college kaise", "accha hai", "kab bana", "kab shuru hua", "amaltas ke baare", "university ke baare", "kyu amaltas", "faculty kaise", "adhyapak"],
    run: (ctx) => ({
      text: t(ctx.lang,
        `**Amaltas University, Dewas** — "Where healing grows."\n${bullet([
          "Founded by Shri Suresh Singh Bhadoria through the Mayank Welfare Society (2013)",
          "Private university under the MP Private University Act, recognised by UGC under Section 2(f)",
          `${STATS.map((s) => `${s.v.toLocaleString("en-IN")}${s.suf} ${s.l.toLowerCase()}`).join(" · ")}`,
          `Hospital-embedded learning in a ${HOSPITAL_BEDS} superspeciality teaching hospital`,
        ])}`,
        `**Amaltas University, Dewas** — "Where healing grows."\n${bullet([
          "Shri Suresh Singh Bhadoria ji ne Mayank Welfare Society ke through 2013 mein iski sthapna ki",
          "MP Private University Act ke tahat private university, UGC Section 2(f) se manyata prapt",
          `${STATS.map((s) => `${s.v.toLocaleString("en-IN")}${s.suf} ${s.l.toLowerCase()}`).join(" · ")}`,
          `${HOSPITAL_BEDS} ke superspeciality teaching hospital mein hi padhai aur training`,
        ])}`),
      links: [L.about, L.why],
    }),
  },
  {
    id: "medium", entity: false,
    keywords: ["medium", "english medium", "hindi medium", "language", "language of instruction", "teaching language", "hindi", "bhasha", "hindi mein padhai", "angrezi", "hindi me hoti"],
    run: (ctx) => ({
      text: t(ctx.lang,
        "Teaching is in **English**, with Hindi language support available.",
        "Padhai **English** mein hoti hai, aur Hindi mein support bhi milta hai. (Aap mujhse Hindi ya Hinglish mein kabhi bhi puchh sakte hain.)"),
      links: [L.disclosure],
    }),
  },
  {
    // "When do 1st-year classes start?" was one of the most-missed questions in the chat logs.
    id: "calendar", entity: true, boost: 1,
    keywords: ["academic calendar", "session", "session start", "classes start", "class start", "classes begin", "class begin", "when does college start", "when will classes", "when do classes", "semester", "annual system", "academic year", "exam pattern", "exams", "class kab", "classes kab", "college kab", "session kab", "kab shuru hoga", "kab shuru", "kab start", "kab se start", "start hogi", "start hoga", "start hongi", "shuru hogi", "shuru hongi", "exam kab", "padhai kab shuru", "joining date", "reporting date", "orientation", "first year class", "1st year class"],
    run: (ctx) => {
      const lang = ctx.lang;
      const progs = ctx.progs.filter((p) => !p.phd);
      const neet = progs.filter((p) => p.neet).map((p) => p.label);
      const other = progs.filter((p) => !p.neet).map((p) => p.label);
      const lines = [];
      if (neet.length) lines.push(t(lang,
        `**${neet.join(", ")}** — first-year classes begin after the NEET UG counselling rounds finish, as per the regulator's academic calendar; the exact date is announced once counselling closes.`,
        `**${neet.join(", ")}** — pehle saal ki classes NEET UG counselling ke round poore hone ke baad, regulator ke academic calendar ke hisaab se shuru hoti hain; exact tareekh counselling khatam hone par batayi jaati hai.`));
      if (other.length) lines.push(t(lang,
        `**${other.join(", ")}** — reporting and class-start dates are announced by the institute once admissions for the session close.`,
        `**${other.join(", ")}** — reporting aur class shuru hone ki tareekh session ke admission band hone ke baad institute batata hai.`));
      return {
        text: t(lang,
          `The academic session runs **August to June** on an annual system, and admissions for **2026–27** are open now.${lines.length ? `\n${bullet(lines)}` : ""}\nCall admissions for the confirmed reporting date for your programme.`,
          `Academic session **August se June** tak chalta hai (annual system), aur **2026–27** ke admission abhi khule hain.${lines.length ? `\n${bullet(lines)}` : ""}\nApne course ki confirm reporting date ke liye admission office par call kijiye.`),
        links: [L.procedure, L.call],
      };
    },
  },
  {
    id: "quota", entity: false,
    keywords: ["nri", "international", "foreign", "overseas", "other state", "outside mp", "out of state", "domicile", "management quota", "quota", "state quota", "all india quota", "dusre rajya", "bahar ke student", "mp ke bahar", "videsh"],
    run: (ctx) => ({
      text: t(ctx.lang,
        "Teaching is English-medium and students from other states are welcome. Quota, domicile and NRI/international seat rules depend on the programme and the applicable counselling rules, so the admissions team will confirm what applies to you.",
        "Padhai English medium mein hoti hai aur dusre rajyon ke students ka swagat hai. Quota, domicile aur NRI/international seat ke niyam course aur counselling rules par nirbhar karte hain — aap par kya lagu hoga, yeh admission team confirm kar degi."),
      links: [L.eligibility, L.call, L.whatsapp],
    }),
  },
  {
    id: "refund", entity: false,
    keywords: ["refund", "cancel admission", "cancellation", "withdraw", "withdrawal", "money back", "leave the course", "paisa wapas", "fees wapas", "admission cancel karna", "chhodna"],
    run: (ctx) => ({
      text: t(ctx.lang,
        "Refund and cancellation terms for admissions are published in full on the Refund Policy page.",
        "Fees wapasi (refund) aur admission cancel karne ke poore niyam Refund Policy page par diye gaye hain."),
      links: [L.refund],
    }),
  },
  {
    id: "events", entity: false,
    keywords: ["event", "events", "happening", "happenings", "news", "workshop", "seminar", "conference", "gallery", "photo", "photos", "latest news", "latest", "upcoming", "celebration", "khabar", "samachar", "kya ho raha", "karyakram", "aayojan"],
    run: (ctx) => ({
      text: `**${t(ctx.lang, "Recent at Amaltas", "Amaltas mein haal hi mein")}**\n${bullet(EVENTS.slice(0, 3).map((e) => `${e.date} — ${e.title}`))}`,
      links: [L.events, L.news, L.gallery],
    }),
  },
  {
    id: "alumni", entity: false,
    keywords: ["alumni", "old student", "old students", "graduate network", "passed out", "passout", "purane student", "purv chhatra"],
    run: (ctx) => ({
      text: t(ctx.lang,
        "The Amaltas alumni network stays connected through events, mentorship, Alumni Assist and giving-back initiatives.",
        "Amaltas ka alumni network events, mentorship, Alumni Assist aur giving-back programmes ke through jura rehta hai."),
      links: [L.alumni, L.achievers],
    }),
  },
  {
    id: "iqac", entity: false,
    keywords: ["iqac", "quality assurance", "internal quality", "gunvatta"],
    run: (ctx) => ({
      text: t(ctx.lang,
        "The Internal Quality Assurance Cell (IQAC), led by Dr. Abhilasha Dutta, drives quality initiatives such as outcome-based education, CBME, mentoring and stakeholder feedback across all institutes.",
        "Internal Quality Assurance Cell (IQAC), jiski aguwai Dr. Abhilasha Dutta karti hain, sabhi institutes mein outcome-based education, CBME, mentoring aur feedback jaisi gunvatta ki pahal chalati hai."),
      links: [L.iqac],
    }),
  },
  {
    id: "certificates", entity: false,
    keywords: ["ncmsap", "certificate download", "download certificate", "my certificate", "participation certificate", "conference certificate", "certificate kaise", "praman patra"],
    run: (ctx) => ({
      text: t(ctx.lang,
        "Conference and event certificates (such as NCMSAP) can be downloaded from the certificates page.",
        "Conference aur event ke certificate (jaise NCMSAP) certificates page se download kiye ja sakte hain."),
      links: [L.certificates],
    }),
  },
  {
    id: "disclosure", entity: false,
    keywords: ["mandatory disclosure", "self disclosure", "public self disclosure", "aishe", "disclosure"],
    run: (ctx) => ({
      text: t(ctx.lang, "Statutory disclosures are published on these pages.", "Sarkari niyamon ke tahat zaroori disclosures in pages par diye gaye hain."),
      links: [L.disclosure, L.selfDisclosure],
    }),
  },
  {
    id: "location", entity: false,
    keywords: ["location", "address", "where", "where is", "located", "reach", "how to reach", "directions", "direction", "map", "distance", "nearest", "railway", "railway station", "bus stand", "airport", "पता", "कहाँ", "कहां", "kitna dur", "kaise pahuche", "kaise jana", "rasta", "pata kya", "station se", "far", "how far", "km", "kilometre", "kilometer", "indore", "ujjain", "bhopal", "indore se", "ujjain se", "campus where"],
    run: (ctx) => {
      const travel = has(ctx.q, ["distance", "railway", "railway station", "bus stand", "airport", "nearest", "dur", "far", "km", "indore", "ujjain", "bhopal"]);
      return {
        text: t(ctx.lang,
          `Amaltas University is at **${CONTACT.address}**.${travel ? "\nExact travel distances aren't listed on the website; open the map for live directions from your city, or call us and we'll guide you." : ""}`,
          `Amaltas University ka pata hai: **${CONTACT.address}**.${travel ? "\nExact doori website par nahi di gayi hai; apne shehar se raasta dekhne ke liye map kholiye, ya call kijiye, hum raasta samjha denge." : ""}`),
        links: [L.maps, L.call],
      };
    },
  },
  {
    id: "contact", entity: false,
    keywords: ["contact", "phone", "call", "number", "mobile", "email", "mail", "helpline", "toll free", "whatsapp", "talk to", "talk to human", "talk to a human", "speak to a person", "agent", "counsellor", "counselor", "counselling", "counseling", "speak to", "customer care", "enquiry", "inquiry", "संपर्क", "सम्पर्क", "फोन", "नंबर", "number kya", "phone number", "talk karna", "kisi se talk", "call karna", "sampark number", "insaan se talk"],
    run: (ctx) => ({
      text: `**${t(ctx.lang, "Talk to the admissions team", "Admission team se baat kijiye")}**\n${bullet([
        `${t(ctx.lang, "General enquiry", "Aam poochhtaachh")}: **${CONTACT.tollFree}**`,
        `${t(ctx.lang, "Office", "Office")}: ${CONTACT.phone}`,
        `Email: ${CONTACT.email}`,
        `BAMS helpline: +91 7880154605`,
        `${t(ctx.lang, "Ph.D. cell", "Ph.D. cell")}: ${PHD_ADMISSION.phones.join(" / ")}`,
      ])}`,
      links: [L.call, L.whatsapp, L.email],
    }),
  },
  {
    id: "identity", social: true,
    keywords: ["who are you", "who is priya", "priya kaun", "priya who", "are you human", "human", "real person", "are you a person", "are you a real person", "robot", "chatbot", "are you a girl", "are you a bot", "are you real", "your name", "what can you do", "what do you do", "help", "menu", "options", "tum kaun", "aap kaun", "tumhara naam", "aapka naam", "kya kar sakta", "madad", "tum robot", "insaan ho"],
    run: (ctx) => ({
      text: t(ctx.lang,
        `I'm Priya, Amaltas University's virtual assistant — an automated helper, not a real person. My answers come from the university's published information. To talk to a counsellor, call **${CONTACT.tollFree}**.\n\nAsk me about:\n• Courses, fees, seats and eligibility\n• Admissions and documents\n• Hostel, facilities and safety\n• Approvals, leadership, events and contact details`,
        `Main Priya hoon, Amaltas University ki virtual assistant — ek automated helper, koi asli insaan nahi. Mere jawab university ki publish ki hui jankari se aate hain. Counsellor se baat karni ho to **${CONTACT.tollFree}** par call kijiye.\n\nMujhse puchhiye:\n• Courses, fees, seats aur eligibility\n• Admission aur documents\n• Hostel, suvidhaen aur suraksha\n• Manyata, netritva, events aur contact\n\nAap Hindi, Hinglish ya English — kisi bhi bhasha mein puchh sakte hain.`),
      chips: STARTER_CHIPS,
    }),
  },
  {
    id: "greeting", social: true,
    keywords: ["hi", "hii", "hiii", "hello", "priya", "hello priya", "hi priya", "helo", "hey", "namaste", "namaskar", "good morning", "good afternoon", "good evening", "नमस्ते", "नमस्कार", "ram ram", "salaam", "jai hind", "kaise ho", "kaisi ho"],
    run: (ctx) => ({
      text: t(ctx.lang,
        "Hello! How can I help you today? Ask about any course, fees, eligibility or admissions.",
        "Namaste! Main aapki kya madad kar sakti hoon? Kisi bhi course, fees, eligibility ya admission ke baare mein puchhiye."),
      chips: STARTER_CHIPS,
    }),
  },
  {
    id: "ack", social: true,
    keywords: ["sure", "yes", "yeah", "yep", "yup", "haan", "ha", "han", "ji", "ji haan", "hmm", "hmmm", "alright", "ok sure", "sure thing"],
    run: (ctx) => ({
      text: t(ctx.lang, "Great — what would you like to know? Pick a topic below or type your question.", "Theek hai — aap kya jaanna chahenge? Neeche se topic chuniye ya apna sawaal likhiye."),
      chips: STARTER_CHIPS,
    }),
  },
  {
    id: "thanks", social: true,
    keywords: ["thanks", "thank you", "thankyou", "thx", "ty", "dhanyavad", "dhanyawad", "shukriya", "great", "awesome", "ok", "okay", "cool", "nice", "got it", "धन्यवाद", "sukriya", "bahut accha", "theek hai", "samajh gaya", "samajh gayi"],
    run: (ctx) => ({
      text: t(ctx.lang, "You're welcome! Anything else I can help with?", "Aapka swagat hai! Aur kuch puchhna chahenge?"),
      chips: ["Fees", "Eligibility", "How to apply", "Contact"],
    }),
  },
  {
    id: "bye", social: true,
    keywords: ["bye", "goodbye", "good bye", "see you", "tata", "thats all", "nothing else", "no thanks", "alvida", "phir milte", "bas itna hi"],
    run: (ctx) => ({
      text: t(ctx.lang,
        `Goodbye! If you need us later, call ${CONTACT.tollFree} or reopen this chat anytime.`,
        `Alvida! Baad mein zarurat ho to ${CONTACT.tollFree} par call kijiye ya yeh chat dobara khol lijiye.`),
    }),
  },
]);

/* ───────────────────────── data intent answers ───────────────────────── */

function feesAnswer(ctx) {
  const { q, progs, inst, lang } = ctx;
  if (progs.length) {
    return {
      text: `**${t(lang, "Fees", "Fees")}${progs.length === 1 ? ` — ${progs[0].label}` : ""}**\n${bullet(progs.flatMap((p) => programFeeLines(p, q, lang)))}${progs.some((p) => p.note) ? `\n${noteOf(progs.find((p) => p.note), lang)}` : ""}\n\n${feeNote(lang)}`,
      links: progs.some((p) => p.phd) ? [L.phdCall, L.fees] : [L.fees, L.call],
    };
  }
  if (inst) {
    return {
      text: `**${inst.inst.name} — ${t(lang, "fees", "fees")}**\n${bullet(feeCat(inst.feeCat).courses.map((r) => feeLine(r, lang)))}\n\n${feeNote(lang)}`,
      links: [L.fees, L.call],
    };
  }
  const all = FEE_CATEGORIES.flatMap((c) => c.courses.map((r) => ({ ...r, cat: c.label })));
  if (has(q, ["cheap", "cheapest", "lowest", "low", "least", "affordable", "budget", "minimum", "sasta", "kam", "kam fees", "sabse kam"])) {
    const list = [...all].sort((a, b) => a.fee - b.fee).filter((r) => !/^MD$/.test(r.course)).slice(0, 5);
    return {
      text: `**${t(lang, "Lowest-fee programmes", "Sabse kam fees wale courses")}**\n${bullet(list.map((r) => `${r.course} (${r.cat}) — **${inr(r.fee)}**/${t(lang, "year", "saal")}`))}\n\n${feeNote(lang)}`,
      links: [L.fees],
    };
  }
  if (has(q, ["highest", "most expensive", "costliest", "maximum", "expensive", "mehnga", "sabse zyada"])) {
    const list = [...all].sort((a, b) => b.fee - a.fee).slice(0, 3);
    return { text: `**${t(lang, "Highest-fee programmes", "Sabse zyada fees wale courses")}**\n${bullet(list.map((r) => feeLine(r, lang)))}`, links: [L.fees] };
  }
  const lines = FEE_CATEGORIES.map((c) =>
    c.courses.length === 1 ? `${c.label}: ${c.courses[0].course} **${inr(c.courses[0].fee)}**` : `${c.label}: **${feeRange(c.courses)}**`
  );
  const mbbs = inr(feeRowsWhere("medical", (r) => r.course === "MBBS")[0].fee);
  return {
    text: t(lang,
      `**Annual fees at a glance**\n${bullet(lines)}\nMBBS is ${mbbs}/year.\n\nAsk me about a specific course (e.g. "B.Pharm fees") for the exact figure. ${feeNote("en")}`,
      `**Saal ki fees — ek nazar mein**\n${bullet(lines)}\nMBBS ki fees ${mbbs} prati saal hai.\n\nKisi ek course ka theek number jaanna ho to naam ke saath puchhiye (jaise "B.Pharm ki fees kitni hai"). ${feeNote("hi")}`),
    links: [L.fees, L.call],
    chips: ["MBBS fees", "BAMS fees", "Nursing fees", "Cheapest courses"],
  };
}

const cutoffNote = (lang) => t(lang,
  "Amaltas doesn't publish a fixed cut-off or minimum percentage online. For NEET-based programmes, merit is based on NEET scores; our counsellors can share recent cut-off trends and SC/ST/OBC relaxation details.",
  "Amaltas koi fixed cut-off ya minimum percentage online publish nahi karta. NEET wale courses mein merit NEET score se banti hai; pichhle saalon ka cut-off trend aur SC/ST/OBC chhut ki jankari hamare counsellor de denge.");

function eligibilityAnswer(ctx) {
  const { q, progs, inst } = ctx;
  const lang = ctx.lang;
  const cutoff = has(q, ["cutoff", "cut off", "marks", "percentage", "minimum marks", "score", "rank", "kitna percent", "kitna number"]);
  let text;
  if (progs.length) {
    text = `**${t(lang, "Eligibility", "Yogyata (Eligibility)")}**\n${bullet(progs.map((p) => `${p.label} — ${p.elig || t(lang, "please confirm with the admissions team", "admission team se confirm kar lijiye")}`))}`;
  } else if (inst) {
    const cat = ELIGIBILITY_CATEGORIES.find((c) => c.id === inst.eligCat);
    text = `**${inst.inst.name} — ${t(lang, "eligibility", "yogyata")}**\n${bullet(cat.courses.map((r) => `${r.course} — ${r.eligibility}`))}`;
  } else if (cutoff) {
    return { text: cutoffNote(lang), links: [L.eligibility, L.call] };
  } else {
    text = t(lang,
      `**Eligibility at a glance**\n${bullet([
        "MBBS, BAMS, BHMS — 12th with PCB + **NEET UG**",
        "MD/MS — MBBS + **NEET PG**; DM/M.Ch — MD/MS + **NEET SS**",
        "B.Sc Nursing — 12th with PCB + **PNST**",
        "B.Pharm, D.Pharm — 12th with **PCB or PCM**",
        "Paramedical (BPT, BMLT, BXRT, DMLT, diplomas) — 12th with **PCB**",
        "GNM, Post Basic & M.Sc Nursing, Ph.D. — as per Nursing Council/UGC norms",
      ])}`,
      `**Yogyata — ek nazar mein**\n${bullet([
        "MBBS, BAMS, BHMS — 12th PCB ke saath + **NEET UG**",
        "MD/MS — MBBS + **NEET PG**; DM/M.Ch — MD/MS + **NEET SS**",
        "B.Sc Nursing — 12th PCB + **PNST**",
        "B.Pharm, D.Pharm — 12th mein **PCB ya PCM**",
        "Paramedical (BPT, BMLT, BXRT, DMLT, diplomas) — 12th **PCB** ke saath",
        "GNM, Post Basic aur M.Sc Nursing, Ph.D. — Nursing Council/UGC ke niyam ke anusar",
      ])}`);
    return { text, links: [L.eligibility], chips: ["I have PCM", "Courses without NEET", "MBBS eligibility"] };
  }
  if (cutoff) text += `\n\n${cutoffNote(lang)}`;
  return { text, links: [L.eligibility, L.call] };
}

function seatsAnswer(ctx) {
  const { q, progs, inst, lang } = ctx;
  const line = (r) => `${r.course}${r.specialization && r.course.startsWith("MD") ? ` (${r.specialization})` : ""} — ${r.seats ? `**${r.seats} seats**` : t(lang, "intake not published", "seats publish nahi ki gayi")}`;
  let rows;
  if (progs.length) rows = progs.flatMap((p) => p.rows(q));
  else if (inst) rows = feeCat(inst.feeCat).courses;
  else rows = FEE_CATEGORIES.flatMap((c) => c.courses).filter((r) => r.seats);
  if (!rows.length) {
    return {
      text: t(lang,
        `Seat intake for ${entityName(ctx)} isn't published online — the admissions team can confirm it.`,
        `${entityName(ctx)} ki seats online publish nahi ki gayi hain — admission team confirm kar degi.`),
      links: [L.call],
    };
  }
  return {
    text: t(lang,
      `**Seat intake**\n${bullet(rows.map(line))}\nIntake is as per regulatory approvals.`,
      `**Seats (intake)**\n${bullet(rows.map(line))}\nSeats regulatory approval ke anusar hoti hain.`),
    links: [L.fees, L.call],
  };
}

function durationAnswer(ctx) {
  const lang = ctx.lang;
  const progs = ctx.progs.length ? ctx.progs : ctx.inst ? PROGRAMS.filter((p) => p.instId === ctx.inst.id) : [];
  if (!progs.length) {
    const known = PROGRAMS.filter((p) => p.duration);
    return {
      text: t(lang,
        `**Standard course durations** (as set by the national regulators)\n${bullet(known.map((p) => `${p.label} — ${p.duration}`))}\nFor paramedical and certificate courses, please confirm the duration with admissions.`,
        `**Course kitne saal ka hai** (national regulators ke niyam ke anusar)\n${bullet(known.map((p) => `${p.label} — ${p.duration}`))}\nParamedical aur certificate courses ki avadhi admission office se confirm kar lijiye.`),
      links: [L.programs, L.call],
    };
  }
  return {
    text: t(lang,
      `**Course duration**\n${bullet(progs.map((p) => `${p.label} — ${p.duration ? `${p.duration} (standard regulator norm)` : "please confirm with the admissions team"}`))}`,
      `**Course kitne saal ka hai**\n${bullet(progs.map((p) => `${p.label} — ${p.duration ? `${p.duration} (regulator ka standard niyam)` : "admission team se confirm kar lijiye"}`))}`),
    links: [L.programs, L.call],
  };
}

function applyAnswer(ctx) {
  const { q, progs, inst, lang } = ctx;
  const neet = progs.some((p) => p.neet);
  let head = "";
  if (progs.length || inst) {
    const elig = progs.filter((p) => p.elig).map((p) => `${p.label}: ${p.elig}`);
    const notes = progs.filter((p) => p.note).map((p) => `${noteOf(p, lang)}\n`).join("");
    head = `**${t(lang, `Admission to ${entityName(ctx)}`, `${entityName(ctx)} mein admission`)}**\n${elig.length ? `${bullet(elig)}\n` : ""}${notes}${neet ? t(lang, "Seats are allotted on NEET merit.\n", "Seat NEET merit ke aadhar par milti hai.\n") : ""}\n`;
  }
  const dates = has(q, ["last date", "deadline", "aakhri tarikh"])
    ? t(lang,
      "\n\nExact deadlines aren't published online — admissions for 2026–27 are open now, so call to confirm the last date for your programme.",
      "\n\nExact last date online nahi di gayi hai — 2026–27 ke admission abhi khule hain, isliye apne course ki aakhri tarikh call karke confirm kar lijiye.")
    : "";
  // Answer the actual question first: "is admission open?" / "where is the form?"
  const askedOpen = has(q, ["open", "khula", "khule", "chalu", "abhi admission", "start ho gaye", "available"]);
  if (askedOpen) {
    head = t(lang, "**Yes — admissions for 2026–27 are open.**\n\n", "**Haan — 2026–27 ke admission abhi khule hain.**\n\n") + head;
  }
  if (has(q, ["form", "online form", "registration form", "application form", "website", "site", "online"])) {
    head = t(lang,
      "To start online, fill in the **admission enquiry form** on the Courses & Programs page — a counsellor contacts you within one working day with the registration form and next steps. You can also call the admissions cell.\n\n",
      "Online shuru karne ke liye Courses & Programs page par **admission enquiry form** bhariye — ek counsellor ek working day mein registration form aur aage ke steps ke saath aapse sampark karega. Aap admission cell ko call bhi kar sakte hain.\n\n") + head;
    return {
      text: head.trim(),
      links: [L.enquiry, L.call, L.whatsapp],
      chips: ["Documents required", "Fees", "Eligibility"],
    };
  }
  return {
    text: t(lang,
      `${head}**How admission works**\n1. Check the programme, eligibility and fees\n2. Fill in the online registration form\n3. Pay the registration fee at the Admissions Office (DD, cash or bank transfer)\n4. Take the entrance/qualifying test that applies to your programme\n5. Merit list is published (NEET / academic scores)\n6. Document verification with originals\n7. Seat allotment${askedOpen ? "" : "\n\nAdmissions for **2026–27** are open."}${dates}`,
      `${head}**Admission kaise hota hai**\n1. Course, eligibility aur fees dekh lijiye\n2. Online registration form bhariye\n3. Admission Office mein registration fees jama kijiye (DD, cash ya bank transfer)\n4. Apne course ka entrance/qualifying test dijiye\n5. Merit list nikalti hai (NEET / academic score se)\n6. Original documents ka verification hota hai\n7. Seat allotment${askedOpen ? "" : "\n\n**2026–27** ke admission abhi khule hain."}${dates}`),
    links: [L.enquiry, L.procedure, L.eligibility, L.call],
    chips: ["Documents required", "Fees", "Contact"],
  };
}

/* ───────────────────────── course-finder quiz ───────────────────────── */

function parseStream(q) {
  const pcb = has(q, ["pcb", "biology", "bio", "zoology", "botany", "medical stream", "jiv vigyan"]);
  const pcm = has(q, ["pcm", "maths", "math", "mathematics", "non medical", "ganit"]);
  if (has(q, ["both", "pcmb", "pcbm", "dono"]) || (pcb && pcm)) return "both";
  if (pcb) return "pcb";
  if (pcm) return "pcm";
  if (has(q, ["arts", "commerce", "humanities", "arts commerce"])) return "other";
  return null;
}

function streamAnswer(stream, lang = "en") {
  if (stream === "pcm") {
    return {
      text: t(lang,
        `With **PCM**, you can apply for:\n${bullet(["bpharm", "dpharm"].map(progById).map((p) => `**${p.label}**${shortFee(p)}`))}\nBoth accept 12th with PCB or PCM. MBBS, BAMS, BHMS, Nursing and the paramedical programmes require Biology (PCB).`,
        `**PCM** ke saath aap in courses ke liye apply kar sakte hain:\n${bullet(["bpharm", "dpharm"].map(progById).map((p) => `**${p.label}**${shortFee(p)}`))}\nDono mein 12th PCB ya PCM chalta hai. MBBS, BAMS, BHMS, Nursing aur paramedical courses ke liye Biology (PCB) zaroori hai.`),
      links: [L.eligibility, L.fees],
      chips: ["B.Pharm vs D.Pharm", "How to apply", "Hostel"],
      remember: ["bpharm", "dpharm"],
    };
  }
  if (stream === "other") {
    return {
      text: t(lang,
        "All Amaltas programmes are health-sciences courses that need Science in 12th (PCB, or PCM for pharmacy), so Arts/Commerce students generally won't meet the published eligibility. Our counsellors can check whether any option fits your profile.",
        "Amaltas ke sabhi course health-science ke hain, jinke liye 12th mein Science chahiye (PCB, ya pharmacy ke liye PCM). Isliye Arts/Commerce ke students aam taur par published eligibility poori nahi karte. Phir bhi hamare counsellor aapki profile dekh kar bata sakte hain ki koi option banta hai ya nahi."),
      links: [L.eligibility, L.call],
      chips: STARTER_CHIPS,
    };
  }
  if (stream === "pcb" || stream === "both") {
    return {
      text: t(lang,
        `With **${stream === "both" ? "PCB and PCM" : "PCB"}**, you can apply across our undergraduate programmes:\n${bullet([
          "NEET UG: **MBBS, BAMS, BHMS**",
          "PNST: **B.Sc Nursing**",
          "12th PCB/PCM: **B.Pharm, D.Pharm**",
          "12th PCB: **BPT, BMLT, BXRT, DMLT** and paramedical diplomas",
          "GNM — as per Nursing Council norms",
        ])}`,
        `**${stream === "both" ? "PCB aur PCM" : "PCB"}** ke saath aap hamare lagbhag sabhi UG courses ke liye apply kar sakte hain:\n${bullet([
          "NEET UG: **MBBS, BAMS, BHMS**",
          "PNST: **B.Sc Nursing**",
          "12th PCB/PCM: **B.Pharm, D.Pharm**",
          "12th PCB: **BPT, BMLT, BXRT, DMLT** aur paramedical diplomas",
          "GNM — Nursing Council ke niyam ke anusar",
        ])}`),
      links: [L.eligibility, L.fees],
      chips: ["Which course suits me?", "Courses without NEET", "Fees"],
    };
  }
  return {
    text: t(lang,
      "Tell me which subjects you studied in 12th — PCB, PCM, both, or Arts/Commerce.",
      "Bataiye, 12th mein aapke subjects kya the — PCB, PCM, dono, ya Arts/Commerce?"),
    chips: QUIZ_STREAM_CHIPS,
  };
}

const QUIZ_STREAM_CHIPS = ["Biology (PCB)", "Maths (PCM)", "Both PCB & PCM", "Arts / Commerce"];

const INTERESTS = compile([
  { id: "patients", label: "Treating patients directly", hi: "Marizo ka ilaj karna", progs: ["mbbs", "bhms", "bams"], keywords: ["treating patients", "treat patients", "patients", "patient", "doctor", "treat", "diagnose", "mariz", "marizo", "marij", "ilaj", "ilaj karna"] },
  { id: "ayurveda", label: "Ayurveda / natural healing", hi: "Ayurveda / prakritik chikitsa", progs: ["bams"], keywords: ["ayurveda", "ayurvedic", "natural", "natural healing", "herbal", "traditional", "prakritik", "chikitsa", "jadi buti", "desi ilaj"] },
  { id: "nursing", label: "Nursing & patient care", hi: "Nursing aur mariz ki dekhbhal", progs: ["bscn", "gnm"], keywords: ["nursing", "nurse", "patient care", "caring", "care", "dekhbhal", "seva", "mariz ki dekhbhal"] },
  { id: "pharmacy", label: "Pharmacy & medicines", hi: "Pharmacy aur dawaiyan", progs: ["bpharm", "dpharm"], keywords: ["pharmacy", "medicines", "medicine", "drugs", "pharma", "chemist", "dawai", "medical store"] },
  { id: "allied", label: "Allied health (physio, imaging, lab)", hi: "Allied health (physio, imaging, lab)", progs: ["bpt", "bmlt", "bxrt"], keywords: ["allied", "allied health", "physio", "physiotherapy", "imaging", "lab", "x ray", "radiology", "technician", "machines", "machine"] },
  { id: "research", label: "Research & lab sciences", hi: "Research aur lab science", progs: ["bmlt", "mscmed", "phd"], keywords: ["research", "lab sciences", "science", "scientist", "phd", "khoj", "anusandhan", "vigyan"] },
]);

const interestChips = (lang) => INTERESTS.map((i) => t(lang, i.label, i.hi));

function recommend(interest, stream, lang = "en") {
  let ids = interest.progs;
  if (stream === "pcm") ids = ids.filter((id) => ["bpharm", "dpharm"].includes(id));
  const progs = ids.map(progById);
  const needsNeet = progs.some((p) => p.neet);
  const lines = progs.map((p) => {
    const inst = p.instId ? instById(p.instId) : null;
    return `**${p.label}**${inst ? ` (${inst.inst.name.replace("Amaltas ", "")})` : ""}${shortFee(p)}${p.elig ? `\n   ${t(lang, "Eligibility", "Yogyata")}: ${p.elig}` : ""}`;
  });
  return {
    text: t(lang,
      `Based on your interest in **${interest.label.toLowerCase()}**, look at:\n${bullet(lines)}${needsNeet ? "\n\nMBBS, BAMS and BHMS need a NEET UG score. No NEET? B.Sc Nursing, B.Pharm, D.Pharm and the paramedical programmes don't list it as a requirement." : ""}`,
      `Aapki ruchi (**${interest.hi.toLowerCase()}**) ke hisaab se yeh courses dekhiye:\n${bullet(lines)}${needsNeet ? "\n\nMBBS, BAMS aur BHMS ke liye NEET UG score chahiye. NEET nahi diya? B.Sc Nursing, B.Pharm, D.Pharm aur paramedical courses ke liye NEET zaroori nahi hai." : ""}`),
    links: [L.institutions, L.eligibility, L.fees],
    chips: ["How to apply", "Hostel", "Courses without NEET"],
    remember: ids,
    topic: "course-finder",
    courses: progs.map((p) => p.label).join(", "),
  };
}

/* ───────────────────────── engine ───────────────────────── */

export const STARTER_CHIPS = ["Which course suits me?", "Fees", "Eligibility", "How to apply", "Hostel", "Contact"];
export const WELCOME = "Hi! I'm Priya, Amaltas University's virtual assistant. Ask me about courses, fees, eligibility, admissions or hostel — or tap an option below.\nHindi ya Hinglish mein bhi puchh sakte hain — jaise \"BAMS ki fees kitni hai?\"";
export const WELCOME_HI = "Namaste! Main Priya hoon, Amaltas University ki virtual assistant. Courses, fees, eligibility, admission ya hostel — kuch bhi puchhiye, ya neeche diye gaye option par tap kijiye.";

export const createState = () => ({ quiz: null, stream: null, lastProgIds: [], lastInstId: null, lastIntentId: null, misses: 0, lang: "en", langPref: null });

const QUIZ_TRIGGER = ["which course", "suits me", "suit me", "suggest", "recommend", "confused", "help me choose", "not sure what to study", "best course", "career guidance", "guide me", "what should i study", "which course is best", "konsa course", "kaunsa course", "course finder", "kaun sa course sahi", "mera liye kaun", "kya karna chahiye", "samajh nahi aa raha", "kaun sa course karna", "sabse accha course", "salah", "sujhav"];
const FOLLOW_UP_CUES = ["and", "what about", "how about", "aur", "for", "also", "same for", "aur iska", "iska kya"];
const GENERAL_CUES = ["all", "every", "overall", "list", "total", "cheapest", "lowest", "highest", "courses", "at a glance", "sabhi", "sab", "poori list", "sasta", "mehnga", "sabse kam", "sabse zyada", "kam fees"];
const ABOUT_CUES = ["tell me", "about the", "about this", "details", "detail", "info", "information", "explain", "overview", "jankari", "batao", "ke baare mein", "vistaar", "what is", "what are", "kya hai", "kya hota", "means", "meaning", "matlab", "available", "is there"];

// Chips are sent back as questions, so each Hindi chip is worded to match the
// same intent as its English twin.
const CHIPS_HI = {
  "Which course suits me?": "Mera liye kaun sa course sahi hai?",
  "Fees": "Fees kitni hai",
  "Eligibility": "Eligibility kya chahiye",
  "How to apply": "Admission kaise le",
  "Hostel": "Hostel kaisa hai",
  "Contact": "Contact number",
  "Seats": "Kitni seats hain",
  "Courses without NEET": "Bina NEET wale course",
  "Cheapest courses": "Sabse kam fees wala course",
  "MBBS fees": "MBBS ki fees kitni hai",
  "BAMS fees": "BAMS ki fees kitni hai",
  "Nursing fees": "Nursing ki fees kitni hai",
  "MBBS eligibility": "MBBS ki eligibility kya hai",
  "Documents required": "Kaun se documents chahiye",
  "I have PCM": "Mere paas PCM hai",
  "B.Pharm vs D.Pharm": "B.Pharm aur D.Pharm mein kya antar hai",
  "Biology (PCB)": "Biology (PCB)",
  "Maths (PCM)": "Maths (PCM)",
  "Both PCB & PCM": "Dono PCB aur PCM",
  "Arts / Commerce": "Arts / Commerce",
};

const localizeChips = (chips, lang) => (lang === "hi" ? chips.map((c) => CHIPS_HI[c] || c) : chips);

function analyse(q) {
  const progs = detectPrograms(q);
  const inst = progs.length ? null : detectInstitute(q);
  const scored = INTENTS
    .filter((it) => !it.when || it.when(q))
    .map((it, order) => ({ ...scoreItem(q, it), order }))
    .filter((s) => s.score > 0);
  const real = scored.filter((s) => !s.item.social);
  const rank = (a, b) => (b.score + (b.item.boost || 0)) - (a.score + (a.item.boost || 0)) || a.order - b.order;
  // Exact matches outrank typo matches, whatever their raw score.
  const exact = real.filter((s) => s.exact).sort(rank);
  const intents = exact.length ? exact : real.sort(rank).slice(0, 1);
  const social = scored.filter((s) => s.item.social && s.exact).sort(rank);
  return { progs, inst, intents: intents.map((s) => s.item), social: social.map((s) => s.item) };
}

function finish(state, out, extra = {}) {
  const next = { ...state, ...extra };
  if (out.setLang) next.lang = next.langPref = out.setLang;
  if (out.remember) {
    next.lastProgIds = out.remember;
    next.lastInstId = null;
  }
  const lang = next.lang || "en";
  const chips = localizeChips(out.chips || STARTER_CHIPS, lang);
  const topic = out.topic || (next.quiz || state.quiz ? "course-finder" : "other");
  return {
    state: out.reset ? { ...createState(), lang, langPref: next.langPref } : next,
    replies: [{ text: out.text, links: out.links || [], chips }],
    reset: !!out.reset,
    meta: { topic, answered: topic !== "unanswered", courses: out.courses || "", lang },
  };
}

function fallback(state) {
  const misses = state.misses + 1;
  const lang = state.lang || "en";
  return finish(state, {
    text: misses > 1
      ? t(lang,
        `I'm still not sure I understood. The admissions team can answer anything directly — call **${CONTACT.tollFree}** or message us on WhatsApp.`,
        `Maaf kijiye, ab bhi main theek se samajh nahi payi. Admission team aapke har sawaal ka jawab de degi — **${CONTACT.tollFree}** par call kijiye ya WhatsApp par message bhejiye.`)
      : t(lang,
        "Sorry, I didn't quite get that. I can help with courses, fees, seats, eligibility, admissions, hostel, facilities and contact details. Try something like \"BAMS fees\" or \"Am I eligible with PCM?\"",
        "Maaf kijiye, main samajh nahi payi. Main courses, fees, seats, eligibility, admission, hostel, suvidhaon aur contact ke baare mein bata sakti hoon. Aise puchh kar dekhiye — \"BAMS ki fees kitni hai\" ya \"PCM se kaun sa course kar sakta hoon\"."),
    links: [L.call, L.whatsapp],
    chips: STARTER_CHIPS,
    topic: "unanswered",
  }, { misses });
}

export function reply(state, rawInput) {
  const raw = String(rawInput).slice(0, 300);
  const q = makeQuery(raw);
  // Roman Hindi in, Roman Hindi out — and it sticks for short follow-ups.
  // ...unless they explicitly asked for a language ("hindi me batao"), which sticks.
  const lang = state.langPref && !/[ऀ-ॿ]/.test(q.raw) ? state.langPref : detectLang(q, state.lang || "en");
  state = { ...state, lang };
  if (!q.norm) return fallback(state);

  const a = analyse(q);
  const understood = a.progs.length || a.inst || a.intents.length || a.social.length;

  // Course-finder quiz: accept the answer, or step out if they asked something else.
  if (state.quiz === "stream") {
    const stream = parseStream(q);
    if (stream === "pcb" || stream === "both") {
      return finish(state, {
        text: t(lang, "Great. What interests you most?", "Badhiya. Aapki sabse zyada ruchi kis mein hai?"),
        chips: interestChips(lang),
      }, { quiz: "interest", stream, misses: 0 });
    }
    if (stream) return finish(state, streamAnswer(stream, lang), { quiz: null, stream, misses: 0 });
    if (!understood) {
      return finish(state, {
        text: t(lang, "Please pick the subjects you studied in 12th:", "Kripya chuniye ki 12th mein aapke subjects kya the:"),
        chips: QUIZ_STREAM_CHIPS,
      });
    }
    state = { ...state, quiz: null };
  } else if (state.quiz === "interest") {
    const best = INTERESTS.map((i) => scoreItem(q, i)).filter((s) => s.score > 0).sort((x, y) => y.score - x.score)[0];
    if (best) return finish(state, recommend(best.item, state.stream, lang), { quiz: null, misses: 0 });
    if (!understood) {
      return finish(state, {
        text: t(lang, "Which of these sounds most like you?", "In mein se aapko kya sabse zyada pasand hai?"),
        chips: interestChips(lang),
      });
    }
    state = { ...state, quiz: null };
  }

  const askedStream = parseStream(q);
  if (!a.progs.length && has(q, QUIZ_TRIGGER) && (askedStream === "pcb" || askedStream === "both")) {
    return finish(state, {
      text: t(lang,
        "Good — with Biology you have the widest choice. What interests you most?",
        "Achha — Biology ke saath aapke paas sabse zyada options hain. Aapki ruchi kis mein hai?"),
      chips: interestChips(lang),
    }, { quiz: "interest", stream: askedStream, misses: 0 });
  }
  const directAnswer = askedStream || a.intents.some((i) => i.id === "noneet");
  if (!a.progs.length && !directAnswer && has(q, QUIZ_TRIGGER)) {
    return finish(state, {
      text: t(lang,
        "Happy to help you choose. Which subjects did you study (or are you studying) in Class 12?",
        "Zaroor, main aapko course chunne mein madad karungi. Class 12 mein aapke subjects kya the (ya hain)?"),
      chips: QUIZ_STREAM_CHIPS,
    }, { quiz: "stream", misses: 0 });
  }

  let { progs, inst, intents } = a;

  // "PDCP fees", "PhD sociology", "MBA" — say plainly it isn't offered rather
  // than answering with an unrelated fee table.
  const missing = (!progs.length || progs[0].phd) && !intents.some((i) => i.id === "language") && detectNotOffered(q);
  if (missing) {
    return finish(state, { ...notOfferedAnswer(missing, q, lang), topic: "not-offered", courses: missing.label }, { misses: 0, lastProgIds: [], lastInstId: null });
  }

  const short = q.toks.length <= 5;

  // Follow-ups: "fees" after talking about BAMS, or "and nursing?" after a fees question.
  const quoteFollowUp = intents[0]?.id === "fee-quote"; // always about the course just discussed
  if (!progs.length && !inst && intents.some((i) => i.entity) && (short || quoteFollowUp) && !has(q, GENERAL_CUES)) {
    progs = state.lastProgIds.map(progById).filter(Boolean);
    inst = progs.length ? null : state.lastInstId ? instById(state.lastInstId) : null;
  }
  if ((progs.length || inst) && !intents.length && state.lastIntentId && !has(q, ABOUT_CUES)) {
    const prev = INTENTS.find((i) => i.id === state.lastIntentId);
    if (prev?.entity && (q.toks.length <= 3 || has(q, FOLLOW_UP_CUES))) intents = [prev];
  }

  const ctx = { q, progs, inst, state, lang };
  const courses = progs.length ? progs.map((p) => p.label).join(", ") : inst ? inst.inst.name : "";
  const mem = progs.length
    ? { lastProgIds: progs.map((p) => p.id), lastInstId: null }
    : inst ? { lastProgIds: [], lastInstId: inst.id } : {};

  if (intents.length) {
    const [primary, ...rest] = intents;
    const out = primary.run(ctx);
    // "MBBS fees and eligibility" → answer every data question asked.
    if (DATA_INTENTS.has(primary.id) && (progs.length || inst)) {
      const extras = rest.filter((i) => DATA_INTENTS.has(i.id)).slice(0, 2);
      for (const i of extras) {
        const more = i.run(ctx);
        out.text += `\n\n${more.text}`;
        out.links = [...(out.links || []), ...(more.links || [])];
      }
    }
    out.links = dedupeLinks(out.links || []);
    if (!out.chips && (progs.length || inst)) {
      out.chips = ["Fees", "Eligibility", "Seats", "How to apply"].filter((c) => normalize(c) !== primary.id);
    }
    out.topic = primary.id;
    out.courses = courses;
    return finish(state, out, { ...mem, lastIntentId: primary.entity ? primary.id : state.lastIntentId, misses: 0 });
  }

  if (progs.length) {
    const text = progs.length > 1
      ? `${t(lang, "Here's how they compare:", "In dono ki tulna is tarah hai:")}\n\n${progs.map((p) => aboutProgram(p, q, lang)).join("\n\n")}`
      : aboutProgram(progs[0], q, lang);
    return finish(state, {
      text,
      links: dedupeLinks(progs[0].phd ? [L.phdCall, L.phdEmail, L.fees] : [L.fees, L.eligibility, progs[0].instId ? L.institutions : L.call]),
      chips: ["Seats", "How to apply", "Hostel"],
      topic: "course-info",
      courses,
    }, { ...mem, misses: 0 });
  }

  if (inst) {
    return finish(state, {
      text: aboutInstitute(inst, lang),
      links: [L.institutions, { href: inst.inst.website, label: "Institute website" }, L.fees],
      chips: ["Fees", "Eligibility", "Seats", "How to apply"],
      topic: "institute-info",
      courses,
    }, { ...mem, misses: 0 });
  }

  if (a.social.length) return finish(state, { ...a.social[0].run(ctx), topic: a.social[0].id }, { misses: 0 });

  return fallback(state);
}

function dedupeLinks(links) {
  const seen = new Set();
  return links.filter((l) => {
    const key = l.to || l.href;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

