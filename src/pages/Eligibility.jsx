import React, { useState } from "react";
import { ChevronRight, Phone, AlertCircle } from "lucide-react";
import { PageHero } from "../components/Layout.jsx";
import { Reveal } from "../components/Primitives.jsx";
import { C } from "../theme.js";
import { CONTACT } from "../data/content.js";
import SEO from "../components/SEO.jsx";
import { breadcrumbSchema } from "../data/schema.js";

const CATEGORIES = [
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

const ALL_CAT = { id: "all", label: "All", color: C.navy };

export default function Eligibility() {
  const [active, setActive] = useState("all");

  const isAll = active === "all";
  const cat = isAll ? ALL_CAT : CATEGORIES.find((c) => c.id === active);

  const displayRows = isAll
    ? CATEGORIES.flatMap((c) => c.courses.map((r) => ({ ...r, _cat: c })))
    : CATEGORIES.find((c) => c.id === active).courses.map((r) => ({ ...r, _cat: cat }));

  return (
    <>
      <SEO
        title="Eligibility Criteria 2026-27 — Programme-Wise Requirements"
        description="Check programme-wise eligibility for Amaltas University, Dewas: MBBS, MD/MS, BAMS, BHMS, B.Sc Nursing, B.Pharm, BPT and paramedical courses, including NEET UG/PG/SS and 12th-standard requirements."
        path="/admissions/eligibility"
        jsonLd={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Admissions", path: "/admissions" }, { name: "Eligibility Criteria", path: "/admissions/eligibility" }])}
      />
      <PageHero
        crumb="Admissions / Eligibility Criteria"
        eyebrow="Eligibility Criteria 2026–27"
        title="Find out if you qualify."
        sub="Essential qualifications for every programme offered at Amaltas University. Check the entrance requirement and subject combination before applying."
        bgImg="/assets/images%20of%20university/photo-gallery/2U8A8968.jpg"
      />

      {/* LEGEND */}
      <section className="wrap" style={{ paddingTop: 48 }}>
        <Reveal>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            alignItems: "center",
            padding: "16px 22px",
            background: "rgba(11,44,24,.04)",
            borderRadius: 14,
            border: "1px solid rgba(11,44,24,.08)",
          }}>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: C.slate, marginRight: 6 }}>Key:</span>
            <span style={{ fontSize: 12, color: C.slate }}>PCB = Physics · Chemistry · Biology &nbsp;|&nbsp; PCM = Physics · Chemistry · Maths &nbsp;|&nbsp; PNST = Pre-Nursing Selection Test</span>
          </div>
        </Reveal>
      </section>

      {/* MAIN SECTION */}
      <section className="sec wrap" style={{ paddingTop: 48 }}>
        <Reveal>
          <span className="eyebrow">Browse by discipline</span>
          <h2 style={{ marginTop: 8 }}>Select a programme category.</h2>
        </Reveal>

        {/* Tabs */}
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

        {/* Table */}
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
            {/* Header */}
            <div className="data-table-row" style={{
              display: "grid",
              gridTemplateColumns: isAll ? "190px 220px 1fr" : "220px 1fr",
              background: cat.color,
              padding: "14px 28px",
              color: "#fff",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: ".12em",
              textTransform: "uppercase",
              gap: 16,
            }}>
              {isAll && <span>Category</span>}
              <span>Course</span>
              <span>Essential Qualification</span>
            </div>

            {/* Rows */}
            {displayRows.map((row, i) => (
              <div
                key={i}
                className="data-table-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: isAll ? "190px 220px 1fr" : "220px 1fr",
                  padding: "18px 28px",
                  background: i % 2 === 0 ? "#fff" : "rgba(247,245,236,.55)",
                  borderBottom: i < displayRows.length - 1 ? "1px solid rgba(11,44,24,.06)" : "none",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                {/* Category badge */}
                {isAll && (
                  <div>
                    <span style={{
                      display: "inline-block",
                      background: `${row._cat.color}18`,
                      color: row._cat.color,
                      borderRadius: 100,
                      padding: "3px 10px",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: ".04em",
                    }}>
                      {row._cat.label}
                    </span>
                  </div>
                )}

                {/* Course */}
                <div style={{
                  fontFamily: "Fraunces,serif",
                  fontWeight: 600,
                  fontSize: 15.5,
                  color: row._cat.color,
                  lineHeight: 1.3,
                }}>
                  {row.course}
                </div>

                {/* Eligibility */}
                <div style={{ fontSize: 14, color: C.slate, lineHeight: 1.55 }}>
                  <ChevronRight size={13} style={{ display: "inline", marginRight: 4, color: row._cat.color, verticalAlign: "middle" }} />
                  {row.eligibility}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Disclaimer */}
        <Reveal delay="d3">
          <div style={{
            display: "flex",
            gap: 10,
            alignItems: "flex-start",
            marginTop: 20,
            padding: "14px 18px",
            background: "rgba(246,224,5,.1)",
            borderRadius: 12,
            border: "1px solid rgba(246,224,5,.35)",
          }}>
            <AlertCircle size={15} color="#92400e" style={{ flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontSize: 12.5, color: "#92400e", lineHeight: 1.6 }}>
              Eligibility criteria are subject to regulatory updates from the respective statutory councils (NMC, NCISM, NCH, INC, PCI, RCI, Paramedical Council). NEET UG / NEET PG / NEET SS scores are mandatory for Medical Sciences, Ayurveda and Homoeopathy programmes as per NMC / NCISM / NCH guidelines; Nursing programmes follow UGC and Nursing Council norms. Verify the latest guidelines before applying.
            </p>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="sec" style={{ background: C.ivory }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 28 }}>

          <Reveal>
            <div style={{
              background: `linear-gradient(135deg,${C.navy},${C.ink})`,
              borderRadius: 24,
              padding: "40px 36px",
              color: C.ivory,
              height: "100%",
            }}>
              <span className="eyebrow" style={{ color: C.goldL }}>Not sure you qualify?</span>
              <h3 style={{ color: C.ivory, marginTop: 14, fontSize: 24 }}>Speak to an admission counsellor.</h3>
              <p style={{ color: "rgba(247,244,236,.7)", marginTop: 12, fontSize: 14.5, lineHeight: 1.65 }}>
                Our team will review your academic profile and guide you to the right programme — including scholarship options and relaxation categories.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 28 }}>
                {[
                  "Profile assessment & programme matching",
                  "NEET score guidance & cutoff reference",
                  "SC/ST & OBC relaxation advisory",
                  "Scholarship eligibility check",
                ].map((x) => (
                  <div key={x} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}>
                    <ChevronRight size={14} color={C.goldL} style={{ flexShrink: 0 }} />
                    {x}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay="d2">
            <div style={{
              background: "#fff",
              borderRadius: 24,
              padding: "40px 36px",
              border: "1px solid rgba(11,44,24,.08)",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}>
              <div>
                <span className="eyebrow">Admissions Cell</span>
                <h3 style={{ marginTop: 14, fontSize: 24 }}>Ready to apply?</h3>
                <p style={{ color: C.slate, marginTop: 12, fontSize: 14.5, lineHeight: 1.65 }}>
                  Applications for 2026–27 are open. Once you confirm your eligibility, our counsellors can walk you through the next steps — from document submission to seat confirmation.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 32 }}>
                <a href={`tel:${CONTACT.tollFree.replace(/-/g, "")}`} className="btn btn-em">
                  <Phone size={16} /> Call — {CONTACT.tollFree}
                </a>
              </div>
            </div>
          </Reveal>

        </div>
      </section>
    </>
  );
}
