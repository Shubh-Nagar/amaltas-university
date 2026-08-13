import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, ArrowDown, Phone, Check, Presentation, Library, Cpu,
  FlaskConical, Microscope, Dumbbell, Theater, Utensils, Sofa,
  Recycle, Sun, TreePine, Award, Wind, Zap, Leaf, Sprout,
} from "lucide-react";
import { PageHero } from "../../components/Layout.jsx";
import { Reveal, StatNum } from "../../components/Primitives.jsx";
import { useInView } from "../../hooks/useScroll.js";
import { C } from "../../theme.js";
import { CONTACT } from "../../data/content.js";
import SEO from "../../components/SEO.jsx";
import { breadcrumbSchema } from "../../data/schema.js";

const FALLBACK = "/assets/images%20of%20university/campus%20life/435A1853.JPG";

const STATS = [
  { v: 7,   suf: "",  l: "Dedicated Facility Zones" },
  { v: 300, suf: "+", l: "Smart Classrooms & Labs" },
  { v: 500, suf: "+", l: "Library Reading Seats" },
  { v: 100, suf: "%", l: "Wi-Fi Campus Coverage" },
];

const FACILITIES = [
  {
    key: "classrooms",
    size: "lg",
    icon: Presentation,
    tag: "Learning Spaces",
    title: "University Classrooms & Lecture Halls",
    blurb: "Tiered lecture halls and technology-enabled classrooms give every batch — from first-year to final-year — a comfortable, distraction-free space to learn. Smart boards, projection systems, and acoustic design turn every lecture into a two-way conversation.",
    features: [
      "Tiered, amphitheatre-style seating for large batches",
      "Interactive smart boards & projector systems",
      "Individually ventilated, climate-controlled rooms",
      "Dedicated small-group tutorial rooms",
      "High-speed Wi-Fi in every classroom",
      "Recorded-lecture & hybrid-learning ready",
    ],
    img: "/assets/images%20of%20university/photo-gallery/2U8A8968.jpg",
    img2: "/assets/images%20of%20university/photo-gallery/2U8A9059.jpg",
  },
  {
    key: "library",
    size: "lg",
    icon: Library,
    tag: "Knowledge Hub",
    title: "University Library",
    blurb: "Spanning multiple floors, the central library houses an expansive print and digital collection across medicine, ayurveda, homoeopathy, nursing, pharmacy, and allied health sciences — with a 250-seat reading hall that stays open deep into exam season.",
    features: [
      "89,800+ volumes across all disciplines",
      "250-seat silent reading hall",
      "Subscription e-journals & medical databases",
      "Digital catalogue & search kiosks",
      "Plagiarism & citation-support tools",
      "Extended hours during examinations",
    ],
    img: "/assets/images%20of%20university/campus%20life/2U8A2387.JPG",
  },
  {
    key: "computer-labs",
    size: "sm",
    icon: Cpu,
    tag: "Digital Infrastructure",
    title: "University Computer Labs",
    blurb: "Rows of modern, networked workstations connect students to research databases, e-learning portals, and analysis software around the clock — backed by campus-wide fibre connectivity and a dedicated IT support desk.",
    features: [
      "Modern, networked computer workstations",
      "Campus-wide high-speed Wi-Fi",
      "Online learning-management system",
      "Statistical & research software access",
      "24/7 access to e-resources",
      "Dedicated IT support desk",
    ],
    img: "/assets/images%20of%20university/photo-gallery/2U8A2411.jpg",
  },
  {
    key: "labs",
    size: "sm",
    icon: FlaskConical,
    tag: "Hands-On Science",
    title: "University Laboratories & Research Facilities",
    blurb: "Discipline-specific laboratories in anatomy, physiology, biochemistry, pharmacology, microbiology, and allied-health sciences give students hands-on mastery long before they meet their first patient — under close faculty supervision.",
    features: [
      "Anatomy, physiology & biochemistry labs",
      "Pharmacology & pharmacognosy laboratories",
      "Modern microscopy & diagnostic instrumentation",
      "Adequate stations per student batch",
      "Strict bio-safety & hygiene protocols",
      "Faculty-supervised practical sessions",
    ],
    img: "/assets/images%20of%20university/photo-gallery/2U8A0731.jpg",
    img2: "/assets/images%20of%20university/photo-gallery/2U8A1253.jpg",
  },
  {
    key: "research",
    size: "wide",
    icon: Microscope,
    tag: "Innovation",
    title: "Research Centers and Institutes",
    blurb: "Dedicated research wings support postgraduate and Ph.D. scholars pursuing original work across medicine, ayurveda, homoeopathy, nursing, and pharmacy — with advanced instrumentation and an institutional ethics framework guiding every study.",
    features: [
      "Postgraduate & Ph.D. research wings",
      "Advanced analytical & diagnostic equipment",
      "Interdisciplinary collaboration spaces",
      "Institutional ethics committee oversight",
      "Support for funded research projects",
      "Access to national research databases",
    ],
    img: "/assets/images%20of%20university/photo-gallery/2U8A1767.jpg",
    img2: "/assets/images%20of%20university/photo-gallery/2U8A0849.jpg",
  },
  {
    key: "sports",
    size: "sm",
    icon: Dumbbell,
    tag: "Health & Vitality",
    title: "Sports & Physical Wellness",
    blurb: "A fully-equipped gymnasium, open sports grounds, and a dedicated yoga centre help students train their bodies with the same discipline they bring to their studies — because tomorrow's healers must first master their own wellness.",
    features: [
      "Fully-equipped gymnasium & cardio zone",
      "Open sports grounds for outdoor games",
      "Dedicated yoga & meditation centre",
      "Indoor games & recreation room",
      "Inter-institute sports tournaments",
      "Qualified fitness supervision",
    ],
    img: "/assets/images%20of%20university/photo-gallery/2U8A0526.jpg",
    img2: "/assets/images%20of%20university/photo-gallery/2U8A0439.jpg",
  },
  {
    key: "auditorium",
    size: "sm",
    icon: Theater,
    tag: "Gatherings & Culture",
    title: "University Auditoriums and Theaters",
    blurb: "Air-conditioned auditoriums and seminar theatres host convocations, CME programmes, guest lectures, and cultural festivals — engineered with professional acoustics, tiered seating, and full stage and projection systems.",
    features: [
      "Central air-conditioned auditorium",
      "Tiered, theatre-style seating",
      "Professional sound, lighting & stage systems",
      "Multiple breakout seminar halls",
      "Ideal for CME, conferences & convocations",
      "LED screens & live-streaming ready",
    ],
    img: "/assets/images%20of%20university/photo-gallery/2U8A1075.jpg",
    img2: "/assets/images%20of%20university/event%20and%20activites/lamp.jpeg",
  },
  // Hidden — Cafeterias and Dining Halls temporarily unlisted.
  // {
  //   key: "dining",
  //   size: "wide",
  //   icon: Utensils,
  //   tag: "Nourishment",
  //   title: "Cafeterias and Dining Halls",
  //   blurb: "Bright, spacious dining halls serve a rotating multi-cuisine menu — North Indian, South Indian, and continental — prepared in hygiene-certified kitchens, with dedicated seating for every institute on campus.",
  //   features: [
  //     "Multi-cuisine menu, four meals daily",
  //     "Hygiene-certified kitchens & food-safety audits",
  //     "Purified RO drinking water throughout",
  //     "Diet & medical-need meals on request",
  //     "Spacious, well-ventilated seating halls",
  //     "Separate dining for hostel residents",
  //   ],
  //   img: "https://images.unsplash.com/photo-1687709645238-0470ff08a6bf?auto=format&fit=crop&w=1000&q=75",
  //   img2: "https://images.unsplash.com/photo-1659005846067-11f6df8530da?auto=format&fit=crop&w=700&q=75",
  // },
  // Hidden — Study Lounges temporarily unlisted.
  // {
  //   key: "lounges",
  //   size: "sm",
  //   icon: Sofa,
  //   tag: "Focus Zones",
  //   title: "Study Lounges",
  //   blurb: "Informal lounges scattered across campus give students a quieter alternative to the library — comfortable seating, natural light, and Wi-Fi coverage make them the go-to spot for group projects and last-minute revision.",
  //   features: [
  //     "Comfortable, informal group-study seating",
  //     "Natural light & quiet study corners",
  //     "Campus-wide Wi-Fi coverage",
  //     "Ideal for group projects & discussions",
  //     "Open through extended campus hours",
  //     "Close to classrooms & the library",
  //   ],
  //   img: "https://images.unsplash.com/photo-1641958070110-46b2ac7fe186?auto=format&fit=crop&w=1000&q=75",
  // },
];

const GREEN_INITIATIVES = [
  {
    key: "practices",
    icon: Recycle,
    tag: "Our Philosophy",
    title: "Sustainable Campus Practices",
    blurb: "Sustainability at Amaltas isn't a side initiative — it's designed into how the campus runs day to day, from waste segregation and water conservation to a culture that treats the environment as part of the healing mission itself.",
    features: [
      "Segregated waste collection & recycling",
      "Rainwater harvesting across campus blocks",
      "Water-efficient fixtures in hostels & labs",
      "Reduced single-use plastic on campus",
      "Sustainability woven into student orientation",
      "Regular campus-wide clean-up drives",
    ],
    img: "/assets/images%20of%20university/campus%20life/DJI_0034.jpg",
    img2: "/assets/images%20of%20university/events/World%20Environment%20Day/3554367168.jpg",
  },
  {
    key: "solar",
    icon: Sun,
    tag: "Clean Energy",
    title: "Solar Power & Energy Efficiency",
    blurb: "Rooftop and ground-mounted solar arrays offset a significant share of the university's daily power draw, paired with LED retrofits and efficient HVAC across academic and hostel blocks to keep energy use — and its footprint — in check.",
    features: [
      "Rooftop & ground-mounted solar installations",
      "Grid-tied solar offsetting daily campus load",
      "Campus-wide LED lighting retrofit",
      "Energy-efficient HVAC in academic blocks",
      "Solar-assisted hostel water heating",
      "Ongoing metering to track energy savings",
    ],
    img: "/assets/images%20of%20university/campus%20life/solar.png",
  },
  {
    key: "plantation",
    icon: TreePine,
    tag: "Green Cover",
    title: "Plantation & Tree-Planting Drives",
    blurb: "Thousands of native and flowering trees — including the Amaltas after which the university is named — line the campus, planted through annual drives that involve students, faculty and the surrounding community in growing the campus canopy year on year.",
    features: [
      "Annual campus-wide plantation drives",
      "Native & flowering species prioritised",
      "Student and faculty volunteer planting",
      "Dedicated botanical & herbal gardens",
      "Tree-adoption programme for hostellers",
      "Community plantation outreach events",
    ],
    img: "/assets/images%20of%20university/campus%20life/plantation1.jpg",
    img2: "/assets/images%20of%20university/campus%20life/plantation3.jpg",
  },
  {
    key: "recognition",
    icon: Award,
    tag: "Recognised Impact",
    title: "\"Green Campus\" Recognition",
    blurb: "The commitment to a cleaner, greener campus has been recognised beyond the university gates — a reflection of consistent investment in renewable energy, plantation and sustainable operations rather than a one-time certification exercise.",
    features: [
      "Recognised for sustainable campus operations",
      "Benchmarked against green-campus criteria",
      "Renewed through ongoing environmental audits",
      "Featured in university sustainability reporting",
      "Aligned with national green-education goals",
      "A standard maintained, not a one-time award",
    ],
    img: "/assets/images%20of%20university/campus%20life/plantation2.jpg",
  },
];

const GREEN_BG_ICONS = [
  { Icon: Leaf,     top: "3%",  left: "5%",   size: 92, color: C.emerald,  opacity: 0.10, fx: 16,  fy: -22, fr: 8,  dur: 16, delay: 0 },
  { Icon: Sun,      top: "8%",  right: "7%",  size: 68, color: C.gold,     opacity: 0.16, fx: -14, fy: 18,  fr: -6, dur: 20, delay: 1.5 },
  { Icon: Wind,     top: "24%", left: "10%",  size: 58, color: C.emeraldL, opacity: 0.11, fx: 12,  fy: 16,  fr: 5,  dur: 18, delay: 2.5 },
  { Icon: Zap,      top: "34%", right: "12%", size: 46, color: C.gold,     opacity: 0.15, fx: -10, fy: -14, fr: -8, dur: 14, delay: 0.8 },
  { Icon: Sprout,   top: "50%", left: "6%",   size: 72, color: C.emerald,  opacity: 0.10, fx: 14,  fy: 20,  fr: 6,  dur: 19, delay: 3 },
  { Icon: TreePine, top: "58%", right: "5%",  size: 88, color: C.emeraldL, opacity: 0.09, fx: -16, fy: -20, fr: -5, dur: 22, delay: 1 },
  { Icon: Leaf,     top: "76%", left: "16%",  size: 54, color: C.gold,     opacity: 0.14, fx: 10,  fy: -16, fr: 7,  dur: 15, delay: 2 },
  { Icon: Sun,      top: "88%", right: "18%", size: 62, color: C.emerald,  opacity: 0.10, fx: -12, fy: 14,  fr: -4, dur: 17, delay: 0.5 },
];

function GreenBgDecor() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }} aria-hidden="true">
      {GREEN_BG_ICONS.map((d, i) => {
        const { Icon } = d;
        return (
          <Icon
            key={i}
            size={d.size}
            className="eco-float-icon"
            style={{
              position: "absolute",
              top: d.top, left: d.left, right: d.right, bottom: d.bottom,
              color: d.color, opacity: d.opacity,
              "--fx": `${d.fx}px`, "--fy": `${d.fy}px`, "--fr": `${d.fr}deg`,
              "--fdur": `${d.dur}s`, "--fdelay": `${d.delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}

function BentoTile({ f }) {
  const Icon = f.icon;
  return (
    <a href={`#${f.key}`} className={`cf-tile ${f.size === "lg" ? "lg" : f.size === "wide" ? "wide" : ""}`}>
      <img src={f.img} alt={f.title} onError={(e) => { e.target.src = FALLBACK; }} />
      <div className="cf-tile-badge"><Icon size={17} /></div>
      <div className="cf-tile-label">
        <span className="cf-tile-tag">{f.tag}</span>
        <div className="cf-tile-name">{f.title}</div>
      </div>
    </a>
  );
}

function FacilityRow({ f, i }) {
  const Icon = f.icon;
  const flip = i % 2 === 1;
  return (
    <div id={f.key} className="cf-row" style={{ scrollMarginTop: 90 }}>
      <Reveal variant={flip ? "right" : "left"} cls={flip ? "" : ""} delay="">
        <div style={{ order: flip ? 2 : 1 }}>
          <div className="cf-row-media">
            <img src={f.img} alt={f.title} onError={(e) => { e.target.src = FALLBACK; }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top right,rgba(11,44,24,.4),transparent 55%)" }} />
          </div>
          {f.img2 && (
            <div className="cf-row-media-2">
              <img src={f.img2} alt={`${f.title} — detail`} onError={(e) => { e.target.src = FALLBACK; }} />
            </div>
          )}
        </div>
      </Reveal>

      <Reveal variant={flip ? "left" : "right"} delay="d2">
        <div style={{ order: flip ? 1 : 2 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: `linear-gradient(135deg,${C.emerald},${C.emeraldL})`, display: "grid", placeItems: "center", color: "#fff", flexShrink: 0 }}>
              <Icon size={18} />
            </div>
            <span className="eyebrow">{f.tag}</span>
          </div>
          <h2 style={{ fontSize: "clamp(1.7rem,3.4vw,2.5rem)" }}>{f.title}</h2>
          <p style={{ color: C.slate, fontSize: 15.5, lineHeight: 1.75, margin: "18px 0 24px", maxWidth: 480 }}>{f.blurb}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 18px", maxWidth: 480 }}>
            {f.features.map((feat) => (
              <div key={feat} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13.5 }}>
                <Check size={13} color={C.emerald} style={{ flexShrink: 0, marginTop: 3 }} />
                <span style={{ color: C.ink, lineHeight: 1.5 }}>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function GreenRow({ g, i }) {
  const Icon = g.icon;
  const flip = i % 2 === 1;
  const last = i === GREEN_INITIATIVES.length - 1;
  return (
    <div
      id={g.key}
      className="cf-row"
      style={{ scrollMarginTop: 90, borderBottom: last ? "none" : "1px solid rgba(11,44,24,.08)" }}
    >
      <Reveal variant={flip ? "right" : "left"}>
        <div style={{ order: flip ? 2 : 1 }}>
          <div className="cf-row-media">
            <img src={g.img} alt={g.title} onError={(e) => { e.target.src = FALLBACK; }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top right,rgba(11,44,24,.4),transparent 55%)" }} />
          </div>
          {g.img2 && (
            <div className="cf-row-media-2">
              <img src={g.img2} alt={`${g.title} — detail`} onError={(e) => { e.target.src = FALLBACK; }} />
            </div>
          )}
        </div>
      </Reveal>

      <Reveal variant={flip ? "left" : "right"} delay="d2">
        <div style={{ order: flip ? 1 : 2 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: `linear-gradient(135deg,${C.gold},${C.goldL})`, display: "grid", placeItems: "center", color: C.navy, flexShrink: 0 }}>
              <Icon size={18} />
            </div>
            <span className="eyebrow">{g.tag}</span>
          </div>
          <h2 style={{ fontSize: "clamp(1.7rem,3.4vw,2.5rem)" }}>{g.title}</h2>
          <p style={{ color: C.slate, fontSize: 15.5, lineHeight: 1.75, margin: "18px 0 24px", maxWidth: 480 }}>{g.blurb}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 18px", maxWidth: 480 }}>
            {g.features.map((feat) => (
              <div key={feat} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13.5 }}>
                <Check size={13} color={C.emerald} style={{ flexShrink: 0, marginTop: 3 }} />
                <span style={{ color: C.ink, lineHeight: 1.5 }}>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export default function CampusFacilities() {
  const [statRef, statSeen] = useInView({ repeat: false });

  return (
    <>
      <SEO
        title="Campus Facilities — Sports, Green Campus & Recreation"
        description="Explore Amaltas University's campus facilities in Dewas: sports grounds, gym, yoga centre, cultural spaces, dining and a sustainability-focused green campus with 100% Wi-Fi coverage."
        path="/facilities/campus"
        jsonLd={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Facilities", path: "/facilities/academic" }, { name: "Campus Facilities", path: "/facilities/campus" }])}
      />
      <PageHero
        crumb="Facilities / Campus Facilities"
        eyebrow="Facilities"
        title="Seven spaces. One extraordinary campus life."
        sub="From tiered lecture halls to open sports grounds, every corner of the Amaltas campus is designed for students to learn, research, recover, and belong — all in one place."
        bgImg="/assets/images%20of%20university/photo-gallery/DJI_0019.jpg"
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

      {/* ── INTRO ── */}
      <section className="sec wrap" style={{ paddingBottom: 40, textAlign: "center" }}>
        <Reveal>
          <span className="eyebrow" style={{ justifyContent: "center" }}>Campus Facilities</span>
          <h2 style={{ maxWidth: 800, margin: "14px auto 0" }}>Everywhere you look, a reason to stay a little longer.</h2>
          <p className="lead" style={{ maxWidth: 640, margin: "18px auto 0" }}>
            A great health-sciences education doesn't stop at the classroom door. Explore the seven facility zones that make up daily life at Amaltas — tap any tile to jump straight to it.
          </p>
        </Reveal>
      </section>

      {/* ── BENTO SHOWCASE ── */}
      <section className="wrap" style={{ paddingBottom: 100 }}>
        <Reveal variant="zoom">
          <div className="cf-bento">
            {FACILITIES.map((f) => <BentoTile key={f.key} f={f} />)}
          </div>
        </Reveal>
        <div style={{ textAlign: "center", marginTop: 34 }}>
          <a href="#classrooms" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: C.emerald, fontWeight: 600, fontSize: 14 }}>
            Explore every facility in detail <ArrowDown size={15} />
          </a>
        </div>
      </section>

      {/* ── DETAIL ROWS ── */}
      <section style={{ background: C.ivory, padding: "20px 0 10px" }}>
        <div className="wrap">
          {FACILITIES.map((f, i) => <FacilityRow key={f.key} f={f} i={i} />)}
        </div>
      </section>

      {/* ── GREEN CAMPUS ── */}
      <section className="sec" style={{ background: "linear-gradient(175deg,#F4FBF7 0%,#EDF7F1 100%)", padding: "100px 0", overflow: "hidden" }}>
        <GreenBgDecor />
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ textAlign: "center" }}>
              <span className="eyebrow" style={{ justifyContent: "center" }}>Sustainability at Amaltas</span>
              <h2 style={{ maxWidth: 780, margin: "14px auto 0" }}>A campus that grows the way it heals — responsibly.</h2>
              <p className="lead" style={{ maxWidth: 640, margin: "18px auto 0" }}>
                Sustainability isn't a side initiative here — it's built into how the campus runs, from the power in its wires to the shade over its walkways.
              </p>
            </div>
          </Reveal>

          <div style={{ marginTop: 70 }}>
            {GREEN_INITIATIVES.map((g, i) => <GreenRow key={g.key} g={g} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: `radial-gradient(120% 140% at 80% 20%,${C.emerald} 0%,${C.navy} 55%)`, padding: "100px 0" }}>
        <div className="wrap" style={{ textAlign: "center", color: C.ivory }}>
          <Reveal>
            <span className="eyebrow" style={{ color: C.goldL, justifyContent: "center" }}>See it for yourself</span>
            <h2 style={{ color: C.ivory, margin: "14px auto 0", maxWidth: 600 }}>Walk the campus before you commit.</h2>
            <p style={{ color: "rgba(247,244,236,.72)", fontSize: 16, maxWidth: 460, margin: "16px auto 34px", lineHeight: 1.7 }}>
              Book a campus visit or speak to our admissions team to experience these facilities in person.
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
