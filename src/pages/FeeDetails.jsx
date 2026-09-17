import React, { useState } from "react";
import { IndianRupee, ChevronRight, Phone } from "lucide-react";
import { PageHero } from "../components/Layout.jsx";
import { Reveal } from "../components/Primitives.jsx";
import { C } from "../theme.js";
import { CONTACT } from "../data/content.js";
import SEO from "../components/SEO.jsx";
import { breadcrumbSchema } from "../data/schema.js";
import { FEE_CATEGORIES } from "../data/admissions.js";

const CATEGORIES = FEE_CATEGORIES;

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
