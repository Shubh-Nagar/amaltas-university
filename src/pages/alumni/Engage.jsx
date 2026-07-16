import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Handshake, Share2, UserPlus, Trophy } from "lucide-react";
import { PageHero } from "../../components/Layout.jsx";
import { Reveal } from "../../components/Primitives.jsx";
import AlumniForm from "../../components/AlumniForm.jsx";
import { C } from "../../theme.js";

const TABS = [
  {
    id: "mentor",
    label: "Be a Mentor",
    icon: Handshake,
    headline: "Guide the next generation of healers.",
    desc: "Give back by sharing your professional journey, clinical wisdom, and lived experience with current Amaltas students navigating their own path in healthcare.",
    fields: [
      { name: "name",         label: "Full Name",                type: "text",     placeholder: "Dr. / Mr. / Ms. Your Name" },
      { name: "alumni_id",    label: "Alumni ID / Batch Year",   type: "text",     placeholder: "e.g. AIMS-2018" },
      { name: "email",        label: "Email Address",            type: "email",    placeholder: "you@example.com" },
      { name: "phone",        label: "Phone Number",             type: "tel",      placeholder: "+91 XXXXX XXXXX" },
      { name: "department",   label: "Department / Institute",   type: "select",   options: ["Select Institute", "Institute of Medical Sciences", "Ayurvedic College & Research Centre", "Institute of Homoeopathy", "Institute of Nursing Sciences", "Institute of Pharmacy", "Institute of Paramedical Sciences", "Allied & Rehabilitation Sciences"] },
      { name: "expertise",    label: "Area of Expertise",        type: "text",     placeholder: "e.g. Cardiology, Research, Hospital Administration" },
      { name: "availability", label: "Availability",             type: "select",   options: ["Select Availability", "Weekdays – Morning", "Weekdays – Evening", "Weekends", "Flexible / Online only"] },
      { name: "message",      label: "Motivation & Introduction", type: "textarea", placeholder: "Tell us about your career journey and what you'd like to offer as a mentor...", optional: true },
    ],
  },
  {
    id: "opportunity",
    label: "Share Opportunities",
    icon: Share2,
    headline: "Help fellow alumni find their next step.",
    desc: "Know of a job, internship, fellowship, or research position? Share it here and we'll broadcast it across the Amaltas alumni network.",
    fields: [
      { name: "name",     label: "Your Name",                type: "text",   placeholder: "Full Name" },
      { name: "email",    label: "Your Email",               type: "email",  placeholder: "you@example.com" },
      { name: "org",      label: "Organisation / Employer",  type: "text",   placeholder: "Name of organisation offering the role" },
      { name: "opp_type", label: "Opportunity Type",         type: "select", options: ["Select Type", "Full-time Job", "Part-time / Locum", "Internship", "Fellowship", "Research Position", "Teaching Post", "Other"] },
      { name: "title",    label: "Role / Position Title",    type: "text",   placeholder: "e.g. Junior Resident – General Medicine" },
      { name: "location", label: "Location",                 type: "text",   placeholder: "City, State or Remote" },
      { name: "deadline", label: "Application Deadline",     type: "date",   optional: true },
      { name: "details",  label: "Details & How to Apply",   type: "textarea", placeholder: "Include application link, contact info, or the full role description...", optional: true },
    ],
  },
  {
    id: "achievement",
    label: "Share Achievement",
    icon: Trophy,
    headline: "Inspire others by celebrating your wins.",
    desc: "Published a paper? Won an award? Started a clinic? Let Amaltas celebrate you — and motivate hundreds of students who follow your path.",
    fields: [
      { name: "name",             label: "Full Name",                 type: "text",   placeholder: "Your Full Name" },
      { name: "batch",            label: "Batch Year & Programme",    type: "text",   placeholder: "e.g. MBBS 2020, Batch of 2024" },
      { name: "email",            label: "Email Address",             type: "email",  placeholder: "you@example.com" },
      { name: "achievement_type", label: "Achievement Category",      type: "select", options: ["Select Category", "Research / Publication", "Award / Recognition", "Career Milestone", "Community Service", "Sports / Arts", "Entrepreneurship", "Other"] },
      { name: "achievement",      label: "Describe Your Achievement", type: "textarea", placeholder: "Tell us what you achieved, when it happened, and why it matters to you..." },
      { name: "media",            label: "News / Article Link",       type: "url",    placeholder: "https://...", optional: true },
    ],
  },
  {
    id: "invite",
    label: "Invite Friends",
    icon: UserPlus,
    headline: "Grow the Amaltas alumni family.",
    desc: "Know a fellow Amaltas graduate who hasn't yet joined the Association? Send them an invitation and help strengthen our community.",
    fields: [
      { name: "your_name",    label: "Your Name",                   type: "text",  placeholder: "Your Full Name" },
      { name: "your_email",   label: "Your Email",                  type: "email", placeholder: "your@email.com" },
      { name: "friend_name",  label: "Friend's Full Name",          type: "text",  placeholder: "Friend's Full Name" },
      { name: "friend_email", label: "Friend's Email Address",      type: "email", placeholder: "friend@email.com" },
      { name: "friend_batch", label: "Friend's Batch & Programme",  type: "text",  placeholder: "e.g. B.Sc. Nursing 2019" },
      { name: "note",         label: "Personal Note (optional)",    type: "textarea", placeholder: "Add a personal message to accompany the invitation...", optional: true },
    ],
  },
];

export default function AlumniEngage() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <>
      <PageHero
        crumb="Alumni / Engage"
        eyebrow="Engage"
        title="Stay connected. Give back."
        sub="Whether you want to mentor, share opportunities, celebrate milestones, or grow the Amaltas network — connect through these channels."
        bgImg="/assets/images%20of%20university/campus%20life/2U8A2387.JPG"
      />

      {/* ── TAB BAR ── */}
      <section className="sec" style={{ background: "var(--paper)" }}>
        <div className="wrap">
          {/* Tabs */}
          <Reveal>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 40 }}>
              {TABS.map((t, i) => {
                const Icon = t.icon;
                const isActive = i === active;
                return (
                  <button key={t.id} onClick={() => setActive(i)}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 8,
                      padding: "11px 22px", borderRadius: 100,
                      border: `2px solid ${isActive ? C.emerald : "rgba(11,44,24,.14)"}`,
                      background: isActive ? C.emerald : "#fff",
                      color: isActive ? "#fff" : C.slate,
                      fontFamily: "inherit", fontSize: 14, fontWeight: 600,
                      cursor: "pointer", transition: "all .25s",
                    }}>
                    <Icon size={16} />
                    {t.label}
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Two-column: info + form */}
          <div className="alumni-engage-layout">
            {/* Left info panel */}
            <Reveal variant="left">
              <div style={{
                background: `linear-gradient(145deg,${C.navy},${C.navy2})`,
                borderRadius: 22, padding: "38px 32px", color: "#fff", height: "100%",
              }}>
                {(() => {
                  const Icon = tab.icon;
                  return (
                    <>
                      <div style={{
                        width: 54, height: 54, borderRadius: 15,
                        background: "rgba(246,224,5,.14)", border: "1px solid rgba(246,224,5,.22)",
                        display: "grid", placeItems: "center", color: C.goldL, marginBottom: 22,
                      }}>
                        <Icon size={24} />
                      </div>
                      <h3 style={{ fontFamily: "Fraunces,serif", fontSize: 20, color: "#fff", marginBottom: 12, lineHeight: 1.25 }}>
                        {tab.headline}
                      </h3>
                      <p style={{ color: "rgba(247,244,236,.7)", fontSize: 14.5, lineHeight: 1.72 }}>{tab.desc}</p>
                      <div style={{ marginTop: 30, paddingTop: 22, borderTop: "1px solid rgba(255,255,255,.1)" }}>
                        <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: C.goldL, marginBottom: 10 }}>
                          Alumni Coordinator
                        </div>
                        <p style={{ color: "rgba(247,244,236,.62)", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                          Each Amaltas institution has a dedicated Alumni Coordinator who processes all engagement requests and ensures a personalised experience for every graduate.
                        </p>
                      </div>
                      <div style={{ marginTop: 22, paddingTop: 22, borderTop: "1px solid rgba(255,255,255,.08)" }}>
                        <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: C.goldL, marginBottom: 10 }}>
                          Contact
                        </div>
                        <p style={{ color: "rgba(247,244,236,.62)", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                          alumni@amaltasuniversity.in<br />
                          +91 9404956221
                        </p>
                      </div>
                    </>
                  );
                })()}
              </div>
            </Reveal>

            {/* Right form panel */}
            <Reveal variant="right">
              <div style={{
                background: "#fff", borderRadius: 22, padding: "40px",
                border: "1px solid rgba(11,44,24,.08)",
                boxShadow: "0 24px 60px -30px rgba(11,44,24,.18)",
              }}>
                <div style={{ marginBottom: 28 }}>
                  <h3 style={{ fontFamily: "Fraunces,serif", fontSize: 20, color: C.ink }}>{tab.label}</h3>
                  <p style={{ color: C.slate, fontSize: 14, marginTop: 6, lineHeight: 1.6 }}>All fields marked <span style={{ color: "#c44" }}>*</span> are required.</p>
                </div>
                <AlumniForm
                  key={active}
                  fields={tab.fields}
                  submitLabel={`Submit — ${tab.label}`}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: `linear-gradient(135deg,${C.navy2},${C.navy})`, padding: "80px 0" }}>
        <div className="wrap" style={{ textAlign: "center" }}>
          <Reveal>
            <span className="eyebrow" style={{ color: C.goldL }}>More ways to connect</span>
            <h2 style={{ marginTop: 14, color: C.ivory, maxWidth: 540, margin: "14px auto 0" }}>
              Need help from the Association?
            </h2>
            <p style={{ color: "rgba(247,244,236,.68)", fontSize: 17, maxWidth: 440, margin: "16px auto 30px" }}>
              Visit Alumni Assist for transcripts, campus visits, and accommodation requests.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/alumni/assist" className="btn btn-gold">Alumni Assist <ArrowRight size={18} /></Link>
              <Link to="/alumni" className="btn btn-ghost">Alumni Home <ArrowRight size={18} /></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
