import React, { useEffect, useMemo, useRef, useState } from "react";
import { Briefcase, CalendarClock, ExternalLink, Mail, MapPin, Phone, X, ZoomIn } from "lucide-react";
import { PageHero } from "../components/Layout.jsx";
import { Reveal } from "../components/Primitives.jsx";
import SEO from "../components/SEO.jsx";
import { breadcrumbSchema } from "../data/schema.js";
import { JOB_CATEGORIES, JOB_CONTACT, JOB_OPENINGS } from "../data/jobs.js";

const fmtDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

// A dated opening is closed once its last day has passed.
const isClosed = (job) => Boolean(job.deadline) && new Date(`${job.deadline}T23:59:59`) < new Date();

// Full-size poster viewer: Esc, the close button or a click outside the poster closes it.
function PosterViewer({ job, onClose }) {
  const closeRef = useRef(null);
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);
  return (
    <div className="ev-lightbox" role="dialog" aria-modal="true" aria-label={`${job.title} — poster`} onClick={onClose}>
      <button ref={closeRef} type="button" className="ev-lightbox-close" onClick={onClose} aria-label="Close poster">
        <X size={22} />
      </button>
      <img className="jb-viewer-img" src={job.image} alt={`${job.title} — recruitment poster`} onClick={(e) => e.stopPropagation()} />
    </div>
  );
}

function Bullets({ items }) {
  return (
    <ul className="jb-list">
      {items.map((t, i) => <li key={i}>{t}</li>)}
    </ul>
  );
}

function Role({ role }) {
  return (
    <div className="jb-role">
      <h4>{role.title}</h4>
      {role.experience && <span className="jb-role-meta">Experience: {role.experience}</span>}
      {role.education && <span className="jb-role-meta">{role.experience ? "" : "Education: "}{role.education}</span>}
      <Bullets items={role.points} />
    </div>
  );
}

function JobCard({ job, onOpen }) {
  const closed = isClosed(job);
  return (
    <article className={`jb-card${closed ? " is-closed" : ""}`} id={job.id}>
      <button type="button" className="jb-poster" onClick={() => onOpen(job)} aria-label={`View the ${job.title} poster full size`}>
        <img src={job.image} alt={`${job.title} — recruitment poster`} loading="lazy" decoding="async" />
        <span className="jb-poster-zoom"><ZoomIn size={15} /> View poster</span>
      </button>

      <div className="jb-body">
        <div className="jb-tags">
          <span className="jb-tag jb-tag--cat">{job.category}</span>
          <span className={`jb-tag ${closed ? "jb-tag--closed" : "jb-tag--open"}`}>{closed ? "Closed" : job.type === "proposal" ? "Open for proposals" : "Now hiring"}</span>
        </div>
        <h3>{job.title}</h3>
        <p className="jb-org"><MapPin size={14} /> {job.org}</p>

        {job.summary && <p className="jb-summary">{job.summary}</p>}

        {job.deadline && (
          <p className="jb-deadline"><CalendarClock size={15} /> Last date for submission of proposal: <strong>{fmtDate(job.deadline)}</strong></p>
        )}

        {job.facts && (
          <dl className="jb-facts">
            {job.facts.map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        )}

        {job.blocks && job.blocks.map((b) => (
          <div key={b.title} className="jb-block">
            <h4>{b.title}</h4>
            <Bullets items={b.items} />
          </div>
        ))}

        {job.roles && (
          <div className="jb-block">
            <h4>Positions ({job.roles.length})</h4>
            <div className="jb-roles">
              {job.roles.map((r) => <Role key={r.title} role={r} />)}
            </div>
          </div>
        )}

        <div className="jb-apply">
          {job.apply && <p>{job.apply}</p>}
          {job.address && <p className="jb-addr"><MapPin size={14} /> {job.address}</p>}
          <div className="jb-apply-btns">
            {!job.noEmail && (
              <a className="btn btn-em" href={`mailto:${JOB_CONTACT.email}`}><Mail size={16} /> {JOB_CONTACT.email}</a>
            )}
            <a className="btn btn-dark" href={`tel:+91${JOB_CONTACT.phone}`}><Phone size={16} /> {JOB_CONTACT.phone}</a>
            {job.applyUrl && (
              <a className="btn btn-gold" href={job.applyUrl} target="_blank" rel="noreferrer"><ExternalLink size={16} /> Apply via form</a>
            )}
          </div>
          {job.closing && <p className="jb-closing">{job.closing}</p>}
        </div>
      </div>
    </article>
  );
}

export default function JobOpenings() {
  const [cat, setCat] = useState("All");
  const [viewing, setViewing] = useState(null);
  const jobs = useMemo(() => JOB_OPENINGS.filter((j) => cat === "All" || j.category === cat), [cat]);
  const openCount = JOB_OPENINGS.filter((j) => !isClosed(j)).length;

  return (
    <>
      <SEO
        title="Job Openings — Careers at Amaltas University, Dewas"
        description="Current vacancies and invitations for proposals at Amaltas University, Dewas: leadership and administrative posts, faculty (MPT, MMLT), B.Sc nursing staff, infection control and more."
        path="/job-openings"
        keywords="Amaltas University jobs, Amaltas University recruitment, Amaltas Hospital jobs Dewas, nursing jobs Dewas, faculty jobs Dewas"
        jsonLd={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Job Openings", path: "/job-openings" }])]}
      />
      <PageHero
        crumb="Job Openings"
        eyebrow="Careers"
        title="Build your career at Amaltas."
        sub="Current vacancies and invitations for proposals at Amaltas University, Dewas. Click any poster to view it full size."
        bgImg="/assets/images%20of%20university/admissions-team.webp"
      />

      <section className="sec wrap" style={{ paddingTop: 80 }}>
        <Reveal>
          <div className="jb-head">
            <div>
              <span className="eyebrow">Openings</span>
              <h2 style={{ marginTop: 14 }}>{openCount} open {openCount === 1 ? "opportunity" : "opportunities"}.</h2>
              <p className="lead" style={{ maxWidth: 560 }}>Send your updated CV to <a href={`mailto:${JOB_CONTACT.email}`}>{JOB_CONTACT.email}</a> or call <a href={`tel:+91${JOB_CONTACT.phone}`}>{JOB_CONTACT.phone}</a>.</p>
            </div>
            <Briefcase size={56} className="jb-head-ic" aria-hidden="true" />
          </div>
        </Reveal>

        <div className="jb-chips" role="group" aria-label="Filter by category">
          {["All", ...JOB_CATEGORIES].map((c) => (
            <button key={c} type="button" className={`chip light ${cat === c ? "on" : ""}`} onClick={() => setCat(c)} aria-pressed={cat === c}>
              {c}
            </button>
          ))}
        </div>

        <div className="jb-list-wrap">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} onOpen={setViewing} />
          ))}
        </div>
      </section>

      {viewing && <PosterViewer job={viewing} onClose={() => setViewing(null)} />}
    </>
  );
}
