import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Users, Loader2, GraduationCap } from "lucide-react";
import { PageHero } from "../../components/Layout.jsx";
import { Reveal } from "../../components/Primitives.jsx";
import { C } from "../../theme.js";
import SEO from "../../components/SEO.jsx";
import { breadcrumbSchema } from "../../data/schema.js";
import { INSTITUTES } from "../../data/alumniFields.js";
import { alumniApiEnabled, searchMembers } from "../../lib/alumniApi.js";
import { alumniCard, FormError } from "./Registration.jsx";

const MODES = [
  { id: "letter", label: "Alphabetically" },
  { id: "year",   label: "By Batch" },
  { id: "first",  label: "By First Name" },
  { id: "last",   label: "By Last Name" },
];
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function AlumniMembers() {
  const [mode, setMode] = useState("letter");
  const [text, setText] = useState("");
  const [institute, setInstitute] = useState("");
  const [letter, setLetter] = useState("");
  const [result, setResult] = useState(null); // { members, more, label }
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const run = async (filters, label) => {
    setBusy(true);
    setError("");
    const res = await searchMembers({ ...filters, ...(institute ? { institute } : {}) });
    setBusy(false);
    if (!res.ok) { setResult(null); return setError(res.error || "Search failed. Please try again."); }
    setResult({ members: res.members, more: res.more, label });
  };

  const pickLetter = (l) => { setLetter(l); run({ letter: l }, `Last names starting with “${l}”`); };

  const submitText = (e) => {
    e.preventDefault();
    const q = text.trim();
    if (mode === "year") run({ year: q }, `Batch of ${q}`);
    else run({ [mode]: q }, `${mode === "first" ? "First" : "Last"} names starting with “${q}”`);
  };

  const switchMode = (id) => { setMode(id); setText(""); setLetter(""); setResult(null); setError(""); };

  return (
    <>
      <SEO
        title="Alumni Members Directory"
        description="Search the Amaltas University alumni member directory alphabetically, by batch, or by first or last name, and reconnect with your batchmates."
        path="/alumni/members"
        jsonLd={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Alumni", path: "/alumni" }, { name: "Members", path: "/alumni/members" }])}
      />
      <PageHero
        crumb="Alumni / Members"
        eyebrow="Members"
        title="Find your batchmates."
        sub="Search the Amaltas alumni directory alphabetically, by batch, or by name — and reconnect with the people you trained beside."
        bgImg="/assets/images%20of%20university/campus%20life/2U8A2387.webp"
      />

      <section className="sec" style={{ background: "var(--paper)" }}>
        <div className="wrap" style={{ maxWidth: 980 }}>
          <Reveal>
            <div style={alumniCard}>
              {!alumniApiEnabled ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <h3 style={{ fontFamily: "Fraunces,serif", fontSize: 22, color: C.ink, margin: 0 }}>The member directory is coming soon</h3>
                  <p style={{ color: C.slate, fontSize: 15, lineHeight: 1.7, margin: 0 }}>
                    Meanwhile, <Link to="/alumni/registration" style={{ color: C.emerald, fontWeight: 600 }}>register as alumni</Link> so your batchmates can find you once it opens.
                  </p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: "Fraunces,serif", fontSize: 22, color: C.ink, margin: 0, display: "flex", gap: 10, alignItems: "center" }}>
                    <Search size={20} color={C.emerald} /> Search Members
                  </h3>

                  <div role="tablist" aria-label="Search by" style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "22px 0 24px" }}>
                    {MODES.map((m) => {
                      const on = mode === m.id;
                      return (
                        <button
                          key={m.id} role="tab" aria-selected={on} type="button" onClick={() => switchMode(m.id)}
                          style={{
                            fontFamily: "inherit", fontSize: 14, fontWeight: 600, padding: "10px 16px", borderRadius: 999, cursor: "pointer",
                            border: `1px solid ${on ? C.emerald : "rgba(11,44,24,.15)"}`,
                            background: on ? C.emerald : "#fff", color: on ? "#fff" : C.ink,
                          }}
                        >{m.label}</button>
                      );
                    })}
                  </div>

                  {mode === "letter" ? (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }} aria-label="Last name starts with">
                      {LETTERS.map((l) => (
                        <button
                          key={l} type="button" onClick={() => pickLetter(l)} disabled={busy} aria-pressed={letter === l}
                          style={{
                            width: 38, height: 38, borderRadius: 10, fontFamily: "inherit", fontWeight: 700, fontSize: 14, cursor: "pointer",
                            border: `1px solid ${letter === l ? C.emerald : "rgba(11,44,24,.12)"}`,
                            background: letter === l ? "rgba(18,134,63,.1)" : "#fff", color: letter === l ? C.emerald : C.ink,
                          }}
                        >{l}</button>
                      ))}
                    </div>
                  ) : (
                    <form onSubmit={submitText} style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-end" }}>
                      <div className="field" style={{ flex: "1 1 220px" }}>
                        <label htmlFor="member-q">
                          {mode === "year" ? "Year of Admission" : mode === "first" ? "First Name" : "Last Name"}
                        </label>
                        {mode === "year" ? (
                          <input id="member-q" inputMode="numeric" required pattern="(19|20)[0-9]{2}" maxLength={4} placeholder="e.g. 2018" title="Enter a 4-digit year"
                            value={text} onChange={(e) => setText(e.target.value.replace(/\D/g, "").slice(0, 4))} />
                        ) : (
                          <input id="member-q" required minLength={2} maxLength={60} placeholder="Type at least 2 letters"
                            value={text} onChange={(e) => setText(e.target.value)} />
                        )}
                      </div>
                      <button type="submit" className="btn btn-em" disabled={busy} style={{ gap: 8, opacity: busy ? 0.75 : 1 }}>
                        {busy ? <Loader2 size={16} className="spin" /> : <Search size={16} />} Search
                      </button>
                    </form>
                  )}

                  <div className="field" style={{ marginTop: 18, maxWidth: 420 }}>
                    <label htmlFor="member-inst">Institute (optional)</label>
                    <select id="member-inst" value={institute} onChange={(e) => { setInstitute(e.target.value); setResult(null); }} style={{ fontFamily: "inherit" }}>
                      <option value="">All institutes</option>
                      {INSTITUTES.map((i) => <option key={i} value={i}>{i}</option>)}
                    </select>
                  </div>
                </>
              )}
            </div>
          </Reveal>

          {alumniApiEnabled && (
            <div style={{ marginTop: 32 }} aria-live="polite">
              <FormError>{error}</FormError>
              {busy && mode === "letter" && (
                <p style={{ color: C.slate, display: "flex", gap: 8, alignItems: "center" }}><Loader2 size={16} className="spin" /> Searching…</p>
              )}
              {result && !busy && <Results {...result} />}
            </div>
          )}

          <p style={{ color: C.slate, fontSize: 14, textAlign: "center", marginTop: 40, lineHeight: 1.7 }}>
            Only alumni who chose to appear in the directory are listed, and only their name, institute, batch and present status are shown.
            Can't find yourself? <Link to="/alumni/registration" style={{ color: C.emerald, fontWeight: 600 }}>Register</Link> or{" "}
            <Link to="/alumni/update-profile" style={{ color: C.emerald, fontWeight: 600 }}>update your profile</Link> and tick “Show me in the alumni member directory”.
          </p>
        </div>
      </section>
    </>
  );
}

function Results({ members, more, label }) {
  if (!members.length) {
    return (
      <div style={{ ...alumniCard, textAlign: "center", padding: "36px 24px" }}>
        <Users size={28} color={C.slate} />
        <p style={{ color: C.ink, fontWeight: 600, margin: "12px 0 4px" }}>No members found</p>
        <p style={{ color: C.slate, fontSize: 14, margin: 0 }}>{label}. Try another search.</p>
      </div>
    );
  }
  return (
    <>
      <p style={{ color: C.slate, fontSize: 14, margin: "0 0 14px" }}>
        <strong style={{ color: C.ink }}>{members.length}{more ? "+" : ""}</strong> member{members.length === 1 ? "" : "s"} · {label}
        {more && " — showing the first 100; narrow your search to see more."}
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,280px),1fr))", gap: 14 }}>
        {members.map((m, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 16, padding: "18px 20px", border: "1px solid rgba(11,44,24,.08)", display: "flex", gap: 14 }}>
            <div aria-hidden="true" style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg,${C.navy},${C.emerald})`, color: C.gold, display: "grid", placeItems: "center", fontFamily: "Fraunces,serif", fontSize: 17, flexShrink: 0 }}>
              {(m.first_name[0] || "") + (m.last_name[0] || "")}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: "Fraunces,serif", fontSize: 17, color: C.ink }}>{m.first_name} {m.last_name}</div>
              <div style={{ color: C.emerald, fontSize: 13, fontWeight: 600, marginTop: 3, display: "flex", gap: 6, alignItems: "center" }}>
                <GraduationCap size={14} style={{ flexShrink: 0 }} /> {m.batch}
              </div>
              <div style={{ color: C.slate, fontSize: 13, marginTop: 3 }}>{m.institute}</div>
              {m.status && <div style={{ color: C.ink, fontSize: 13.5, marginTop: 6 }}>{m.status}</div>}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
