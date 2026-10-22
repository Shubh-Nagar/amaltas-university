import React, { useEffect, useRef, useState } from "react";
import {
  Phone, Mail, MapPin, Copy, Check, Navigation, Siren, GraduationCap, Building2,
  Landmark, UserRound, Users, BadgeCheck, ArrowUpRight,
} from "lucide-react";
import { PageHero } from "../components/Layout.jsx";
import { Reveal } from "../components/Primitives.jsx";
import NPFWidget from "../components/NPFWidget.jsx";
import SEO from "../components/SEO.jsx";
import { breadcrumbSchema } from "../data/schema.js";
import { CONTACT } from "../data/content.js";
import {
  telHref, CONTACT_HIGHLIGHTS, LOCATIONS, DIRECTORY,
} from "../data/contact.js";

const HIGHLIGHT_ICONS = { helpline: Siren, admissions: GraduationCap, campus: Building2, city: Landmark };

// Copies `text`, flips to a tick for a moment so the click visibly registered.
function CopyBtn({ text, label }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    } catch {
      /* clipboard blocked (http / old browser) — the link beside it still works */
    }
  };
  return (
    <button type="button" className={`ct-copy ${done ? "is-done" : ""}`} onClick={copy} aria-label={`Copy ${label}`}>
      {done ? <Check size={14} /> : <Copy size={14} />}
      <span className="ct-copy-tip">{done ? "Copied" : "Copy"}</span>
    </button>
  );
}

// One phone number or email: tap to call / mail, plus a copy button.
function Line({ kind, value, label }) {
  const Icon = kind === "mail" ? Mail : Phone;
  const href = kind === "mail" ? `mailto:${value}` : telHref(value);
  return (
    <div className="ct-line">
      <a href={href} className="ct-line-link">
        <Icon size={15} />
        {label && <span className="ct-line-label">{label}</span>}
        <span className="ct-line-val">{value}</span>
      </a>
      <CopyBtn text={value} label={value} />
    </div>
  );
}

// Quick-contact tile; a soft spotlight follows the cursor across it.
function Highlight({ h, i }) {
  const Icon = HIGHLIGHT_ICONS[h.key];
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <Reveal delay={`d${(i % 3) + 1}`} cls="ct-hl-wrap">
      <div className={`ct-hl ct-hl--${h.accent}`} onMouseMove={onMove}>
        <span className="ct-hl-ic"><Icon size={22} /></span>
        <h3>{h.label}</h3>
        <p>{h.note}</p>
        <div className="ct-hl-lines">
          {h.phones.map((p) => <Line key={p} kind="tel" value={p} />)}
          {h.emails?.map((m) => <Line key={m} kind="mail" value={m} />)}
        </div>
      </div>
    </Reveal>
  );
}

function Directory() {
  const [active, setActive] = useState(0);
  const tabs = useRef([]);
  const d = DIRECTORY[active];

  // On phones the tabs are a horizontal strip — keep the active one centred in view.
  useEffect(() => {
    const t = tabs.current[active], strip = t?.parentElement;
    if (!strip || strip.scrollWidth <= strip.clientWidth) return;
    const offset = t.getBoundingClientRect().left - strip.getBoundingClientRect().left;
    strip.scrollTo({ left: strip.scrollLeft + offset - (strip.clientWidth - t.offsetWidth) / 2, behavior: "smooth" });
  }, [active]);

  // Arrow keys move between tabs, as screen-reader users expect from a tablist.
  const onKey = (e) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (active + step + DIRECTORY.length) % DIRECTORY.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="ct-dir">
      <div className="ct-tabs" role="tablist" aria-label="Institutions" onKeyDown={onKey}>
        {DIRECTORY.map((it, i) => (
          <button
            key={it.key}
            ref={(el) => (tabs.current[i] = el)}
            role="tab"
            id={`ct-tab-${it.key}`}
            aria-selected={i === active}
            aria-controls="ct-panel"
            tabIndex={i === active ? 0 : -1}
            className={`ct-tab ${i === active ? "is-active" : ""}`}
            onClick={() => setActive(i)}
          >
            <span className="ct-tab-num">{String(i + 1).padStart(2, "0")}</span>
            {it.short}
          </button>
        ))}
      </div>

      {/* key={d.key} remounts the panel so its entry animation replays on every switch */}
      <div key={d.key} id="ct-panel" role="tabpanel" aria-labelledby={`ct-tab-${d.key}`} className="ct-panel">
        <div className="ct-panel-head">
          <span className="eyebrow">Institution</span>
          <h3>{d.name}</h3>
          {d.address && <p className="ct-panel-addr"><MapPin size={15} /> {d.address}</p>}
        </div>

        <div className="ct-panel-grid">
          <div className="ct-block">
            <span className="ct-block-title"><UserRound size={15} /> Official authority / head</span>
            <div className="ct-person">
              <span className="ct-person-role">{d.head.role}</span>
              {d.head.name && <strong>{d.head.name}</strong>}
              {d.head.quals && <small>{d.head.quals}</small>}
            </div>
          </div>

          <div className="ct-block">
            <span className="ct-block-title"><Phone size={15} /> Email & phone</span>
            {d.phones.map((p, i) => <Line key={i} kind="tel" value={p.num} label={p.label} />)}
            {d.emails.map((m) => <Line key={m} kind="mail" value={m} />)}
          </div>

          <div className="ct-block ct-block--wide">
            <span className="ct-block-title"><Users size={15} /> Contact person(s)</span>
            <div className="ct-people">
              {d.contacts.map((c) => (
                <div key={c.name} className="ct-chip">
                  <div className="ct-chip-who">
                    <strong>{c.name}</strong>
                    {c.role && <small>{c.role}</small>}
                  </div>
                  {c.phones.map((p) => <Line key={p} kind="tel" value={p} />)}
                </div>
              ))}
            </div>
          </div>

          {d.courses && (
            <div className="ct-block ct-block--wide ct-courses">
              <div>
                <span className="ct-block-title"><GraduationCap size={15} /> Course(s) offered</span>
                <div className="ct-pills">{d.courses.map((c) => <span key={c} className="ct-pill">{c}</span>)}</div>
              </div>
              <div>
                <span className="ct-block-title"><BadgeCheck size={15} /> Approved by</span>
                <div className="ct-pills">{d.approvals.map((a) => <span key={a} className="ct-pill ct-pill--soft">{a}</span>)}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Locations() {
  const [active, setActive] = useState(0);
  const loc = LOCATIONS[active];
  return (
    <div className="ct-loc">
      <div className="ct-loc-side">
        <div className="ct-switch" role="tablist" aria-label="Locations">
          <span className="ct-switch-thumb" style={{ transform: `translateX(${active * 100}%)` }} />
          {LOCATIONS.map((l, i) => (
            <button
              key={l.key}
              role="tab"
              aria-selected={i === active}
              className={i === active ? "is-active" : ""}
              onClick={() => setActive(i)}
            >
              {l.label}
            </button>
          ))}
        </div>
        <div key={loc.key} className="ct-loc-info">
          <h3>{loc.title}</h3>
          <p className="ct-loc-addr">
            <MapPin size={17} />
            <span>{loc.lines.join(" ")}</span>
          </p>
          <div className="ct-loc-lines">
            {loc.phones.map((p) => <Line key={p} kind="tel" value={p} />)}
            {loc.emails?.map((m) => <Line key={m} kind="mail" value={m} />)}
          </div>
          <a href={loc.directions} target="_blank" rel="noreferrer" className="btn btn-gold ct-dir-btn">
            <Navigation size={17} /> Get directions
          </a>
        </div>
      </div>
      <div className="ct-map">
        {/* Both maps stay mounted so switching back is instant; only one is visible. */}
        {LOCATIONS.map((l, i) => (
          <iframe
            key={l.key}
            src={l.map}
            title={`Map — ${l.title}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className={i === active ? "is-active" : ""}
            tabIndex={i === active ? 0 : -1}
            aria-hidden={i !== active}
          />
        ))}
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact Us — Amaltas University, Dewas"
        description="Reach Amaltas University and its institutes in Dewas: 24×7 hospital helpline, admissions guidance, institute-wise heads and contact persons, campus and Indore city office addresses with maps."
        path="/contact"
        keywords="Amaltas contact, Amaltas Medical College phone number, Amaltas Hospital helpline, Amaltas admissions contact, Amaltas Dewas address"
        jsonLd={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact Us", path: "/contact" }])]}
      />
      <PageHero
        crumb="Contact Us"
        eyebrow="We're here to help"
        title="Let's talk. One call is all it takes."
        sub="Admissions, hospital care or a campus visit — find the right person at every Amaltas institution, call in a tap, or send us a message."
        bgImg="/assets/images%20of%20university/admissions-team.webp"
      />

      {/* Quick contacts */}
      <section className="wrap ct-hl-sec">
        <div className="ct-hl-grid">
          {CONTACT_HIGHLIGHTS.map((h, i) => <Highlight key={h.key} h={h} i={i} />)}
        </div>
        <Reveal>
          <div className="ct-uni">
            <span className="ct-uni-tag">University office</span>
            <a href={telHref(CONTACT.tollFree)}><Phone size={15} /> {CONTACT.tollFree}</a>
            <a href={telHref(CONTACT.phone)}><Phone size={15} /> {CONTACT.phone}</a>
            <a href={`mailto:${CONTACT.email}`}><Mail size={15} /> {CONTACT.email}</a>
          </div>
        </Reveal>
      </section>

      {/* Directory */}
      <section className="sec wrap ct-dir-sec">
        <Reveal>
          <span className="eyebrow">Institution directory</span>
          <h2>Find the right person, <em className="ct-em">fast.</em></h2>
          <p className="lead">Pick an institution to see its head, official numbers and the people who can help you.</p>
        </Reveal>
        <Reveal>
          <Directory />
        </Reveal>
      </section>

      {/* Locations */}
      <section className="sec ct-loc-sec">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Visit us</span>
            <h2>Two places to <em className="ct-em">find us.</em></h2>
          </Reveal>
          <Reveal>
            <Locations />
          </Reveal>
        </div>
      </section>

      {/* Enquiry */}
      <section className="sec wrap ct-enq-sec">
        <div className="ct-enq">
          <Reveal variant="left" cls="ct-enq-copy">
            <span className="eyebrow">Admissions guidance</span>
            <h2>Ready for the next step?</h2>
            <p className="lead">
              Tell us a little about yourself and our counsellors will call you back — or speak to them directly right now.
            </p>
            <div className="ct-guides">
              <a href={telHref(CONTACT.tollFree)} className="ct-guide">
                <span className="ct-guide-av"><Phone size={20} /></span>
                <span className="ct-guide-txt">
                  <strong>Admissions Cell</strong>
                  <small>+91 {CONTACT.tollFree}</small>
                </span>
                <ArrowUpRight size={18} className="ct-guide-arrow" />
              </a>
            </div>
          </Reveal>
          <Reveal variant="right" cls="ct-enq-form">
            <div className="ct-form-card">
              <h3>Send an enquiry</h3>
              <NPFWidget />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
