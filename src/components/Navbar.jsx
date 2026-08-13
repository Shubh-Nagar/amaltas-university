import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  ArrowRight, Menu, X, ChevronDown,
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
  return (
    <NavLink to={to} className="dropdown-item">
      {label}
    </NavLink>
  );
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
  }, [loc.pathname]);

  const solid = scrolled || !onHome;

  return (
    <div className={`nav ${solid ? "solid" : ""}`}>
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
                ? "/assets/images%20of%20university/logo/Amaltas-University-Logo.jpg"
                : "/assets/images%20of%20university/logo/white-logo.png"
            }
            alt="Amaltas University"
            style={{ height: 68, width: "auto", objectFit: "contain" }}
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
                          <ChildLink key={j} to={c.to} label={c.label} />
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
            className="btn btn-gold"
            style={{ padding: "11px 20px", fontSize: 14 }}
          >
            Apply 2026–27 <ArrowRight size={16} />
          </a>
          <button
            className="burger"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
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
              <div key={i} className="mobile-group">
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
                      <ChildLink
                        key={j}
                        to={c.to}
                        label={c.label}
                      />
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
  );
}
