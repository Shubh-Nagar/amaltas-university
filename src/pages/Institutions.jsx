import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { PageHero } from "../components/Layout.jsx";
import { Reveal, Tilt } from "../components/Primitives.jsx";
import { C } from "../theme.js";
import { INSTITUTIONS } from "../data/content.js";

export default function Institutions() {
  return (
    <>
      <PageHero
        crumb="Institutions"
        eyebrow="Seven worlds, one campus"
        title="Choose where you'll change a life."
        sub="From modern medicine to classical Ayurveda, nursing to rehabilitation — every Amaltas institution is built around a single working hospital."
        bgImg="/assets/images%20of%20university/all%20institutes/nursing.jpeg"
        floatImg="/assets/images%20of%20university/campus%20life/student-back.png"
      />

      <section className="sec wrap" style={{ paddingTop: 80 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(330px,1fr))", gap: 24 }}>
          {INSTITUTIONS.map((it, i) => {
            const Icon = it.icon;
            return (
              <Reveal key={i} delay={`d${(i % 3) + 1}`}>
                <Tilt className="inst-card">
                  <div className="ic"><Icon size={26} /></div>
                  <span className="inst-tag">{it.tag}</span>
                  <h3>{it.name}</h3>
                  <p style={{ color: C.slate, fontSize: 14.5, marginBottom: 16 }}>{it.desc}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
                    {it.programs.map((p) => (
                      <div key={p} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 14, color: C.ink }}>
                        <Check size={15} color={C.emerald} /> {p}
                      </div>
                    ))}
                  </div>
                  <Link to="/admissions" style={{ display: "inline-flex", alignItems: "center", gap: 7, color: C.emerald, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
                    Admission details <ArrowUpRight size={16} />
                  </Link>
                </Tilt>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="sec wrap" style={{ paddingTop: 0 }}>
        <Reveal>
          <div style={{ background: `linear-gradient(120deg,${C.navy},${C.ink})`, borderRadius: 30, padding: "56px 48px", color: C.ivory, textAlign: "center" }}>
            <h2 style={{ color: C.ivory }}>Not sure which path is yours?</h2>
            <p style={{ color: "rgba(247,244,236,.74)", maxWidth: 520, margin: "14px auto 28px" }}>
              Our admissions counsellors help you match your goals to the right programme — and walk you through eligibility, fees, and scholarships.
            </p>
            <Link to="/admissions" className="btn btn-gold">Talk to admissions <ArrowRight size={18} /></Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
