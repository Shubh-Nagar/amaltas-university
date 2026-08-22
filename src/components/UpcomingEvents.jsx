import React, { useEffect, useMemo, useState } from "react";
import { Clock3, MapPin, Users, CalendarPlus, FileText, ArrowUpRight, ChevronDown } from "lucide-react";

/* ── Upcoming events ─────────────────────────────────────────────
   Sourced from the official invitations in /public/assets/upcoming events.
   Entries auto-expire from the panel once `end` has passed; when none are
   left the component renders nothing, so the page never shows a stale list.
   `gcal` is the Google-Calendar dates token (all-day when times span days). */
const UPCOMING = [
  {
    id: "icf-2026",
    kind: "Half-day workshop",
    title: "Workshop on the International Classification of Functioning, Disability & Health (ICF)",
    short: "ICF Half-Day Workshop",
    blurb:
      "Unpacking the WHO's ICF framework — how functioning, disability and health are classified, coded and applied in everyday clinical practice.",
    start: "2026-09-02T09:00:00+05:30",
    end: "2026-09-02T13:00:00+05:30",
    day: "02",
    mon: "Sep",
    timeLabel: "9:00 AM – 1:00 PM",
    venue: "Amaltas Institute of Medical Sciences, Dewas",
    audience: "HODs & postgraduate students",
    partner: "With the Regional Office of Health & Family Welfare, Govt. of India · sessions by WHO-FIC and CBHI experts.",
    doc: "/assets/upcoming%20events/ICF.jpeg",
    docLabel: "Invitation",
    gcal: "20260902T033000Z/20260902T073000Z",
    accent: "#23A653",
  },
  {
    id: "gcp-2026",
    kind: "Two-day workshop",
    title: "Workshop on Good Clinical Practice (GCP)",
    short: "Good Clinical Practice Workshop",
    blurb:
      "Two days on the ethical and scientific standards behind clinical research — trial conduct, consent, documentation and investigator responsibility.",
    start: "2026-09-02T12:00:00+05:30",
    end: "2026-09-03T23:59:00+05:30",
    day: "02",
    day2: "03",
    mon: "Sep",
    timeLabel: "12:00 noon (Day 1) · 9:00 AM (Day 2)",
    venue: "Mayank Hall, Amaltas Hospital",
    audience: "Residents & faculty — registration required",
    doc: "/assets/upcoming%20events/GCP%20WORKSHOP.pdf",
    docLabel: "Invitation (PDF)",
    gcal: "20260902/20260904",
    accent: "#C25A4B",
  },
];

/* short countdown chip text — kept to a few characters so rows stay compact */
function countdown(ev, now) {
  const start = new Date(ev.start).getTime();
  if (now >= start) return { live: true, text: "Live" };
  const days = Math.ceil((start - now) / 86400000);
  if (days <= 0) return { live: true, text: "Today" };
  if (days === 1) return { text: "Tomorrow" };
  return { text: `${days} days` };
}

function gcalHref(ev) {
  const q = new URLSearchParams({
    action: "TEMPLATE",
    text: `${ev.title} — Amaltas University`,
    dates: ev.gcal,
    details: [ev.blurb, ev.partner, `Timing: ${ev.timeLabel}`].filter(Boolean).join("\n\n"),
    location: ev.venue,
  });
  return `https://calendar.google.com/calendar/render?${q.toString()}`;
}

export default function UpcomingEvents() {
  const [now, setNow] = useState(() => Date.now());
  const [open, setOpen] = useState(null);

  // refresh every minute so the countdown never goes stale on an open tab
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(t);
  }, []);

  const events = useMemo(() => UPCOMING.filter((e) => new Date(e.end).getTime() >= now), [now]);
  if (!events.length) return null;

  return (
    <aside className="up-panel" aria-label="Upcoming events">
      <div className="up-head">
        <span className="up-eyebrow"><i /> Up next on campus</span>
        <span className="up-badge">{events.length}</span>
      </div>

      <div className="up-list">
        {events.map((ev) => {
          const cd = countdown(ev, now);
          const isOpen = open === ev.id;
          return (
            <div key={ev.id} className={`up-item${isOpen ? " open" : ""}`} style={{ "--up-a": ev.accent }}>
              <button
                className="up-row"
                onClick={() => setOpen(isOpen ? null : ev.id)}
                aria-expanded={isOpen}
                aria-controls={`up-detail-${ev.id}`}
              >
                <span className="up-date">
                  <b>{ev.day}{ev.day2 && <em>–{ev.day2}</em>}</b>
                  <small>{ev.mon}</small>
                </span>
                <span className="up-text">
                  <span className="up-kind">{ev.kind}</span>
                  <span className="up-name">{ev.short}</span>
                </span>
                <span className="up-right">
                  <span className={`up-cd${cd.live ? " live" : ""}`}>{cd.text}</span>
                  <ChevronDown size={14} className="up-chev" />
                </span>
              </button>

              <div className="up-detail" id={`up-detail-${ev.id}`} hidden={!isOpen}>
                <p className="up-blurb">{ev.blurb}</p>
                <ul className="up-meta">
                  <li><Clock3 size={13} /> {ev.timeLabel}</li>
                  <li><MapPin size={13} /> {ev.venue}</li>
                  <li><Users size={13} /> {ev.audience}</li>
                </ul>
                {ev.partner && <p className="up-partner">{ev.partner}</p>}
                <div className="up-actions">
                  <a className="up-btn primary" href={gcalHref(ev)} target="_blank" rel="noopener noreferrer">
                    <CalendarPlus size={13} /> Add to calendar
                  </a>
                  <a className="up-btn" href={ev.doc} target="_blank" rel="noopener noreferrer">
                    <FileText size={13} /> {ev.docLabel} <ArrowUpRight size={11} />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
