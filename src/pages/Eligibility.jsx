import React, { useState } from "react";
import { Download, BookOpen, ChevronRight, Phone, AlertCircle } from "lucide-react";
import { PageHero } from "../components/Layout.jsx";
import { Reveal } from "../components/Primitives.jsx";
import { C } from "../theme.js";
import { CONTACT } from "../data/content.js";

const TAG_STYLES = {
  NEET:          { bg: "#fef2f2", color: "#b91c1c", border: "#fecaca" },
  "NEET PG":     { bg: "#fff7ed", color: "#c2410c", border: "#fed7aa" },
  "NEET SS":     { bg: "#fdf4ff", color: "#7c3aed", border: "#e9d5ff" },
  "Any Stream":  { bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" },
  "SC/ST –5%":   { bg: "#fffbeb", color: "#92400e", border: "#fde68a" },
};

function Tag({ label }) {
  const s = TAG_STYLES[label] || { bg: "#f1f5f9", color: "#475569", border: "#cbd5e1" };
  return (
    <span style={{
      display: "inline-block",
      background: s.bg,
      color: s.color,
      border: `1px solid ${s.border}`,
      borderRadius: 100,
      padding: "2px 10px",
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: ".04em",
      whiteSpace: "nowrap",
    }}>
      {label}
    </span>
  );
}

const CATEGORIES = [
  {
    id: "medical",
    label: "Medical",
    color: C.burg,
    courses: [
      { course: "MBBS",  eligibility: "12th passed with Physics, Chemistry & Biology",      tags: ["NEET"] },
      { course: "BAMS",  eligibility: "12th passed with Physics, Chemistry & Biology",      tags: ["NEET"] },
      { course: "BHMS",  eligibility: "12th passed with Physics, Chemistry & Biology",      tags: ["NEET"] },
      { course: "MD / MS",         eligibility: "MBBS from a recognised institution",       tags: ["NEET PG"] },
      { course: "DM – Cardiology", eligibility: "MD/MS/DNB in General Medicine, Pediatrics or Respiratory Medicine from an NMC-recognised institution", tags: ["NEET SS"] },
      { course: "DM – Nephrology", eligibility: "MD/DNB in General Medicine or Paediatrics from an NMC-recognised institution",                         tags: ["NEET SS"] },
      { course: "M.Ch – Neurosurgery", eligibility: "MS/DNB (General Surgery) from an NMC-recognised institution",                                      tags: ["NEET SS"] },
      { course: "M.Ch – Urology",      eligibility: "MS/DNB (General Surgery) from an NMC-recognised institution",                                      tags: ["NEET SS"] },
    ],
  },
  {
    id: "nursing",
    label: "Nursing",
    color: "#a0522d",
    courses: [
      { course: "B.Sc Nursing",          eligibility: "12th with PCB + PNST (Pre-Nursing Selection Test)",                   tags: [] },
      { course: "PB B.Sc Nursing",       eligibility: "12th with PCB + GNM with minimum 45% marks",                          tags: ["SC/ST –5%"] },
      { course: "GNM",                   eligibility: "12th with PCB or Vocational Courses",                                  tags: [] },
      { course: "M.Sc Nursing",          eligibility: "B.Sc Nursing / Post Basic B.Sc Nursing with minimum 55% marks",       tags: [] },
    ],
  },
  {
    id: "allied",
    label: "Allied Health Sciences",
    color: "#5a3e8a",
    courses: [
      { course: "BPT",               eligibility: "12th with PCB",           tags: [] },
      { course: "BMLT",              eligibility: "12th with PCB",           tags: [] },
      { course: "BXRT",              eligibility: "12th with PCB",           tags: [] },
      { course: "DMLT",              eligibility: "12th with PCB",           tags: [] },
      { course: "Dialysis Tech.",    eligibility: "12th with PCB / PCMB",    tags: [] },
      { course: "Cath Lab Tech.",    eligibility: "12th with PCB",           tags: [] },
      { course: "OT Technician",     eligibility: "12th with PCM / PCB",     tags: [] },
      { course: "USG Technician",    eligibility: "12th with PCB",           tags: [] },
    ],
  },
  {
    id: "psychology",
    label: "Psychology & Rehab",
    color: "#7a5c1a",
    courses: [
      { course: "B.Sc Clinical Psychology",       eligibility: "12th with PCB / PCMB",                                                           tags: [] },
      { course: "BASLP",                           eligibility: "10+2 with Physics, Chemistry, Biology / Mathematics / Computer Science / Psychology", tags: [] },
      { course: "ISITEP (HI)",                    eligibility: "12th in any stream",                                                              tags: ["Any Stream"] },
      { course: "ISITEP (ID)",                    eligibility: "12th in any stream",                                                              tags: ["Any Stream"] },
      { course: "Prof. Diploma – Clinical Psych", eligibility: "M.A. / M.Sc. in Psychology (Clinical, Counselling, or Applied)",                  tags: [] },
    ],
  },
  {
    id: "pharmacy",
    label: "Pharmacy",
    color: "#1a7a6e",
    courses: [
      { course: "B.Pharm", eligibility: "12th with PCM / PCB / PCMB", tags: [] },
      { course: "D.Pharm", eligibility: "12th with PCM / PCB / PCMB", tags: [] },
    ],
  },
  {
    id: "science",
    label: "Sciences & Arts",
    color: "#2d5a8a",
    courses: [
      { course: "BSc (Hons) Agriculture", eligibility: "12th with PCM / PCB / PCMB / Agriculture",                                          tags: [] },
      { course: "BSc Biochemistry",       eligibility: "12th with PCM / PCB",                                                               tags: [] },
      { course: "BSc Microbiology",       eligibility: "12th with PCB",                                                                     tags: [] },
      { course: "BSc Biotechnology",      eligibility: "12th with PCM / PCB",                                                               tags: [] },
      { course: "BA",                     eligibility: "12th in any stream",                                                                 tags: ["Any Stream"] },
      { course: "M.Sc Biochemistry",      eligibility: "B.Sc in Biochemistry, Chemistry, Life Sciences or related fields",                  tags: ["SC/ST –5%"] },
      { course: "M.Sc Microbiology",      eligibility: "B.Sc in Microbiology, Biotechnology, Botany, Zoology, Agriculture or Allied Sciences", tags: ["SC/ST –5%"] },
      { course: "M.Sc Biotechnology",     eligibility: "B.Sc in Biochemistry, Chemistry, Life Sciences or related fields",                  tags: ["SC/ST –5%"] },
      { course: "MA",                     eligibility: "Any UG 3-Year Degree",                                                              tags: [] },
    ],
  },
  {
    id: "commerce",
    label: "Commerce & Management",
    color: "#1a5c8a",
    courses: [
      { course: "BBA", eligibility: "12th in any stream",    tags: ["Any Stream"] },
      { course: "B.Com", eligibility: "12th in any stream",  tags: ["Any Stream"] },
      { course: "MBA",   eligibility: "Any UG 3-Year Degree", tags: [] },
    ],
  },
  {
    id: "library",
    label: "Library & Design",
    color: "#4a6741",
    courses: [
      { course: "B.Lib Sci",  eligibility: "Bachelor's Degree in any stream", tags: ["SC/ST –5%"] },
      { course: "M.Lib Sci",  eligibility: "UG in Library & Information Science (B.Lib.I.Sc) or Bachelor of Library Science (B.Lib.Sc)", tags: [] },
      { course: "B.Design",   eligibility: "12th in any stream",               tags: ["Any Stream"] },
    ],
  },
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
      <PageHero
        crumb="Admissions / Eligibility Criteria"
        eyebrow="Eligibility Criteria 2026–27"
        title="Find out if you qualify."
        sub="Essential qualifications for every programme offered at Amaltas University. Check the entrance requirement and subject combination before applying."
      />

      {/* DOWNLOAD BAND */}
      <section className="wrap" style={{ marginTop: -44, position: "relative", zIndex: 5 }}>
        <div style={{
          background: "#fff",
          borderRadius: 20,
          padding: "22px 32px",
          border: "1px solid rgba(11,44,24,.08)",
          boxShadow: "0 30px 80px -40px rgba(11,44,24,.38)",
          display: "flex",
          flexWrap: "wrap",
          gap: 18,
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: 15, color: C.navy }}>Download the official eligibility structure</p>
            <p style={{ fontSize: 13, color: C.slate, marginTop: 4 }}>PDF issued by Amaltas University Dewas</p>
          </div>
          <a
            href="/assets/docs/ELIGIBILITY STRUCTURE.docx - Google Docs.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-burg"
          >
            <Download size={16} /> Download PDF
          </a>
        </div>
      </section>

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
            {Object.entries(TAG_STYLES).map(([label]) => <Tag key={label} label={label} />)}
            <span style={{ fontSize: 12, color: C.slate, marginLeft: 4 }}>PCB = Physics · Chemistry · Biology &nbsp;|&nbsp; PCM = Physics · Chemistry · Maths</span>
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
            style={{
              marginTop: 36,
              borderRadius: 20,
              overflow: "hidden",
              border: "1px solid rgba(11,44,24,.09)",
              boxShadow: "0 8px 40px -16px rgba(11,44,24,.14)",
            }}
          >
            {/* Header */}
            <div style={{
              display: "grid",
              gridTemplateColumns: isAll ? "140px 160px 1fr 160px" : "160px 1fr 160px",
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
              <span style={{ textAlign: "right" }}>Requirement</span>
            </div>

            {/* Rows */}
            {displayRows.map((row, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: isAll ? "140px 160px 1fr 160px" : "160px 1fr 160px",
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

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "flex-end" }}>
                  {row.tags.length > 0
                    ? row.tags.map((t) => <Tag key={t} label={t} />)
                    : <span style={{ fontSize: 12, color: "rgba(86,104,91,.35)" }}>—</span>
                  }
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
              Eligibility criteria are subject to regulatory updates. NEET / NEET PG / NEET SS scores are mandatory for medical programmes as per NMC guidelines.
              5% marks relaxation for SC/ST candidates applies where indicated. Verify the latest guidelines before applying.
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
                <a
                  href="/assets/docs/ELIGIBILITY STRUCTURE.docx - Google Docs.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-dark"
                >
                  <Download size={16} /> Download Eligibility PDF
                </a>
              </div>
            </div>
          </Reveal>

        </div>
      </section>
    </>
  );
}
