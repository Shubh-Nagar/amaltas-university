import React from "react";
import { PageHero } from "../components/Layout.jsx";
import { Reveal } from "../components/Primitives.jsx";
import { C } from "../theme.js";

/* Content mirrored verbatim from https://amaltasuniversity.in/privacy-policy/ */
const SECTIONS = [
  {
    title: "1. About Us",
    items: [
      { type: "p", text: "“OAP Caller is a communication application designed to help users manage and review their own call logs and contact information for communication and productivity purposes.” The app serves individual communication needs rather than institutional monitoring, enabling users to securely access call history, initiate calls, and manage contacts on their device." },
    ],
  },
  {
    title: "2. Personal Data We Collect",
    items: [
      { type: "p", text: "The application gathers minimal information necessary for core features:" },
      { type: "p", label: "Call Logs:", text: "Incoming, outgoing, and missed call records including date, duration, and phone number are retrieved locally from the device to display call history within the app." },
      { type: "p", label: "Contacts:", text: "Device-stored contact names and phone numbers enable calling directly through the app." },
      { type: "p", label: "Phone State & Call Handling:", text: "Call status information (ringing, answered, ended) supports call-related functionality." },
      { type: "p", text: "The platform explicitly states: “We do not collect, upload, sell, or share call logs or contacts with third parties.”" },
    ],
  },
  {
    title: "3. Comments & User Input",
    items: [
      { type: "p", text: "When applicable, the service may collect IP addresses, browser type, and user-submitted content exclusively for spam detection and support purposes." },
    ],
  },
  {
    title: "4. Media Uploads",
    items: [
      { type: "p", text: "Users should avoid uploading images containing embedded location data, as other users might extract this EXIF GPS information if content is shared publicly." },
    ],
  },
  {
    title: "5. Cookies (Website Only)",
    items: [
      { type: "p", text: "Website cookies may store names, emails, and preferences. Login cookies persist up to two weeks with “Remember Me” selection enabled. Temporary cookies verify browser compatibility. The mobile app itself does not use cookies." },
    ],
  },
  {
    title: "6. Embedded Content from Other Websites",
    items: [
      { type: "p", text: "Third-party embedded videos or articles may collect data, use cookies, and track interactions following their respective privacy policies." },
    ],
  },
  {
    title: "7. Analytics",
    items: [
      { type: "p", text: "Anonymous analytics measure app performance and usage trends without including personal call logs or contact information." },
    ],
  },
  {
    title: "8. Data Sharing & Retention",
    items: [
      { type: "p", label: "Sharing:", text: "Personal data is not sold or shared; automated spam detection services may process comments if applicable." },
      { type: "p", label: "Retention:", text: "Call logs and contacts remain device-local only. Website comments or profile data may be retained indefinitely unless deletion is requested." },
    ],
  },
  {
    title: "9. User Rights",
    items: [
      { type: "p", text: "Users may request access, deletion (where legally permitted), or corrections to their personal data via support channels." },
    ],
  },
  {
    title: "10. Data Protection & Security",
    items: [
      { type: "p", text: "The service employs reasonable technical and organizational measures: minimal background data collection, restricted access authorization, and permission usage limited to essential functionality." },
    ],
  },
  {
    title: "11. Permissions Explanation (Google Play Compliance)",
    items: [
      { type: "p", text: "Required permissions serve user-initiated communication exclusively:" },
      {
        type: "list",
        list: [
          { label: "READ_CALL_LOG", text: "Display user call history" },
          { label: "READ_CONTACTS / READ_PHONE_NUMBERS", text: "Show contact list" },
          { label: "CALL_PHONE", text: "Enable call initiation" },
          { label: "ANSWER_PHONE_CALLS", text: "Manage call actions" },
          { label: "READ_PHONE_STATE", text: "Detect call status" },
        ],
      },
      { type: "p", text: "These permissions support caller app functionality without tracking, advertising, or surveillance purposes." },
    ],
  },
  {
    title: "12. Automated Decision-Making",
    items: [
      { type: "p", text: "“OAP Caller does not perform automated profiling or decision-making that affects users legally or significantly.”" },
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <PageHero
        crumb="Privacy Policy"
        eyebrow="Legal"
        title="Privacy Policy."
        sub="How your information is collected, used, and protected."
        bgImg="/assets/images%20of%20university/campus%20life/435A1853.JPG"
      />

      <section className="sec wrap" style={{ paddingTop: 70, maxWidth: 900 }}>
        {SECTIONS.map((sec, si) => (
          <Reveal key={si} delay={`d${(si % 3) + 1}`}>
            <div style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 22, color: C.ink, marginBottom: 16 }}>{sec.title}</h2>
              {sec.items.map((item, ii) =>
                item.type === "list" ? (
                  <ul key={ii} style={{ margin: "0 0 4px", paddingLeft: 22, display: "flex", flexDirection: "column", gap: 10 }}>
                    {item.list.map((li, li2) => (
                      <li key={li2} style={{ color: C.slate, fontSize: 16, lineHeight: 1.75 }}>
                        <strong style={{ color: C.ink }}>{li.label}</strong> &ndash; {li.text}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p key={ii} style={{ color: C.slate, fontSize: 16, lineHeight: 1.85, margin: "0 0 14px" }}>
                    {item.label && <strong style={{ color: C.ink }}>{item.label} </strong>}
                    {item.text}
                  </p>
                )
              )}
            </div>
          </Reveal>
        ))}
      </section>
    </>
  );
}
