import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { C } from "../theme.js";
import { CONTACT } from "../data/content.js";

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr", gap: 40 }}>
          <div>
            <Link to="/" className="logo">
              <img src="/assets/images%20of%20university/logo/white-logo.png" alt="Amaltas University" style={{ height: 72, width: "auto", objectFit: "contain" }} loading="lazy" decoding="async" />
            </Link>
            <p style={{ marginTop: 16, fontSize: 14.5, lineHeight: 1.7 }}>
              A medical university of the Amaltas Education Welfare Society — where the people
              who will care for India learn by caring.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
              {[
                { Ic: Facebook, href: "https://www.facebook.com/people/Amaltas-University-Dewas/100092261027732/", label: "Facebook" },
                { Ic: Instagram, href: "https://www.instagram.com/amaltasuniversitydewas?igsh=MWVvOWw0MnBxNzE0dw==", label: "Instagram" },
                { Ic: Twitter, href: "https://x.com/AmaltasDewas", label: "Twitter" },
                { Ic: Youtube, href: "https://www.youtube.com/@AmaltasUniversity", label: "YouTube" },
              ].map(({ Ic, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  style={{ width: 40, height: 40, borderRadius: 10, display: "grid", placeItems: "center", background: "rgba(247,244,236,.07)", color: C.gold, transition: ".25s" }}
                >
                  <Ic size={18} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4>Explore</h4>
            <Link to="/about/university">About Us</Link>
            <Link to="/admissions">Admission &amp; Fees</Link>
            <Link to="/institutions">Institutions</Link>
            <Link to="/student-life/campus-life">Student Life</Link>
            <Link to="/facilities/academic">Facilities</Link>
            <Link to="/happenings/events">Happenings</Link>
            <Link to="/alumni">Alumni</Link>
            <Link to="/healthcare">Healthcare</Link>
          </div>
          <div>
            <h4>Quick Links</h4>
            <Link to="/leadership">Leadership</Link>
            <Link to="/admissions/fees">Fee Details</Link>
            <Link to="/admissions/eligibility">Eligibility Criteria</Link>
            <Link to="/admissions/refund-policy">Refund Policy</Link>
            <Link to="/certificates">Download Certificate</Link>
            <Link to="/student-life/hostel">Hostel &amp; Accommodation</Link>
            <Link to="/happenings/news">News &amp; Press Releases</Link>
            <Link to="/happenings/photo-gallery">Photo Gallery</Link>
            <Link to="/public-self-disclosure">Public Self Disclosure</Link>
            <Link to="/anti-ragging-committee">Anti-Ragging Committee</Link>
            <a href="/disclosure/Students-Grievance-Redressal-Committee-2024.pdf" target="_blank" rel="noreferrer">Students Grievance Redressal Committee</a>
            <Link to="/alumni/giving-back">Giving Back</Link>
          </div>
          <div>
            <h4>Reach Us</h4>
            <p style={{ fontSize: 14, display: "flex", gap: 10 }}>
              <MapPin size={18} color={C.gold} style={{ flexShrink: 0 }} /> {CONTACT.address}
            </p>
            <a href={`tel:${CONTACT.tollFree.replace(/-/g, "")}`}>Call: {CONTACT.tollFree}</a>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(247,244,236,.1)", marginTop: 50, paddingTop: 22, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, fontSize: 13.5, color: "rgba(247,244,236,.5)" }}>
          <span>© {new Date().getFullYear()} Amaltas University, Dewas. All rights reserved.</span>
          <span style={{ display: "flex", gap: 18, alignItems: "center" }}>
            <Link to="/privacy-policy" style={{ color: "inherit" }}>Privacy Policy</Link>
            <Link to="/privacy-policy-2" style={{ color: "inherit" }}>Privacy Policy 2</Link>
            <span>Concept redesign · "Where healing grows."</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
