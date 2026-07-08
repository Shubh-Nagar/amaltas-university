import React from "react";
import { Mail, Phone, Download } from "lucide-react";
import { PageHero } from "../../components/Layout.jsx";
import { Reveal } from "../../components/Primitives.jsx";
import { C } from "../../theme.js";
import { CONTACT } from "../../data/content.js";

const GALLERY = [
  "/assets/images%20of%20university/news-press/yoga.jpg",
  "/assets/images%20of%20university/news-press/DRISHTI-CPS.jpg",
  "/assets/images%20of%20university/news-press/Workshop.jpg",
  "/assets/images%20of%20university/news-press/value-added.jpg",
  "/assets/images%20of%20university/news-press/dehdaan.jpg",
  "/assets/images%20of%20university/news-press/workshop.jpg",
  "/assets/images%20of%20university/news-press/mayank-sir-news.jpg",
  "/assets/images%20of%20university/news-press/light-lampning.jpg",
];

export default function NewsAndPress() {
  return (
    <>
      <PageHero
        crumb="Happenings / News & Press Releases"
        eyebrow="Happenings"
        title="News & Press Releases."
        sub="Announcements, milestones, and campus stories from Amaltas University — as they happen."
        bgImg="/assets/images%20of%20university/news-press/light-lampning.jpg"
      />

      {/* ── PHOTO GALLERY ── */}
      <section className="sec wrap">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 20 }}>
          {GALLERY.map((img, i) => (
            <Reveal key={img} delay={`d${(i % 3) + 1}`}>
              <div className="card-lift" style={{ borderRadius: 18, overflow: "hidden", aspectRatio: "4/3" }}>
                <img
                  src={img}
                  alt="Amaltas University news"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── PRESS CONTACT ── */}
      <section style={{ background: `radial-gradient(120% 140% at 80% 20%,${C.emerald} 0%,${C.navy} 55%)`, padding: "90px 0" }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 40, alignItems: "center" }}>
          <Reveal variant="left">
            <span className="eyebrow" style={{ color: C.goldL }}>Media & Press</span>
            <h2 style={{ color: C.ivory, marginTop: 14 }}>For press inquiries and media requests.</h2>
            <p style={{ color: "rgba(247,244,236,.75)", fontSize: 15.5, marginTop: 14, lineHeight: 1.7, maxWidth: 460 }}>
              Journalists and media partners can reach the university's communications desk directly for interviews, statements, or campus visit requests.
            </p>
          </Reveal>
          <Reveal variant="right" delay="d2">
            <div style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.14)", borderRadius: 20, padding: "30px 32px" }}>
              <a href={`mailto:${CONTACT.email}`} style={{ display: "flex", alignItems: "center", gap: 12, color: C.ivory, textDecoration: "none", fontSize: 14.5, marginBottom: 16 }}>
                <Mail size={17} color={C.goldL} /> {CONTACT.email}
              </a>
              <a href={`tel:${CONTACT.tollFree.replace(/-/g, "")}`} style={{ display: "flex", alignItems: "center", gap: 12, color: C.ivory, textDecoration: "none", fontSize: 14.5, marginBottom: 22 }}>
                <Phone size={17} color={C.goldL} /> {CONTACT.tollFree}
              </a>
              <a href="/assets/docs/AMALTAS%20UNIVERSITY%20BROCHURE.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-gold" style={{ width: "100%", justifyContent: "center" }}>
                <Download size={15} /> University Brochure
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
