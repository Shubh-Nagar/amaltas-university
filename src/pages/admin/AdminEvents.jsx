import React, { useEffect, useState, useCallback } from "react";
import { UploadCloud, X, Trash2, Pencil, CalendarDays, CheckCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";

// Events may only be dated within the current month, up to today — no backdating
// into past months and no scheduling into the future.
function allowedDateRange() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const startOfMonth = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-01`;
  return { startOfMonth, today };
}

export default function AdminEvents() {
  const { token } = useAuth();
  const { startOfMonth, today } = allowedDateRange();
  const [events, setEvents] = useState([]);
  const [loadingList, setLoadingList] = useState(true);

  const [editingId, setEditingId] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [busy, setBusy] = useState(false);

  const loadEvents = useCallback(() => {
    setLoadingList(true);
    fetch("/api/events")
      .then((r) => r.json())
      .then((data) => setEvents(data.events || []))
      .catch(() => setEvents([]))
      .finally(() => setLoadingList(false));
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const onFilesChosen = (list) => {
    const picked = Array.from(list || []).filter((f) => f.type.startsWith("image/"));
    setFiles((prev) => [...prev, ...picked]);
  };

  const removeFile = (idx) => setFiles((prev) => prev.filter((_, i) => i !== idx));

  const removeExistingImage = (src) => setExistingImages((prev) => prev.filter((img) => img !== src));

  const resetForm = () => {
    setEditingId(null);
    setExistingImages([]);
    setTitle("");
    setDescription("");
    setDate("");
    setFiles([]);
  };

  const onEdit = (ev) => {
    setError("");
    setSuccess("");
    setEditingId(ev.id);
    setExistingImages(ev.images || []);
    setTitle(ev.title);
    setDescription(ev.description || "");
    setDate(ev.date);
    setFiles([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!title || !date) {
      setError("Title and date are required");
      return;
    }
    setBusy(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("date", date);
      if (editingId) formData.append("keepImages", JSON.stringify(existingImages));
      files.forEach((f) => formData.append("images", f));

      const res = await fetch(editingId ? `/api/events/${editingId}` : "/api/events", {
        method: editingId ? "PUT" : "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || (editingId ? "Could not update event" : "Could not create event"));

      setSuccess(editingId ? "Event updated." : "Event published — it's now live on the Events page.");
      resetForm();
      loadEvents();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const onDelete = async (id) => {
    if (!window.confirm("Remove this event from the site?")) return;
    try {
      const res = await fetch(`/api/events/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Could not delete event");
      setEvents((prev) => prev.filter((ev) => ev.id !== id));
      if (editingId === id) resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="admin-header">
        <h1>Events</h1>
        <p>Add an event below — it publishes to the public Events page as soon as you submit.</p>
      </div>

      <div className="admin-panel">
        <h2>{editingId ? "Edit event" : "New event"}</h2>
        {error && <div className="auth-error">{error}</div>}
        {success && (
          <div className="auth-error" style={{ background: "rgba(18,134,63,.08)", borderColor: "rgba(18,134,63,.3)", color: "var(--em)", display: "flex", alignItems: "center", gap: 8 }}>
            <CheckCircle size={15} /> {success}
          </div>
        )}

        <form onSubmit={onSubmit}>
          <div className="auth-form-grid" style={{ marginBottom: 18 }}>
            <div className="field">
              <label>Title <span style={{ color: "#c44" }}>*</span></label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="field">
              <label>Date <span style={{ color: "#c44" }}>*</span></label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={startOfMonth}
                max={today}
                required
              />
            </div>
            <div className="field" style={{ gridColumn: "1/-1" }}>
              <label>Description</label>
              <textarea className="alumni-textarea" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
          </div>

          <div className="field" style={{ marginBottom: 20 }}>
            <label>Images</label>
            {editingId && existingImages.length > 0 && (
              <>
                <p style={{ fontSize: 12.5, color: "var(--slate)", margin: "2px 0 8px" }}>
                  Current photos — click the &times; to remove one.
                </p>
                <div className="ev-image-previews">
                  {existingImages.map((src) => (
                    <div className="ev-image-preview" key={src}>
                      <img src={src} alt="" />
                      <button type="button" onClick={() => removeExistingImage(src)} aria-label="Remove image">
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
            <label className="ev-image-drop" htmlFor="ev-image-input" style={{ marginTop: editingId && existingImages.length > 0 ? 14 : 0 }}>
              <UploadCloud size={22} style={{ marginBottom: 8 }} />
              <div>Click to choose photos, or drag them here</div>
            </label>
            <input
              id="ev-image-input"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => onFilesChosen(e.target.files)}
              style={{ display: "none" }}
            />
            {files.length > 0 && (
              <>
                {editingId && (
                  <p style={{ fontSize: 12.5, color: "var(--slate)", margin: "14px 0 8px" }}>New photos to add</p>
                )}
                <div className="ev-image-previews">
                  {files.map((f, i) => (
                    <div className="ev-image-preview" key={i}>
                      <img src={URL.createObjectURL(f)} alt="" />
                      <button type="button" onClick={() => removeFile(i)} aria-label="Remove image">
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button type="submit" className="btn btn-em" disabled={busy}>
              <CalendarDays size={16} /> {busy ? (editingId ? "Updating…" : "Publishing…") : editingId ? "Update event" : "Publish event"}
            </button>
            {editingId && (
              <button type="button" className="btn btn-cancel" onClick={resetForm} disabled={busy}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="admin-panel">
        <h2>Published events</h2>
        {loadingList ? (
          <p style={{ color: "var(--slate)", fontSize: 14 }}>Loading…</p>
        ) : events.length === 0 ? (
          <p style={{ color: "var(--slate)", fontSize: 14 }}>No events yet — add your first one above.</p>
        ) : (
          <div className="admin-events-list">
            {events.map((ev) => (
              <div className="admin-event-row" key={ev.id}>
                {ev.images?.[0] ? <img src={ev.images[0]} alt="" /> : <div className="admin-event-row-noimg" />}
                <div className="info">
                  <h4>{ev.title}</h4>
                  <span>{ev.date}</span>
                </div>
                <button className="admin-event-edit" onClick={() => onEdit(ev)} aria-label="Edit event">
                  <Pencil size={15} />
                </button>
                <button className="admin-event-del" onClick={() => onDelete(ev.id)} aria-label="Delete event">
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
