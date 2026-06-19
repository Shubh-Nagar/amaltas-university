import React, { useState, useEffect } from "react";
import { ArrowRight, ArrowUpRight, Phone, Calendar, Check } from "lucide-react";
import { PageHero } from "../components/Layout.jsx";
import { Reveal } from "../components/Primitives.jsx";
import { C } from "../theme.js";
import { PROGRAMS, FILTERS, CONTACT } from "../data/content.js";

function Countdown() {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const target = new Date();
    target.setMonth(target.getMonth() + 2);
    const tick = () => {
      const diff = Math.max(0, target - new Date());
      setT({
        d: Math.floor(diff / 864e5),
        h: Math.floor(diff / 36e5) % 24,
        m: Math.floor(diff / 6e4) % 60,
        s: Math.floor(diff / 1e3) % 60,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ display: "flex", gap: 12 }}>
      {[["d", "Days"], ["h", "Hrs"], ["m", "Min"], ["s", "Sec"]].map(([k, l]) => (
        <div className="count-box" key={k}>
          <div className="cn">{String(t[k]).padStart(2, "0")}</div>
          <div className="cl">{l}</div>
        </div>
      ))}
    </div>
  );
}

const STEPS = [
  { t: "Enquire", d: "Submit the enquiry form or call our admissions cell to begin." },
  { t: "Counselling", d: "Match your goals to the right programme with a counsellor." },
  { t: "Apply & Verify", d: "Complete your application and submit eligibility documents." },
  { t: "Confirm Seat", d: "Pay the admission fee and secure your place in the 2026–27 cohort." },
];

export default function Admissions() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? PROGRAMS : PROGRAMS.filter((p) => p.t === filter);

  return (
    <>
      <PageHero
        crumb="Admissions"
        eyebrow="Admissions 2026–27 are open"
        title="Your first step toward a life in healthcare."
        sub="Applications for MBBS, BAMS, BHMS, Nursing, Pharmacy and Allied Sciences are live. Begin now — the intake window closes soon."
      />

      {/* COUNTDOWN BAND */}
      <section className="wrap" style={{ marginTop: -50, position: "relative", zIndex: 5 }}>
        <div style={{ background: "#fff", borderRadius: 22, padding: "30px 34px", border: "1px solid rgba(11,44,24,.07)", boxShadow: "0 40px 90px -55px rgba(11,44,24,.5)", display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <span className="eyebrow"><Calendar size={14} /> Next intake closes in</span>
            <h3 style={{ fontSize: 24, marginTop: 8 }}>Seats fill in the order dreams arrive.</h3>
          </div>
          <Countdown />
        </div>
      </section>

      {/* PROGRAMS EXPLORER */}
      <section className="sec wrap" style={{ paddingTop: 80 }}>
        <Reveal>
          <span className="eyebrow">Find your programme</span>
          <h2>Ten ways to begin.</h2>
        </Reveal>
        <Reveal delay="d1">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, margin: "30px 0 8px" }}>
            {FILTERS.map((f) => (
              <button key={f} className={`chip light ${filter === f ? "on" : ""}`} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>
        </Reveal>
        <div style={{ marginTop: 14 }}>
          {filtered.map((p, i) => (
            <Reveal key={p.n} delay={`d${(i % 4) + 1}`}>
              <div className="prog">
                <div className="pl">
                  <span style={{ fontFamily: "Fraunces,serif", color: C.burg, fontSize: 15, width: 34 }}>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <div className="pn">{p.n}</div>
                    <div style={{ color: C.slate, fontSize: 13.5 }}>{p.d}</div>
                  </div>
                </div>
                <ArrowUpRight className="arrow" size={26} />
              </div>
            </Reveal>
          ))}
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
      <section className="sec wrap" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 50, alignItems: "start" }}>
        <Reveal>
          <span className="eyebrow">Admission enquiry</span>
          <h2 style={{ fontSize: "clamp(1.9rem,4vw,2.8rem)" }}>Tell us about you.</h2>
          <p className="lead">A counsellor will reach out within one working day.</p>
          <div className="npf_wgts" data-height="400px" data-w="b9e07b3b3898e1f019ca0c25a842d922" style={{ marginTop: 28 }} />
          <p style={{ fontSize: 13, color: C.slate, marginTop: 16 }}>
            Or call our admissions cell — Toll free <a href={`tel:${CONTACT.tollFree.replace(/-/g, "")}`} style={{ color: C.emerald, fontWeight: 600 }}>{CONTACT.tollFree}</a>
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
