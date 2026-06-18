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

export default function AwardsRankings() {
  return (
    <>
      <PageHero
        crumb="About Us / Awards & Rankings"
        eyebrow="Recognition & Excellence"
        title="When the world took note."
        sub="From a Guinness World Record to state and national recognitions — each award reflects the dedication of our students, faculty, and the community we serve."
      />

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
