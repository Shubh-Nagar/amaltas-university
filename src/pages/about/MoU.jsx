import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Handshake } from "lucide-react";
import { PageHero } from "../../components/Layout.jsx";
import { Reveal } from "../../components/Primitives.jsx";
import { C } from "../../theme.js";
import SEO from "../../components/SEO.jsx";
import { breadcrumbSchema } from "../../data/schema.js";

/* Signed MoUs and collaborations. */
const MOUS = [
  "Collaboration between Amaltas University & Prestige Institute of Management",
  "MoU between Avantika University, Ujjain & Amaltas University, Dewas",
  "MoU between Lung Care Foundation (LCF), New Delhi & Amaltas University, Dewas, M.P.",
  "MoU between IITI DRISHTI CPS Foundation & Amaltas University",
  "MoU between IITI DRISHTI CPS Foundation & Amaltas University (through Amaltas Institute of Medical Sciences)",
  "MoU for Academic and Research Collaboration between Samrat Vikramaditya Vishwavidyalaya, Ujjain & Amaltas University",
  "MoU between Amaltas Institute of Pharmacy, Amaltas University Dewas & McW Healthcare Pvt. Ltd., Indore",
  "MoU between EMPE Diagnostics Private Limited & Amaltas Institute of Medical Sciences",
];

export default function MoU() {
  return (
    <>
      <SEO
        title="MoUs & Collaborations"
        description="Memoranda of Understanding signed by Amaltas University, Dewas with academic, research and professional institutions."
        path="/about/mou"
        keywords="Amaltas University MoU, Amaltas University collaborations, Amaltas University partnerships"
        jsonLd={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About Us", path: "/about/university" }, { name: "MoUs", path: "/about/mou" }])}
      />
      <PageHero
        crumb="About Us / MoUs"
        eyebrow="MoUs & Collaborations"
        title="Partnerships that widen the classroom."
        sub="Amaltas University works with academic, research and professional institutions to open new avenues in research, innovation and learning for our students and faculty."
        bgImg="/assets/images%20of%20university/all%20institutes/university.webp"
      />

      {/* MOU LIST */}
      <section className="sec wrap" style={{ paddingTop: 90 }}>
        <Reveal>
          <span className="eyebrow">Signed MoUs</span>
          <h2 style={{ marginTop: 14 }}>Our memoranda of understanding.</h2>
        </Reveal>
        <ol style={{ listStyle: "none", padding: 0, margin: "40px 0 0", display: "grid", gap: 14, maxWidth: 820 }}>
          {MOUS.map((name, i) => (
            <Reveal key={name} delay={`d${(i % 4) + 1}`}>
              <li style={{ display: "flex", alignItems: "center", gap: 16, background: "#fff", borderRadius: 16, padding: "18px 20px", border: "1px solid rgba(11,44,24,.07)" }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: `linear-gradient(135deg,${C.emerald},${C.emeraldL})`, display: "grid", placeItems: "center", color: "#fff", flexShrink: 0 }}>
                  <Handshake size={18} />
                </div>
                <span style={{ color: C.navy, fontWeight: 600, fontSize: 15.5, lineHeight: 1.5 }}>{name}</span>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="sec wrap" style={{ textAlign: "center" }}>
        <Reveal>
          <h2 style={{ maxWidth: 560, margin: "0 auto" }}>Interested in partnering with Amaltas?</h2>
          <p className="lead" style={{ margin: "16px auto 28px" }}>We welcome collaborations in research, academics, healthcare and innovation.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/contact" className="btn btn-gold">Contact us <ArrowRight size={18} /></Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
