import React, { useState } from "react";
import { Download, ShieldAlert, Loader2 } from "lucide-react";
import { PageHero } from "../components/Layout.jsx";
import { Reveal } from "../components/Primitives.jsx";
import { C } from "../theme.js";
import SEO from "../components/SEO.jsx";
import { WORKSHOPS } from "../data/workshops.js";
import { findRegistrants, generateCertificate } from "../lib/certificateMatch.js";

const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 5 * 60 * 1000;
const ATTEMPTS_KEY = "certDownloadAttempts";

function readAttemptState() {
  try {
    return JSON.parse(localStorage.getItem(ATTEMPTS_KEY)) || { count: 0, lockedUntil: 0 };
  } catch {
    return { count: 0, lockedUntil: 0 };
  }
}

function writeAttemptState(state) {
  try {
    localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(state));
  } catch {
    // localStorage unavailable — attempts just won't be rate-limited
  }
}

export default function CertificateDownload() {
  const [workshopKey, setWorkshopKey] = useState(Object.keys(WORKSHOPS)[0]);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | checking | found | notfound | locked | error
  const [errorMsg, setErrorMsg] = useState("");
  const [certs, setCerts] = useState([]); // [{ name, url }]

  async function handleSubmit(e) {
    e.preventDefault();

    const attempts = readAttemptState();
    if (attempts.lockedUntil > Date.now()) {
      setStatus("locked");
      return;
    }

    setStatus("checking");
    setCerts([]);

    const workshop = WORKSHOPS[workshopKey];

    try {
      const registrants = await findRegistrants(workshop, email);

      if (registrants.length === 0) {
        const count = attempts.count + 1;
        const lockedUntil = count >= MAX_ATTEMPTS ? Date.now() + LOCKOUT_MS : 0;
        writeAttemptState({ count, lockedUntil });
        setStatus(lockedUntil ? "locked" : "notfound");
        return;
      }

      const generated = [];
      for (const row of registrants) {
        const name = String(row[workshop.nameKey]).trim();
        const blob = await generateCertificate(workshop, name);
        generated.push({ name, url: URL.createObjectURL(blob) });
      }

      setCerts(generated);
      setStatus("found");
      writeAttemptState({ count: 0, lockedUntil: 0 });
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Something went wrong.");
      setStatus("error");
    }
  }

  const downloadFileName = (name) =>
    `${name.replace(/\s+/g, "_")}_${workshopKey}_Certificate.pdf`;

  return (
    <>
      <SEO
        title="Download Your Certificate"
        description="Verify your details to download your Amaltas University workshop certificate."
        path="/certificates"
        noindex
      />
      <PageHero
        crumb="Download Certificate"
        eyebrow="Certificate Portal"
        title="Get your certificate."
        sub="Select your workshop and enter the email you registered with to download your certificate."
      />

      <section className="sec wrap" style={{ paddingTop: 48, maxWidth: 560 }}>
        <Reveal>
          <form onSubmit={handleSubmit} className="alumni-form-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <div className="field" style={{ gridColumn: "1/-1" }}>
              <label>Workshop<span style={{ color: "#c44", marginLeft: 3 }}>*</span></label>
              <select value={workshopKey} onChange={(e) => setWorkshopKey(e.target.value)}>
                {Object.entries(WORKSHOPS).map(([key, w]) => (
                  <option key={key} value={key}>{w.label}</option>
                ))}
              </select>
            </div>

            <div className="field" style={{ gridColumn: "1/-1" }}>
              <label>Email Address<span style={{ color: "#c44", marginLeft: 3 }}>*</span></label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div style={{ gridColumn: "1/-1", marginTop: 8 }}>
              <button type="submit" className="btn btn-em" disabled={status === "checking"}>
                {status === "checking" ? <Loader2 size={16} className="spin" /> : <Download size={16} />}
                {status === "checking" ? "Checking…" : "Find My Certificate"}
              </button>
            </div>
          </form>
        </Reveal>

        <Reveal delay="d1">
          <div style={{ marginTop: 28 }}>
            {status === "notfound" && (
              <p style={{ color: C.slate, fontSize: 14.5, display: "flex", gap: 8, alignItems: "flex-start" }}>
                <ShieldAlert size={16} style={{ flexShrink: 0, marginTop: 2 }} />
                No registration found for these details. Double-check the workshop and email address.
              </p>
            )}
            {status === "locked" && (
              <p style={{ color: "#92400e", fontSize: 14.5, display: "flex", gap: 8, alignItems: "flex-start" }}>
                <ShieldAlert size={16} style={{ flexShrink: 0, marginTop: 2 }} />
                Too many attempts. Please try again in a few minutes, or contact the administration office.
              </p>
            )}
            {status === "error" && (
              <p style={{ color: "#92400e", fontSize: 14.5 }}>
                {errorMsg || "Something went wrong. Please try again shortly."}
              </p>
            )}
            {status === "found" && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12 }}>
                {certs.map(({ name, url }) => (
                  <a key={url} href={url} download={downloadFileName(name)} className="btn btn-em">
                    <Download size={16} /> {certs.length > 1 ? `Download – ${name}` : "Download Certificate"}
                  </a>
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </section>
    </>
  );
}
