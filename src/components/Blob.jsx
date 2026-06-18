import React from "react";

/**
 * Morphing organic blob — decorative background element.
 * Uses CSS border-radius animation + translate drift.
 * variant: "a"|"b"|"c"|"d" — different morph + drift keyframe sets.
 * delay: negative animation-delay so the blob starts mid-cycle (no sync pop at load).
 */
export default function Blob({
  color = "rgba(21,132,63,.3)",
  size = 320,
  blur = 70,
  opacity = 1,
  variant = "a",
  delay = 0,
  style = {},
}) {
  return (
    <div
      className={`morphblob morphblob-${variant}`}
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        background: color,
        filter: `blur(${blur}px)`,
        opacity,
        animationDelay: `-${delay}s`,
        ...style,
      }}
    />
  );
}
