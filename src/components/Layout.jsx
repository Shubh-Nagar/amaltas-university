import React, { useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { C } from "../theme.js";

export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export function PageHero({ eyebrow, title, sub, crumb, bg, bgImg, floatImg, aside, children }) {
  const floatRef = useRef(null);

  useEffect(() => {
    if (!floatImg) return;
    const onScroll = () => {
      if (floatRef.current) {
        floatRef.current.style.transform = `translateX(${-window.scrollY * 0.45}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [floatImg]);

  // Uniform hero across every inner page: a relevant photo sitting *barely visible*
  // behind a light-green brand overlay (deep green anchors the text, fading to a
  // lighter emerald at the far edge). `bg` is still honoured as an explicit escape hatch.
  const HERO_OVERLAY =
    "linear-gradient(115deg, rgba(11,44,24,.95) 0%, rgba(16,58,34,.93) 42%, rgba(18,134,63,.88) 78%, rgba(35,166,83,.82) 100%)";
  const heroImg = bgImg || "/assets/images%20of%20university/all%20institutes/university.png";
  const heroStyle = bg
    ? { background: bg }
    : {
        background: `${HERO_OVERLAY}, url('${heroImg}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };

  return (
    <header className="page-hero" style={heroStyle}>
      <div className="hero-glow" style={{ width: 420, height: 420, background: "rgba(21,132,63,.4)", left: "-120px", top: "-10%" }} />
      <div className="hero-glow" style={{ width: 320, height: 320, background: "rgba(246,224,5,.2)", right: "4%", bottom: "-20%" }} />
      {children}
      {floatImg && (
        <img
          ref={floatRef}
          src={floatImg}
          alt=""
          aria-hidden="true"
          className="page-hero-float"
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            height: "92%",
            width: "auto",
            objectFit: "contain",
            objectPosition: "bottom right",
            zIndex: 1,
            pointerEvents: "none",
            willChange: "transform",
            userSelect: "none",
          }}
        />
      )}
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        {/* `aside` puts a companion panel beside the hero copy; without it the
            copy block renders exactly as before, full width. */}
        <div className={aside ? "hero-split" : undefined}>
          <div>
            <div className="crumb"><Link to="/">Home</Link> &nbsp;/&nbsp; {crumb}</div>
            {eyebrow && <span className="eyebrow" style={{ color: C.goldL }}>{eyebrow}</span>}
            <h1 style={{ marginTop: 14 }}>{title}</h1>
            {sub && <p>{sub}</p>}
          </div>
          {aside && <div className="hero-aside">{aside}</div>}
        </div>
      </div>
    </header>
  );
}
