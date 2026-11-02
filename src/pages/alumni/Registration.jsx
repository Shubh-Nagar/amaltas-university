import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Camera, CheckCircle, ArrowRight } from "lucide-react";
import { PageHero } from "../../components/Layout.jsx";
import { Reveal } from "../../components/Primitives.jsx";
import AlumniForm from "../../components/AlumniForm.jsx";
import AlumniProfileForm from "../../components/AlumniProfileForm.jsx";
import { C } from "../../theme.js";
import SEO from "../../components/SEO.jsx";
import { breadcrumbSchema } from "../../data/schema.js";
import { ALUMNI_FIELDS, ALUMNI_EMAIL } from "../../data/alumniFields.js";
import { alumniApiEnabled, alumniRequest, readPhoto } from "../../lib/alumniApi.js";

export const alumniCard = {
  background: "#fff", borderRadius: 22, padding: "clamp(24px, 5vw, 40px)",
  border: "1px solid rgba(11,44,24,.08)",
  boxShadow: "0 24px 60px -30px rgba(11,44,24,.18)",
};

export function FormError({ children }) {
  if (!children) return null;
  return (
    <div role="alert" style={{ background: "#fdecea", color: "#8a1c12", border: "1px solid #f5c2bd", borderRadius: 12, padding: "12px 16px", fontSize: 14, marginBottom: 22 }}>
      {children}
    </div>
  );
}

export default function Registration() {
  const [error, setError] = useState("");
  const [doneId, setDoneId] = useState(null);

  const register = async (profile, photoFile) => {
    setError("");
    const photo = photoFile ? await readPhoto(photoFile) : undefined;
    const res = await alumniRequest("register", { profile, photo });
    if (res.ok) {
      setDoneId(res.id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setError(res.error || "Registration failed. Please try again.");
    }
  };

  return (
    <>
      <SEO
        title="Alumni Registration"
        description="Register with the Amaltas University Alumni Association — share your batch, current status and achievements to stay connected with the Amaltas family."
        path="/alumni/registration"
        jsonLd={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Alumni", path: "/alumni" }, { name: "Registration", path: "/alumni/registration" }])}
      />
      <PageHero
        crumb="Alumni / Registration"
        eyebrow="Alumni Registration"
        title="Join the Amaltas alumni network."
        sub="Register once to stay in touch with your batchmates, hear about reunions and events, and be part of the growing Amaltas family."
        bgImg="/assets/images%20of%20university/campus%20life/2U8A2387.webp"
      />

      <section className="sec" style={{ background: "var(--paper)" }}>
        <div className="wrap" style={{ maxWidth: 880 }}>
          <Reveal>
            <div style={alumniCard}>
              {doneId ? (
                <div style={{ textAlign: "center", padding: "24px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(18,134,63,.1)", display: "grid", placeItems: "center" }}>
                    <CheckCircle size={30} color={C.emerald} />
                  </div>
                  <h3 style={{ fontFamily: "Fraunces,serif", fontSize: 22, color: C.ink, margin: 0 }}>Welcome to the Amaltas alumni network!</h3>
                  <p style={{ color: C.slate, fontSize: 15, margin: 0 }}>Your Alumni ID is <strong style={{ color: C.ink }}>{doneId}</strong>. Please keep it for future reference.</p>
                  <p style={{ color: C.slate, fontSize: 14, margin: 0, maxWidth: 460, lineHeight: 1.6 }}>You can change your details at any time from Update Profile, using the email address you registered with.</p>
                  <Link to="/alumni/update-profile" className="btn btn-dark" style={{ marginTop: 6 }}>Update Profile <ArrowRight size={16} /></Link>
                </div>
              ) : (
                <>
                  <div style={{ marginBottom: 28 }}>
                    <h3 style={{ fontFamily: "Fraunces,serif", fontSize: 22, color: C.ink }}>Kindly enter the following details</h3>
                    <p style={{ color: C.slate, fontSize: 14, marginTop: 6, lineHeight: 1.6 }}>
                      All fields marked <span style={{ color: "#c44" }}>*</span> are required. Already registered? <Link to="/alumni/update-profile" style={{ color: C.emerald, fontWeight: 600 }}>Update your profile</Link>.
                    </p>
                  </div>
                  {alumniApiEnabled ? (
                    <>
                      <FormError>{error}</FormError>
                      <AlumniProfileForm fields={ALUMNI_FIELDS} submitLabel="Register" onSubmit={register} />
                    </>
                  ) : (
                    <>
                      <AlumniForm fields={ALUMNI_FIELDS.filter((f) => f.type !== "checkbox")} submitLabel="Alumni Registration" sendTo={ALUMNI_EMAIL} />
                      <p style={{ display: "flex", gap: 10, alignItems: "flex-start", color: C.slate, fontSize: 13.5, lineHeight: 1.6, marginTop: 22, marginBottom: 0 }}>
                        <Camera size={16} color={C.emerald} style={{ flexShrink: 0, marginTop: 2 }} />
                        <span>Submitting opens your email app with your details filled in. Please attach a recent photo to that email before sending it to {ALUMNI_EMAIL}.</span>
                      </p>
                    </>
                  )}
                </>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
