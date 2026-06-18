import React, { useRef, useEffect } from "react";

export default function HelixCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current;
    const ctx = cv.getContext("2d");
    let w, h, dpr;
    const mouse = { x: -9999, y: -9999 };
    const N = 90;
    let pts = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const init = () => {
      pts = Array.from({ length: N }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.6, gold: Math.random() > 0.62,
      }));
    };
    resize(); init();

    let helixT = 0, raf;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      helixT += 0.006;
      const cx = w * 0.72, span = Math.min(h * 0.8, 560), top = h / 2 - span / 2;
      for (let i = 0; i < 46; i++) {
        const p = i / 45;
        const y = top + p * span;
        const a = p * Math.PI * 4 + helixT;
        const amp = 80 + Math.sin(helixT + p * 6) * 10;
        const x1 = cx + Math.cos(a) * amp;
        const x2 = cx + Math.cos(a + Math.PI) * amp;
        const depth = (Math.sin(a) + 1) / 2;
        if (i % 2 === 0) {
          ctx.strokeStyle = `rgba(246,224,5,${0.05 + depth * 0.12})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.stroke();
        }
        ctx.fillStyle = `rgba(251,237,91,${0.25 + depth * 0.6})`;
        ctx.beginPath(); ctx.arc(x1, y, 2 + depth * 1.6, 0, 7); ctx.fill();
        ctx.fillStyle = `rgba(35,166,83,${0.25 + (1 - depth) * 0.6})`;
        ctx.beginPath(); ctx.arc(x2, y, 2 + (1 - depth) * 1.6, 0, 7); ctx.fill();
      }
      for (const p of pts) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 130) { p.x += (dx / dist) * 1.6; p.y += (dy / dist) * 1.6; }
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.fillStyle = p.gold ? "rgba(246,224,5,.7)" : "rgba(120,190,150,.2)";
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill();
      }
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const a = pts[i], b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120) {
            ctx.strokeStyle = `rgba(150,200,170,${0.04 * (1 - d / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    const move = (e) => {
      const r = cv.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    const leave = () => { mouse.x = -9999; mouse.y = -9999; };
    const onResize = () => { resize(); init(); };
    cv.addEventListener("mousemove", move);
    cv.addEventListener("mouseleave", leave);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      cv.removeEventListener("mousemove", move);
      cv.removeEventListener("mouseleave", leave);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return <canvas id="helix" ref={ref} />;
}
