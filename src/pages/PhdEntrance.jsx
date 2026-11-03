import React from "react";
import { Download } from "lucide-react";
import { PageHero } from "../components/Layout.jsx";
import { Reveal } from "../components/Primitives.jsx";
import SEO, { SITE_URL } from "../components/SEO.jsx";
import { breadcrumbSchema } from "../data/schema.js";

const DIR = "/assets/docs/phd-entrance-2027";
const AD = `${DIR}/PhD-Entrance-2027-Advertisement`;
const APPLICATION_PDF = `${DIR}/PhD-Entrance-2027-Application-Form.pdf`;

export default function PhdEntrance() {
  return (
    <>
      <SEO
        title="Ph.D. Entrance 2027"
        description="Amaltas University Ph.D. Entrance Examination (batch January 2027) for Medical, Ayurveda, Homoeopathy, Nursing, Arts, Commerce, Management and Science. Entrance test on 20 December 2026 — download the application form."
        path="/phd-entrance-2027"
        image={`${SITE_URL}${AD}.jpg`}
        jsonLd={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Ph.D. Entrance 2027", path: "/phd-entrance-2027" }])}
      />
      <PageHero
        crumb="Ph.D. Entrance 2027"
        eyebrow="Admissions"
        title="Ph.D. Entrance 2027."
        sub="Applications are invited for the Ph.D. Entrance Examination."
        bgImg="/assets/images%20of%20university/all%20institutes/university.webp"
      />

      <section className="sec" style={{ background: "var(--paper)" }}>
        <div className="wrap" style={{ maxWidth: 860, textAlign: "center" }}>
          <a href={`${AD}.jpg`} target="_blank" rel="noopener noreferrer" style={{ display: "block" }}>
            <img
              src={`${AD}.webp`}
              alt="Advertisement: Entrance Examination for Ph.D. Program, December 2026, Amaltas University — last date 31/11/2026, entrance test 20/12/2026"
              width="1346" height="1667"
              style={{ width: "100%", height: "auto", display: "block", borderRadius: 16, border: "1px solid rgba(11,44,24,.1)", boxShadow: "0 24px 60px -30px rgba(11,44,24,.25)" }}
            />
          </a>

          <Reveal>
            <a href={APPLICATION_PDF} target="_blank" rel="noopener noreferrer" className="btn btn-em" style={{ gap: 10, marginTop: 32 }}>
              <Download size={18} /> Download Application
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
