import React, { useState } from "react";
import { Download, ShieldAlert, Loader2 } from "lucide-react";
import { PageHero } from "../components/Layout.jsx";
import { Reveal } from "../components/Primitives.jsx";
import { C } from "../theme.js";
import SEO from "../components/SEO.jsx";
import { WORKSHOPS } from "../data/workshops.js";
import { findRegistrant, generateCertificate } from "../lib/certificateMatch.js";

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
  const [workshopKey, setWorkshopKey] = useState("GCP");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [status, setStatus] = useState("idle"); // idle | checking | found | notfound | locked | error
  const [errorMsg, setErrorMsg] = useState("");
  const [certUrl, setCertUrl] = useState(null);
  const [certName, setCertName] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const attempts = readAttemptState();
    if (attempts.lockedUntil > Date.now()) {
      setStatus("locked");
      return;
    }

    setStatus("checking");
    setCertUrl(null);

    const workshop = WORKSHOPS[workshopKey];

    try {
      const registrant = await findRegistrant(workshop, email, mobile);

      if (!registrant) {
        const count = attempts.count + 1;
        const lockedUntil = count >= MAX_ATTEMPTS ? Date.now() + LOCKOUT_MS : 0;
        writeAttemptState({ count, lockedUntil });
        setStatus(lockedUntil ? "locked" : "notfound");
        return;
      }

      const fullName = registrant[workshop.nameKey];
      const blob = await generateCertificate(workshop, fullName);
      const url = URL.createObjectURL(blob);

      setCertUrl(url);
      setCertName(fullName);
      setStatus("found");
      writeAttemptState({ count: 0, lockedUntil: 0 });
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Something went wrong.");
      setStatus("error");
    }
  }

  const downloadFileName = certName
    ? `${certName.trim().replace(/\s+/g, "_")}_${workshopKey}_Certificate.pdf`
    : "certificate.pdf";

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
        sub="Select your workshop and enter the email and mobile number you registered with to download your certificate."
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

            <div className="field" style={{ gridColumn: "1/-1" }}>
              <label>Mobile Number<span style={{ color: "#c44", marginLeft: 3 }}>*</span></label>
              <input
                type="tel"
                inputMode="numeric"
                placeholder="10-digit mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                pattern="[0-9]{10}"
                maxLength={10}
                title="Enter a 10-digit mobile number"
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
                No registration found for these details. Double-check the workshop, email and mobile number.
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
            {status === "found" && certUrl && (
              <a href={certUrl} download={downloadFileName} className="btn btn-em">
                <Download size={16} /> Download Certificate
              </a>
            )}
          </div>
        </Reveal>
      </section>
    </>
  );
}
