import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, ArrowUpRight } from "lucide-react";
import { PageHero } from "../../components/Layout.jsx";
import { Reveal } from "../../components/Primitives.jsx";
import { C } from "../../theme.js";
import { LEADERS } from "../../data/content.js";

const BOARD_MEMBERS = LEADERS.filter(l =>
  l.nm === "Shri Suresh Singh Bhadoria" || l.nm === "Shri Mayankraj Singh Bhadoria"
).map(l => ({
  ...l,
  to: l.nm === "Shri Suresh Singh Bhadoria"
    ? "/about/founder-chairman-message"
    : "/about/chairman-message",
}));

const DEANS = [
  { role: "Dean", institute: "Institute of Medical Sciences" },
  { role: "Principal", institute: "Ayurvedic College & Research Centre" },
  { role: "Principal", institute: "Institute of Homoeopathy" },
  { role: "Principal", institute: "Institute of Nursing Sciences" },
  { role: "Principal", institute: "Institute of Pharmacy" },
  { role: "Principal", institute: "Institute of Paramedical Sciences" },
  { role: "Head", institute: "Allied & Rehabilitation Sciences" },
];

export default function BoardOfManagement() {
  return (
    <>
      <PageHero
        crumb="About Us / Board of Management"
        eyebrow="Governance & Leadership"
        title="Built on trust. Driven by purpose."
        sub="The Board of Management whose vision, stewardship and decades of dedication have shaped Amaltas University into a leading health-sciences institution."
        bg="radial-gradient(125% 130% at 85% 8%, #2a9155 0%, #1a5c35 55%)"
      />

      {/* INTRO CARD */}
      <section className="wrap" style={{ marginTop: -50, position: "relative", zIndex: 5 }}>
        <div style={{ background: "#fff", borderRadius: 22, padding: "28px 34px", border: "1px solid rgba(11,44,24,.07)", boxShadow: "0 40px 90px -55px rgba(11,44,24,.5)", display: "flex", flexWrap: "wrap", gap: 28, alignItems: "center" }}>
          <div style={{ flex: 1, minWidth: 260 }}>
            <span className="eyebrow">Governance Structure</span>
            <h3 style={{ fontSize: 21, marginTop: 8 }}>A university guided by conscience and conviction.</h3>
          </div>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            {[["7", "Institutes"], ["10+", "Years"], ["2", "Leaders"]].map(([v, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "Fraunces,serif", fontSize: 30, background: `linear-gradient(120deg,${C.emerald},${C.burg})`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", lineHeight: 1 }}>{v}</div>
                <div style={{ color: C.slate, fontSize: 11, fontWeight: 700, marginTop: 4, letterSpacing: ".08em", textTransform: "uppercase" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOARD MEMBERS — featured cards */}
      <section className="sec wrap" style={{ paddingTop: 90 }}>
        {/* <Reveal>
          <span className="eyebrow">Board of Management</span>
          <h2 style={{ marginTop: 14 }}>The people behind the promise.</h2>
          <p className="lead">From the founding welfare society to today's academic council, Amaltas is led by people who built this institution to serve a community.</p>
        </Reveal> */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 28, maxWidth: 820, margin: "50px auto 0" }}>
          {BOARD_MEMBERS.map((l, i) => (
            <Reveal key={i} delay={`d${i + 1}`}>
              <Link to={l.to} style={{ textDecoration: "none", display: "block", height: "100%" }}>
                <div className="leader-photo-card card-lift" style={{ height: "100%", cursor: "pointer", position: "relative" }}>
                  <div className="lpc-photo-area" style={{ aspectRatio: "3/3.6", position: "relative", overflow: "hidden" }}>
                    {l.photo
                      ? <img src={l.photo} alt={l.nm} style={{ transition: "transform .5s ease" }} />
                      : <div className="lpc-photo-initials">{l.nm.split(" ").filter(Boolean).pop()[0]}</div>}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(11,44,24,.55) 0%, transparent 50%)", opacity: 0, transition: "opacity .35s ease" }} className="card-img-overlay" />
                  </div>
                  <div className="lpc-info" style={{ position: "relative" }}>
                    <div className="lpc-role">{l.role}</div>
                    <div className="lpc-name">{l.nm}</div>
                    <p className="lpc-bio">{l.bio}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 14, fontSize: 13, fontWeight: 700, color: C.emerald, letterSpacing: ".04em" }}>
                      Read message <ArrowUpRight size={15} />
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ACADEMIC COUNCIL */}
      <section style={{ background: "linear-gradient(135deg,#eef6f1 0%,var(--ivory) 55%,#fdfce8 100%)", padding: "90px 0" }}>
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Academic Council</span>
            <h2 style={{ marginTop: 14 }}>Deans & Academic Heads.</h2>
            <p className="lead" style={{ marginTop: 18 }}>Each of Amaltas's seven institutes is led by an experienced dean overseeing curriculum, research, and clinical training standards.</p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 16, marginTop: 44 }}>
            {DEANS.map((d, i) => (
              <Reveal key={i} delay={`d${(i % 4) + 1}`}>
                <div style={{ background: "#fff", borderRadius: 18, padding: "22px 20px", border: "1px solid rgba(11,44,24,.08)", display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `linear-gradient(135deg,${C.navy},${C.emerald})`, display: "grid", placeItems: "center", color: C.gold, flexShrink: 0 }}>
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: C.emerald, marginBottom: 5 }}>{d.role}</div>
                    <div style={{ fontFamily: "Fraunces,serif", fontSize: 16, color: C.ink, lineHeight: 1.3 }}>{d.institute}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sec wrap" style={{ textAlign: "center" }}>
        <Reveal>
          <h2 style={{ maxWidth: 580, margin: "0 auto" }}>Want to know more about how we operate?</h2>
          <p className="lead" style={{ margin: "16px auto 28px" }}>Read our Mandatory Disclosure for full institutional and governance details.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/about/disclosure" className="btn btn-gold">Mandatory Disclosure <ArrowRight size={18} /></Link>
            <Link to="/about/chancellor" className="btn btn-dark">Chancellor's Message <ArrowRight size={18} /></Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
