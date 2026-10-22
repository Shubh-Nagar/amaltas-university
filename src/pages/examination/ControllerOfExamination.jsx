import React from "react";
import { BadgeCheck, Mail, Phone } from "lucide-react";
import { PageHero } from "../../components/Layout.jsx";
import { Reveal } from "../../components/Primitives.jsx";
import { C } from "../../theme.js";
import SEO from "../../components/SEO.jsx";
import { breadcrumbSchema } from "../../data/schema.js";
import { CONTROLLER_OF_EXAMINATION } from "../../data/content.js";

const { nm: name, role: post, phone, email, photo } = CONTROLLER_OF_EXAMINATION;
const COE = { name, post, phone, email, photo };

const DETAILS = [
  { icon: BadgeCheck, label: "Post", value: COE.post },
  { icon: Phone, label: "Phone", value: `+91 ${COE.phone}`, href: `tel:+91${COE.phone}` },
  { icon: Mail, label: "Email", value: COE.email, href: `mailto:${COE.email}` },
];

export default function ControllerOfExamination() {
  return (
    <>
      <SEO
        title="Controller of Examination"
        description={`${COE.name}, Controller of Examination, Amaltas University, Dewas. Contact the examination office by phone or email.`}
        path="/examination/controller"
        keywords="Amaltas University Controller of Examination, Amaltas University examination, Amaltas University exam contact"
        jsonLd={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Examination", path: "/examination/controller" }, { name: "Controller of Examination", path: "/examination/controller" }])}
      />
      <PageHero
        crumb="Examination / Controller of Examination"
        eyebrow="Examination"
        title="Controller of Examination"
        sub="The Office of the Controller of Examination conducts the University's examinations and handles all examination-related queries."
        bgImg="/assets/images%20of%20university/all%20institutes/university.webp"
      />

      <section className="sec wrap" style={{ paddingTop: 90 }}>
        <Reveal>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 40, alignItems: "center", background: "#fff", borderRadius: 24, padding: "clamp(20px, 4vw, 40px)", border: "1px solid rgba(11,44,24,.07)", maxWidth: 940 }}>
            <img
              src={COE.photo}
              alt={`${COE.name}, ${COE.post}`}
              width={700}
              height={1050}
              style={{ width: "min(100%, 280px)", height: "auto", borderRadius: 18, objectFit: "cover", boxShadow: "0 24px 50px -24px rgba(11,44,24,.45)" }}
            />
            <div style={{ flex: "1 1 320px" }}>
              <span className="eyebrow">{COE.post}</span>
              <h2 style={{ marginTop: 14 }}>{COE.name}</h2>
              <ul style={{ listStyle: "none", padding: 0, margin: "28px 0 0", display: "grid", gap: 14 }}>
                {DETAILS.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: `linear-gradient(135deg,${C.emerald},${C.emeraldL})`, display: "grid", placeItems: "center", color: "#fff", flexShrink: 0 }}>
                      <Icon size={18} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: C.slate }}>{label}</div>
                      {href ? (
                        <a href={href} style={{ color: C.navy, fontWeight: 600, fontSize: 16, wordBreak: "break-all" }}>{value}</a>
                      ) : (
                        <div style={{ color: C.navy, fontWeight: 600, fontSize: 16 }}>{value}</div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
