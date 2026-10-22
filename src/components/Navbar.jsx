import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  ArrowRight, Menu, X, ChevronDown, ChevronRight,
  Phone, Mail, Facebook, Instagram, Twitter, Youtube,
} from "lucide-react";
import { NAV } from "../data/content.js";

function ChildLink({ to, label }) {
  if (to === "#" || to.startsWith("#")) {
    return (
      <a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item">
        {label}
      </a>
    );
  }
  // External portals open in a new tab instead of going through the router.
  if (/^https?:\/\//.test(to)) {
    return (
      <a href={to} target="_blank" rel="noreferrer" className="dropdown-item">
        {label}
      </a>
    );
  }
  // A link to a section of a page (path#id): NavLink would mark every sibling
  // section link "active" on that page, so use a plain Link.
  if (to.includes("#")) {
    return (
      <Link to={to} className="dropdown-item">
        {label}
      </Link>
    );
  }
  return (
    <NavLink to={to} className="dropdown-item">
      {label}
    </NavLink>
  );
}

/* Desktop: an item with its own `children` opens a flyout beside the dropdown
   on hover or keyboard focus. */
function DesktopSubMenu({ label, items }) {
  return (
    <div className="dropdown-sub">
      <button type="button" className="dropdown-item dropdown-sub-btn" aria-haspopup="true">
        {label}
        <ChevronRight size={14} aria-hidden="true" />
      </button>
      <div className="dropdown-flyout" role="menu" aria-label={label}>
        {items.map((c, k) => <ChildLink key={k} to={c.to} label={c.label} />)}
      </div>
    </div>
  );
}

/* Mobile drawer: the same nested item expands in place. */
function MobileSubMenu({ label, items }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`mobile-subgroup${open ? " on" : ""}`}>
      <button type="button" className="dropdown-item mobile-subgroup-btn" aria-expanded={open} onClick={() => setOpen(!open)}>
        {label}
        <ChevronDown size={14} aria-hidden="true" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .3s" }} />
      </button>
      {open && (
        <div className="mobile-sub">
          {items.map((c, k) => <ChildLink key={k} to={c.to} label={c.label} />)}
        </div>
      )}
    </div>
  );
}

function DropdownEntry({ item, mobile }) {
  if (item.children) {
    const Sub = mobile ? MobileSubMenu : DesktopSubMenu;
    return <Sub label={item.label} items={item.children} />;
  }
  return <ChildLink to={item.to} label={item.label} />;
}

function MegaItem({ to, label, desc, icon: Icon }) {
  const inner = (
    <>
      <div className="mega-item-icon">{Icon && <Icon size={15} />}</div>
      <div>
        <span className="mega-item-label">{label}</span>
        {desc && <span className="mega-item-desc">{desc}</span>}
      </div>
    </>
  );
  if (to === "#" || to.startsWith("#")) {
    return <a href="#" onClick={(e) => e.preventDefault()} className="mega-item">{inner}</a>;
  }
  return <NavLink to={to} className="mega-item">{inner}</NavLink>;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [prog, setProg] = useState(0);
  const [open, setOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState(null);
  const loc = useLocation();
  const onHome = loc.pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      const sc = window.scrollY;
      setScrolled(sc > 60);
      const max = document.body.scrollHeight - window.innerHeight;
      setProg(max > 0 ? (sc / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setExpandedMobile(null);
  }, [loc.pathname, loc.hash]);

  // The drawer covers the viewport on phones: freeze the page behind it and let
  // the floating action buttons get out of its way. They live in App.jsx,
  // outside this tree, so the flag rides on <body>.
  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  const solid = scrolled || !onHome;

  // Publish the header's real height as --header-h so things that dock beneath
  // it (the homepage notice ticker) sit flush at every breakpoint and while the
  // top bar collapses on scroll, instead of guessing a pixel value per width.
  const navRef = useRef(null);
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const publish = () =>
      document.documentElement.style.setProperty("--header-h", `${Math.round(el.getBoundingClientRect().height)}px`);
    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      {/* Backdrop lives outside .nav on purpose: .nav.solid carries a
          backdrop-filter, which makes it the containing block for fixed
          descendants — a scrim nested inside would only cover the header. */}
      {open && (
        <div className="mobile-scrim" onClick={() => setOpen(false)} aria-hidden="true" />
      )}
    <div ref={navRef} className={`nav ${solid ? "solid" : ""}`}>
      {/* TOP INFO BAR — hidden when solid */}
      <div className="nav-topbar">
        <div className="nav-topbar-inner">
          <div className="nav-topbar-contacts">
            <a href="tel:+919977544111">
              <Phone size={12} /> +91 9977544111
            </a>
            <a href="mailto:registrar@amaltasuniversity.in">
              <Mail size={12} /> registrar@amaltasuniversity.in
            </a>
          </div>
          <div className="nav-topbar-right">
            <Link to="/iqac" className="topbar-pill">IQAC</Link>
            <div className="topbar-socials">
              <a href="https://www.facebook.com/people/Amaltas-University-Dewas/100092261027732/" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={14} /></a>
              <a href="https://www.instagram.com/amaltasuniversitydewas?igsh=MWVvOWw0MnBxNzE0dw==" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={14} /></a>
              <a href="https://x.com/AmaltasDewas" target="_blank" rel="noreferrer" aria-label="Twitter"><Twitter size={14} /></a>
              <a href="https://www.youtube.com/@AmaltasUniversity" target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube size={14} /></a>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <div className="navbar">
        <Link to="/" className="logo">
          <img
            src={
              solid
                ? "/assets/images%20of%20university/logo/Amaltas-University-Logo.webp"
                : "/assets/images%20of%20university/logo/white-logo.webp"
            }
            alt="Amaltas University"
            className="logo-img"
            style={{ width: "auto", objectFit: "contain" }}
          />
        </Link>

        <nav className="navlinks">
          {NAV.map((n, i) => (
            <div key={i} className="nav-item">
              {n.children ? (
                <>
                  <button className="nav-btn">
                    {n.label}
                    <ChevronDown size={13} className="nav-chevron" />
                  </button>
                  {n.mega ? (
                    <div className="mega-menu">
                      <div className="mega-header">
                        <div className="mega-header-title">About Amaltas University</div>
                        <div className="mega-header-sub">Where healing grows</div>
                      </div>
                      <div className="mega-items">
                        {n.children.map((c, j) => (
                          <MegaItem key={j} to={c.to} label={c.label} desc={c.desc} icon={c.icon} />
                        ))}
                      </div>
                      <div className="mega-footer">
                        <span className="mega-footer-tagline">Dewas, Madhya Pradesh</span>
                        <NavLink to="/about/university" className="mega-footer-link">
                          Explore the university <ArrowRight size={12} />
                        </NavLink>
                      </div>
                    </div>
                  ) : (
                    <div className="dropdown-menu">
                      <div className="dropdown-inner">
                        {n.children.map((c, j) => (
                          <DropdownEntry key={j} item={c} />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <NavLink
                  to={n.to}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {n.label}
                </NavLink>
              )}
            </div>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a
            href="https://admission.amaltasuniversity.in/"
            target="_blank"
            rel="noreferrer"
            className="btn btn-gold nav-apply"
          >
            <span className="nav-apply-full">Apply 2026–27</span>
            <span className="nav-apply-short">Apply</span>
            <ArrowRight size={16} />
          </a>
          <button
            className="burger"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* SCROLL PROGRESS */}
      <div className="nav-prog" style={{ width: `${prog}%` }} />

      {/* MOBILE FULL-SCREEN MENU */}
      {open && (
        <div className="mobile-menu">
          <Link to="/" className={loc.pathname === "/" ? "active" : ""}>
            Home
          </Link>
          {NAV.map((n, i) =>
            n.children ? (
              <div key={i} className={`mobile-group${expandedMobile === i ? " on" : ""}`}>
                <button
                  className="mobile-group-btn"
                  onClick={() =>
                    setExpandedMobile(expandedMobile === i ? null : i)
                  }
                >
                  {n.label}
                  <ChevronDown
                    size={16}
                    style={{
                      transform:
                        expandedMobile === i ? "rotate(180deg)" : "none",
                      transition: "transform .3s",
                    }}
                  />
                </button>
                {expandedMobile === i && (
                  <div className="mobile-sub">
                    {n.children.map((c, j) => (
                      <DropdownEntry key={j} item={c} mobile />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={i}
                to={n.to}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {n.label}
              </NavLink>
            )
          )}
          <div className="mobile-menu-footer">
            <a href="https://admission.amaltasuniversity.in/" target="_blank" rel="noreferrer" className="btn btn-gold" style={{ width: "100%", justifyContent: "center" }}>
              Apply 2026–27 <ArrowRight size={16} />
            </a>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
