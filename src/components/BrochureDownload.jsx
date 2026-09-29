import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, Download, Sparkles, ShieldCheck, Building2, HeartPulse, BadgeCheck } from "lucide-react";
import { PROGRAMS } from "../data/content.js";
import { logBrochureLead, digitsOnly, validateLead } from "../lib/chatLogger.js";

export const BROCHURE_URL = "/assets/docs/AMALTAS%20UNIVERSITY%20BROCHURE.pdf";
const BROCHURE_NAME = "Amaltas University Brochure.pdf";
const COURSES = [...PROGRAMS.map((p) => p.n), "Not sure yet"];
const COVER_URL = "/assets/docs/brochure-cover.jpg";
// facts from the brochure itself
const PERKS = [
  { icon: Building2, text: "7 institutions" },
  { icon: HeartPulse, text: "1400+ bed teaching hospital" },
  { icon: BadgeCheck, text: "UGC approved" },
];

function startDownload() {
  const a = document.createElement("a");
  a.href = BROCHURE_URL;
  a.download = BROCHURE_NAME;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/* Asks for name / course / phone, logs the lead, then starts the brochure download.
   Always starts blank — every download is captured afresh, nothing is remembered.
   `trigger` is logged with the lead so the sheet shows which entry point converts. */
export default function BrochureModal({ onClose, trigger = "hero button" }) {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  const [closing, setClosing] = useState(false);
  const nameRef = useRef(null);

  // play the exit animation, then unmount
  const close = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 260);
  }, [onClose]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.classList.add("brochure-open");
    // don't pop the phone keyboard open over a popup the visitor didn't ask for
    const t = window.matchMedia?.("(pointer: fine)").matches
      ? setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 450)
      : null;
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("brochure-open");
      clearTimeout(t);
    };
  }, [close]);

  function submit(e) {
    e.preventDefault();
    const details = { name: name.trim().replace(/\s+/g, " "), course, phone };
    const next = validateLead(details);
    setErrors(next);
    if (Object.keys(next).length) return;
    logBrochureLead(details, trigger);
    startDownload();
    setDone(true);
  }

  const doneView = (
    <div className="brochure-done">
      <svg className="brochure-check" viewBox="0 0 52 52" aria-hidden="true">
        <circle cx="26" cy="26" r="24" />
        <path d="M15 27l7 7 15-15" />
      </svg>
      <p className="brochure-done-title">Thank you, {name.trim().split(" ")[0]}!</p>
      <p>Your brochure download has started.</p>
      <p>
        Didn't start? <a href={BROCHURE_URL} download={BROCHURE_NAME}>Download it here</a>.
      </p>
      <button type="button" className="assistant-lead-submit" onClick={close}>Close</button>
    </div>
  );

  const formView = (
    <form className="assistant-lead brochure-form" onSubmit={submit} noValidate>
      <label className="assistant-field">
        <span>Full name</span>
        <input
          ref={nameRef}
          type="text"
          value={name}
          maxLength={80}
          autoComplete="name"
          placeholder="Your full name"
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((er) => ({ ...er, name: undefined }));
          }}
          aria-invalid={!!errors.name}
        />
        {errors.name && <em>{errors.name}</em>}
      </label>
      <label className="assistant-field">
        <span>Course interested in</span>
        <select value={course} onChange={(e) => { setCourse(e.target.value); setErrors((er) => ({ ...er, course: undefined })); }} aria-invalid={!!errors.course}>
          <option value="" disabled>Select a course</option>
          {COURSES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {errors.course && <em>{errors.course}</em>}
      </label>
      <label className="assistant-field">
        <span>Mobile number</span>
        <input
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          value={phone}
          autoComplete="tel-national"
          placeholder="10-digit mobile number"
          onChange={(e) => {
            setPhone(digitsOnly(e.target.value));
            if (errors.phone) setErrors((er) => ({ ...er, phone: undefined }));
          }}
          aria-invalid={!!errors.phone}
        />
        {errors.phone && <em>{errors.phone}</em>}
      </label>
      <button type="submit" className="assistant-lead-submit brochure-submit">
        <Download size={16} /> Download Brochure
      </button>
      <p className="brochure-trust"><ShieldCheck size={14} /> Free PDF · Our admissions team may call to help you choose.</p>
    </form>
  );

  // portal to <body> so page-level transforms can't break position:fixed
  return createPortal(
    <div
      className={`brochure-overlay brochure-overlay--promo ${closing ? "is-closing" : ""}`}
      onPointerDown={(e) => e.target === e.currentTarget && close()}
    >
      <div
        className="brochure-modal brochure-modal--promo"
        role="dialog"
        aria-modal="true"
        aria-labelledby="brochure-title"
      >
        <button type="button" className="brochure-close" onClick={close} aria-label="Close">
          <X size={18} />
        </button>

        <div className="brochure-promo-art" aria-hidden="true">
          <span className="brochure-orb brochure-orb--a" />
          <span className="brochure-orb brochure-orb--b" />
          <span className="brochure-chip"><i /> Admissions 2026–27 Open</span>
          <div className="brochure-book">
            <img src={COVER_URL} alt="" width="520" height="736" />
            <span className="brochure-book-shine" />
          </div>
          <ul className="brochure-perks">
            {PERKS.map(({ icon: Icon, text }) => (
              <li key={text}><Icon size={14} /> {text}</li>
            ))}
          </ul>
        </div>
        <div className="brochure-promo-body">
          {done ? doneView : (
            <>
              <span className="brochure-kicker"><Sparkles size={13} /> Free download</span>
              <h2 id="brochure-title" className="brochure-title brochure-title--promo">
                Your future in <span>healthcare</span> starts here
              </h2>
              <p className="brochure-sub">
                Get the Amaltas University brochure — all 7 institutions, courses, eligibility and campus life in one PDF.
              </p>
              {formView}
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
