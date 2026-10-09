// Amaltas brand tokens — official logo palette:
//   Primary  #12863F  deep green  (headers, buttons, links, key sections)
//   Accent   #F6E005  bright yellow (CTAs, highlights, icons, hover)
//   Secondary#872822  deep burgundy (secondary accents, borders, decorative)
// Keys are kept stable (navy/emerald/gold…) so the whole site re-themes from here.
export const C = {
  navy: "#0B2C18",    // deep forest green — premium dark base (hero, footer, page-hero)
  navy2: "#103A22",   // lifted deep green
  ink: "#0E2417",     // near-black green — body text + dark gradient ends
  emerald: "#12863F", // PRIMARY deep green
  emeraldL: "#23A653",// lighter primary green
  gold: "#F6E005",    // ACCENT bright yellow
  goldL: "#FBED5B",   // softer yellow
  burg: "#872822",    // SECONDARY burgundy
  burgL: "#A8392E",   // lighter burgundy
  ivory: "#F7F5EC",
  paper: "#FBFAF3",
  silver: "#C7CEC6",
  slate: "#56685B",
};

// Background for "talk to admissions" CTA cards — admissions-desk photo under a
// dark green overlay so ivory text stays readable.
export const admissionsCardBg = (angle = 135) => ({
  background: `linear-gradient(${angle}deg,rgba(11,44,24,.92) 0%,rgba(14,36,23,.82) 50%,rgba(14,36,23,.6) 100%), url("/assets/images of university/admissions-team.webp") center / cover no-repeat`,
});

export const iconBtn = {
  width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(11,44,24,.14)",
  background: "#fff", cursor: "pointer", display: "grid", placeItems: "center", color: C.ink,
};
