import React, { useState, useEffect } from "react";
import { Mail, Phone, Download, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { PageHero } from "../../components/Layout.jsx";
import { Reveal } from "../../components/Primitives.jsx";
import { C } from "../../theme.js";
import { CONTACT } from "../../data/content.js";

/* News images, mirrored from https://amaltasuniversity.in/news-release/
   and hosted locally in /public/assets/images of university/news-press. */
const NP = "/assets/images%20of%20university/news-press";
const GALLERY = [
  // Most recently uploaded — shown first
  `${NP}/agrohomeopathy%20program.jpg`, `${NP}/agrohomeopathy%20program-1.jpg`,
  `${NP}/angdaan.jpg`,      `${NP}/angdaan-1.jpg`,      `${NP}/angdaan-2.jpg`,
  `${NP}/breastfeeding.jpg`, `${NP}/breastfeeding-1.jpg`,
  `${NP}/deh-dan.jpg`,      `${NP}/dehdaan.jpg`,        `${NP}/Dehdaan%20MS.jpg.jpeg`,
  `${NP}/DRISHTI-CPS.jpg`,  `${NP}/DRISHTI-CPS-1.jpg`,
  `${NP}/light-lampning-1.jpg`,
  `${NP}/mayank-sir-news.jpg`, `${NP}/mayank-sir-news-14.jpg`, `${NP}/mayank-sir-news-15.jpg`,
  `${NP}/value-added.jpg`,  `${NP}/value-added-1.jpg`,
  `${NP}/Workshop.jpg`,     `${NP}/Workshop-1.jpg`,
  `${NP}/yoga.jpg`,         `${NP}/yoga-1.jpg`,         `${NP}/yoga-2.jpg`,
  // Older releases
  `${NP}/news-01.jpg`,  `${NP}/news-02.jpg`,  `${NP}/news-03.jpg`,  `${NP}/news-04.jpg`,
  `${NP}/news-05.jpeg`, `${NP}/news-06.jpeg`, `${NP}/news-07.jpg`,  `${NP}/news-08.jpg`,
  `${NP}/news-09.jpg`,  `${NP}/news-10.jpeg`, `${NP}/news-11.jpeg`, `${NP}/news-12.jpeg`,
  `${NP}/news-13.jpg`,  `${NP}/news-14.jpg`,  `${NP}/news-15.jpg`,  `${NP}/news-16.jpg`,
  `${NP}/news-17.jpg`,  `${NP}/news-18.jpg`,  `${NP}/news-19.jpg`,  `${NP}/news-20.jpg`,
];

export default function NewsAndPress() {
  const [lightbox, setLightbox] = useState(null); // index into GALLERY, or null

  const show = (i) => setLightbox(((i % GALLERY.length) + GALLERY.length) % GALLERY.length);
  const close = () => setLightbox(null);
  const next = () => setLightbox((i) => (i + 1) % GALLERY.length);
  const prev = () => setLightbox((i) => (i - 1 + GALLERY.length) % GALLERY.length);

  // body-scroll lock + keyboard navigation while the lightbox is open
  useEffect(() => {
    if (lightbox === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

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
              <div
                className="card-lift news-tile"
                role="button"
                tabIndex={0}
                aria-label={`Enlarge news image ${i + 1}`}
                onClick={() => show(i)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); show(i); } }}
                style={{ borderRadius: 18, overflow: "hidden", aspectRatio: "4/3", cursor: "pointer", position: "relative" }}
              >
                <img
                  src={img}
                  alt={`Amaltas University news ${i + 1}`}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <span className="news-tile-zoom"><ZoomIn size={18} /></span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── PRESS CONTACT ── */}
      <section style={{ background: `radial-gradient(120% 140% at 80% 20%,${C.emerald} 0%,${C.navy} 55%)`, padding: "90px 0" }}>
        <div className="wrap press-split" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 40, alignItems: "center" }}>
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

      {/* ── FULL-SIZE LIGHTBOX with slide navigation ── */}
      {lightbox !== null && (
        <div className="ev-lightbox" onClick={close}>
          <button className="ev-lightbox-close" onClick={close} aria-label="Close">
            <X size={22} />
          </button>
          <button
            className="ev-lightbox-nav prev"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous news"
          >
            <ChevronLeft size={26} />
          </button>
          <img
            className="ev-lightbox-img"
            src={GALLERY[lightbox]}
            alt={`Amaltas University news ${lightbox + 1}`}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="ev-lightbox-nav next"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next news"
          >
            <ChevronRight size={26} />
          </button>
          <div className="ev-lightbox-count">{lightbox + 1} / {GALLERY.length}</div>
        </div>
      )}
    </>
  );
}
