import React from "react";
import { Link } from "react-router-dom";
import {
  Users, ArrowRight, Award, Heart, FileText, Building2,
  Handshake, Share2, UserPlus, Trophy, Crown, Sparkles,
  Star, Medal, ShoppingBag,
} from "lucide-react";
import { PageHero } from "../components/Layout.jsx";
import { Reveal, StatNum } from "../components/Primitives.jsx";
import { C } from "../theme.js";
import { useInView } from "../hooks/useScroll.js";

const SECTIONS = [
  {
    to: "/alumni/leadership",
    icon: Crown,
    label: "Leadership",
    desc: "Meet the Vice Chancellor patron, Executive Council, and Office Bearers who govern the Amaltas University Alumni Association.",
    color: C.emerald,
    tag: "Governance",
  },
  {
    to: "/alumni/engage",
    icon: Handshake,
    label: "Engage",
    desc: "Be a mentor, share job opportunities, celebrate achievements, or invite fellow alumni to join the network.",
    color: "#C07A00",
    tag: "4 Forms",
  },
  {
    to: "/alumni/assist",
    icon: Building2,
    label: "Alumni Assist",
    desc: "Request a university visit, guest accommodation, or official transcripts and academic records.",
    color: C.burg,
    tag: "3 Services",
  },
  {
    to: "/alumni/achievers",
    icon: Trophy,
    label: "Alumni Achievers",
    desc: "Spotlight, Success Stories, Distinguished Alumnus award, and the permanent Wall of Fame — Amaltas celebrates every milestone.",
    color: "#1565C0",
    tag: "Recognition",
  },
  {
    to: "/alumni/giving-back",
    icon: ShoppingBag,
    label: "Giving Back",
    desc: "Official Amaltas merchandise whose proceeds directly support the Alumni Scholarship Fund for future students.",
    color: "#6A1B9A",
    tag: "Merchandise",
  },
];

export default function Alumni() {
  const [statsRef, statsInView] = useInView({ repeat: false });

  return (
    <>
      {/* ── HERO ── */}
      <PageHero
        crumb="Alumni"
        eyebrow="Amaltas University Alumni Association"
        title="Once an Amaltas student. Always part of the family."
        sub="A growing network of healthcare professionals united by shared roots, shared values, and a commitment to healing the world."
        bgImg="/assets/images%20of%20university/campus%20life/degree.JPG"
      />

      {/* ── STATS STRIP ── */}
      <div ref={statsRef} style={{ background: `linear-gradient(90deg,${C.navy} 0%,${C.navy2} 100%)`, padding: "50px 0" }}>
        <div className="wrap">
          <div className="alumni-stats-strip">
            {[
              { v: 10,   suf: "+", l: "Years of graduates"  },
              { v: 5000, suf: "+", l: "Alumni worldwide"    },
              { v: 6,    suf: "",  l: "Health disciplines"  },
              { v: 200,  suf: "+", l: "Mentors enrolled"    },
            ].map((s, i) => (
              <div key={i} style={{
                padding: "22px 16px",
                borderRight: i < 3 ? "1px solid rgba(255,255,255,.1)" : "none",
                textAlign: "center",
              }}>
                <div style={{
                  fontFamily: "Fraunces,serif",
                  fontSize: "clamp(1.8rem,3.5vw,2.8rem)",
                  lineHeight: 1,
                  background: `linear-gradient(120deg,${C.goldL},${C.emeraldL})`,
                  WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
                }}>
                  <StatNum v={s.v} suf={s.suf} run={statsInView} />
                </div>
                <div style={{ color: "rgba(247,244,236,.58)", fontSize: 12.5, marginTop: 8 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ABOUT THE ASSOCIATION ── */}
      <section className="sec" style={{ background: "linear-gradient(135deg,#eef6f1 0%,var(--ivory) 60%,#fdfce8 100%)" }}>
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Who We Are</span>
            <h2 style={{ marginTop: 14 }}>The Amaltas alumni network.</h2>
            <p className="lead" style={{ marginTop: 18 }}>
              The Amaltas University Alumni Association connects graduates across all six health-science institutions — fostering mentorship, career growth, giving back, and lifelong belonging to the Amaltas family.
            </p>
          </Reveal>

          {/* Section Navigation Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 20, marginTop: 56 }}>
            {SECTIONS.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={i} delay={`d${(i % 4) + 1}`}>
                  <Link to={s.to} style={{ textDecoration: "none", display: "block", height: "100%" }}>
                    <div className="alumni-hub-card card-lift">
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18 }}>
                        <div style={{
                          width: 50, height: 50, borderRadius: 13, flexShrink: 0,
                          background: `linear-gradient(135deg,${s.color},${s.color}cc)`,
                          display: "grid", placeItems: "center", color: "#fff",
                        }}>
                          <Icon size={22} />
                        </div>
                        <span style={{
                          fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase",
                          padding: "4px 10px", borderRadius: 100,
                          background: `${s.color}14`, color: s.color,
                        }}>
                          {s.tag}
                        </span>
                      </div>
                      <h3 style={{ fontFamily: "Fraunces,serif", fontSize: 19, color: C.ink, marginBottom: 10 }}>{s.label}</h3>
                      <p style={{ color: C.slate, fontSize: 13.5, lineHeight: 1.7, flex: 1 }}>{s.desc}</p>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 20, fontSize: 13.5, fontWeight: 700, color: s.color }}>
                        Explore <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: `linear-gradient(135deg,${C.navy2},${C.navy})`, padding: "84px 0" }}>
        <div className="wrap" style={{ textAlign: "center" }}>
          <Reveal>
            <span className="eyebrow" style={{ color: C.goldL }}>Join the network</span>
            <h2 style={{ marginTop: 14, color: C.ivory, maxWidth: 560, margin: "14px auto 0" }}>
              Your Amaltas journey doesn't end at graduation.
            </h2>
            <p style={{ color: "rgba(247,244,236,.68)", fontSize: 17, maxWidth: 480, margin: "18px auto 32px", lineHeight: 1.65 }}>
              Connect, contribute, and carry the Amaltas spirit into every corner of healthcare — wherever your career takes you.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/alumni/engage" className="btn btn-gold">Get Involved <ArrowRight size={18} /></Link>
              <Link to="/alumni/assist" className="btn btn-ghost">Alumni Assist <ArrowRight size={18} /></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
