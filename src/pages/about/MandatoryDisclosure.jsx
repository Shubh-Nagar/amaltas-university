import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Download, FileText } from "lucide-react";
import { PageHero } from "../../components/Layout.jsx";
import { Reveal } from "../../components/Primitives.jsx";
import { C } from "../../theme.js";
import { DISCLOSURE_SECTIONS, CONTACT } from "../../data/content.js";

const DOWNLOADS = [
  { label: "AISHE Data Report",            desc: "All India Survey on Higher Education" },
  { label: "NMC Approval Letter",           desc: "Institute of Medical Sciences"        },
  { label: "UGC Recognition Certificate",   desc: "Section 2(f) — University Grants Commission" },
  { label: "Annual Report 2025–26",         desc: "Institutional annual performance report" },
  { label: "Statutory Audit Report",        desc: "Financial statements & compliance"    },
  { label: "NAAC Self-Study Report",        desc: "Under preparation — available soon"   },
];

export default function MandatoryDisclosure() {
  return (
    <>
      <PageHero
        crumb="About Us / Mandatory Disclosure"
        eyebrow="Transparency & Compliance"
        title="Mandatory Disclosure."
        sub="In accordance with UGC and MP Private University regulations, Amaltas University publishes this disclosure for the information of all stakeholders."
      />

      {/* NOTICE BAND */}
      <section className="wrap" style={{ marginTop: -50, position: "relative", zIndex: 5 }}>
        <div style={{ background: `linear-gradient(135deg,${C.navy2},${C.navy})`, borderRadius: 20, padding: "22px 30px", display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between", boxShadow: `0 30px 60px -30px rgba(11,44,24,.5)` }}>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ width: 42, height: 42, borderRadius: 11, background: "rgba(246,224,5,.15)", border: "1px solid rgba(246,224,5,.25)", display: "grid", placeItems: "center", color: C.gold, flexShrink: 0 }}>
              <FileText size={18} />
            </div>
            <div>
              <div style={{ color: C.ivory, fontWeight: 600, fontSize: 15 }}>Published in compliance with UGC & MPUREC regulations</div>
              <div style={{ color: "rgba(247,244,236,.55)", fontSize: 13, marginTop: 2 }}>Last updated: June 2026 · Next update due: December 2026</div>
            </div>
          </div>
          <a
            href="#downloads"
            className="btn btn-gold"
            style={{ padding: "11px 20px", fontSize: 14 }}
            onClick={(e) => { e.preventDefault(); document.getElementById("downloads")?.scrollIntoView({ behavior: "smooth" }); }}
          >
            Download Documents <Download size={15} />
          </a>
        </div>
      </section>

      {/* DISCLOSURE SECTIONS */}
      <section className="sec wrap" style={{ paddingTop: 80 }}>
        <Reveal>
          <span className="eyebrow">Institutional Information</span>
          <h2 style={{ marginTop: 14 }}>Complete disclosure at a glance.</h2>
          <p className="lead" style={{ marginTop: 18 }}>All information below is mandated under the UGC (Establishment of and Maintenance of Standards in Private Universities) Regulations and the MP Private University Act.</p>
        </Reveal>

        <div style={{ marginTop: 44 }}>
          {DISCLOSURE_SECTIONS.map((sec, si) => (
            <Reveal key={si} delay={`d${(si % 3) + 1}`}>
              <div className="disc-section-box">
                <div className="disc-section-header">
                  <div className="disc-section-title">{sec.title}</div>
                </div>
                {sec.items.map((item, ii) => (
                  <div key={ii} className="disc-row">
                    <div className="disc-label">{item.label}</div>
                    <div className="disc-value">{item.value}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* DOCUMENTS DOWNLOAD */}
      <section id="downloads" style={{ background: "linear-gradient(135deg,#eef6f1 0%,var(--ivory) 55%,#fdfce8 100%)", padding: "90px 0" }}>
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Document Repository</span>
            <h2 style={{ marginTop: 14 }}>Download official documents.</h2>
            <p className="lead" style={{ marginTop: 18 }}>The following documents are available on request from the Registrar's Office. Digital copies will be made available as they are cleared for public release.</p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16, marginTop: 44 }}>
            {DOWNLOADS.map((d, i) => (
              <Reveal key={i} delay={`d${(i % 4) + 1}`}>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  style={{ display: "flex", gap: 16, alignItems: "flex-start", background: "#fff", borderRadius: 18, padding: "22px 20px", border: "1px solid rgba(11,44,24,.08)", textDecoration: "none", transition: "transform .3s,box-shadow .3s", color: C.ink }}
                  className="card-lift"
                >
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `linear-gradient(135deg,${C.navy},${C.emerald})`, display: "grid", placeItems: "center", color: C.gold, flexShrink: 0 }}>
                    <Download size={18} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14.5, color: C.ink, lineHeight: 1.3 }}>{d.label}</div>
                    <div style={{ fontSize: 12.5, color: C.slate, marginTop: 4 }}>{d.desc}</div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p style={{ color: C.slate, fontSize: 13.5, marginTop: 28, lineHeight: 1.7 }}>
              To request a certified copy of any statutory approval or compliance document, contact the Registrar's Office at{" "}
              <a href={`mailto:${CONTACT.email}`} style={{ color: C.emerald, fontWeight: 600 }}>{CONTACT.email}</a> or call{" "}
              <a href={`tel:${CONTACT.phone}`} style={{ color: C.emerald, fontWeight: 600 }}>{CONTACT.phone}</a>.
            </p>
          </Reveal>
        </div>
      </section>

      {/* DOWNLOAD STRIP */}
      <section className="wrap" style={{ paddingBottom: 80, paddingTop: 0 }}>
        <Reveal>
          <div className="disc-download-bar">
            <div>
              <div style={{ fontFamily: "Fraunces,serif", fontSize: 22, color: C.ivory, marginBottom: 6 }}>Need the full compliance dossier?</div>
              <p style={{ color: "rgba(247,244,236,.65)", fontSize: 14.5, margin: 0 }}>Our Registrar's team will respond within 2 working days to any official information request.</p>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href={`tel:${CONTACT.phone}`} className="btn btn-gold" style={{ padding: "12px 22px", fontSize: 14 }}>
                {CONTACT.phone} <ArrowRight size={16} />
              </a>
              <Link to="/admissions" className="btn btn-ghost" style={{ padding: "12px 22px", fontSize: 14 }}>
                Admissions <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
