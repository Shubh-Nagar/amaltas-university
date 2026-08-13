import React from "react";
import { PageHero } from "../components/Layout.jsx";
import { Reveal } from "../components/Primitives.jsx";
import { C } from "../theme.js";
import SEO from "../components/SEO.jsx";

/* Content mirrored verbatim from https://amaltasuniversity.in/privacy-policy-2/ */
const SECTIONS = [
  {
    title: "1. About Us",
    items: [
      { type: "p", text: "This Privacy Policy applies to Educational App, developed and operated by Emperor Solutions." },
      { type: "p", text: "The website address is https://amaltasuniversity.in/privacy-policy/, and the goal is to explain who you are and what visitors can expect from your site." },
      { type: "p", text: "Contact: superadminuni@amaltasuniversity.in" },
    ],
  },
  {
    title: "2. Personal Data Collection",
    items: [
      { type: "p", label: "Comments", text: "When users leave comments, the platform collects “data like the user's IP address, browser info, and any data entered in the comment form” to detect spam." },
      { type: "p", label: "Gravatar Service", text: "If users have a Gravatar, their anonymized email hash is used to check for a profile, and the user's profile picture displays with comments." },
    ],
  },
  {
    title: "3. Media",
    items: [
      { type: "p", text: "Visitors should not upload images with embedded location data (EXIF GPS), as others may download and extract that information." },
    ],
  },
  {
    title: "4. Cookies",
    items: [
      { type: "p", text: "Cookies save user preferences like name and email for convenience when commenting, lasting up to one year." },
      { type: "p", text: "Temporary cookies check browser cookie acceptance at login; login cookies store authentication and display preferences." },
      { type: "p", text: "“Remember Me” selections during login last for two weeks." },
    ],
  },
  {
    title: "5. Embedded Content",
    items: [
      { type: "p", text: "“Content from external websites (such as videos, articles) may be embedded, and these external sites may collect data, use cookies, and track interactions.”" },
    ],
  },
  {
    title: "6. Analytics",
    items: [
      { type: "p", text: "The site uses analytics to track user behavior." },
    ],
  },
  {
    title: "7. Data Sharing and Retention",
    items: [
      { type: "p", label: "Sharing:", text: "Comments are checked through automated spam detection." },
      { type: "p", label: "Retention:", text: "Comments and metadata are stored indefinitely; registered users can view and edit profile data." },
    ],
  },
  {
    title: "8. User Rights",
    items: [
      { type: "p", text: "Users can request personal data copies and request deletion unless legal retention applies." },
    ],
  },
  {
    title: "9. Data Protection",
    items: [
      { type: "p", text: "The organization commits to protecting user data, though specific safeguards and breach procedures aren't detailed." },
    ],
  },
  {
    title: "10. Automated Decision-Making",
    items: [
      { type: "p", text: "Automated profiling or decision-making must be disclosed with regulatory requirements." },
    ],
  },
];

export default function PrivacyPolicy2() {
  return (
    <>
      <SEO
        title="Privacy Policy — Educational App"
        description="Privacy policy for Amaltas University's Educational App, developed and operated by Emperor Solutions."
        path="/privacy-policy-2"
      />
      <PageHero
        crumb="Privacy Policy 2"
        eyebrow="Legal"
        title="Privacy Policy 2."
        sub="How your information is collected, used, and protected."
        bgImg="/assets/images%20of%20university/campus%20life/435A1853.JPG"
      />

      <section className="sec wrap" style={{ paddingTop: 70, maxWidth: 900 }}>
        {SECTIONS.map((sec, si) => (
          <Reveal key={si} delay={`d${(si % 3) + 1}`}>
            <div style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 22, color: C.ink, marginBottom: 16 }}>{sec.title}</h2>
              {sec.items.map((item, ii) => (
                <p key={ii} style={{ color: C.slate, fontSize: 16, lineHeight: 1.85, margin: "0 0 14px" }}>
                  {item.label && <strong style={{ color: C.ink }}>{item.label} </strong>}
                  {item.text}
                </p>
              ))}
            </div>
          </Reveal>
        ))}
      </section>
    </>
  );
}
