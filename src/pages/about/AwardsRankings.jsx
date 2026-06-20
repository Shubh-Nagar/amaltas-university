import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Trophy, Star } from "lucide-react";
import { PageHero } from "../../components/Layout.jsx";
import { Reveal } from "../../components/Primitives.jsx";
import { C } from "../../theme.js";
import { AWARDS } from "../../data/content.js";

const featured = AWARDS.find((a) => a.featured);
const rest = AWARDS.filter((a) => !a.featured);

const RANKINGS = [
  { org: "NAAC", value: null, label: "Accreditation", pending: true, note: "Assessment in progress" },
  { org: "NIRF", value: null, label: "Health Sciences Rank", pending: true, note: "Participation ongoing" },
  { org: "Times Higher Ed", value: null, label: "Emerging Universities", pending: true, note: "Nomination submitted" },
  { org: "India Today", value: "Top 25", label: "Medical Colleges — Central India", pending: false },
];

function HeroDecor() {
  /* Amaltas raceme = a hanging branch with individual flowers dangling off at intervals.
     Cassia fistula is called "golden shower" for exactly this reason — cascading gold clusters. */
  const racemes = [
    { bx: 1050, by: 0, bend: 1060, bendY: 55, flowers: [
      { x: 1044, y: 30, r: 6 }, { x: 1052, y: 48 }, { x: 1058, y: 68 }, { x: 1052, y: 88 },
      { x: 1058, y: 108 }, { x: 1062, y: 128 }, { x: 1056, y: 150 }, { x: 1065, y: 172 },
    ]},
    { bx: 1180, by: 0, bend: 1188, bendY: 48, flowers: [
      { x: 1176, y: 22 }, { x: 1184, y: 42 }, { x: 1188, y: 64 }, { x: 1182, y: 84 },
      { x: 1190, y: 104 }, { x: 1186, y: 125 }, { x: 1192, y: 146 },
    ]},
    { bx: 1310, by: 0, bend: 1315, bendY: 42, flowers: [
      { x: 1308, y: 18 }, { x: 1316, y: 38 }, { x: 1312, y: 58 }, { x: 1318, y: 78 },
      { x: 1314, y: 98 }, { x: 1320, y: 120 },
    ]},
    { bx: 920, by: 0, bend: 932, bendY: 62, flowers: [
      { x: 916, y: 38 }, { x: 926, y: 58 }, { x: 932, y: 80 }, { x: 924, y: 100 },
      { x: 934, y: 122 }, { x: 928, y: 145 }, { x: 938, y: 168 }, { x: 930, y: 192 }, { x: 940, y: 218 },
    ]},
  ];
  return (
    <svg
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }}
      viewBox="0 0 1400 380"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="ar-top" cx="85%" cy="0%" r="50%">
          <stop offset="0%" stopColor="#F6E005" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#F6E005" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1400" height="380" fill="url(#ar-top)" />
      {/* Horizontal branch from which racemes hang */}
      <path d="M880,8 C940,6 1040,5 1160,5 C1240,5 1320,6 1400,8" stroke="#23A653" strokeWidth="2" fill="none" opacity="0.2" />
      {racemes.map((rc, ri) => (
        <g key={ri}>
          {/* Main raceme stem */}
          <path
            d={`M${rc.bx},${rc.by} C${rc.bx + 2},${rc.bend * 0.5} ${rc.bend},${rc.bendY * 0.7} ${rc.flowers[rc.flowers.length - 1].x},${rc.flowers[rc.flowers.length - 1].y + 12}`}
            stroke="#23A653"
            strokeWidth="1.5"
            fill="none"
            opacity="0.3"
          />
          {/* Individual flower pedicels (short stalks) + flowers */}
          {rc.flowers.map(({ x, y, r: fr = 5 }, fi) => (
            <g key={fi}>
              {/* Short stalk from main stem to flower */}
              <line x1={rc.bx + (x - rc.bx) * 0.1} y1={y - 8} x2={x} y2={y} stroke="#23A653" strokeWidth="0.8" opacity="0.22" />
              {/* Amaltas flower — 5-petal, gold */}
              <g transform={`translate(${x},${y}) scale(${0.55 + (fi % 3) * 0.05})`}>
                {[0, 72, 144, 216, 288].map(a => (
                  <ellipse key={a} cx="0" cy="-18" rx="7" ry="15" fill="#F6E005" opacity={0.28 - fi * 0.015} transform={`rotate(${a})`} />
                ))}
                <circle r="3.5" fill="#23A653" opacity="0.4" />
              </g>
            </g>
          ))}
        </g>
      ))}
      {/* A few detached petals floating below — awards drifting down */}
      {[
        { x: 980, y: 285, rx: 5, ry: 12, r: 35 },
        { x: 1120, y: 310, rx: 4, ry: 10, r: -25 },
        { x: 1250, y: 270, rx: 6, ry: 13, r: 50 },
        { x: 1070, y: 340, rx: 3.5, ry: 8, r: 15 },
      ].map(({ x, y, rx, ry, r }, i) => (
        <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} fill="#F6E005" opacity="0.08" transform={`rotate(${r},${x},${y})`} />
      ))}
    </svg>
  );
}

export default function AwardsRankings() {
  return (
    <>
      <PageHero
        crumb="About Us / Awards & Rankings"
        eyebrow="Recognition & Excellence"
        title="When the world took note."
        sub="From a Guinness World Record to state and national recognitions — each award reflects the dedication of our students, faculty, and the community we serve."
        bg="linear-gradient(155deg, #0B2C18 0%, #0C3018 55%, #0E3820 100%)"
      >
        <HeroDecor />
      </PageHero>

      {/* FEATURED AWARD: Guinness World Record */}
      {featured && (
        <section className="sec wrap" style={{ paddingTop: 90 }}>
          <Reveal>
            <div className="award-featured">
              {/* Background image layer */}
              <div className="award-featured-img">
                <img src={featured.img} alt={featured.title} />
              </div>
              {/* Content */}
              <div style={{ position: "relative", zIndex: 1, maxWidth: 640 }}>
                <div className="af-eyebrow">{featured.type} · {featured.year}</div>
                <span className="af-number">{featured.number}</span>
                <div className="af-title">{featured.title}</div>
                <p className="af-desc">{featured.desc}</p>
                <div className="af-badge">
                  <Trophy size={15} />
                  {featured.org}
                </div>
              </div>
            </div>
          </Reveal>

          {/* OTHER AWARDS GRID */}
          <Reveal>
            <span className="eyebrow" style={{ marginTop: 12, display: "block" }}>More Recognition</span>
            <h2 style={{ marginTop: 14, marginBottom: 36 }}>Awards & accolades.</h2>
          </Reveal>
          <div className="awards-grid">
            {rest.map((a, i) => (
              <Reveal key={i} delay={`d${(i % 3) + 1}`}>
                <div className="award-card">
                  <div className="award-card-head">
                    <span className="award-card-type" style={{ background: `${a.color}18`, color: a.color }}>
                      {a.type}
                    </span>
                    <span className="award-card-year">{a.year}</span>
                  </div>
                  <div className="award-card-title">{a.title}</div>
                  <p className="award-card-desc">{a.desc}</p>
                  <div className="award-card-org" style={{ color: a.color }}>{a.org}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* RANKINGS SECTION */}
      <section style={{ background: "linear-gradient(135deg,#eef6f1 0%,var(--ivory) 55%,#fdfce8 100%)", padding: "90px 0", marginTop: 60 }}>
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Rankings & Ratings</span>
            <h2 style={{ marginTop: 14 }}>Positioning for recognition.</h2>
            <p className="lead" style={{ marginTop: 18 }}>
              As a young, dynamic university, Amaltas is actively participating in national ranking frameworks. Our academic quality and clinical outcomes are our strongest argument.
            </p>
          </Reveal>
          <div className="rankings-grid">
            {RANKINGS.map((r, i) => (
              <Reveal key={i} delay={`d${(i % 4) + 1}`}>
                <div className={`ranking-card${r.pending ? " pending" : ""}`}>
                  <div className="rc-org">{r.org}</div>
                  {r.pending ? (
                    <div className="rc-pending">{r.note}</div>
                  ) : (
                    <div className="rc-value">{r.value}</div>
                  )}
                  <div className="rc-label">{r.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* RECOGNITIONS STRIP */}
      <section className="sec wrap">
        <Reveal>
          <span className="eyebrow">Recognition From</span>
          <h2 style={{ marginTop: 14 }}>Endorsements that matter.</h2>
          <p className="lead" style={{ marginTop: 18 }}>Our programmes are recognised and regulated by the premier statutory bodies of the Government of India.</p>
        </Reveal>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 44 }}>
          {["National Medical Commission (NMC)", "Central Council of Indian Medicine (CCIM)", "Central Council of Homoeopathy (CCH)", "Indian Nursing Council (INC)", "Pharmacy Council of India (PCI)", "Rehabilitation Council of India (RCI)", "University Grants Commission (UGC)", "Ministry of AYUSH"].map((r, i) => (
            <Reveal key={i} delay={`d${(i % 4) + 1}`}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 100, background: "#fff", border: "1px solid rgba(11,44,24,.1)", fontSize: 13.5, fontWeight: 500, color: C.ink }}>
                <Star size={13} color={C.gold} style={{ flexShrink: 0 }} />
                {r}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: `linear-gradient(135deg,${C.navy2},${C.navy})`, padding: "80px 0" }}>
        <div className="wrap" style={{ textAlign: "center" }}>
          <Reveal>
            <span className="eyebrow" style={{ color: C.goldL }}>Your achievement starts here</span>
            <h2 style={{ marginTop: 14, color: C.ivory, maxWidth: 580, margin: "14px auto 0" }}>Be part of our next milestone.</h2>
            <p style={{ color: "rgba(247,244,236,.7)", marginTop: 16, marginBottom: 30, fontSize: 17 }}>The next Guinness record belongs to our graduating class.</p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/admissions" className="btn btn-gold">Apply for 2026–27 <ArrowRight size={18} /></Link>
              <Link to="/about/accreditations" className="btn btn-ghost">Our Accreditations <ArrowRight size={18} /></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
