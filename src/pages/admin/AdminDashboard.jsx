import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Newspaper, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [count, setCount] = useState(null);
  const [newsCount, setNewsCount] = useState(null);

  useEffect(() => {
    fetch("/api/events")
      .then((r) => r.json())
      .then((data) => setCount(data.events?.length ?? 0))
      .catch(() => setCount(0));
    fetch("/api/news")
      .then((r) => r.json())
      .then((data) => setNewsCount(data.news?.length ?? 0))
      .catch(() => setNewsCount(0));
  }, []);

  return (
    <>
      <div className="admin-header">
        <h1>Welcome, {user?.name?.split(" ")[0] || "there"}.</h1>
        <p>Manage what visitors see on the Amaltas University website.</p>
      </div>

      <div className="admin-stats">
        <div className="admin-stat-card">
          <div className="num">{count === null ? "…" : count}</div>
          <div className="label">Events published</div>
        </div>
        <div className="admin-stat-card">
          <div className="num">{newsCount === null ? "…" : newsCount}</div>
          <div className="label">News published</div>
        </div>
      </div>

      <div className="admin-panel">
        <h2>Quick actions</h2>
        <p style={{ color: "var(--slate)", fontSize: 14.5, margin: "0 0 18px" }}>
          Add a new event or news item and it will appear on the public site immediately.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link to="/admin/events" className="btn btn-em" style={{ display: "inline-flex" }}>
            <CalendarDays size={16} /> Go to Events <ArrowRight size={15} />
          </Link>
          <Link to="/admin/news" className="btn btn-em" style={{ display: "inline-flex" }}>
            <Newspaper size={16} /> Go to News <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </>
  );
}
