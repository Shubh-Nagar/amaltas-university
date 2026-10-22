import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { PageHero } from "../components/Layout.jsx";
import { Reveal, Tilt } from "../components/Primitives.jsx";
import { C, admissionsCardBg } from "../theme.js";
import { INSTITUTIONS } from "../data/content.js";
import SEO from "../components/SEO.jsx";
import { breadcrumbSchema, COURSE_CATALOG_SCHEMA } from "../data/schema.js";

// Looping clip that fades in behind a card's text area on hover. Set `video` on an
// institution in content.js to give it its own clip.
const CARD_VIDEO = "/assets/images%20of%20university/hero%20section/hero-video-web.mp4";
const canHover = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

function InstCard({ it }) {
  const video = useRef(null);
  const play = () => {
    const v = video.current;
    if (!v || !canHover()) return;
    v.play().catch(() => {});
  };
  const stop = () => {
    const v = video.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };
  return (
    <Tilt
      className="inst-card"
      onClick={() => window.open(it.website, "_blank", "noreferrer")}
      onMouseEnter={play}
      onMouseLeave={stop}
    >
      <div className="inst-card-img">
        <img src={it.img} alt={it.name} loading="lazy" />
      </div>
      <div className="inst-card-text">
        <video ref={video} className="inst-card-video" muted loop playsInline preload="none" aria-hidden="true">
          <source src={it.video || CARD_VIDEO} type="video/mp4" />
        </video>
        <div className="inst-card-body">
          <span className="inst-tag">{it.tag}</span>
          <h3>{it.name}</h3>
          <p className="inst-desc">{it.desc}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
            {it.programs.map((p) => (
              <div key={p} className="inst-prog">
                <Check size={15} /> {p}
              </div>
            ))}
          </div>
          <a
            href={it.website}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inst-link"
          >
            Visit department website <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </Tilt>
  );
}

export default function Institutions() {
  return (
    <>
      <SEO
        title="Our Institutions — Medical, Ayurveda, Homoeopathy, Nursing, Pharmacy & Paramedical"
        description="Explore Amaltas University's six health-science institutions in Dewas: Medical Sciences (MBBS, MD/MS), Ayurvedic College (BAMS), Homoeopathy (BHMS), Nursing Sciences, Pharmacy (B.Pharm, D.Pharm) and Paramedical Sciences — all built around one working teaching hospital."
        path="/institutions"
        keywords="Amaltas Institute of Medical Sciences, Amaltas Ayurvedic College, Amaltas Institute of Homoeopathy, Amaltas Institute of Nursing Sciences, Amaltas Institute of Pharmacy, Amaltas Institute of Paramedical Sciences"
        jsonLd={[
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Institutions", path: "/institutions" }]),
          COURSE_CATALOG_SCHEMA,
        ]}
      />
      <PageHero
        crumb="Institutions"
        eyebrow="Six worlds, one campus"
        title="Choose where you'll change a life."
        sub="From modern medicine to classical Ayurveda, nursing to rehabilitation — every Amaltas institution is built around a single working hospital."
        bgImg="/assets/images%20of%20university/all%20institutes/nursing.webp"
        floatImg="/assets/images%20of%20university/campus%20life/student-back.webp"
      />

      <section className="sec wrap" style={{ paddingTop: 80 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(330px,1fr))", gap: 24 }}>
          {INSTITUTIONS.map((it, i) => {
            return (
              <Reveal key={i} delay={`d${(i % 3) + 1}`}>
                <InstCard it={it} />
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="sec wrap" style={{ paddingTop: 0 }}>
        <Reveal>
          <div style={{ ...admissionsCardBg(120), borderRadius: 30, padding: "56px 48px", color: C.ivory, textAlign: "center" }}>
            <h2 style={{ color: C.ivory }}>Not sure which path is yours?</h2>
            <p style={{ color: "rgba(247,244,236,.74)", maxWidth: 520, margin: "14px auto 28px" }}>
              Our admissions counsellors help you match your goals to the right programme — and walk you through eligibility, fees, and scholarships.
            </p>
            <Link to="/admissions" className="btn btn-gold">Talk to admissions <ArrowRight size={18} /></Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
