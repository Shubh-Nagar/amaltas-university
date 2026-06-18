import React, { useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { C } from "../theme.js";

export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export function PageHero({ eyebrow, title, sub, crumb, bg, bgImg, floatImg }) {
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

  const heroStyle = bgImg
    ? {
        background: `linear-gradient(to right, rgba(11,44,24,.82) 0%, rgba(11,44,24,.48) 100%), url('${bgImg}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : bg
    ? { background: bg }
    : undefined;

  return (
    <header className="page-hero" style={heroStyle}>
      <div className="hero-glow" style={{ width: 420, height: 420, background: "rgba(21,132,63,.4)", left: "-120px", top: "-10%" }} />
      <div className="hero-glow" style={{ width: 320, height: 320, background: "rgba(246,224,5,.2)", right: "4%", bottom: "-20%" }} />
      {floatImg && (
        <img
          ref={floatRef}
          src={floatImg}
          alt=""
          aria-hidden="true"
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
        <div className="crumb"><Link to="/">Home</Link> &nbsp;/&nbsp; {crumb}</div>
        {eyebrow && <span className="eyebrow" style={{ color: C.goldL }}>{eyebrow}</span>}
        <h1 style={{ marginTop: 14 }}>{title}</h1>
        {sub && <p>{sub}</p>}
      </div>
    </header>
  );
}
