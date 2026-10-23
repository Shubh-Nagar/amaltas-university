import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, BedDouble, ClipboardList, Dumbbell, GraduationCap, HeartPulse,
  Info, Library, ShieldCheck, Stethoscope,
} from "lucide-react";
import { PageHero } from "../../components/Layout.jsx";
import { Reveal } from "../../components/Primitives.jsx";
import { C } from "../../theme.js";
import SEO from "../../components/SEO.jsx";
import { breadcrumbSchema } from "../../data/schema.js";

/* Source: the institute's "Facilities for International Students" notice.
   Wording is kept as in that document. */
const FACILITIES = [
  { icon: GraduationCap, title: "Academic Facilities", text: "Classrooms, lecture halls, departmental laboratories, and other learning resources to support medical education." },
  { icon: Library, title: "Library and Study Resources", text: "Library facilities, medical reference materials, and study spaces to support academic learning." },
  { icon: BedDouble, title: "Hostel Accommodation", text: "Separate hostel facilities for boys and girls, with furnished rooms, mess facilities, and recreational amenities, subject to availability and institutional rules." },
  { icon: Stethoscope, title: "Clinical Training", text: "Hospital-based learning opportunities in accordance with the prescribed curriculum and applicable regulations." },
  { icon: HeartPulse, title: "Healthcare Access", text: "Access to the associated teaching hospital for medical assistance, subject to applicable procedures." },
  { icon: Dumbbell, title: "Sports and Recreation", text: "Opportunities for sports, fitness, and extracurricular activities, subject to facility availability." },
  { icon: ShieldCheck, title: "Student Welfare and Safety", text: "Institutional policies and anti-ragging measures to promote a safe, respectful, and supportive campus environment." },
  { icon: ClipboardList, title: "Administrative Guidance", text: "Information regarding admission procedures, required documentation, accommodation, and applicable visa and immigration formalities." },
];

export default function InternationalStudents() {
  return (
    <>
      <SEO
        title="Facilities for International Students"
        description="Facilities for international students at Amaltas Institute of Medical Sciences, Dewas, Madhya Pradesh: academic, library, hostel, clinical training, healthcare access, sports, welfare and administrative guidance."
        path="/facilities/international-students"
        keywords="international students Amaltas, MBBS in India for foreign students, Amaltas Institute of Medical Sciences international admission, foreign student hostel Dewas"
        jsonLd={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Facilities", path: "/facilities/academic" },
          { name: "Facilities for International Students", path: "/facilities/international-students" },
        ])}
      />
      <PageHero
        crumb="Facilities / Facilities for International Students"
        eyebrow="International Students"
        title="Facilities for International Students."
        sub="Amaltas Institute of Medical Sciences, Dewas, Madhya Pradesh, India"
        bgImg="/assets/images%20of%20university/all%20institutes/medical.webp"
      />

      {/* INTRO */}
      <section className="sec wrap" style={{ paddingTop: 90 }}>
        <Reveal>
          <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
            <span className="eyebrow">Welcome</span>
            <h2 style={{ marginTop: 14 }}>Medical education in India, with the support you need.</h2>
            <p className="lead" style={{ marginTop: 20 }}>
              Amaltas Institute of Medical Sciences welcomes international students aspiring to pursue medical education in India. The institution provides an academic environment supported by educational infrastructure, clinical learning opportunities, residential facilities, and student welfare arrangements.
            </p>
          </div>
        </Reveal>
      </section>

      {/* FACILITIES */}
      <section className="sec wrap" style={{ paddingTop: 10 }}>
        <Reveal>
          <span className="eyebrow">Facilities Available</span>
          <h2 style={{ marginTop: 14 }}>What international students can expect.</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,300px),1fr))", gap: 20, marginTop: 40 }}>
          {FACILITIES.map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal key={f.title} delay={`d${(i % 4) + 1}`}>
                <div className="card-lift" style={{ background: "#fff", borderRadius: 20, padding: "26px 24px", border: "1px solid rgba(11,44,24,.08)", height: "100%", boxShadow: "0 4px 24px -8px rgba(11,44,24,.08)" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: `linear-gradient(135deg,${C.emerald},${C.emeraldL})`, display: "grid", placeItems: "center", color: "#fff", marginBottom: 18 }}>
                    <Icon size={22} />
                  </div>
                  <h3 style={{ fontFamily: "Fraunces,serif", fontSize: 19, color: C.ink, margin: 0 }}>{f.title}</h3>
                  <p style={{ color: C.slate, fontSize: 14.5, lineHeight: 1.7, margin: "10px 0 0" }}>{f.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* GUIDANCE */}
      <section style={{ background: `linear-gradient(135deg,${C.navy2},${C.navy})`, padding: "90px 0", marginTop: 40 }}>
        <div className="wrap">
          <Reveal>
            <div style={{ maxWidth: 860, margin: "0 auto" }}>
              <span className="eyebrow" style={{ color: C.goldL }}>Guidance</span>
              <h2 style={{ color: C.ivory, marginTop: 14 }}>Guidance for International Students.</h2>
              <p style={{ color: "rgba(247,244,236,.85)", fontSize: 16.5, lineHeight: 1.85, marginTop: 22 }}>
                International applicants are advised to contact the college administration before arrival to confirm admission eligibility, fee structure, hostel availability, dietary requirements, medical insurance, transportation, and applicable visa and foreign-student registration requirements.
              </p>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginTop: 26, padding: "18px 22px", borderRadius: 16, background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.14)" }}>
                <Info size={20} color={C.goldL} style={{ flexShrink: 0, marginTop: 3 }} aria-hidden="true" />
                <p style={{ color: "rgba(247,244,236,.85)", fontSize: 15, lineHeight: 1.75, margin: 0 }}>
                  All admissions and related formalities are subject to the prevailing regulations of the Government of India, the National Medical Commission, and other relevant authorities, as applicable.
                </p>
              </div>
              <div style={{ marginTop: 32 }}>
                <Link to="/contact" className="btn btn-gold">Contact the college administration <ArrowRight size={18} /></Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
