import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Phone, Check, BookOpen, MonitorSmartphone, FlaskConical,
  Microscope, Presentation, Wifi, Library, GraduationCap, Cpu,
  ScrollText, Building2, ShieldCheck, FileSearch, Quote,
} from "lucide-react";
import { PageHero } from "../../components/Layout.jsx";
import { Reveal, StatNum } from "../../components/Primitives.jsx";
import { useInView } from "../../hooks/useScroll.js";
import { C } from "../../theme.js";
import { CONTACT } from "../../data/content.js";

const IMG = {
  hero:     "/assets/images%20of%20university/all%20institutes/university.jpg",
  overview: "/assets/images%20of%20university/all%20institutes/medical%20science.jpeg",
  library:  "/assets/images%20of%20university/campus%20life/2U8A2387.JPG",
  fallback: "/assets/images%20of%20university/campus%20life/435A1853.JPG",
};

/* ── count-up stat band ── */
const STATS = [
  { v: 300, suf: "+",  l: "Smart Classrooms" },
  { v: 120, suf: "+",  l: "Teaching & Research Labs" },
  { v: 111000, suf: "+", l: "Volumes in the Library" },
  { v: 100, suf: "%",  l: "Wi-Fi Campus Coverage" },
];

/* ── interactive facilities explorer ── */
const EXPLORER = [
  {
    key: "classrooms",
    icon: MonitorSmartphone,
    tab: "Smart Classrooms",
    title: "Smart & Digital Classrooms",
    desc: "Technology-enabled classrooms transform every lecture into an immersive, collaborative experience. Interactive displays, integrated audio-visual systems, and high-speed connectivity let faculty blend clinical case studies, live demonstrations, and virtual resources seamlessly into teaching.",
    features: [
      "Interactive smart boards & projectors",
      "Full audio-visual teaching systems",
      "Ergonomic, spacious seating layouts",
      "High-speed Wi-Fi in every room",
      "Recorded-lecture & e-learning ready",
      "Climate-controlled environments",
    ],
    img: "/assets/images%20of%20university/campus%20life/degree.JPG",
  },
  {
    key: "teaching-labs",
    icon: FlaskConical,
    tab: "Teaching Labs",
    title: "Academic & Teaching Laboratories",
    desc: "Hands-on learning spaces equipped with modern instrumentation across anatomy, physiology, biochemistry, pharmacology, nursing, and allied-health disciplines. Our labs bridge theory and practice, giving students the confidence and competence that clinical careers demand.",
    features: [
      "Discipline-specific practical labs",
      "Modern diagnostic instrumentation",
      "Simulation & skill-development stations",
      "Adequate stations per student batch",
      "Strict bio-safety & hygiene protocols",
      "Faculty-supervised practical sessions",
    ],
    img: "/assets/images%20of%20university/event%20and%20activites/nurse.jpeg",
  },
  {
    key: "research-labs",
    icon: Microscope,
    tab: "Research Labs",
    title: "Advanced Research Laboratories",
    desc: "State-of-the-art research facilities built to advance innovation and discovery in the health sciences. Interdisciplinary research spaces support postgraduate and Ph.D. scholars pursuing meaningful work in medicine, pharmacy, and integrative healthcare.",
    features: [
      "Dedicated postgraduate research wings",
      "Advanced analytical equipment",
      "Interdisciplinary collaboration spaces",
      "Support for funded research projects",
      "Ethics & bio-safety committee oversight",
      "Access to digital research databases",
    ],
    img: "/assets/images%20of%20university/all%20institutes/paramedical.jpg",
  },
  {
    key: "library",
    icon: Library,
    tab: "Central Library",
    title: "The Central Library",
    desc: "A dynamic hub of academic excellence, the Central Library houses an extensive print and digital collection spanning medicine, ayurveda, homoeopathy, nursing, pharmacy, and allied health sciences. Quiet reading halls, digital access points, and skilled staff make it the intellectual heart of campus.",
    features: [
      "Spacious reading & reference halls",
      "Vast e-journal & e-book access",
      "Digital catalogue & search kiosks",
      "Subscription medical databases",
      "Plagiarism & research-support tools",
      "Extended study hours during exams",
    ],
    img: IMG.library,
  },
  {
    key: "seminar",
    icon: Presentation,
    tab: "Seminar Halls",
    title: "Seminar Halls & Auditorium",
    desc: "Purpose-built seminar halls and a central auditorium host conferences, guest lectures, CME programmes, and cultural events. Professional acoustics, tiered seating, and full presentation systems make them ideal for academic gatherings of every scale.",
    features: [
      "Central air-conditioned auditorium",
      "Tiered, comfortable seating",
      "Professional sound & lighting",
      "Stage & projection facilities",
      "Ideal for CME & conferences",
      "Multiple breakout seminar rooms",
    ],
    img: "/assets/images%20of%20university/event%20and%20activites/lamp.jpeg",
  },
  {
    key: "digital",
    icon: Cpu,
    tab: "Digital Resources",
    title: "Computer Centre & Digital Resources",
    desc: "A well-equipped computer centre and campus-wide digital infrastructure keep students connected to knowledge around the clock. From e-libraries to learning-management systems, every academic resource is a click away, on and off campus.",
    features: [
      "Modern computer laboratories",
      "Campus-wide high-speed Wi-Fi",
      "Online learning-management system",
      "24/7 access to e-resources",
      "Digital library & database portals",
      "Dedicated IT support desk",
    ],
    img: "/assets/images%20of%20university/campus%20life/435A9602.JPG",
  },
];

/* ── central library stats ── */
const LIB_STATS = [
  { v: 111000, suf: "+", l: "Total Volumes" },
  { v: 500,    suf: "+", l: "Seating Capacity" },
  { v: 50000,  suf: "+", l: "E-Journals" },
  { v: 3,      suf: "",  l: "Floors of Reading Space" },
];

/* ── S. R. Ranganathan's five laws ── */
const FIVE_LAWS = [
  "Books are for use",
  "Every reader his or her book",
  "Every book its reader",
  "Save the time of the reader",
  "A library is a growing organism",
];

/* ── supporting academic amenities ── */
const AMENITIES = [
  { icon: Wifi,          label: "Campus-Wide Wi-Fi",     desc: "Uninterrupted high-speed fibre connectivity across every classroom, lab, library, and hostel block." },
  { icon: ScrollText,    label: "E-Learning Portal",     desc: "A learning-management system delivering notes, assignments, and recorded lectures anytime, anywhere." },
  { icon: FileSearch,    label: "Research Databases",    desc: "Subscription access to leading medical and scientific journals, e-books, and citation databases." },
  { icon: ShieldCheck,   label: "Plagiarism Tools",      desc: "Institutional access to originality-checking and paraphrasing tools that safeguard research integrity." },
  { icon: Building2,     label: "Central Auditorium",    desc: "A fully-equipped auditorium for convocations, conferences, guest lectures, and cultural programmes." },
  { icon: GraduationCap, label: "Skill Simulation Labs", desc: "Simulation stations that let students practise clinical skills safely before real-world placements." },
];

function Explorer() {
  const [active, setActive] = useState(EXPLORER[0].key);
  const item = EXPLORER.find((e) => e.key === active);
  const Icon = item.icon;
  return (
    <div>
      <div className="acad-tabs" role="tablist" aria-label="Academic facilities">
        {EXPLORER.map((e) => {
          const TabIcon = e.icon;
          const on = e.key === active;
          return (
            <button
              key={e.key}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(e.key)}
              className={`acad-tab ${on ? "on" : ""}`}
            >
              <TabIcon size={16} /> {e.tab}
            </button>
          );
        })}
      </div>

      <div className="acad-panel" key={active}>
        <div className="acad-panel-media">
          <img
            src={item.img}
            alt={item.title}
            onError={(ev) => { ev.target.src = IMG.fallback; }}
          />
          <div className="acad-panel-badge">
            <Icon size={16} /> {item.tab}
          </div>
        </div>
        <div className="acad-panel-body">
          <h3 style={{ fontFamily: "Fraunces,serif", fontSize: "clamp(1.5rem,3vw,2rem)", fontWeight: 400, lineHeight: 1.15, margin: 0 }}>
            {item.title}
          </h3>
          <p style={{ color: C.slate, fontSize: 15.5, lineHeight: 1.75, margin: "16px 0 22px" }}>{item.desc}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 18px" }}>
            {item.features.map((f) => (
              <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13.5 }}>
                <Check size={13} color={C.emerald} style={{ flexShrink: 0, marginTop: 3 }} />
                <span style={{ color: C.ink, lineHeight: 1.5 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AcademicFacilities() {
  const [statRef, statSeen] = useInView({ repeat: false });
  const [libRef, libSeen] = useInView({ repeat: false });

  return (
    <>
      <PageHero
        crumb="Facilities / Academic Facilities"
        eyebrow="Facilities"
        title="Where knowledge finds its home."
        sub="Smart classrooms, advanced laboratories, and a world-class central library — every academic facility at Amaltas is built to turn ambitious students into capable healers."
        bgImg={IMG.hero}
      />

      {/* ── STATS BAND ── */}
      <section className="wrap" style={{ marginTop: -50, position: "relative", zIndex: 5 }} ref={statRef}>
        <div className="hostel-stats-band">
          {STATS.map((s, i) => (
            <Reveal key={i} delay={`d${i + 1}`}>
              <div className="hostel-stat-cell" style={{ borderRight: i < 3 ? "1px solid rgba(11,44,24,.08)" : "none" }}>
                <div style={{ fontFamily: "Fraunces,serif", fontSize: "clamp(2rem,4vw,3rem)", lineHeight: 1, background: `linear-gradient(120deg,#11813D,${C.emeraldL})`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                  <StatNum v={s.v} suf={s.suf} run={statSeen} />
                </div>
                <div style={{ color: C.slate, marginTop: 8, fontSize: 14, fontWeight: 500 }}>{s.l}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── OVERVIEW SPLIT ── */}
      <section className="sec wrap" style={{ paddingBottom: 60 }}>
        <div className="hostel-split">
          <Reveal variant="left">
            <span className="eyebrow">Academic Infrastructure</span>
            <h2>Learning spaces designed for excellence.</h2>
            <p className="lead">
              Great healthcare education begins with great facilities. Across the Amaltas campus, technology-rich classrooms, discipline-specific laboratories, and a comprehensive digital library give students every resource they need to learn deeply and practise confidently.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 30 }}>
              {["Smart digital classrooms", "Advanced teaching & research labs", "Central library & e-resources", "Campus-wide Wi-Fi"].map((f) => (
                <div key={f} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13.5, color: C.ink, background: "rgba(18,134,63,.07)", border: "1px solid rgba(18,134,63,.14)", borderRadius: 100, padding: "7px 14px" }}>
                  <Check size={13} color={C.emerald} /> {f}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal variant="right" delay="d2">
            <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", aspectRatio: "4/3" }}>
              <img
                src={IMG.overview}
                alt="Amaltas academic campus"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={(e) => { e.target.src = IMG.fallback; }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top right,rgba(11,44,24,.45),transparent)" }} />
              <div style={{ position: "absolute", top: 20, right: 20, background: C.navy, color: C.goldL, borderRadius: 12, padding: "10px 16px", fontSize: 12, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase" }}>
                Dewas Campus
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── INTERACTIVE EXPLORER ── */}
      <section style={{ background: C.ivory, padding: "90px 0" }}>
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Explore</span>
            <h2>Tour our academic facilities.</h2>
            <p className="lead">Select a facility to explore what makes learning at Amaltas both rigorous and inspiring.</p>
          </Reveal>
          <div style={{ marginTop: 46 }}>
            <Explorer />
          </div>
        </div>
      </section>

      {/* ── CENTRAL LIBRARY FEATURE ── */}
      <section style={{ background: `radial-gradient(130% 140% at 10% 8%,${C.navy2} 0%,${C.navy} 60%)`, padding: "100px 0" }}>
        <div className="wrap hostel-split">
          <Reveal variant="left">
            <span className="eyebrow" style={{ color: C.goldL }}>Central Library</span>
            <h2 style={{ color: C.ivory, marginTop: 14 }}>The intellectual heart of campus.</h2>
            <p style={{ color: "rgba(247,244,236,.75)", fontSize: 16, marginTop: 16, lineHeight: 1.75, maxWidth: 460 }}>
              Spanning multiple floors, the Central Library brings together an expansive print collection, rich digital resources, and quiet, well-lit study spaces. It is where research begins, doubts are resolved, and lifelong scholarship takes root.
            </p>
            <div className="acad-lib-stats" ref={libRef}>
              {LIB_STATS.map((s, i) => (
                <div key={i} className="acad-lib-stat">
                  <div style={{ fontFamily: "Fraunces,serif", fontSize: "clamp(1.6rem,3vw,2.3rem)", color: C.emeraldL, lineHeight: 1 }}>
                    <StatNum v={s.v} suf={s.suf} run={libSeen} />
                  </div>
                  <div style={{ color: "rgba(247,244,236,.7)", fontSize: 13, marginTop: 6 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal variant="right" delay="d2">
            <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", aspectRatio: "4/3" }}>
              <img
                src={IMG.library}
                alt="Central library reading hall"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={(e) => { e.target.src = IMG.fallback; }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(11,44,24,.35),transparent)" }} />
              <div style={{ position: "absolute", bottom: 20, right: 20, background: C.gold, color: C.navy, borderRadius: 12, padding: "12px 18px", fontWeight: 700, fontSize: 13, display: "inline-flex", alignItems: "center", gap: 7 }}>
                <BookOpen size={15} /> Print & Digital
              </div>
            </div>
          </Reveal>
        </div>

        {/* Ranganathan's five laws */}
        <div className="wrap" style={{ marginTop: 70 }}>
          <Reveal>
            <div style={{ textAlign: "center", color: C.ivory, marginBottom: 34 }}>
              <span className="eyebrow" style={{ color: C.goldL }}>Guiding Principles</span>
              <h3 style={{ fontFamily: "Fraunces,serif", fontWeight: 400, fontSize: "clamp(1.4rem,3vw,2rem)", marginTop: 12, color: C.ivory }}>
                Ranganathan's Five Laws of Library Science
              </h3>
            </div>
          </Reveal>
          <div className="acad-laws">
            {FIVE_LAWS.map((law, i) => (
              <Reveal key={i} delay={`d${(i % 5) + 1}`}>
                <div className="acad-law card-lift">
                  <div className="acad-law-num">{i + 1}</div>
                  <p style={{ color: "rgba(247,244,236,.9)", fontSize: 14.5, lineHeight: 1.5, margin: 0 }}>{law}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUPPORTING AMENITIES ── */}
      <section className="sec wrap">
        <Reveal>
          <span className="eyebrow">More Resources</span>
          <h2>Everything a modern scholar needs.</h2>
          <p className="lead">Beyond classrooms and labs, a full ecosystem of digital and physical resources supports learning at every step.</p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 20, marginTop: 50 }}>
          {AMENITIES.map((a, i) => {
            const Icon = a.icon;
            return (
              <Reveal key={i} delay={`d${(i % 3) + 1}`}>
                <div className="card-lift" style={{ background: "#fff", borderRadius: 20, padding: "26px 22px", border: "1px solid rgba(11,44,24,.07)", height: "100%", display: "flex", gap: 18 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 13, background: `linear-gradient(135deg,${C.emerald},${C.emeraldL})`, display: "grid", placeItems: "center", color: "#fff", flexShrink: 0 }}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 16, marginBottom: 7 }}>{a.label}</h3>
                    <p style={{ color: C.slate, fontSize: 13.5, lineHeight: 1.6, margin: 0 }}>{a.desc}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── LIBRARIAN QUOTE ── */}
      <section style={{ background: C.ivory, padding: "90px 0" }}>
        <div className="wrap" style={{ maxWidth: 860, textAlign: "center" }}>
          <Reveal>
            <Quote size={40} color={C.emerald} style={{ opacity: .35 }} />
            <p style={{ fontFamily: "Fraunces,serif", fontWeight: 400, fontSize: "clamp(1.3rem,3vw,1.9rem)", lineHeight: 1.5, color: C.ink, margin: "18px auto 24px" }}>
              "The library is your gateway to knowledge, exploration, and academic excellence. Step in, stay curious, and let learning become a lifelong companion."
            </p>
            <div style={{ color: C.slate, fontSize: 14, fontWeight: 600 }}>— The Amaltas University Library Team</div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: `radial-gradient(120% 140% at 80% 20%,${C.emerald} 0%,${C.navy} 55%)`, padding: "100px 0" }}>
        <div className="wrap" style={{ textAlign: "center", color: C.ivory }}>
          <Reveal>
            <span className="eyebrow" style={{ color: C.goldL }}>Experience it yourself</span>
            <h2 style={{ color: C.ivory, margin: "14px auto 0", maxWidth: 600 }}>See our academic facilities in person.</h2>
            <p style={{ color: "rgba(247,244,236,.72)", fontSize: 16, maxWidth: 460, margin: "16px auto 34px", lineHeight: 1.7 }}>
              Book a campus visit or speak to our admissions team to learn how Amaltas turns world-class facilities into world-class outcomes.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/admissions" className="btn btn-gold">
                Begin Application <ArrowRight size={17} />
              </Link>
              <a href={`tel:${CONTACT.tollFree.replace(/-/g, "")}`} className="btn btn-ghost">
                <Phone size={15} /> {CONTACT.tollFree}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
