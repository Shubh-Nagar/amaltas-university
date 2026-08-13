import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import { C } from "../../theme.js";

const FIELDS = [
  { name: "name", label: "Full name", type: "text" },
  { name: "phone", label: "Phone number", type: "tel" },
  { name: "email", label: "Email ID", type: "email" },
  { name: "username", label: "Username", type: "text" },
  { name: "password", label: "New password", type: "password" },
  { name: "confirmPassword", label: "Confirm new password", type: "password" },
];

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setBusy(true);
    try {
      await register(form);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <span className="eyebrow" style={{ color: C.emerald }}>Create account</span>
        <h1 className="auth-title">Register</h1>
        <p className="auth-sub">Set up an account to manage Amaltas University content.</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={onSubmit} className="auth-form auth-form-grid">
          {FIELDS.map((f) => (
            <div className="field" key={f.name}>
              <label>{f.label}</label>
              <input type={f.type} name={f.name} value={form[f.name] || ""} onChange={onChange} required />
            </div>
          ))}
          <button type="submit" className="btn btn-em" disabled={busy} style={{ justifyContent: "center", gridColumn: "1/-1", marginTop: 8 }}>
            <UserPlus size={16} /> {busy ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in <ArrowRight size={13} style={{ verticalAlign: -2 }} /></Link>
        </p>
      </div>
    </section>
  );
}
