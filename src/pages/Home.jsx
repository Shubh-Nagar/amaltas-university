import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight, ArrowUpRight, Play, Sparkles, Trophy, HeartPulse,
  Award, Quote, ChevronLeft, ChevronRight, ChevronDown,
  Calendar, Phone, Send, CheckCircle, Newspaper, Users,
  MessageCircle, ArrowUp, Check,
} from "lucide-react";
import HelixCanvas from "../components/HelixCanvas.jsx";
import EnquiryWidget from "../components/EnquiryWidget.jsx";
import Blob from "../components/Blob.jsx";
import MagicBento from "../components/MagicBento.jsx";
import ScholarshipPopup from "../components/ScholarshipPopup.jsx";
import { Reveal, Tilt, StatNum } from "../components/Primitives.jsx";
import { useInView } from "../hooks/useScroll.js";
import { C, iconBtn } from "../theme.js";
import {
  INSTITUTIONS, WHY, VOICES, STATS, LEADERS,
  EVENTS, NEWS, FAQS, QUICK_LINKS, ANNOUNCEMENTS,
  AUDIENCES, ADMISSION_PATHS, LIFE, OUTCOMES, PARTNERS,
  ACCREDITATIONS, ASSURANCE,
} from "../data/content.js";

const IMGS = {
  purposeMain:  "/assets/images%20of%20university/our%20purpose/university.jpg",
  campusBanner: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1800&q=80",
  leaderBg:     "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=70",
  instBanner:   "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1800&q=80",
};

const POSTERS = [
  "/assets/images%20of%20university/hero%20section/Screenshot_20260619-130301_Instagram.jpg.jpeg",
  "/assets/images%20of%20university/hero%20section/Screenshot_20260619-130315_Instagram.jpg.jpeg",
  "/assets/images%20of%20university/hero%20section/Screenshot_20260619-130325_Instagram.jpg.jpeg",
  "/assets/images%20of%20university/hero%20section/Screenshot_20260619-130337_Instagram.jpg.jpeg",
  "/assets/images%20of%20university/hero%20section/Screenshot_20260619-130355_Instagram.jpg.jpeg",
  "/assets/images%20of%20university/hero%20section/Screenshot_20260619-130449_Instagram.jpg.jpeg",
  "/assets/images%20of%20university/hero%20section/Screenshot_20260619-130505_Instagram.jpg.jpeg",
];

/* ─── tiny sub-components ─── */

function AnnouncementTicker() {
  return (
    <div className="announcement-bar">
      <div className="announcement-label">NOTICE</div>
      <div className="announcement-track">
        <div className="announcement-scroll">
          {[...ANNOUNCEMENTS, ...ANNOUNCEMENTS].map((a, i) => (
            <span key={i} className="announcement-item">{a}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuickLinksBar() {
  return (
    <div className="quick-links-bar">
      <div className="wrap">
        <div className="quick-links-inner">
          {QUICK_LINKS.map((ql, i) => {
            const Icon = ql.icon;
            return (
              <a key={i} href={ql.to} onClick={(e) => ql.to === "#" && e.preventDefault()} className="quick-link-pill">
                <Icon size={13} />{ql.label}
                {ql.isNew && <span className="new-badge">NEW</span>}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StatsBand() {
  const [ref, seen] = useInView({ threshold: 0.4 });
  return (
    <div ref={ref} className="wrap" style={{ marginTop: -60, position: "relative", zIndex: 5 }}>
      <div className="statgrid" style={{ background: "#fff", borderRadius: 24, boxShadow: "0 40px 90px -50px rgba(11,44,24,.5)", border: "1px solid rgba(11,44,24,.06)" }}>
        {STATS.map((s, i) => (
          <div className="stat" key={i}>
            <StatNum v={s.v} suf={s.suf} run={seen} />
            <div style={{ color: C.slate, marginTop: 10, fontSize: 14.5, fontWeight: 500 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? "open" : ""}`}>
      <button className="faq-q" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <ChevronDown size={18} style={{ flexShrink: 0, transform: open ? "rotate(180deg)" : "none", transition: "transform .3s" }} />
      </button>
      {open && <div className="faq-a">{a}</div>}
    </div>
  );
}

/* Sticky conversion actions — WhatsApp + back-to-top (Medicaps floating-CTA pattern) */
function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fab-stack" aria-hidden="false">
      <EnquiryWidget className="fab fab-enquire" />
      <a
        href="https://wa.me/919404956221?text=Hi%2C%20I%27d%20like%20to%20know%20about%20admissions%20at%20Amaltas%20University."
        target="_blank" rel="noreferrer"
        className="fab fab-wa" aria-label="Chat with admissions on WhatsApp"
      >
        <MessageCircle size={24} />
        <span className="fab-tip">Chat with us</span>
      </a>
      <button
        className={`fab fab-top ${showTop ? "show" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
}

function LifeGrid() {
  const row1 = [...LIFE, ...LIFE, ...LIFE];
  const row2 = [...[...LIFE].reverse(), ...[...LIFE].reverse(), ...[...LIFE].reverse()];
  const sectionRef = useRef(null);
  const track1Ref  = useRef(null);
  const track2Ref  = useRef(null);
  const burstRef   = useRef(false);
  const burstTimeRef = useRef(null);

  // one-shot intersection observer — triggers burst on first entry
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        burstRef.current = true;
        burstTimeRef.current = null;
        io.disconnect();
      }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // rAF-driven marquee with smooth speed deceleration via smoothstep
  useEffect(() => {
    const t1 = track1Ref.current;
    const t2 = track2Ref.current;
    if (!t1 || !t2) return;
    const NORMAL = 0.45;   // px per frame at ~60 fps
    const BURST  = 6.0;
    const DECEL  = 2200;   // ms to decelerate
    let p = 0, speed = NORMAL, raf;

    const tick = (ts) => {
      if (burstRef.current) {
        if (!burstTimeRef.current) burstTimeRef.current = ts;
        const el = ts - burstTimeRef.current;
        if (el < DECEL) {
          const prog = el / DECEL;
          const eased = prog * prog * (3 - 2 * prog); // smoothstep
          speed = BURST + (NORMAL - BURST) * eased;
        } else {
          speed = NORMAL;
          burstRef.current = false;
        }
      }
      const w = t1.scrollWidth / 3;
      p = (p + speed) % w;
      t1.style.transform = `translateX(${p - w}px)`;
      t2.style.transform = `translateX(${-p}px)`;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section ref={sectionRef} className="life-mq-section">
      <div className="wrap" style={{ position: "relative", zIndex: 1, paddingTop: 90, paddingBottom: 48 }}>
        <Reveal>
          <div style={{ textAlign: "center" }}>
            <span className="eyebrow" style={{ justifyContent: "center" }}>Life at Amaltas</span>
            <h2 style={{ maxWidth: 760, margin: "12px auto 0", fontSize: "clamp(2rem,4.5vw,3.2rem)" }}>More than a campus — a community that grows together.</h2>
            <p className="lead" style={{ margin: "16px auto 0", textAlign: "center" }}>
              From the yoga ground that set a world record to festivals, sport, and service — student life here is vivid, safe, and full of belonging.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="life-mq-row">
        <div ref={track1Ref} className="life-mq-track">
          {row1.map((it, i) => (
            <div key={i} className="life-mq-img">
              <img src={it.img} alt={it.label} loading="lazy" />
              <div className="life-mq-label">{it.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="life-mq-row">
        <div ref={track2Ref} className="life-mq-track">
          {row2.map((it, i) => (
            <div key={i} className="life-mq-img">
              <img src={it.img} alt={it.label} loading="lazy" />
              <div className="life-mq-label">{it.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Seven Worlds — Magic Bento grid ─── */
function SevenWorldsPanel() {
  const navigate = useNavigate();

  return (
    <section className="sec inst-grid-section" style={{ position: "relative", overflow: "hidden", background: "#fff" }}>
      {/* diagonal DNA helix — decorative background */}
      <div style={{
        position: "absolute",
        width: "150%",
        height: "150%",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%) rotate(40deg)",
        opacity: 0.35,
        pointerEvents: "none",
        zIndex: 0,
      }}>
        <HelixCanvas />
      </div>

      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="eyebrow" style={{ justifyContent: "center" }}>Seven worlds, one campus</span>
            <h2 style={{ marginTop: 14 }}>Find your calling in healthcare.</h2>
            <p className="lead" style={{ maxWidth: 560, margin: "14px auto 0" }}>
              Every discipline of modern and traditional healthcare — all under one campus, beside a working hospital.
            </p>
          </div>
        </Reveal>
      </div>

      <div style={{ position: "relative", zIndex: 1, padding: "0 28px" }}>
        <MagicBento
          items={INSTITUTIONS}
          onCardClick={() => navigate("/admissions")}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          textAutoHide={false}
          spotlightRadius={320}
          particleCount={10}
          glowColor="246, 197, 30"
        />
      </div>

      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginTop: 44 }}>
          <Link to="/institutions" className="btn btn-gold">
            Explore all programmes <ArrowUpRight size={18} />
          </Link>

        </div>
      </div>
    </section>
  );
}

/* ─── Assurance — answers the questions families actually worry about ─── */
function AssuranceSection() {
  return (
    <section className="sec assurance-sec" style={{ position: "relative", overflow: "hidden" }}>
      <Blob color="rgba(18,134,63,.10)" size={520} blur={115} variant="a" delay={8}
        style={{ left: "-8%", top: "0%" }} />
      <Blob color="rgba(246,224,5,.10)" size={400} blur={100} variant="c" delay={21}
        style={{ right: "-6%", bottom: "0%" }} />

      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <Reveal>
          <div style={{ textAlign: "center" }}>
            <span className="eyebrow" style={{ justifyContent: "center" }}>Peace of mind for families</span>
            <h2 style={{ maxWidth: 720, margin: "12px auto 0" }}>Everything you need to feel sure before you say yes.</h2>
            <p className="lead" style={{ maxWidth: 580, margin: "16px auto 0" }}>
              Scholarships, safe living, and real clinical training — the things that matter most, answered up front.
            </p>
          </div>
        </Reveal>

        <div className="assurance-grid">
          {ASSURANCE.map((a, i) => {
            const Icon = a.icon;
            return (
              <Reveal key={i} delay={`d${(i % 3) + 1}`} variant="zoom">
                <div className="assurance-card">
                  <span className="assurance-icon"><Icon size={20} /></span>
                  <h3 className="assurance-title">{a.t}</h3>
                  <p className="assurance-desc">{a.d}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: 44 }}>
          <Link to="/admissions" className="btn btn-gold">Explore scholarships & fees <ArrowRight size={18} /></Link>
        </div>
      </div>
    </section>
  );
}

/* ─── News & Press — auto-rotating feature (left) + latest list (right) ─── */
function NewsSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((n) => (n + 1) % NEWS.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="sec" style={{ background: C.ivory, position: "relative", overflow: "hidden" }}>
      <Blob color="rgba(18,134,63,.09)" size={450} blur={110} variant="a" delay={13}
        style={{ right: "-6%", top: "10%" }} />

      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <Reveal>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20 }}>
            <div>
              <span className="eyebrow">Stay informed</span>
              <h2 style={{ marginTop: 12 }}>News & Press Releases</h2>
            </div>
            <a href="#" onClick={(e) => e.preventDefault()} className="btn btn-dark" style={{ marginBottom: 10 }}>All News <ArrowUpRight size={17} /></a>
          </div>
        </Reveal>

        <div className="news-feature-layout">
          {/* ── LEFT: big auto-rotating highlight ── */}
          <Reveal variant="left">
            <div className="news-feature">
              {NEWS.map((n, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className={`news-feature-slide ${i === active ? "on" : ""}`}
                >
                  <img src={n.img} alt={n.title} loading="lazy" />
                  <div className="news-feature-overlay" />
                  <div className="news-feature-body">
                    <div className="news-feature-meta">
                      <span className="news-feature-tag">{n.tag}</span>
                      <span className="news-feature-date"><Newspaper size={13} /> {n.date}</span>
                    </div>
                    <h3 className="news-feature-title">{n.title}</h3>
                    <p className="news-feature-desc">{n.desc}</p>
                    <span className="news-link" style={{ color: C.goldL }}>Read more <ArrowRight size={14} /></span>
                  </div>
                </a>
              ))}
              <div className="news-feature-dots">
                {NEWS.map((_, i) => (
                  <button
                    key={i}
                    className={i === active ? "on" : ""}
                    onClick={() => setActive(i)}
                    aria-label={`Show highlight ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </Reveal>

          {/* ── RIGHT: latest news list ── */}
          <Reveal variant="right">
            <div className="news-list">
              {NEWS.map((n, i) => (
                <button
                  key={i}
                  className={`news-list-card ${i === active ? "on" : ""}`}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                >
                  <div className="news-list-thumb">
                    <img src={n.img} alt={n.title} loading="lazy" />
                  </div>
                  <div className="news-list-body">
                    <div className="news-card-top">
                      <span className="news-tag">{n.tag}</span>
                      <span className="news-date"><Newspaper size={11} /> {n.date}</span>
                    </div>
                    <h3 className="news-list-title">{n.title}</h3>
                  </div>
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Events & Activities — expanding filmstrip panels ─── */
function EventsSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((n) => (n + 1) % EVENTS.length), 3500);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section className="sec" style={{ paddingTop: 110, position: "relative", overflow: "hidden" }}>
      {/* ambient blobs — gold warmth behind panels */}
      <Blob color="rgba(246,224,5,.13)" size={500} blur={110} variant="a" delay={5}
        style={{ right: "-8%", top: "10%" }} />
      <Blob color="rgba(18,134,63,.1)"  size={380} blur={100} variant="d" delay={19}
        style={{ left: "-6%", bottom: "5%" }} />

      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <Reveal>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20 }}>
            <div>
              <span className="eyebrow">Campus life</span>
              <h2 style={{ marginTop: 12 }}>Events & Activities</h2>
              <p className="lead" style={{ maxWidth: 520 }}>
                From world records to lamp-lighting ceremonies, campus life at Amaltas is vibrant and meaningful.
              </p>
            </div>
            <a href="#" onClick={(e) => e.preventDefault()} className="btn btn-dark" style={{ marginBottom: 10 }}>
              All Events <ArrowUpRight size={17} />
            </a>
          </div>
        </Reveal>

        <Reveal>
          <div
            className="events-strip"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {EVENTS.map((ev, i) => (
              <article
                key={i}
                className={`events-panel ${i === active ? "on" : ""}`}
                style={{ "--accent": ev.tagColor }}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <img className="events-panel-img" src={ev.img} alt={ev.title} loading="lazy" />
                <div className="events-panel-overlay" />

                {/* collapsed sliver label */}
                <div className="events-panel-rail">
                  <span className="events-panel-rail-tag">{ev.tag}</span>
                  <span className="events-panel-rail-date">{ev.date}</span>
                </div>

                {/* expanded content */}
                <div className="events-panel-content">
                  <div className="events-panel-meta">
                    <span className="ep-tag" style={{ background: ev.tagColor }}>{ev.tag}</span>
                    <span className="ep-date"><Calendar size={11} /> {ev.date}</span>
                  </div>
                  <h3 className="events-panel-title">{ev.title}</h3>
                  {ev.desc && <p className="events-panel-desc">{ev.desc}</p>}
                  <a href="#" onClick={(e) => e.preventDefault()} className="event-link">View details <ArrowRight size={14} /></a>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── World Record stacking cards data ─── */
const WR_CARDS = [
  {
    bg: "linear-gradient(135deg,#0B2C18 0%,#1a5c35 100%)",
    img: "/assets/images%20of%20university/yoga-hall-1.jpeg",
    eyebrow: "Dewas · Madhya Pradesh · Est. 2016",
    stat: "7",
    statLabel: "Health-Science Institutions",
    body: "One campus uniting medicine, Ayurveda, homoeopathy, nursing, pharmacy, physiotherapy and allied sciences — every discipline of modern and traditional healthcare under a single roof.",
  },
  {
    bg: "linear-gradient(135deg,#103A22 0%,#0B2C18 100%)",
    img: "/assets/images%20of%20university/The%20Amaltas%20difference/hospital.jpg",
    eyebrow: "Teaching Hospital · On Campus",
    stat: "1,500+",
    statLabel: "Hospital Beds",
    body: "A fully-functional superspeciality hospital where students step into real wards from year one — not after graduation. The distance between learning and healing, measured in footsteps.",
  },
  {
    bg: "linear-gradient(135deg,#1e3a1a 0%,#0B2C18 100%)",
    img: "/assets/images%20of%20university/event%20and%20activites/yoga.jpg",
    eyebrow: "विश्व कीर्तिमान · Guinness · 2024",
    stat: "35,000+",
    statLabel: "Participants · Mass Yoga",
    body: "The Amaltas group brought together more than thirty-five thousand participants in a single collective yoga gathering — a record-setting testament to community, wellness, and what we build together.",
  },
  {
    bg: "linear-gradient(135deg,#3a1208 0%,#872822 100%)",
    img: "/assets/images%20of%20university/yoga-hall.jpeg",
    eyebrow: "A world record, in one breath.",
    stat: null,
    statLabel: "Where healing grows.",
    body: "A university measured not in degrees alone but in lives transformed — and records set, together. This is Amaltas.",
  },
];

/* ─── Scroll-driven two-column milestone section ─── */
function WorldRecordStack() {
  const sectionRef = useRef(null);
  const [activeCard, setActiveCard] = useState(0);
  const N = WR_CARDS.length;

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const p = Math.max(0, Math.min(0.9999, -rect.top / scrollable));
      setActiveCard(Math.min(Math.floor(p * N), N - 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [N]);

  return (
    <div ref={sectionRef} style={{ height: `${N * 100}vh`, position: "relative" }}>
      <div style={{
        position: "sticky", top: 0, height: "100vh",
        display: "flex", overflow: "hidden",
      }}>

        {/* ── LEFT: text panel ── */}
        <div style={{
          width: "50%",
          background: "linear-gradient(160deg,#0B2C18 0%,#0d3520 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 64px",
          position: "relative",
        }}>
          {/* fixed section label */}
          <div style={{ position: "absolute", top: 52, left: 64 }}>
            <span className="eyebrow" style={{ color: C.goldL }}>Our milestones</span>
          </div>

          {/* card content — fades + slides on scroll */}
          <div style={{ position: "relative", minHeight: 340 }}>
            {WR_CARDS.map((card, i) => (
              <div key={i} style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                opacity: i === activeCard ? 1 : 0,
                transform: i === activeCard
                  ? "translateY(0)"
                  : i < activeCard ? "translateY(-32px)" : "translateY(32px)",
                transition: "opacity 0.55s ease, transform 0.55s ease",
                pointerEvents: i === activeCard ? "auto" : "none",
              }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: C.goldL, marginBottom: 16, opacity: 0.88 }}>
                  {card.eyebrow}
                </div>
                {card.stat && (
                  <div style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(3rem,7vw,5.5rem)", fontWeight: 300, lineHeight: 1, color: "#fff", marginBottom: 8 }}>
                    {card.stat}
                  </div>
                )}
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: card.stat ? "clamp(1rem,1.8vw,1.3rem)" : "clamp(1.8rem,3.5vw,2.6rem)", color: C.goldL, marginBottom: 18, lineHeight: 1.25 }}>
                  {card.statLabel}
                </div>
                <p style={{ color: "rgba(247,244,236,.8)", fontSize: 15.5, lineHeight: 1.75, margin: 0, maxWidth: 440 }}>
                  {card.body}
                </p>
              </div>
            ))}
          </div>

          {/* progress dots */}
          <div style={{ position: "absolute", bottom: 48, left: 64, display: "flex", alignItems: "center", gap: 8 }}>
            {WR_CARDS.map((_, i) => (
              <div key={i} style={{
                width: i === activeCard ? 24 : 8, height: 8, borderRadius: 4,
                background: i === activeCard ? C.goldL : "rgba(247,244,236,.2)",
                transition: "all .4s ease",
              }} />
            ))}
          </div>

          {/* scroll cue */}
          <div style={{ position: "absolute", bottom: 44, right: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.35, pointerEvents: "none" }}>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: C.ivory, writingMode: "vertical-lr" }}>Scroll</span>
            <div style={{ width: 1, height: 32, background: `linear-gradient(to bottom, ${C.ivory}, transparent)` }} />
          </div>
        </div>

        {/* ── RIGHT: image panel ── */}
        <div style={{ width: "50%", position: "relative", overflow: "hidden" }}>
          {WR_CARDS.map((card, i) => (
            <React.Fragment key={i}>
              <div style={{
                position: "absolute", inset: 0,
                background: card.bg,
                opacity: i === activeCard ? 1 : 0,
                transition: "opacity 0.6s ease",
              }} />
              {card.img && (
                <img src={card.img} alt="" aria-hidden="true" style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  opacity: i === activeCard ? 1 : 0,
                  transition: "opacity 0.6s ease",
                }} />
              )}
            </React.Fragment>
          ))}
        </div>

      </div>
    </div>
  );
}

function HeroForm() {
  const [sent, setSent] = useState(false);
  return (
    <div className="hero-form-box">
      <div className="eyebrow" style={{ marginBottom: 6 }}>Admissions 2026–27 Open</div>
      <h2 style={{ color: C.ink, fontSize: "clamp(1.4rem,2vw,1.8rem)", fontWeight: 300, marginBottom: 6, lineHeight: 1.2 }}>
        Begin Your <span className="grad-gold">Journey</span>
      </h2>
      {/* <p style={{ color: C.slate, fontSize: 13.5, marginBottom: 20 }}>
        A counsellor will reach out within one working day.
      </p> */}
      {sent ? (
        <div style={{ textAlign: "center", padding: "36px 0" }}>
          <CheckCircle size={48} color={C.emerald} style={{ marginBottom: 14 }} />
          <p style={{ color: C.ink, fontSize: 16, fontWeight: 600 }}>Enquiry received!</p>
          <p style={{ color: C.slate, fontSize: 13.5, marginTop: 8 }}>We'll be in touch shortly.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="hf-field"><input type="text" placeholder="Full Name *" /></div>
          <div className="hf-field"><input type="tel" placeholder="Phone Number *" /></div>
          <div className="hf-field"><input type="email" placeholder="Email Address" /></div>
          <div className="hf-field">
            <select defaultValue="">
              <option value="" disabled>Programme of Interest *</option>
              <option>M.B.B.S.</option>
              <option>B.A.M.S.</option>
              <option>B.H.M.S.</option>
              <option>B.Sc. Nursing</option>
              <option>Post Basic B.Sc. Nursing</option>
              <option>B.Pharma</option>
              <option>D.Pharma</option>
              <option>B.P.T.</option>
              <option>B.M.L.T.</option>
              <option>Allied Sciences</option>
            </select>
          </div>
          <button
            className="btn btn-gold"
            style={{ width: "100%", justifyContent: "center", marginTop: 4 }}
            onClick={() => setSent(true)}
          >
            Submit Enquiry <Send size={16} />
          </button>
          <p style={{ fontSize: 12, color: C.slate, textAlign: "center", marginTop: 2 }}>
            Or call: <a href="tel:+919404956221" style={{ color: C.emerald, textDecoration: "none", fontWeight: 600 }}>+91 94049 56221</a>
          </p>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════════════ */
export default function Home() {
  const [voice, setVoice] = useState(0);
  const [posterIdx, setPosterIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setVoice((v) => (v + 1) % VOICES.length), 6000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setPosterIdx((i) => (i + 1) % POSTERS.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <ScholarshipPopup />
      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <header className="hero">
        {/* video background */}
        <div className="hero-bg-photo" aria-hidden="true">
          <video autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }}>
            <source src="/assets/images%20of%20university/hero%20section/hero-video.mp4" type="video/mp4" />
          </video>
        </div>

        <Blob color="rgba(18,134,63,.32)" size={420} blur={100} variant="a" delay={4}
          style={{ right: "12%", top: "22%", zIndex: 1 }} />
        <Blob color="rgba(246,224,5,.22)" size={300} blur={85}  variant="c" delay={11}
          style={{ left: "16%", bottom: "18%", zIndex: 1 }} />
        <Blob color="rgba(135,40,34,.18)" size={200} blur={80}  variant="b" delay={7}
          style={{ left: "42%", top: "12%", zIndex: 1 }} />

        <HelixCanvas />

        <div className="hero-glow" style={{ width: 460, height: 460, background: "rgba(18,134,63,.06)", left: "-120px", top: "10%" }} />
        <div className="hero-glow" style={{ width: 380, height: 380, background: "rgba(246,224,5,.18)", right: "8%", bottom: "6%" }} />

        {/* ── two-column layout: poster slider (left) + enquiry form (right) ── */}
        <div className="wrap hero-inner" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start", paddingTop: 170, paddingBottom: 80 }}>

          {/* LEFT — poster carousel */}
          <div>
            <div className="poster-carousel">
              {POSTERS.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Admission poster ${i + 1}`}
                  className={`poster-slide ${i === posterIdx ? "on" : ""}`}
                  loading={i === 0 ? "eager" : "lazy"}
                />
              ))}
            </div>
            {/* dot indicators */}
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
              {POSTERS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPosterIdx(i)}
                  aria-label={`Poster ${i + 1}`}
                  style={{
                    width: i === posterIdx ? 24 : 8, height: 8, borderRadius: 4,
                    background: i === posterIdx ? C.goldL : "rgba(247,244,236,.35)",
                    border: "none", cursor: "pointer", transition: "all .4s ease", padding: 0,
                  }}
                />
              ))}
            </div>
          </div>

          {/* RIGHT — static enquiry form */}
          <HeroForm />
        </div>

        <div className="scrollcue">SCROLL<span className="dot" /></div>
      </header>

      {/* ── STATS ── */}
      <StatsBand />

      {/* ── ANNOUNCEMENT TICKER ── */}
      <AnnouncementTicker />

      {/* ── QUICK LINKS ── */}
      <QuickLinksBar />

      {/* ════════════════════════════════════════
          CAMPUS SHOWCASE  — video strip + blobs
      ════════════════════════════════════════ */}
      <section className="campus-showcase">
        <div className="campus-showcase-bg" aria-hidden="true">
          <img src={IMGS.campusBanner} alt="" loading="lazy" />
          <div className="campus-showcase-overlay" />
        </div>

        {/* blobs drift over the overlay layer */}
        <Blob color="rgba(255,255,255,.06)" size={480} blur={90} variant="a" delay={6}
          style={{ left: "8%", top: "10%", zIndex: 3 }} />
        <Blob color="rgba(246,224,5,.14)" size={360} blur={85} variant="c" delay={17}
          style={{ right: "6%", bottom: "20%", zIndex: 3 }} />
        <Blob color="rgba(18,134,63,.18)" size={260} blur={75} variant="b" delay={30}
          style={{ left: "50%", top: "55%", zIndex: 3 }} />

        <div className="campus-strip" aria-hidden="true">
          {["https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=420&q=70",
            "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=420&q=70",
            "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=420&q=70",
            "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=420&q=70",
          ].map((src, i) => (
            <div key={i} className="campus-strip-panel"><img src={src} alt="" loading="lazy" /></div>
          ))}
        </div>

        <div className="wrap campus-showcase-inner">
          <Reveal>
            <span className="eyebrow" style={{ color: C.goldL, justifyContent: "center" }}>Campus life</span>
            <h2 style={{ color: C.ivory, textAlign: "center", fontSize: "clamp(2.4rem,5vw,3.8rem)", marginTop: 14 }}>
              We Innovate.<br />We Inspire. We Empower.
            </h2>
            <p style={{ color: "rgba(247,244,236,.72)", textAlign: "center", maxWidth: 500, margin: "18px auto 40px", fontSize: 17 }}>
              A full campus tour across all departments, research facilities, and student life — welcome to Amaltas University.
            </p>
            <div style={{ textAlign: "center" }}>
              <button className="play-btn" aria-label="Watch campus tour video"><Play size={28} fill="currentColor" /></button>
              <div style={{ color: "rgba(247,244,236,.5)", fontSize: 12.5, marginTop: 14, letterSpacing: ".12em", textTransform: "uppercase" }}>
                Watch the campus tour
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════
          LIFE AT AMALTAS  — campus-life image grid
      ════════════════════════════════════════ */}
      <LifeGrid />

      {/* ── MARQUEE ── */}
      <div style={{ padding: "70px 0 30px", overflow: "hidden" }}>
        <div className="wrap" style={{ textAlign: "center", marginBottom: 36 }}>
          <span className="eyebrow" style={{ justifyContent: "center" }}>Recognised across disciplines</span>
        </div>
        <div style={{ position: "relative", maskImage: "linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)" }}>
          <div className="marquee marquee-logos">
            {[...ACCREDITATIONS, ...ACCREDITATIONS].map((a, i) => (
              <div className="mq-logo-card" key={i}>
                {a.logo
                  ? <img src={a.logo} alt={a.short} className="mq-logo-img" />
                  : <div className="mq-seal" style={{ background: a.color }}>
                      <span className="mq-seal-abbr">{a.short}</span>
                    </div>
                }
                <div className="mq-logo-name">{a.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          OUR PURPOSE  — two-column split
      ════════════════════════════════════════ */}
      <section className="purpose-section">
        <Blob color="rgba(18,134,63,.11)" size={620} blur={120} variant="d" delay={2}
          style={{ left: "-14%", top: "0%", zIndex: 0 }} />
        <Blob color="rgba(246,224,5,.09)" size={500} blur={110} variant="b" delay={14}
          style={{ right: "-10%", bottom: "-5%", zIndex: 0 }} />

        <div className="purpose-split">
          <div className="purpose-split-left">
            <Reveal variant="left">
              <span className="eyebrow">Our purpose</span>
              <h2 style={{ fontSize: "clamp(2.2rem,5vw,3.4rem)", lineHeight: 1.1 }}>A university that began with a promise to a community.</h2>
              <p className="lead">
                Founded by the Amaltas Education Welfare Society in 2016, we set out to bring
                world-class medical education to the heart of Madhya Pradesh — close to the
                families who need care, and the students who dream of giving it.
              </p>
              <p style={{ color: C.slate, marginTop: 16, fontSize: 16.5 }}>
                Today that promise lives across seven institutions and a living superspeciality
                hospital, where the distance between learning and healing is measured in footsteps.
              </p>
              <Link to="/why" className="btn btn-em" style={{ marginTop: 28 }}>Why students choose us <ArrowRight size={18} /></Link>
            </Reveal>
          </div>

          <div className="purpose-split-right">
            <img src={IMGS.purposeMain} alt="Medical students in class at Amaltas" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          WHY AMALTAS  — blobs drift behind cards
      ════════════════════════════════════════ */}
      <section className="sec" style={{ paddingTop: 30, position: "relative", overflow: "hidden" }}>
        {/* degree.JPG background */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img
            src="/assets/images%20of%20university/campus%20life/degree.JPG"
            alt=""
            aria-hidden="true"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", opacity: 0.28, filter: "grayscale(15%)" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #FBFAF3 0%, rgba(251,250,243,.6) 40%, rgba(251,250,243,.6) 60%, #FBFAF3 100%)" }} />
        </div>

        <Blob color="rgba(18,134,63,.13)" size={500} blur={115} variant="a" delay={10}
          style={{ right: "-8%", top: "5%" }} />
        <Blob color="rgba(246,224,5,.11)" size={420} blur={100} variant="d" delay={24}
          style={{ left: "-7%", bottom: "0%" }} />
        <Blob color="rgba(35,166,83,.09)" size={260} blur={85}  variant="c" delay={38}
          style={{ left: "40%", top: "55%" }} />

        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ textAlign: "center" }}>
              <span className="eyebrow" style={{ justifyContent: "center" }}>The Amaltas difference</span>
              <h2 style={{ maxWidth: 720, margin: "12px auto 0" }}>Reasons families trust us with their most ambitious dreams.</h2>
            </div>
          </Reveal>
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1600, margin: "0 auto", padding: "0 28px" }}>
          <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 22, marginTop: 56 }}>
            {WHY.map((w, i) => {
              const Icon = w.icon;
              return (
                <Reveal key={i} delay={`d${(i % 4) + 1}`} variant="zoom">
                  <div className="card-lift why-card">
                    {w.img
                      ? <img src={w.img} alt={w.t} className="why-card-img" />
                      : <div className="why-card-gradient" />
                    }
                    <div style={{ padding: "26px 26px 28px" }}>
                      <h3 style={{ fontSize: 18, margin: "0 0 8px" }}>{w.t}</h3>
                      <p style={{ color: C.slate, fontSize: 14.5 }}>{w.d}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SEVEN WORLDS — scroll chapters
      ════════════════════════════════════════ */}
      <SevenWorldsPanel />

      {/* ════════════════════════════════════════
          EVENTS  — expanding filmstrip panels
      ════════════════════════════════════════ */}
      <EventsSection />

      {/* ════════════════════════════════════════
          WORLD RECORD  — stacking scroll cards
      ════════════════════════════════════════ */}
      <WorldRecordStack />

      {/* ════════════════════════════════════════
          OUTCOMES & CLINICAL NETWORK — commented out
      ════════════════════════════════════════ */}
      {/* <section className="sec outcomes-section" style={{ paddingTop: 30, position: "relative", overflow: "hidden" }}>
        <div className="wrap">
          <div className="outcomes-card">
            <Blob color="rgba(246,224,5,.16)" size={320} blur={90} variant="c" delay={4}
              style={{ right: "4%", top: "-25%", zIndex: 0 }} />
            <Blob color="rgba(35,166,83,.18)" size={260} blur={80} variant="a" delay={18}
              style={{ left: "2%", bottom: "-30%", zIndex: 0 }} />

            <Reveal>
              <div className="outcomes-head">
                <span className="eyebrow" style={{ color: C.goldL }}>Where learning leads</span>
                <h2 style={{ color: C.ivory, marginTop: 12, fontSize: "clamp(1.9rem,4vw,2.8rem)" }}>
                  A profession, not just a degree.
                </h2>
                <p style={{ color: "rgba(247,244,236,.72)", marginTop: 12, fontSize: 16.5, maxWidth: 560 }}>
                  Every Amaltas student trains inside a living healthcare system — wards, clinics,
                  labs and community outreach — so graduation is the beginning of a career, not the search for one.
                </p>
              </div>
            </Reveal>

            <Reveal delay="d1">
              <div className="outcomes-stats">
                {OUTCOMES.map((o, i) => (
                  <div className="outcomes-stat" key={i}>
                    <div className="outcomes-stat-v">{o.v}</div>
                    <div className="outcomes-stat-l">{o.l}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay="d2">
              <div className="outcomes-partners">
                <div className="outcomes-partners-label">Train across the Amaltas care network</div>
                <div className="outcomes-partner-grid">
                  {PARTNERS.map((p, i) => (
                    <span className="outcomes-partner" key={i}><HeartPulse size={14} /> {p}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section> */}

      {/* ════════════════════════════════════════
          LEADERSHIP  — dark photo section + blobs
      ════════════════════════════════════════ */}
      <section className="sec leadership-sec">
        <div className="leadership-bg-wrap" aria-hidden="true">
          <img src={IMGS.leaderBg} alt="" loading="lazy" />
          <div className="leadership-bg-overlay" />
          <svg className="leadership-grid-svg" preserveAspectRatio="none" viewBox="0 0 100 100">
            {Array.from({ length: 6 }).map((_, i) => (
              <line key={i} x1={i * 20} y1="0" x2={i * 20} y2="100" stroke="rgba(246,224,5,.06)" strokeWidth=".3" vectorEffect="non-scaling-stroke" />
            ))}
          </svg>
        </div>

        <Blob color="rgba(18,134,63,.07)"  size={500} blur={110} variant="c" delay={6}
          style={{ right: "3%",  top: "8%",    zIndex: 0 }} />
        <Blob color="rgba(246,224,5,.08)"  size={400} blur={100} variant="a" delay={20}
          style={{ left: "5%",  bottom: "5%",  zIndex: 0 }} />

        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20 }}>
              <div>
                <span className="eyebrow">Governance</span>
                <h2 style={{ marginTop: 12 }}>Visionary Leadership</h2>
                <p style={{ color: C.slate, fontSize: 17, maxWidth: 500, marginTop: 12 }}>
                  The minds and hearts steering Amaltas toward its founding promise.
                </p>
              </div>
              <Link to="/leadership" className="btn btn-em" style={{ marginBottom: 10 }}>
                Meet all leaders <ArrowUpRight size={17} />
              </Link>
            </div>
          </Reveal>

          <div className="leader-photo-grid">
            {LEADERS.slice(0, 6).map((l, i) => (
              <div key={i} className="lpc-span-2">
              <Reveal delay={`d${i + 1}`} variant="zoom">
                <div className="leader-photo-card">
                  <div className="lpc-photo-area">
                    {l.photo
                      ? <img src={l.photo} alt={l.nm} />
                      : <div className="lpc-photo-initials">{l.nm.split(" ").filter(Boolean).map((w) => w[0]).join("").slice(0, 2)}</div>}
                  </div>
                  <div className="lpc-info">
                    <div className="lpc-role">{l.role}</div>
                    <div className="lpc-name">{l.nm}</div>
                    <p className="lpc-bio">{l.bio}</p>
                  </div>
                </div>
              </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          VOICES  — two-panel full-width layout
      ════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(150deg,#0d3520 0%,#1e6b40 45%,#0d3520 100%)", padding: "100px 0", position: "relative", overflow: "hidden" }}>
        {/* decorative blobs */}
        <Blob color="rgba(246,224,5,.07)"  size={460} blur={110} variant="d" delay={7}  style={{ left: "-6%",  top: "10%" }} />
        <Blob color="rgba(35,166,83,.12)"  size={340} blur={95}  variant="b" delay={22} style={{ right: "-4%", bottom: "5%" }} />
        {/* giant background quote mark */}
        <div style={{ position: "absolute", top: "-40px", left: "3%", fontFamily: "Fraunces,serif", fontSize: 320, color: C.gold, opacity: 0.04, lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>"</div>

        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          {/* section label */}
          <Reveal>
            <span className="eyebrow" style={{ color: C.goldL, marginBottom: 48, display: "block" }}>Voices of Amaltas</span>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 56, alignItems: "start" }}>

            {/* ── LEFT: featured quote ── */}
            <Reveal variant="left">
              <div style={{ position: "relative" }}>
                {/* decorative inline quote mark */}
                <Quote size={44} color={C.gold} style={{ opacity: 0.7, marginBottom: 28 }} />

                {/* quote text */}
                <p style={{ fontFamily: "Fraunces,serif", fontStyle: "italic", fontSize: "clamp(1.25rem,2.4vw,1.75rem)", lineHeight: 1.65, color: C.ivory, margin: "0 0 36px", minHeight: 140, transition: "opacity .35s" }}>
                  "{VOICES[voice].q}"
                </p>

                {/* author row */}
                <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 36 }}>
                  <div style={{ width: 110, height: 110, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: `3px solid ${C.gold}55`, boxShadow: `0 0 0 6px rgba(246,224,5,.1)` }}>
                    {VOICES[voice].photo
                      ? <img src={VOICES[voice].photo} alt={VOICES[voice].n} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
                      : <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg,${C.navy},${C.emerald})`, display: "grid", placeItems: "center", color: C.goldL, fontFamily: "Fraunces,serif", fontSize: 36 }}>{VOICES[voice].n[0]}</div>}
                  </div>
                  <div>
                    <div style={{ color: C.ivory, fontWeight: 700, fontSize: 16 }}>{VOICES[voice].n}</div>
                    <div style={{ color: C.goldL, fontSize: 13, marginTop: 3, opacity: 0.85 }}>{VOICES[voice].r}</div>
                  </div>
                </div>

                {/* navigation */}
                <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                  <div className="dotnav" style={{ gap: 10 }}>
                    {VOICES.map((_, i) => <button key={i} className={voice === i ? "on" : ""} onClick={() => setVoice(i)} style={{ background: voice === i ? C.gold : "rgba(255,255,255,.25)", borderColor: "transparent" }} />)}
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setVoice((voice - 1 + VOICES.length) % VOICES.length)} style={{ ...iconBtn, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", color: C.ivory }}><ChevronLeft size={18} /></button>
                    <button onClick={() => setVoice((voice + 1) % VOICES.length)} style={{ ...iconBtn, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", color: C.ivory }}><ChevronRight size={18} /></button>
                  </div>
                  <Link to="/voices" className="btn btn-gold" style={{ marginLeft: "auto" }}>All stories <ArrowRight size={16} /></Link>
                </div>
              </div>
            </Reveal>

            {/* ── RIGHT: all-voices navigator ── */}
            <Reveal variant="right">
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: C.goldL, marginBottom: 16, opacity: 0.8 }}>All Voices</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {VOICES.map((v, i) => (
                  <button
                    key={i}
                    onClick={() => setVoice(i)}
                    style={{
                      background: voice === i ? "rgba(246,224,5,.10)" : "rgba(255,255,255,.04)",
                      border: `1px solid ${voice === i ? `${C.gold}55` : "rgba(255,255,255,.09)"}`,
                      borderRadius: 16,
                      padding: "14px 16px",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all .25s",
                      outline: "none",
                    }}
                  >
                    <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
                      <div style={{ width: 38, height: 38, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: `2px solid ${voice === i ? `${C.gold}66` : "rgba(255,255,255,.15)"}` }}>
                        {v.photo
                          ? <img src={v.photo} alt={v.n} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
                          : <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg,${C.navy},${C.emerald})`, display: "grid", placeItems: "center", color: C.goldL, fontFamily: "Fraunces,serif", fontSize: 14 }}>{v.n[0]}</div>}
                      </div>
                      <div>
                        <div style={{ color: voice === i ? C.ivory : "rgba(247,244,236,.75)", fontWeight: 700, fontSize: 13 }}>{v.n}</div>
                        <div style={{ color: voice === i ? C.goldL : "rgba(247,244,236,.4)", fontSize: 11.5, marginTop: 2 }}>{v.r}</div>
                      </div>
                    </div>
                    <p style={{ color: "rgba(247,244,236,.55)", fontSize: 12.5, lineHeight: 1.55, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {v.q}
                    </p>
                  </button>
                ))}
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── NEWS & PRESS ── */}
      <NewsSection />

      {/* ════════════════════════════════════════
          ASSURANCE — overcoming objections
      ════════════════════════════════════════ */}
      <AssuranceSection />

      {/* ── FAQ — clean, no blobs ── */}
      <section className="sec wrap">
        <Reveal>
          <div style={{ textAlign: "center" }}>
            <span className="eyebrow" style={{ justifyContent: "center" }}>Common questions</span>
            <h2 style={{ maxWidth: 560, margin: "12px auto 0" }}>Answers to what you want to know.</h2>
          </div>
        </Reveal>
        <div style={{ maxWidth: 780, margin: "54px auto 0" }}>
          {FAQS.map((faq, i) => (
            <Reveal key={i} delay={`d${(i % 3) + 1}`}>
              <FaqItem q={faq.q} a={faq.a} />
            </Reveal>
          ))}
        </div>
      </section>


      {/* ════════════════════════════════════════
          ADMISSION CTA  — final ask (light gradient)
      ════════════════════════════════════════ */}
      <section className="sec admission-cta-section" style={{ position: "relative", overflow: "hidden" }}>
        <Blob color="rgba(18,134,63,.1)"  size={580} blur={115} variant="b" delay={0}
          style={{ left: "-10%", top: "-10%", zIndex: 1 }} />
        <Blob color="rgba(246,224,5,.12)" size={450} blur={100} variant="a" delay={12}
          style={{ right: "-6%", bottom: "-5%", zIndex: 1 }} />
        <Blob color="rgba(35,166,83,.08)"  size={300} blur={85}  variant="c" delay={28}
          style={{ left: "55%", top: "40%", zIndex: 1 }} />

        <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
          <div className="admission-cta-grid">
            <Reveal variant="left">
              <span className="eyebrow">Admissions 2026–27</span>
              <h2 style={{ color: C.ink, marginTop: 14, fontSize: "clamp(2rem,4.5vw,3.2rem)" }}>
                Your journey into<br />healthcare begins here.
              </h2>
              <p style={{ color: C.slate, marginTop: 16, fontSize: 17, maxWidth: 480 }}>
                Applications are open for MBBS, BAMS, BHMS, B.Sc. Nursing, B.Pharma,
                B.P.T., B.M.L.T., and allied health programmes for the 2026–27 session.
              </p>
              <div style={{ display: "flex", gap: 14, marginTop: 30, flexWrap: "wrap" }}>
                <Link to="/admissions" className="btn btn-gold">Apply Now <ArrowRight size={18} /></Link>
                <a href="tel:+919404956221" className="btn btn-dark"><Phone size={15} /> Call Helpline</a>
              </div>

              {/* quick admission pathways */}
              <div className="admit-paths">
                {ADMISSION_PATHS.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <Link key={i} to={p.to} className="admit-path">
                      <span className="admit-path-icon"><Icon size={18} /></span>
                      <span className="admit-path-text">
                        <span className="admit-path-label">{p.label}</span>
                        <span className="admit-path-desc">{p.desc}</span>
                      </span>
                      <ArrowUpRight size={16} className="admit-path-arrow" />
                    </Link>
                  );
                })}
              </div>

              {/* <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 12 }}>
                {["BAMS Admissions: +91 7880154605", "Allied & Rehabilitation Sciences: +91 9617245556", "Toll Free: 1800-571-2131"].map((info, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: C.slate }}>
                    <CheckCircle size={15} color={C.emerald} style={{ flexShrink: 0 }} />
                    {info}
                  </div>
                ))}
              </div> */}
            </Reveal>

            <Reveal delay="d2" variant="right">
              <div className="inquiry-form-box">
                <h3 style={{ fontFamily: "Fraunces,serif", fontSize: 22, marginBottom: 22, color: C.ink }}>Quick Inquiry</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div className="field"><label>Full Name</label><input type="text" placeholder="Your full name" /></div>
                  <div className="field"><label>Phone Number</label><input type="tel" placeholder="+91 XXXXX XXXXX" /></div>
                  <div className="field"><label>Email Address</label><input type="email" placeholder="your@email.com" /></div>
                  <div className="field">
                    <label>Program of Interest</label>
                    <select>
                      <option value="">Select program…</option>
                      <option>M.B.B.S.</option><option>B.A.M.S.</option><option>B.H.M.S.</option>
                      <option>B.Sc. Nursing</option><option>Post Basic B.Sc. Nursing</option>
                      <option>B.Pharma</option><option>D.Pharma</option>
                      <option>B.P.T.</option><option>B.M.L.T.</option><option>D.M.L.T.</option>
                      <option>B.Sc. Clinical Psychology (Hons)</option><option>B.A.S.L.P.</option>
                    </select>
                  </div>
                  <button className="btn btn-gold" style={{ width: "100%", justifyContent: "center", marginTop: 4 }}>
                    Send Inquiry <Send size={16} />
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* sticky conversion actions */}
      <FloatingActions />
    </>
  );
}
