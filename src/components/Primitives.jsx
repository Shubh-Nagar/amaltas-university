import React, { useRef } from "react";
import { useInView, useCountUp } from "../hooks/useScroll.js";

/**
 * Scroll-reveal wrapper. Re-animates every time it enters the viewport.
 * variant: "" (rise up · default) | "left" | "right" | "zoom" | "img"
 *   - left/right slide in horizontally (good for text vs. image columns)
 *   - zoom scales up (good for cards/images)
 *   - img adds a clip-path + scale "image wipe" reveal
 */
export function Reveal({ children, cls = "", delay = "", variant = "" }) {
  const [ref, seen] = useInView();
  const v = variant ? `rv-${variant}` : "";
  return <div ref={ref} className={`rv ${v} ${delay} ${seen ? "in" : ""} ${cls}`}>{children}</div>;
}

export function Tilt({ children, className, style }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current, r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateY(${px * 9}deg) rotateX(${-py * 9}deg) translateY(-6px)`;
  };
  const reset = (e) => { e.currentTarget.style.transform = ""; };
  return (
    <div className="tilt-wrap">
      <div ref={ref} className={className} style={style} onMouseMove={onMove} onMouseLeave={reset}>
        {children}
      </div>
    </div>
  );
}

export function StatNum({ v, suf, run }) {
  const n = useCountUp(v, run);
  const fmt = v >= 1000 ? Math.round(n).toLocaleString() : Math.round(n);
  return <span className="num">{fmt}{suf}</span>;
}

/**
 * Letter-by-letter animated reveal.
 * Renders each character of `text` as a span with a staggered animation-delay.
 * Spaces are preserved as non-breaking spaces so layout is unchanged.
 *
 * Props:
 *   text       — the string to animate
 *   charDelay  — seconds between each letter (default 0.04s)
 *   startDelay — seconds before the first letter starts (default 0.2s)
 *   className / style — forwarded to the outer wrapper span
 */
export function LetterReveal({ text, className = "", style = {}, charDelay = 0.04, startDelay = 0.2 }) {
  return (
    <span className={className} style={style} aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="lr-char"
          style={{ animationDelay: `${(startDelay + i * charDelay).toFixed(3)}s` }}
          aria-hidden="true"
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}
