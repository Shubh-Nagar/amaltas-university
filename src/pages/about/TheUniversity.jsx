import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, MapPin, Users, Leaf, CalendarDays, ShieldCheck,
  Building2, Award, Sparkles, FlaskConical, HandHeart, Stethoscope,
  GraduationCap, Dumbbell, Music, Home as HomeIcon, Quote, FileText, Download,
} from "lucide-react";
import { Reveal } from "../../components/Primitives.jsx";
import { VISION_MISSION, CHANCELLOR_MESSAGE } from "../../data/content.js";

/* ─── Brand tokens (light-theme version of the page) ───────────────────────
   Primary   #10803B   deep Amaltas green
   Light bg  #edf7f1   very light mint — section alternates
   Pale bg   #fefef5   near-white with yellow warmth
   Gold      #F6E005   accent yellow
   Text      #0d2618   near-black green
   Slate     #3d6248   secondary body text
──────────────────────────────────────────────────────────────────────────── */
const G = {
  green:    "#10803B",
  greenL:   "#19a04e",
  greenXL:  "#22ba5c",
  greenBg:  "#edf7f1",
  greenBgL: "#f4fbf7",
  yellowBg: "#fffce8",
  yellowBgM:"#fef9c3",
  gold:     "#F6E005",
  goldL:    "#FBED5B",
  ink:      "#0d2618",
  slate:    "#3d6248",
  border:   "rgba(16,128,59,.12)",
  borderM:  "rgba(16,128,59,.2)",
};

const INSTITUTE_PHOTOS = [
  { name: "Amaltas Medical Sciences",         short: "MBBS · MD · MS",            photo: "/assets/images%20of%20university/all%20institutes/medical.png" },
  { name: "Amaltas Ayurvedic College",        short: "BAMS · AYUSH",              photo: "/assets/images%20of%20university/all%20institutes/ayurveda.png" },
  { name: "Amaltas Institute of Homoeopathy", short: "BHMS",                      photo: "/assets/images%20of%20university/all%20institutes/homoepathy.png" },
  { name: "Amaltas Nursing Sciences",         short: "B.Sc. · P.B.B.Sc. · M.Sc.",photo: "/assets/images%20of%20university/all%20institutes/nursing.jpeg" },
  { name: "Amaltas Institute of Pharmacy",    short: "B.Pharm · M.Pharm",         photo: "/assets/images%20of%20university/all%20institutes/pharmacy.png" },
  { name: "Amaltas Paramedical Sciences",     short: "BMLT · DMLT · Imaging",     photo: "/assets/images%20of%20university/all%20institutes/paramedical.jpeg" },
  { name: "Amaltas Allied & Rehabilitation",  short: "Physiotherapy · Psychology", photo: "/assets/images%20of%20university/all%20institutes/alied.jpg" },
];

const ADVANTAGES = [
  { icon: Building2,    t: "Hospital-Embedded Learning",    d: "A live 1500+ bed teaching hospital is your classroom — real patients, real outcomes, from your very first year." },
  { icon: Stethoscope,  t: "Seven Disciplines, One Campus", d: "Modern medicine, Ayurveda, Homoeopathy, Nursing, Pharmacy, Paramedical and Allied Sciences under a single roof." },
  { icon: Users,        t: "Mentors, Not Just Lecturers",   d: "Renowned clinicians and scholars who know your name and shape your path through every semester." },
  { icon: FlaskConical, t: "Research From Day One",         d: "Active labs, publications and Ph.D. programmes across all seven health disciplines — discovery is part of the curriculum." },
  { icon: Sparkles,     t: "Scholarships That Reach",       d: "Merit and need-based aid so that talent — not tuition — decides who heals tomorrow." },
  { icon: Award,        t: "Recognised & Accredited",       d: "Programmes structured to national regulatory standards across every health-science field we teach." },
];

const OUTCOMES = [
  { icon: Building2,     v: "1500+",  l: "Beds for hands-on training" },
  { icon: Stethoscope,   v: "Year 1", l: "Clinical exposure begins" },
  { icon: GraduationCap, v: "7",      l: "Disciplines with career pathways" },
  { icon: HandHeart,     v: "100%",   l: "Stipend-paid internships" },
];

const CAREER_PATHS = [
  "Government & District Hospitals",
  "Multispeciality Hospital Chains",
  "AYUSH & Wellness Centres",
  "Diagnostic & Pharma Laboratories",
  "Rural Health & NGO Missions",
  "PG · Residency · Ph.D. Research",
];

const BEYOND = [
  { icon: FlaskConical, t: "Research & Innovation",     d: "Active labs, peer-reviewed publications and Ph.D. programmes across all seven health disciplines.", img: "/assets/images%20of%20university/event%20and%20activites/nurse.jpeg" },
  { icon: HandHeart,    t: "Community Health Outreach", d: "Rural health missions, free wellness camps and outreach clinics woven into the academic calendar.",  img: "/assets/images%20of%20university/event%20and%20activites/yoga.jpg" },
  { icon: Stethoscope,  t: "Skill & Simulation Labs",   d: "State-of-the-art simulation centres where students rehearse clinical skills before the ward.",       img: "/assets/images%20of%20university/campus%20life/2U8A2387.JPG" },
  { icon: Dumbbell,     t: "Sports & Wellness",         d: "Courts, grounds and a culture that treats physical wellbeing as part of a healer's training.",        img: "/assets/images%20of%20university/campus%20life/sport.JPG" },
  { icon: Music,        t: "Cultural Life & Clubs",     d: "From the lamp-lighting ceremony to festivals and clubs — a campus alive beyond the classroom.",        img: "/assets/images%20of%20university/event%20and%20activites/lamp.jpeg" },
  { icon: HomeIcon,     t: "Hostels & Campus Living",   d: "Safe, supportive residential communities where every student is known by name.",                      img: "/assets/images%20of%20university/campus%20life/degree.JPG" },
];

const APPROVALS = [
  { src: "/assets/images%20of%20university/recognisation/nmc.jpg",      label: "National Medical Commission" },
  { src: "/assets/images%20of%20university/recognisation/ugc.png",      label: "University Grants Commission" },
  { src: "/assets/images%20of%20university/recognisation/ccim.png",     label: "Central Council of Indian Medicine" },
  { src: "/assets/images%20of%20university/recognisation/ccrh.jpg",     label: "Central Council of Homoeopathy" },
  { src: "/assets/images%20of%20university/recognisation/inc-logo.png", label: "Indian Nursing Council" },
  { src: "/assets/images%20of%20university/recognisation/pci-logo.png", label: "Pharmacy Council of India" },
  { src: "/assets/images%20of%20university/recognisation/rci.png",      label: "Rehabilitation Council of India" },
  { src: "/assets/images%20of%20university/recognisation/nabh-logo.png",label: "NABH" },
];

const HERO_CHIPS = [
  { icon: CalendarDays, label: "Established 2013" },
  { icon: MapPin,       label: "Dewas, Madhya Pradesh" },
  { icon: Building2,    label: "7 Health-Science Institutes" },
  { icon: ShieldCheck,  label: "Govt. Recognised & Accredited" },
];

/* Golden-shower motif — Cassia fistula racemes in gold, now visible on light bg */
function GoldenShower() {
  const racemes = [
    { x: 1150, flowers: [28, 50, 72, 94, 118, 142, 168, 196] },
    { x: 1268, flowers: [22, 44, 66, 90, 114, 140, 168] },
    { x: 1360, flowers: [18, 40, 64, 90, 118] },
    { x: 1052, flowers: [34, 58, 84, 112, 142, 174, 208] },
  ];
  return (
    <svg
      aria-hidden="true"
      style={{ position: "absolute", top: 0, right: 0, width: "min(640px,55%)", height: "100%", pointerEvents: "none", zIndex: 1 }}
      viewBox="0 0 1400 460"
      preserveAspectRatio="xMidYMin slice"
    >
      <defs>
        <radialGradient id="gs-glow" cx="88%" cy="5%" r="52%">
          <stop offset="0%"   stopColor="#F6E005" stopOpacity="0.28" />
          <stop offset="60%"  stopColor="#F6E005" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#F6E005" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1400" height="460" fill="url(#gs-glow)" />
      <path d="M980,4 C1080,2 1220,2 1340,6 C1380,7 1400,9 1400,9" stroke="#10803B" strokeWidth="2" fill="none" opacity="0.3" />
      {racemes.map((rc, ri) => {
        const last = rc.flowers[rc.flowers.length - 1];
        return (
          <g key={ri}>
            <path d={`M${rc.x},0 C${rc.x + 4},${last * 0.4} ${rc.x + 10},${last * 0.7} ${rc.x + 8},${last + 14}`}
              stroke="#10803B" strokeWidth="1.4" fill="none" opacity="0.35" />
            {rc.flowers.map((fy, fi) => {
              const fx = rc.x + Math.sin(fy * 0.12) * 7;
              return (
                <g key={fi}>
                  <line x1={rc.x + 2} y1={fy - 7} x2={fx} y2={fy} stroke="#10803B" strokeWidth="0.7" opacity="0.28" />
                  <g transform={`translate(${fx},${fy}) scale(${0.5 + (fi % 3) * 0.06})`}>
                    {[0, 72, 144, 216, 288].map(a => (
                      <ellipse key={a} cx="0" cy="-18" rx="7" ry="15" fill="#F6E005" opacity={0.45 - fi * 0.02} transform={`rotate(${a})`} />
                    ))}
                    <circle r="3.5" fill="#10803B" opacity="0.55" />
                  </g>
                </g>
              );
            })}
          </g>
        );
      })}
      {[
        { x: 1090, y: 320, rx: 5, ry: 12, r: 32 },
        { x: 1220, y: 360, rx: 4, ry: 10, r: -24 },
        { x: 1320, y: 300, rx: 6, ry: 13, r: 50 },
        { x: 1160, y: 410, rx: 3.5, ry: 8, r: 14 },
      ].map(({ x, y, rx, ry, r }, i) => (
        <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} fill="#F6E005" opacity="0.22" transform={`rotate(${r},${x},${y})`} />
      ))}
    </svg>
  );
}


function BeyondCarousel() {
  const items = BEYOND;
  const [perView, setPerView] = useState(3);
  const [index, setIndex] = useState(0);
  const [withAnim, setWithAnim] = useState(true);
  const paused = useRef(false);

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      const pv = w < 640 ? 1 : w < 1000 ? 2 : 3;
      setPerView(pv); setIndex(0); setWithAnim(true);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  useEffect(() => {
    const id = setInterval(() => { if (!paused.current) setIndex(i => i + 1); }, 4000);
    return () => clearInterval(id);
  }, [perView]);

  useEffect(() => {
    if (index === items.length) {
      const t = setTimeout(() => { setWithAnim(false); setIndex(0); }, 650);
      return () => clearTimeout(t);
    }
  }, [index, items.length]);

  useEffect(() => {
    if (!withAnim) {
      const r = requestAnimationFrame(() => requestAnimationFrame(() => setWithAnim(true)));
      return () => cancelAnimationFrame(r);
    }
  }, [withAnim]);

  const cardBasis = 100 / perView;
  const extended  = [...items, ...items.slice(0, perView)];
  const activeDot = ((index % items.length) + items.length) % items.length;

  return (
    <div onMouseEnter={() => { paused.current = true; }} onMouseLeave={() => { paused.current = false; }}>
      <div style={{ overflow: "hidden" }}>
        <div style={{ display: "flex", transform: `translateX(-${index * cardBasis}%)`, transition: withAnim ? "transform .65s cubic-bezier(.4,0,.2,1)" : "none" }}>
          {extended.map((b, i) => {
            const Icon = b.icon;
            return (
              <div key={i} style={{ flex: `0 0 ${cardBasis}%`, maxWidth: `${cardBasis}%`, padding: "0 10px", boxSizing: "border-box" }}>
                <div className="card-lift" style={{ borderRadius: 20, overflow: "hidden", background: "#fff", border: `1px solid ${G.border}`, height: "100%", boxShadow: `0 12px 36px -22px rgba(16,128,59,.15)` }}>
                  <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
                    <img src={b.img} alt={b.t} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    {/* light green gradient — NOT dark */}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(16,128,59,.45) 0%, transparent 55%)" }} />
                    <div style={{ position: "absolute", bottom: 12, left: 12, width: 42, height: 42, borderRadius: 11, background: "#fff", display: "grid", placeItems: "center", color: G.green, boxShadow: "0 4px 14px rgba(16,128,59,.2)" }}>
                      <Icon size={19} />
                    </div>
                  </div>
                  <div style={{ padding: "22px 24px 26px" }}>
                    <h3 style={{ fontSize: 18, margin: "0 0 8px", color: G.ink }}>{b.t}</h3>
                    <p style={{ color: G.slate, fontSize: 14, lineHeight: 1.65 }}>{b.d}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ display: "flex", gap: 9, justifyContent: "center", marginTop: 30 }}>
        {items.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => { setWithAnim(true); setIndex(i); }}
            style={{
              width: activeDot === i ? 26 : 9, height: 9, borderRadius: 100,
              border: "none", cursor: "pointer", padding: 0,
              background: activeDot === i ? G.green : G.border,
              transition: "width .35s ease, background .35s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function TheUniversity() {
  return (
    <>
      {/* ══ HERO — light gradient, campus photo fades in from right ══ */}
      <header
        className="page-hero"
        style={{
          background: `linear-gradient(105deg, rgba(237,247,241,.98) 0%, rgba(245,252,248,.95) 40%, rgba(253,252,232,.55) 70%, rgba(253,252,232,0) 100%), url('/assets/images%20of%20university/campus%20life/435A1853.JPG')`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          paddingTop: 120,
          paddingBottom: 60,
          minHeight: "auto",
          display: "flex",
          alignItems: "center",
          color: G.ink,
        }}
      >
        {/* soft green glow left */}
        <div className="hero-glow" style={{ width: 480, height: 480, background: "rgba(16,128,59,.12)", left: "-140px", top: "-15%" }} />
        {/* gold warmth top-right */}
        <div className="hero-glow" style={{ width: 340, height: 340, background: "rgba(246,224,5,.28)", right: "2%", top: "-8%" }} />
        <GoldenShower />
        <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
          <div className="crumb" style={{ color: G.slate }}>
            <Link to="/" style={{ color: G.green }}>Home</Link> &nbsp;/&nbsp; About Us / The University
          </div>
          <span className="eyebrow" style={{ color: G.green, marginTop: 14 }}>About Amaltas University</span>
          <h1 style={{ marginTop: 16, maxWidth: 860, color: G.ink }}>The University</h1>
          {/* Trust chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 30 }}>
            {HERO_CHIPS.map(({ icon: Icon, label }, i) => (
              <span
                key={i}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 9,
                  padding: "9px 16px", borderRadius: 100,
                  background: "#fff", border: `1px solid ${G.borderM}`,
                  color: G.ink, fontSize: 13.5, fontWeight: 500,
                  boxShadow: "0 2px 12px rgba(16,128,59,.1)",
                }}
              >
                <Icon size={15} color={G.green} style={{ flexShrink: 0 }} />
                {label}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
            <Link to="/admissions" className="btn btn-gold">Apply for 2026–27 <ArrowRight size={18} /></Link>
            <Link to="/institutions" className="btn btn-dark">Explore our institutes <ArrowRight size={18} /></Link>
          </div>
        </div>
      </header>

      {/* ── AMALTAS UNIVERSITY — OUR STORY ── */}
      <section className="sec wrap" style={{ paddingTop: 90 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(400px,1fr))", gap: 60, alignItems: "center" }}>
          <Reveal variant="left">
            <div>
              <span className="eyebrow">Amaltas University</span>
              <h2 style={{ marginTop: 14, color: G.ink }}>A single resolve that became a university.</h2>
              <p style={{ color: G.slate, fontSize: 16.5, lineHeight: 1.85, marginTop: 20 }}>
                Amaltas University began not in a boardroom, but in a conviction — that the Malwa heartland of Madhya Pradesh deserved a medical institution worthy of its people's ambitions.
              </p>
              <p style={{ color: G.slate, fontSize: 16.5, lineHeight: 1.85, marginTop: 16 }}>
                Founded under the Mayank Welfare Society by Shri Suresh Singh Bhadoria, the university grew institute by institute: first a medical college with a live teaching hospital, then Ayurveda, Homoeopathy, Nursing, Pharmacy, Paramedical, and Allied Sciences — seven disciplines mirroring the full spectrum of human healing.
              </p>
              <p style={{ color: G.slate, fontSize: 16.5, lineHeight: 1.85, marginTop: 16 }}>
                Today, Amaltas University stands in Village Bangar on the Dewas–Ujjain Highway — a campus where 1500+ hospital beds, research labs, simulation centres, and hostel communities form a living ecosystem for tomorrow's healers.
              </p>
              <div style={{ display: "flex", gap: 18, marginTop: 28, flexWrap: "wrap", alignItems: "center" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13.5, color: G.slate, fontWeight: 500 }}>
                  <MapPin size={15} color={G.green} /> Dewas, Madhya Pradesh
                </span>
                <span style={{ width: 1, height: 16, background: G.border }} />
                <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13.5, color: G.slate, fontWeight: 500 }}>
                  <Users size={15} color={G.green} /> Mayank Welfare Society
                </span>
              </div>
            </div>
          </Reveal>

          {/* University photo */}
          <Reveal variant="img">
            <div style={{ position: "relative", borderRadius: 26, overflow: "hidden", aspectRatio: "4/3", boxShadow: `0 40px 80px -40px rgba(16,128,59,.25)`, border: `3px solid ${G.greenBg}` }}>
              <img
                src="/assets/images%20of%20university/our%20purpose/university.jpg"
                alt="Amaltas University"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 60%, rgba(16,128,59,.35) 100%)" }} />
              <div style={{ position: "absolute", bottom: 16, left: 16, fontSize: 12.5, fontWeight: 600, display: "flex", alignItems: "center", gap: 7, background: "rgba(255,255,255,.88)", backdropFilter: "blur(8px)", color: G.green, padding: "7px 14px", borderRadius: 100, border: `1px solid ${G.border}` }}>
                <Leaf size={12} /> Where Healing Grows
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── VISION & MISSION ── */}
      <section style={{ background: G.greenBg, padding: "90px 0" }}>
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Vision &amp; Mission</span>
            <h2 style={{ marginTop: 14, maxWidth: 700, color: G.ink }}>Purpose written into every programme.</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(360px,1fr))", gap: 26, marginTop: 44 }}>
            {/* Vision — white card */}
            <Reveal variant="left">
              <div style={{ background: "#fff", borderRadius: 24, padding: "36px 32px", border: `1px solid ${G.border}`, height: "100%", boxShadow: `0 12px 40px -20px rgba(16,128,59,.12)` }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: `linear-gradient(135deg,${G.green},${G.greenL})`, display: "grid", placeItems: "center", color: "#fff", marginBottom: 20 }}>
                  <Leaf size={22} />
                </div>
                <h3 style={{ fontSize: 21, marginBottom: 16, color: G.ink }}>Our Vision</h3>
                <p style={{ color: G.slate, fontSize: 16, lineHeight: 1.85 }}>{VISION_MISSION.vision}</p>
              </div>
            </Reveal>
            {/* Mission — light yellow-green card */}
            <Reveal variant="right">
              <div style={{ background: `linear-gradient(135deg,${G.yellowBg},#f0faf4)`, borderRadius: 24, padding: "36px 32px", border: `1px solid ${G.border}`, height: "100%", boxShadow: `0 12px 40px -20px rgba(16,128,59,.1)` }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: `linear-gradient(135deg,${G.green},${G.greenL})`, display: "grid", placeItems: "center", color: "#fff", marginBottom: 20 }}>
                  <Users size={22} />
                </div>
                <h3 style={{ fontSize: 21, marginBottom: 16, color: G.ink }}>Our Mission</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                  {VISION_MISSION.mission.map((m, i) => (
                    <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", color: G.slate, fontSize: 14.5, lineHeight: 1.65 }}>
                      <span style={{ width: 20, height: 20, borderRadius: "50%", background: `${G.green}18`, border: `1px solid ${G.borderM}`, display: "grid", placeItems: "center", flexShrink: 0, marginTop: 2 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: G.green, display: "block" }} />
                      </span>
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section className="sec wrap">
        <Reveal>
          <span className="eyebrow">Core Values</span>
          <h2 style={{ marginTop: 14, color: G.ink }}>The principles that guide us.</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20, marginTop: 44 }}>
          {VISION_MISSION.values.map((v, i) => {
            const Icon = v.icon;
            return (
              <Reveal key={i} delay={`d${i + 1}`}>
                <div className="card-lift" style={{ padding: "32px 28px", borderRadius: 20, background: "#fff", border: `1px solid ${G.border}`, height: "100%" }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: `linear-gradient(135deg,${G.green},${G.greenL})`, display: "grid", placeItems: "center", color: "#fff", marginBottom: 20 }}>
                    <Icon size={24} />
                  </div>
                  <h3 style={{ fontSize: 19, margin: "0 0 10px", color: G.ink }}>{v.t}</h3>
                  <p style={{ color: G.slate, fontSize: 14.5, lineHeight: 1.7 }}>{v.d}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── THE AMALTAS ADVANTAGE ── */}
      <section style={{ background: `linear-gradient(135deg,${G.greenBgL} 0%,${G.yellowBg} 100%)`, padding: "90px 0" }}>
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">The Amaltas Advantage</span>
            <h2 style={{ marginTop: 14, maxWidth: 640, color: G.ink }}>Why a healer's education belongs here.</h2>
            <p style={{ color: G.slate, marginTop: 14, fontSize: 17, maxWidth: 580, lineHeight: 1.7 }}>
              Everything at Amaltas is built around a single idea — that you learn to heal by healing, beside people who have done it for decades.
            </p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20, marginTop: 44 }}>
            {ADVANTAGES.map((a, i) => {
              const Icon = a.icon;
              return (
                <Reveal key={i} delay={`d${(i % 3) + 1}`}>
                  <div className="card-lift" style={{ position: "relative", height: "100%", padding: "32px 28px", borderRadius: 20, background: "#fff", border: `1px solid ${G.border}`, overflow: "hidden" }}>
                    <span style={{ position: "absolute", top: 6, right: 18, fontFamily: "Fraunces,serif", fontSize: 64, color: `${G.green}08`, lineHeight: 1, pointerEvents: "none" }}>
                      0{i + 1}
                    </span>
                    <div style={{ width: 54, height: 54, borderRadius: 15, background: `linear-gradient(135deg,${G.green},${G.greenL})`, display: "grid", placeItems: "center", color: "#fff", marginBottom: 20 }}>
                      <Icon size={24} />
                    </div>
                    <h3 style={{ fontSize: 19, margin: "0 0 10px", color: G.ink }}>{a.t}</h3>
                    <p style={{ color: G.slate, fontSize: 14.5, lineHeight: 1.7, position: "relative", zIndex: 1 }}>{a.d}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ PLACEMENTS / CAREER OUTCOMES — light green-to-yellow gradient ══ */}
      <section style={{ background: `linear-gradient(120deg,${G.green} 0%,${G.greenL} 60%,#2ec76a 100%)`, padding: "96px 0", overflow: "hidden", position: "relative" }}>
        {/* decorative gold blob */}
        <div className="hero-glow" style={{ width: 420, height: 420, background: "rgba(246,224,5,.22)", right: "-4%", top: "-18%" }} />
        <div className="hero-glow" style={{ width: 260, height: 260, background: "rgba(246,224,5,.14)", left: "5%", bottom: "-10%" }} />
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <span className="eyebrow" style={{ color: G.goldL }}>Careers &amp; Placements</span>
            <h2 style={{ marginTop: 14, color: "#fff", maxWidth: 620 }}>Trained for the ward, ready for the world.</h2>
            <p style={{ color: "rgba(255,255,255,.85)", fontSize: 17, maxWidth: 600, marginTop: 16, lineHeight: 1.7 }}>
              Because clinical training begins in year one — inside our own teaching hospital — Amaltas graduates step into careers already knowing the weight of real responsibility.
            </p>
          </Reveal>

          {/* Outcome stat cards — white on green */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 18, marginTop: 44 }}>
            {OUTCOMES.map((o, i) => {
              const Icon = o.icon;
              return (
                <Reveal key={i} delay={`d${(i % 4) + 1}`}>
                  <div style={{ background: "rgba(255,255,255,.15)", border: "1px solid rgba(255,255,255,.3)", borderRadius: 18, padding: "26px 24px", backdropFilter: "blur(10px)", height: "100%" }}>
                    <div style={{ width: 46, height: 46, borderRadius: 12, background: "rgba(255,255,255,.2)", border: "1px solid rgba(255,255,255,.35)", display: "grid", placeItems: "center", color: "#fff", marginBottom: 16 }}>
                      <Icon size={20} />
                    </div>
                    <div style={{ fontFamily: "Fraunces,serif", fontSize: 30, color: "#fff", lineHeight: 1 }}>{o.v}</div>
                    <div style={{ color: "rgba(255,255,255,.8)", fontSize: 13.5, marginTop: 8, lineHeight: 1.4 }}>{o.l}</div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Career path chips */}
          <Reveal>
            <div style={{ marginTop: 44 }}>
              <div style={{ color: G.goldL, fontSize: 12, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", marginBottom: 18 }}>Where our graduates build careers</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {CAREER_PATHS.map((p, i) => (
                  <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "10px 18px", borderRadius: 100, background: "rgba(255,255,255,.15)", border: "1px solid rgba(255,255,255,.28)", color: "#fff", fontSize: 13.5, fontWeight: 500 }}>
                    <Stethoscope size={14} color={G.goldL} style={{ flexShrink: 0 }} /> {p}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div style={{ marginTop: 40 }}>
              <Link to="/admissions" className="btn btn-gold">Start your journey <ArrowRight size={18} /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ CHANCELLOR'S MESSAGE ══ */}
      <section className="sec wrap" style={{ paddingTop: 90 }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(260px,360px) 1fr", gap: 56, alignItems: "center" }} className="chancellor-preview-grid">
          <Reveal variant="left">
            <div style={{ position: "relative", maxWidth: 360, margin: "0 auto", width: "100%" }}>
              <div style={{ position: "absolute", inset: -12, borderRadius: 30, background: `linear-gradient(135deg,${G.green}22,${G.gold}28)`, filter: "blur(20px)", zIndex: 0 }} />
              <div style={{ position: "relative", zIndex: 1, borderRadius: 24, overflow: "hidden", border: `3px solid ${G.gold}88`, aspectRatio: "3/3.5", boxShadow: `0 40px 80px -45px rgba(16,128,59,.3)` }}>
                <img src={CHANCELLOR_MESSAGE.photo} alt={CHANCELLOR_MESSAGE.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </div>
          </Reveal>
          <Reveal variant="right">
            <span className="eyebrow">Chancellor's Message</span>
            <Quote size={40} style={{ color: G.gold, margin: "20px 0 10px", opacity: 0.9 }} />
            <p style={{ fontFamily: "Fraunces,serif", fontStyle: "italic", fontSize: "clamp(20px,2.6vw,28px)", lineHeight: 1.55, color: G.ink, maxWidth: 720 }}>
              {CHANCELLOR_MESSAGE.quote}
            </p>
            <p style={{ color: G.slate, fontSize: 16, lineHeight: 1.85, marginTop: 22, maxWidth: 640 }}>
              {CHANCELLOR_MESSAGE.paragraphs[1]}
            </p>
            <div style={{ marginTop: 24 }}>
              <div style={{ fontFamily: "Fraunces,serif", fontSize: 19, color: G.ink }}>{CHANCELLOR_MESSAGE.name}</div>
              <div style={{ color: G.green, fontSize: 13, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", marginTop: 4 }}>{CHANCELLOR_MESSAGE.role}</div>
            </div>
            <div style={{ marginTop: 26 }}>
              <Link to="/about/chancellor" className="btn btn-dark">Read full message <ArrowRight size={18} /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ ACADEMICS & COLLABORATION ══ */}
      <section style={{ background: G.greenBg, padding: "90px 0", overflow: "hidden" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 48, alignItems: "center" }}>
            <Reveal variant="left">
              <div>
                <span className="eyebrow">Academics &amp; Collaboration</span>
                <h2 style={{ marginTop: 14, color: G.ink, maxWidth: 520 }}>Seven institutes. One academic ecosystem.</h2>
                <p style={{ color: G.slate, fontSize: 16.5, lineHeight: 1.8, marginTop: 18 }}>
                  Amaltas is built as a meeting ground for disciplines — where modern medicine, classical Indian traditions, and allied sciences learn from one another. Research collaborations, clinical partnerships and community outreach give every student exposure beyond the textbook.
                </p>
                <div style={{ display: "flex", gap: 14, marginTop: 28, flexWrap: "wrap" }}>
                  <Link to="/institutions" className="btn btn-gold">Academics <ArrowRight size={18} /></Link>
                  <Link to="/why" className="btn btn-dark">Collaboration <ArrowRight size={18} /></Link>
                </div>
              </div>
            </Reveal>
            <Reveal variant="right">
              <div style={{ borderRadius: 24, overflow: "hidden", aspectRatio: "4/3", boxShadow: `0 40px 90px -45px rgba(16,128,59,.3)`, border: `3px solid ${G.greenBg}`, position: "relative" }}>
                <img src="/assets/images%20of%20university/event%20and%20activites/nurse.jpeg" alt="Academic life at Amaltas" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(16,128,59,.3) 0%, transparent 55%)" }} />
              </div>
            </Reveal>
          </div>

          {/* Seven institutes grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 14, marginTop: 56 }}>
            {INSTITUTE_PHOTOS.map((inst, i) => (
              <Reveal key={i} delay={`d${(i % 4) + 1}`} variant="zoom">
                <div style={{ position: "relative", borderRadius: 18, overflow: "hidden", aspectRatio: "3/2" }} className="card-lift">
                  <img src={inst.photo} alt={inst.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .5s ease" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(16,128,59,.75) 0%, rgba(16,128,59,.12) 55%, transparent 100%)" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 16px 14px" }}>
                    <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, lineHeight: 1.3 }}>{inst.name}</div>
                    <div style={{ color: G.goldL, fontSize: 11, marginTop: 4, fontWeight: 600, letterSpacing: ".04em", opacity: 0.95 }}>{inst.short}</div>
                  </div>
                  <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(255,255,255,.18)", backdropFilter: "blur(6px)", border: `1px solid ${G.gold}66`, borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 800, color: G.goldL, letterSpacing: ".06em" }}>
                    0{i + 1}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPROVALS & RECOGNITION (design kept as-is) ── */}
      <section className="sec wrap" style={{ textAlign: "center" }}>
        <Reveal>
          <span className="eyebrow" style={{ justifyContent: "center" }}>Approvals &amp; Recognition</span>
          <h2 style={{ marginTop: 14, color: G.ink }}>Recognised by India's statutory councils.</h2>
          <p style={{ color: G.slate, margin: "14px auto 0", maxWidth: 620, fontSize: 17, lineHeight: 1.7 }}>
            Every programme is approved by the relevant regulatory body of the Government of India — so your degree is valid, valued and portable.
          </p>
        </Reveal>
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 18, marginTop: 48, alignItems: "center" }}>
            {APPROVALS.map((a, i) => (
              <div key={i} title={a.label} className="card-lift"
                style={{ background: "#fff", borderRadius: 16, border: `1px solid ${G.border}`, height: 104, display: "grid", placeItems: "center", padding: "18px 16px", boxShadow: `0 8px 30px -18px rgba(16,128,59,.14)` }}>
                <img src={a.src} alt={a.label} loading="lazy"
                  style={{ maxWidth: "100%", maxHeight: 62, width: "auto", objectFit: "contain", filter: "grayscale(1)", opacity: 0.72, transition: "filter .3s,opacity .3s" }}
                  onMouseEnter={e => { e.currentTarget.style.filter = "grayscale(0)"; e.currentTarget.style.opacity = "1"; }}
                  onMouseLeave={e => { e.currentTarget.style.filter = "grayscale(1)"; e.currentTarget.style.opacity = "0.72"; }}
                />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28 }}>
            <Link to="/about/accreditations" className="btn btn-dark">View all accreditations <ArrowRight size={18} /></Link>
          </div>
        </Reveal>
      </section>

      {/* ══ BEYOND ACADEMICS ══ */}
      <section style={{ background: `linear-gradient(180deg,#fff 0%,${G.greenBgL} 100%)`, padding: "90px 0" }}>
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Beyond Academics</span>
            <h2 style={{ marginTop: 14, color: G.ink }}>A healer is formed in more than lectures.</h2>
            <p style={{ color: G.slate, marginTop: 14, fontSize: 17, maxWidth: 560, lineHeight: 1.7 }}>Research, service, sport and culture — the life that turns students into well-rounded clinicians.</p>
          </Reveal>
          <div style={{ marginTop: 44 }}>
            <BeyondCarousel />
          </div>
        </div>
      </section>

      {/* ══ ANNUAL REPORT — light green-to-yellow gradient banner ══ */}
      <section className="sec wrap">
        <Reveal>
          <div
            style={{
              position: "relative", overflow: "hidden", borderRadius: 24,
              background: `linear-gradient(135deg,${G.greenBg} 0%,${G.yellowBg} 100%)`,
              border: `1.5px solid ${G.borderM}`,
              padding: "44px 48px", display: "flex", flexWrap: "wrap", gap: 28,
              alignItems: "center", justifyContent: "space-between",
              boxShadow: `0 20px 60px -30px rgba(16,128,59,.18)`,
            }}
          >
            <div style={{ position: "absolute", width: 220, height: 220, borderRadius: "50%", border: `1px solid ${G.borderM}`, right: -50, top: -80, pointerEvents: "none" }} />
            <div style={{ position: "absolute", width: 140, height: 140, borderRadius: "50%", border: `1px solid rgba(246,224,5,.4)`, right: 40, top: -20, pointerEvents: "none" }} />
            <div style={{ display: "flex", gap: 22, alignItems: "center", position: "relative", zIndex: 1, minWidth: 280, flex: 1 }}>
              <div style={{ width: 60, height: 60, borderRadius: 16, background: `linear-gradient(135deg,${G.green},${G.greenL})`, display: "grid", placeItems: "center", color: "#fff", flexShrink: 0, boxShadow: `0 8px 24px rgba(16,128,59,.3)` }}>
                <FileText size={26} />
              </div>
              <div>
                <div style={{ color: G.green, fontSize: 12, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 6 }}>Annual Report 2025–26</div>
                <div style={{ fontFamily: "Fraunces,serif", fontSize: 23, color: G.ink, lineHeight: 1.25 }}>A year of growing healers, in full detail.</div>
                <p style={{ color: G.slate, fontSize: 14, margin: "8px 0 0", maxWidth: 520 }}>
                  Our institutional performance, academics, research and community impact — published for all stakeholders.
                </p>
              </div>
            </div>
            <a href="#" onClick={e => e.preventDefault()} className="btn btn-gold" style={{ position: "relative", zIndex: 1 }}>
              Download PDF <Download size={18} />
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
