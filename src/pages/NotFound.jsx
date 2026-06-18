import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { C } from "../theme.js";

export default function NotFound() {
  return (
    <section className="hero" style={{ minHeight: "80vh", display: "grid", placeItems: "center", textAlign: "center" }}>
      <div className="hero-glow" style={{ width: 360, height: 360, background: "rgba(246,224,5,.2)", left: "50%", top: "30%", transform: "translateX(-50%)" }} />
      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ fontFamily: "Fraunces,serif", fontSize: "clamp(5rem,16vw,11rem)", color: C.goldL, lineHeight: 1 }}>404</div>
        <p style={{ color: "rgba(247,244,236,.74)", fontSize: 18, marginBottom: 26 }}>This page wandered off the campus map.</p>
        <Link to="/" className="btn btn-gold"><ArrowLeft size={18} /> Back home</Link>
      </div>
    </section>
  );
}
