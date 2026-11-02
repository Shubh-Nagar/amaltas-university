import React, { useMemo, useState } from "react";
import { BookOpen, Download, ExternalLink, Search } from "lucide-react";
import { PageHero } from "../../components/Layout.jsx";
import { Reveal } from "../../components/Primitives.jsx";
import { C } from "../../theme.js";
import SEO from "../../components/SEO.jsx";
import { breadcrumbSchema } from "../../data/schema.js";
import { PUBLICATIONS, PUBLICATIONS_PDF } from "../../data/research.js";

const PAGE = 24;
const YEARS = [...new Set(PUBLICATIONS.map((x) => x.year))].sort((a, b) => b - a);
const DEPTS = [...new Set(PUBLICATIONS.map((x) => x.dept))].sort();

const card = { background: "#fff", borderRadius: 16, padding: "20px 22px", border: "1px solid rgba(11,44,24,.07)" };
const tag = { display: "inline-block", fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 100 };
const field = { fontFamily: "inherit", fontSize: 15, padding: "12px 16px", borderRadius: 100, border: "1px solid rgba(11,44,24,.14)", background: "#fff", color: C.ink, outline: "none" };

export default function Publications() {
  const [year, setYear] = useState("all");
  const [dept, setDept] = useState("all");
  const [q, setQ] = useState("");
  const [shown, setShown] = useState(PAGE);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return PUBLICATIONS.filter((x) =>
      (year === "all" || x.year === year) &&
      (dept === "all" || x.dept === dept) &&
      (!needle || `${x.title} ${x.authors} ${x.source} ${x.dept}`.toLowerCase().includes(needle))
    );
  }, [year, dept, q]);

  // Any filter change starts the list from the top again.
  const update = (fn) => (v) => { fn(v); setShown(PAGE); };

  return (
    <>
      <SEO
        title="Research Publications"
        description={`${PUBLICATIONS.length} research publications by Amaltas University, Dewas faculty and scholars from 2022 to 2026 across medicine, nursing, pharmacy, Ayurveda, homoeopathy and allied health.`}
        path="/research/publications"
        keywords="Amaltas University publications, Amaltas University research papers, Amaltas Institute of Medical Sciences research"
        jsonLd={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Research", path: "/research/publications" }, { name: "Publications", path: "/research/publications" }])}
      />
      <PageHero
        crumb="Research / Publications"
        eyebrow="Research Publications"
        title="Research that reaches the journals."
        sub="Peer-reviewed papers, book chapters and books published by our faculty and scholars across every institute of Amaltas University, 2022–2026."
        bgImg="/assets/images%20of%20university/all%20institutes/university.webp"
      />

      <section className="sec wrap" style={{ paddingTop: 90 }}>
        <Reveal>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "flex-end", justifyContent: "space-between" }}>
            <div>
              <span className="eyebrow">Publications 2022–2026</span>
              <h2 style={{ marginTop: 14 }}>{PUBLICATIONS.length} publications across {DEPTS.length} departments.</h2>
            </div>
            <a href={PUBLICATIONS_PDF} target="_blank" rel="noreferrer" className="btn btn-em">
              <Download size={18} /> Download full list (PDF)
            </a>
          </div>
        </Reveal>

        {/* FILTERS */}
        <div style={{ marginTop: 36, display: "grid", gap: 16 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {["all", ...YEARS].map((y) => (
              <button key={y} type="button" className={`chip light ${year === y ? "on" : ""}`} onClick={() => update(setYear)(y)}>
                {y === "all" ? "All years" : y}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <label style={{ position: "relative", flex: "1 1 280px" }}>
              <Search size={17} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: C.slate }} />
              <input
                type="search"
                value={q}
                onChange={(e) => update(setQ)(e.target.value)}
                placeholder="Search by title, author or journal"
                aria-label="Search publications"
                style={{ ...field, width: "100%", paddingLeft: 42, boxSizing: "border-box" }}
              />
            </label>
            <select value={dept} onChange={(e) => update(setDept)(e.target.value)} aria-label="Filter by department" style={{ ...field, flex: "0 1 260px", cursor: "pointer" }}>
              <option value="all">All departments</option>
              {DEPTS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <p style={{ color: C.slate, fontSize: 14, margin: 0 }} aria-live="polite">
            Showing {Math.min(shown, results.length)} of {results.length} publication{results.length === 1 ? "" : "s"}
          </p>
        </div>

        {/* LIST */}
        <ol style={{ listStyle: "none", padding: 0, margin: "24px 0 0", display: "grid", gap: 14 }}>
          {results.slice(0, shown).map((x, i) => (
            <li key={`${x.title}-${x.authors}-${i}`} style={{ ...card, display: "flex", gap: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: `linear-gradient(135deg,${C.emerald},${C.emeraldL})`, display: "grid", placeItems: "center", color: "#fff", flexShrink: 0 }}>
                <BookOpen size={18} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                  <span style={{ ...tag, background: "rgba(246,224,5,.35)", color: C.ink }}>{x.year}</span>
                  <span style={{ ...tag, background: "rgba(18,134,63,.1)", color: C.emerald }}>{x.dept}</span>
                </div>
                <h3 style={{ color: C.navy, fontSize: 16.5, lineHeight: 1.45, margin: 0, fontWeight: 700 }}>{x.title}</h3>
                {x.authors && <p style={{ margin: "6px 0 0", color: C.ink, fontSize: 14.5 }}>{x.authors}</p>}
                {x.source && <p style={{ margin: "4px 0 0", color: C.slate, fontSize: 14, fontStyle: "italic" }}>{x.source}</p>}
                {x.doi && (
                  <a href={`https://doi.org/${x.doi}`} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 8, color: C.emerald, fontSize: 14, fontWeight: 600, wordBreak: "break-all" }}>
                    doi:{x.doi} <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>

        {results.length === 0 && (
          <p style={{ ...card, marginTop: 24, color: C.slate, textAlign: "center" }}>No publications match these filters.</p>
        )}
        {shown < results.length && (
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <button type="button" className="btn btn-dark" onClick={() => setShown((n) => n + PAGE)}>
              Show more ({results.length - shown} remaining)
            </button>
          </div>
        )}
      </section>
    </>
  );
}
