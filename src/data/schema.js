import { SITE_URL } from "../components/SEO.jsx";
import { CONTACT, INSTITUTIONS, FAQS, LEADERS } from "./content.js";

const LOGO_URL = `${SITE_URL}/assets/images%20of%20university/our%20purpose/university.png`;

const SAME_AS = [
  "https://www.facebook.com/people/Amaltas-University-Dewas/100092261027732/",
  "https://www.instagram.com/amaltasuniversitydewas",
  "https://x.com/AmaltasDewas",
  "https://www.youtube.com/@AmaltasUniversity",
];

/** Root CollegeOrUniversity entity — reused (by @id reference) across every page. */
export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "CollegeOrUniversity",
  "@id": `${SITE_URL}/#organization`,
  name: "Amaltas University",
  alternateName: "Amaltas University Dewas",
  url: SITE_URL,
  logo: LOGO_URL,
  image: LOGO_URL,
  description:
    "Amaltas University, Dewas is a UGC-recognised private health-sciences university offering MBBS, BAMS, BHMS, B.Sc Nursing, B.Pharm and paramedical programmes across six institutions, anchored by a 1500+ bed teaching hospital.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Village Bangar, Dewas–Ujjain Highway",
    addressLocality: "Dewas",
    addressRegion: "Madhya Pradesh",
    postalCode: "455001",
    addressCountry: "IN",
  },
  telephone: `+91-${CONTACT.tollFree}`,
  email: CONTACT.email,
  sameAs: SAME_AS,
  department: INSTITUTIONS.map((inst) => ({
    "@type": "CollegeOrUniversity",
    name: inst.name,
    description: inst.desc,
  })),
};

/** WebSite schema with SearchAction — only needs to appear once (Home). */
export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Amaltas University",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

/** FAQPage schema built from the shared FAQS content (Home page). */
export const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/** BreadcrumbList schema — pass [{name, path}] in order from Home to current page. */
export function breadcrumbSchema(crumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };
}

/** Course schema for a single programme (used on Institutions/Admissions pages). */
export function courseSchema({ name, description, provider }) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    provider: {
      "@type": "CollegeOrUniversity",
      name: provider || "Amaltas University",
      sameAs: SITE_URL,
    },
  };
}

/** Person schema for a leadership message page. */
export function personSchema(slug) {
  const leader = LEADERS.find((l) => l.slug === slug);
  if (!leader) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: leader.nm,
    jobTitle: leader.role,
    affiliation: { "@id": `${SITE_URL}/#organization` },
    description: leader.bio,
    image: `${SITE_URL}${leader.photo}`,
  };
}
