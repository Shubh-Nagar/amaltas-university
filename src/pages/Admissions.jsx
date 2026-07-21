import React, { useState, useEffect } from "react";
import {
  ArrowRight, ArrowUpRight, Phone, Check,
  Stethoscope, HeartPulse, Activity, GraduationCap, FlaskConical, Microscope, Brain,
} from "lucide-react";
import { PageHero } from "../components/Layout.jsx";
import { Reveal } from "../components/Primitives.jsx";
import { C } from "../theme.js";
import { PROGRAMS, FILTERS, CONTACT, DEPARTMENT_HIGHLIGHTS } from "../data/content.js";

/* category → icon + accent colours for the programme cards */
const CAT_META = {
  Medical:     { icon: Stethoscope,   pc: "#12863F", pc2: "#23A653", soft: "rgba(18,134,63,.10)" },
  Ayurveda:    { icon: HeartPulse,    pc: "#2E7D32", pc2: "#4CAF50", soft: "rgba(46,125,50,.10)" },
  Homoeopathy: { icon: Activity,      pc: "#147D6F", pc2: "#2CA594", soft: "rgba(20,125,111,.11)" },
  Nursing:     { icon: GraduationCap, pc: "#872822", pc2: "#B24A3E", soft: "rgba(135,40,34,.09)" },
  Pharmacy:    { icon: FlaskConical,  pc: "#9A6B04", pc2: "#C79215", soft: "rgba(154,107,4,.12)" },
  Paramedical: { icon: Microscope,    pc: "#0B2C18", pc2: "#1C5E35", soft: "rgba(11,44,24,.08)" },
  Allied:      { icon: Brain,         pc: "#A8392E", pc2: "#C85A4C", soft: "rgba(168,57,46,.10)" },
};
const catMeta = (t) => CAT_META[t] || CAT_META.Medical;

const STEPS = [
  { t: "Enquire", d: "Submit the enquiry form or call our admissions cell to begin." },
  { t: "Counselling", d: "Match your goals to the right programme with a counsellor." },
  { t: "Apply & Verify", d: "Complete your application and submit eligibility documents." },
  { t: "Confirm Seat", d: "Pay the admission fee and secure your place in the 2026–27 cohort." },
];

export default function Admissions() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? PROGRAMS : PROGRAMS.filter((p) => p.t === filter);

  const [openProgram, setOpenProgram] = useState(null);

  return (
    <>
      <PageHero
        crumb="Admissions"
        eyebrow="Admissions 2026–27 are open"
        title="Your first step toward a life in healthcare."
        sub="Applications for MBBS, BAMS, BHMS, Nursing, Pharmacy and Allied Sciences are live. Begin now — the intake window closes soon."
        bgImg="/assets/images%20of%20university/campus%20life/degree.JPG"
      />

      {/* PROGRAMS EXPLORER */}
      <section className="sec wrap" style={{ paddingTop: 80 }}>
        <Reveal>
          <span className="eyebrow">Find your programme</span>
          <h2>{PROGRAMS.length} ways to begin.</h2>
        </Reveal>
        <Reveal delay="d1">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, margin: "30px 0 8px" }}>
            {FILTERS.map((f) => (
              <button key={f} className={`chip light ${filter === f ? "on" : ""}`} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>
        </Reveal>
        <div className="prog-grid" style={{ marginTop: 24 }}>
          {filtered.map((p, i) => {
            const m = catMeta(p.t);
            const Icon = m.icon;
            const isOpen = openProgram === p.n;
            const dept = DEPARTMENT_HIGHLIGHTS.find((d) => d.id === p.t);
            return (
              <React.Fragment key={p.n}>
                <Reveal delay={`d${(i % 4) + 1}`}>
                  <div
                    className="prog-card"
                    style={{
                      "--pc": m.pc, "--pc2": m.pc2, "--pc-soft": m.soft,
                      cursor: "pointer",
                      ...(isOpen ? { borderColor: m.pc, boxShadow: `0 26px 52px -32px ${m.pc}66` } : {}),
                    }}
                    onClick={() => setOpenProgram(isOpen ? null : p.n)}
                  >
                    <div className="prog-card-top">
                      <div className="prog-ic"><Icon size={20} /></div>
                      <span className="prog-cat">{p.t}</span>
                    </div>
                    <h3 className="prog-name">{p.n}</h3>
                    <p className="prog-desc">{p.d}</p>
                    <span className="prog-foot">
                      {isOpen ? "Hide department details" : "View department details"}
                      <ArrowUpRight size={14} style={{ transform: isOpen ? "rotate(135deg)" : "none", transition: "transform .25s" }} />
                    </span>
                  </div>
                </Reveal>

                {isOpen && dept && (
                  <div style={{ gridColumn: "1 / -1" }}>
                    <div style={{ background: "#fff", borderRadius: 20, border: `1px solid ${m.pc}33`, padding: "28px 32px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
                        <div>
                          <span className="eyebrow" style={{ color: m.pc }}>Department</span>
                          <h3 style={{ fontFamily: "Fraunces,serif", fontSize: 21, fontWeight: 500, marginTop: 8 }}>{dept.name}</h3>
                        </div>
                        <button className="chip light" onClick={() => setOpenProgram(null)}>Close</button>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16, marginTop: 22 }}>
                        {dept.highlights.map((h, hi) => (
                          <div key={hi} style={{ background: m.soft, borderRadius: 14, padding: "18px 20px" }}>
                            <Check size={16} color={m.pc} style={{ marginBottom: 8 }} />
                            <h4 style={{ fontSize: 14, marginBottom: 6 }}>{h.t}</h4>
                            <p style={{ color: C.slate, fontSize: 13, lineHeight: 1.5 }}>{h.d}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </section>

      {/* PROCESS */}
      <section className="sec" style={{ background: C.ivory }}>
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">How it works</span>
            <h2>Four steps to your seat.</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 22, marginTop: 50 }}>
            {STEPS.map((s, i) => (
              <Reveal key={i} delay={`d${i + 1}`}>
                <div className="card-lift" style={{ background: "#fff", borderRadius: 18, padding: 28, border: "1px solid rgba(11,44,24,.07)", height: "100%" }}>
                  <div style={{ fontFamily: "Fraunces,serif", fontSize: 40, color: C.burg, lineHeight: 1 }}>{i + 1}</div>
                  <h3 style={{ fontSize: 18, margin: "12px 0 6px" }}>{s.t}</h3>
                  <p style={{ color: C.slate, fontSize: 14 }}>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ENQUIRY + FEES/SCHOLARSHIP */}
      <section className="sec wrap admissions-split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 50, alignItems: "start" }}>
        <Reveal>
          <span className="eyebrow">Admission enquiry</span>
          <h2 style={{ fontSize: "clamp(1.9rem,4vw,2.8rem)" }}>Tell us about you.</h2>
          <p className="lead">A counsellor will reach out within one working day.</p>
          <div className="npf_wgts" data-height="400px" data-w="b9e07b3b3898e1f019ca0c25a842d922" style={{ marginTop: 28 }} />
          <p style={{ fontSize: 13, color: C.slate, marginTop: 16 }}>
            Or call our admissions cell — <a href={`tel:${CONTACT.tollFree.replace(/-/g, "")}`} style={{ color: C.emerald, fontWeight: 600 }}>{CONTACT.tollFree}</a>
          </p>
        </Reveal>

        <Reveal delay="d2">
          <div style={{ background: `linear-gradient(135deg,${C.navy},${C.ink})`, borderRadius: 24, padding: 40, color: C.ivory }}>
            <h3 style={{ fontSize: 24, color: C.ivory }}>Fees &amp; Scholarships</h3>
            <p style={{ color: "rgba(247,244,236,.72)", marginTop: 12 }}>
              We believe talent — not tuition — should decide who heals tomorrow. Merit and
              need-based aid is available across programmes.
            </p>
            <div style={{ display: "grid", gap: 14, marginTop: 24 }}>
              {["Merit scholarships for top entrance scorers", "Need-based financial aid", "Transparent, programme-wise fee structure", "Education loan assistance guidance"].map((x) => (
                <div key={x} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 14.5 }}>
                  <Check size={16} color={C.goldL} /> {x}
                </div>
              ))}
            </div>
            <a href={`tel:${CONTACT.tollFree.replace(/-/g, "")}`} className="btn btn-ghost" style={{ marginTop: 28 }}>
              <Phone size={16} /> Speak to admissions
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
