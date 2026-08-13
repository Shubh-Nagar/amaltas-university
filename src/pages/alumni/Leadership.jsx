import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Crown, Briefcase, FileText, Users, Award, Star, Sparkles, Heart } from "lucide-react";
import { PageHero } from "../../components/Layout.jsx";
import { Reveal } from "../../components/Primitives.jsx";
import { C } from "../../theme.js";
import SEO from "../../components/SEO.jsx";
import { breadcrumbSchema } from "../../data/schema.js";

const VC_INFO = {
  role: "Vice Chancellor",
  name: "Dr. R.K. Singh",
  bio: "Academic visionary and guiding patron of the Alumni Association — committed to building lifelong bonds between Amaltas University and its graduates across all six institutions.",
  photo: "/assets/images%20of%20university/leadership/vc-sir.jpeg",
};

const EXEC_COUNCIL = [
  { role: "President",                 badge: "Executive",     icon: Crown,     desc: "Leads the Alumni Association, presides over all meetings, and represents alumni at the highest institutional level." },
  { role: "Vice President",            badge: "Executive",     icon: Briefcase, desc: "Supports the President, steps in during absence, and champions key alumni initiatives and outreach programmes." },
  { role: "Secretary",                 badge: "Executive",     icon: FileText,  desc: "Maintains all records, minutes of meetings, and manages the Association's official communications and correspondence." },
  { role: "Joint Secretary",           badge: "Executive",     icon: Users,     desc: "Assists the Secretary in administrative coordination and ensures smooth day-to-day operations of the Association." },
  { role: "Treasurer",                 badge: "Executive",     icon: Award,     desc: "Manages financial records, oversees fund allocation, and maintains fiscal accountability of the Association." },
  { role: "In-Charge",                badge: "Office Bearer", icon: Star,      desc: "Designated Office Bearer responsible for assigned portfolios and special projects of the Association." },
  { role: "Advisor",                  badge: "Office Bearer", icon: Sparkles,  desc: "Provides strategic counsel and guidance to the Executive Committee on matters of policy and direction." },
  { role: "Mentor (from Promoters)",  badge: "Office Bearer", icon: Heart,     desc: "Drawn from the founding promoters; provides institutional memory, long-term vision, and mentorship to the Council." },
];

export default function AlumniLeadership() {
  return (
    <>
      <SEO
        title="Alumni Association Leadership"
        description="Meet the governing council of the Amaltas University Alumni Association — Vice Chancellor patron, Executive Council and Office Bearers guiding alumni engagement."
        path="/alumni/leadership"
        jsonLd={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Alumni", path: "/alumni" }, { name: "Leadership", path: "/alumni/leadership" }])}
      />
      <PageHero
        crumb="Alumni / Leadership"
        eyebrow="Alumni Association Leadership"
        title="The people guiding the alumni family."
        sub="From the Vice Chancellor patron to the elected Executive Council — meet the leadership that connects Amaltas graduates worldwide."
        bgImg="/assets/images%20of%20university/leadership/vc-sir.jpeg"
      />

      {/* ── VICE CHANCELLOR ── */}
      <section className="sec" style={{ background: "linear-gradient(135deg,#eef6f1 0%,var(--ivory) 60%,#fdfce8 100%)" }}>
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Patron</span>
            <h2 style={{ marginTop: 14 }}>Vice Chancellor's message to alumni.</h2>
            <p className="lead" style={{ marginTop: 18 }}>
              The Vice Chancellor of Amaltas University serves as the honorary patron of the Alumni Association, ensuring the network stays rooted in the university's academic mission.
            </p>
          </Reveal>

          <Reveal delay="d1">
            <div className="alumni-vc-card" style={{ marginTop: 50 }}>
              <div style={{
                width: 110, height: 110, borderRadius: "50%", overflow: "hidden", flexShrink: 0,
                border: `3px solid ${C.gold}`, boxShadow: `0 0 0 7px rgba(246,224,5,.14)`,
              }}>
                <img src={VC_INFO.photo} alt={VC_INFO.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} />
              </div>
              <div>
                <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: C.goldL, marginBottom: 8 }}>
                  {VC_INFO.role} · Alumni Association Patron
                </div>
                <h3 style={{ fontFamily: "Fraunces,serif", fontSize: "clamp(1.3rem,2.5vw,1.9rem)", color: "#fff", marginBottom: 12 }}>
                  {VC_INFO.name}
                </h3>
                <p style={{ color: "rgba(247,244,236,.74)", fontSize: 15, lineHeight: 1.7, maxWidth: 580 }}>
                  {VC_INFO.bio}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── EXECUTIVE COUNCIL ── */}
      <section className="sec" style={{ background: "var(--paper)" }}>
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Executive Council</span>
            <h2 style={{ marginTop: 14 }}>The governing body.</h2>
            <p className="lead" style={{ marginTop: 18 }}>
              The Executive Council is the elected governing body of the Amaltas University Alumni Association, responsible for strategy, operations, and representing the interests of all graduates.
            </p>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(256px,1fr))", gap: 18, marginTop: 50 }}>
            {EXEC_COUNCIL.map((m, i) => {
              const Icon = m.icon;
              const isOfficer = m.badge === "Office Bearer";
              return (
                <Reveal key={i} delay={`d${(i % 4) + 1}`}>
                  <div className="alumni-council-card card-lift" style={{
                    borderColor: isOfficer ? "rgba(135,40,34,.16)" : "rgba(11,44,24,.08)",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 14 }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                        background: isOfficer
                          ? `linear-gradient(135deg,${C.burg},${C.burgL})`
                          : `linear-gradient(135deg,${C.emerald},${C.emeraldL})`,
                        display: "grid", placeItems: "center", color: "#fff",
                      }}>
                        <Icon size={20} />
                      </div>
                      <span style={{
                        fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase",
                        padding: "4px 10px", borderRadius: 100, whiteSpace: "nowrap",
                        background: isOfficer ? "rgba(135,40,34,.1)" : "rgba(18,134,63,.1)",
                        color: isOfficer ? C.burg : C.emerald,
                      }}>
                        {m.badge}
                      </span>
                    </div>
                    <div style={{ fontFamily: "Fraunces,serif", fontSize: 16.5, color: C.ink, marginBottom: 7 }}>{m.role}</div>
                    <p style={{ color: C.slate, fontSize: 13, lineHeight: 1.68 }}>{m.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <div style={{
              marginTop: 32, padding: "16px 22px", borderRadius: 13,
              background: "rgba(135,40,34,.06)", border: "1px solid rgba(135,40,34,.13)",
              display: "flex", gap: 12, alignItems: "flex-start",
            }}>
              <Star size={15} color={C.burg} style={{ marginTop: 2, flexShrink: 0 }} />
              <p style={{ color: C.slate, fontSize: 13.5, lineHeight: 1.6, margin: 0 }}>
                <strong style={{ color: C.ink }}>Note:</strong> In-Charge, Advisor, and Mentor are designated as{" "}
                <strong>Office Bearers</strong> of the Amaltas University Alumni Association.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: `linear-gradient(135deg,${C.navy2},${C.navy})`, padding: "80px 0" }}>
        <div className="wrap" style={{ textAlign: "center" }}>
          <Reveal>
            <span className="eyebrow" style={{ color: C.goldL }}>Get Involved</span>
            <h2 style={{ marginTop: 14, color: C.ivory, maxWidth: 560, margin: "14px auto 0" }}>
              Connect with your fellow alumni today.
            </h2>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginTop: 30 }}>
              <Link to="/alumni/engage" className="btn btn-gold">Engage Now <ArrowRight size={18} /></Link>
              <Link to="/alumni" className="btn btn-ghost">Alumni Home <ArrowRight size={18} /></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
