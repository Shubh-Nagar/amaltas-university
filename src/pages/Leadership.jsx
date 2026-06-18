import React from "react";
import { Users } from "lucide-react";
import { PageHero } from "../components/Layout.jsx";
import { Reveal } from "../components/Primitives.jsx";
import { C } from "../theme.js";
import { LEADERS } from "../data/content.js";

export default function Leadership() {
  return (
    <>
      <PageHero
        crumb="Leadership"
        eyebrow="The people behind the promise"
        title="Leadership with a legacy of service."
        sub="From the founding welfare society to today's academic council, Amaltas is led by people who built this institution to serve a community."
      />

      <section className="sec wrap" style={{ paddingTop: 80 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 20 }}>
          {LEADERS.map((l, i) => (
            <Reveal key={i} delay={`d${(i % 5) + 1}`}>
              <div className="leader">
                <div className="av" style={{ overflow: "hidden" }}>
                  {l.photo ? <img src={l.photo} alt={l.nm} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <Users size={64} />}
                </div>
                <div className="meta">
                  <div className="role">{l.role}</div>
                  <div className="nm">{l.nm}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="sec wrap" style={{ paddingTop: 0 }}>
        <div style={{ display: "grid", gap: 18 }}>
          {LEADERS.map((l, i) => (
            <Reveal key={i} delay={`d${(i % 4) + 1}`}>
              <div style={{ display: "flex", gap: 26, alignItems: "center", background: "#fff", borderRadius: 18, padding: 26, border: "1px solid rgba(11,44,24,.07)", flexWrap: "wrap" }}>
                <div style={{ width: 70, height: 70, borderRadius: "50%", flexShrink: 0, background: `linear-gradient(135deg,${C.navy},${C.emerald})`, display: "grid", placeItems: "center", color: C.goldL, fontFamily: "Fraunces,serif", fontSize: 24, overflow: "hidden" }}>
                  {l.photo
                    ? <img src={l.photo} alt={l.nm} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : l.nm.split(" ").filter(Boolean).slice(-1)[0][0]}
                </div>
                <div style={{ flex: 1, minWidth: 240 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "baseline", flexWrap: "wrap" }}>
                    <h3 style={{ fontSize: 21 }}>{l.nm}</h3>
                    <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: C.emerald }}>{l.role}</span>
                  </div>
                  <p style={{ color: C.slate, fontSize: 15, marginTop: 6 }}>{l.bio}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
