import React, { useState, useEffect } from "react";
import { X, Clock, ChevronDown } from "lucide-react";
import { PROGRAMS } from "../data/content.js";

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka",
  "Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
  "Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
  "Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
  "Andaman & Nicobar Islands","Chandigarh","Dadra & Nagar Haveli and Daman & Diu",
  "Delhi","Jammu & Kashmir","Ladakh","Lakshadweep","Puducherry",
];

export default function AdmissionPopup() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", state: "", program: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 700);
    return () => clearTimeout(t);
  }, []);

  function close() {
    setClosing(true);
    setTimeout(() => { setOpen(false); setClosing(false); }, 320);
  }
  function set(k, v) { setForm(f => ({ ...f, [k]: v })); }

  function submit(e) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => close(), 2200);
  }

  if (!open) return null;

  return (
    <div className={`apop-backdrop${closing ? " apop-out" : ""}`} onClick={close}>
      <div className={`apop-modal${closing ? " apop-out" : ""}`} onClick={e => e.stopPropagation()}>
        <button className="apop-close" onClick={close} aria-label="Close">
          <X size={17} />
        </button>

        <div className="apop-header">
          <div className="apop-badge">
            <Clock size={12} />
            Limited Seats Left
          </div>
          <h2 className="apop-title">Apply Today</h2>
          <p className="apop-deadline">
            Current Phase Deadline:&nbsp;<strong>15th July 2026</strong>
          </p>
        </div>

        {submitted ? (
          <div className="apop-success">
            <div className="apop-success-icon">✓</div>
            <p>Thank you! We'll be in touch shortly.</p>
          </div>
        ) : (
          <form className="apop-form" onSubmit={submit} noValidate>
            <div className="apop-field">
              <input
                type="text"
                placeholder="Enter your name"
                value={form.name}
                onChange={e => set("name", e.target.value)}
                required
              />
            </div>
            <div className="apop-field">
              <input
                type="email"
                placeholder="Enter your email id"
                value={form.email}
                onChange={e => set("email", e.target.value)}
                required
              />
            </div>
            <div className="apop-field">
              <input
                type="tel"
                placeholder="Phone number"
                value={form.phone}
                onChange={e => set("phone", e.target.value)}
                required
              />
            </div>
            <div className="apop-field apop-select-wrap">
              <select
                value={form.state}
                onChange={e => set("state", e.target.value)}
                required
              >
                <option value="" disabled>State</option>
                {INDIAN_STATES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <ChevronDown size={15} className="apop-chevron" />
            </div>
            <div className="apop-field apop-select-wrap">
              <select
                value={form.program}
                onChange={e => set("program", e.target.value)}
                required
              >
                <option value="" disabled>Select program</option>
                {PROGRAMS.map(p => (
                  <option key={p.n} value={p.n}>{p.n} — {p.d}</option>
                ))}
              </select>
              <ChevronDown size={15} className="apop-chevron" />
            </div>

            <p className="apop-consent">
              I authorize Amaltas University to contact me with updates and notifications
              via Email, SMS, WhatsApp, and Call, overriding the DND/NDNC registry.
            </p>

            <button type="submit" className="btn btn-gold apop-submit">
              Submit Application
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
