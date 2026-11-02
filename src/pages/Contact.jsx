import React, { useState } from "react";
import { Phone, Mail, Copy, Check, UserRound } from "lucide-react";
import { PageHero } from "../components/Layout.jsx";
import { Reveal } from "../components/Primitives.jsx";
import SEO from "../components/SEO.jsx";
import { breadcrumbSchema } from "../data/schema.js";
import { telHref, DIRECTORY } from "../data/contact.js";

// Copies `text`, flips to a tick for a moment so the click visibly registered.
function CopyBtn({ text, label }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    } catch {
      /* clipboard blocked (http / old browser) — the link beside it still works */
    }
  };
  return (
    <button type="button" className={`ct-copy ${done ? "is-done" : ""}`} onClick={copy} aria-label={`Copy ${label}`}>
      {done ? <Check size={14} /> : <Copy size={14} />}
      <span className="ct-copy-tip">{done ? "Copied" : "Copy"}</span>
    </button>
  );
}

// One phone number or email: tap to call / mail, plus a copy button.
function Line({ kind, value }) {
  const Icon = kind === "mail" ? Mail : Phone;
  const href = kind === "mail" ? `mailto:${value}` : telHref(value);
  return (
    <div className="ct-line">
      <a href={href} className="ct-line-link">
        <Icon size={15} />
        <span className="ct-line-val">{value}</span>
      </a>
      <CopyBtn text={value} label={value} />
    </div>
  );
}

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact Us — Amaltas University, Dewas"
        description="Telephone directory of Amaltas University, Dewas: phone numbers and email addresses of the Dean and Principals of the Medical, Nursing, Paramedical, Pharmacy, Ayurveda and Homoeopathy institutes."
        path="/contact"
        keywords="Amaltas contact, Amaltas University telephone directory, Amaltas Medical College phone number, Amaltas Dewas contact"
        jsonLd={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact Us", path: "/contact" }])]}
      />
      <PageHero
        crumb="Contact Us"
        eyebrow="Telephone Directory"
        title="Reach every institute directly."
        sub="Call or write to the Dean or Principal of any Amaltas institute — one tap to dial, one tap to email."
        bgImg="/assets/images%20of%20university/admissions-team.webp"
      />

      <section className="sec wrap" style={{ paddingTop: 90 }}>
        <Reveal>
          <span className="eyebrow">Institute directory</span>
          <h2 style={{ marginTop: 14 }}>Six institutes, one directory.</h2>
        </Reveal>

        <ol className="ct-grid">
          {DIRECTORY.map((d, i) => (
            <li key={d.institute} className="ct-card">
              <Reveal delay={`d${(i % 2) + 1}`}>
                <div className="ct-card-in">
                  <div className="ct-card-head">
                    <span className="ct-card-no">{String(i + 1).padStart(2, "0")}</span>
                    <h3>{d.institute}</h3>
                  </div>
                  <div className="ct-person">
                    <UserRound size={16} aria-hidden="true" />
                    <span>
                      <span className="ct-person-role">{d.role}</span>
                      <strong>{d.name}</strong>
                    </span>
                  </div>
                  <div className="ct-card-lines">
                    {d.phones.map((p) => <Line key={p} kind="tel" value={p} />)}
                    <Line kind="mail" value={d.email} />
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
