import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { C } from "../theme.js";
import SEO from "../components/SEO.jsx";

export default function NotFound() {
  return (
    <section className="hero" style={{ minHeight: "80vh", display: "grid", placeItems: "center", textAlign: "center" }}>
      <SEO title="Page Not Found" path="/404" noindex />
      <div className="hero-glow" style={{ width: 360, height: 360, background: "rgba(246,224,5,.2)", left: "50%", top: "30%", transform: "translateX(-50%)" }} />
      <div style={{ position: "relative", zIndex: 2 }}>
        <div aria-hidden="true" style={{ fontFamily: "Fraunces,serif", fontSize: "clamp(5rem,16vw,11rem)", color: C.goldL, lineHeight: 1 }}>404</div>
        {/* Every indexable page needs exactly one h1; this was the only page
            without one, and it is the page the server renders for unknown
            paths, so crawlers saw a heading-less document. */}
        <h1 style={{ fontSize: "clamp(1.5rem,4vw,2.25rem)", marginTop: 8 }}>Page not found</h1>
        <p style={{ color: "rgba(247,244,236,.74)", fontSize: 18, marginBottom: 26 }}>This page wandered off the campus map.</p>
        <Link to="/" className="btn btn-gold"><ArrowLeft size={18} aria-hidden="true" /> Back home</Link>
      </div>
    </section>
  );
}
