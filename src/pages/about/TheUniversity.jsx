import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Users, Leaf } from "lucide-react";
import { Reveal, StatNum, LetterReveal } from "../../components/Primitives.jsx";
import { useInView } from "../../hooks/useScroll.js";
import { C } from "../../theme.js";
import { STATS, UNIVERSITY_MILESTONES, VISION_MISSION } from "../../data/content.js";

const INSTITUTE_PHOTOS = [
  { name: "Medical Sciences",         short: "MBBS · MD · MS",           photo: "/assets/images%20of%20university/all%20institutes/medical.png" },
  { name: "Ayurvedic College",        short: "BAMS · AYUSH",             photo: "/assets/images%20of%20university/all%20institutes/ayurveda.png" },
  { name: "Institute of Homoeopathy", short: "BHMS",                     photo: "/assets/images%20of%20university/all%20institutes/homoeopathys.png" },
  { name: "Nursing Sciences",         short: "B.Sc. · P.B.B.Sc. · M.Sc.",photo: "/assets/images%20of%20university/all%20institutes/nursing.jpeg" },
  { name: "Institute of Pharmacy",    short: "B.Pharm · M.Pharm",        photo: "/assets/images%20of%20university/all%20institutes/pharmacy.png" },
  { name: "Paramedical Sciences",     short: "BMLT · DMLT · Imaging",    photo: "/assets/images%20of%20university/all%20institutes/paramedical.jpeg" },
  { name: "Allied & Rehabilitation",  short: "Physiotherapy · Psychology",photo: "/assets/images%20of%20university/all%20institutes/alied.jpg" },
];

const MILESTONE_PHOTOS = {
  "2017": "/assets/images%20of%20university/event%20and%20activites/lamp.jpeg",
  "2024": "/assets/images%20of%20university/event%20and%20activites/yoga.jpg",
};

const CAMPUS_LIFE = [
  { img: "/assets/images%20of%20university/campus%20life/sport.JPG",        label: "Sports & Wellness" },
  { img: "/assets/images%20of%20university/campus%20life/degree.JPG",       label: "Graduation Day" },
  { img: "/assets/images%20of%20university/campus%20life/2U8A2387.JPG",     label: "Campus Grounds" },
  { img: "/assets/images%20of%20university/event%20and%20activites/nurse.jpeg", label: "Clinical Training" },
];

function StatStrip() {
  const [ref, seen] = useInView({ threshold: 0.4 });
  return (
    <div
      ref={ref}
      className="statgrid"
      style={{ background: "#fff", borderRadius: 24, border: "1px solid rgba(11,44,24,.06)", boxShadow: "0 40px 90px -55px rgba(11,44,24,.4)" }}
    >
      {STATS.map((s, i) => (
        <div className="stat" key={i}>
          <StatNum v={s.v} suf={s.suf} run={seen} />
          <div style={{ color: C.slate, marginTop: 10, fontSize: 14.5, fontWeight: 500 }}>{s.l}</div>
        </div>
      ))}
    </div>
  );
}

export default function TheUniversity() {
  return (
    <>
      {/* ── HERO ── */}
      <header
        className="page-hero"
        style={{
          background: `linear-gradient(to right, rgba(11,44,24,.90) 0%, rgba(11,44,24,.55) 100%), url('/assets/images%20of%20university/campus%20life/435A1853.JPG')`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
        }}
      >
        <div className="hero-glow" style={{ width: 420, height: 420, background: "rgba(21,132,63,.4)", left: "-120px", top: "-10%" }} />
        <div className="hero-glow" style={{ width: 320, height: 320, background: "rgba(246,224,5,.2)", right: "4%", bottom: "-20%" }} />
        <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
          <div className="crumb"><Link to="/">Home</Link> &nbsp;/&nbsp; About Us / The University</div>
          <span className="eyebrow" style={{ color: C.goldL, marginTop: 14 }}>About Amaltas University</span>
          <h1 style={{ marginTop: 14 }}>
            <LetterReveal text="Where healing grows." startDelay={0.25} charDelay={0.038} />
          </h1>
          <p style={{ color: "rgba(247,244,236,.74)", fontSize: 18, maxWidth: 560, marginTop: 18 }}>
            A health-sciences university born from a welfare society's resolve — now home to seven institutes, 1500+ beds, and a rising generation of India's healers.
          </p>
        </div>
      </header>

      {/* ── STATS STRIP ── */}
      <section className="wrap" style={{ marginTop: -50, position: "relative", zIndex: 5 }}>
        <StatStrip />
      </section>

      {/* ── OUR STORY ── */}
      <section className="sec wrap" style={{ paddingTop: 90 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(400px,1fr))", gap: 60, alignItems: "center" }}>
          <Reveal variant="left">
            <div>
              <span className="eyebrow">Our Story</span>
              <h2 style={{ marginTop: 14 }}>A single resolve that became a university.</h2>
              <p style={{ color: C.slate, fontSize: 16.5, lineHeight: 1.85, marginTop: 20 }}>
                Amaltas University began not in a boardroom, but in a conviction — that the Malwa heartland of Madhya Pradesh deserved a medical institution worthy of its people's ambitions.
              </p>
              <p style={{ color: C.slate, fontSize: 16.5, lineHeight: 1.85, marginTop: 16 }}>
                Founded under the Mayank Welfare Society by Shri Suresh Singh Bhadoria, the university grew institute by institute: first a medical college with a live teaching hospital, then Ayurveda, Homoeopathy, Nursing, Pharmacy, Paramedical, and Allied Sciences — seven disciplines mirroring the full spectrum of human healing.
              </p>
              <p style={{ color: C.slate, fontSize: 16.5, lineHeight: 1.85, marginTop: 16 }}>
                Today, Amaltas University stands in Village Bangar on the Dewas–Ujjain Highway — a campus where 1500+ hospital beds, research labs, simulation centres, and hostel communities form a living ecosystem for tomorrow's healers.
              </p>
              <div style={{ display: "flex", gap: 18, marginTop: 28, flexWrap: "wrap", alignItems: "center" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13.5, color: C.slate, fontWeight: 500 }}>
                  <MapPin size={15} color={C.emerald} /> Dewas, Madhya Pradesh
                </span>
                <span style={{ width: 1, height: 16, background: "rgba(11,44,24,.15)" }} />
                <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13.5, color: C.slate, fontWeight: 500 }}>
                  <Users size={15} color={C.emerald} /> Mayank Welfare Society
                </span>
              </div>
            </div>
          </Reveal>

          {/* Image collage */}
          <Reveal variant="img">
            <div style={{ position: "relative", paddingBottom: 48, paddingRight: 48 }}>
              {/* Main image */}
              <div style={{ borderRadius: 26, overflow: "hidden", aspectRatio: "4/3", boxShadow: "0 50px 100px -50px rgba(11,44,24,.6)", position: "relative" }}>
                <img
                  src="/assets/images%20of%20university/our%20purpose/university.jpg"
                  alt="Amaltas University Campus"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(11,44,24,.55) 100%)" }} />
                <div style={{ position: "absolute", bottom: 16, left: 16, color: "#fff", fontSize: 12.5, fontWeight: 600, display: "flex", alignItems: "center", gap: 7, background: "rgba(11,44,24,.42)", backdropFilter: "blur(8px)", padding: "7px 14px", borderRadius: 100, border: "1px solid rgba(255,255,255,.14)" }}>
                  <Leaf size={12} /> Where Healing Grows
                </div>
              </div>
              {/* Overlay card — lamp ceremony */}
              <div style={{ position: "absolute", bottom: 0, right: 0, width: 190, height: 150, borderRadius: 18, overflow: "hidden", border: "3px solid #fff", boxShadow: "0 20px 50px -20px rgba(11,44,24,.5)" }}>
                <img
                  src="/assets/images%20of%20university/event%20and%20activites/lamp.jpeg"
                  alt="Lamp lighting ceremony"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(11,44,24,.7) 0%, transparent 55%)" }} />
                <div style={{ position: "absolute", bottom: 10, left: 12, color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase" }}>Lamp Lighting</div>
              </div>
              {/* Small stat badge */}
              <div style={{ position: "absolute", top: 16, right: 0, background: C.gold, borderRadius: 14, padding: "10px 16px", boxShadow: "0 8px 24px -6px rgba(246,224,5,.5)", textAlign: "center" }}>
                <div style={{ fontFamily: "Fraunces,serif", fontSize: 24, color: C.ink, lineHeight: 1 }}>1500+</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: C.ink, letterSpacing: ".08em", marginTop: 3, textTransform: "uppercase" }}>Hospital Beds</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── VISION & MISSION ── */}
      <section style={{ position: "relative", padding: "90px 0", overflow: "hidden" }}>
        {/* Background campus photo */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img
            src="/assets/images%20of%20university/campus%20life/435A9602.JPG"
            alt=""
            aria-hidden="true"
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.07 }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#eef6f1 0%,var(--ivory) 55%,#fdfce8 100%)", opacity: 0.94 }} />
        </div>
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <span className="eyebrow">Vision &amp; Mission</span>
            <h2 style={{ marginTop: 14, maxWidth: 700 }}>Purpose written into every programme.</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(360px,1fr))", gap: 26, marginTop: 44 }}>
            <Reveal variant="left">
              <div style={{ background: "#fff", borderRadius: 24, padding: "36px 32px", border: "1px solid rgba(11,44,24,.08)", height: "100%", boxShadow: "0 12px 40px -20px rgba(11,44,24,.12)" }}>
                <div style={{ width: 48, height: 48, borderRadius: 13, background: `linear-gradient(135deg,${C.navy},${C.emerald})`, display: "grid", placeItems: "center", color: C.gold, marginBottom: 20 }}>
                  <Leaf size={22} />
                </div>
                <h3 style={{ fontSize: 21, marginBottom: 16 }}>Our Vision</h3>
                <p style={{ color: C.slate, fontSize: 16, lineHeight: 1.85 }}>{VISION_MISSION.vision}</p>
              </div>
            </Reveal>
            <Reveal variant="right">
              <div style={{ background: `linear-gradient(135deg,${C.navy2},${C.navy})`, borderRadius: 24, padding: "36px 32px", border: "1px solid rgba(255,255,255,.06)", height: "100%" }}>
                <div style={{ width: 48, height: 48, borderRadius: 13, background: "rgba(246,224,5,.15)", border: "1px solid rgba(246,224,5,.28)", display: "grid", placeItems: "center", color: C.gold, marginBottom: 20 }}>
                  <Users size={22} />
                </div>
                <h3 style={{ fontSize: 21, marginBottom: 16, color: C.ivory }}>Our Mission</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                  {VISION_MISSION.mission.map((m, i) => (
                    <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", color: "rgba(247,244,236,.82)", fontSize: 14.5, lineHeight: 1.65 }}>
                      <span style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(246,224,5,.18)", border: "1px solid rgba(246,224,5,.32)", display: "grid", placeItems: "center", flexShrink: 0, marginTop: 2 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.gold, display: "block" }} />
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
          <h2 style={{ marginTop: 14 }}>The principles that guide us.</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20, marginTop: 44 }}>
          {VISION_MISSION.values.map((v, i) => {
            const Icon = v.icon;
            return (
              <Reveal key={i} delay={`d${i + 1}`}>
                <div className="card-lift" style={{ padding: "32px 28px", borderRadius: 20, background: "#fff", border: "1px solid rgba(11,44,24,.07)", height: "100%" }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: `linear-gradient(135deg,${C.emerald},${C.emeraldL})`, display: "grid", placeItems: "center", color: "#fff", marginBottom: 20 }}>
                    <Icon size={24} />
                  </div>
                  <h3 style={{ fontSize: 19, margin: "0 0 10px" }}>{v.t}</h3>
                  <p style={{ color: C.slate, fontSize: 14.5, lineHeight: 1.7 }}>{v.d}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── SEVEN INSTITUTES PHOTO GRID ── */}
      <section style={{ background: C.navy, padding: "90px 0", overflow: "hidden" }}>
        <div className="wrap">
          <Reveal>
            <span className="eyebrow" style={{ color: C.goldL }}>Our Seven Institutes</span>
            <h2 style={{ marginTop: 14, color: C.ivory }}>Seven disciplines. One campus.</h2>
            <p style={{ color: "rgba(247,244,236,.65)", fontSize: 17, maxWidth: 560, marginTop: 14 }}>
              Every corner of human healing — from modern medicine to ancient Ayurveda — is taught and practised under one roof.
            </p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 14, marginTop: 48 }}>
            {INSTITUTE_PHOTOS.map((inst, i) => (
              <Reveal key={i} delay={`d${(i % 4) + 1}`} variant="zoom">
                <div style={{ position: "relative", borderRadius: 18, overflow: "hidden", aspectRatio: "3/2", cursor: "default" }} className="card-lift">
                  <img
                    src={inst.photo}
                    alt={inst.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .5s ease" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(11,44,24,.88) 0%, rgba(11,44,24,.2) 55%, transparent 100%)" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 16px 14px" }}>
                    <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, lineHeight: 1.3 }}>{inst.name}</div>
                    <div style={{ color: C.goldL, fontSize: 11, marginTop: 4, fontWeight: 600, letterSpacing: ".04em", opacity: 0.9 }}>{inst.short}</div>
                  </div>
                  {/* number badge */}
                  <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(11,44,24,.55)", backdropFilter: "blur(6px)", border: "1px solid rgba(246,224,5,.28)", borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 800, color: C.goldL, letterSpacing: ".06em" }}>
                    0{i + 1}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div style={{ textAlign: "center", marginTop: 44 }}>
              <Link to="/institutions" className="btn btn-gold">Explore all institutes <ArrowRight size={18} /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── MILESTONES TIMELINE ── */}
      <section style={{ background: "linear-gradient(180deg,#fff 0%,var(--ivory) 100%)", padding: "90px 0" }}>
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Our Journey</span>
            <h2 style={{ marginTop: 14 }}>A decade of growing healers.</h2>
          </Reveal>
          <div className="timeline" style={{ marginTop: 56, maxWidth: 860 }}>
            {UNIVERSITY_MILESTONES.map((m, i) => (
              <Reveal key={i} delay={`d${(i % 4) + 1}`}>
                <div className="timeline-item" style={{ alignItems: MILESTONE_PHOTOS[m.year] ? "flex-start" : undefined }}>
                  <div className="timeline-left">
                    <span className="timeline-year">{m.year}</span>
                    <div className="timeline-dot" />
                  </div>
                  <div className="timeline-right" style={{ flex: 1 }}>
                    <h4>{m.title}</h4>
                    <p>{m.desc}</p>
                    {MILESTONE_PHOTOS[m.year] && (
                      <div style={{ marginTop: 14, borderRadius: 14, overflow: "hidden", maxWidth: 320, aspectRatio: "16/9", boxShadow: "0 12px 32px -10px rgba(11,44,24,.28)" }}>
                        <img
                          src={MILESTONE_PHOTOS[m.year]}
                          alt={m.title}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAMPUS LIFE PHOTO GRID ── */}
      <section style={{ padding: "0 0 90px" }}>
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Campus Life</span>
            <h2 style={{ marginTop: 14 }}>Life at Amaltas.</h2>
            <p className="lead" style={{ marginTop: 14 }}>A campus built not just for study, but for growth — in every sense.</p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 16, marginTop: 44 }}>
            {CAMPUS_LIFE.map((item, i) => (
              <Reveal key={i} delay={`d${(i % 4) + 1}`}>
                <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", aspectRatio: "4/3", boxShadow: "0 12px 36px -14px rgba(11,44,24,.22)" }} className="card-lift">
                  <img
                    src={item.img}
                    alt={item.label}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .5s ease" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(11,44,24,.65) 0%, transparent 55%)" }} />
                  <div style={{ position: "absolute", bottom: 16, left: 18, color: "#fff", fontWeight: 700, fontSize: 15, letterSpacing: ".02em" }}>{item.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAMPUS NIGHT VISUAL STRIP ── */}
      <section style={{ position: "relative", height: 340, overflow: "hidden" }}>
        <img
          src="/assets/images%20of%20university/footer/amaltas-night.jpeg"
          alt="Amaltas University campus at night"
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.55)" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(11,44,24,.85) 0%,rgba(21,132,63,.6) 100%)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 14, textAlign: "center", padding: "0 28px" }}>
          <Reveal>
            <p style={{ fontFamily: "Fraunces,serif", fontStyle: "italic", fontSize: "clamp(1.4rem,3vw,2.2rem)", color: C.ivory, maxWidth: 700, lineHeight: 1.5 }}>
              "The name Amaltas blooms in gold before it shades anyone. It gives first, without condition — and so do we."
            </p>
            <p style={{ color: "rgba(247,244,236,.6)", fontSize: 13.5, marginTop: 10, letterSpacing: ".08em", fontWeight: 600, textTransform: "uppercase" }}>Mrs. Aruna Bhadoria · Chancellor</p>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="sec wrap" style={{ textAlign: "center" }}>
        <Reveal>
          <h2 style={{ maxWidth: 600, margin: "0 auto" }}>Ready to be part of the Amaltas story?</h2>
          <p className="lead" style={{ margin: "16px auto 30px" }}>Join the 2026–27 cohort of healers from across India.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/admissions" className="btn btn-gold">Apply now <ArrowRight size={18} /></Link>
            <Link to="/about/chancellor" className="btn btn-dark">Chancellor's Message <ArrowRight size={18} /></Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
