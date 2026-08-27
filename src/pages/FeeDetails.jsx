import React, { useState } from "react";
import { IndianRupee, ChevronRight, Phone } from "lucide-react";
import { PageHero } from "../components/Layout.jsx";
import { Reveal } from "../components/Primitives.jsx";
import { C } from "../theme.js";
import { CONTACT } from "../data/content.js";
import SEO from "../components/SEO.jsx";
import { breadcrumbSchema } from "../data/schema.js";

const CATEGORIES = [
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

function fmt(n) {
  return "₹" + n.toLocaleString("en-IN");
}

const ALL_CAT = { id: "all", label: "All", color: C.navy };

export default function FeeDetails() {
  const [active, setActive] = useState("all");

  const isAll = active === "all";
  const cat = isAll ? ALL_CAT : CATEGORIES.find((c) => c.id === active);

  const displayRows = isAll
    ? CATEGORIES.flatMap((c) =>
        c.courses.map((row) => ({ ...row, _cat: c }))
      )
    : CATEGORIES.find((c) => c.id === active).courses.map((row) => ({ ...row, _cat: cat }));

  return (
    <>
      <SEO
        title="Fee Structure 2026-27 — MBBS, BAMS, BHMS, Nursing & Pharmacy"
        description="Transparent, all-inclusive fee structure for Amaltas University's MBBS, MD/MS, BAMS, BHMS, B.Sc Nursing, B.Pharm and paramedical programmes for the 2026-27 academic year — no hidden charges."
        path="/admissions/fees"
        keywords="Amaltas University MBBS fees, BAMS fees Madhya Pradesh, B.Sc Nursing fees, B.Pharm fees Dewas"
        jsonLd={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Admissions", path: "/admissions" }, { name: "Fee Details", path: "/admissions/fees" }])}
      />
      <PageHero
        crumb="Admissions / Fee Details"
        eyebrow="Fee Structure 2026–27"
        title="Transparent fees, every programme."
        sub="As approved by MPPURC and the AFSR. All fee figures are per annum. Scholarship and financial aid is available across programmes — speak to our admissions team to know more."
        bgImg="/assets/images%20of%20university/The%20Amaltas%20difference/scolarship.JPG"
      />

      {/* CATEGORY TABS */}
      <section className="sec wrap" style={{ paddingTop: 70 }}>
        <Reveal>
          <span className="eyebrow">Browse by discipline</span>
          <h2 style={{ marginTop: 8 }}>Select a programme category.</h2>
        </Reveal>

        {/* Tab strip */}
        <Reveal delay="d1">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 32 }}>
            {[ALL_CAT, ...CATEGORIES].map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                style={{
                  padding: "10px 18px",
                  borderRadius: 100,
                  border: active === c.id ? `2px solid ${c.color}` : "2px solid rgba(11,44,24,.1)",
                  background: active === c.id ? c.color : "transparent",
                  color: active === c.id ? "#fff" : C.slate,
                  fontFamily: "inherit",
                  fontWeight: 600,
                  fontSize: 13.5,
                  cursor: "pointer",
                  transition: "all .25s",
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Fee Table */}
        <Reveal delay="d2">
          <div
            key={active}
            className="data-table"
            style={{
              marginTop: 36,
              borderRadius: 20,
              overflow: "hidden",
              border: "1px solid rgba(11,44,24,.09)",
              boxShadow: "0 8px 40px -16px rgba(11,44,24,.14)",
            }}
          >
            {/* Table header */}
            <div
              className="data-table-row data-table-head"
              style={{
                display: "grid",
                gridTemplateColumns: isAll ? "140px 1fr 2fr 160px" : "1fr 2fr 160px",
                background: cat.color,
                padding: "14px 28px",
                color: "#fff",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: ".12em",
                textTransform: "uppercase",
              }}
            >
              {isAll && <span>Category</span>}
              <span>Course</span>
              <span>Specialization / Branch</span>
              <span style={{ textAlign: "right" }}>Fee Per Year</span>
            </div>

            {/* Rows */}
            {displayRows.map((row, i) => (
              <div
                key={i}
                className="data-table-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: isAll ? "140px 1fr 2fr 160px" : "1fr 2fr 160px",
                  padding: "18px 28px",
                  background: i % 2 === 0 ? "#fff" : "rgba(247,245,236,.55)",
                  borderBottom: i < displayRows.length - 1 ? "1px solid rgba(11,44,24,.06)" : "none",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                {/* Category badge (All view only) */}
                {isAll && (
                  <div data-label="Category">
                    <span
                      style={{
                        display: "inline-block",
                        background: `${row._cat.color}18`,
                        color: row._cat.color,
                        borderRadius: 100,
                        padding: "3px 10px",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: ".04em",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row._cat.label}
                    </span>
                  </div>
                )}

                {/* Course */}
                <div
                  data-label="Course"
                  style={{
                    fontFamily: "Fraunces,serif",
                    fontWeight: 600,
                    fontSize: 16,
                    color: row._cat.color,
                  }}
                >
                  {row.course}
                </div>

                {/* Specialization */}
                <div data-label="Specialization / Branch" style={{ fontSize: 14, color: C.slate, lineHeight: 1.45 }}>
                  {row.specialization || (
                    <span style={{ color: "rgba(86,104,91,.4)", fontStyle: "italic" }}>—</span>
                  )}
                </div>

                {/* Fee */}
                <div
                  data-label="Fee Per Year"
                  style={{
                    textAlign: "right",
                    fontFamily: "Fraunces,serif",
                    fontSize: 17,
                    fontWeight: 600,
                    color: C.navy,
                  }}
                >
                  {fmt(row.fee)}
                  <span style={{ fontSize: 11, fontFamily: "inherit", color: C.slate, fontWeight: 400, display: "block" }}>
                    per annum
                  </span>
                </div>

              </div>
            ))}
          </div>
        </Reveal>

        {/* Disclaimer note */}
        <Reveal delay="d3">
          <p
            style={{
              fontSize: 12.5,
              color: C.slate,
              marginTop: 20,
              opacity: 0.8,
              lineHeight: 1.6,
            }}
          >
            * Fee figures are indicative and subject to revision. Seat intake is as per regulatory approvals. Hostel, transport, and examination fees are charged separately.
          </p>
        </Reveal>
      </section>

      {/* SCHOLARSHIP + ENQUIRY CTA */}
      <section className="sec" style={{ background: C.ivory }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 28 }}>

          {/* Scholarship card */}
          <Reveal>
            <div
              style={{
                background: `linear-gradient(135deg,${C.navy},${C.ink})`,
                borderRadius: 24,
                padding: "40px 36px",
                color: C.ivory,
                height: "100%",
              }}
            >
              <span className="eyebrow" style={{ color: C.goldL }}>Financial Aid</span>
              <h3 style={{ color: C.ivory, marginTop: 14, fontSize: 24 }}>
                Scholarships &amp; fee waivers available.
              </h3>
              <p style={{ color: "rgba(247,244,236,.7)", marginTop: 12, fontSize: 14.5, lineHeight: 1.65 }}>
                Merit and need-based aid is available across programmes. Top entrance scorers and
                students from economically weaker sections may qualify for partial or full fee waiver.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 24 }}>
                {[
                  "Merit scholarships for top entrance scorers",
                  "Need-based financial aid",
                  "Education loan assistance guidance",
                  "Installment-based fee payment options",
                ].map((x) => (
                  <div key={x} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}>
                    <ChevronRight size={15} color={C.goldL} style={{ flexShrink: 0 }} />
                    {x}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Contact card */}
          <Reveal delay="d2">
            <div
              style={{
                background: "#fff",
                borderRadius: 24,
                padding: "40px 36px",
                border: "1px solid rgba(11,44,24,.08)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <span className="eyebrow">Admissions Cell</span>
                <h3 style={{ marginTop: 14, fontSize: 24 }}>Have a question about fees?</h3>
                <p style={{ color: C.slate, marginTop: 12, fontSize: 14.5, lineHeight: 1.65 }}>
                  Our counsellors are happy to walk you through programme fees, scholarship eligibility,
                  and payment schedules. Reach us any working day.
                </p>
              </div>
              <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 14 }}>
                <a
                  href={`tel:${CONTACT.tollFree.replace(/-/g, "")}`}
                  className="btn btn-em"
                >
                  <Phone size={16} /> Call Admissions — {CONTACT.tollFree}
                </a>
              </div>
            </div>
          </Reveal>

        </div>
      </section>
    </>
  );
}
