import React from "react";
import { Download, Lightbulb } from "lucide-react";
import { PageHero } from "../../components/Layout.jsx";
import { Reveal } from "../../components/Primitives.jsx";
import { C } from "../../theme.js";
import SEO from "../../components/SEO.jsx";
import { breadcrumbSchema } from "../../data/schema.js";
import { PATENTS, PATENTS_PDF } from "../../data/research.js";

const fmt = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

export default function Patents() {
  return (
    <>
      <SEO
        title="Patents"
        description={`${PATENTS.length} patents by Amaltas University, Dewas faculty: from herbal formulations and drug-delivery devices to AI-enabled health monitoring systems.`}
        path="/research/patents"
        keywords="Amaltas University patents, Amaltas University innovation, Amaltas Institute of Pharmacy patents"
        jsonLd={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Research", path: "/research/patents" }, { name: "Patents", path: "/research/patents" }])}
      />
      <PageHero
        crumb="Research / Patents"
        eyebrow="Patents & Innovation"
        title="Ideas that become inventions."
        sub="Patents by Amaltas faculty, spanning herbal formulations, laboratory apparatus, diagnostic devices and AI-driven healthcare tools."
        bgImg="/assets/images%20of%20university/all%20institutes/university.webp"
      />

      <section className="sec wrap" style={{ paddingTop: 90 }}>
        <Reveal>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "flex-end", justifyContent: "space-between" }}>
            <div>
              <span className="eyebrow">List of Patents</span>
              <h2 style={{ marginTop: 14 }}>{PATENTS.length} patents, 2021–2026.</h2>
            </div>
            <a href={PATENTS_PDF} target="_blank" rel="noreferrer" className="btn btn-em">
              <Download size={18} /> Download list (PDF)
            </a>
          </div>
        </Reveal>

        <ol style={{ listStyle: "none", padding: 0, margin: "40px 0 0", display: "grid", gap: 14, maxWidth: 880 }}>
          {PATENTS.map((x, i) => (
            <Reveal key={x.title} delay={`d${(i % 4) + 1}`}>
              <li style={{ display: "flex", gap: 16, background: "#fff", borderRadius: 16, padding: "20px 22px", border: "1px solid rgba(11,44,24,.07)" }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: `linear-gradient(135deg,${C.burg},${C.burgL})`, display: "grid", placeItems: "center", color: "#fff", flexShrink: 0 }}>
                  <Lightbulb size={18} />
                </div>
                <div>
                  <time dateTime={x.date} style={{ display: "inline-block", fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 100, background: "rgba(246,224,5,.35)", color: C.ink }}>
                    {fmt(x.date)}
                  </time>
                  <h3 style={{ color: C.navy, fontSize: 16.5, lineHeight: 1.45, margin: "8px 0 0", fontWeight: 700 }}>{x.title}</h3>
                  <p style={{ margin: "6px 0 0", color: C.slate, fontSize: 14.5 }}>{x.inventors}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>
    </>
  );
}
