import React from "react";
import { Link } from "react-router-dom";
import { Globe, ClipboardList, Banknote, PenTool, Trophy, ShieldCheck, GraduationCap, Phone, ArrowRight } from "lucide-react";
import { PageHero } from "../components/Layout.jsx";
import { Reveal } from "../components/Primitives.jsx";
import { C } from "../theme.js";
import { CONTACT } from "../data/content.js";

const STEPS = [
  {
    n: "01",
    icon: Globe,
    title: "Visit Our Website",
    desc: "Go to amaltasuniversity.in and explore the programmes offered. Browse course details, eligibility criteria, and fee structure to find the right fit for you.",
    note: "amaltasuniversity.in",
    color: C.emerald,
  },
  {
    n: "02",
    icon: ClipboardList,
    title: "Complete the Registration Form",
    desc: "Fill in the online registration form with your personal details, academic records, and preferred programme. Ensure all information is accurate before submitting.",
    note: "Online form · 10–15 minutes",
    color: "#1a5c8a",
  },
  {
    n: "03",
    icon: Banknote,
    title: "Pay the Fees Offline",
    desc: "Visit the Admissions Office on campus to pay the registration fee in person. Fee payment can be made via DD, cash, or bank transfer at the counter.",
    note: "Campus · Admissions Office",
    color: C.burg,
  },
  {
    n: "04",
    icon: PenTool,
    title: "Entrance Exam",
    desc: "Appear for the university entrance exam (or qualifying test as applicable to your programme) on the scheduled date. Admit cards are issued after fee payment and registration are confirmed.",
    note: "As per exam schedule",
    color: "#b8562e",
  },
  {
    n: "05",
    icon: Trophy,
    title: "Merit Declaration",
    desc: "Merit lists are published based on qualifying examination scores (NEET / academic performance). Check your rank and allotted programme on the notice board or university website.",
    note: "Published on university website",
    color: "#7a5c1a",
  },
  {
    n: "06",
    icon: ShieldCheck,
    title: "Document Verification",
    desc: "Bring all original documents to the Admissions Office for verification — mark sheets, ID proof, category certificate (if applicable), and passport-size photographs.",
    note: "Originals + self-attested copies",
    color: "#5a3e8a",
  },
  {
    n: "07",
    icon: GraduationCap,
    title: "Allotment of Seat",
    desc: "Upon successful document verification, your seat is confirmed and allotted. Welcome to Amaltas University — your journey in healthcare begins here.",
    note: "Seat confirmation letter issued",
    color: "#2d7a4f",
  },
];

const DOCS = [
  "10th & 12th mark sheets (originals + 2 copies)",
  "NEET scorecard (for medical programmes)",
  "Transfer / Migration Certificate",
  "Character Certificate from last institution",
  "Category certificate — SC / ST / OBC (if applicable)",
  "Aadhar Card or government-issued photo ID",
  "4 recent passport-size photographs",
  "Medical fitness certificate",
];

export default function AdmissionProcedure() {
  return (
    <>
      <PageHero
        crumb="Admissions / Procedure"
        eyebrow="Admission Procedure 2026–27"
        title="Seven steps to your seat."
        sub="A clear, straightforward process designed to get you from enquiry to enrolment with confidence. Applications for 2026–27 are now open."
        bgImg="/assets/images%20of%20university/photo-gallery/DJI_0034.jpg"
      />

      {/* STEP FLOW */}
      <section className="sec" style={{ paddingTop: 80 }}>
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">How it works</span>
            <h2 style={{ marginTop: 8 }}>Follow the process.</h2>
          </Reveal>
        </div>

        <div className="step-flow-grid" style={{ marginTop: 60, padding: "0 40px" }}>
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.n} delay={`d${(i % 6) + 1}`}>
                <div
                  className="step-flow-card card-lift"
                  style={{ "--step-color": s.color }}
                >
                  <div
                    className="step-flow-icon"
                    style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}cc)` }}
                  >
                    <Icon size={22} color="#fff" />
                  </div>
                  <div className="step-flow-tag">STEP {s.n}</div>
                  <h3 className="step-flow-title">{s.title}</h3>
                  <p className="step-flow-desc">{s.desc}</p>
                  <div className="step-flow-note">
                    <ArrowRight size={11} /> {s.note}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* DOCUMENTS REQUIRED */}
      <section className="sec" style={{ background: C.ivory }}>
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">What to bring</span>
            <h2 style={{ marginTop: 8 }}>Documents required.</h2>
            <p className="lead" style={{ marginTop: 12, maxWidth: 560 }}>
              Keep originals and self-attested photocopies ready before visiting the Admissions Office for document verification.
            </p>
          </Reveal>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 14,
            marginTop: 44,
          }}>
            {DOCS.map((doc, i) => (
              <Reveal key={i} delay={`d${(i % 4) + 1}`}>
                <div style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  background: "#fff",
                  borderRadius: 14,
                  padding: "18px 20px",
                  border: "1px solid rgba(11,44,24,.07)",
                  boxShadow: "0 2px 12px -4px rgba(11,44,24,.08)",
                }}>
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: `${C.emerald}14`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontFamily: "Fraunces,serif",
                    fontWeight: 700,
                    fontSize: 13,
                    color: C.emerald,
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p style={{ fontSize: 14, color: C.slate, lineHeight: 1.5 }}>{doc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sec wrap">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 28,
        }}>
          <Reveal>
            <div style={{
              background: `linear-gradient(135deg,${C.navy},${C.ink})`,
              borderRadius: 24,
              padding: "40px 36px",
              color: C.ivory,
              height: "100%",
            }}>
              <span className="eyebrow" style={{ color: C.goldL }}>Need help?</span>
              <h3 style={{ color: C.ivory, marginTop: 14, fontSize: 24 }}>We're here at every step.</h3>
              <p style={{ color: "rgba(247,244,236,.7)", marginTop: 12, fontSize: 14.5, lineHeight: 1.65 }}>
                Our admissions counsellors are available on campus and over the phone to guide you through each stage — from registration to seat confirmation.
              </p>
              <a href={`tel:${CONTACT.tollFree.replace(/-/g, "")}`} className="btn btn-gold" style={{ marginTop: 28 }}>
                <Phone size={16} /> Call — {CONTACT.tollFree}
              </a>
            </div>
          </Reveal>

          <Reveal delay="d2">
            <div style={{
              background: "#fff",
              borderRadius: 24,
              padding: "40px 36px",
              border: "1px solid rgba(11,44,24,.08)",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}>
              <div>
                <span className="eyebrow">Quick links</span>
                <h3 style={{ marginTop: 14, fontSize: 24 }}>Also useful for you.</h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 28 }}>
                {[
                  { label: "Check your eligibility",   to: "/admissions/eligibility" },
                  { label: "View fee structure",        to: "/admissions/fees" },
                  { label: "Courses & programmes",      to: "/admissions" },
                ].map(({ label, to }) => (
                  <Link key={to} to={to} style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 18px",
                    background: "rgba(18,134,63,.05)",
                    borderRadius: 12,
                    border: "1px solid rgba(18,134,63,.12)",
                    color: C.navy,
                    textDecoration: "none",
                    fontWeight: 600,
                    fontSize: 14,
                    transition: "all .2s",
                  }}>
                    {label}
                    <ArrowRight size={16} color={C.emerald} />
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
