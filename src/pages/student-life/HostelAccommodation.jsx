import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Wifi, Utensils, Shield, Zap, Camera,
  BedDouble, Phone, ChevronDown, Check, Users, BookOpen,
  Dumbbell, HeartPulse, Shirt, Lock,
} from "lucide-react";
import { PageHero } from "../../components/Layout.jsx";
import { Reveal } from "../../components/Primitives.jsx";
import { C } from "../../theme.js";
import { CONTACT } from "../../data/content.js";

const HOSTEL_STATS = [
  { v: "10+", l: "Hostel Blocks" },
  { v: "24/7", l: "Campus Security" },
  { v: "Zero", l: "Tolerance Anti-Ragging" },
  { v: "100%", l: "Wi-Fi Coverage" },
];

const HOSTEL_TYPES = [
  {
    gender: "Boys' Hostel",
    tag: "Male Students",
    desc: "Purpose-built for male students, the boys' hostels offer a secure, well-maintained environment just steps from every academic institute on campus. Several dedicated blocks ensure a comfortable, community-oriented living experience throughout the academic year.",
    features: [
      "Furnished single & double-occupancy rooms",
      "AC & Non-AC room options available",
      "Attached and common bathrooms",
      "High-speed Wi-Fi throughout",
      "24/7 warden & security personnel",
      "In-house mess with nutritious meals",
      "Reading room & common lounge",
      "Gym & sports facility access",
      "Power backup & CCTV",
      "Laundry service on campus",
    ],
    img: "/assets/images%20of%20university/hostel/boys-hostel.jpeg",
    gradientEnd: "#0B2C18",
  },
  {
    gender: "Girls' Hostel",
    tag: "Female Students",
    desc: "The girls' hostels offer a fully secure, lady-warden-supervised residence across multiple dedicated blocks, with entry protocols and round-the-clock staff support. Designed with comfort and safety as the first priority for female students across all health-sciences programmes.",
    features: [
      "Furnished single & double-occupancy rooms",
      "AC & Non-AC room options available",
      "Attached bathrooms in premium rooms",
      "High-speed Wi-Fi throughout",
      "24/7 lady warden & security",
      "In-house mess with nutritious meals",
      "Common room & indoor recreation",
      "Biometric access control",
      "Power backup & CCTV",
      "Laundry & ironing facility",
    ],
    img: "/assets/images%20of%20university/hostel/girls-hostel.jpeg",
    gradientEnd: "#103A22",
  },
];

const AMENITIES = [
  { icon: Wifi,       label: "High-Speed Wi-Fi",    desc: "Campus-wide fibre broadband — stream, research, and attend virtual sessions without interruption." },
  { icon: Utensils,   label: "Mess & Dining",        desc: "Multi-cuisine mess with nutritious meal plans; separate facilities for boys' and girls' hostels." },
  { icon: Shield,     label: "24/7 Security",        desc: "Round-the-clock guard posts, CCTV surveillance, and biometric entry at all hostel blocks." },
  { icon: BedDouble,  label: "Comfortable Rooms",    desc: "Furnished single and double-occupancy rooms with proper ventilation, study desks, and ample storage." },
  { icon: Zap,        label: "Power Backup",         desc: "Uninterrupted power supply with generator backup — no study session or night shift is interrupted." },
  { icon: Camera,     label: "CCTV Surveillance",    desc: "Strategic camera coverage across corridors, entrances, and common areas for complete campus safety." },
  { icon: HeartPulse, label: "Medical Support",      desc: "A 1500+ bed teaching hospital is right on campus — emergency care is never more than minutes away." },
  { icon: Dumbbell,   label: "Sports & Recreation",  desc: "Access to sports grounds, gymnasium, yoga space, and indoor games for a balanced campus lifestyle." },
  { icon: BookOpen,   label: "Reading Room",         desc: "Quiet, well-lit reading rooms in every hostel block with access to the central digital library." },
  { icon: Users,      label: "Warden Support",       desc: "Dedicated residential wardens provide guidance, welfare support, and maintain hostel discipline." },
  { icon: Shirt,      label: "Laundry Service",      desc: "On-campus laundry and ironing facility keeps students presentable and clinical-placement ready." },
  { icon: Lock,       label: "Biometric Access",     desc: "Electronic biometric entry ensures only authorised students and staff access hostel premises." },
];

const MESS_HIGHLIGHTS = [
  "Breakfast, lunch & dinner served daily, plus evening tea & snacks",
  "Rotating multi-cuisine menu — North Indian, South Indian & Continental",
  "Diet and medical-need meals available on prior request",
  "Hygiene-certified kitchen with regular food-safety audits",
  "Separate mess facilities for boys' and girls' hostels",
  "Purified RO drinking water throughout all dining areas",
];

const SECURITY_FEATURES = [
  {
    icon: Shield,
    t: "Round-the-Clock Guards",
    d: "Security personnel are stationed at all hostel entry points and campus gates 24 hours a day, 7 days a week.",
  },
  {
    icon: Camera,
    t: "CCTV Surveillance",
    d: "IP cameras cover all hostel corridors, common areas, and campus perimeters with continuous recording.",
  },
  {
    icon: Users,
    t: "Residential Wardens",
    d: "Dedicated male and female wardens reside on campus, available at all times for student welfare and support.",
  },
  {
    icon: HeartPulse,
    t: "On-Campus Hospital",
    d: "A 1500+ bed teaching hospital ensures medical emergencies are handled within minutes — no travel needed.",
  },
  {
    icon: Shield,
    t: "Anti-Ragging Cell",
    d: "Strict zero-tolerance anti-ragging policy, committee, and helpline operate throughout the academic year.",
  },
  {
    icon: Zap,
    t: "Emergency Response",
    d: "Emergency protocols, fire safety equipment, and evacuation plans are maintained across all hostel blocks.",
  },
];

const RULES = [
  "Entry and exit timings are strictly observed; late arrivals require prior warden permission.",
  "Visitors are permitted only in designated areas during specified hours.",
  "A zero-tolerance anti-ragging policy is enforced; violations result in immediate disciplinary action.",
  "Electrical appliances (other than permitted items) are not allowed in rooms.",
  "Alcohol, tobacco, and narcotics are strictly prohibited on campus and in all hostel premises.",
  "Students must maintain cleanliness in their rooms and all common areas at all times.",
  "Any damage to hostel property must be reported immediately and will be charged to the occupant.",
  "Hostel fees are payable per semester as per the published fee schedule.",
  "Students must carry their university identity cards at all times on campus.",
  "Hostel allotment is subject to availability and is at the discretion of the Hostel Committee.",
];

const GALLERY = [
  { img: "/assets/images%20of%20university/campus%20life/435A1853.JPG",          cap: "Hostel & Dining" },
  { img: "/assets/images%20of%20university/campus%20life/sport.JPG",              cap: "Sports Grounds" },
  { img: "/assets/images%20of%20university/campus%20life/2U8A2387.JPG",          cap: "Study Spaces" },
  { img: "/assets/images%20of%20university/event%20and%20activites/yoga.jpg",    cap: "Yoga & Wellness" },
  { img: "/assets/images%20of%20university/event%20and%20activites/lamp.jpeg",   cap: "Cultural Life" },
];

function RulesAccordion() {
  const [open, setOpen] = useState(false);
  const shown = open ? RULES : RULES.slice(0, 5);
  return (
    <div>
      {shown.map((r, i) => (
        <Reveal key={i} delay={`d${(i % 4) + 1}`}>
          <div style={{ display: "flex", gap: 14, padding: "16px 0", borderBottom: "1px solid rgba(11,44,24,.08)", alignItems: "flex-start" }}>
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: `linear-gradient(135deg,${C.emerald},${C.emeraldL})`, display: "grid", placeItems: "center", color: "#fff", flexShrink: 0, marginTop: 1, fontSize: 11, fontWeight: 700 }}>
              {i + 1}
            </div>
            <p style={{ color: C.slate, fontSize: 15, lineHeight: 1.7, margin: 0 }}>{r}</p>
          </div>
        </Reveal>
      ))}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{ marginTop: 20, display: "inline-flex", alignItems: "center", gap: 8, background: "none", border: `1px solid rgba(11,44,24,.15)`, borderRadius: 100, padding: "10px 22px", cursor: "pointer", fontSize: 14, fontWeight: 600, color: C.emerald, fontFamily: "inherit", transition: ".25s" }}
        >
          View all {RULES.length} regulations <ChevronDown size={15} />
        </button>
      )}
    </div>
  );
}

export default function HostelAccommodation() {
  return (
    <>
      <PageHero
        crumb="Student Life / Hostel & Accommodation"
        eyebrow="Student Life"
        title="A home away from home."
        sub="Safe, comfortable, and fully-equipped hostels for male and female students — where campus life begins and lifelong friendships are formed."
        bgImg="/assets/images%20of%20university/campus%20life/435A1853.JPG"
      />

      {/* ── STATS BAND ── */}
      <section className="wrap" style={{ marginTop: -50, position: "relative", zIndex: 5 }}>
        <div className="hostel-stats-band">
          {HOSTEL_STATS.map((s, i) => (
            <Reveal key={i} delay={`d${i + 1}`}>
              <div className="hostel-stat-cell" style={{ borderRight: i < 3 ? "1px solid rgba(11,44,24,.08)" : "none" }}>
                <div style={{ fontFamily: "Fraunces,serif", fontSize: "clamp(2rem,4vw,3rem)", lineHeight: 1, background: `linear-gradient(120deg,${C.emerald},${C.burg})`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{s.v}</div>
                <div style={{ color: C.slate, marginTop: 8, fontSize: 14, fontWeight: 500 }}>{s.l}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── OVERVIEW SPLIT ── */}
      <section className="sec wrap" style={{ paddingBottom: 60 }}>
        <div className="hostel-split">
          <Reveal variant="left">
            <span className="eyebrow">Our Hostels</span>
            <h2>Where focus meets comfort.</h2>
            <p className="lead">
              Amaltas University maintains separate, fully-equipped hostels for male and female students on its Dewas campus. Every facility is designed so that students spend less time worrying and more time becoming the healers they came here to be.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 30 }}>
              {["10+ hostel blocks for boys & girls", "AC & Non-AC room options", "Warden-supervised 24 / 7", "Hospital on campus"].map((f) => (
                <div key={f} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13.5, color: C.ink, background: "rgba(18,134,63,.07)", border: "1px solid rgba(18,134,63,.14)", borderRadius: 100, padding: "7px 14px" }}>
                  <Check size={13} color={C.emerald} /> {f}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal variant="right" delay="d2">
            <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", aspectRatio: "4/3" }}>
              <img
                src="/assets/images%20of%20university/hostel/2U8A0028.jpg"
                alt="Campus hostel life"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top right,rgba(11,44,24,.45),transparent)" }} />
              <div style={{ position: "absolute", bottom: 20, left: 20, background: "rgba(255,255,255,.95)", borderRadius: 14, padding: "14px 20px", backdropFilter: "blur(10px)", boxShadow: "0 8px 28px -10px rgba(11,44,24,.22)" }}>
                <div style={{ fontFamily: "Fraunces,serif", fontSize: 24, color: C.emerald, lineHeight: 1 }}>24/7</div>
                <div style={{ fontSize: 12.5, color: C.slate, marginTop: 5, fontWeight: 500 }}>Warden-supervised living</div>
              </div>
              <div style={{ position: "absolute", top: 20, right: 20, background: C.navy, color: C.goldL, borderRadius: 12, padding: "10px 16px", fontSize: 12, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase" }}>
                Dewas Campus
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── HOSTEL TYPE CARDS ── */}
      <section style={{ background: C.ivory, padding: "90px 0" }}>
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Accommodations</span>
            <h2>10+ hostels, one campus family.</h2>
            <p className="lead">Ten-plus dedicated blocks for male and female students, purposefully designed for the well-being and security of every student — regardless of programme or year of study.</p>
          </Reveal>

          <div className="hostel-type-grid">
            {HOSTEL_TYPES.map((h, i) => (
              <Reveal key={i} delay={`d${i + 1}`}>
                <div className="hostel-type-card card-lift">
                  <div className="hostel-card-img">
                    <img src={h.img} alt={h.gender} />
                    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 35%, ${h.gradientEnd}d0 100%)` }} />
                    <div style={{ position: "absolute", top: 16, left: 16, background: "rgba(255,255,255,.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,.22)", borderRadius: 100, padding: "5px 14px", fontSize: 10.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#fff" }}>
                      {h.tag}
                    </div>
                    <div style={{ position: "absolute", bottom: 20, left: 22 }}>
                      <div style={{ fontFamily: "Fraunces,serif", fontSize: 26, color: "#fff" }}>{h.gender}</div>
                    </div>
                  </div>

                  <div style={{ padding: "28px 28px 32px" }}>
                    <p style={{ color: C.slate, fontSize: 15, lineHeight: 1.7, margin: "0 0 22px" }}>{h.desc}</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "9px 16px" }}>
                      {h.features.map((f) => (
                        <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13.5 }}>
                          <Check size={13} color={C.emerald} style={{ flexShrink: 0, marginTop: 3 }} />
                          <span style={{ color: C.ink, lineHeight: 1.45 }}>{f}</span>
                        </div>
                      ))}
                    </div>
                    <a
                      href={`tel:${CONTACT.tollFree.replace(/-/g, "")}`}
                      className="btn btn-dark"
                      style={{ marginTop: 28 }}
                    >
                      <Phone size={15} /> Enquire about {h.gender.split("'")[0].toLowerCase()} hostel
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── AMENITIES GRID ── */}
      <section className="sec wrap">
        <Reveal>
          <span className="eyebrow">Facilities</span>
          <h2>Everything you need, within reach.</h2>
          <p className="lead">Hostel life at Amaltas is designed around your well-being — academically, physically, and socially.</p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(256px,1fr))", gap: 20, marginTop: 50 }}>
          {AMENITIES.map((a, i) => {
            const Icon = a.icon;
            return (
              <Reveal key={i} delay={`d${(i % 4) + 1}`}>
                <div className="card-lift" style={{ background: "#fff", borderRadius: 20, padding: "26px 22px", border: "1px solid rgba(11,44,24,.07)", height: "100%" }}>
                  <div style={{ width: 50, height: 50, borderRadius: 14, background: `linear-gradient(135deg,${C.emerald},${C.emeraldL})`, display: "grid", placeItems: "center", color: "#fff", marginBottom: 16 }}>
                    <Icon size={22} />
                  </div>
                  <h3 style={{ fontSize: 16, marginBottom: 7 }}>{a.label}</h3>
                  <p style={{ color: C.slate, fontSize: 13.5, lineHeight: 1.6, margin: 0 }}>{a.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── MESS & DINING ── */}
      <section style={{ background: `radial-gradient(130% 140% at 10% 8%,${C.navy2} 0%,${C.navy} 60%)`, padding: "100px 0" }}>
        <div className="wrap hostel-split">
          <Reveal variant="left">
            <span className="eyebrow" style={{ color: C.goldL }}>Dining</span>
            <h2 style={{ color: C.ivory, marginTop: 14 }}>Nutritious meals, every day.</h2>
            <p style={{ color: "rgba(247,244,236,.75)", fontSize: 16, marginTop: 16, lineHeight: 1.75, maxWidth: 460 }}>
              Healthy, hygienic, and balanced meals keep students energised for the demands of health-sciences education. Our mess committees ensure quality through rotating menus and regular resident feedback.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 30 }}>
              {MESS_HIGHLIGHTS.map((m) => (
                <div key={m} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14.5 }}>
                  <Check size={15} color={C.goldL} style={{ flexShrink: 0, marginTop: 2 }} />
                  <span style={{ color: "rgba(247,244,236,.85)", lineHeight: 1.55 }}>{m}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal variant="right" delay="d2">
            <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", aspectRatio: "4/3" }}>
              <img
                src="/assets/images%20of%20university/campus%20life/IMG_9478.JPG.jpeg"
                alt="Mess and dining facility"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={(e) => { e.target.src = "/assets/images%20of%20university/campus%20life/435A1853.JPG"; }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(11,44,24,.35),transparent)" }} />
              <div style={{ position: "absolute", bottom: 20, right: 20, background: C.gold, color: C.navy, borderRadius: 12, padding: "12px 18px", fontWeight: 700, fontSize: 13 }}>
                3 meals daily
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SAFETY & SECURITY ── */}
      <section className="sec wrap">
        <Reveal>
          <span className="eyebrow">Safety First</span>
          <h2>Your safety is our first responsibility.</h2>
          <p className="lead">Every measure is in place so that students — and families — can rest assured, day and night.</p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 20, marginTop: 50 }}>
          {SECURITY_FEATURES.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={i} delay={`d${(i % 3) + 1}`}>
                <div className="card-lift" style={{ background: "#fff", borderRadius: 20, padding: "26px 22px", border: "1px solid rgba(11,44,24,.07)", height: "100%", display: "flex", gap: 18 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 13, background: `linear-gradient(135deg,${C.burg},${C.burgL})`, display: "grid", placeItems: "center", color: "#fff", flexShrink: 0 }}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 16, marginBottom: 7 }}>{s.t}</h3>
                    <p style={{ color: C.slate, fontSize: 13.5, lineHeight: 1.6, margin: 0 }}>{s.d}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── GALLERY STRIP ── */}
      <section style={{ background: C.ivory, paddingBottom: 0, overflow: "hidden" }}>
        <div className="wrap" style={{ paddingTop: 90, paddingBottom: 50 }}>
          <Reveal>
            <span className="eyebrow">Campus Life</span>
            <h2>Life beyond the classroom.</h2>
            <p className="lead">From morning yoga to evening sports, the Amaltas campus is alive with student energy and community spirit.</p>
          </Reveal>
        </div>

        <div className="hostel-gallery">
          {GALLERY.map((g, i) => (
            <div key={i} style={{ flex: 1, position: "relative", overflow: "hidden", minWidth: 0 }}>
              <img
                src={g.img}
                alt={g.cap}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 6s ease" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(11,44,24,.72) 0%,rgba(11,44,24,.08) 55%)" }} />
              <div style={{ position: "absolute", bottom: 18, left: 18, color: "#fff", fontFamily: "Fraunces,serif", fontSize: 15, lineHeight: 1.2 }}>{g.cap}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── RULES & REGULATIONS ── */}
      <section className="sec wrap">
        <Reveal>
          <span className="eyebrow">Hostel Regulations</span>
          <h2>Our rules keep everyone safe.</h2>
          <p className="lead">Hostel life runs smoothly when every student respects shared spaces, timings, and each other. These guidelines exist for everyone's benefit.</p>
        </Reveal>
        <div style={{ maxWidth: 780, marginTop: 42 }}>
          <RulesAccordion />
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: `radial-gradient(120% 140% at 80% 20%,${C.emerald} 0%,${C.navy} 55%)`, padding: "100px 0" }}>
        <div className="wrap" style={{ textAlign: "center", color: C.ivory }}>
          <Reveal>
            <span className="eyebrow" style={{ color: C.goldL }}>Ready to join us?</span>
            <h2 style={{ color: C.ivory, margin: "14px auto 0", maxWidth: 600 }}>Secure your hostel room today.</h2>
            <p style={{ color: "rgba(247,244,236,.72)", fontSize: 16, maxWidth: 460, margin: "16px auto 34px", lineHeight: 1.7 }}>
              Hostel allotment follows admission confirmation and is subject to availability. Reach out early to secure your preferred accommodation.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/admissions" className="btn btn-gold">
                Begin Application <ArrowRight size={17} />
              </Link>
              <a href={`tel:${CONTACT.tollFree.replace(/-/g, "")}`} className="btn btn-ghost">
                <Phone size={15} /> {CONTACT.tollFree}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
