import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Quote } from "lucide-react";
import { PageHero } from "../../components/Layout.jsx";
import { Reveal } from "../../components/Primitives.jsx";
import { C } from "../../theme.js";
import SEO from "../../components/SEO.jsx";
import { breadcrumbSchema } from "../../data/schema.js";

// PLACEHOLDER — no authored alumni letter yet; replace with the patron's real
// message when available. Drafted generically for the alumni portal launch.
const MESSAGE = {
  author: "Dr. R.K. Singh",
  role: "Vice Chancellor · Patron, Amaltas University Alumni Association",
  photo: "/assets/images%20of%20university/leadership/vc-sir.webp",
  salutation: "Dear Alumni,",
  paragraphs: [
    "It gives me great pleasure to welcome you to the Amaltas University alumni portal. Wherever your journey has taken you since graduating — to hospitals, clinics, laboratories, classrooms or communities — you carry the Amaltas name with you, and we are proud of every one of you.",
    "This portal has been created to keep that bond alive. Through it you can register as a member, keep your profile up to date, reconnect with your batchmates across all our institutions, and stay informed about reunions, events and opportunities on campus.",
    "If you have not yet registered, I warmly invite you to do so, and to encourage your classmates to join as well. The strength of an alumni network lies in its members, and every name added brings us closer together.",
    "We welcome your suggestions for making this platform more useful, and we look forward to seeing you back on campus. Your achievements inspire our current students, and your experience can guide them as they begin their own careers.",
  ],
  closing: "With warm regards,",
};

export default function AlumniMessage() {
  return (
    <>
      <SEO
        title="Message to Alumni"
        description="A message to the alumni of Amaltas University, Dewas, from the patron of the Amaltas University Alumni Association."
        path="/alumni/message"
        jsonLd={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Alumni", path: "/alumni" }, { name: "Message", path: "/alumni/message" }])}
      />
      <PageHero
        crumb="Alumni / Message"
        eyebrow="Message"
        title="A message to our alumni."
        sub="From the patron of the Amaltas University Alumni Association."
        bgImg="/assets/images%20of%20university/campus%20life/2U8A2387.webp"
      />

      <section className="sec" style={{ background: "var(--paper)" }}>
        <div className="wrap" style={{ maxWidth: 860 }}>
          <Reveal>
            <article style={{
              background: "#fff", borderRadius: 22, padding: "clamp(26px, 5vw, 52px)",
              border: "1px solid rgba(11,44,24,.08)", boxShadow: "0 24px 60px -30px rgba(11,44,24,.18)",
              position: "relative", overflow: "hidden",
            }}>
              <Quote size={120} aria-hidden="true" style={{ position: "absolute", right: -10, top: -14, color: C.gold, opacity: 0.12 }} />

              <header style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", marginBottom: 32 }}>
                <img
                  src={MESSAGE.photo} alt={MESSAGE.author} loading="lazy" decoding="async"
                  style={{ width: 96, height: 96, borderRadius: "50%", objectFit: "cover", objectPosition: "top center", border: `3px solid ${C.gold}`, boxShadow: "0 0 0 6px rgba(246,224,5,.14)", flexShrink: 0 }}
                />
                <div>
                  <span className="eyebrow">Message from the Patron</span>
                  <h2 style={{ fontSize: "clamp(1.4rem,3vw,1.9rem)", marginTop: 8 }}>{MESSAGE.author}</h2>
                  <div style={{ color: C.slate, fontSize: 14, marginTop: 4 }}>{MESSAGE.role}</div>
                </div>
              </header>

              <div style={{ color: C.ink, fontSize: 16.5, lineHeight: 1.85 }}>
                <p style={{ fontWeight: 600, margin: "0 0 18px" }}>{MESSAGE.salutation}</p>
                {MESSAGE.paragraphs.map((p, i) => (
                  <p key={i} style={{ margin: "0 0 18px" }}>{p}</p>
                ))}
                <p style={{ margin: "28px 0 4px" }}>{MESSAGE.closing}</p>
                <p style={{ fontFamily: "Fraunces,serif", fontSize: 20, margin: 0 }}>{MESSAGE.author}</p>
                <p style={{ color: C.slate, fontSize: 14, margin: "2px 0 0" }}>{MESSAGE.role}</p>
              </div>
            </article>
          </Reveal>

          <Reveal delay="d1">
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginTop: 40 }}>
              <Link to="/alumni/registration" className="btn btn-gold">Register as alumni <ArrowRight size={18} /></Link>
              <Link to="/alumni/update-profile" className="btn btn-dark">Update your profile <ArrowRight size={18} /></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
