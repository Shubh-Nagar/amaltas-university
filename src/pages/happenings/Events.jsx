import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, CalendarDays, X, ChevronLeft, ChevronRight, Images, Search, SlidersHorizontal, Check } from "lucide-react";
import { PageHero } from "../../components/Layout.jsx";
import { Reveal } from "../../components/Primitives.jsx";
import { C } from "../../theme.js";
import { CONTACT } from "../../data/content.js";
import SEO from "../../components/SEO.jsx";
import UpcomingEvents from "../../components/UpcomingEvents.jsx";
import { breadcrumbSchema } from "../../data/schema.js";
import { ALL_EVENTS as EVENTS } from "../../data/events.js";

const yearOf = (ev) => (ev.date.match(/\b(20\d{2})\b/) || [, "2026"])[1];

const ENRICHED_EVENTS = EVENTS.map((ev, i) => ({ ...ev, _idx: i, _year: yearOf(ev) }));
const YEARS = [...new Set(ENRICHED_EVENTS.map((e) => e._year))].sort((a, b) => b - a);
const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "az", label: "Title A–Z" },
];

function toggleInSet(setter, value) {
  setter((prev) => {
    const next = new Set(prev);
    next.has(value) ? next.delete(value) : next.add(value);
    return next;
  });
}

/**
 * Card thumbnail that flips through the event's gallery while the pointer is
 * over it, and settles back on the cover shot as soon as the pointer leaves.
 *
 * The extra frames are only mounted after the first hover (`armed`), so a page
 * with 25 galleries still loads just 25 images up front. Auto-play is skipped
 * for visitors who ask for reduced motion — they keep the static cover.
 */
function EventMedia({ ev, hasGallery }) {
  // cover first, then the rest of the gallery minus any duplicate of the cover
  const frames = React.useMemo(
    () => (hasGallery ? [ev.img, ...ev.gallery.filter((g) => g !== ev.img)] : [ev.img]),
    [ev, hasGallery]
  );
  const [idx, setIdx] = useState(0);
  const [armed, setArmed] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearInterval(timer.current), []);

  const start = () => {
    if (frames.length < 2) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    setArmed(true);
    clearInterval(timer.current);
    timer.current = setInterval(() => setIdx((i) => (i + 1) % frames.length), 900);
  };

  const stop = () => {
    clearInterval(timer.current);
    timer.current = null;
    setIdx(0);
  };

  return (
    <div className="ev-media" onMouseEnter={start} onMouseLeave={stop}>
      {frames.map((src, i) => {
        // frame 0 always renders; the rest wait for the first hover
        if (i > 0 && !armed) return null;
        return (
          <img
            key={src}
            className="ev-frame"
            src={src}
            alt={i === 0 ? ev.title : ""}
            aria-hidden={i === 0 ? undefined : true}
            loading="lazy"
            decoding="async"
            /* the cover stays lit underneath, so a frame that hasn't finished
               downloading yet reveals the cover rather than a white flash */
            style={{ opacity: i === 0 || i === idx ? 1 : 0 }}
          />
        );
      })}

      {hasGallery && (
        <span className="ev-photo-badge">
          <Images size={13} /> {ev.gallery.length} photos
        </span>
      )}

      {frames.length > 1 && (
        <span className="ev-strip" aria-hidden="true">
          {frames.map((src, i) => (
            <i key={src} className={i === idx ? "on" : ""} />
          ))}
        </span>
      )}
    </div>
  );
}

export default function Events() {
  const [open, setOpen] = useState(null);        // event object shown in the modal
  const [lightbox, setLightbox] = useState(null); // index into open.gallery, or null
  const [query, setQuery] = useState("");

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [yearFilter, setYearFilter] = useState(() => new Set());
  const [photosOnly, setPhotosOnly] = useState(false);
  const filterRef = useRef(null);

  const activeFilterCount = yearFilter.size + (photosOnly ? 1 : 0);

  const clearFilters = () => {
    setYearFilter(new Set());
    setPhotosOnly(false);
    setSortBy("newest");
  };

  const filteredEvents = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = ENRICHED_EVENTS.filter((ev) => {
      if (q && ![ev.title, ev.desc, ev.date].some((f) => f && f.toLowerCase().includes(q))) return false;
      if (yearFilter.size && !yearFilter.has(ev._year)) return false;
      if (photosOnly && !(Array.isArray(ev.gallery) && ev.gallery.length > 0)) return false;
      return true;
    });
    if (sortBy === "oldest") list = [...list].reverse();
    else if (sortBy === "az") list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [query, yearFilter, photosOnly, sortBy]);

  // close the filter panel on outside click or Escape
  useEffect(() => {
    if (!filtersOpen) return;
    const onDown = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) setFiltersOpen(false);
    };
    const onKey = (e) => { if (e.key === "Escape") setFiltersOpen(false); };
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [filtersOpen]);

  // body-scroll lock + Escape / arrow-key handling while a modal is open
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (lightbox !== null) setLightbox(null);
        else setOpen(null);
      } else if (lightbox !== null && open.gallery) {
        if (e.key === "ArrowRight") setLightbox((i) => (i + 1) % open.gallery.length);
        if (e.key === "ArrowLeft") setLightbox((i) => (i - 1 + open.gallery.length) % open.gallery.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lightbox]);

  return (
    <>
      <SEO
        title="Events — Conferences, Celebrations & Campus Activities"
        description="Explore events at Amaltas University, Dewas — global medical congresses, awareness campaigns, cultural celebrations and community programmes across the campus calendar."
        path="/happenings/events"
        jsonLd={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Happenings", path: "/happenings/events" }, { name: "Events", path: "/happenings/events" }])}
      />
      <PageHero
        crumb="Happenings / Events"
        eyebrow="Happenings"
        title="Events."
        sub="A look at the conferences, ceremonies, workshops, and celebrations that fill the Amaltas campus calendar."
        bgImg="/assets/images%20of%20university/events/P1_yoga.webp"
        aside={<UpcomingEvents />}
      />

      {/* ── EVENTS GRID ── */}
      <section className="sec wrap">
        <Reveal cls="ev-toolbar-reveal">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap", marginBottom: 40 }}>
            <div>
              <span className="eyebrow">The archive</span>
              <h2 style={{ marginTop: 14, marginBottom: 0 }}>Everything that's happened.</h2>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <div className="ev-filter" ref={filterRef}>
                <button
                  type="button"
                  className="ev-filter-btn"
                  onClick={() => setFiltersOpen((o) => !o)}
                  aria-expanded={filtersOpen}
                  aria-haspopup="true"
                  data-open={filtersOpen || activeFilterCount > 0 || undefined}
                >
                  <SlidersHorizontal size={15} strokeWidth={2.25} />
                  Filters
                  {activeFilterCount > 0 && <span className="ev-filter-badge">{activeFilterCount}</span>}
                </button>

                {filtersOpen && (
                  <div className="ev-filter-panel" role="dialog" aria-label="Filter and sort events">
                    <div className="ev-filter-section">
                      <div className="ev-filter-label">Sort by</div>
                      <div className="ev-filter-chips">
                        {SORT_OPTIONS.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            className={`ev-chip${sortBy === opt.value ? " on" : ""}`}
                            onClick={() => setSortBy(opt.value)}
                          >
                            {sortBy === opt.value && <Check size={12} strokeWidth={3} />}
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>


                    <div className="ev-filter-section">
                      <div className="ev-filter-label">Year</div>
                      <div className="ev-filter-chips">
                        {YEARS.map((yr) => (
                          <button
                            key={yr}
                            type="button"
                            className={`ev-chip${yearFilter.has(yr) ? " on" : ""}`}
                            onClick={() => toggleInSet(setYearFilter, yr)}
                          >
                            {yearFilter.has(yr) && <Check size={12} strokeWidth={3} />}
                            {yr}
                          </button>
                        ))}
                      </div>
                    </div>

                    <label className="ev-filter-toggle">
                      <input type="checkbox" checked={photosOnly} onChange={(e) => setPhotosOnly(e.target.checked)} />
                      With photo gallery only
                    </label>

                    <div className="ev-filter-footer">
                      <button type="button" className="ev-filter-clear" onClick={clearFilters} disabled={activeFilterCount === 0 && sortBy === "newest"}>
                        Clear all
                      </button>
                      <button type="button" className="ev-filter-done" onClick={() => setFiltersOpen(false)}>
                        Show {filteredEvents.length} events
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="ev-search">
                <Search size={16} strokeWidth={2.25} className="ev-search-icon" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search events…"
                  aria-label="Search events"
                  className="ev-search-input"
                />
                {query && (
                  <button
                    type="button"
                    className="ev-search-clear"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                  >
                    <X size={13} strokeWidth={2.25} />
                  </button>
                )}
                <span className="ev-search-underline" aria-hidden="true" />
              </div>
            </div>
          </div>
        </Reveal>
        {filteredEvents.length === 0 && (
          <p style={{ color: C.slate, fontSize: 15, marginBottom: 40 }}>
            No events match your filters{query ? ` for "${query}"` : ""}. Try clearing a filter or searching something else.
          </p>
        )}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 24 }}>
          {filteredEvents.map((ev, i) => {
            const hasGallery = Array.isArray(ev.gallery) && ev.gallery.length > 0;
            return (
              <Reveal key={ev.img} delay={`d${(i % 3) + 1}`}>
                <div
                  className="card-lift"
                  onClick={hasGallery ? () => setOpen(ev) : undefined}
                  role={hasGallery ? "button" : undefined}
                  tabIndex={hasGallery ? 0 : undefined}
                  onKeyDown={hasGallery ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(ev); } } : undefined}
                  aria-label={hasGallery ? `${ev.title} — view photo gallery` : undefined}
                  style={{ background: "#fff", borderRadius: 18, overflow: "hidden", border: "1px solid rgba(11,44,24,.07)", height: "100%", display: "flex", flexDirection: "column", cursor: hasGallery ? "pointer" : "default" }}
                >
                  <EventMedia ev={ev} hasGallery={hasGallery} />
                  <div style={{ padding: "18px 20px 22px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: C.slate, marginBottom: 9 }}>
                      <CalendarDays size={13} /> {ev.date}
                    </div>
                    <h3 style={{ fontSize: 15.5, lineHeight: 1.4, margin: 0 }}>{ev.title}</h3>
                    {hasGallery && (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 5, marginTop: 12, fontSize: 12.5, fontWeight: 700, color: C.emerald }}>
                        View gallery <ArrowRight size={14} />
                      </span>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: `radial-gradient(120% 140% at 80% 20%,${C.emerald} 0%,${C.navy} 55%)`, padding: "100px 0" }}>
        <div className="wrap" style={{ textAlign: "center", color: C.ivory }}>
          <Reveal>
            <span className="eyebrow" style={{ color: C.goldL }}>Be part of it</span>
            <h2 style={{ color: C.ivory, margin: "14px auto 0", maxWidth: 600 }}>Campus life never stands still.</h2>
            <p style={{ color: "rgba(247,244,236,.72)", fontSize: 16, maxWidth: 460, margin: "16px auto 34px", lineHeight: 1.7 }}>
              From conferences to celebrations, there's always something happening at Amaltas. Reach out to learn what's next.
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

      {/* ── EVENT GALLERY MODAL ── */}
      {open && (
        <div className="ev-modal-backdrop" onClick={() => setOpen(null)}>
          <div className="ev-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={open.title}>
            <button className="ev-modal-close" onClick={() => setOpen(null)} aria-label="Close">
              <X size={18} />
            </button>
            <div className="ev-modal-date"><CalendarDays size={13} /> {open.date}</div>
            <h2 className="ev-modal-title">{open.title}</h2>
            {open.desc && <p className="ev-modal-desc">{open.desc}</p>}
            {Array.isArray(open.gallery) && open.gallery.length > 0 && (
              <div className="ev-modal-gallery">
                {open.gallery.map((src, i) => (
                  <button key={src} className="ev-modal-thumb" onClick={() => setLightbox(i)} aria-label={`Open photo ${i + 1}`}>
                    <img src={src} alt={`${open.title} — photo ${i + 1}`} loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── FULL-SIZE LIGHTBOX ── */}
      {open && lightbox !== null && open.gallery && (
        <div className="ev-lightbox" onClick={() => setLightbox(null)}>
          <button className="ev-lightbox-close" onClick={() => setLightbox(null)} aria-label="Close photo">
            <X size={22} />
          </button>
          {open.gallery.length > 1 && (
            <button
              className="ev-lightbox-nav prev"
              onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + open.gallery.length) % open.gallery.length); }}
              aria-label="Previous photo"
            >
              <ChevronLeft size={26} />
            </button>
          )}
          <img className="ev-lightbox-img" src={open.gallery[lightbox]} alt={`${open.title} — photo ${lightbox + 1}`} onClick={(e) => e.stopPropagation()} loading="lazy" decoding="async" />
          {open.gallery.length > 1 && (
            <button
              className="ev-lightbox-nav next"
              onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % open.gallery.length); }}
              aria-label="Next photo"
            >
              <ChevronRight size={26} />
            </button>
          )}
          <div className="ev-lightbox-count">{lightbox + 1} / {open.gallery.length}</div>
        </div>
      )}
    </>
  );
}
