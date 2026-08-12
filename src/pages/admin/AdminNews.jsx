import React, { useEffect, useState, useCallback } from "react";
import { UploadCloud, X, Trash2, Pencil, Newspaper, CheckCircle, RotateCcw } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";

export default function AdminNews() {
  const { token } = useAuth();
  const [news, setNews] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [deletedNews, setDeletedNews] = useState([]);
  const [loadingDeleted, setLoadingDeleted] = useState(true);

  const [editingId, setEditingId] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [busy, setBusy] = useState(false);

  const loadNews = useCallback(() => {
    setLoadingList(true);
    fetch("/api/news")
      .then((r) => r.json())
      .then((data) => setNews(data.news || []))
      .catch(() => setNews([]))
      .finally(() => setLoadingList(false));
  }, []);

  const loadDeletedNews = useCallback(() => {
    setLoadingDeleted(true);
    fetch("/api/news/deleted", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((data) => setDeletedNews(data.news || []))
      .catch(() => setDeletedNews([]))
      .finally(() => setLoadingDeleted(false));
  }, [token]);

  useEffect(() => {
    loadNews();
    loadDeletedNews();
  }, [loadNews, loadDeletedNews]);

  const onFileChosen = (list) => {
    const picked = Array.from(list || []).find((f) => f.type.startsWith("image/"));
    if (picked) setFile(picked);
  };

  const resetForm = () => {
    setEditingId(null);
    setExistingImage(null);
    setFile(null);
  };

  const onEdit = (item) => {
    setError("");
    setSuccess("");
    setEditingId(item.id);
    setExistingImage(item.image);
    setFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!editingId && !file) {
      setError("An image is required");
      return;
    }
    setBusy(true);
    try {
      const formData = new FormData();
      if (file) formData.append("image", file);

      const res = await fetch(editingId ? `/api/news/${editingId}` : "/api/news", {
        method: editingId ? "PUT" : "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || (editingId ? "Could not update news item" : "Could not publish news item"));

      setSuccess(editingId ? "News item updated." : "News item published — it's now live on the News & Press page.");
      resetForm();
      loadNews();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const onDelete = async (id) => {
    if (!window.confirm("Remove this news item from the site? You can restore it later from Recently deleted.")) return;
    try {
      const res = await fetch(`/api/news/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Could not delete news item");
      setNews((prev) => prev.filter((n) => n.id !== id));
      if (editingId === id) resetForm();
      loadDeletedNews();
    } catch (err) {
      setError(err.message);
    }
  };

  const onRestore = async (id) => {
    try {
      const res = await fetch(`/api/news/${id}/restore`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Could not restore news item");
      setDeletedNews((prev) => prev.filter((n) => n.id !== id));
      loadNews();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="admin-header">
        <h1>News</h1>
        <p>Add a news image below — it publishes to the public News & Press page as soon as you submit.</p>
      </div>

      <div className="admin-panel">
        <h2>{editingId ? "Edit news item" : "New news item"}</h2>
        {error && <div className="auth-error">{error}</div>}
        {success && (
          <div className="auth-error" style={{ background: "rgba(18,134,63,.08)", borderColor: "rgba(18,134,63,.3)", color: "var(--em)", display: "flex", alignItems: "center", gap: 8 }}>
            <CheckCircle size={15} /> {success}
          </div>
        )}

        <form onSubmit={onSubmit}>
          <div className="field" style={{ marginBottom: 20 }}>
            <label>Image {!editingId && <span style={{ color: "#c44" }}>*</span>}</label>
            {editingId && existingImage && !file && (
              <>
                <p style={{ fontSize: 12.5, color: "var(--slate)", margin: "2px 0 8px" }}>
                  Current image — choose a new one below to replace it.
                </p>
                <div className="ev-image-previews">
                  <div className="ev-image-preview">
                    <img src={existingImage} alt="" />
                  </div>
                </div>
              </>
            )}
            <label className="ev-image-drop" htmlFor="news-image-input" style={{ marginTop: editingId && existingImage && !file ? 14 : 0 }}>
              <UploadCloud size={22} style={{ marginBottom: 8 }} />
              <div>Click to choose a photo, or drag it here</div>
            </label>
            <input
              id="news-image-input"
              type="file"
              accept="image/*"
              onChange={(e) => onFileChosen(e.target.files)}
              style={{ display: "none" }}
            />
            {file && (
              <>
                <p style={{ fontSize: 12.5, color: "var(--slate)", margin: "14px 0 8px" }}>New photo</p>
                <div className="ev-image-previews">
                  <div className="ev-image-preview">
                    <img src={URL.createObjectURL(file)} alt="" />
                    <button type="button" onClick={() => setFile(null)} aria-label="Remove image">
                      <X size={12} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button type="submit" className="btn btn-em" disabled={busy}>
              <Newspaper size={16} /> {busy ? (editingId ? "Updating…" : "Publishing…") : editingId ? "Update news" : "Publish news"}
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
        <h2>Published news</h2>
        {loadingList ? (
          <p style={{ color: "var(--slate)", fontSize: 14 }}>Loading…</p>
        ) : news.length === 0 ? (
          <p style={{ color: "var(--slate)", fontSize: 14 }}>No news yet — add your first item above.</p>
        ) : (
          <div className="admin-events-list">
            {news.map((item) => (
              <div className="admin-event-row" key={item.id}>
                {item.image ? <img src={item.image} alt="" /> : <div className="admin-event-row-noimg" />}
                <div className="info">
                  <h4>News item #{item.id}</h4>
                  <span>{item.created_at}</span>
                </div>
                <button className="admin-event-edit" onClick={() => onEdit(item)} aria-label="Edit news item">
                  <Pencil size={15} />
                </button>
                <button className="admin-event-del" onClick={() => onDelete(item.id)} aria-label="Delete news item">
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="admin-panel">
        <h2>Recently deleted</h2>
        {loadingDeleted ? (
          <p style={{ color: "var(--slate)", fontSize: 14 }}>Loading…</p>
        ) : deletedNews.length === 0 ? (
          <p style={{ color: "var(--slate)", fontSize: 14 }}>Nothing deleted — removed news items show up here and can be restored.</p>
        ) : (
          <div className="admin-events-list">
            {deletedNews.map((item) => (
              <div className="admin-event-row" key={item.id}>
                {item.image ? <img src={item.image} alt="" /> : <div className="admin-event-row-noimg" />}
                <div className="info">
                  <h4>News item #{item.id}</h4>
                  <span>Deleted {item.updated_at}</span>
                </div>
                <button className="admin-event-edit" onClick={() => onRestore(item.id)} aria-label="Restore news item">
                  <RotateCcw size={15} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
