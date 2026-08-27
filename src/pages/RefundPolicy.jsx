import React from "react";
import { ChevronRight, Phone, Mail, AlertCircle } from "lucide-react";
import { PageHero } from "../components/Layout.jsx";
import { Reveal } from "../components/Primitives.jsx";
import { C } from "../theme.js";
import { CONTACT } from "../data/content.js";
import SEO from "../components/SEO.jsx";
import { breadcrumbSchema } from "../data/schema.js";

const AUTHORITIES = [
  { name: "UGC", full: "University Grants Commission", color: C.emerald },
  { name: "NMC", full: "National Medical Commission", color: C.burg },
  { name: "Other statutory authorities", full: "As applicable to the programme", color: "#1a6fa6" },
];

export default function RefundPolicy() {
  return (
    <>
      <SEO
        title="Refund Policy — Amaltas University, Dewas"
        description="Amaltas University follows the refund regulations prescribed by the University Grants Commission (UGC), the National Medical Commission (NMC) and other applicable statutory authorities, as amended from time to time."
        path="/admissions/refund-policy"
        jsonLd={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Admissions", path: "/admissions" }, { name: "Refund Policy", path: "/admissions/refund-policy" }])}
      />
      <PageHero
        crumb="Admissions / Refund Policy"
        eyebrow="Refund Policy"
        title="Fee refunds, governed by regulation."
        sub="Refunds at Amaltas University are processed strictly in accordance with the norms laid down by the statutory regulatory bodies governing each programme."
        bgImg="/assets/images%20of%20university/photo-gallery/2U8A8968.jpg"
      />

      {/* POLICY STATEMENT */}
      <section className="sec wrap" style={{ paddingTop: 56 }}>
        <Reveal>
          <span className="eyebrow">Policy statement</span>
        </Reveal>

        <Reveal delay="d1">
          <div style={{
            marginTop: 24,
            background: "#fff",
            border: "1px solid rgba(11,44,24,.09)",
            borderLeft: `4px solid ${C.emerald}`,
            borderRadius: 20,
            padding: "38px 40px",
            boxShadow: "0 8px 40px -16px rgba(11,44,24,.14)",
          }}>
            <p style={{
              fontFamily: "Fraunces,serif",
              fontSize: 20,
              lineHeight: 1.7,
              color: C.ink,
              fontWeight: 500,
            }}>
              The Institute follows the refund regulations prescribed by the University Grants Commission (UGC), the National Medical Commission (NMC), and other applicable statutory authorities, as amended from time to time.
            </p>
          </div>
        </Reveal>

        {/* Governing bodies */}
        <Reveal delay="d2">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: 18,
            marginTop: 28,
          }}>
            {AUTHORITIES.map((a) => (
              <div key={a.name} style={{
                background: `${a.color}0d`,
                border: `1px solid ${a.color}26`,
                borderRadius: 16,
                padding: "22px 24px",
              }}>
                <div style={{
                  fontFamily: "Fraunces,serif",
                  fontWeight: 600,
                  fontSize: 17,
                  color: a.color,
                  lineHeight: 1.3,
                }}>
                  {a.name}
                </div>
                <div style={{ fontSize: 13.5, color: C.slate, marginTop: 8, lineHeight: 1.55 }}>
                  {a.full}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Note */}
        <Reveal delay="d3">
          <div style={{
            display: "flex",
            gap: 10,
            alignItems: "flex-start",
            marginTop: 24,
            padding: "14px 18px",
            background: "rgba(246,224,5,.1)",
            borderRadius: 12,
            border: "1px solid rgba(246,224,5,.35)",
          }}>
            <AlertCircle size={15} color="#92400e" style={{ flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontSize: 12.5, color: "#92400e", lineHeight: 1.6 }}>
              Refund norms are revised by the regulatory councils from time to time. The regulations in force on the date of the refund request shall apply. For programme-specific clarification, please write to the Admissions Cell.
            </p>
          </div>
        </Reveal>
      </section>

      {/* CONTACT */}
      <section className="sec" style={{ background: C.ivory }}>
        <div className="wrap">
          <Reveal>
            <div style={{
              background: `linear-gradient(135deg,${C.navy},${C.ink})`,
              borderRadius: 24,
              padding: "40px 36px",
              color: C.ivory,
            }}>
              <span className="eyebrow" style={{ color: C.goldL }}>Need clarification?</span>
              <h3 style={{ color: C.ivory, marginTop: 14, fontSize: 24 }}>Talk to the Admissions Cell.</h3>
              <p style={{ color: "rgba(247,244,236,.7)", marginTop: 12, fontSize: 14.5, lineHeight: 1.65, maxWidth: 640 }}>
                For queries on fee refunds, withdrawal timelines or the documents required to initiate a request, our team will guide you through the applicable regulation for your programme.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 28 }}>
                <a href={`tel:${CONTACT.tollFree.replace(/-/g, "")}`} className="btn btn-em">
                  <Phone size={16} /> Call — {CONTACT.tollFree}
                </a>
                <a href={`mailto:${CONTACT.email}`} className="btn btn-ghost">
                  <Mail size={16} /> {CONTACT.email}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
