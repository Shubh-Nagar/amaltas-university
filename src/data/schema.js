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

/**
 * Degree catalogue backing the Course structured data.
 *
 * `alternateName` carries the fully expanded degree title on purpose: the
 * 2026-08-14 keyword research put "bams degree full form" at ~110K monthly
 * searches and "bsc nursing fees" at ~12.1K, and those expansions were
 * nowhere in the markup. Keep these strings accurate — they are public
 * claims about what the university awards.
 */
export const PROGRAMMES = [
  {
    code: "MBBS",
    name: "MBBS at Amaltas University",
    alternateName: "Bachelor of Medicine, Bachelor of Surgery (M.B.B.S.)",
    description:
      "A 4.5-year undergraduate medical degree followed by a one-year compulsory rotating internship, taught inside a 1500+ bed teaching hospital in Dewas, Madhya Pradesh. Admission is through NEET UG.",
    credential: "Bachelor's Degree",
    months: 66,
    institution: "Amaltas Institute of Medical Sciences",
  },
  {
    code: "BAMS",
    name: "BAMS at Amaltas University",
    alternateName: "Bachelor of Ayurvedic Medicine and Surgery (B.A.M.S.)",
    description:
      "A 4.5-year undergraduate Ayurveda degree with a one-year internship, combining classical Ayurvedic training with modern clinical research, dedicated wards and a herbal pharmacy. Admission is through NEET UG.",
    credential: "Bachelor's Degree",
    months: 66,
    institution: "Amaltas Ayurvedic College & Research Centre",
  },
  {
    code: "BHMS",
    name: "BHMS at Amaltas University",
    alternateName: "Bachelor of Homoeopathic Medicine and Surgery (B.H.M.S.)",
    description:
      "A 4.5-year undergraduate homoeopathy degree with a one-year internship, taught with an integrated outpatient department and evidence-informed clinical practice. Admission is through NEET UG.",
    credential: "Bachelor's Degree",
    months: 66,
    institution: "Amaltas Institute of Homoeopathy",
  },
  {
    code: "BScNursing",
    name: "B.Sc Nursing at Amaltas University",
    alternateName: "Bachelor of Science in Nursing (B.Sc Nursing)",
    description:
      "A four-year undergraduate nursing degree with supervised clinical rotations through a 1500+ bed teaching hospital. Open to candidates who have passed 10+2 with Physics, Chemistry and Biology.",
    credential: "Bachelor's Degree",
    months: 48,
    institution: "Amaltas Institute of Nursing Sciences",
  },
  {
    code: "BPharm",
    name: "B.Pharm at Amaltas University",
    alternateName: "Bachelor of Pharmacy (B.Pharm)",
    description:
      "A four-year undergraduate pharmacy degree covering pharmaceutics, pharmacology and pharmaceutical chemistry, with hospital and industry-facing laboratory training.",
    credential: "Bachelor's Degree",
    months: 48,
    institution: "Amaltas Institute of Pharmacy",
  },
  {
    code: "Paramedical",
    name: "Paramedical Sciences at Amaltas University",
    alternateName:
      "Paramedical degree programmes including BPT, BMLT and allied health sciences",
    description:
      "Undergraduate paramedical and allied-health programmes such as physiotherapy (BPT) and medical laboratory technology (BMLT), taught alongside a working superspeciality hospital.",
    credential: "Bachelor's Degree",
    months: 48,
    institution: "Amaltas Institute of Paramedical Sciences",
  },
];

/** One Course node, expanded from a PROGRAMMES entry. */
function programmeToCourse(p) {
  return {
    "@type": "Course",
    name: p.name,
    alternateName: p.alternateName,
    description: p.description,
    courseCode: p.code,
    educationalCredentialAwarded: p.credential,
    provider: { "@id": `${SITE_URL}/#organization` },
    // Google's Course rich result wants at least one delivery instance.
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "onsite",
      courseWorkload: `P${p.months}M`,
      location: {
        "@type": "Place",
        name: p.institution,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Dewas",
          addressRegion: "Madhya Pradesh",
          addressCountry: "IN",
        },
      },
    },
  };
}

/**
 * ItemList of every degree — eligible for Google's Course Carousel.
 * Use on hub pages that genuinely list all programmes (Institutions,
 * Admissions), not on individual pages.
 */
export const COURSE_CATALOG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Degree programmes at Amaltas University",
  itemListElement: PROGRAMMES.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: programmeToCourse(p),
  })),
};

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
