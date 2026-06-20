import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Quote, GraduationCap, Building2, Stethoscope } from "lucide-react";
import { PageHero } from "../../components/Layout.jsx";
import { Reveal } from "../../components/Primitives.jsx";
import { C } from "../../theme.js";

const MESSAGE = {
  salutation: "Dear Members of the Amaltas Family,",
  paragraphs: [
    "I grew up watching my father build something from nothing — a welfare society, then a hospital, then a university. I did not merely inherit a title when I became Chairman. I inherited a responsibility: to ensure that what he started would not only survive but flourish in ways even he had not yet imagined.",
    "Amaltas University today stands as a testament to what focused resolve and genuine service can achieve. We are not the largest institution in India. But I believe we are among the most sincere. Every decision made at this university begins from a single question: does this serve our students and our community?",
    "In an era when education risks becoming a transaction, I am determined that Amaltas remains a transformation. The student who walks into our Institute of Medical Sciences, our Ayurvedic College, our Pharmacy or Nursing programmes — they are not customers. They are the future of healthcare in this region, and we owe them the very best we have.",
    "I am particularly proud of the clinical exposure we provide from the earliest semesters. Theory without practice produces knowledge without confidence. Our teaching hospital, our community outreach programmes, our research culture — these exist because we believe a healer must know the world they are healing.",
    "To every student reading this: Amaltas chose you as much as you chose us. We will not let you down. I give you my personal commitment to that.",
  ],
  closing: "With respect and confidence in what we will build together,",
  name: "Shri Mayankraj Singh Bhadoria",
  role: "Chairman, Mayank Welfare Society & Amaltas University",
  quote: "Every student who graduates from Amaltas carries with them the weight of a community's hope and the strength of a family's belief.",
};

const PILLARS = [
  { icon: GraduationCap, label: "Academic Excellence", value: "First priority", desc: "Curriculum, faculty, and outcomes held to the highest standard" },
  { icon: Stethoscope, label: "Clinical Depth", value: "From Semester 1", desc: "Real hospital exposure before graduation year" },
  { icon: Building2, label: "Infrastructure", value: "Continually growing", desc: "State-of-the-art labs, simulation centres, libraries" },
];

function HeroDecor() {
  return (
    <svg
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }}
      viewBox="0 0 1400 380"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Trunk — the lineage rising from the bottom */}
      <path d="M1010,382 C1008,350 1005,310 1006,272 C1007,248 1003,224 1008,200" stroke="#23A653" strokeWidth="3" fill="none" opacity="0.28" />
      {/* Main branch arching left — the inheritance reaching out */}
      <path d="M1008,250 C990,232 962,215 928,196 C894,177 858,162 818,152" stroke="#23A653" strokeWidth="2" fill="none" opacity="0.24" />
      <path d="M818,152 C796,145 770,142 748,150" stroke="#23A653" strokeWidth="1.5" fill="none" opacity="0.2" />
      {/* Left twigs */}
      <path d="M878,170 C864,160 846,156 830,162" stroke="#12863F" strokeWidth="1" fill="none" opacity="0.17" />
      <path d="M928,196 C920,180 912,170 898,168" stroke="#12863F" strokeWidth="1" fill="none" opacity="0.15" />
      {/* Main branch arching right — new growth, future earned */}
      <path d="M1008,228 C1032,210 1065,195 1100,180 C1138,164 1172,156 1206,152" stroke="#23A653" strokeWidth="2" fill="none" opacity="0.24" />
      <path d="M1206,152 C1234,146 1265,149 1285,160" stroke="#23A653" strokeWidth="1.5" fill="none" opacity="0.2" />
      {/* Right twigs */}
      <path d="M1140,168 C1158,158 1178,155 1195,162" stroke="#12863F" strokeWidth="1" fill="none" opacity="0.17" />
      <path d="M1100,180 C1108,165 1118,156 1130,154" stroke="#12863F" strokeWidth="1" fill="none" opacity="0.15" />
      {/* Upper central branch — continuity */}
      <path d="M1008,215 C1020,198 1040,182 1062,172 C1084,162 1105,158 1128,155" stroke="#23A653" strokeWidth="1.5" fill="none" opacity="0.18" />
      <path d="M1062,172 C1058,156 1056,142 1060,130" stroke="#12863F" strokeWidth="1" fill="none" opacity="0.15" />
      {/* Leaf canopy — ellipses at branch tips */}
      {[
        { cx: 748, cy: 148, rx: 38, ry: 28, r: -18 },
        { cx: 782, cy: 136, rx: 30, ry: 22, r: 8 },
        { cx: 826, cy: 160, rx: 26, ry: 20, r: -4 },
        { cx: 1206, cy: 148, rx: 34, ry: 26, r: 14 },
        { cx: 1245, cy: 142, rx: 28, ry: 21, r: -10 },
        { cx: 1285, cy: 160, rx: 30, ry: 23, r: 22 },
        { cx: 1128, cy: 152, rx: 30, ry: 23, r: 5 },
        { cx: 1060, cy: 128, rx: 26, ry: 20, r: -6 },
        { cx: 898, cy: 165, rx: 24, ry: 18, r: 14 },
      ].map(({ cx, cy, rx, ry, r }, i) => (
        <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill="#12863F" opacity="0.13" transform={`rotate(${r},${cx},${cy})`} />
      ))}
      {/* Gold flowers in the canopy — the inherited promise blooming */}
      {[
        { x: 772, y: 138, s: 0.58 },
        { x: 1228, y: 142, s: 0.62 },
        { x: 1070, y: 128, s: 0.52 },
        { x: 898, y: 162, s: 0.48 },
      ].map(({ x, y, s }, i) => (
        <g key={i} transform={`translate(${x},${y}) scale(${s})`}>
          {[0, 72, 144, 216, 288].map(a => (
            <ellipse key={a} cx="0" cy="-22" rx="8" ry="19" fill="#F6E005" opacity="0.24" transform={`rotate(${a})`} />
          ))}
        </g>
      ))}
      {/* Root ground hints */}
      <path d="M1008,382 C1002,370 984,360 962,356" stroke="#0D3A20" strokeWidth="2" fill="none" opacity="0.45" />
      <path d="M1008,382 C1015,370 1038,362 1058,358" stroke="#0D3A20" strokeWidth="2" fill="none" opacity="0.38" />
    </svg>
  );
}

export default function ChairmanMessage() {
  return (
    <>
      <PageHero
        crumb="About Us / Chairman's Message"
        eyebrow="A message from the Chairman"
        title="A vision inherited, a future earned."
        sub="Shri Mayankraj Singh Bhadoria — Chairman, Amaltas University"
        bg="linear-gradient(125deg, #0B2C18 0%, #0E3A20 60%, #1C5E35 100%)"
      >
        <HeroDecor />
      </PageHero>

      {/* MAIN MESSAGE SECTION */}
      <section className="sec wrap" style={{ paddingTop: 90 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 64, alignItems: "start" }}>

          {/* LEFT: Letter */}
          <Reveal variant="left">
            <span className="eyebrow" style={{ marginBottom: 24, display: "block" }}>Chairman's Message</span>
            <div className="chancellor-letter">
              <p className="letter-salutation">{MESSAGE.salutation}</p>
              {MESSAGE.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              <div className="letter-closing">
                <p>{MESSAGE.closing}</p>
                {/* <span className="letter-signature">Mayankraj</span> */}
                <span className="letter-signame">{MESSAGE.name}</span>
                <span className="letter-sigrole">{MESSAGE.role}</span>
              </div>
            </div>
          </Reveal>

          {/* RIGHT: Portrait (sticky) */}
          <Reveal variant="right">
            <div className="chancellor-portrait-box">
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", inset: -10, borderRadius: 34, background: `linear-gradient(135deg, ${C.gold}28, ${C.emerald}18)`, filter: "blur(18px)", zIndex: 0 }} />
                <div className="chancellor-photo" style={{ position: "relative", zIndex: 1, borderRadius: 28, border: `3px solid ${C.emerald}55` }}>
                  <img
                    src="/assets/images%20of%20university/leadership/mayank.jpeg"
                    alt="Shri Mayankraj Singh Bhadoria, Chairman"
                  />
                </div>
              </div>
              <div className="chancellor-name-plate" style={{ marginTop: 20 }}>
                <div className="cp-role">Chairman</div>
                <div className="cp-name">Shri Mayankraj Singh Bhadoria</div>
                <div className="cp-org">Mayank Welfare Society & Amaltas University</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="wrap" style={{ marginBottom: 30 }}>
        <Reveal>
          <div style={{ position: "relative", background: `linear-gradient(135deg, #1a5c35, ${C.navy})`, borderRadius: 24, padding: "48px 52px", overflow: "hidden", color: C.ivory }}>
            <div style={{ position: "absolute", top: -20, left: 24, fontFamily: "Fraunces,serif", fontSize: 140, color: C.goldL, opacity: 0.12, lineHeight: 1, pointerEvents: "none" }}>"</div>
            <Quote size={28} style={{ color: C.goldL, marginBottom: 18, opacity: 0.9 }} />
            <p style={{ fontFamily: "Fraunces,serif", fontStyle: "italic", fontSize: "clamp(18px,2.4vw,24px)", lineHeight: 1.65, margin: 0, position: "relative", zIndex: 1, maxWidth: 740 }}>
              {MESSAGE.quote}
            </p>
            <div style={{ marginTop: 24, fontSize: 13, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: C.goldL, opacity: 0.85 }}>
              — {MESSAGE.name}
            </div>
          </div>
        </Reveal>
      </section>

      {/* PILLARS */}
      <section className="wrap" style={{ marginBottom: 90 }}>
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {PILLARS.map((p, i) => (
              <Reveal key={i} delay={`d${i + 1}`}>
                <div style={{ background: "#fff", borderRadius: 20, padding: "32px 28px", border: "1px solid rgba(11,44,24,.07)", boxShadow: "0 8px 40px -20px rgba(11,44,24,.12)", textAlign: "center" }}>
                  <div style={{ width: 52, height: 52, borderRadius: 16, background: `linear-gradient(135deg,${C.emerald},#1d6b40)`, display: "grid", placeItems: "center", color: C.gold, margin: "0 auto 18px" }}>
                    <p.icon size={22} />
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: C.emerald, marginBottom: 6 }}>{p.label}</div>
                  <div style={{ fontFamily: "Fraunces,serif", fontSize: 20, color: C.ink, lineHeight: 1.2, marginBottom: 8 }}>{p.value}</div>
                  <div style={{ fontSize: 13, color: C.slate, lineHeight: 1.5 }}>{p.desc}</div>
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
            <h2 style={{ maxWidth: 560, margin: "0 auto" }}>Inspired by the vision?</h2>
            <p className="lead" style={{ margin: "16px auto 30px" }}>Read the founding story, or take the next step toward joining the Amaltas family.</p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/admissions" className="btn btn-gold">Apply for 2026–27 <ArrowRight size={18} /></Link>
              <Link to="/about/founder-chairman-message" className="btn btn-dark">Founder Chairman's Message <ArrowRight size={18} /></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
