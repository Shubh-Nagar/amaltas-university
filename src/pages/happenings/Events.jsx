import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, CalendarDays } from "lucide-react";
import { PageHero } from "../../components/Layout.jsx";
import { Reveal } from "../../components/Primitives.jsx";
import { C } from "../../theme.js";
import { CONTACT } from "../../data/content.js";

const EVENTS = [
  {
    img: "/assets/images%20of%20university/events/u1.jpg",
    date: "2026",
    title: "Early Detection Saves Lives: AI & Bronchoscopy in Focus at Bronchopulmonary World Congress 2026",
  },
  {
    img: "/assets/images%20of%20university/events/we1.jpg",
    date: "2026",
    title: "World Environment Day Celebration at Amaltas University",
  },
  {
    img: "/assets/images%20of%20university/events/P1_yoga.jpg",
    date: "2026",
    title: "Index Group & Amaltas Set a World Record with a Mass Yoga Session of 35,000+ Participants",
  },
  {
    img: "/assets/images%20of%20university/events/WhatsApp-Image-2026-05-13-at-13.48.30.jpeg",
    date: "2026",
    title: "Nurses Day Celebration",
  },
  {
    img: "/assets/images%20of%20university/events/WhatsApp-Image-2026-04-23-at-10.46.55-2.jpeg",
    date: "2026",
    title: "Grand Lamp Lighting & Oath Taking Ceremony held at Amaltas Institute of Nursing Science, Dewas",
  },
  {
    img: "/assets/images%20of%20university/events/WhatsApp-Image-2026-04-18-at-18.06.07.jpeg",
    date: "2026",
    title: "Workshop on Advanced Medical Techniques at Amaltas Medical College",
  },
  {
    img: "/assets/images%20of%20university/events/2.jpeg",
    date: "2026",
    title: "World Homoeopathy Day Celebration",
  },
  {
    img: "/assets/images%20of%20university/events/WhatsApp-Image-2026-04-13-at-10.13.17-1.jpeg",
    date: "2026",
    title: "Celebrating the Healing Power of Nature",
  },
  {
    img: "/assets/images%20of%20university/events/WhatsApp-Image-2026-04-13-at-16.58.39.jpeg",
    date: "2026",
    title: "Graduation Ceremony",
  },
  {
    img: "/assets/images%20of%20university/events/WhatsApp-Image-2026-03-23-at-21.48.31.jpeg",
    date: "2026",
    title: "National Conference on “Emerging Trends in Artificial Intelligence for Advanced Health Care Delivery”",
  },
  {
    img: "/assets/images%20of%20university/events/WhatsApp-Image-2026-03-17-at-15.26.47.jpeg",
    date: "2026",
    title: "Orientation at Amaltas Institute of Medical Sciences",
  },
  {
    img: "/assets/images%20of%20university/events/WhatsApp-Image-2026-03-10-at-16.48.43.jpeg",
    date: "2026",
    title: "Women's Day Celebration 2k26",
  },
  {
    img: "/assets/images%20of%20university/events/WhatsApp-Image-2026-03-07-at-14.58.06.jpeg",
    date: "2026",
    title: "National Pharmacy Education Day",
  },
  {
    img: "/assets/images%20of%20university/events/3.jpeg",
    date: "2026",
    title: "Holi Celebrated with Great Joy at Amaltas Institute of Ayurveda",
  },
  {
    img: "/assets/images%20of%20university/events/WhatsApp-Image-2026-02-20-at-17.13.30.jpeg",
    date: "2026",
    title: "Amaltas Ayurveda Wins First Prize at Mahakal Van Mela 2026, Provides Free Treatment to 4,000 Patients",
  },
  {
    img: "/assets/images%20of%20university/events/feb-1.jpeg",
    date: "2026",
    title: "Freshers' Party",
  },
  {
    img: "/assets/images%20of%20university/events/jan-1.jpeg",
    date: "2026",
    title: "CME on “Mantrayoga as Mind Medicine”",
  },
  {
    img: "/assets/images%20of%20university/events/WhatsApp-Image-2025-12-18-at-15.07.02.jpeg",
    date: "2025",
    title: "Two-Day NCMSAP 2025 Held at Amaltas University, Dewas",
  },
];

export default function Events() {
  return (
    <>
      <PageHero
        crumb="Happenings / Events"
        eyebrow="Happenings"
        title="Events."
        sub="A look at the conferences, ceremonies, workshops, and celebrations that fill the Amaltas campus calendar."
        bgImg="/assets/images%20of%20university/events/P1_yoga.jpg"
      />

      {/* ── EVENTS GRID ── */}
      <section className="sec wrap">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 24 }}>
          {EVENTS.map((ev, i) => (
            <Reveal key={ev.img} delay={`d${(i % 3) + 1}`}>
              <div className="card-lift" style={{ background: "#fff", borderRadius: 18, overflow: "hidden", border: "1px solid rgba(11,44,24,.07)", height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ aspectRatio: "4/3", overflow: "hidden" }}>
                  <img
                    src={ev.img}
                    alt={ev.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
                <div style={{ padding: "18px 20px 22px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: C.slate, marginBottom: 9 }}>
                    <CalendarDays size={13} /> {ev.date}
                  </div>
                  <h3 style={{ fontSize: 15.5, lineHeight: 1.4, margin: 0 }}>{ev.title}</h3>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: `radial-gradient(120% 140% at 80% 20%,${C.emerald} 0%,${C.navy} 55%)`, padding: "100px 0" }}>
        <div className="wrap" style={{ textAlign: "center", color: C.ivory }}>
          <Reveal>
            <span className="eyebrow" style={{ color: C.goldL }}>Be part of it</span>
            <h2 style={{ color: C.ivory, margin: "14px auto 0", maxWidth: 600 }}>Campus life never stands still.</h2>
            <p style={{ color: "rgba(247,244,236,.72)", fontSize: 16, maxWidth: 460, margin: "16px auto 34px", lineHeight: 1.7 }}>
              From conferences to celebrations, there's always something happening at Amaltas. Reach out to learn what's next.
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
