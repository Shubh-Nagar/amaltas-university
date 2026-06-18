import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Users } from "lucide-react";
import { PageHero } from "../../components/Layout.jsx";
import { Reveal } from "../../components/Primitives.jsx";
import { C } from "../../theme.js";
import { CHANCELLOR_MESSAGE, VC_MESSAGE } from "../../data/content.js";

function MessageBlock({ msg, large }) {
  return (
    <div className="chancellor-letter" style={large ? {} : { fontSize: 15, lineHeight: 1.85 }}>
      <p className="letter-salutation">{msg.salutation}</p>
      {msg.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
      <div className="letter-closing">
        <p>{msg.closing}</p>
        <span className="letter-signature">{msg.name.split(" ").slice(-1)[0]}</span>
        <span className="letter-signame">{msg.name}</span>
        <span className="letter-sigrole">{msg.role}</span>
      </div>
    </div>
  );
}

export default function ChancellorMessage() {
  return (
    <>
      <PageHero
        crumb="About Us / Chancellor's Message"
        eyebrow="A note from the Chancellor"
        title="Dear student, this is for you."
        sub="Mrs. Aruna Bhadoria — Chancellor, Amaltas University"
      />

      {/* CHANCELLOR MESSAGE */}
      <section className="sec wrap" style={{ paddingTop: 90 }}>
        <div className="chancellor-wrap">
          {/* LEFT: portrait + nameplate */}
          <Reveal variant="left">
            <div className="chancellor-portrait-box">
              <div className="chancellor-photo">
                <img
                  src="/assets/images%20of%20university/leadership/Smt.Arunaji-Bhadoriya-Chancellor.jpg"
                  alt="Mrs. Aruna Bhadoria, Chancellor"
                />
              </div>
              <div className="chancellor-name-plate">
                <div className="cp-role">Chancellor</div>
                <div className="cp-name">Mrs. Aruna Bhadoria</div>
                <div className="cp-org">Amaltas University</div>
              </div>
            </div>
          </Reveal>

          {/* RIGHT: letter */}
          <Reveal variant="right">
            <span className="eyebrow" style={{ marginBottom: 24, display: "block" }}>Chancellor's Message</span>
            <MessageBlock msg={CHANCELLOR_MESSAGE} large />
          </Reveal>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="wrap" style={{ marginBottom: 80 }}>
        <Reveal>
          <div className="quote-pull">
            <p>{CHANCELLOR_MESSAGE.quote}</p>
          </div>
        </Reveal>
      </section>

      {/* DIVIDER */}
      <div className="wrap" style={{ borderTop: "1px solid rgba(11,44,24,.08)", marginBottom: 80 }} />

      {/* VICE CHANCELLOR MESSAGE */}
      <section className="sec wrap" style={{ paddingTop: 0 }}>
        <Reveal>
          <span className="eyebrow">Vice Chancellor's Message</span>
          <h2 style={{ marginTop: 14 }}>Excellence and empathy, inseparable.</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: 48, marginTop: 52, alignItems: "start" }}>
          {/* VC portrait placeholder */}
          <Reveal variant="left">
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ width: "100%", maxWidth: 260, aspectRatio: "3/3.6", borderRadius: 24, background: `linear-gradient(135deg,${C.navy},${C.emerald})`, display: "grid", placeItems: "center", color: C.goldL, boxShadow: "0 40px 70px -40px rgba(11,44,24,.5)" }}>
                <Users size={64} />
              </div>
              <div style={{ padding: "18px 20px", background: "#fff", borderRadius: 16, border: "1px solid rgba(11,44,24,.08)", boxShadow: "0 8px 28px -14px rgba(11,44,24,.15)" }}>
                <div className="cp-role">Vice Chancellor</div>
                <div className="cp-name">{VC_MESSAGE.name}</div>
                <div className="cp-org">Amaltas University</div>
              </div>
            </div>
          </Reveal>
          <Reveal variant="right">
            <MessageBlock msg={VC_MESSAGE} />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg,#eef6f1 0%,var(--ivory) 55%,#fdfce8 100%)", padding: "90px 0" }}>
        <div className="wrap" style={{ textAlign: "center" }}>
          <Reveal>
            <h2 style={{ maxWidth: 560, margin: "0 auto" }}>Inspired? Take the next step.</h2>
            <p className="lead" style={{ margin: "16px auto 30px" }}>Meet the institution the Chancellor believes in — and join its next chapter.</p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/admissions" className="btn btn-gold">Apply for 2026–27 <ArrowRight size={18} /></Link>
              <Link to="/about/university" className="btn btn-dark">About the University <ArrowRight size={18} /></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
