import React, { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { C } from "../theme.js";
import { CONTACT } from "../data/content.js";

export default function AlumniForm({ fields, submitLabel = "Submit", sendTo = CONTACT.email }) {
  const [form, setForm] = useState({});
  const [done, setDone] = useState(false);

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(submitLabel);
    const body = encodeURIComponent(
      fields.map(f => `${f.label}: ${form[f.name] || "-"}`).join("\n")
    );
    window.location.href = `mailto:${sendTo}?subject=${subject}&body=${body}`;
    setDone(true);
  };

  if (done) {
    return (
      <div style={{ textAlign: "center", padding: "48px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(18,134,63,.1)", display: "grid", placeItems: "center" }}>
          <CheckCircle size={30} color={C.emerald} />
        </div>
        <h4 style={{ fontFamily: "Fraunces,serif", fontSize: 20, color: C.ink, margin: 0 }}>Thank you!</h4>
        <p style={{ color: C.slate, fontSize: 14.5, maxWidth: 340, margin: 0, lineHeight: 1.6 }}>
          Your submission has been received. The Alumni Coordinator will follow up within 3–5 working days.
        </p>
        <button onClick={() => setDone(false)}
          style={{ background: "none", border: "none", color: C.emerald, fontFamily: "inherit", fontSize: 14, fontWeight: 600, cursor: "pointer", textDecoration: "underline", padding: 0 }}>
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="alumni-form-grid">
        {fields.map(f => {
          const isWide = f.type === "textarea" || ["message","details","notes","achievement","note","media","delivery"].includes(f.name);
          return (
            <div key={f.name} className="field" style={{ gridColumn: isWide ? "1/-1" : "auto" }}>
              <label>
                {f.label}
                {!f.optional && <span style={{ color: "#c44", marginLeft: 3 }}>*</span>}
              </label>
              {f.type === "select" ? (
                <select name={f.name} value={form[f.name] || ""} onChange={handleChange} required={!f.optional} style={{ fontFamily: "inherit" }}>
                  {f.options.map(o => (
                    <option key={o} value={o.startsWith("Select") ? "" : o} disabled={o.startsWith("Select")}>{o}</option>
                  ))}
                </select>
              ) : f.type === "textarea" ? (
                <textarea
                  className="alumni-textarea"
                  name={f.name} placeholder={f.placeholder || ""}
                  value={form[f.name] || ""} onChange={handleChange}
                  rows={4} required={!f.optional}
                />
              ) : (
                <input
                  type={f.type} name={f.name} placeholder={f.placeholder || ""}
                  value={form[f.name] || ""} onChange={handleChange}
                  required={!f.optional}
                />
              )}
            </div>
          );
        })}
      </div>
      <button type="submit" className="btn btn-em" style={{ marginTop: 28, gap: 10 }}>
        <Send size={16} /> {submitLabel}
      </button>
    </form>
  );
}
