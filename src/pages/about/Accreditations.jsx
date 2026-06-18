import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, CheckCircle } from "lucide-react";
import { PageHero } from "../../components/Layout.jsx";
import { Reveal } from "../../components/Primitives.jsx";
import { C } from "../../theme.js";
import { ACCREDITATIONS } from "../../data/content.js";

const WHY_ACC = [
  { title: "Degree Validity", desc: "Only programmes recognised by the relevant statutory council are legally valid for practice and further study in India." },
  { title: "Global Portability", desc: "NMC-recognised MBBS degrees are eligible for screening tests required to practice or pursue residency abroad." },
  { title: "Quality Assurance", desc: "Each council sets standards for infrastructure, faculty, curriculum and patient care that we are regularly audited against." },
  { title: "Your Protection", desc: "Accreditation means you are protected — your time, your investment and your degree are backed by government regulation." },
];

export default function Accreditations() {
  return (
    <>
      <PageHero
        crumb="About Us / Approvals & Accreditations"
        eyebrow="Approvals & Accreditations"
        title="Recognised. Regulated. Trusted."
        sub="Every programme at Amaltas University is approved by the relevant statutory council of the Government of India — so your degree is valid, valued, and portable."
      />

      {/* WHY IT MATTERS */}
      <section className="sec wrap" style={{ paddingTop: 90 }}>
        <Reveal>
          <span className="eyebrow">Why Accreditation Matters</span>
          <h2 style={{ marginTop: 14 }}>Your degree is only as strong as its backing.</h2>
          <p className="lead" style={{ marginTop: 18 }}>Accreditation is not a formality — it is the assurance that your education meets the standards the nation's patients deserve.</p>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 20, marginTop: 44 }}>
          {WHY_ACC.map((w, i) => (
            <Reveal key={i} delay={`d${i + 1}`}>
              <div style={{ background: "#fff", borderRadius: 20, padding: "28px 24px", border: "1px solid rgba(11,44,24,.07)", height: "100%" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `linear-gradient(135deg,${C.emerald},${C.emeraldL})`, display: "grid", placeItems: "center", color: "#fff", marginBottom: 16, flexShrink: 0 }}>
                  <Shield size={20} />
                </div>
                <h3 style={{ fontSize: 17, marginBottom: 10 }}>{w.title}</h3>
                <p style={{ color: C.slate, fontSize: 14, lineHeight: 1.7 }}>{w.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ACCREDITATIONS GRID */}
      <section style={{ background: "linear-gradient(135deg,#eef6f1 0%,var(--ivory) 55%,#fdfce8 100%)", padding: "90px 0" }}>
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Statutory Approvals</span>
            <h2 style={{ marginTop: 14 }}>Our regulatory body approvals.</h2>
            <p className="lead" style={{ marginTop: 18 }}>Amaltas holds active approvals from all relevant statutory councils across its seven health-science institutes.</p>
          </Reveal>
          <div className="acc-grid">
            {ACCREDITATIONS.map((a, i) => (
              <Reveal key={i} delay={`d${(i % 4) + 1}`}>
                <div className="acc-card">
                  <div className="acc-badge">{a.short}</div>
                  <div>
                    <div className="acc-short-label">{a.short}</div>
                    <div className="acc-name">{a.name}</div>
                  </div>
                  <p className="acc-desc">{a.desc}</p>
                  <span className="acc-scope">{a.scope}</span>
                  <div className="acc-status">
                    <span className="acc-status-dot" />
                    Active Approval
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COMPLIANCE STATEMENT */}
      <section className="sec wrap">
        <Reveal>
          <div style={{ background: `linear-gradient(135deg,${C.navy2},${C.navy})`, borderRadius: 28, padding: "52px 56px", color: C.ivory, position: "relative", overflow: "hidden", boxShadow: `0 50px 100px -50px rgba(11,44,24,.6)` }}>
            <div style={{ position: "absolute", width: 280, height: 280, borderRadius: "50%", border: "1px solid rgba(246,224,5,.15)", right: -60, top: -60, pointerEvents: "none" }} />
            <div style={{ position: "absolute", width: 180, height: 180, borderRadius: "50%", border: "1px solid rgba(246,224,5,.1)", right: 20, top: 20, pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 44, alignItems: "center" }}>
              <div>
                <span className="eyebrow" style={{ color: C.goldL }}>Our Commitment</span>
                <h2 style={{ marginTop: 14, color: C.ivory }}>Compliant today. Building toward NAAC tomorrow.</h2>
                <p style={{ color: "rgba(247,244,236,.75)", fontSize: 16, lineHeight: 1.8, marginTop: 16 }}>
                  Amaltas University is actively working toward NAAC accreditation and NIRF ranking participation. Our regulatory compliance across all 8 statutory bodies is current and audited annually.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {["NMC · CCIM · CCH approvals active", "INC · PCI · RCI approvals active", "UGC Section 2(f) recognition", "MP Private University Act compliance", "Annual audit by MPUREC"].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, color: "rgba(247,244,236,.85)", fontSize: 14.5 }}>
                    <CheckCircle size={16} color={C.emeraldL} style={{ flexShrink: 0 }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="sec wrap" style={{ textAlign: "center" }}>
        <Reveal>
          <h2 style={{ maxWidth: 560, margin: "0 auto" }}>Any questions about our approvals?</h2>
          <p className="lead" style={{ margin: "16px auto 28px" }}>Our registrar's office can provide copies of all statutory approvals on request.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/admissions" className="btn btn-gold">Apply now <ArrowRight size={18} /></Link>
            <Link to="/about/disclosure" className="btn btn-dark">Mandatory Disclosure <ArrowRight size={18} /></Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
