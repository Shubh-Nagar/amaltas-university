import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight, Quote } from "lucide-react";
import { PageHero } from "../components/Layout.jsx";
import { Reveal } from "../components/Primitives.jsx";
import { C } from "../theme.js";
import { LEADERS, LEADER_MESSAGES } from "../data/content.js";

export default function LeaderMessage() {
  const { slug } = useParams();
  const leader = LEADERS.find((l) => l.slug === slug);
  const msg = LEADER_MESSAGES[slug];

  if (!leader || !msg) return <Navigate to="/leadership" replace />;

  const others = LEADERS.filter((l) => l.slug !== slug);

  return (
    <>
      <PageHero
        crumb={`Leadership / ${leader.role}'s Message`}
        eyebrow={msg.heroEyebrow}
        title={msg.heroTitle}
        sub={`${leader.nm} — ${leader.role}, ${leader.org}`}
        bgImg={msg.heroBg}
      />

      {/* MAIN MESSAGE SECTION */}
      <section className="sec wrap" style={{ paddingTop: 90 }}>
        <div className="leader-msg-grid" style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 64, alignItems: "start" }}>

          {/* LEFT: Letter */}
          <Reveal variant="left">
            <span className="eyebrow" style={{ marginBottom: 24, display: "block" }}>{leader.role}'s Message</span>
            <div className="chancellor-letter">
              <p className="letter-salutation">{msg.salutation}</p>
              {msg.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              <div className="letter-closing">
                <p>{msg.closing}</p>
                <span className="letter-signame">{leader.nm}</span>
                <span className="letter-sigrole">{leader.role}, {leader.org}</span>
              </div>
            </div>
          </Reveal>

          {/* RIGHT: Portrait (sticky) */}
          <Reveal variant="right">
            <div className="chancellor-portrait-box">
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", inset: -10, borderRadius: 34, background: `linear-gradient(135deg, ${C.emerald}22, ${C.gold}18)`, filter: "blur(18px)", zIndex: 0 }} />
                <div className="chancellor-photo" style={{ position: "relative", zIndex: 1, borderRadius: 28, border: `3px solid ${C.gold}55` }}>
                  {leader.photo
                    ? <img src={leader.photo} alt={leader.nm} />
                    : <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center", background: `linear-gradient(135deg,${C.navy},${C.emerald})`, color: C.goldL, fontFamily: "Fraunces,serif", fontSize: 44 }}>{leader.nm.split(" ").filter(Boolean).pop()[0]}</div>}
                </div>
              </div>
              <div className="chancellor-name-plate" style={{ marginTop: 20 }}>
                <div className="cp-role">{leader.role}</div>
                <div className="cp-name">{leader.nm}</div>
                <div className="cp-org">{leader.org}</div>
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
              {msg.quote}
            </p>
            <div style={{ marginTop: 24, fontSize: 13, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: C.goldL, opacity: 0.85 }}>
              — {leader.nm}
            </div>
          </div>
        </Reveal>
      </section>

      {/* STATS */}
      <section className="wrap" style={{ marginBottom: 90 }}>
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="leader-msg-stats">
            {msg.stats.map((s, i) => (
              <Reveal key={i} delay={`d${i + 1}`}>
                <div style={{ background: "#fff", borderRadius: 20, padding: "32px 28px", border: "1px solid rgba(11,44,24,.07)", boxShadow: "0 8px 40px -20px rgba(11,44,24,.12)", textAlign: "center" }}>
                  <div style={{ width: 52, height: 52, borderRadius: 16, background: `linear-gradient(135deg,${C.navy},${C.emerald})`, display: "grid", placeItems: "center", color: C.gold, margin: "0 auto 18px" }}>
                    <s.icon size={22} />
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: C.emerald, marginBottom: 6 }}>{s.label}</div>
                  <div style={{ fontFamily: "Fraunces,serif", fontSize: 22, color: C.ink, lineHeight: 1.2, marginBottom: 8 }}>{s.value}</div>
                  <div style={{ fontSize: 13, color: C.slate, lineHeight: 1.5 }}>{s.desc}</div>
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
            <h2 style={{ maxWidth: 560, margin: "0 auto" }}>Meet the rest of the leadership.</h2>
            <p className="lead" style={{ margin: "16px auto 30px" }}>Read messages from the other leaders shaping Amaltas University.</p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/admissions" className="btn btn-gold">Apply for 2026–27 <ArrowRight size={18} /></Link>
              <Link to="/leadership" className="btn btn-dark">All Leaders <ArrowRight size={18} /></Link>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 22 }}>
              {others.map((l) => (
                <Link
                  key={l.slug}
                  to={`/leadership/${l.slug}`}
                  style={{
                    fontSize: 12.5, fontWeight: 700, letterSpacing: ".04em",
                    color: C.ink, background: "#fff", border: "1px solid rgba(11,44,24,.12)",
                    borderRadius: 999, padding: "8px 16px", textDecoration: "none",
                  }}
                >
                  {l.role}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
