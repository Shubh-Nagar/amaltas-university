import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { PageHero } from "../components/Layout.jsx";
import { Reveal } from "../components/Primitives.jsx";
import { C } from "../theme.js";
import { IQAC_MESSAGE } from "../data/content.js";

export default function IQAC() {
  return (
    <>
      <PageHero
        crumb="IQAC"
        eyebrow="Internal Quality Assurance Cell"
        title="Working together for excellence."
        sub="Amaltas University, Dewas — building a culture of continuous quality improvement across every constituent institution."
        bgImg="/assets/images%20of%20university/all%20institutes/university.jpg"
      />

      <section className="sec wrap" style={{ paddingTop: 90, paddingBottom: 90 }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 26 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `linear-gradient(135deg,${C.emerald},${C.navy})`, display: "grid", placeItems: "center", color: C.gold, flexShrink: 0 }}>
                <ShieldCheck size={20} />
              </div>
              <span className="eyebrow" style={{ margin: 0 }}>{IQAC_MESSAGE.heading}</span>
            </div>
          </Reveal>

          <Reveal delay="d1">
            <div className="chancellor-letter">
              {IQAC_MESSAGE.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <div className="letter-closing">
                <span className="letter-signame">{IQAC_MESSAGE.name}</span>
                <span className="letter-sigrole">{IQAC_MESSAGE.role}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg,#eef6f1 0%,var(--ivory) 55%,#fdfce8 100%)", padding: "90px 0" }}>
        <div className="wrap" style={{ textAlign: "center" }}>
          <Reveal>
            <span className="eyebrow" style={{ marginBottom: 16, display: "block" }}>Explore further</span>
            <h2 style={{ maxWidth: 560, margin: "0 auto" }}>Quality, transparently pursued.</h2>
            <p className="lead" style={{ margin: "16px auto 30px" }}>See how this commitment to quality shows up in our approvals, accreditations, and mandatory disclosures.</p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/about/accreditations" className="btn btn-gold">Approvals &amp; Accreditations <ArrowRight size={18} /></Link>
              <Link to="/about/disclosure" className="btn btn-dark">Mandatory Disclosure <ArrowRight size={18} /></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
