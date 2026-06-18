import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Quote, Leaf, Heart, Star } from "lucide-react";
import { PageHero } from "../../components/Layout.jsx";
import { Reveal } from "../../components/Primitives.jsx";
import { C } from "../../theme.js";

const MESSAGE = {
  salutation: "Dear Friends, Faculty, and Students,",
  paragraphs: [
    "When I established Mayank Welfare Society in 2013, I carried a single, unwavering conviction: that the people of Malwa — of Dewas, of every village and town across this heartland — deserved world-class healthcare education within reach. Not in a distant city, not beyond the means of the ordinary family, but here, close to home.",
    "I have spent my life in service of this community. I have seen the consequences of a healthcare gap — families travelling hundreds of kilometres for treatment, young people with the aptitude to become doctors but no institution willing to open its doors to them. Amaltas was my answer to that silence.",
    "Building a university is not the work of one man or one year. It is the accumulation of thousands of decisions, sacrifices, and acts of faith. Every building you walk through, every laboratory you learn in, every patient you will one day treat — each of these traces its origin to a belief that service is the highest calling.",
    "To our students: you did not come to Amaltas by accident. You came because something in you recognised this place as more than an institution — it is a family, a mission, and a promise. I ask only one thing of you: carry that promise into the world with the same sincerity with which we planted it.",
    "Amaltas means Cassia fistula — the golden shower tree. It blooms fully, without hesitation, transforming its surroundings. I hope each of you will do the same.",
  ],
  closing: "With deep respect and enduring hope,",
  name: "Shri Suresh Singh Bhadoria",
  role: "Founder Chairman, Mayank Welfare Society & Amaltas University",
  quote: "I did not build Amaltas for today — I built it for every generation of healer that will follow.",
};

const MILESTONES = [
  { icon: Leaf, label: "Founded", value: "2013", desc: "Mayank Welfare Society established" },
  { icon: Heart, label: "Mission", value: "Service", desc: "Healthcare access for Malwa heartland" },
  { icon: Star, label: "Legacy", value: "10+ Years", desc: "Of uninterrupted commitment" },
];

export default function FounderChairmanMessage() {
  return (
    <>
      <PageHero
        crumb="About Us / Founder Chairman's Message"
        eyebrow="A message from the Founder"
        title="Rooted in service, grown with purpose."
        sub="Shri Suresh Singh Bhadoria — Founder Chairman, Mayank Welfare Society"
        bg="radial-gradient(125% 130% at 85% 8%, #2a9155 0%, #1a5c35 55%)"
      />

      {/* MAIN MESSAGE SECTION */}
      <section className="sec wrap" style={{ paddingTop: 90 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 64, alignItems: "start" }}>

          {/* LEFT: Letter */}
          <Reveal variant="left">
            <span className="eyebrow" style={{ marginBottom: 24, display: "block" }}>Founder Chairman's Message</span>
            <div className="chancellor-letter">
              <p className="letter-salutation">{MESSAGE.salutation}</p>
              {MESSAGE.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              <div className="letter-closing">
                <p>{MESSAGE.closing}</p>
                {/* <span className="letter-signature">Suresh</span> */}
                <span className="letter-signame">{MESSAGE.name}</span>
                <span className="letter-sigrole">{MESSAGE.role}</span>
              </div>
            </div>
          </Reveal>

          {/* RIGHT: Portrait (sticky) */}
          <Reveal variant="right">
            <div className="chancellor-portrait-box">
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", inset: -10, borderRadius: 34, background: `linear-gradient(135deg, ${C.emerald}22, ${C.gold}18)`, filter: "blur(18px)", zIndex: 0 }} />
                <div className="chancellor-photo" style={{ position: "relative", zIndex: 1, borderRadius: 28, border: `3px solid ${C.gold}55` }}>
                  <img
                    src="/assets/images%20of%20university/leadership/suresh-sir.jpeg"
                    alt="Shri Suresh Singh Bhadoria, Founder Chairman"
                  />
                </div>
              </div>
              <div className="chancellor-name-plate" style={{ marginTop: 20 }}>
                <div className="cp-role">Founder Chairman</div>
                <div className="cp-name">Shri Suresh Singh Bhadoria</div>
                <div className="cp-org">Mayank Welfare Society & Amaltas University</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="wrap" style={{ marginBottom: 30 }}>
        <Reveal>
          <div style={{ position: "relative", background: `linear-gradient(135deg, ${C.navy}, #1d6b40)`, borderRadius: 24, padding: "48px 52px", overflow: "hidden", color: C.ivory }}>
            <div style={{ position: "absolute", top: -20, left: 24, fontFamily: "Fraunces,serif", fontSize: 140, color: C.gold, opacity: 0.12, lineHeight: 1, pointerEvents: "none" }}>"</div>
            <Quote size={28} style={{ color: C.gold, marginBottom: 18, opacity: 0.9 }} />
            <p style={{ fontFamily: "Fraunces,serif", fontStyle: "italic", fontSize: "clamp(18px,2.4vw,24px)", lineHeight: 1.65, margin: 0, position: "relative", zIndex: 1, maxWidth: 740 }}>
              {MESSAGE.quote}
            </p>
            <div style={{ marginTop: 24, fontSize: 13, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: C.goldL, opacity: 0.85 }}>
              — {MESSAGE.name}
            </div>
          </div>
        </Reveal>
      </section>

      {/* MILESTONES */}
      <section className="wrap" style={{ marginBottom: 90 }}>
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {MILESTONES.map((m, i) => (
              <Reveal key={i} delay={`d${i + 1}`}>
                <div style={{ background: "#fff", borderRadius: 20, padding: "32px 28px", border: "1px solid rgba(11,44,24,.07)", boxShadow: "0 8px 40px -20px rgba(11,44,24,.12)", textAlign: "center" }}>
                  <div style={{ width: 52, height: 52, borderRadius: 16, background: `linear-gradient(135deg,${C.navy},${C.emerald})`, display: "grid", placeItems: "center", color: C.gold, margin: "0 auto 18px" }}>
                    <m.icon size={22} />
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: C.emerald, marginBottom: 6 }}>{m.label}</div>
                  <div style={{ fontFamily: "Fraunces,serif", fontSize: 28, color: C.ink, lineHeight: 1, marginBottom: 8 }}>{m.value}</div>
                  <div style={{ fontSize: 13, color: C.slate, lineHeight: 1.5 }}>{m.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg,#eef6f1 0%,var(--ivory) 55%,#fdfce8 100%)", padding: "90px 0" }}>
        <div className="wrap" style={{ textAlign: "center" }}>
          <Reveal>
            <span className="eyebrow" style={{ marginBottom: 16, display: "block" }}>Explore further</span>
            <h2 style={{ maxWidth: 560, margin: "0 auto" }}>Discover the institution he built.</h2>
            <p className="lead" style={{ margin: "16px auto 30px" }}>Learn about the Board of Management or read the Chairman's vision for Amaltas's future.</p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/about/chairman-message" className="btn btn-gold">Chairman's Message <ArrowRight size={18} /></Link>
              <Link to="/about/leadership" className="btn btn-dark">Board of Management <ArrowRight size={18} /></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
