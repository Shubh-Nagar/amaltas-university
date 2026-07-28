import React from "react";
import { ExternalLink, FileText, Mail, Phone, User } from "lucide-react";
import { PageHero } from "../components/Layout.jsx";
import { Reveal } from "../components/Primitives.jsx";
import { C } from "../theme.js";

/* Content mirrored from https://amaltasuniversity.in/public-self-disclosure/
   The documents themselves are downloaded into /public/disclosure and served
   locally — `localDoc()` maps each source PDF URL to its bundled local file. */

const U = "https://amaltasuniversity.in/wp-content/uploads";

/* Map a source PDF URL to the locally-hosted copy in /public/disclosure.
   Non-PDF links (event pages, gallery) are left as-is. The filename rule here
   must stay in sync with the download script that populated /public/disclosure. */
function localDoc(href) {
  if (!href || !/\.pdf(\?|#|$)/i.test(href)) return href;
  let base = href.substring(href.lastIndexOf("/") + 1);
  try { base = decodeURIComponent(base); } catch (e) { /* keep raw */ }
  base = base
    .replace(/[^A-Za-z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `/disclosure/${base}`;
}

const LEADERS = [
  { role: "Chancellor",      name: "Mrs. Aruna Bhadoria",        email: "chancellor@amaltasuniversity.in",    phone: "07272-482580",   profile: `${U}/2025/06/Mrs.-Aruna-Bhadoria-Chancellor.pdf` },
  { role: "Pro Chancellor",  name: "Dr. Salil Bhargava",         email: "prochancellor@amaltasuniversity.in", phone: "070890 40404",   profile: `${U}/2025/06/Dr.-Salil-Bhargava-Pro-Chancellor.pdf` },
  { role: "Vice-Chancellor", name: "Dr. R.K. Singh", email: "vicechancellor@amaltasuniversity.in", phone: "098222 68026",  profile: `${U}/2025/06/Dr.-Sharadchandra-WankhedeVice-chancellor-1.pdf` },
  { role: "Registrar",       name: "Dr. Abhay Gupta",        email: "registrar@amaltasuniversity.in",     phone: "07272-482580",   profile: `${U}/2025/06/Shri-Sanjay-Rambole-Registrar.pdf` },
  { role: "Ombudsperson",    name: "Dr. Satish Kumar S. Gupta",  email: "surajbhanji@gmail.com",              phone: "+91 94221-14037", profile: `${U}/2025/06/Dr.-Satish-Kumar-S.-Gupta-Ombudsperson.pdf` },
];

const SECTIONS = [
  {
    n: "1",
    title: "About HEI",
    docs: [
      { label: "About Us — Overview", href: `${U}/2025/06/About-Us-Overview.pdf` },
      { label: "Act and Statutes or MoA — Madhya Pradesh Act", href: `${U}/2025/06/Madhya-Pradesh-Act.pdf` },
      { label: "Act and Statutes or MoA — Statute 01 to 33", href: `${U}/2025/06/Statute-01-to-33-All-PDF.pdf` },
      { label: "Institutional Development Plan", href: `${U}/2025/06/Development-Plan-AUD.pdf` },
      { label: "Constituent Units / Affiliated Colleges", href: `${U}/2025/06/Constituent-Units.pdf` },
      { label: "Recognition / Approval", href: `${U}/2025/06/Recognition-Approval-2f-12Betc.-as-applicable-new.pdf` },
      { label: "Annual Reports" },
      { label: "Annual Accounts Including Balance Sheet", href: `${U}/2025/06/Annual-Account-AU366-to-371.pdf` },
      { label: "Sponsoring Body Details", href: `${U}/2025/06/Sponsoring-Body-213-to-224.pdf` },
    ],
    note: "Accreditation / Ranking Status: Now Amaltas University is eligible for (NIRF), hence process started.",
  },
  {
    n: "2",
    title: "Administration",
    docs: [
      { label: "Executive Council / Board of Governors", href: `${U}/2025/06/Executive-Council.pdf` },
      { label: "Board of Management", href: `${U}/2026/04/Board-of-Management.pdf` },
      { label: "Academic Council", href: `${U}/2026/04/Academic-Council.pdf` },
      { label: "Board of Studies", href: `${U}/2026/04/Board-of-Studies.pdf` },
      { label: "Finance Committee", href: `${U}/2026/04/Finance-committee.pdf` },
      { label: "Internal Complaint Committee", href: `${U}/2025/06/Internal-complaint-Committee-1.pdf` },
      { label: "Academic Leadership (Dean / HoD of Schools / Departments / Centres)", href: `${U}/2025/06/Academic-Leadership-DeanHOD-of-School-Department-Centers.pdf` },
    ],
  },
  {
    n: "3",
    title: "Academics",
    docs: [
      { label: "Details of Academic Programs (UG, PG, PG Diploma, Doctoral)", href: `${U}/2025/06/Details-of-Academic-Programs-1.pdf` },
      { label: "Academic Calendar", href: `${U}/2025/06/Academic-Calendar-29-%E0%A4%AE%E0%A4%88-2025.pdf` },
      { label: "Ord 1 — Faculty Level and Name of Program", href: `${U}/2025/06/Ord-1-Faculty-Level-and-Name-of-Program.pdf` },
      { label: "Ord 2 — Admission, Enrolment and Migration", href: `${U}/2025/06/Ord-2-Admission-Enrolment-and-Migration.pdf` },
      { label: "Ord 3 — University Examinations (General)", href: `${U}/2025/06/Ord-3-University-Examinations-General.pdf` },
      { label: "Ord 4 — Conduct of University Examinations", href: `${U}/2025/06/Ord-4-Conduct-of-University-Examinations.pdf` },
      { label: "Ord 5 — New Education Policy 2020", href: `${U}/2025/06/Ord-5-New-Education-Policy-2020.pdf` },
      { label: "Ord 6 — University Fellowships, Scholarships, Stipends, Medals and Prizes", href: `${U}/2025/06/Ord-6-University-Fellowships-Scholarships-Stipends-Medals-and-Prizes.pdf` },
      { label: "Ord 7 — Academic & Research Activity Grants", href: `${U}/2025/06/Ord-7-Academic-Research-Activity-Grants.pdf` },
      { label: "Department / Staff Details", href: `${U}/2025/06/Staff-62_94-UGC1.pdf` },
      { label: "IQAC", href: `${U}/2025/06/Internal-QualityI-Ass.-cell-QAC.pdf` },
      { label: "Library", href: `${U}/2025/06/Library-96-103.pdf` },
      { label: "Academic Collaboration 1 — MOU List in Shodhganga", href: `${U}/2025/06/Academic-Collaboration-1-A1-MOU-LIST-IN-Shodhganga.pdf` },
      { label: "Academic Collaboration 2 — Association of Indian Universities", href: `${U}/2025/06/Academic-Collaboration-2-Association-of-Indian-Universites-29-%E0%A4%AE%E0%A4%88-2025.pdf` },
      { label: "Academic Collaboration 3 — Certificate", href: `${U}/2025/06/Academic-Collaboration-3-U-1326_certificateold_-DCF.pdf` },
    ],
    note: "ODL / Online Programs: NA",
  },
  {
    n: "4",
    title: "Admissions & Fee",
    docs: [
      { label: "Prospectus", href: `${U}/2025/06/Prospectus-with-section-3.pdf` },
      { label: "Admission Process and Guidelines", href: `${U}/2025/06/Admission-Process-and-guidelines.pdf` },
      { label: "Fee Refund Policy" },
    ],
  },
  {
    n: "5",
    title: "Research",
    docs: [
      { label: "Research and Development Cell", href: `${U}/2025/06/Research-and-Development-Cell-1.pdf` },
      { label: "Incubation Centre / Start-Ups / Entrepreneurship Cell", href: `${U}/2025/06/Incubation-Centre-start-ups-Entrepreneurship-Cell.pdf` },
      { label: "Central Facilities", href: `${U}/2025/06/Central-Facilities.pdf` },
    ],
  },
  {
    n: "6",
    title: "Student Life",
    docs: [
      { label: "Sports Facilities", href: `${U}/2025/06/Sports-facilities.pdf` },
      { label: "Hostel Details", href: `${U}/2025/06/Hostel-Details.pdf` },
      { label: "Placement Cell and Its Activities", href: `${U}/2025/06/Placement-Cell-2.pdf` },
      { label: "Student Grievance Redressal Committee (SGRC)", href: `${U}/2025/06/Student-Grievance-Redressal-Comm-SGRC.pdf` },
      { label: "Ombudsperson Letter", href: `${U}/2025/06/Letter-Ombudasperson.pdf` },
      { label: "Health Facilities", href: `${U}/2025/06/Health-Facilities.pdf` },
      { label: "Internal Complaint Committee", href: `${U}/2025/06/Internal-complaint-Committee.pdf` },
      { label: "Anti-Ragging Cell", href: `${U}/2025/06/Anti-ragging-Cell.pdf` },
      { label: "Equal Opportunity Cell", href: `${U}/2025/06/Equal-Opportunity-Cell.pdf` },
      { label: "Facilities for Differently Abled", href: `${U}/2025/06/Faculties-for-Differently-abled.pdf` },
    ],
    note: "NCC / NSS: Under Process",
  },
  {
    n: "7",
    title: "Alumni",
    docs: [
      { label: "Alumni Association — Alumni Form", href: `${U}/2025/06/Alumni-Form.pdf` },
      { label: "Alumni Association — Society Certificate", href: `${U}/2025/06/Society-Certificate.pdf` },
    ],
  },
  {
    n: "8",
    title: "Information Corner",
    groups: [
      {
        heading: "Circulars",
        docs: [
          { label: "Special Circular, 17.05.2025", href: `${U}/2025/06/Special-Circular-17.05.2025.pdf` },
          { label: "Circular, 01.02.2025 — Investor Education Program", href: `${U}/2025/06/Circular-01.02.2025-Investor-Education-Program.pdf` },
          { label: "Circular, 06.12.2024 — ERP training", href: `${U}/2025/06/Circular-06.12.2024-ERP-training.pdf` },
          { label: "Circular, 11.03.2025 — Karma Yogi", href: `${U}/2025/06/Circular-11.03.2025-Karma-Yogi.pdf` },
          { label: "Circular, 11.11.2024 — Thalassemia Awareness Program", href: `${U}/2025/06/circular-11.11.2024-Thalassemia-Awareness-Program.pdf` },
          { label: "Circular, 12.09.2024 — Foundation Day", href: `${U}/2025/06/Circular-12.09.2024-Foundation-Day.pdf` },
          { label: "Circular, 15.02.2025 — Aud Ro UGC 2025,071", href: `${U}/2025/06/Circular-15.02.2025-Aud-Ro-UGC-2025071.pdf` },
          { label: "Circular, 15.02.2025 — Details Required For Inter College Sports", href: `${U}/2025/06/Circular-15.02.2025-Details-Required-For-Inter-College-Sports.pdf` },
          { label: "Circular, 15.02.2025 — Inter-College Sports Activity in MSIT Jaipur", href: `${U}/2025/06/Circular-15.02.2025-Inter-College-Sports-Activity-in-MSIT-Jaipur.pdf` },
          { label: "Circular, 15.06.2024 — Meeting Yoga Day", href: `${U}/2025/06/Circular-15.06.2024-Meeting-Yoga-Day.pdf` },
          { label: "Circular, 17.01.2024 — Cultural Program in Amaltas University Campus", href: `${U}/2025/06/Circular-17.01.2024-Cultural-Program-in-Amaltas-University-Campus.pdf` },
          { label: "Circular, 18.12.2024 — Aud Ro 307", href: `${U}/2025/06/Circular-18.12.2024-Aud-Ro-307.pdf` },
          { label: "Circular, 22.01.2025 — 26th January Republic Day Celebration", href: `${U}/2025/06/Circular-22.01.2025-26th-January-Republic-Day-Celebration.pdf` },
          { label: "Circular, 22.04.2025 — Alumni Association of Amaltas University", href: `${U}/2025/06/Circular-22.04.2025-Alumin-Association-of-Amaltas-University.pdf` },
          { label: "Circular, 24.05.2025 — Tobacco Prohibition Day", href: `${U}/2025/06/Circular-24.05.2025-Tabacco-Prohibition-Day.pdf` },
          { label: "Circular, 27.11.2024 — World AIDS Day", href: `${U}/2025/06/Circular-27.11.2024-World-AIDS-day.pdf` },
          { label: "Circular, 19.12.2024 — World Meditation Day Celebration", href: `${U}/2025/06/Circular19.12.2024-World-Meditation-Day-Celebration.pdf` },
        ],
      },
      {
        heading: "Notices",
        docs: [
          { label: "Meeting Notice, 08.05.2024", href: `${U}/2025/06/Meeting-Notice-08.05.2024.pdf` },
          { label: "Notice, 26.11.2024 — Index collage", href: `${U}/2025/06/Notice-26.11.2024-Index-collage.pdf` },
          { label: "Notice, 01.02.2025 — Basant Panchami", href: `${U}/2025/06/Notice-01.02.2025-Basant-Panchami.pdf` },
          { label: "Notice, 04.02.2025 — Seminar", href: `${U}/2025/06/Notice-04.02.2025-Seminar.pdf` },
          { label: "Notice, 07.03.2025 — Women's Day", href: `${U}/2025/06/Notice-07.03.2025-Womens-day.pdf` },
          { label: "Notice, 09.06.2025 — वृक्षा रोपण एवं किलकारी पोषण", href: `${U}/2025/06/Notice-09.06.2025-%E0%A4%B5%E0%A5%83%E0%A4%95%E0%A5%8D%E0%A4%B7%E0%A4%BE-%E0%A4%B0%E0%A5%8B%E0%A4%AA%E0%A4%A3-%E0%A4%8F%E0%A4%B5%E0%A4%82-%E0%A4%95%E0%A4%BF%E0%A4%B2%E0%A4%95%E0%A4%BE%E0%A4%B0%E0%A5%80-%E0%A4%AA%E0%A5%8B%E0%A4%B7%E0%A4%A3.pdf` },
          { label: "Notice, 22.03.2025 — Graduation Ceremony", href: `${U}/2025/06/Notice-22.03.2025-Graduation-Ceremony.pdf` },
          { label: "Notice, 23.04.2025 — New Academic Courses Curriculum", href: `${U}/2025/06/Notice-23.04.2025-New-academic-Courses-Curriculum.pdf` },
        ],
      },
      {
        heading: "News, Recent Events & Achievements",
        docs: [
          { label: "Grand Lamp Lighting & Oath Taking Ceremony at Amaltas Institute of Nursing Science, Dewas", href: "https://amaltasuniversity.in/events/grand-lamp-lighting-oath-taking-ceremony-held-at-amaltas-institute-of-nursing-science-dewas/" },
          { label: "Workshop on Advanced Medical Techniques at Amaltas Medical College", href: "https://amaltasuniversity.in/events/workshop-on-advanced-medical-techniques-at-amaltas-medical-college/" },
          { label: "Celebrating the Healing Power of Nature", href: "https://amaltasuniversity.in/events/celebrating-the-healing-power-of-nature/" },
          { label: "Graduation Ceremony", href: "https://amaltasuniversity.in/events/graduation-ceremony/" },
          { label: "Anti Ragging Awareness Program", href: `${U}/2025/06/Anti-Ragging-Awareness-Program.pdf` },
          { label: "MST-2025 at MNIT Jaipur", href: `${U}/2025/06/MST-2025-at-MNIT-Jaipur.pdf` },
          { label: "Maharana Pratap Jayanti Program", href: `${U}/2025/06/Maharana-Pratap-Jayanti-Program.pdf` },
          { label: "Dr. Bhimrao Ramji Ambedkar Jayanti", href: `${U}/2025/06/Dr.-Bhimrao-Ramji-Ambedkar-Jayanti.pdf` },
        ],
      },
    ],
  },
  {
    n: "9",
    title: "Picture Gallery",
    docs: [
      { label: "Picture Gallery", href: "https://amaltasuniversity.in/photogallery/" },
    ],
  },
];

/* One document row — links to the locally-hosted file when a href is known,
   otherwise a muted, non-navigating row (blank on the source site). */
function DocRow({ label, href }) {
  const target = localDoc(href);
  const base = {
    display: "flex", gap: 12, alignItems: "center",
    background: "#fff", borderRadius: 12, padding: "13px 16px",
    border: `1px solid rgba(11,44,24,.08)`, textDecoration: "none", color: C.ink,
  };
  const icon = (
    <span style={{ width: 34, height: 34, borderRadius: 9, background: `linear-gradient(135deg,${C.navy},${C.emerald})`, display: "grid", placeItems: "center", color: C.gold, flexShrink: 0 }}>
      <FileText size={16} />
    </span>
  );

  if (!href) {
    return (
      <div style={{ ...base, opacity: 0.6, cursor: "default" }}>
        {icon}
        <span style={{ fontSize: 14.5, lineHeight: 1.4 }}>{label}</span>
      </div>
    );
  }

  return (
    <a href={target} target="_blank" rel="noreferrer" className="card-lift" style={base}>
      {icon}
      <span style={{ fontSize: 14.5, lineHeight: 1.4, flex: 1 }}>{label}</span>
      <ExternalLink size={14} color={C.slate} style={{ flexShrink: 0, opacity: 0.6 }} />
    </a>
  );
}

export default function PublicSelfDisclosure() {
  return (
    <>
      <PageHero
        crumb="Public Self Disclosure"
        eyebrow="Transparency & Compliance"
        title="Public Self Disclosure."
        sub="Institutional information published for all stakeholders, as mandated by regulatory disclosure requirements."
        bgImg="/assets/images%20of%20university/all%20institutes/medical%20science.jpeg"
      />

      {/* Leadership contacts */}
      <section className="sec wrap" style={{ paddingTop: 60 }}>
        <Reveal>
          <span className="eyebrow">Key Administrative Contacts</span>
          <h2 style={{ marginTop: 14 }}>University leadership.</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16, marginTop: 36 }}>
          {LEADERS.map((l, i) => (
            <Reveal key={i} delay={`d${(i % 3) + 1}`}>
              <div className="card-lift" style={{ background: "#fff", borderRadius: 16, padding: "22px 22px", border: "1px solid rgba(11,44,24,.08)", height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ color: C.emerald, fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>{l.role}</div>
                <div style={{ fontFamily: "Fraunces,serif", fontSize: 19, color: C.ink, marginTop: 6 }}>{l.name}</div>
                <a href={`mailto:${l.email}`} style={{ display: "flex", gap: 8, alignItems: "center", color: C.slate, fontSize: 13.5, marginTop: 12, textDecoration: "none", wordBreak: "break-all" }}>
                  <Mail size={14} color={C.emerald} style={{ flexShrink: 0 }} /> {l.email}
                </a>
                <a href={`tel:${l.phone.replace(/[^\d+]/g, "")}`} style={{ display: "flex", gap: 8, alignItems: "center", color: C.slate, fontSize: 13.5, marginTop: 8, textDecoration: "none" }}>
                  <Phone size={14} color={C.emerald} style={{ flexShrink: 0 }} /> {l.phone}
                </a>
                <a href={localDoc(l.profile)} target="_blank" rel="noreferrer" style={{ display: "inline-flex", gap: 7, alignItems: "center", color: C.emerald, fontSize: 13, fontWeight: 600, marginTop: 14, textDecoration: "none" }}>
                  <User size={14} /> View profile <ExternalLink size={12} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Disclosure sections */}
      <section className="sec wrap" style={{ paddingTop: 20 }}>
        {SECTIONS.map((sec, si) => (
          <Reveal key={si} delay={`d${(si % 3) + 1}`}>
            <div style={{ marginBottom: 46 }}>
              <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 20 }}>
                <span style={{ width: 40, height: 40, borderRadius: 11, background: `linear-gradient(135deg,${C.navy},${C.emerald})`, color: C.gold, display: "grid", placeItems: "center", fontFamily: "Fraunces,serif", fontSize: 18, flexShrink: 0 }}>
                  {sec.n}
                </span>
                <h2 style={{ fontSize: 24, color: C.ink, margin: 0 }}>{sec.title}</h2>
              </div>

              {sec.note && (
                <p style={{ color: C.slate, fontSize: 14.5, lineHeight: 1.7, margin: "0 0 18px", fontStyle: "italic" }}>{sec.note}</p>
              )}

              {sec.docs && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 12 }}>
                  {sec.docs.map((d, di) => <DocRow key={di} label={d.label} href={d.href} />)}
                </div>
              )}

              {sec.groups && sec.groups.map((g, gi) => (
                <div key={gi} style={{ marginTop: gi === 0 ? 0 : 26 }}>
                  <h3 style={{ fontSize: 16, color: C.ink, margin: "0 0 14px" }}>{g.heading}</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 12 }}>
                    {g.docs.map((d, di) => <DocRow key={di} label={d.label} href={d.href} />)}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </section>
    </>
  );
}
