import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, ArrowRightCircle, Phone, Quote } from "lucide-react";
import { Reveal, StatNum } from "../../components/Primitives.jsx";
import { useInView } from "../../hooks/useScroll.js";
import { C } from "../../theme.js";
import { CONTACT, VOICES } from "../../data/content.js";

const FALLBACK = "/assets/images%20of%20university/campus%20life/435A1853.JPG";

/* ── hero carousel slides ── */
const SLIDES = [
  {
    tag: "Amaltas University",
    t1: "LIVING &",
    t2: "LEARNING",
    sub: "Beyond the classroom, campus life at Amaltas is festivals, friendships, sport, and quiet mornings — all in one place.",
    img: "/assets/images%20of%20university/photo-gallery/medical.png",
  },
  {
    tag: "Culture & Festivals",
    t1: "CULTURE &",
    t2: "CELEBRATION",
    sub: "From folk dance to convocation, every season on campus brings its own festival — and everyone belongs on stage.",
    img: "/assets/images%20of%20university/campus%20life/435A9602.JP ,G",
  },
  {
    tag: "Sport & Wellness",
    t1: "SPORT &",
    t2: "WELLNESS",
    sub: "A fully-equipped gym, open grounds, and daily yoga keep the mind as sharp as the syllabus demands.",
    img: "/assets/images%20of%20university/photo-gallery/IMG-20250307-WA0066.jpg",
  },
  {
    tag: "Friends & Memories",
    t1: "FRIENDS &",
    t2: "MEMORIES",
    sub: "Fresher's nights, Holi colours, and hostel rooftops — the moments students remember long after graduation.",
    img: "/assets/images%20of%20university/events/3.jpeg",
  },
];

/* ── scrollytelling story cards ── */
const STORY = [
  {
    key: "culture",
    tag: "Culture & Festivals",
    title: "Where every festival becomes a celebration",
    desc: "From folk performances to Founder's Day, the Amaltas stage never stays empty for long. Students choreograph, host, and headline events that turn the campus into a cultural capital every season.",
    img: "/assets/images%20of%20university/campus%20life/435A9602.JPG",
  },
  {
    key: "colours",
    tag: "Holi & Colours",
    title: "Colours, music, and everyone together",
    desc: "Holi at Amaltas erases every batch, department, and hierarchy — for one bright morning, the whole campus is just friends covered in colour.",
    img: "/assets/images%20of%20university/events/3.jpeg",
  },
  {
    key: "freshers",
    tag: "Fresher's Day",
    title: "The night every batch becomes a family",
    desc: "Sashes, dance floors, and a Mr. & Ms. Fresher crown — the welcome party that turns nervous first-years into a class that has each other's backs for the next five years.",
    img: "/assets/images%20of%20university/events/feb-1.jpeg",
  },
  {
    key: "sports",
    tag: "Sports & Fitness",
    title: "Building strength beyond the syllabus",
    desc: "A fully-equipped gymnasium and open grounds host everything from morning cardio to inter-institute tournaments — because future healers train their bodies as seriously as their minds.",
    img: "/assets/images%20of%20university/photo-gallery/2U8A0526.jpg",
    img2: "/assets/images%20of%20university/campus%20life/sport.JPG",
  },
  {
    key: "wellness",
    tag: "Gym & Wellness",
    title: "Mornings that begin with mindfulness",
    desc: "A dedicated gymnasium and daily yoga sessions keep stress in check through demanding exam seasons — a habit many students carry with them long after they leave Amaltas.",
    img: "/assets/images%20of%20university/photo-gallery/2U8A0439.jpg",
  },
  {
    key: "milestones",
    tag: "Convocation & Milestones",
    title: "The traditions that mark every journey",
    desc: "From the lamp-lighting ceremony to convocation day, Amaltas marks every milestone with ritual and pride — moments that stay with graduates for life.",
    img: "/assets/images%20of%20university/event%20and%20activites/lamp.jpeg",
  },
  {
    key: "hostel",
    tag: "Hostel Life",
    title: "Where roommates become lifelong friends",
    desc: "Late-night study sessions, shared meals, and Sunday cricket outside the block — hostel life is where the Amaltas community truly forms.",
    img: "/assets/images%20of%20university/hostel/boys-hostel.jpeg",
    img2: "/assets/images%20of%20university/hostel/girls-hostel.jpeg",
  },
];

/* ── mosaic finale ── */
const MOSAIC = [
  { img: "/assets/images%20of%20university/events/2.jpeg", cap: "Awareness Drives", tall: true },
  { img: "/assets/images%20of%20university/events/WhatsApp-Image-2026-02-20-at-17.13.30.jpeg", cap: "Community Outreach" },
  { img: "/assets/images%20of%20university/events/WhatsApp-Image-2026-05-13-at-13.48.30.jpeg", cap: "Institute Day Celebrations" },
  { img: "/assets/images%20of%20university/photo-gallery/DJI_0034.jpg", cap: "Campus Walkways" },
  { img: "/assets/images%20of%20university/campus%20life/IMG_9478.JPG.jpeg", cap: "Between Classes", tall: true },
  { img: "/assets/images%20of%20university/photo-gallery/2U8A9276.jpg", cap: "Friends for Life" },
  { img: "/assets/images%20of%20university/events/WhatsApp-Image-2026-03-17-at-15.26.47.jpeg", cap: "Inaugurations & Traditions" },
  { img: "/assets/images%20of%20university/photo-gallery/2U8A9378.jpg", cap: "Campus Portraits" },
  { img: "/assets/images%20of%20university/events/feb-1.jpeg", cap: "Fresher's Night" },
];

const STATS = [
  { v: 6,   suf: "",  l: "Institutes, One Campus Family" },
  { v: 25,  suf: "+", l: "Cultural & Sports Events a Year" },
  { v: 900, suf: "+", l: "Hostel Residents" },
  { v: 100, suf: "%", l: "Wi-Fi Campus Coverage" },
];

function HeroCarousel() {
  const [active, setActive] = useState(0);
  const timer = useRef(null);

  const advance = useCallback(() => setActive((i) => (i + 1) % SLIDES.length), []);

  useEffect(() => {
    timer.current = setInterval(advance, 6000);
    return () => clearInterval(timer.current);
  }, [active, advance]);

  const goTo = (i) => { clearInterval(timer.current); setActive(i); };

  const s = SLIDES[active];

  return (
    <header className="cl-hero">
      {SLIDES.map((sl, i) => (
        <div
          key={i}
          className={`cl-hero-slide ${i === active ? "active" : ""}`}
          style={{ backgroundImage: `url('${sl.img}')` }}
        />
      ))}
      <div className="wrap cl-hero-inner">
        <div className="crumb" style={{ color: "rgba(247,244,236,.55)", fontSize: 13, marginBottom: 14 }}>
          <Link to="/" style={{ color: C.goldL, textDecoration: "none" }}>Home</Link> &nbsp;/&nbsp; Student Life / Campus Life
        </div>
        <span className="eyebrow cl-hero-tag">{s.tag}</span>
        <h1 className="cl-hero-title">{s.t1} <span className="accent">{s.t2}</span></h1>
        <p className="cl-hero-sub">{s.sub}</p>
        <div className="cl-hero-nav">
          <button className="cl-hero-arrow" aria-label="Previous slide" onClick={() => goTo((active - 1 + SLIDES.length) % SLIDES.length)}>
            <ArrowLeft size={17} />
          </button>
          <div className="cl-hero-dots">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                className={`cl-hero-dot ${i === active ? "active" : ""}`}
                onClick={() => goTo(i)}
              >
                {i === active && <span key={active} />}
              </button>
            ))}
          </div>
          <button className="cl-hero-arrow" aria-label="Next slide" onClick={() => goTo((active + 1) % SLIDES.length)}>
            <ArrowRightCircle size={19} />
          </button>
        </div>
      </div>
    </header>
  );
}

function StoryScroller() {
  const cardRefs = useRef([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number(e.target.dataset.idx);
            setActive(idx);
          }
        });
      },
      { threshold: 0, rootMargin: "-42% 0px -42% 0px" }
    );
    cardRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const voice = VOICES[active % VOICES.length];
  const s = STORY[active];

  return (
    <div className="cl-story">
      <div className="cl-story-rail">
        <span className="eyebrow">{s.tag}</span>
        <h2 style={{ fontSize: "clamp(1.6rem,2.6vw,2.1rem)", marginTop: 14 }}>{s.title}</h2>
        <p style={{ color: C.slate, fontSize: 15, lineHeight: 1.75, marginTop: 14 }}>{s.desc}</p>

        <div className="cl-story-quote" style={{ marginTop: 30 }}>
          <Quote size={26} color={C.emerald} style={{ opacity: .4 }} />
          <p style={{ fontFamily: "Fraunces,serif", fontSize: 16.5, lineHeight: 1.55, color: C.ink, margin: "14px 0 18px" }}>
            "{voice.q}"
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img
              src={voice.photo}
              alt={voice.n}
              style={{ width: 42, height: 42, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
              onError={(e) => { e.target.src = FALLBACK; }}
            />
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: C.ink }}>{voice.n}</div>
              <div style={{ fontSize: 12, color: C.slate }}>{voice.r}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="cl-story-track">
        {STORY.map((st, i) => (
          <div
            key={st.key}
            ref={(el) => (cardRefs.current[i] = el)}
            data-idx={i}
            className="cl-story-card"
          >
            <img src={st.img} alt={st.title} onError={(e) => { e.target.src = FALLBACK; }} />
            <div className="cl-story-num">0{i + 1}</div>
            <div className="cl-story-card-body">
              <span className="eyebrow" style={{ color: C.goldL }}>{st.tag}</span>
              <div style={{ fontFamily: "Fraunces,serif", fontWeight: 400, fontSize: "clamp(1.4rem,2.6vw,2rem)", marginTop: 10, maxWidth: 480 }}>
                {st.title}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CampusLife() {
  const [statRef, statSeen] = useInView({ repeat: false });

  return (
    <>
      <HeroCarousel />

      {/* ── STATS BAND ── */}
      <section className="wrap" style={{ marginTop: -50, position: "relative", zIndex: 5 }} ref={statRef}>
        <div className="hostel-stats-band">
          {STATS.map((s, i) => (
            <Reveal key={i} delay={`d${i + 1}`}>
              <div className="hostel-stat-cell" style={{ borderRight: i < 3 ? "1px solid rgba(11,44,24,.08)" : "none" }}>
                <div style={{ fontFamily: "Fraunces,serif", fontSize: "clamp(2rem,4vw,3rem)", lineHeight: 1, background: `linear-gradient(120deg,#11813D,${C.emeraldL})`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                  <StatNum v={s.v} suf={s.suf} run={statSeen} />
                </div>
                <div style={{ color: C.slate, marginTop: 8, fontSize: 14, fontWeight: 500 }}>{s.l}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="sec wrap" style={{ paddingBottom: 30, textAlign: "center" }}>
        <Reveal>
          <span className="eyebrow" style={{ justifyContent: "center" }}>Campus Life</span>
          <h2 style={{ maxWidth: 760, margin: "14px auto 0" }}>Scroll through a year on campus.</h2>
          <p className="lead" style={{ maxWidth: 600, margin: "18px auto 0" }}>
            Seven moments that define what it's actually like to be a student at Amaltas — keep scrolling to move through the story.
          </p>
        </Reveal>
      </section>

      {/* ── SCROLLYTELLING STORY ── */}
      <section className="wrap" style={{ paddingTop: 30, paddingBottom: 100 }}>
        <StoryScroller />
      </section>

      {/* ── MOSAIC FINALE ── */}
      <section style={{ background: C.ivory, padding: "90px 0" }}>
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">More Moments</span>
            <h2>A wall of everyday Amaltas.</h2>
            <p className="lead">Awareness drives, outreach camps, inaugurations, and quiet walks between lectures — campus life in one frame at a time.</p>
          </Reveal>

          <div style={{ marginTop: 46 }}>
            <Reveal variant="zoom">
              <div className="cl-mosaic">
                {MOSAIC.map((m, i) => (
                  <div key={i} className={`cl-mosaic-tile ${m.tall ? "tall" : ""}`}>
                    <img src={m.img} alt={m.cap} onError={(e) => { e.target.src = FALLBACK; }} />
                    <div className="cl-mosaic-tile-label">{m.cap}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: `radial-gradient(120% 140% at 80% 20%,${C.emerald} 0%,${C.navy} 55%)`, padding: "100px 0" }}>
        <div className="wrap" style={{ textAlign: "center", color: C.ivory }}>
          <Reveal>
            <span className="eyebrow" style={{ color: C.goldL, justifyContent: "center" }}>Come see it yourself</span>
            <h2 style={{ color: C.ivory, margin: "14px auto 0", maxWidth: 600 }}>Your own campus-life story starts here.</h2>
            <p style={{ color: "rgba(247,244,236,.72)", fontSize: 16, maxWidth: 460, margin: "16px auto 34px", lineHeight: 1.7 }}>
              Book a campus visit or speak to our admissions team to see student life at Amaltas in person.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/admissions" className="btn btn-gold">
                Begin Application <ArrowRight size={17} />
              </Link>
              <a href={`tel:${CONTACT.tollFree.replace(/-/g, "")}`} className="btn btn-ghost">
                <Phone size={15} /> {CONTACT.tollFree}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
