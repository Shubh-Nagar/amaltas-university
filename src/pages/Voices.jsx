import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Quote, ChevronLeft, ChevronRight, ArrowRight, Play } from "lucide-react";
import { PageHero } from "../components/Layout.jsx";
import { Reveal } from "../components/Primitives.jsx";
import { C, iconBtn } from "../theme.js";
import { VOICES } from "../data/content.js";

export default function Voices() {
  const [voice, setVoice] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setVoice((v) => (v + 1) % VOICES.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <PageHero
        crumb="Voices"
        eyebrow="Voices of Amaltas"
        title="Stories that don't read like brochures."
        sub="The real measure of a university is what its students and families say when no one's selling them anything. Here are theirs."
      />

      {/* FEATURED CAROUSEL */}
      <section className="sec wrap" style={{ paddingTop: 80 }}>
        <Reveal>
          <div className="quote-card" style={{ maxWidth: 860, margin: "0 auto" }}>
            <Quote size={44} color={C.burg} />
            <p className="qt" style={{ margin: "16px 0 28px" }}>{VOICES[voice].q}</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 50, height: 50, borderRadius: "50%", background: `linear-gradient(135deg,${C.navy},${C.emerald})`, display: "grid", placeItems: "center", color: C.goldL, fontFamily: "Fraunces,serif", fontSize: 18 }}>
                  {VOICES[voice].n[0]}
                </div>
                <div>
                  <div style={{ fontWeight: 700 }}>{VOICES[voice].n}</div>
                  <div style={{ color: C.slate, fontSize: 13.5 }}>{VOICES[voice].r}</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <div className="dotnav">
                  {VOICES.map((_, i) => (
                    <button key={i} className={voice === i ? "on" : ""} onClick={() => setVoice(i)} />
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => setVoice((voice - 1 + VOICES.length) % VOICES.length)} style={iconBtn}><ChevronLeft size={18} /></button>
                  <button onClick={() => setVoice((voice + 1) % VOICES.length)} style={iconBtn}><ChevronRight size={18} /></button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* GRID OF ALL VOICES */}
      <section className="sec wrap" style={{ paddingTop: 0 }}>
        <Reveal>
          <span className="eyebrow">More voices</span>
          <h2>From every corner of campus.</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 22, marginTop: 44 }}>
          {VOICES.map((v, i) => (
            <Reveal key={i} delay={`d${(i % 3) + 1}`}>
              <div className="card-lift" style={{ background: "#fff", borderRadius: 20, padding: 32, border: "1px solid rgba(11,44,24,.07)", height: "100%" }}>
                <Quote size={28} color={C.burg} />
                <p style={{ fontFamily: "Fraunces,serif", fontStyle: "italic", fontSize: 17, lineHeight: 1.5, margin: "12px 0 20px", color: C.ink }}>{v.q}</p>
                <div style={{ fontWeight: 700, fontSize: 14.5 }}>{v.n}</div>
                <div style={{ color: C.slate, fontSize: 13 }}>{v.r}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* VIDEO TOUR CTA */}
      <section className="sec wrap" style={{ paddingTop: 0 }}>
        <Reveal>
          <div style={{ background: `radial-gradient(120% 140% at 20% 20%,${C.emerald},${C.navy} 60%)`, borderRadius: 30, padding: "60px 48px", color: C.ivory, textAlign: "center", position: "relative", overflow: "hidden" }}>
            <button style={{ width: 80, height: 80, borderRadius: "50%", border: "none", background: C.gold, color: C.navy, display: "grid", placeItems: "center", cursor: "pointer", margin: "0 auto 22px", boxShadow: "0 10px 40px -8px rgba(246,224,5,.7)" }}>
              <Play size={30} fill={C.navy} />
            </button>
            <h2 style={{ color: C.ivory }}>Take the virtual campus tour.</h2>
            <p style={{ color: "rgba(247,244,236,.74)", maxWidth: 520, margin: "14px auto 28px" }}>
              Walk the wards, labs and grounds of Amaltas University before you ever arrive.
            </p>
            <Link to="/admissions" className="btn btn-gold">Begin your application <ArrowRight size={18} /></Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
