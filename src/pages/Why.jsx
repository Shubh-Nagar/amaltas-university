import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageHero } from "../components/Layout.jsx";
import { Reveal, StatNum } from "../components/Primitives.jsx";
import { useInView } from "../hooks/useScroll.js";
import { C } from "../theme.js";
import { WHY, STATS } from "../data/content.js";

function StatStrip() {
  const [ref, seen] = useInView({ threshold: 0.4 });
  return (
    <div ref={ref} className="statgrid" style={{ background: "#fff", borderRadius: 24, border: "1px solid rgba(11,44,24,.06)", boxShadow: "0 40px 90px -55px rgba(11,44,24,.4)" }}>
      {STATS.map((s, i) => (
        <div className="stat" key={i}>
          <StatNum v={s.v} suf={s.suf} run={seen} />
          <div style={{ color: C.slate, marginTop: 10, fontSize: 14.5, fontWeight: 500 }}>{s.l}</div>
        </div>
      ))}
    </div>
  );
}

export default function Why() {
  return (
    <>
      <PageHero
        crumb="Why Amaltas"
        eyebrow="The Amaltas difference"
        title="Reasons families trust us with their dreams."
        sub="A medical education shouldn't feel like a factory. Here is what makes Amaltas different — and why our students stay close long after graduation."
      />

      <section className="wrap" style={{ marginTop: -50, position: "relative", zIndex: 5 }}>
        <StatStrip />
      </section>

      <section className="sec wrap" style={{ paddingTop: 90 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
          {WHY.map((w, i) => {
            const Icon = w.icon;
            return (
              <Reveal key={i} delay={`d${(i % 4) + 1}`}>
                <div className="card-lift" style={{ padding: "40px 32px", borderRadius: 22, background: "#fff", border: "1px solid rgba(11,44,24,.07)", height: "100%" }}>
                  <div style={{ width: 60, height: 60, borderRadius: 16, background: `linear-gradient(135deg,${C.emerald},${C.emeraldL})`, display: "grid", placeItems: "center", color: "#fff", marginBottom: 22 }}>
                    <Icon size={28} />
                  </div>
                  <h3 style={{ fontSize: 22, margin: "0 0 10px" }}>{w.t}</h3>
                  <p style={{ color: C.slate, fontSize: 15.5 }}>{w.d}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* RECORD */}
      <section className="sec wrap" style={{ paddingTop: 0 }}>
        <Reveal>
          <div className="record">
            <span className="eyebrow" style={{ color: C.goldL }}>A moment the world noticed</span>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", gap: 30, marginTop: 18 }}>
              <div className="big">35,000+</div>
              <div style={{ maxWidth: 440, paddingBottom: 14 }}>
                <div style={{ fontFamily: "Fraunces,serif", fontSize: 24, marginBottom: 8 }}>A world record, in one breath.</div>
                <p style={{ color: "rgba(247,244,236,.78)", fontSize: 16 }}>
                  Amaltas and the wider group brought together more than thirty-five thousand
                  participants for a single collective yoga gathering — a record-setting
                  testament to community and wellness.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="sec wrap" style={{ paddingTop: 0, textAlign: "center" }}>
        <Reveal>
          <h2 style={{ maxWidth: 700, margin: "0 auto" }}>Ready to see it for yourself?</h2>
          <p className="lead" style={{ margin: "16px auto 28px" }}>Explore our programmes and take the first step toward the 2026–27 cohort.</p>
          <Link to="/admissions" className="btn btn-gold">Begin your application <ArrowRight size={18} /></Link>
        </Reveal>
      </section>
    </>
  );
}
