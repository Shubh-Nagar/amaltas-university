import React, { useState } from "react";
import { X } from "lucide-react";
import NPFWidget from "./NPFWidget.jsx";
import { C } from "../theme.js";

const EnquiryWidget = ({ style, className }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={className || ""}
        style={style}
        onClick={() => setOpen(true)}
      >
        Enquire Now!
      </button>

      {/*
        Modal is always in the DOM so NPFWidget stays mounted.
        emwgts.js initialises the widget div once on mount; hiding/showing
        with opacity+visibility keeps the iframe alive across open/close cycles.
      */}
      <div
        onClick={() => setOpen(false)}
        className="enq-backdrop"
        style={{
          position: "fixed", inset: 0, zIndex: 9999,
          background: "rgba(11,44,24,.72)",
          backdropFilter: "blur(6px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "20px",
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          transition: "opacity .22s ease, visibility .22s ease",
        }}
      >
        <div
          onClick={e => e.stopPropagation()}
          className="enq-modal"
          style={{
            background: "#fff", borderRadius: 22,
            padding: "36px 32px 32px",
            width: "100%", maxWidth: 540,
            position: "relative",
            boxShadow: "0 40px 100px -20px rgba(0,0,0,.55)",
            transform: open ? "translateY(0)" : "translateY(20px)",
            opacity: open ? 1 : 0,
            transition: "transform .28s cubic-bezier(.16,1,.3,1), opacity .25s ease",
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            style={{
              position: "absolute", top: 14, right: 14,
              width: 34, height: 34, borderRadius: "50%",
              border: "1px solid rgba(11,44,24,.14)",
              background: "#fff", cursor: "pointer",
              display: "grid", placeItems: "center",
              color: C.ink, transition: "background .2s",
            }}
          >
            <X size={16} />
          </button>

          {/* Header */}
          <div style={{ marginBottom: 22 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontSize: 11, fontWeight: 700, letterSpacing: ".16em",
              textTransform: "uppercase", color: C.emerald, marginBottom: 8,
            }}>
              <span style={{ width: 22, height: 1, background: "currentColor", display: "inline-block" }} />
              Admissions 2026–27
            </div>
            <h3 style={{ fontFamily: "Fraunces,serif", fontSize: 22, color: C.ink, margin: 0, lineHeight: 1.2 }}>
              Enquire Now
            </h3>
            <p style={{ color: C.slate, fontSize: 13.5, marginTop: 6, lineHeight: 1.6 }}>
              Fill in the form below and our admissions team will reach out to you shortly.
            </p>
          </div>

          {/* NPF inline embed — always mounted, never unmounts */}
          <NPFWidget />
        </div>
      </div>
    </>
  );
};

export default EnquiryWidget;
