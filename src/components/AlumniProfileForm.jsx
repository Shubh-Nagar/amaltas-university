import React, { useState } from "react";
import { Send, Camera, Loader2 } from "lucide-react";
import { C } from "../theme.js";
import { MAX_PHOTO_BYTES } from "../lib/alumniApi.js";

/* Controlled alumni profile form with an optional photo upload.
   `onSubmit(values, photoFile)` must return a promise; while it runs the
   button shows a spinner. `locked` lists field names shown read-only. */
export default function AlumniProfileForm({ fields, initial = {}, locked = [], submitLabel, photoNote, onSubmit }) {
  const [form, setForm] = useState(initial);
  const [photo, setPhoto] = useState(null);
  const [photoError, setPhotoError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const next = type === "checkbox" ? (checked ? "Yes" : "") : type === "tel" ? value.replace(/\D/g, "").slice(0, 10) : value;
    setForm((p) => ({ ...p, [name]: next }));
  };

  const handlePhoto = (e) => {
    const file = e.target.files?.[0] || null;
    setPhotoError("");
    if (file && !/^image\/(jpeg|png|webp)$/.test(file.type)) {
      setPhotoError("Please choose a JPG, PNG or WebP image.");
      e.target.value = "";
      return setPhoto(null);
    }
    if (file && file.size > MAX_PHOTO_BYTES) {
      setPhotoError("Please choose a photo smaller than 2 MB.");
      e.target.value = "";
      return setPhoto(null);
    }
    setPhoto(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (busy || photoError) return;
    setBusy(true);
    try {
      await onSubmit(form, photo);
    } finally {
      setBusy(false);
    }
  };

  const today = new Date().toISOString().slice(0, 10);

  return (
    <form onSubmit={handleSubmit}>
      <div className="alumni-form-grid">
        {fields.map((f) => {
          const isWide = f.type === "textarea";
          const readOnly = locked.includes(f.name);
          const id = `alumni-${f.name}`;
          if (f.type === "checkbox") {
            return (
              <label key={f.name} htmlFor={id} style={{ gridColumn: "1/-1", display: "flex", gap: 12, alignItems: "flex-start", fontSize: 14.5, color: C.ink, lineHeight: 1.5, cursor: "pointer" }}>
                <input id={id} type="checkbox" name={f.name} checked={form[f.name] === "Yes"} onChange={handleChange} style={{ width: 18, height: 18, marginTop: 2, accentColor: C.emerald, flexShrink: 0 }} />
                {f.label}
              </label>
            );
          }
          return (
            <div key={f.name} className="field" style={{ gridColumn: isWide ? "1/-1" : "auto" }}>
              <label htmlFor={id}>
                {f.label}
                {!f.optional && !readOnly && <span style={{ color: "#c44", marginLeft: 3 }}>*</span>}
              </label>
              {f.type === "select" ? (
                <select id={id} name={f.name} value={form[f.name] || ""} onChange={handleChange} required={!f.optional} disabled={readOnly} style={{ fontFamily: "inherit" }}>
                  {f.options.map((o) => (
                    <option key={o} value={o.startsWith("Select") ? "" : o} disabled={o.startsWith("Select")}>{o}</option>
                  ))}
                </select>
              ) : f.type === "textarea" ? (
                <textarea
                  id={id} className="alumni-textarea" name={f.name} placeholder={f.placeholder || ""}
                  value={form[f.name] || ""} onChange={handleChange} rows={4}
                  required={!f.optional} readOnly={readOnly} maxLength={f.maxLength}
                />
              ) : (
                <input
                  id={id} type={f.type} name={f.name} placeholder={f.placeholder || ""}
                  value={form[f.name] || ""} onChange={handleChange}
                  required={!f.optional} readOnly={readOnly} maxLength={f.maxLength}
                  style={readOnly ? { background: "var(--paper)", color: C.slate } : undefined}
                  {...(f.type === "date" ? { max: today } : {})}
                  {...(f.type === "tel" ? { inputMode: "numeric", pattern: "[0-9]{10}", maxLength: 10, title: "Enter a 10-digit mobile number" } : {})}
                />
              )}
            </div>
          );
        })}

        <div className="field" style={{ gridColumn: "1/-1" }}>
          <label htmlFor="alumni-photo">Upload Photo <span style={{ fontWeight: 400 }}>(optional, JPG/PNG, max 2 MB)</span></label>
          <input id="alumni-photo" type="file" accept="image/jpeg,image/png,image/webp" onChange={handlePhoto} />
          {photoNote && !photoError && <span style={{ color: C.slate, fontSize: 13, display: "flex", gap: 6, alignItems: "center" }}><Camera size={14} /> {photoNote}</span>}
          {photoError && <span role="alert" style={{ color: "#b3261e", fontSize: 13 }}>{photoError}</span>}
        </div>
      </div>
      <button type="submit" className="btn btn-em" disabled={busy} style={{ marginTop: 28, gap: 10, opacity: busy ? 0.75 : 1 }}>
        {busy ? <Loader2 size={16} className="spin" /> : <Send size={16} />} {busy ? "Please wait…" : submitLabel}
      </button>
    </form>
  );
}
