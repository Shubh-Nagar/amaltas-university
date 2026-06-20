import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Users } from "lucide-react";
import { PageHero } from "../../components/Layout.jsx";
import { Reveal } from "../../components/Primitives.jsx";
import { C } from "../../theme.js";
import { CHANCELLOR_MESSAGE, VC_MESSAGE } from "../../data/content.js";

function MessageBlock({ msg, large }) {
  return (
    <div className="chancellor-letter" style={large ? {} : { fontSize: 15, lineHeight: 1.85 }}>
      <p className="letter-salutation">{msg.salutation}</p>
      {msg.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
      <div className="letter-closing">
        <p>{msg.closing}</p>
        <span className="letter-signature">{msg.name.split(" ").slice(-1)[0]}</span>
        <span className="letter-signame">{msg.name}</span>
        <span className="letter-sigrole">{msg.role}</span>
      </div>
    </div>
  );
}

function HeroDecor() {
  return (
    <svg
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }}
      viewBox="0 0 1400 380"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="ch-dawn" cx="92%" cy="10%" r="55%">
          <stop offset="0%" stopColor="#F6E005" stopOpacity="0.14" />
          <stop offset="60%" stopColor="#F6E005" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#F6E005" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1400" height="380" fill="url(#ch-dawn)" />
      {/* Light rays from top-right — like dawn breaking */}
      {[0, 15, 30, 45, 60, 75].map((a, i) => {
        const rad = (a + 110) * Math.PI / 180;
        return <line key={i} x1="1380" y1="0" x2={1380 + Math.cos(rad) * 700} y2={Math.sin(rad) * 700}
          stroke="#F6E005" strokeWidth="0.6" opacity={0.05 - i * 0.007} />;
      })}
      {/* Amaltas flowers scattered on the right — the tree blooms before it shades */}
      {[
        { x: 1060, y: 58, s: 1.5, op: 0.22 },
        { x: 890, y: 130, s: 1.0, op: 0.16 },
        { x: 1200, y: 175, s: 1.1, op: 0.19 },
        { x: 790, y: 265, s: 0.7, op: 0.12 },
        { x: 1080, y: 295, s: 0.55, op: 0.1 },
        { x: 1310, y: 80, s: 0.8, op: 0.13 },
      ].map(({ x, y, s, op }, i) => (
        <g key={i} transform={`translate(${x},${y}) scale(${s})`}>
          {[0, 72, 144, 216, 288].map(a => (
            <ellipse key={a} cx="0" cy="-22" rx="8" ry="19" fill="#F6E005" opacity={op} transform={`rotate(${a})`} />
          ))}
          <circle r="5" fill="#23A653" opacity={op * 1.4} />
        </g>
      ))}
      {/* Loose petals drifting */}
      {[
        { x: 840, y: 85, rx: 6, ry: 13, r: 30 },
        { x: 1140, y: 240, rx: 5, ry: 11, r: -20 },
        { x: 970, y: 195, rx: 4, ry: 10, r: 60 },
        { x: 1280, y: 130, rx: 7, ry: 14, r: 12 },
        { x: 730, y: 310, rx: 4, ry: 9, r: -40 },
      ].map(({ x, y, rx, ry, r }, i) => (
        <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} fill="#F6E005" opacity="0.08" transform={`rotate(${r},${x},${y})`} />
      ))}
      {/* Thin gold arc — like a halo or the curve of the sun rising */}
      <path d="M1300,0 C1350,80 1370,180 1340,280" stroke="#F6E005" strokeWidth="0.8" fill="none" opacity="0.1" />
      <path d="M1380,20 C1420,120 1430,240 1390,340" stroke="#F6E005" strokeWidth="0.5" fill="none" opacity="0.07" />
    </svg>
  );
}

export default function ChancellorMessage() {
  return (
    <>
      <PageHero
        crumb="About Us / Chancellor's Message"
        eyebrow="A note from the Chancellor"
        title="Dear student, this is for you."
        sub="Mrs. Aruna Bhadoria — Chancellor, Amaltas University"
      >
        <HeroDecor />
      </PageHero>

      {/* CHANCELLOR MESSAGE */}
      <section className="sec wrap" style={{ paddingTop: 90 }}>
        <div className="chancellor-wrap">
          {/* LEFT: portrait + nameplate */}
          <Reveal variant="left">
            <div className="chancellor-portrait-box">
              <div className="chancellor-photo">
                <img
                  src="/assets/images%20of%20university/leadership/Smt.Arunaji-Bhadoriya-Chancellor.jpg"
                  alt="Mrs. Aruna Bhadoria, Chancellor"
                />
              </div>
              <div className="chancellor-name-plate">
                <div className="cp-role">Chancellor</div>
                <div className="cp-name">Mrs. Aruna Bhadoria</div>
                <div className="cp-org">Amaltas University</div>
              </div>
            </div>
          </Reveal>

          {/* RIGHT: letter */}
          <Reveal variant="right">
            <span className="eyebrow" style={{ marginBottom: 24, display: "block" }}>Chancellor's Message</span>
            <MessageBlock msg={CHANCELLOR_MESSAGE} large />
          </Reveal>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="wrap" style={{ marginBottom: 80 }}>
        <Reveal>
          <div className="quote-pull">
            <p>{CHANCELLOR_MESSAGE.quote}</p>
          </div>
        </Reveal>
      </section>

      {/* DIVIDER */}
      <div className="wrap" style={{ borderTop: "1px solid rgba(11,44,24,.08)", marginBottom: 80 }} />

      {/* VICE CHANCELLOR MESSAGE */}
      <section className="sec wrap" style={{ paddingTop: 0 }}>
        <Reveal>
          <span className="eyebrow">Vice Chancellor's Message</span>
          <h2 style={{ marginTop: 14 }}>Excellence and empathy, inseparable.</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: 48, marginTop: 52, alignItems: "start" }}>
          {/* VC portrait placeholder */}
          <Reveal variant="left">
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ width: "100%", maxWidth: 260, aspectRatio: "3/3.6", borderRadius: 24, background: `linear-gradient(135deg,${C.navy},${C.emerald})`, display: "grid", placeItems: "center", color: C.goldL, boxShadow: "0 40px 70px -40px rgba(11,44,24,.5)" }}>
                <Users size={64} />
              </div>
              <div style={{ padding: "18px 20px", background: "#fff", borderRadius: 16, border: "1px solid rgba(11,44,24,.08)", boxShadow: "0 8px 28px -14px rgba(11,44,24,.15)" }}>
                <div className="cp-role">Vice Chancellor</div>
                <div className="cp-name">{VC_MESSAGE.name}</div>
                <div className="cp-org">Amaltas University</div>
              </div>
            </div>
          </Reveal>
          <Reveal variant="right">
            <MessageBlock msg={VC_MESSAGE} />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg,#eef6f1 0%,var(--ivory) 55%,#fdfce8 100%)", padding: "90px 0" }}>
        <div className="wrap" style={{ textAlign: "center" }}>
          <Reveal>
            <h2 style={{ maxWidth: 560, margin: "0 auto" }}>Inspired? Take the next step.</h2>
            <p className="lead" style={{ margin: "16px auto 30px" }}>Meet the institution the Chancellor believes in — and join its next chapter.</p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/admissions" className="btn btn-gold">Apply for 2026–27 <ArrowRight size={18} /></Link>
              <Link to="/about/university" className="btn btn-dark">About the University <ArrowRight size={18} /></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
