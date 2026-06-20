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

function HeroDecor() {
  return (
    <svg
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }}
      viewBox="0 0 1400 380"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* The earth — a single conviction planted in the soil of Malwa */}
      <line x1="600" y1="270" x2="1400" y2="270" stroke="#23A653" strokeWidth="1.2" opacity="0.2" />
      <rect x="600" y="270" width="800" height="110" fill="#050E07" opacity="0.3" />
      {/* Taproot going deep */}
      <path d="M920,270 C920,295 918,330 917,372" stroke="#23A653" strokeWidth="2.5" fill="none" opacity="0.3" />
      {/* Left root 1 */}
      <path d="M920,270 C913,282 882,296 848,308 C814,320 778,328 742,342" stroke="#23A653" strokeWidth="1.5" fill="none" opacity="0.25" />
      {/* Left root 2 */}
      <path d="M920,276 C908,292 872,308 836,322 C804,334 768,345 738,356" stroke="#12863F" strokeWidth="1" fill="none" opacity="0.16" />
      {/* Left lateral */}
      <path d="M848,308 C832,313 815,316 800,322" stroke="#12863F" strokeWidth="0.8" fill="none" opacity="0.14" />
      {/* Right root 1 */}
      <path d="M920,270 C930,284 960,298 993,310 C1026,322 1062,330 1096,344" stroke="#23A653" strokeWidth="1.5" fill="none" opacity="0.25" />
      {/* Right root 2 */}
      <path d="M920,276 C934,294 968,312 1004,324 C1038,335 1078,346 1110,358" stroke="#12863F" strokeWidth="1" fill="none" opacity="0.16" />
      {/* Right lateral */}
      <path d="M993,310 C1010,316 1028,320 1044,326" stroke="#12863F" strokeWidth="0.8" fill="none" opacity="0.14" />
      {/* Deep lateral from taproot */}
      <path d="M918,320 C905,326 888,329 872,334" stroke="#23A653" strokeWidth="1" fill="none" opacity="0.16" />
      <path d="M917,348 C930,354 946,360 962,364" stroke="#23A653" strokeWidth="0.8" fill="none" opacity="0.13" />
      {/* Stem rising */}
      <path d="M920,270 C920,248 921,222 920,188" stroke="#23A653" strokeWidth="2.5" fill="none" opacity="0.45" />
      <path d="M920,220 C919,210 918,200 917,190" stroke="#23A653" strokeWidth="2" fill="none" opacity="0.38" />
      {/* Left leaf (cotyledon) */}
      <path d="M920,222 C903,208 872,205 860,222 C848,239 870,256 920,245" fill="#12863F" opacity="0.22" />
      <path d="M920,222 C895,225 868,232 860,222" stroke="#23A653" strokeWidth="0.8" fill="none" opacity="0.22" />
      {/* Right leaf (cotyledon) */}
      <path d="M920,232 C937,218 968,215 980,232 C992,249 968,264 920,254" fill="#12863F" opacity="0.22" />
      <path d="M920,232 C947,235 968,240 980,232" stroke="#23A653" strokeWidth="0.8" fill="none" opacity="0.22" />
      {/* Apical bud — the gold of the future */}
      <circle cx="920" cy="184" r="11" fill="#F6E005" opacity="0.18" />
      <circle cx="920" cy="184" r="6" fill="#F6E005" opacity="0.28" />
      <circle cx="920" cy="184" r="3" fill="#23A653" opacity="0.45" />
      {/* Seed husk at soil line — the origin */}
      <ellipse cx="920" cy="268" rx="32" ry="14" fill="none" stroke="#F6E005" strokeWidth="1" opacity="0.14" />
      <ellipse cx="920" cy="268" rx="32" ry="14" fill="#F6E005" opacity="0.05" />
      {/* Scattered seeds nearby — other possibilities */}
      <ellipse cx="860" cy="262" rx="10" ry="5" fill="#F6E005" opacity="0.07" transform="rotate(-18,860,262)" />
      <ellipse cx="988" cy="258" rx="9" ry="4" fill="#F6E005" opacity="0.06" transform="rotate(22,988,258)" />
      <ellipse cx="810" cy="256" rx="7" ry="3.5" fill="#F6E005" opacity="0.05" transform="rotate(-8,810,256)" />
    </svg>
  );
}

export default function FounderChairmanMessage() {
  return (
    <>
      <PageHero
        crumb="About Us / Founder Chairman's Message"
        eyebrow="A message from the Founder"
        title="Rooted in service, grown with purpose."
        sub="Shri Suresh Singh Bhadoria — Founder Chairman, Mayank Welfare Society"
        bg="linear-gradient(145deg, #071810 0%, #0B2818 45%, #0F3A1F 100%)"
      >
        <HeroDecor />
      </PageHero>

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
