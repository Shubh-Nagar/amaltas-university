import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, Home as HomeIcon, FileText, ChevronRight } from "lucide-react";
import { PageHero } from "../../components/Layout.jsx";
import { Reveal } from "../../components/Primitives.jsx";
import AlumniForm from "../../components/AlumniForm.jsx";
import { C } from "../../theme.js";
import SEO from "../../components/SEO.jsx";
import { breadcrumbSchema } from "../../data/schema.js";

const SERVICES = [
  {
    icon: Building2, color: C.emerald,
    sub: "Back on campus",
    title: "University Visit",
    desc: "Revisit your alma mater for nostalgia, networking, or research collaboration. Register your planned visit and we'll arrange appropriate access and a warm welcome from the Alumni Coordinator.",
    formTitle: "Request a University Visit",
    fields: [
      { name: "name",    label: "Full Name",              type: "text",   placeholder: "Your Full Name" },
      { name: "email",   label: "Email Address",          type: "email",  placeholder: "you@example.com" },
      { name: "date",    label: "Preferred Visit Date",   type: "date" },
      { name: "purpose", label: "Purpose of Visit",       type: "select", options: ["Select Purpose", "Personal / Nostalgia", "Research Collaboration", "Networking", "Event / Reunion", "Other"] },
      { name: "notes",   label: "Additional Notes",       type: "textarea", placeholder: "Any special requests or details...", optional: true },
    ],
  },
  {
    icon: HomeIcon, color: C.burg,
    sub: "Stay on campus",
    title: "Accommodation Request",
    desc: "Need a place to stay while attending campus events, reunions, or collaborative research? Submit a request for guest accommodation subject to availability.",
    formTitle: "Request Accommodation",
    fields: [
      { name: "name",     label: "Full Name",       type: "text",   placeholder: "Your Full Name" },
      { name: "email",    label: "Email Address",   type: "email",  placeholder: "you@example.com" },
      { name: "checkin",  label: "Check-in Date",   type: "date" },
      { name: "checkout", label: "Check-out Date",  type: "date" },
      { name: "purpose",  label: "Reason for Stay", type: "select", options: ["Select Reason", "Conference / Workshop", "Alumni Reunion", "Research / Collaboration", "Examination", "Other"] },
    ],
  },
  {
    icon: FileText, color: "#1565C0",
    sub: "Official documents",
    title: "Request Transcript",
    desc: "Obtain official transcripts, degree certificates, or academic records for career advancement, further studies, licensing boards, or professional registration.",
    formTitle: "Request Official Transcript",
    fields: [
      { name: "name",      label: "Full Name (as on degree)",  type: "text",   placeholder: "Name as it appears on your certificate" },
      { name: "alumni_id", label: "Alumni ID / Roll Number",   type: "text",   placeholder: "e.g. MED2018-001" },
      { name: "email",     label: "Email Address",             type: "email",  placeholder: "you@example.com" },
      { name: "programme", label: "Programme & Batch Year",    type: "text",   placeholder: "e.g. MBBS 2022 batch" },
      { name: "doc_type",  label: "Document Required",         type: "select", options: ["Select Document", "Official Transcript", "Degree Certificate Copy", "Mark Sheets", "Migration Certificate", "Character Certificate", "Other"] },
      { name: "purpose",   label: "Purpose",                   type: "select", options: ["Select Purpose", "Higher Studies", "Job Application", "Professional Registration", "Licensing Board", "Other"] },
      { name: "delivery",  label: "Delivery Mode",             type: "select", options: ["Select Mode", "Email (Soft Copy)", "Speed Post / Courier", "Collect in Person"] },
    ],
  },
];

function ServiceCard({ svc, index }) {
  const [open, setOpen] = useState(false);
  const Icon = svc.icon;

  return (
    <Reveal delay={`d${index + 1}`}>
      <div className="assist-card" style={{
        borderColor: open ? svc.color : "rgba(11,44,24,.08)",
        boxShadow: open ? `0 24px 60px -24px ${svc.color}55` : "0 4px 24px -8px rgba(11,44,24,.1)",
      }}>
        <div style={{ padding: "30px 30px 24px" }}>
          <div style={{ width: 52, height: 52, borderRadius: 15, background: `linear-gradient(135deg,${svc.color},${svc.color}bb)`, display: "grid", placeItems: "center", color: "#fff", marginBottom: 18 }}>
            <Icon size={24} />
          </div>
          <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: svc.color, marginBottom: 6 }}>{svc.sub}</div>
          <h3 style={{ fontFamily: "Fraunces,serif", fontSize: 22, color: C.ink, marginBottom: 12 }}>{svc.title}</h3>
          <p style={{ color: C.slate, fontSize: 14.5, lineHeight: 1.72 }}>{svc.desc}</p>
          <button
            onClick={() => setOpen(o => !o)}
            style={{
              marginTop: 22, display: "inline-flex", alignItems: "center", gap: 8,
              padding: "11px 22px", borderRadius: 100,
              background: open ? "transparent" : svc.color,
              border: `2px solid ${svc.color}`,
              color: open ? svc.color : "#fff",
              fontFamily: "inherit", fontSize: 13.5, fontWeight: 700,
              cursor: "pointer", transition: "all .25s",
            }}>
            {open ? "Close Form" : "Submit Request"}
            <ChevronRight size={15} style={{ transform: open ? "rotate(90deg)" : "none", transition: "transform .3s" }} />
          </button>
        </div>

        {open && (
          <div style={{ borderTop: "1px solid rgba(11,44,24,.07)", padding: "28px 30px 32px" }}>
            <p style={{ fontSize: 13.5, fontWeight: 700, color: C.ink, marginBottom: 22 }}>{svc.formTitle}</p>
            <AlumniForm fields={svc.fields} submitLabel={svc.title} />
          </div>
        )}
      </div>
    </Reveal>
  );
}

export default function AlumniAssist() {
  return (
    <>
      <SEO
        title="Alumni Assist — University Visits, Records & Support"
        description="Request university visits, transcript and record support, and other alumni services from Amaltas University, Dewas."
        path="/alumni/assist"
        jsonLd={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Alumni", path: "/alumni" }, { name: "Assist", path: "/alumni/assist" }])}
      />
      <PageHero
        crumb="Alumni / Alumni Assist"
        eyebrow="Alumni Assist"
        title="We're here to help — long after graduation."
        sub="From revisiting your alma mater to obtaining official academic records — the Amaltas Alumni Association is your partner at every stage of your career."
        bgImg="/assets/images%20of%20university/campus%20life/435A1853.JPG"
      />

      {/* ── SERVICE CARDS ── */}
      <section className="sec wrap">
        <Reveal>
          <span className="eyebrow">Services</span>
          <h2 style={{ marginTop: 14 }}>What we can do for you.</h2>
          <p className="lead" style={{ marginTop: 18 }}>
            Click "Submit Request" on any card below to open the relevant form. Our team will respond within 3–5 working days.
          </p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(310px,1fr))", gap: 26, marginTop: 52 }}>
          {SERVICES.map((svc, i) => (
            <ServiceCard key={i} svc={svc} index={i} />
          ))}
        </div>
      </section>

      {/* ── PROCESS STRIP ── */}
      <section style={{ background: "linear-gradient(135deg,#eef6f1 0%,#fdfce8 100%)", padding: "70px 0" }}>
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">How It Works</span>
            <h2 style={{ marginTop: 14 }}>Simple. Three steps.</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 20, marginTop: 44 }}>
            {[
              { step: "01", title: "Submit Request", desc: "Fill in the relevant form above and click submit." },
              { step: "02", title: "Confirmation",   desc: "You'll receive an email acknowledgement within 24 hours." },
              { step: "03", title: "Fulfillment",    desc: "The Alumni Coordinator connects you and fulfils the request within 3–5 working days." },
            ].map((s, i) => (
              <Reveal key={i} delay={`d${i + 1}`}>
                <div style={{ background: "#fff", borderRadius: 18, padding: "26px 24px", border: "1px solid rgba(18,134,63,.1)", display: "flex", gap: 18, alignItems: "flex-start" }}>
                  <div style={{ fontFamily: "Fraunces,serif", fontSize: 28, color: C.emerald, lineHeight: 1, flexShrink: 0 }}>{s.step}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15.5, color: C.ink, marginBottom: 6 }}>{s.title}</div>
                    <p style={{ color: C.slate, fontSize: 13.5, lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: `linear-gradient(135deg,${C.navy2},${C.navy})`, padding: "80px 0" }}>
        <div className="wrap" style={{ textAlign: "center" }}>
          <Reveal>
            <span className="eyebrow" style={{ color: C.goldL }}>Stay connected</span>
            <h2 style={{ marginTop: 14, color: C.ivory, maxWidth: 540, margin: "14px auto 0" }}>
              Want to give back instead?
            </h2>
            <p style={{ color: "rgba(247,244,236,.68)", fontSize: 17, maxWidth: 440, margin: "16px auto 30px" }}>
              Mentor a student, share an opportunity, or celebrate a career milestone through Engage.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/alumni/engage" className="btn btn-gold">Engage <ArrowRight size={18} /></Link>
              <Link to="/alumni" className="btn btn-ghost">Alumni Home <ArrowRight size={18} /></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
