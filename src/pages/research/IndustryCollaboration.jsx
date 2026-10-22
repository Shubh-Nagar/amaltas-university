import React, { useMemo, useState } from "react";
import { Building2, Download, Search } from "lucide-react";
import { PageHero } from "../../components/Layout.jsx";
import { Reveal } from "../../components/Primitives.jsx";
import { C } from "../../theme.js";
import SEO from "../../components/SEO.jsx";
import { breadcrumbSchema } from "../../data/schema.js";
import { COLLABORATIONS, COLLABORATIONS_PDF } from "../../data/research.js";

// Newest first; the source lists them oldest first.
const ITEMS = [...COLLABORATIONS].reverse();
const PARTNERS = new Set(COLLABORATIONS.map((x) => x.institution)).size;

const fmt = (ym) =>
  new Date(`${ym}-01T00:00:00`).toLocaleDateString("en-IN", { month: "long", year: "numeric" });

const field = { fontFamily: "inherit", fontSize: 15, padding: "12px 16px 12px 42px", borderRadius: 100, border: "1px solid rgba(11,44,24,.14)", background: "#fff", color: C.ink, outline: "none", width: "100%", boxSizing: "border-box" };

export default function IndustryCollaboration() {
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return ITEMS;
    return ITEMS.filter((x) => `${x.institution} ${x.regarding} ${fmt(x.date)}`.toLowerCase().includes(needle));
  }, [q]);

  return (
    <>
      <SEO
        title="Industry & Institutional Collaboration"
        description={`Amaltas University, Dewas collaborates with ${PARTNERS}+ government bodies, hospitals and institutions on healthcare services, camps, training and outreach.`}
        path="/research/industry-collaboration"
        keywords="Amaltas University collaboration, Amaltas University industry collaboration, Amaltas Hospital partnerships"
        jsonLd={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Research", path: "/research/industry-collaboration" }, { name: "Industry Collaboration", path: "/research/industry-collaboration" }])}
      />
      <PageHero
        crumb="Research / Industry Collaboration"
        eyebrow="Industry Collaboration"
        title="Working alongside the institutions that serve our region."
        sub="Amaltas University collaborates with various partner institutions and industries to enhance the educational experience and employability of its students."
        bgImg="/assets/images%20of%20university/all%20institutes/university.webp"
      />

      <section className="sec wrap" style={{ paddingTop: 90 }}>
        <Reveal>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "flex-end", justifyContent: "space-between" }}>
            <div>
              <span className="eyebrow">Collaboration with Partner Institutions and Industries</span>
              <h2 style={{ marginTop: 14 }}>{COLLABORATIONS.length} collaborations with {PARTNERS} partners.</h2>
            </div>
            <a href={COLLABORATIONS_PDF} target="_blank" rel="noreferrer" className="btn btn-em">
              <Download size={18} /> Download list (PDF)
            </a>
          </div>
        </Reveal>

        <div style={{ marginTop: 36, maxWidth: 880 }}>
          <label style={{ position: "relative", display: "block" }}>
            <Search size={17} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: C.slate }} />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by institution, purpose or month"
              aria-label="Search collaborations"
              style={field}
            />
          </label>
          <p style={{ color: C.slate, fontSize: 14, margin: "14px 0 0" }} aria-live="polite">
            Showing {results.length} of {COLLABORATIONS.length} collaborations
          </p>
        </div>

        <ol style={{ listStyle: "none", padding: 0, margin: "24px 0 0", display: "grid", gap: 14, maxWidth: 880 }}>
          {results.map((x, i) => (
            <li key={`${x.date}-${x.regarding}-${i}`} style={{ display: "flex", gap: 16, background: "#fff", borderRadius: 16, padding: "20px 22px", border: "1px solid rgba(11,44,24,.07)" }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: `linear-gradient(135deg,${C.emerald},${C.emeraldL})`, display: "grid", placeItems: "center", color: "#fff", flexShrink: 0 }}>
                <Building2 size={18} />
              </div>
              <div style={{ minWidth: 0 }}>
                <time dateTime={x.date} style={{ display: "inline-block", fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 100, background: "rgba(246,224,5,.35)", color: C.ink }}>
                  {fmt(x.date)}
                </time>
                <h3 style={{ color: C.navy, fontSize: 16.5, lineHeight: 1.45, margin: "8px 0 0", fontWeight: 700 }}>{x.institution}</h3>
                <p style={{ margin: "6px 0 0", color: C.slate, fontSize: 14.5, lineHeight: 1.55 }}>{x.regarding}</p>
              </div>
            </li>
          ))}
        </ol>

        {results.length === 0 && (
          <p style={{ marginTop: 24, color: C.slate, maxWidth: 880, textAlign: "center" }}>No collaborations match your search.</p>
        )}
      </section>
    </>
  );
}
