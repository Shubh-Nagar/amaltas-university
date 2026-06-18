import { useState, useEffect, useRef } from "react";

/**
 * Scroll-reveal hook.
 * - repeat:true (default) → toggles on every enter/leave, so animations
 *   replay each time the element scrolls back into view.
 * - repeat:false → fires once and stays revealed (legacy one-shot behaviour).
 */
export function useInView(options = {}) {
  const { threshold = 0.18, rootMargin = "0px 0px -8% 0px", repeat = true } = options;
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setSeen(true);
      else if (repeat) setSeen(false);
    }, { threshold, rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, repeat]);
  return [ref, seen];
}

export function useCountUp(target, run, dur = 1700) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf, start;
    const tick = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target]);
  return n;
}
