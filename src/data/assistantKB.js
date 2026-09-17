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

// Common corrections applied before matching (typos and Hinglish shorthand).
const REWRITES = {
  fess: "fees", fes: "fees", feez: "fees", fee: "fees", fees: "fees",
  kharcha: "fees", shulk: "fees",
  addmission: "admission", admision: "admission", admissin: "admission", admisson: "admission",
  dakhila: "admission",
  eligiblity: "eligibility", eligibilty: "eligibility", yogyata: "eligibility",
  hostal: "hostel", hostle: "hostel",
  scolarship: "scholarship", scholership: "scholarship", scholarshp: "scholarship",
  nursng: "nursing", nurshing: "nursing",
  sampark: "contact",
  kaha: "where", kahan: "where",
};

function makeQuery(raw) {
  const norm = normalize(raw);
  const toks = norm.split(" ").filter(Boolean).map((t) => REWRITES[t] || t);
  const text = toks.join(" ");
  return { raw, norm: text, padded: ` ${text} `, toks };
}

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
    const s = matchKw(q, k, item._own);
    if (s > 0) {
      score += s;
      if (s >= 1) { exact = true; hits.push(k); }
    }
  }
  return { item, score, exact, hits };
}

const has = (q, list) => list.some((k) => matchKw(q, normalize(k)) >= 1);
const compile = (list) =>
  list.map((x) => {
    const _kw = x.keywords.map(normalize);
    return { ...x, _kw, _own: new Set(_kw) };
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
    keywords: ["pharmacy", "pharmacist", "pharma", "pharmaceutical", "फार्मेसी"],
  },
  {
    id: "paramedical", inst: findInst("paramedical"), feeCat: "allied", eligCat: "paramedical",
    approval: "MP Paramedical Council, Bhopal",
    extra: "Hands-on training in physiotherapy, imaging and laboratory technology.",
    keywords: ["paramedical", "allied health", "technician", "technician course", "पैरामेडिकल"],
  },
].filter((x) => x.inst));

const instById = (id) => INSTITUTES.find((i) => i.id === id);

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
    id: "phdn", label: "Ph.D. Nursing", instId: "nursing", elig: eligOf("PhD Nursing"),
    rows: () => feeRowsWhere("nursing", (r) => r.course === "PhD Nursing"),
    keywords: ["phd nursing", "phd in nursing", "nursing phd", "doctorate in nursing"],
  },
  {
    id: "phd", label: "Ph.D. (all disciplines)", instId: null,
    rows: () => feeRowsWhere("nursing", (r) => r.course === "PhD Nursing"),
    note: `Ph.D. programmes run across all six health-science disciplines, with a dedicated admission cell: ${PHD_ADMISSION.phones.join(" / ")} · ${PHD_ADMISSION.email}. Only the Ph.D. Nursing fee is published online.`,
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
  return kept.sort((a, b) => b.score - a.score).slice(0, 4).map((s) => s.item);
}

function detectInstitute(q) {
  const best = INSTITUTES.map((i) => scoreItem(q, i)).filter((s) => s.score > 0).sort((a, b) => b.score - a.score)[0];
  return best ? best.item : null;
}

/* ───────────────────────── answer builders ───────────────────────── */

const bullet = (lines) => lines.map((l) => `• ${l}`).join("\n");
const feeLine = (r, withSpec = true) =>
  `${r.course}${withSpec && r.specialization && r.course.match(/^(MD|DM|M\.Ch)/) ? ` (${r.specialization})` : ""} — **${inr(r.fee)}**/year${r.seats ? ` · ${r.seats} seats` : ""}`;
const FEE_NOTE = "Fees are per year and indicative (as approved by MPPURC/AFSR). Hostel, transport and exam fees are charged separately.";

function feeRange(rows) {
  const fees = rows.map((r) => r.fee);
  const lo = Math.min(...fees), hi = Math.max(...fees);
  return lo === hi ? inr(lo) : `${inr(lo)} – ${inr(hi)}`;
}

function programFeeLines(p, q) {
  const rows = p.rows(q);
  if (!rows.length) return [`${p.label} — fee not published online; our admissions team can share it`];
  return rows.map((r) => feeLine(r));
}

function entityName(ctx) {
  if (ctx.progs.length) return ctx.progs.map((p) => p.label).join(", ");
  if (ctx.inst) return ctx.inst.inst.name;
  return "";
}

function aboutProgram(p, q) {
  const inst = p.instId ? instById(p.instId) : null;
  const lines = [];
  const rows = p.rows(q);
  if (rows.length === 1) lines.push(`Fee: **${inr(rows[0].fee)}** per year${rows[0].seats ? ` · ${rows[0].seats} seats` : ""}`);
  else if (rows.length > 1) lines.push(`Fees: ${feeRange(rows)} per year depending on specialisation`);
  if (p.elig) lines.push(`Eligibility: ${p.elig}`);
  if (inst) lines.push(`Approved by: ${inst.approval}`);
  let text = `**${p.label}**${inst ? ` · ${inst.inst.name}` : ""}\n${bullet(lines)}`;
  if (p.note) text += `\n${p.note}`;
  if (rows.length > 1) text += `\n\n${bullet(rows.map((r) => feeLine(r)))}`;
  return text;
}

function aboutInstitute(i) {
  const rows = feeCat(i.feeCat)?.courses || [];
  return `**${i.inst.name}**\n${i.inst.desc}\n${bullet([
    `Programmes: ${i.inst.programs.join(", ")}`,
    `Approved by: ${i.approval}`,
    rows.length ? `Fees: ${feeRange(rows)} per year` : null,
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
    keywords: ["start over", "restart", "reset", "new chat", "clear chat"],
    run: () => ({ text: WELCOME, chips: STARTER_CHIPS, reset: true }),
  },
  {
    id: "stream", boost: 3, entity: false,
    keywords: ["pcm", "pcb", "pcmb", "maths", "math", "mathematics", "biology", "arts", "commerce", "humanities", "non medical", "science stream", "maths student", "bio student"],
    run: (ctx) => streamAnswer(parseStream(ctx.q)),
  },
  {
    id: "noneet", boost: 3, entity: false,
    keywords: ["without neet", "no neet", "neet not qualified", "not qualified neet", "didnt qualify neet", "not cleared neet", "neet not cleared", "failed neet", "low neet score", "neet nahi", "bina neet", "without entrance", "no entrance exam", "without entrance exam"],
    run: () => ({
      text: `These programmes don't list NEET as a requirement:\n${bullet(NO_NEET_IDS.map(progById).map((p) => `${p.label}${shortFee(p)}`))}\n\nB.Sc Nursing needs the Pre-Nursing Selection Test (PNST); most paramedical programmes need 12th with PCB, and B.Pharm/D.Pharm accept PCB or PCM.`,
      links: [L.eligibility, L.fees, L.call],
      remember: NO_NEET_IDS,
    }),
  },
  {
    id: "hostel", boost: 1, entity: false,
    keywords: ["hostel", "hostels", "accommodation", "stay", "room", "rooms", "mess", "living", "live on campus", "residence", "dormitory", "boarding", "warden", "laundry", "girls hostel", "boys hostel", "छात्रावास", "हॉस्टल"],
    run: (ctx) => ({
      text: `**Hostels at Amaltas**\n${bullet([
        "Separate hostels for boys and girls — the girls' hostels are lady-warden supervised",
        "Furnished single and double-occupancy rooms with study desks",
        "Multi-cuisine mess with nutritious meal plans (separate for boys and girls)",
        "24/7 guards, CCTV and biometric entry at every block",
        "Wi-Fi, power backup, laundry and reading rooms",
        `A ${HOSPITAL_BEDS} teaching hospital right on campus for emergencies`,
      ])}${has(ctx.q, ["fees", "cost", "charges", "price", "rent", "kitna"]) ? "\n\nHostel fees are charged separately from tuition and aren't listed online — the admissions team will share the current hostel charges." : ""}`,
      links: [L.hostel, L.call],
    }),
  },
  {
    id: "fees", entity: true,
    keywords: ["fees", "cost", "costs", "tuition", "price", "expensive", "afford", "affordable", "cheap", "cheapest", "charges", "fee structure", "total fees", "how much", "kitni", "kitna", "paisa", "rupees", "per year", "per annum", "budget", "फीस", "शुल्क"],
    run: feesAnswer,
  },
  {
    id: "eligibility", entity: true,
    keywords: ["eligibility", "eligible", "criteria", "qualify", "qualification", "neet", "12th", "marks", "percentage", "cutoff", "cut off", "minimum marks", "required subjects", "who can apply", "entrance exam", "entrance", "requirement", "requirements", "pnst", "पात्रता", "योग्यता"],
    run: eligibilityAnswer,
  },
  {
    id: "seats", entity: true,
    keywords: ["seats", "seat", "intake", "seat matrix", "how many students", "vacancy", "vacant", "सीट"],
    run: seatsAnswer,
  },
  {
    id: "duration", entity: true,
    keywords: ["duration", "how many years", "how long", "years course", "course length", "kitne saal", "kitne sal", "time period", "course period"],
    run: durationAnswer,
  },
  {
    id: "documents", entity: false,
    keywords: ["documents", "document", "documents required", "papers", "marksheet", "mark sheet", "transfer certificate", "migration certificate", "certificates required", "certificates needed", "what to bring", "दस्तावेज"],
    run: () => ({
      text: `For document verification, bring the **originals** of:\n${bullet([
        "Mark sheets of your qualifying exams",
        "ID proof",
        "Category certificate (if applicable)",
        "Passport-size photographs",
      ])}\nFor NEET-based programmes, keep your NEET scorecard handy too. The admissions office will confirm the full checklist for your programme.`,
      links: [L.procedure, L.call],
    }),
  },
  {
    id: "apply", entity: true,
    keywords: ["apply", "application", "application form", "form", "admission", "admission process", "how to apply", "how do i apply", "take admission", "get admission", "join", "enrol", "enroll", "enrolment", "enrollment", "register", "registration", "procedure", "process", "last date", "deadline", "admission open", "how can i join", "प्रवेश", "एडमिशन", "दाखिला"],
    run: applyAnswer,
  },
  {
    id: "scholarship", entity: true, boost: 0.5,
    keywords: ["scholarship", "scholarships", "financial aid", "fee waiver", "waiver", "discount", "concession", "education loan", "loan", "instalment", "installment", "emi", "sc st", "obc", "ews", "chhatravritti", "छात्रवृत्ति", "स्कॉलरशिप"],
    // Deliberately no details: scholarship information hasn't been confirmed.
    run: (ctx) => ({
      text: `For scholarships, fee concessions or payment options${ctx.progs.length || ctx.inst ? ` for **${entityName(ctx)}**` : ""}, please speak to our admissions team directly — they'll give you the current, confirmed details.`,
      links: [L.call, L.whatsapp],
      chips: ["Fees", "How to apply", "Contact"],
    }),
  },
  {
    id: "courses", entity: true, boost: -0.5,
    keywords: ["course", "courses", "program", "programs", "programme", "programmes", "degree", "degrees", "what can i study", "list of courses", "courses offered", "which courses", "what courses", "streams", "departments", "institutes", "institutions", "colleges", "kaun se course", "कोर्स", "पाठ्यक्रम"],
    run: (ctx) => {
      if (ctx.progs.length) return { text: ctx.progs.map((p) => aboutProgram(p, ctx.q)).join("\n\n"), links: [L.programs, L.fees] };
      if (ctx.inst) return { text: aboutInstitute(ctx.inst), links: [L.institutions, L.fees] };
      return {
        text: `Amaltas University has six health-science institutes:\n${bullet(INSTITUTES.map((i) => `**${i.inst.name.replace("Amaltas ", "")}** — ${i.inst.programs.join(", ")}`))}\nPh.D. programmes are also offered across all six disciplines.`,
        links: [L.programs, L.institutions],
        chips: ["Which course suits me?", "Courses without NEET", "Fees"],
      };
    },
  },
  {
    id: "accreditation", entity: true,
    keywords: ["approved", "approval", "approvals", "recognised", "recognized", "recognition", "accredited", "accreditation", "affiliated", "affiliation", "nmc", "ncism", "nch", "inc", "pci", "ugc", "naac", "nabh", "nabl", "mppurc", "valid degree", "genuine", "fake", "government approved", "govt approved", "private or government", "government or private", "private university", "government college"],
    run: (ctx) => {
      const inst = ctx.inst || (ctx.progs[0]?.instId && instById(ctx.progs[0].instId));
      const lines = [];
      if (inst) lines.push(`**${inst.inst.name}** is approved by ${inst.approval}.`);
      lines.push(`Amaltas University is a private university established under the MP Niji Vishwavidyalaya Adhiniyam (regulated by MPPURC) and recognised by the **UGC under Section 2(f)**.`);
      if (!inst) lines.push(bullet(ACCREDITATIONS.map((a) => `**${a.short}** — ${a.scope}`)));
      if (has(ctx.q, ["naac"])) lines.push("On NAAC: the IQAC is preparing the university to align with NAAC's Binary Accreditation framework once it is implemented.");
      return { text: lines.join("\n"), links: [L.accreditations, L.disclosure] };
    },
  },
  {
    id: "hospital", entity: true,
    keywords: ["hospital", "teaching hospital", "beds", "bed", "clinical exposure", "clinical training", "clinical", "practical training", "practical", "practicals", "internship", "hands on", "patient exposure", "simulation"],
    run: (ctx) => {
      const inst = ctx.inst || (ctx.progs[0]?.instId && instById(ctx.progs[0].instId));
      const lines = [
        `A ${HOSPITAL_BEDS} superspeciality teaching hospital on campus — students train on real wards from year one`,
        "NABH-linked hospital with NABL-accredited diagnostic labs",
        "Skill simulation labs to practise clinical skills before real placements",
      ];
      if (inst && inst.id !== "medical") lines.push(inst.extra);
      else if (!inst) lines.push("Ayurveda has its own 100-bed hospital with a Panchakarma unit; Homoeopathy has an attached 50-bed teaching hospital");
      return { text: `**Clinical training${inst ? ` — ${inst.inst.name}` : ""}**\n${bullet(lines)}`, links: [L.institutions, L.academicFac] };
    },
  },
  {
    id: "healthcare", boost: 2, entity: false,
    keywords: ["appointment", "book appointment", "treatment", "consult", "consultation", "opd", "opd timing", "checkup", "check up", "health checkup", "i am sick", "sick", "emergency", "ambulance", "amaltas hospital", "patient admission", "ipd", "hospital contact"],
    run: (ctx) => ({
      text: `${has(ctx.q, ["emergency", "ambulance"]) ? "**If this is a medical emergency, call 108 or go to the nearest emergency department right away.**\n\n" : ""}Amaltas Hospital offers 24x7 emergency & critical care alongside OPD and inpatient services. For appointments, departments and OPD timings, please use the hospital's website.`,
      links: [L.hospitalSite, L.healthcare],
    }),
  },
  {
    id: "placement", entity: true,
    keywords: ["placement", "placements", "job", "jobs", "career", "careers", "salary", "package", "recruit", "recruiters", "scope", "future scope", "after course", "naukri", "employment", "campus placement"],
    run: (ctx) => ({
      text: `Amaltas doesn't publish placement statistics online, so I won't quote numbers. What the university does offer${ctx.progs.length || ctx.inst ? ` ${entityName(ctx)} students` : ""}:\n${bullet([
        "Clinical training from year one in the on-campus teaching hospital",
        "Nursing placements across the Amaltas hospital network",
        "An active alumni network with mentorship and career support",
      ])}\nOur counsellors can walk you through career paths for your programme.`,
      links: [L.achievers, L.call],
    }),
  },
  {
    id: "facilities", entity: false,
    keywords: ["facilities", "facility", "infrastructure", "library", "lab", "labs", "laboratory", "laboratories", "wifi", "wi fi", "internet", "sports", "gym", "gymnasium", "playground", "ground", "canteen", "cafeteria", "food", "auditorium", "smart class", "classroom", "classrooms", "transport", "bus", "computer lab", "e learning", "yoga", "solar"],
    run: (ctx) => {
      const q = ctx.q;
      const parts = [];
      if (has(q, ["library"])) parts.push("**Central Library** — print and digital collections across all six disciplines, e-journals, research databases and quiet reading halls.");
      if (has(q, ["lab", "labs", "laboratory", "laboratories", "computer lab", "simulation"])) parts.push("**Labs** — anatomy, physiology, biochemistry, pharmacology, nursing and allied-health labs, advanced research labs, skill-simulation stations and a computer centre.");
      if (has(q, ["sports", "gym", "gymnasium", "playground", "ground", "yoga"])) parts.push("**Sports** — sports grounds (cricket, football, volleyball, kabaddi, badminton), a gymnasium and yoga spaces.");
      if (has(q, ["canteen", "cafeteria", "food"])) parts.push("**Food** — cafeterias and dining halls on campus, plus a multi-cuisine hostel mess.");
      if (has(q, ["wifi", "wi fi", "internet", "e learning"])) parts.push("**Connectivity** — campus-wide fibre Wi-Fi and an e-learning portal with notes and recorded lectures.");
      if (has(q, ["transport", "bus"])) parts.push("**Transport** — transport charges are separate from tuition; call admissions to confirm routes and charges.");
      if (has(q, ["smart class", "classroom", "classrooms", "auditorium"])) parts.push("**Teaching spaces** — smart digital classrooms, seminar halls and a central auditorium.");
      if (!parts.length) {
        parts.push(`Campus facilities include:\n${bullet([
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
    keywords: ["campus life", "student life", "cultural", "fest", "festival", "clubs", "extra curricular", "extracurricular", "activities", "fun"],
    run: () => ({
      text: "Campus life mixes sport (cricket, football, volleyball, kabaddi, badminton), yoga — including a 35,000+ participant world-record session — cultural festivals, community outreach and regular celebrations across all six institutes.",
      links: [L.campusLife, L.events, L.gallery],
    }),
  },
  {
    id: "safety", entity: false,
    keywords: ["ragging", "anti ragging", "antiragging", "bullying", "harassment", "safety", "safe", "security", "is campus safe", "girls safety", "रैगिंग"],
    run: () => ({
      text: `**Safety & anti-ragging**\n${bullet([
        "Strict zero-tolerance anti-ragging policy with a dedicated committee and helpline",
        "24/7 security guards, CCTV coverage and biometric hostel entry",
        "Resident male and female wardens",
        "Mentor-faculty for every student and counselling support",
      ])}`,
      links: [L.antiRagging, L.hostel],
    }),
  },
  {
    id: "leadership", entity: false,
    keywords: ["vice chancellor", "vc", "kulguru", "chancellor", "pro chancellor", "registrar", "chairman", "founder", "who runs", "owner", "owns", "management", "leadership", "leaders"],
    run: (ctx) => {
      const q = ctx.q;
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
          text: `The ${leader.role} is **${leader.nm}** (${leader.org}). ${leader.bio}`,
          links: [{ to: `/leadership/${leader.slug}`, label: `Message from the ${leader.role.replace("Hon'ble ", "")}` }, L.leadership],
        };
      }
      return {
        text: `**University leadership**\n${bullet(LEADERS.map((l) => `${l.role.replace("Hon'ble ", "")} — ${l.nm}`))}\nAmaltas is run by the Mayank Welfare Society.`,
        links: [L.leadership],
      };
    },
  },
  {
    id: "awards", entity: false,
    keywords: ["award", "awards", "ranking", "rankings", "rank", "world record", "achievement", "achievements"],
    run: () => ({
      text: `**Awards & recognition**\n${bullet(AWARDS.map((a) => `${a.title} (${a.year}) — ${a.org}`))}`,
      links: [L.awards],
    }),
  },
  {
    id: "about", entity: false,
    keywords: ["about amaltas", "about university", "about the university", "about you", "history", "established", "founded", "when was", "how old", "mayank welfare", "why amaltas", "why choose", "what is amaltas", "is amaltas good", "good college", "good university", "review", "reviews", "vision", "mission", "students", "faculty", "teachers"],
    run: () => ({
      text: `**Amaltas University, Dewas** — "Where healing grows."\n${bullet([
        "Founded by Shri Suresh Singh Bhadoria through the Mayank Welfare Society (2013)",
        "Private university under the MP Private University Act, recognised by UGC under Section 2(f)",
        `${STATS.map((s) => `${s.v.toLocaleString("en-IN")}${s.suf} ${s.l.toLowerCase()}`).join(" · ")}`,
        `Hospital-embedded learning in a ${HOSPITAL_BEDS} superspeciality teaching hospital`,
      ])}`,
      links: [L.about, L.why],
    }),
  },
  {
    id: "medium", entity: false,
    keywords: ["medium", "english medium", "hindi medium", "language", "language of instruction", "teaching language", "hindi"],
    run: () => ({ text: "Teaching is in **English**, with Hindi language support available.", links: [L.disclosure] }),
  },
  {
    id: "calendar", entity: false,
    keywords: ["academic calendar", "session", "session start", "classes start", "class start", "when does college start", "semester", "annual system", "academic year", "exam pattern", "exams"],
    run: () => ({
      text: "The academic calendar runs **August to June** on an annual system. Admissions for the **2026–27** session are open now — call admissions for exact reporting and class-start dates for your programme.",
      links: [L.procedure, L.call],
    }),
  },
  {
    id: "quota", entity: false,
    keywords: ["nri", "international", "foreign", "overseas", "other state", "outside mp", "out of state", "domicile", "management quota", "quota", "state quota", "all india quota"],
    run: () => ({
      text: "Teaching is English-medium and students from other states are welcome. Quota, domicile and NRI/international seat rules depend on the programme and the applicable counselling rules, so the admissions team will confirm what applies to you.",
      links: [L.eligibility, L.call, L.whatsapp],
    }),
  },
  {
    id: "refund", entity: false,
    keywords: ["refund", "cancel admission", "cancellation", "withdraw", "withdrawal", "money back", "leave the course"],
    run: () => ({ text: "Refund and cancellation terms for admissions are published in full on the Refund Policy page.", links: [L.refund] }),
  },
  {
    id: "events", entity: false,
    keywords: ["event", "events", "happening", "happenings", "news", "workshop", "seminar", "conference", "gallery", "photo", "photos", "latest news", "latest", "upcoming", "celebration"],
    run: () => ({
      text: `**Recent at Amaltas**\n${bullet(EVENTS.slice(0, 3).map((e) => `${e.date} — ${e.title}`))}`,
      links: [L.events, L.news, L.gallery],
    }),
  },
  {
    id: "alumni", entity: false,
    keywords: ["alumni", "old student", "old students", "graduate network", "passed out", "passout"],
    run: () => ({ text: "The Amaltas alumni network stays connected through events, mentorship, Alumni Assist and giving-back initiatives.", links: [L.alumni, L.achievers] }),
  },
  {
    id: "iqac", entity: false,
    keywords: ["iqac", "quality assurance", "internal quality"],
    run: () => ({ text: "The Internal Quality Assurance Cell (IQAC), led by Dr. Abhilasha Dutta, drives quality initiatives such as outcome-based education, CBME, mentoring and stakeholder feedback across all institutes.", links: [L.iqac] }),
  },
  {
    id: "certificates", entity: false,
    keywords: ["ncmsap", "certificate download", "download certificate", "my certificate", "participation certificate", "conference certificate"],
    run: () => ({ text: "Conference and event certificates (such as NCMSAP) can be downloaded from the certificates page.", links: [L.certificates] }),
  },
  {
    id: "disclosure", entity: false,
    keywords: ["mandatory disclosure", "self disclosure", "public self disclosure", "aishe", "disclosure"],
    run: () => ({ text: "Statutory disclosures are published on these pages.", links: [L.disclosure, L.selfDisclosure] }),
  },
  {
    id: "location", entity: false,
    keywords: ["location", "address", "where", "where is", "located", "reach", "how to reach", "directions", "direction", "map", "distance", "nearest", "railway", "railway station", "bus stand", "airport", "पता", "कहाँ", "कहां"],
    run: (ctx) => ({
      text: `Amaltas University is at **${CONTACT.address}**.${has(ctx.q, ["distance", "railway", "railway station", "bus stand", "airport", "nearest"]) ? "\nTravel distances aren't listed on the website — call us and we'll help with directions." : ""}`,
      links: [L.maps, L.call],
    }),
  },
  {
    id: "contact", entity: false,
    keywords: ["contact", "phone", "call", "number", "mobile", "email", "mail", "helpline", "toll free", "whatsapp", "talk to", "talk to human", "talk to a human", "speak to a person", "agent", "counsellor", "counselor", "counselling", "counseling", "speak to", "customer care", "enquiry", "inquiry", "संपर्क", "सम्पर्क", "फोन", "नंबर"],
    run: () => ({
      text: `**Talk to the admissions team**\n${bullet([
        `General enquiry: **${CONTACT.tollFree}**`,
        `Office: ${CONTACT.phone}`,
        `Email: ${CONTACT.email}`,
        "BAMS helpline: +91 7880154605",
        `Ph.D. cell: ${PHD_ADMISSION.phones.join(" / ")}`,
      ])}`,
      links: [L.call, L.whatsapp, L.email],
    }),
  },
  {
    id: "identity", social: true,
    keywords: ["who are you", "priya", "who is priya", "are you human", "human", "real person", "are you a person", "are you a real person", "robot", "chatbot", "are you a girl", "are you a bot", "are you real", "your name", "what can you do", "what do you do", "help", "menu", "options"],
    run: () => ({
      text: `I'm Priya, Amaltas University's virtual assistant — an automated helper, not a real person. My answers come from the university's published information. To talk to a counsellor, call **${CONTACT.tollFree}**.\n\nAsk me about:\n• Courses, fees, seats and eligibility\n• Admissions and documents\n• Hostel, facilities and safety\n• Approvals, leadership, events and contact details`,
      chips: STARTER_CHIPS,
    }),
  },
  {
    id: "greeting", social: true,
    keywords: ["hi", "hii", "hiii", "hello", "helo", "hey", "namaste", "namaskar", "good morning", "good afternoon", "good evening", "नमस्ते", "नमस्कार"],
    run: () => ({ text: "Hello! How can I help you today? Ask about any course, fees, eligibility or admissions.", chips: STARTER_CHIPS }),
  },
  {
    id: "thanks", social: true,
    keywords: ["thanks", "thank you", "thankyou", "thx", "ty", "dhanyavad", "dhanyawad", "shukriya", "great", "awesome", "ok", "okay", "cool", "nice", "got it", "धन्यवाद"],
    run: () => ({ text: "You're welcome! Anything else I can help with?", chips: ["Fees", "Eligibility", "How to apply", "Contact"] }),
  },
  {
    id: "bye", social: true,
    keywords: ["bye", "goodbye", "good bye", "see you", "tata", "thats all", "nothing else", "no thanks"],
    run: () => ({ text: `Goodbye! If you need us later, call ${CONTACT.tollFree} or reopen this chat anytime.` }),
  },
]);

/* ───────────────────────── data intent answers ───────────────────────── */

function feesAnswer(ctx) {
  const { q, progs, inst } = ctx;
  if (progs.length) {
    return {
      text: `**Fees${progs.length === 1 ? ` — ${progs[0].label}` : ""}**\n${bullet(progs.flatMap((p) => programFeeLines(p, q)))}${progs.some((p) => p.note) ? `\n${progs.find((p) => p.note).note}` : ""}\n\n${FEE_NOTE}`,
      links: [L.fees, L.call],
    };
  }
  if (inst) {
    return {
      text: `**${inst.inst.name} — fees**\n${bullet(feeCat(inst.feeCat).courses.map((r) => feeLine(r)))}\n\n${FEE_NOTE}`,
      links: [L.fees, L.call],
    };
  }
  const all = FEE_CATEGORIES.flatMap((c) => c.courses.map((r) => ({ ...r, cat: c.label })));
  if (has(q, ["cheap", "cheapest", "lowest", "low", "least", "affordable", "budget", "minimum", "sasta", "kam"])) {
    const list = [...all].sort((a, b) => a.fee - b.fee).filter((r) => !/^MD$/.test(r.course)).slice(0, 5);
    return { text: `**Lowest-fee programmes**\n${bullet(list.map((r) => `${r.course} (${r.cat}) — **${inr(r.fee)}**/year`))}\n\n${FEE_NOTE}`, links: [L.fees] };
  }
  if (has(q, ["highest", "most expensive", "costliest", "maximum", "expensive"])) {
    const list = [...all].sort((a, b) => b.fee - a.fee).slice(0, 3);
    return { text: `**Highest-fee programmes**\n${bullet(list.map((r) => feeLine(r)))}`, links: [L.fees] };
  }
  const lines = FEE_CATEGORIES.map((c) =>
    c.courses.length === 1 ? `${c.label}: ${c.courses[0].course} **${inr(c.courses[0].fee)}**` : `${c.label}: **${feeRange(c.courses)}**`
  );
  return {
    text: `**Annual fees at a glance**\n${bullet(lines)}\nMBBS is ${inr(feeRowsWhere("medical", (r) => r.course === "MBBS")[0].fee)}/year.\n\nAsk me about a specific course (e.g. "B.Pharm fees") for the exact figure. ${FEE_NOTE}`,
    links: [L.fees, L.call],
    chips: ["MBBS fees", "BAMS fees", "Nursing fees", "Cheapest courses"],
  };
}

const CUTOFF_NOTE = "Amaltas doesn't publish a fixed cut-off or minimum percentage online. For NEET-based programmes, merit is based on NEET scores; our counsellors can share recent cut-off trends and SC/ST/OBC relaxation details.";

function eligibilityAnswer(ctx) {
  const { q, progs, inst } = ctx;
  const cutoff = has(q, ["cutoff", "cut off", "marks", "percentage", "minimum marks", "score", "rank"]);
  let text;
  if (progs.length) {
    text = `**Eligibility**\n${bullet(progs.map((p) => `${p.label} — ${p.elig || "please confirm with the admissions team"}`))}`;
  } else if (inst) {
    const cat = ELIGIBILITY_CATEGORIES.find((c) => c.id === inst.eligCat);
    text = `**${inst.inst.name} — eligibility**\n${bullet(cat.courses.map((r) => `${r.course} — ${r.eligibility}`))}`;
  } else if (cutoff) {
    return { text: CUTOFF_NOTE, links: [L.eligibility, L.call] };
  } else {
    text = `**Eligibility at a glance**\n${bullet([
      "MBBS, BAMS, BHMS — 12th with PCB + **NEET UG**",
      "MD/MS — MBBS + **NEET PG**; DM/M.Ch — MD/MS + **NEET SS**",
      "B.Sc Nursing — 12th with PCB + **PNST**",
      "B.Pharm, D.Pharm — 12th with **PCB or PCM**",
      "Paramedical (BPT, BMLT, BXRT, DMLT, diplomas) — 12th with **PCB**",
      "GNM, Post Basic & M.Sc Nursing, Ph.D. — as per Nursing Council/UGC norms",
    ])}`;
    return { text, links: [L.eligibility], chips: ["I have PCM", "Courses without NEET", "MBBS eligibility"] };
  }
  if (cutoff) text += `\n\n${CUTOFF_NOTE}`;
  return { text, links: [L.eligibility, L.call] };
}

function seatsAnswer(ctx) {
  const { q, progs, inst } = ctx;
  const line = (r) => `${r.course}${r.specialization && r.course.startsWith("MD") ? ` (${r.specialization})` : ""} — ${r.seats ? `**${r.seats} seats**` : "intake not published"}`;
  let rows;
  if (progs.length) rows = progs.flatMap((p) => p.rows(q));
  else if (inst) rows = feeCat(inst.feeCat).courses;
  else rows = FEE_CATEGORIES.flatMap((c) => c.courses).filter((r) => r.seats);
  if (!rows.length) return { text: `Seat intake for ${entityName(ctx)} isn't published online — the admissions team can confirm it.`, links: [L.call] };
  return {
    text: `**Seat intake**\n${bullet(rows.map(line))}\nIntake is as per regulatory approvals.`,
    links: [L.fees, L.call],
  };
}

function durationAnswer(ctx) {
  const progs = ctx.progs.length ? ctx.progs : ctx.inst ? PROGRAMS.filter((p) => p.instId === ctx.inst.id) : [];
  if (!progs.length) {
    const known = PROGRAMS.filter((p) => p.duration);
    return {
      text: `**Standard course durations** (as set by the national regulators)\n${bullet(known.map((p) => `${p.label} — ${p.duration}`))}\nFor paramedical and certificate courses, please confirm the duration with admissions.`,
      links: [L.programs, L.call],
    };
  }
  return {
    text: `**Course duration**\n${bullet(progs.map((p) => `${p.label} — ${p.duration ? `${p.duration} (standard regulator norm)` : "please confirm with the admissions team"}`))}`,
    links: [L.programs, L.call],
  };
}

function applyAnswer(ctx) {
  const { q, progs, inst } = ctx;
  const neet = progs.some((p) => p.neet);
  let head = "";
  if (progs.length || inst) {
    const elig = progs.filter((p) => p.elig).map((p) => `${p.label}: ${p.elig}`);
    const notes = progs.filter((p) => p.note).map((p) => `${p.note}\n`).join("");
    head = `**Admission to ${entityName(ctx)}**\n${elig.length ? `${bullet(elig)}\n` : ""}${notes}${neet ? "Seats are allotted on NEET merit.\n" : ""}\n`;
  }
  const dates = has(q, ["last date", "deadline"]) ? "\n\nExact deadlines aren't published online — admissions for 2026–27 are open now, so call to confirm the last date for your programme." : "";
  return {
    text: `${head}**How admission works**\n1. Check the programme, eligibility and fees\n2. Fill in the online registration form\n3. Pay the registration fee at the Admissions Office (DD, cash or bank transfer)\n4. Take the entrance/qualifying test that applies to your programme\n5. Merit list is published (NEET / academic scores)\n6. Document verification with originals\n7. Seat allotment\n\nAdmissions for **2026–27** are open.${dates}`,
    links: [L.procedure, L.eligibility, L.call],
    chips: ["Documents required", "Fees", "Contact"],
  };
}

/* ───────────────────────── course-finder quiz ───────────────────────── */

function parseStream(q) {
  const pcb = has(q, ["pcb", "biology", "bio", "zoology", "botany", "medical stream"]);
  const pcm = has(q, ["pcm", "maths", "math", "mathematics", "non medical"]);
  if (has(q, ["both", "pcmb", "pcbm"]) || (pcb && pcm)) return "both";
  if (pcb) return "pcb";
  if (pcm) return "pcm";
  if (has(q, ["arts", "commerce", "humanities", "arts commerce"])) return "other";
  return null;
}

function streamAnswer(stream) {
  if (stream === "pcm") {
    return {
      text: `With **PCM**, you can apply for:\n${bullet(["bpharm", "dpharm"].map(progById).map((p) => `**${p.label}**${shortFee(p)}`))}\nBoth accept 12th with PCB or PCM. MBBS, BAMS, BHMS, Nursing and the paramedical programmes require Biology (PCB).`,
      links: [L.eligibility, L.fees],
      chips: ["B.Pharm vs D.Pharm", "How to apply", "Hostel"],
      remember: ["bpharm", "dpharm"],
    };
  }
  if (stream === "other") {
    return {
      text: "All Amaltas programmes are health-sciences courses that need Science in 12th (PCB, or PCM for pharmacy), so Arts/Commerce students generally won't meet the published eligibility. Our counsellors can check whether any option fits your profile.",
      links: [L.eligibility, L.call],
      chips: STARTER_CHIPS,
    };
  }
  if (stream === "pcb" || stream === "both") {
    return {
      text: `With **${stream === "both" ? "PCB and PCM" : "PCB"}**, you can apply across our undergraduate programmes:\n${bullet([
        "NEET UG: **MBBS, BAMS, BHMS**",
        "PNST: **B.Sc Nursing**",
        "12th PCB/PCM: **B.Pharm, D.Pharm**",
        "12th PCB: **BPT, BMLT, BXRT, DMLT** and paramedical diplomas",
        "GNM — as per Nursing Council norms",
      ])}`,
      links: [L.eligibility, L.fees],
      chips: ["Which course suits me?", "Courses without NEET", "Fees"],
    };
  }
  return { text: "Tell me which subjects you studied in 12th — PCB, PCM, both, or Arts/Commerce.", chips: QUIZ_STREAM_CHIPS };
}

const QUIZ_STREAM_CHIPS = ["Biology (PCB)", "Maths (PCM)", "Both PCB & PCM", "Arts / Commerce"];

const INTERESTS = compile([
  { id: "patients", label: "Treating patients directly", progs: ["mbbs", "bhms", "bams"], keywords: ["treating patients", "treat patients", "patients", "patient", "doctor", "treat", "diagnose"] },
  { id: "ayurveda", label: "Ayurveda / natural healing", progs: ["bams"], keywords: ["ayurveda", "ayurvedic", "natural", "natural healing", "herbal", "traditional"] },
  { id: "nursing", label: "Nursing & patient care", progs: ["bscn", "gnm"], keywords: ["nursing", "nurse", "patient care", "caring", "care"] },
  { id: "pharmacy", label: "Pharmacy & medicines", progs: ["bpharm", "dpharm"], keywords: ["pharmacy", "medicines", "medicine", "drugs", "pharma", "chemist"] },
  { id: "allied", label: "Allied health (physio, imaging, lab)", progs: ["bpt", "bmlt", "bxrt"], keywords: ["allied", "allied health", "physio", "physiotherapy", "imaging", "lab", "x ray", "radiology", "technician", "machines"] },
  { id: "research", label: "Research & lab sciences", progs: ["bmlt", "mscmed", "phd"], keywords: ["research", "lab sciences", "science", "scientist", "phd"] },
]);

function recommend(interest, stream) {
  let ids = interest.progs;
  if (stream === "pcm") ids = ids.filter((id) => ["bpharm", "dpharm"].includes(id));
  const progs = ids.map(progById);
  const needsNeet = progs.some((p) => p.neet);
  const lines = progs.map((p) => {
    const inst = p.instId ? instById(p.instId) : null;
    return `**${p.label}**${inst ? ` (${inst.inst.name.replace("Amaltas ", "")})` : ""}${shortFee(p)}${p.elig ? `\n   Eligibility: ${p.elig}` : ""}`;
  });
  return {
    text: `Based on your interest in **${interest.label.toLowerCase()}**, look at:\n${bullet(lines)}${needsNeet ? "\n\nMBBS, BAMS and BHMS need a NEET UG score. No NEET? B.Sc Nursing, B.Pharm, D.Pharm and the paramedical programmes don't list it as a requirement." : ""}`,
    links: [L.institutions, L.eligibility, L.fees],
    chips: ["How to apply", "Hostel", "Courses without NEET"],
    remember: ids,
    topic: "course-finder",
    courses: progs.map((p) => p.label).join(", "),
  };
}

/* ───────────────────────── engine ───────────────────────── */

export const STARTER_CHIPS = ["Which course suits me?", "Fees", "Eligibility", "How to apply", "Hostel", "Contact"];
export const WELCOME = "Hi! I'm Priya, Amaltas University's virtual assistant. Ask me about courses, fees, eligibility, admissions or hostel — or tap an option below.";

export const createState = () => ({ quiz: null, stream: null, lastProgIds: [], lastInstId: null, lastIntentId: null, misses: 0 });

const QUIZ_TRIGGER = ["which course", "suits me", "suit me", "suggest", "recommend", "confused", "help me choose", "not sure what to study", "best course", "career guidance", "guide me", "what should i study", "which course is best", "konsa course", "kaunsa course", "course finder"];
const FOLLOW_UP_CUES = ["and", "what about", "how about", "aur", "for", "also", "same for"];
const GENERAL_CUES = ["all", "every", "overall", "list", "total", "cheapest", "lowest", "highest", "courses", "at a glance"];
const ABOUT_CUES = ["tell me", "about the", "about this", "details", "detail", "info", "information", "explain", "overview"];

function analyse(q) {
  const progs = detectPrograms(q);
  const inst = progs.length ? null : detectInstitute(q);
  const scored = INTENTS.map((it, order) => ({ ...scoreItem(q, it), order })).filter((s) => s.score > 0);
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
  if (out.remember) {
    next.lastProgIds = out.remember;
    next.lastInstId = null;
  }
  const chips = out.chips || STARTER_CHIPS;
  const topic = out.topic || (next.quiz || state.quiz ? "course-finder" : "other");
  return {
    state: out.reset ? createState() : next,
    replies: [{ text: out.text, links: out.links || [], chips }],
    reset: !!out.reset,
    meta: { topic, answered: topic !== "unanswered", courses: out.courses || "" },
  };
}

function fallback(state) {
  const misses = state.misses + 1;
  return finish(state, {
    text: misses > 1
      ? `I'm still not sure I understood. The admissions team can answer anything directly — call **${CONTACT.tollFree}** or message us on WhatsApp.`
      : "Sorry, I didn't quite get that. I can help with courses, fees, seats, eligibility, admissions, hostel, facilities and contact details. Try something like \"BAMS fees\" or \"Am I eligible with PCM?\"",
    links: [L.call, L.whatsapp],
    chips: STARTER_CHIPS,
    topic: "unanswered",
  }, { misses });
}

export function reply(state, rawInput) {
  const raw = String(rawInput).slice(0, 300);
  const q = makeQuery(raw);
  if (!q.norm) return fallback(state);

  const a = analyse(q);
  const understood = a.progs.length || a.inst || a.intents.length || a.social.length;

  // Course-finder quiz: accept the answer, or step out if they asked something else.
  if (state.quiz === "stream") {
    const stream = parseStream(q);
    if (stream === "pcb" || stream === "both") {
      return finish(state, {
        text: "Great. What interests you most?",
        chips: INTERESTS.map((i) => i.label),
      }, { quiz: "interest", stream, misses: 0 });
    }
    if (stream) return finish(state, streamAnswer(stream), { quiz: null, stream, misses: 0 });
    if (!understood) return finish(state, { text: "Please pick the subjects you studied in 12th:", chips: QUIZ_STREAM_CHIPS });
    state = { ...state, quiz: null };
  } else if (state.quiz === "interest") {
    const best = INTERESTS.map((i) => scoreItem(q, i)).filter((s) => s.score > 0).sort((x, y) => y.score - x.score)[0];
    if (best) return finish(state, recommend(best.item, state.stream), { quiz: null, misses: 0 });
    if (!understood) return finish(state, { text: "Which of these sounds most like you?", chips: INTERESTS.map((i) => i.label) });
    state = { ...state, quiz: null };
  }

  const askedStream = parseStream(q);
  if (!a.progs.length && has(q, QUIZ_TRIGGER) && (askedStream === "pcb" || askedStream === "both")) {
    return finish(state, {
      text: "Good — with Biology you have the widest choice. What interests you most?",
      chips: INTERESTS.map((i) => i.label),
    }, { quiz: "interest", stream: askedStream, misses: 0 });
  }
  const directAnswer = askedStream || a.intents.some((i) => i.id === "noneet");
  if (!a.progs.length && !directAnswer && has(q, QUIZ_TRIGGER)) {
    return finish(state, {
      text: "Happy to help you choose. Which subjects did you study (or are you studying) in Class 12?",
      chips: QUIZ_STREAM_CHIPS,
    }, { quiz: "stream", misses: 0 });
  }

  let { progs, inst, intents } = a;
  const short = q.toks.length <= 5;

  // Follow-ups: "fees" after talking about BAMS, or "and nursing?" after a fees question.
  if (!progs.length && !inst && intents.some((i) => i.entity) && short && !has(q, GENERAL_CUES)) {
    progs = state.lastProgIds.map(progById).filter(Boolean);
    inst = progs.length ? null : state.lastInstId ? instById(state.lastInstId) : null;
  }
  if ((progs.length || inst) && !intents.length && state.lastIntentId && !has(q, ABOUT_CUES)) {
    const prev = INTENTS.find((i) => i.id === state.lastIntentId);
    if (prev?.entity && (q.toks.length <= 3 || has(q, FOLLOW_UP_CUES))) intents = [prev];
  }

  const ctx = { q, progs, inst, state };
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
      ? `Here's how they compare:\n\n${progs.map((p) => aboutProgram(p, q)).join("\n\n")}`
      : aboutProgram(progs[0], q);
    return finish(state, {
      text,
      links: dedupeLinks([L.fees, L.eligibility, progs[0].instId ? L.institutions : L.call]),
      chips: ["Seats", "How to apply", "Hostel"],
      topic: "course-info",
      courses,
    }, { ...mem, misses: 0 });
  }

  if (inst) {
    return finish(state, {
      text: aboutInstitute(inst),
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
