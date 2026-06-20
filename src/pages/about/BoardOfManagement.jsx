import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, ArrowUpRight } from "lucide-react";
import { Reveal } from "../../components/Primitives.jsx";
import { LEADERS } from "../../data/content.js";

/* ─── Light-theme tokens — mirrors TheUniversity ────────────────────────── */
const G = {
  green:    "#10803B",
  greenL:   "#19a04e",
  greenBg:  "#edf7f1",
  greenBgL: "#f4fbf7",
  yellowBg: "#fffce8",
  gold:     "#F6E005",
  goldL:    "#FBED5B",
  ink:      "#0d2618",
  slate:    "#3d6248",
  border:   "rgba(16,128,59,.12)",
  borderM:  "rgba(16,128,59,.2)",
};

const BOARD_MEMBERS = LEADERS.filter(l =>
  l.nm === "Shri Suresh Singh Bhadoria" || l.nm === "Shri Mayankraj Singh Bhadoria"
).map(l => ({
  ...l,
  to: l.nm === "Shri Suresh Singh Bhadoria"
    ? "/about/founder-chairman-message"
    : "/about/chairman-message",
}));

const DEANS = [
  { role: "Dean",      institute: "Institute of Medical Sciences" },
  { role: "Principal", institute: "Ayurvedic College & Research Centre" },
  { role: "Principal", institute: "Institute of Homoeopathy" },
  { role: "Principal", institute: "Institute of Nursing Sciences" },
  { role: "Principal", institute: "Institute of Pharmacy" },
  { role: "Principal", institute: "Institute of Paramedical Sciences" },
  { role: "Head",      institute: "Allied & Rehabilitation Sciences" },
];

/* Root-network SVG — seven roots from one trunk, now visible on light bg */
function HeroDecor() {
  const roots = [
    { angle: -80 }, { angle: -55 }, { angle: -30 },
    { angle: -5  }, { angle:  20 }, { angle:  45 }, { angle: 68 },
  ];
  const len = [200, 185, 175, 170, 175, 185, 195];
  const cx = 960, cy = 310;
  return (
    <svg
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }}
      viewBox="0 0 1400 380"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="bm-glow-l" cx="68%" cy="82%" r="42%">
          <stop offset="0%"   stopColor="#10803B" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#10803B" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1400" height="380" fill="url(#bm-glow-l)" />
      {roots.map(({ angle }, i) => {
        const rad = (angle + 90) * Math.PI / 180;
        const l   = len[i];
        const ex  = cx + Math.cos(rad) * l;
        const ey  = cy + Math.sin(rad) * l;
        const c1x = cx + Math.cos(rad) * l * 0.3;
        const c1y = cy + Math.sin(rad) * l * 0.3 + 18;
        const c2x = cx + Math.cos(rad) * l * 0.7;
        const c2y = cy + Math.sin(rad) * l * 0.7 + 8;
        return (
          <g key={i}>
            <path d={`M${cx},${cy} C${c1x},${c1y} ${c2x},${c2y} ${ex},${ey}`}
              stroke="#10803B" strokeWidth={1.8 - i * 0.05} fill="none" opacity="0.35" />
            <circle cx={ex} cy={ey} r="5"   fill="#F6E005" opacity="0.5" />
            <circle cx={ex} cy={ey} r="2.5" fill="#10803B" opacity="0.6" />
            {[0.45, 0.72].map((t, j) => {
              const tx   = cx + Math.cos(rad) * l * t;
              const ty   = cy + Math.sin(rad) * l * t + j * 6;
              const lrad = rad + (j % 2 === 0 ? 0.7 : -0.6);
              return (
                <path key={j}
                  d={`M${tx},${ty} C${tx + Math.cos(lrad)*24},${ty + Math.sin(lrad)*24} ${tx + Math.cos(lrad)*52},${ty + Math.sin(lrad)*52} ${tx + Math.cos(lrad)*65},${ty + Math.sin(lrad)*65}`}
                  stroke="#10803B" strokeWidth="0.9" fill="none" opacity="0.22" />
              );
            })}
          </g>
        );
      })}
      {/* Trunk */}
      <path d="M960,240 C960,255 960,278 960,310" stroke="#10803B" strokeWidth="5" fill="none" opacity="0.28" strokeLinecap="round" />
      {[18, 32, 48].map((r, i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke="#F6E005" strokeWidth="0.8" opacity={0.25 - i * 0.06} />
      ))}
      <path d="M960,240 C960,218 961,195 960,168" stroke="#10803B" strokeWidth="3" fill="none" opacity="0.22" strokeLinecap="round" />
      <circle cx="960" cy="162" r="8"   fill="#F6E005" opacity="0.35" />
      <circle cx="960" cy="162" r="4.5" fill="#10803B" opacity="0.5" />
    </svg>
  );
}

export default function BoardOfManagement() {
  return (
    <>
      {/* ══ HERO — light theme ══ */}
      <header
        className="page-hero"
        style={{
          background: `linear-gradient(135deg, ${G.greenBg} 0%, #fafffe 50%, ${G.yellowBg} 100%)`,
          color: G.ink,
          paddingTop: 120,
          paddingBottom: 60,
        }}
      >
        {/* Soft green glow left */}
        <div className="hero-glow" style={{ width: 420, height: 420, background: "rgba(16,128,59,.1)", left: "-120px", top: "-10%" }} />
        {/* Gold warmth right */}
        <div className="hero-glow" style={{ width: 320, height: 320, background: "rgba(246,224,5,.22)", right: "4%", bottom: "-20%" }} />
        <HeroDecor />
        <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
          <div className="crumb" style={{ color: G.slate }}>
            <Link to="/" style={{ color: G.green }}>Home</Link> &nbsp;/&nbsp; About Us / Board of Management
          </div>
          <span className="eyebrow" style={{ color: G.green, marginTop: 14 }}>Governance &amp; Leadership</span>
          <h1 style={{ marginTop: 14, color: G.ink }}>Board of Management</h1>
          <p style={{ color: G.slate, fontSize: 18, maxWidth: 560, marginTop: 18, lineHeight: 1.65 }}>
            The Board of Management whose vision, stewardship and decades of dedication have shaped Amaltas University into a leading health-sciences institution.
          </p>
        </div>
      </header>

      {/* ── INTRO CARD ── */}
      <section className="wrap" style={{ marginTop: -40, position: "relative", zIndex: 5 }}>
        <div style={{
          background: "#fff", borderRadius: 22, padding: "28px 34px",
          border: `1px solid ${G.border}`,
          boxShadow: `0 30px 70px -40px rgba(16,128,59,.18)`,
          display: "flex", flexWrap: "wrap", gap: 28, alignItems: "center",
        }}>
          <div style={{ flex: 1, minWidth: 260 }}>
            <span className="eyebrow">Governance Structure</span>
            <h3 style={{ fontSize: 21, marginTop: 8, color: G.ink }}>A university guided by conscience and conviction.</h3>
          </div>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            {[["7", "Institutes"], ["10+", "Years"], ["2", "Leaders"]].map(([v, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "Fraunces,serif", fontSize: 30, color: G.green, lineHeight: 1 }}>{v}</div>
                <div style={{ color: G.slate, fontSize: 11, fontWeight: 700, marginTop: 4, letterSpacing: ".08em", textTransform: "uppercase" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOARD MEMBERS ── */}
      <section className="sec wrap" style={{ paddingTop: 80 }}>
        <Reveal>
          <span className="eyebrow">Board of Management</span>
          <h2 style={{ marginTop: 14, color: G.ink }}>The people behind the promise.</h2>
          <p style={{ color: G.slate, fontSize: 17, marginTop: 14, maxWidth: 580, lineHeight: 1.7 }}>
            From the founding welfare society to today's academic council, Amaltas is led by people who built this institution to serve a community.
          </p>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 28, maxWidth: 820, margin: "44px auto 0" }}>
          {BOARD_MEMBERS.map((l, i) => (
            <Reveal key={i} delay={`d${i + 1}`}>
              <Link to={l.to} style={{ textDecoration: "none", display: "block", height: "100%" }}>
                <div className="leader-photo-card card-lift" style={{ height: "100%", cursor: "pointer", border: `1px solid ${G.border}`, borderRadius: 20, overflow: "hidden" }}>
                  <div className="lpc-photo-area" style={{ aspectRatio: "3/3.6", position: "relative", overflow: "hidden" }}>
                    {l.photo
                      ? <img src={l.photo} alt={l.nm} style={{ transition: "transform .5s ease" }} />
                      : <div className="lpc-photo-initials">{l.nm.split(" ").filter(Boolean).pop()[0]}</div>}
                    {/* light green tint on hover only via CSS class */}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(16,128,59,.4) 0%, transparent 50%)", opacity: 0, transition: "opacity .35s ease" }} className="card-img-overlay" />
                  </div>
                  <div className="lpc-info" style={{ position: "relative", background: "#fff" }}>
                    <div className="lpc-role" style={{ color: G.green }}>{l.role}</div>
                    <div className="lpc-name" style={{ color: G.ink }}>{l.nm}</div>
                    <p className="lpc-bio" style={{ color: G.slate }}>{l.bio}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 14, fontSize: 13, fontWeight: 700, color: G.green, letterSpacing: ".04em" }}>
                      Read message <ArrowUpRight size={15} />
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── ACADEMIC COUNCIL ── */}
      <section style={{ background: `linear-gradient(135deg,${G.greenBgL} 0%,${G.yellowBg} 100%)`, padding: "90px 0" }}>
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Academic Council</span>
            <h2 style={{ marginTop: 14, color: G.ink }}>Deans &amp; Academic Heads.</h2>
            <p style={{ color: G.slate, marginTop: 18, fontSize: 17, maxWidth: 560, lineHeight: 1.7 }}>
              Each of Amaltas's seven institutes is led by an experienced dean overseeing curriculum, research, and clinical training standards.
            </p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 16, marginTop: 44 }}>
            {DEANS.map((d, i) => (
              <Reveal key={i} delay={`d${(i % 4) + 1}`}>
                <div style={{ background: "#fff", borderRadius: 18, padding: "22px 20px", border: `1px solid ${G.border}`, display: "flex", gap: 16, alignItems: "flex-start", boxShadow: `0 6px 24px -14px rgba(16,128,59,.15)` }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `linear-gradient(135deg,${G.green},${G.greenL})`, display: "grid", placeItems: "center", color: "#fff", flexShrink: 0 }}>
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: G.green, marginBottom: 5 }}>{d.role}</div>
                    <div style={{ fontFamily: "Fraunces,serif", fontSize: 16, color: G.ink, lineHeight: 1.3 }}>{d.institute}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="sec wrap" style={{ textAlign: "center" }}>
        <Reveal>
          <h2 style={{ maxWidth: 580, margin: "0 auto", color: G.ink }}>Want to know more about how we operate?</h2>
          <p style={{ color: G.slate, margin: "16px auto 28px", fontSize: 17, maxWidth: 520 }}>Read our Mandatory Disclosure for full institutional and governance details.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/about/disclosure" className="btn btn-gold">Mandatory Disclosure <ArrowRight size={18} /></Link>
            <Link to="/about/chancellor" className="btn btn-dark">Chancellor's Message <ArrowRight size={18} /></Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
