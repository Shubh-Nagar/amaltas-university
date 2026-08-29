import React, { useState } from "react";
import SEO from "../components/SEO.jsx";

export default function Healthcare() {
  const [active, setActive] = useState({ university: false, hospital: false });

  function toggle(key, e) {
    if (e.target.closest("a")) return;
    setActive((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <>
      <SEO
        title="Healthcare — Amaltas University & Hospital"
        description="Discover career-focused education and comprehensive healthcare services through the Amaltas ecosystem — Amaltas University and Amaltas Hospital."
        path="/healthcare"
      />
      <div className="amu-amaltash-portal">
        <style>{`
/* =========================================================
   AMALTASH UNIVERSITY + AMALTASH HOSPITAL
========================================================= */

.amu-amaltash-portal {
    width: 100vw;
    position: relative;
    left: 50%;
    margin-left: -50vw;
    padding: 150px 40px 70px;
    background: radial-gradient(circle at 50% 0%, #ffffff 0%, #f5f3f8 100%);
    font-family: 'Plus Jakarta Sans', Arial, sans-serif;
    overflow: hidden;
}

.amu-amaltash-portal *,
.amu-amaltash-portal *::before,
.amu-amaltash-portal *::after {
    box-sizing: border-box;
}

.amu-amaltash-top {
    text-align: center;
    max-width: 850px;
    margin: 0 auto 50px;
}

.amu-amaltash-tag {
    display: inline-block;
    max-width: 100%;
    padding: 7px 18px;
    border-radius: 50px;
    background: rgba(91,58,142,.08);
    border: 1px solid rgba(91,58,142,.16);
    color: #5b3a8e;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 16px;
}

.amu-amaltash-heading {
    font-size: clamp(32px, 4vw, 52px);
    font-weight: 800;
    color: #071a2b;
    line-height: 1.15;
    margin: 0 0 15px;
}

.amu-amaltash-sub {
    font-size: 16px;
    line-height: 1.7;
    color: #64748b;
    margin: 0;
}

/* GRID */

.amu-amaltash-grid {
    width: 100%;
    max-width: 1200px;
    margin: auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
}

/* CARD */

.amu-amaltash-card {
    height: 450px;
    perspective: 1200px;
    cursor: pointer;
}

.amu-amaltash-inner {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform .75s cubic-bezier(.2,.85,.32,1.05);
    border-radius: 22px;
    box-shadow: 0 15px 40px rgba(7,26,43,.10);
}

.amu-amaltash-card:hover .amu-amaltash-inner,
.amu-amaltash-card.amu-active .amu-amaltash-inner {
    transform: rotateY(180deg);
}

/* FACES */

.amu-amaltash-face {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border-radius: 22px;
    overflow: hidden;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
}

/* FRONT */

.amu-amaltash-front {
    background: #fff;
    border: 1px solid #e2e8f0;
    padding: 40px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.amu-amaltash-front::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
}

/* UNIVERSITY */

.amu-university .amu-amaltash-front::before {
    background: #5b3a8e;
}

/* HOSPITAL */

.amu-hospital .amu-amaltash-front::before {
    background: #2f7d6b;
}

/* LOGO */

.amu-amaltash-logo {
    height: 120px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 25px;
}

.amu-amaltash-logo img {
    max-width: 90%;
    max-height: 115px;
    object-fit: contain;
}

/* PILL */

.amu-amaltash-pill {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 7px 15px;
    border-radius: 50px;
    margin-bottom: 18px;
}

.amu-university .amu-amaltash-pill {
    background: rgba(91,58,142,.08);
    color: #5b3a8e;
}

.amu-hospital .amu-amaltash-pill {
    background: rgba(47,125,107,.08);
    color: #2f7d6b;
}

/* TITLE */

.amu-amaltash-title {
    font-size: 22px;
    font-weight: 800;
    color: #071a2b;
    line-height: 1.35;
    margin: 0 0 12px;
}

.amu-amaltash-info {
    font-size: 14px;
    color: #64748b;
    line-height: 1.65;
    max-width: 500px;
    margin: 0;
}

/* BACK */

.amu-amaltash-back {
    transform: rotateY(180deg);
    background: #071a2b;
    position: relative;
}

/* BUILDING IMAGE */

.amu-amaltash-building {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform .8s ease;
}

.amu-amaltash-card:hover .amu-amaltash-building {
    transform: scale(1.08);
}

/* OVERLAY */

.amu-amaltash-overlay {
    position: absolute;
    inset: 0;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding: 30px;
    text-align: center;
    background: linear-gradient(
        180deg,
        rgba(7,26,43,.05) 0%,
        rgba(7,26,43,.35) 45%,
        rgba(7,26,43,.95) 100%
    );
}

.amu-amaltash-back-tag {
    color: #fff;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 18px;
}

/* BUTTON */

.amu-amaltash-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 14px 20px;
    border-radius: 12px;
    color: #fff !important;
    text-decoration: none !important;
    font-size: 14px;
    font-weight: 700;
    transition: .3s ease;
    border: 1px solid rgba(255,255,255,.25);
    box-shadow: 0 10px 25px rgba(0,0,0,.35);
}

.amu-university .amu-amaltash-btn {
    background: #5b3a8e;
}

.amu-hospital .amu-amaltash-btn {
    background: #2f7d6b;
}

.amu-amaltash-btn:hover {
    transform: translateY(-3px);
    filter: brightness(1.12);
}

.amu-amaltash-btn svg {
    width: 17px;
    transition: .25s ease;
}

.amu-amaltash-btn:hover svg {
    transform: translateX(5px);
}

/* TABLET */

@media(max-width: 800px) {

    .amu-amaltash-grid {
        grid-template-columns: 1fr;
        max-width: 600px;
    }

    .amu-amaltash-card {
        height: 420px;
    }

    .amu-amaltash-portal {
        padding: 120px 20px 60px;
    }
}

/* MOBILE */

@media(max-width: 500px) {

    .amu-amaltash-card {
        height: 400px;
    }

    .amu-amaltash-heading {
        font-size: 32px;
    }

    .amu-amaltash-front {
        padding: 30px 20px;
    }
}
        `}</style>

        <div className="amu-amaltash-top">
          <span className="amu-amaltash-tag">Education &amp; Healthcare</span>

          <h2 className="amu-amaltash-heading">Amaltas University &amp; Healthcare</h2>

          <p className="amu-amaltash-sub">
            Discover career-focused education and comprehensive healthcare services through the Amaltas ecosystem.
          </p>
        </div>

        <div className="amu-amaltash-grid">
          {/* AMALTASH UNIVERSITY */}
          <div
            className={`amu-amaltash-card amu-university ${active.university ? "amu-active" : ""}`}
            onClick={(e) => toggle("university", e)}
          >
            <div className="amu-amaltash-inner">
              {/* FRONT */}
              <div className="amu-amaltash-face amu-amaltash-front">
                <div className="amu-amaltash-logo">
                  <img
                    src="https://malwanchaluniversity.in/admissions/wp-content/uploads/2026/08/Amaltas-University-Logo.jpg"
                    alt="Amaltas University"
                    loading="lazy"
                  />
                </div>

                <span className="amu-amaltash-pill">Multidisciplinary University</span>

                <h3 className="amu-amaltash-title">Amaltas University</h3>

                <p className="amu-amaltash-info">
                  Pioneering career-driven education across Medical Sciences, Engineering, Applied Technology, Law and Management.
                </p>
              </div>

              {/* BACK */}
              <div className="amu-amaltash-face amu-amaltash-back">
                <img
                  src="https://malwanchaluniversity.in/admissions/wp-content/uploads/2026/08/university.png"
                  alt="Amaltas University Campus"
                  className="amu-amaltash-building"
                  loading="lazy"
                />

                <div className="amu-amaltash-overlay">
                  <span className="amu-amaltash-back-tag">Dewas • Innovation Campus</span>

                  <a
                    href="https://amaltasuniversity.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="amu-amaltash-btn"
                  >
                    Explore University
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* AMALTASH HOSPITAL */}
          <div
            className={`amu-amaltash-card amu-hospital ${active.hospital ? "amu-active" : ""}`}
            onClick={(e) => toggle("hospital", e)}
          >
            <div className="amu-amaltash-inner">
              {/* FRONT */}
              <div className="amu-amaltash-face amu-amaltash-front">
                <div className="amu-amaltash-logo">
                  <img
                    src="https://malwanchaluniversity.in/admissions/wp-content/uploads/2026/08/logo-1.webp"
                    alt="Amaltas Hospital"
                    loading="lazy"
                  />
                </div>

                <span className="amu-amaltash-pill">Clinical &amp; Emergency Care</span>

                <h3 className="amu-amaltash-title">Amaltas Hospital</h3>

                <p className="amu-amaltash-info">
                  High-precision diagnostics, modular surgical suites, dialysis units and comprehensive 24x7 emergency medical services.
                </p>
              </div>

              {/* BACK */}
              <div className="amu-amaltash-face amu-amaltash-back">
                <img
                  src="https://malwanchaluniversity.in/admissions/wp-content/uploads/2026/08/Amaltas-Hospital1.webp"
                  alt="Amaltas Hospital Building"
                  className="amu-amaltash-building"
                  loading="lazy"
                />

                <div className="amu-amaltash-overlay">
                  <span className="amu-amaltash-back-tag">24x7 Emergency &amp; Critical Care</span>

                  <a
                    href="https://amaltashospital.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="amu-amaltash-btn"
                  >
                    Explore Hospital
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
