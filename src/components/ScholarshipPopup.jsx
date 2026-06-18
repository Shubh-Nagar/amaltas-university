import React, { useState, useEffect, useRef } from "react";
import { X, ChevronDown, Sparkles } from "lucide-react";
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

const CONFETTI_COLORS = [
  "#F6E005","#FBED5B","#FFA500","#FFD166",
  "#12863F","#23A653","#6FCF97",
  "#872822",
  "#ffffff","#ffe8a3",
  "#FF6B6B","#4FC3F7","#AB47BC","#F06292",
];

function useConfetti(canvasRef, active) {
  useEffect(() => {
    if (!active || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const W = (canvas.width  = window.innerWidth);
    const H = (canvas.height = window.innerHeight);

    const COUNT = 180;
    const particles = [];

    for (let i = 0; i < COUNT; i++) {
      const side = i < COUNT / 2 ? "left" : "right";
      const deg  = 22 + Math.random() * 62;          // 22° – 84° above horizontal
      const rad  = (deg * Math.PI) / 180;
      const spd  = 5 + Math.random() * 12;
      particles.push({
        x:        side === "left" ? 24 : W - 24,
        y:        H - 10,
        vx:       (side === "left" ? 1 : -1) * Math.cos(rad) * spd,
        vy:       -Math.sin(rad) * spd,
        color:    CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        w:        5 + Math.random() * 9,
        h:        3 + Math.random() * 6,
        rotation: Math.random() * Math.PI * 2,
        rotSpd:   (Math.random() - 0.5) * 0.22,
        alpha:    1,
        shape:    Math.random() > 0.28 ? "rect" : "circle",
      });
    }

    let raf;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      let alive = false;
      for (const p of particles) {
        if (p.alpha <= 0) continue;
        alive = true;
        p.x       += p.vx;
        p.vy      += 0.21;
        p.y       += p.vy;
        p.rotation += p.rotSpd;
        p.alpha   -= 0.0065;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        if (p.shape === "rect") {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      if (alive) raf = requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, W, H);
    }
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ctx.clearRect(0, 0, W, H);
    };
  }, [active, canvasRef]);
}

export default function ScholarshipPopup() {
  const [open,     setOpen]     = useState(false);
  const [closing,  setClosing]  = useState(false);
  const [form,     setForm]     = useState({ name: "", email: "", phone: "", state: "", program: "" });
  const [submitted,setSubmitted]= useState(false);
  const triggered = useRef(false);
  const canvasRef = useRef(null);

  useConfetti(canvasRef, open);

  useEffect(() => {
    function onScroll() {
      if (triggered.current) return;
      const scrolled = window.scrollY;
      const total    = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0 && scrolled / total >= 0.5) {
        triggered.current = true;
        setOpen(true);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
    <>
      <canvas ref={canvasRef} className="sclpop-canvas" />
      <div
        className={`sclpop-backdrop${closing ? " apop-out" : ""}`}
        onClick={close}
      >
        <div
          className={`sclpop-modal${closing ? " apop-out" : ""}`}
          onClick={e => e.stopPropagation()}
        >
          <button className="apop-close" onClick={close} aria-label="Close">
            <X size={17} />
          </button>

          <div className="sclpop-header">
            <div className="sclpop-badge">
              <Sparkles size={12} />
              Scholarship Opportunity
            </div>
            <h2 className="sclpop-title">Get Scholarship</h2>
            <p className="sclpop-sub">Apply Today — limited merit seats available</p>
          </div>

          {submitted ? (
            <div className="apop-success">
              <div className="apop-success-icon">✓</div>
              <p>Thank you! We'll reach out soon.</p>
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
                I authorize LPU to contact me with updates and notifications via
                Email, SMS, WhatsApp, and Call, overriding the DND/NDNC registry.
              </p>

              <button type="submit" className="btn btn-gold apop-submit">
                Submit Application
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
