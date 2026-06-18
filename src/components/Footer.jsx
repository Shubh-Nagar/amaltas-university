import React from "react";
import { Link } from "react-router-dom";
import { Globe, Mail, Phone, MapPin } from "lucide-react";
import { C } from "../theme.js";
import { CONTACT } from "../data/content.js";

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr", gap: 40 }}>
          <div>
            <Link to="/" className="logo">
              <img src="/assets/images%20of%20university/logo/Amaltas-University-Logo.jpg" alt="Amaltas University" style={{ height: 52, width: "auto", objectFit: "contain" }} />
            </Link>
            <p style={{ marginTop: 16, fontSize: 14.5, lineHeight: 1.7 }}>
              A medical university of the Amaltas Education Welfare Society — where the people
              who will care for India learn by caring.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
              {[Globe, Mail, Phone].map((Ic, i) => (
                <div key={i} style={{ width: 40, height: 40, borderRadius: 10, display: "grid", placeItems: "center", background: "rgba(247,244,236,.07)", color: C.gold }}>
                  <Ic size={18} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4>Explore</h4>
            <Link to="/institutions">Institutions</Link>
            <Link to="/admissions">Admissions &amp; Fees</Link>
            <Link to="/why">Why Amaltas</Link>
            <Link to="/voices">Student Voices</Link>
          </div>
          <div>
            <h4>Quick Links</h4>
            <Link to="/admissions">Scholarships</Link>
            <Link to="/admissions">PhD Entrance 2026</Link>
            <Link to="/leadership">Leadership</Link>
            <a href="#">Anti-Ragging Cell</a>
          </div>
          <div>
            <h4>Reach Us</h4>
            <p style={{ fontSize: 14, display: "flex", gap: 10 }}>
              <MapPin size={18} color={C.gold} style={{ flexShrink: 0 }} /> {CONTACT.address}
            </p>
            <a href={`tel:${CONTACT.tollFree.replace(/-/g, "")}`}>Toll Free: {CONTACT.tollFree}</a>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(247,244,236,.1)", marginTop: 50, paddingTop: 22, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, fontSize: 13.5, color: "rgba(247,244,236,.5)" }}>
          <span>© {new Date().getFullYear()} Amaltas University, Dewas. All rights reserved.</span>
          <span>Concept redesign · "Where healing grows."</span>
        </div>
      </div>
    </footer>
  );
}
