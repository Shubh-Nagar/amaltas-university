import React from "react";
import { AlertCircle } from "lucide-react";
import { PageHero } from "../components/Layout.jsx";
import { Reveal } from "../components/Primitives.jsx";
import { C } from "../theme.js";
import SEO from "../components/SEO.jsx";
import { breadcrumbSchema } from "../data/schema.js";

const SECTIONS = [
  {
    title: "Online Payment Services",
    text: "Amaltas University enables Students/Parents to pay registration, application, or provisional fee online through the website of Amaltas University. All such Online Services shall be subject to these Terms and Conditions for Online Services, and Amaltas University shall be entitled at any time, without prior notice or any liability to you, to cancel or suspend the online fee payment services and/or to substitute alternative services, which may or may not be interactive or transactional in nature.",
  },
  {
    title: "Payment Information & Processing",
    text: "The credit card/debit card information supplied when using this service is processed by the payment gateway of the service provider and is not supplied to the University. The only information supplied to the University is the name of the payer, the bill/application number, and the amount of the payment. It is the sole responsibility of the user of this service to ensure that the information entered in the relevant fields is correct. It is recommended that you take and retain a copy of the transaction for record-keeping purposes, and to assist with the resolution of any disputes that may arise from use of this service. The fee deposited through Credit Card/Debit Card/Net Banking/UPI/Wallet will normally reach the respective University account after 2 working days. The University shall not be responsible for any unsettled payment due to any reason. The University shall also not be responsible if the payment is refused or declined by the credit/debit card supplier for any reason. The University does not warranty the availability of the online payment system at all times.",
  },
  {
    title: "Transaction Charges & Liability",
    text: "Online transaction charges are not part of the payment. The amount to be paid by the Students/Parents shall be computed and paid as specified on the payment page provided by the service provider. In respect of any failed transactions of any Customer processed through this service, the transaction failure charges payable, if any, to the Participating Banks in respect of the failed transactions shall be charged additionally. While availing any of the payment method(s) offered, the University is not responsible and will take no liability of whatsoever nature in respect of any loss or damage arising directly or indirectly to you out of: decline due to lack of authorization for any transaction(s); exceeding the preset limit mutually agreed between you and your Bank; any payment issues arising out of the transaction; or decline of transaction for any other reason(s).",
  },
  {
    title: "Processing Fees & Taxes",
    text: "Amaltas University does not charge any processing fee or service charges from students for online payment. However, students have to pay the transaction processing charges as applicable by the payment gateway service provider. GST and other tax(es), if any applicable, will be charged in addition (to be collected from the customer).",
  },
];

export default function TermsAndConditions() {
  return (
    <>
      <SEO
        title="Terms and Conditions — Amaltas University, Dewas"
        description="Terms and conditions governing the online payment service used for Registration Fee, Application Fee and Provisional Admission Fee payments at Amaltas University."
        path="/terms-and-conditions"
        jsonLd={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Terms and Conditions", path: "/terms-and-conditions" }])}
      />
      <PageHero
        crumb="Terms and Conditions"
        eyebrow="Legal"
        title="Terms and Conditions."
        sub="These Terms and Conditions govern the use of the online service for payment of Registration Fee, Application Fee and Provisional Admission Fee at Amaltas University."
        bgImg="/assets/images%20of%20university/photo-gallery/2U8A8968.jpg"
      />

      {/* INTRO STATEMENT */}
      <section className="sec wrap" style={{ paddingTop: 56 }}>
        <Reveal>
          <span className="eyebrow">Policy statement</span>
        </Reveal>

        <Reveal delay="d1">
          <div style={{
            marginTop: 24,
            background: "#fff",
            border: "1px solid rgba(11,44,24,.09)",
            borderLeft: `4px solid ${C.emerald}`,
            borderRadius: 20,
            padding: "38px 40px",
            boxShadow: "0 8px 40px -16px rgba(11,44,24,.14)",
          }}>
            <p style={{
              fontFamily: "Fraunces,serif",
              fontSize: 20,
              lineHeight: 1.7,
              color: C.ink,
              fontWeight: 500,
            }}>
              These Terms and Conditions are applicable for Amaltas University. These terms and conditions apply to the use of the online service for payment of Registration Fee/Application Fee/Provisional Admission Fee. Please read the terms and conditions carefully. You will be deemed to have accepted these terms and conditions by authorizing a payment through the online payment service. Amaltas University reserves the right to amend these terms and conditions at any time without notice. You should therefore re-read the terms and conditions each time this service is used.
            </p>
          </div>
        </Reveal>

        {/* Non-refundable note */}
        <Reveal delay="d2">
          <div style={{
            display: "flex",
            gap: 10,
            alignItems: "flex-start",
            marginTop: 24,
            padding: "16px 20px",
            background: "rgba(135,40,34,.06)",
            borderRadius: 12,
            border: "1px solid rgba(135,40,34,.2)",
          }}>
            <AlertCircle size={16} color={C.burg} style={{ flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontSize: 13.5, color: C.burg, lineHeight: 1.65 }}>
              <strong>Application Fee is strictly non-refundable</strong> under any circumstances, including but not limited to non-selection, withdrawal of application, duplicate payment, incorrect information submitted by the applicant, or change of mind by the applicant/student. Students/Parents are advised to verify all details carefully before making the payment.
            </p>
          </div>
        </Reveal>
      </section>

      {/* SECTIONS */}
      <section className="sec wrap" style={{ paddingTop: 8, maxWidth: 900 }}>
        <Reveal>
          <span className="eyebrow">Summary of key terms</span>
        </Reveal>

        <div style={{ marginTop: 24 }}>
          {SECTIONS.map((sec, si) => (
            <Reveal key={si} delay={`d${(si % 3) + 1}`}>
              <div style={{ marginBottom: 36 }}>
                <h2 style={{ fontSize: 20, color: C.ink, marginBottom: 12 }}>{sec.title}</h2>
                <p style={{ color: C.slate, fontSize: 15.5, lineHeight: 1.8, margin: 0 }}>{sec.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
