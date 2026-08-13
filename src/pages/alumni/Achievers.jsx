import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Trophy, Medal, Star } from "lucide-react";
import { PageHero } from "../../components/Layout.jsx";
import { Reveal } from "../../components/Primitives.jsx";
import { C } from "../../theme.js";
import SEO from "../../components/SEO.jsx";
import { breadcrumbSchema } from "../../data/schema.js";

const CATEGORIES = [
  {
    label: "Spotlight",
    icon: Sparkles,
    gradStart: "#12863F", gradEnd: "#0a5e2c",
    accent: "#FBED5B",
    serial: "01",
    desc: "Monthly profiles of alumni making a difference — in clinics, labs, communities, and boardrooms across India and beyond.",
    howItWorks: "Spotlights are published every month on the alumni portal. Any alumnus or faculty member can nominate a graduate. Our editorial team reaches out for a brief interview and the story goes live.",
    nomCta: "Nominate for Spotlight",
  },
  {
    label: "Alumni Success Stories",
    icon: Trophy,
    gradStart: "#D84315", gradEnd: "#8f2c0e",
    accent: "#FBED5B",
    serial: "02",
    desc: "Long-form features on journeys from the Amaltas campus to extraordinary careers and lasting healthcare impact — told in the alumni's own voice.",
    howItWorks: "Success stories are in-depth written or video narratives. Submit a self-nomination or nominate a colleague. The Alumni Coordinator will co-author the story with you.",
    nomCta: "Share Your Story",
  },
  {
    label: "Distinguished Alumnus",
    icon: Medal,
    gradStart: "#C07A00", gradEnd: "#7a4e00",
    accent: "#fff",
    serial: "03",
    desc: "Our highest annual recognition for graduates who have brought extraordinary honour to Amaltas University through their professional achievements, research, or service.",
    howItWorks: "Nominations open every October. A jury of senior faculty and past recipients evaluates candidates across criteria of professional excellence, community impact, and institutional pride.",
    nomCta: "Nominate an Alumnus",
  },
  {
    label: "Wall of Fame",
    icon: Star,
    gradStart: "#6A1B9A", gradEnd: "#3d0066",
    accent: "#FBED5B",
    serial: "04",
    desc: "A permanent gallery of Amaltas graduates who have reshaped healthcare in India and beyond — an enduring inspiration to every student who follows.",
    howItWorks: "The Wall of Fame is curated annually. Distinguished Alumnus awardees are automatically inducted. Additional inductees are selected by the Alumni Council for lifetime contributions.",
    nomCta: "Visit the Wall",
  },
];

export default function AlumniAchievers() {
  return (
    <>
      <SEO
        title="Alumni Achievers — Success Stories"
        description="Monthly spotlights and success stories of Amaltas University alumni making a difference in clinics, labs, communities and boardrooms across India and beyond."
        path="/alumni/achievers"
        jsonLd={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Alumni", path: "/alumni" }, { name: "Achievers", path: "/alumni/achievers" }])}
      />
      <PageHero
        crumb="Alumni / Alumni Achievers"
        eyebrow="Alumni Achievers"
        title="Celebrating every milestone."
        sub="From monthly spotlights to our highest annual honour — Amaltas never stops celebrating the people it helped shape."
        bgImg="/assets/images%20of%20university/event%20and%20activites/yoga.jpg"
      />

      {/* ── INTRO ── */}
      <section className="sec" style={{ background: "linear-gradient(135deg,#eef6f1 0%,var(--ivory) 60%,#fdfce8 100%)" }}>
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Recognition</span>
            <h2 style={{ marginTop: 14 }}>Four ways Amaltas celebrates its alumni.</h2>
            <p className="lead" style={{ marginTop: 18 }}>
              From a brief monthly spotlight to permanent induction on the Wall of Fame — there is a place in the Amaltas story for every achievement, large or small.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── CATEGORY CARDS ── */}
      <section style={{ background: `linear-gradient(135deg,${C.navy} 0%,${C.navy2} 55%,#1a5c35 100%)`, padding: "90px 0" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 24 }}>
            {CATEGORIES.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <Reveal key={i} delay={`d${(i % 4) + 1}`}>
                  <div className="alumni-achiever-card card-lift" style={{
                    background: `linear-gradient(145deg,${cat.gradStart},${cat.gradEnd})`,
                  }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(255,255,255,.14)", display: "grid", placeItems: "center", color: "#fff", marginBottom: 18 }}>
                      <Icon size={24} />
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.5)", marginBottom: 8 }}>
                      Programme · {cat.serial}
                    </div>
                    <h3 style={{ fontFamily: "Fraunces,serif", fontSize: 19, color: "#fff", marginBottom: 12, lineHeight: 1.25 }}>{cat.label}</h3>
                    <p style={{ color: "rgba(255,255,255,.72)", fontSize: 13.5, lineHeight: 1.7, flex: 1 }}>{cat.desc}</p>

                    <div style={{ marginTop: 22, paddingTop: 18, borderTop: "1px solid rgba(255,255,255,.12)" }}>
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: cat.accent, marginBottom: 8 }}>
                        How it works
                      </div>
                      <p style={{ color: "rgba(255,255,255,.58)", fontSize: 12.5, lineHeight: 1.65, margin: 0 }}>{cat.howItWorks}</p>
                    </div>

                    <button
                      onClick={e => e.preventDefault()}
                      style={{
                        marginTop: 22, display: "inline-flex", alignItems: "center", gap: 7,
                        padding: "10px 18px", borderRadius: 100,
                        background: "rgba(255,255,255,.13)", border: "1px solid rgba(255,255,255,.22)",
                        color: "#fff", fontFamily: "inherit", fontSize: 13.5, fontWeight: 600,
                        cursor: "pointer", transition: "all .25s", alignSelf: "flex-start",
                      }}>
                      {cat.nomCta} <ArrowRight size={14} />
                    </button>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── NOMINATION PROCESS ── */}
      <section className="sec wrap">
        <Reveal>
          <span className="eyebrow">Nomination Process</span>
          <h2 style={{ marginTop: 14 }}>Know someone deserving recognition?</h2>
          <p className="lead" style={{ marginTop: 18 }}>
            Nominations for all four programmes are open year-round (except Distinguished Alumnus, which opens in October). Any alumni member or current faculty can nominate.
          </p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 18, marginTop: 48 }}>
          {[
            { step: "01", title: "Nominate",          desc: "Click the nomination button on the relevant programme and submit a short write-up about the candidate." },
            { step: "02", title: "Review",             desc: "The Alumni Council reviews nominations within 2 weeks and contacts the nominee for a profile interview." },
            { step: "03", title: "Feature Published",  desc: "Spotlights and Success Stories are published on the alumni portal. Distinguished Alumnus is awarded at the annual reunion." },
            { step: "04", title: "Wall of Fame",       desc: "Distinguished Alumnus recipients are automatically considered for permanent induction on the Wall of Fame." },
          ].map((s, i) => (
            <Reveal key={i} delay={`d${i + 1}`}>
              <div style={{ background: "#fff", borderRadius: 18, padding: "26px 24px", border: "1px solid rgba(11,44,24,.08)", display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ fontFamily: "Fraunces,serif", fontSize: 26, color: C.emerald, lineHeight: 1, flexShrink: 0 }}>{s.step}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: C.ink, marginBottom: 6 }}>{s.title}</div>
                  <p style={{ color: C.slate, fontSize: 13, lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: `linear-gradient(135deg,${C.navy2},${C.navy})`, padding: "80px 0" }}>
        <div className="wrap" style={{ textAlign: "center" }}>
          <Reveal>
            <span className="eyebrow" style={{ color: C.goldL }}>Share your achievement</span>
            <h2 style={{ marginTop: 14, color: C.ivory, maxWidth: 540, margin: "14px auto 0" }}>
              Have something to celebrate?
            </h2>
            <p style={{ color: "rgba(247,244,236,.68)", fontSize: 17, maxWidth: 440, margin: "16px auto 30px" }}>
              Use the Engage section to share your achievement and let us feature it across Amaltas alumni channels.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/alumni/engage" className="btn btn-gold">Share Achievement <ArrowRight size={18} /></Link>
              <Link to="/alumni" className="btn btn-ghost">Alumni Home <ArrowRight size={18} /></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
