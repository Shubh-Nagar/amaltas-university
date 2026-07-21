import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "../components/Layout.jsx";
import { Reveal } from "../components/Primitives.jsx";
import { LEADERS } from "../data/content.js";

export default function Leadership() {
  return (
    <>
      <PageHero
        crumb="Leadership"
        eyebrow="The people behind the promise"
        title="Leadership with a legacy of service."
        sub="From the founding welfare society to today's academic council, Amaltas is led by people who built this institution to serve a community."
        bgImg="/assets/images%20of%20university/photo-gallery/2U8A0233.jpg"
      />

      <section className="sec wrap" style={{ paddingTop: 80 }}>
        <div className="leadership-cards-grid" style={{ display: "grid", gap: 28 }}>
          {LEADERS.map((l, i) => (
            <Reveal key={l.slug} delay={`d${(i % 5) + 1}`}>
              <Link to={`/leadership/${l.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
                <div className="leader-photo-card card-lift" style={{ height: "100%", cursor: "pointer" }}>
                  <div className="lpc-photo-area">
                    {l.photo
                      ? <img src={l.photo} alt={l.nm} />
                      : <div className="lpc-photo-initials">{l.nm.split(" ").filter(Boolean).pop()[0]}</div>}
                  </div>
                  <div className="lpc-info">
                    <div className="lpc-role">{l.role}</div>
                    <div className="lpc-name">{l.nm}</div>
                    <p className="lpc-bio">{l.bio}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 14, fontSize: 13, fontWeight: 700, color: "var(--em)", letterSpacing: ".04em" }}>
                      Read full message <ArrowUpRight size={15} />
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
