import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Mail, ShieldCheck, Loader2, ArrowRight } from "lucide-react";
import { PageHero } from "../../components/Layout.jsx";
import { Reveal } from "../../components/Primitives.jsx";
import AlumniProfileForm from "../../components/AlumniProfileForm.jsx";
import { C } from "../../theme.js";
import SEO from "../../components/SEO.jsx";
import { breadcrumbSchema } from "../../data/schema.js";
import { ALUMNI_FIELDS, ALUMNI_EMAIL } from "../../data/alumniFields.js";
import { alumniApiEnabled, alumniRequest, readPhoto } from "../../lib/alumniApi.js";
import { alumniCard, FormError } from "./Registration.jsx";

/* Steps: email → code → edit → saved. The emailed code proves the visitor owns
   the registered address before any profile data is shown or changed. */
export default function UpdateProfile() {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [token, setToken] = useState("");
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [busy, setBusy] = useState(false);

  const run = async (fn) => {
    setBusy(true);
    setError("");
    try { await fn(); } finally { setBusy(false); }
  };

  const sendCode = (e) => {
    e?.preventDefault();
    run(async () => {
      const res = await alumniRequest("requestCode", { email });
      if (!res.ok) return setError(res.error);
      setCode("");
      setInfo(`If ${email.trim()} is registered with us, a 6-digit code is on its way. It's valid for 10 minutes — check your spam folder too.`);
      setStep("code");
    });
  };

  const verify = (e) => {
    e.preventDefault();
    run(async () => {
      const res = await alumniRequest("verify", { email, code });
      if (!res.ok) return setError(res.error);
      setToken(res.token);
      setProfile(res.profile);
      setInfo("");
      setStep("edit");
    });
  };

  const save = async (values, photoFile) => {
    setError("");
    const photo = photoFile ? await readPhoto(photoFile) : undefined;
    const res = await alumniRequest("update", { token, profile: values, photo });
    if (!res.ok) {
      setError(res.error);
      if (/expired/i.test(res.error || "")) setStep("email");
      return;
    }
    setProfile(res.profile);
    setStep("saved");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startOver = () => {
    setStep("email"); setCode(""); setToken(""); setProfile(null); setError(""); setInfo("");
  };

  return (
    <>
      <SEO
        title="Update Alumni Profile"
        description="Amaltas University alumni can update their registered profile — contact details, present status, qualifications and achievements — after verifying their email."
        path="/alumni/update-profile"
        jsonLd={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Alumni", path: "/alumni" }, { name: "Update Profile", path: "/alumni/update-profile" }])}
      />
      <PageHero
        crumb="Alumni / Update Profile"
        eyebrow="Update Profile"
        title="Keep your alumni profile up to date."
        sub="Moved city, changed roles or earned a new qualification? Update your details so your batchmates and the university can stay in touch."
        bgImg="/assets/images%20of%20university/campus%20life/2U8A2387.webp"
      />

      <section className="sec" style={{ background: "var(--paper)" }}>
        <div className="wrap" style={{ maxWidth: step === "edit" ? 880 : 600 }}>
          <Reveal>
            <div style={alumniCard}>
              {!alumniApiEnabled ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <h3 style={{ fontFamily: "Fraunces,serif", fontSize: 22, color: C.ink, margin: 0 }}>Online profile updates are coming soon</h3>
                  <p style={{ color: C.slate, fontSize: 15, lineHeight: 1.7, margin: 0 }}>
                    Until then, please email your updated details from your registered email address to{" "}
                    <a href={`mailto:${ALUMNI_EMAIL}?subject=Alumni%20Profile%20Update`} style={{ color: C.emerald, fontWeight: 600 }}>{ALUMNI_EMAIL}</a>.
                  </p>
                </div>
              ) : step === "email" ? (
                <form onSubmit={sendCode}>
                  <StepHead icon={Mail} title="Kindly enter your details" text="Enter the email address you registered with. We'll send you a one-time code to confirm it's you." />
                  <FormError>{error}</FormError>
                  <div className="field">
                    <label htmlFor="update-email">Registered Email <span style={{ color: "#c44" }}>*</span></label>
                    <input id="update-email" type="email" required maxLength={120} autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <SubmitButton busy={busy} label="Send verification code" />
                  <p style={{ color: C.slate, fontSize: 14, marginTop: 20, marginBottom: 0 }}>
                    Not registered yet? <Link to="/alumni/registration" style={{ color: C.emerald, fontWeight: 600 }}>Register here</Link>.
                  </p>
                </form>
              ) : step === "code" ? (
                <form onSubmit={verify}>
                  <StepHead icon={ShieldCheck} title="Enter your verification code" text={info} />
                  <FormError>{error}</FormError>
                  <div className="field">
                    <label htmlFor="update-code">6-digit code <span style={{ color: "#c44" }}>*</span></label>
                    <input
                      id="update-code" inputMode="numeric" autoComplete="one-time-code" required pattern="[0-9]{6}" maxLength={6}
                      placeholder="••••••" value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      style={{ letterSpacing: ".4em", fontSize: 20, textAlign: "center" }}
                    />
                  </div>
                  <SubmitButton busy={busy} label="Verify & continue" />
                  <div style={{ display: "flex", gap: 18, flexWrap: "wrap", marginTop: 20, fontSize: 14 }}>
                    <button type="button" onClick={sendCode} disabled={busy} style={linkBtn}>Resend code</button>
                    <button type="button" onClick={startOver} disabled={busy} style={linkBtn}>Use a different email</button>
                  </div>
                </form>
              ) : step === "edit" ? (
                <>
                  <StepHead
                    title={`Hello, ${profile.first_name}`}
                    text={<>Alumni ID <strong style={{ color: C.ink }}>{profile.id}</strong>. Edit your details below and save. Your email can't be changed here — write to {ALUMNI_EMAIL} for that.</>}
                  />
                  <FormError>{error}</FormError>
                  <AlumniProfileForm
                    fields={ALUMNI_FIELDS}
                    initial={profile}
                    locked={["email"]}
                    submitLabel="Save changes"
                    photoNote={profile.hasPhoto ? "A photo is already on file. Choose a new one only to replace it." : null}
                    onSubmit={save}
                  />
                </>
              ) : (
                <div style={{ textAlign: "center", padding: "24px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(18,134,63,.1)", display: "grid", placeItems: "center" }}>
                    <CheckCircle size={30} color={C.emerald} />
                  </div>
                  <h3 style={{ fontFamily: "Fraunces,serif", fontSize: 22, color: C.ink, margin: 0 }}>Your profile has been updated</h3>
                  <p style={{ color: C.slate, fontSize: 15, margin: 0 }}>Thank you, {profile.first_name}. Your changes have been saved.</p>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 6 }}>
                    <button type="button" className="btn btn-dark" onClick={() => setStep("edit")}>Make more changes</button>
                    <Link to="/alumni" className="btn btn-gold">Alumni Home <ArrowRight size={16} /></Link>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

const linkBtn = { background: "none", border: 0, padding: 0, color: C.emerald, fontFamily: "inherit", fontSize: 14, fontWeight: 600, cursor: "pointer", textDecoration: "underline" };

function StepHead({ icon: Icon, title, text }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h3 style={{ fontFamily: "Fraunces,serif", fontSize: 22, color: C.ink, display: "flex", alignItems: "center", gap: 10, margin: 0 }}>
        {Icon && <Icon size={20} color={C.emerald} />} {title}
      </h3>
      {text && <p style={{ color: C.slate, fontSize: 14.5, marginTop: 8, marginBottom: 0, lineHeight: 1.6 }}>{text}</p>}
    </div>
  );
}

function SubmitButton({ busy, label }) {
  return (
    <button type="submit" className="btn btn-em" disabled={busy} style={{ marginTop: 22, gap: 10, opacity: busy ? 0.75 : 1 }}>
      {busy && <Loader2 size={16} className="spin" />} {busy ? "Please wait…" : label}
    </button>
  );
}
