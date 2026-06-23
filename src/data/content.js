import {
  Microscope, GraduationCap, HeartPulse, FlaskConical, Stethoscope,
  Activity, Brain, Building2, Users, Award, Sparkles,
  Calendar, Download, MessageSquare, Newspaper, Image,
  FileText, ClipboardCheck, BadgeIndianRupee, CalendarClock,
  Trophy, Music, Dumbbell, BookOpen, Home as HomeIcon, HandHeart,
} from "lucide-react";

export const INSTITUTIONS = [
  {
    icon: Stethoscope, tag: "MBBS · MD · MS",
    name: "Amaltas Institute of Medical Sciences",
    desc: "A teaching hospital with 1500+ beds where students train beside practising clinicians from day one.",
    img: "/assets/images%20of%20university/all%20institutes/medical.png",
    studentImg: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=700&q=75",
    programs: ["M.B.B.S.", "MD / MS (various specialities)"],
  },
  {
    icon: HeartPulse, tag: "BAMS",
    name: "Amaltas Ayurvedic College & Research Centre",
    desc: "Classical Ayurveda met with modern research, clinical wards, and a dedicated herbal pharmacy.",
    img: "/assets/images%20of%20university/all%20institutes/ayurveda.png",
    studentImg: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=700&q=75",
    programs: ["B.A.M.S."],
  },
  {
    icon: Activity, tag: "BHMS",
    name: "Amaltas Institute of Homoeopathy",
    desc: "Evidence-informed homoeopathic medicine with an integrated outpatient department.",
    img: "/assets/images%20of%20university/all%20institutes/homoepathy.png",
    studentImg: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=700&q=75",
    programs: ["B.H.M.S."],
  },
  {
    icon: GraduationCap, tag: "B.Sc · PB B.Sc Nursing",
    name: "Amaltas Institute of Nursing Sciences",
    desc: "Simulation labs, the lamp-lighting tradition, and placements across the Amaltas hospital network.",
    img: "/assets/images%20of%20university/all%20institutes/nursing.jpeg",
    studentImg: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=700&q=75",
    programs: ["B.Sc. Nursing", "Post Basic B.Sc. Nursing"],
  },
  {
    icon: FlaskConical, tag: "B.Pharma · D.Pharma",
    name: "Amaltas Institute of Pharmacy",
    desc: "Formulation, pharmacology and analysis labs aligned to PCI standards and industry demand.",
    img: "/assets/images%20of%20university/all%20institutes/pharmacy.png",
    studentImg: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=700&q=75",
    programs: ["B.Pharma", "D.Pharma"],
  },
  {
    icon: Microscope, tag: "BPT · BMLT · DMLT",
    name: "Amaltas Institute of Paramedical Sciences",
    desc: "Hands-on allied health training in physiotherapy, imaging and laboratory technology.",
    img: "/assets/images%20of%20university/all%20institutes/paramedical.jpeg",
    studentImg: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?auto=format&fit=crop&w=700&q=75",
    programs: ["B.P.T.", "B.M.L.T.", "D.M.L.T."],
  },
  {
    icon: Brain, tag: "Clinical Psy · BASLP · PDCP",
    name: "Amaltas Allied & Rehabilitation Sciences",
    desc: "Speech, language, hearing and clinical psychology programmes with live rehabilitation clinics.",
    img: "/assets/images%20of%20university/all%20institutes/alied.jpg",
    studentImg: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=700&q=75",
    programs: ["B.Sc. Clinical Psychology (Hons)", "B.A.S.L.P.", "PDCP", "ISITEP (HI/ID)"],
  },
];

export const PROGRAMS = [
  { n: "M.B.B.S.", d: "Undergraduate Medicine", t: "Medical" },
  { n: "MD / MS", d: "Postgraduate Specialisation", t: "Medical" },
  { n: "B.A.M.S.", d: "Ayurvedic Medicine & Surgery", t: "Ayurveda" },
  { n: "B.H.M.S.", d: "Homoeopathic Medicine", t: "Homoeopathy" },
  { n: "B.Sc. Nursing", d: "Nursing Sciences", t: "Nursing" },
  { n: "B.Pharma / D.Pharma", d: "Pharmacy", t: "Pharmacy" },
  { n: "B.P.T.", d: "Physiotherapy", t: "Allied" },
  { n: "B.M.L.T. / D.M.L.T.", d: "Medical Lab Technology", t: "Allied" },
  { n: "B.A.S.L.P.", d: "Audiology & Speech-Language", t: "Allied" },
  { n: "B.Sc. Clinical Psychology (Hons)", d: "Rehabilitation Sciences", t: "Allied" },
];
export const FILTERS = ["All", "Medical", "Ayurveda", "Homoeopathy", "Nursing", "Pharmacy", "Allied"];

export const WHY = [
  { icon: Building2, img: "/assets/images%20of%20university/The%20Amaltas%20difference/hospital.jpg",     t: "Hospital-Embedded Learning", d: "A live superspeciality hospital is your classroom — real patients, real outcomes, from year one." },
  { icon: Users,                                                                                            t: "Mentors, Not Just Lecturers", d: "Renowned clinicians and scholars who know your name and shape your path." },
  { icon: Award,                                                                                            t: "Recognised & Accredited",    d: "Programmes structured to national regulatory standards across every health discipline." },
  { icon: Sparkles, img: "/assets/images%20of%20university/The%20Amaltas%20difference/scolarship.JPG",    t: "Scholarships That Reach",    d: "Merit and need-based aid so that talent — not tuition — decides who heals tomorrow." },
];

export const LEADERS = [
  { role: "Founder Chairman", nm: "Shri Suresh Singh Bhadoria", org: "Mayank Welfare Society", bio: "Visionary founder whose tireless dedication and philanthropic resolve laid the cornerstone of the Amaltas group and its mission to serve society.", photo: "/assets/images%20of%20university/leadership/suresh-sir.jpeg" },
  { role: "Chairman", nm: "Shri Mayankraj Singh Bhadoria", org: "Mayank Welfare Society", bio: "Founder-chairman whose vision built the Amaltas group from a single welfare society into a full health-sciences university.", photo: "/assets/images%20of%20university/leadership/mayank.jpeg" },
  { role: "Chancellor", nm: "Mrs. Aruna Bhadoria", org: "Amaltas University", bio: "Chancellor guiding the institution's commitment to accessible, community-rooted medical education.", photo: "/assets/images%20of%20university/leadership/Smt.Arunaji-Bhadoriya-Chancellor.jpg" },
  { role: "Pro-Chancellor", nm: "Dr. Salil Bhargava", org: "Amaltas University", bio: "Pro-Chancellor bringing decades of clinical and academic leadership to the university's growth.", photo: "/assets/images%20of%20university/leadership/salil-sir.jpg" },
  { role: "Vice Chancellor", nm: "Dr. RK Singh", org: "Amaltas University", bio: "Vice Chancellor overseeing academic standards, research and the student experience across all institutions." },
  { role: "Registrar", nm: "Dr. Abhay Gupta", org: "Amaltas University", bio: "Registrar responsible for governance, admissions integrity and university administration." },
];

export const VOICES = [
  { q: "I walked into a real hospital ward in my second month. Nowhere else gives you that. Amaltas didn't just teach me medicine — it made me a doctor patients trust.", n: "Final-year MBBS student", r: "Institute of Medical Sciences", photo: "/assets/images%20of%20university/testimonials/t1.JPG" },
  { q: "As a parent, I wanted my daughter safe and seen. The faculty call us by name. The campus feels like a family that happens to be world-class.", n: "Parent of a Nursing student", r: "Dewas, Madhya Pradesh", photo: "/assets/images%20of%20university/testimonials/t2.JPG" },
  { q: "The research culture surprised me. We were publishing and presenting before I expected to even understand the labs. The mentorship is the real differentiator.", n: "BAMS graduate", r: "Ayurvedic College & Research Centre", photo: "/assets/images%20of%20university/testimonials/435A1861.JPG" },
  { q: "From the lamp-lighting ceremony to my first clinical posting, I felt I belonged. The simulation labs prepared me for a career, not just an exam.", n: "B.Sc. Nursing student", r: "Institute of Nursing Sciences", photo: "/assets/images%20of%20university/testimonials/t3.JPG" },
];

export const STATS = [
  { v: 10, suf: "+", l: "Years shaping healers" },
  { v: 7, suf: "", l: "Health-science institutions" },
  { v: 10000, suf: "+", l: "Students" },
  { v: 200, suf: "+", l: "Faculty Members" },
];

export const NAV = [
  {
    label: "About Us",
    to: "/about/university",
    mega: true,
    children: [
      { to: "/about/university",     label: "The University",             desc: "Our story, vision & mission",  icon: Building2     },
      { to: "/about/leadership",     label: "Board of Management",        desc: "Trustees & governing council", icon: Users         },
      { to: "/about/chancellor",     label: "Chancellor's Message",       desc: "Words from our Chancellor",    icon: MessageSquare },
      { to: "/about/awards",         label: "Awards & Rankings",          desc: "Recognition & achievements",   icon: Trophy        },
      { to: "/about/accreditations", label: "Approvals & Accreditations", desc: "Regulatory body approvals",   icon: Award         },
      { to: "/about/disclosure",     label: "Mandatory Disclosure",       desc: "AISHE & UGC compliance",      icon: FileText      },
    ],
  },
  {
    label: "Admission & Fees",
    to: "/admissions",
    children: [
      { to: "/admissions", label: "Courses & Programs" },
      { to: "/admissions/procedure", label: "Procedure" },
      { to: "/admissions/fees", label: "Fee Details" },
      { to: "/admissions/eligibility", label: "Eligibility Criteria" },
      { to: "/admissions", label: "Scholarship" },
    ],
  },
  {
    label: "Institutions",
    to: "/institutions",
  },
  {
    label: "Student Life",
    to: "#",
    children: [
      { to: "#", label: "Campus Life" },
      { to: "#", label: "Sports & Recreation" },
      { to: "#", label: "Clubs & Societies" },
      { to: "#", label: "Hostel & Accommodation" },
    ],
  },
  {
    label: "Facilities",
    to: "#",
    children: [
      { to: "#", label: "Hospital & Clinical Training" },
      { to: "#", label: "Library" },
      { to: "#", label: "Laboratories" },
      { to: "#", label: "Sports Complex" },
    ],
  },
  {
    label: "Happenings",
    to: "#",
    children: [
      { to: "#", label: "Events" },
      { to: "#", label: "News & Press Releases" },
      { to: "#", label: "Photo Gallery" },
    ],
  },
  {
    label: "Quick Links",
    to: "#",
    children: [
      { to: "#", label: "Ph.D. Entrance 2026" },
      { to: "#", label: "IQAC" },
      { to: "#", label: "NCMSAP Certificates" },
      { to: "#", label: "Alumni Network" },
      { to: "#", label: "Grievances" },
    ],
  },
];

export const ANNOUNCEMENTS = [
  "Entrance Examination for Ph.D. Program 2026 — Register Now",
  "Admission Open for Academic Year 2026-27 — Apply Today",
  "Amaltas University achieves Guinness World Record — 35,000+ participants in a single mass yoga gathering",
];

export const QUICK_LINKS = [
  { label: "Photogallery", to: "#", icon: Image },
  { label: "Upcoming Events", to: "#", icon: Calendar, isNew: true },
  { label: "Ph.D. Entrance 2026", to: "#", icon: GraduationCap, isNew: true },
  { label: "IQAC", to: "#", icon: Award },
  { label: "News & Press Releases", to: "#", icon: Newspaper },
  { label: "NCMSAP Certificates", to: "#", icon: Download },
  { label: "Alumni Network", to: "#", icon: Users },
  { label: "Grievances", to: "#", icon: MessageSquare },
];

export const EVENTS = [
  {
    date: "Jun 21, 2026",
    tag: "विश्व कीर्तिमान",
    tagColor: "#F6A000",
    title: "इंडेक्स और अमलतास समूह ने 35 हजार से अधिक प्रतिभागियों के सामूहिक योग से बनाया विश्व कीर्तिमान",
    desc: "आयुष मंत्रालय के 'योग महोत्सव' कार्यक्रम में 51,000 रजिस्ट्रेशन के साथ 35,000+ प्रतिभागी शामिल हुए। पद्मश्री डॉ. एच.आर. नागेंद्र, कैबिनेट मंत्री कैलाश विजयवर्गीय एवं अन्य गणमान्य अतिथियों की उपस्थिति में ऐतिहासिक आयोजन संपन्न। प्रधानमंत्री नरेंद्र मोदी ने विशेष संदेश दिया।",
    img: "/assets/images%20of%20university/event%20and%20activites/yoga.jpg",
  },
  {
    date: "May 12, 2026",
    tag: "Nursing",
    tagColor: "#15843F",
    title: "समर्पण और संवेदनशीलता की मिसाल हैं हमारे नर्सिंग हीरोज — Nurses Day Celebration 💉🤍",
    desc: "Nurses Day Celebration के इस खास अवसर पर सभी नर्सेस को दिल से सम्मान और धन्यवाद। आपकी मेहनत, देखभाल और मुस्कान हर मरीज के लिए उम्मीद बनती है।",
    img: "/assets/images%20of%20university/event%20and%20activites/nurse.jpeg",
  },
  {
    date: "Apr 28, 2026",
    tag: "Wellness",
    tagColor: "#872822",
    title: "Lamp Lighting & Oath Taking Ceremony",
    desc: "A solemn and traditional ceremony marking new nursing students' entry into the healthcare profession, symbolising compassion and service.",
    img: "/assets/images%20of%20university/event%20and%20activites/lamp.jpeg",
  },
];

export const NEWS = [
  {
    date: "Jun 2026",
    title: "Ph.D. Entrance Examination 2026 Announced",
    desc: "Amaltas University announces entrance examinations for Ph.D. programs across Medical Sciences, Nursing, Pharmacy, and Allied Sciences.",
    tag: "Admissions",
    img: "/assets/images%20of%20university/campus%20life/2U8A2387.JPG",
  },
  {
    date: "May 2026",
    title: "Guinness World Record in Mass Yoga Achieved",
    desc: "The Amaltas group set a world record with over 35,000 participants in a single mass yoga gathering, celebrating wellness and community.",
    tag: "Achievement",
    img: "/assets/images%20of%20university/event%20and%20activites/yoga.jpg",
  },
  {
    date: "Apr 2026",
    title: "New Allied & Rehabilitation Sciences Labs Inaugurated",
    desc: "State-of-the-art rehabilitation and speech-language pathology labs inaugurated to support clinical training in allied health sciences.",
    tag: "Infrastructure",
    img: "/assets/images%20of%20university/event%20and%20activites/nurse.jpeg",
  },
];

export const FAQS = [
  {
    q: "How do I apply for admission to Amaltas University?",
    a: "You can apply online through our admissions portal or visit the campus directly. For assistance, call our helpline at +91 9404956221 or email registrar@amaltasuniversity.in. Our admissions team is available to guide you through every step.",
  },
  {
    q: "What hostel and accommodation facilities are available?",
    a: "Amaltas University provides separate, fully-equipped hostel facilities for male and female students. All hostels include 24/7 security, mess facilities with nutritious meals, Wi-Fi connectivity, and recreational amenities.",
  },
  {
    q: "Are scholarships and financial aid available?",
    a: "Yes, we offer a wide range of merit-based and need-based scholarships to support talented students. Government scholarships for SC/ST/OBC students are also facilitated. Visit our admissions office or the Scholarship section for eligibility details.",
  },
  {
    q: "How can I stay updated about university events and announcements?",
    a: "Follow our official social media channels on Facebook, Instagram, YouTube, and Twitter/X. You can also subscribe to our monthly newsletter for the latest news, events, and academic updates.",
  },
];

/* Audience-aware hero messaging — the "I am a…" chips drive this.
   Inspired by Medicaps' multi-angle hero, but user-controlled. */
export const AUDIENCES = {
  "Future Student": {
    line: "Seven institutions. One living teaching hospital. A university built so the people who will care for India learn by caring — from the very first day.",
    ctaLabel: "Begin your application",
    ctaTo: "/admissions",
  },
  Parent: {
    line: "A campus where your child is known by name — safe hostels, mentor-faculty, and a working hospital that turns ambition into a profession families can trust.",
    ctaLabel: "Explore fees & scholarships",
    ctaTo: "/admissions",
  },
  Researcher: {
    line: "Live clinical wards, AYUSH-to-allopathy breadth, and a Ph.D. culture where publishing begins early. Bring your questions to a hospital that never closes.",
    ctaLabel: "Discover research at Amaltas",
    ctaTo: "/why",
  },
  International: {
    line: "World-class medical education in the heart of Madhya Pradesh — globally aligned curricula, English-medium teaching, and a community that welcomes you home.",
    ctaLabel: "Talk to admissions",
    ctaTo: "/admissions",
  },
};

/* Admission quick-pathway tiles — Medicaps "How to Apply / Eligibility / Scholarships / Calendar" */
export const ADMISSION_PATHS = [
  { icon: FileText, label: "How to Apply", desc: "Step-by-step online application", to: "/admissions" },
  { icon: ClipboardCheck, label: "Eligibility Criteria", desc: "Programme-wise requirements", to: "/admissions" },
  { icon: BadgeIndianRupee, label: "Fees & Scholarships", desc: "Merit & need-based aid", to: "/admissions" },
  { icon: CalendarClock, label: "Important Dates", desc: "2026–27 admission calendar", to: "/admissions" },
];

/* Life at Amaltas — clickable campus-life grid (Medicaps "Life@MU" pattern) */
export const LIFE = [
  { icon: Dumbbell, label: "Sports & Athletics", tag: "Play", img: "/assets/images%20of%20university/campus%20life/sport.JPG" },
  { icon: Trophy, label: "Yoga & Wellness", tag: "World record", img: "/assets/images%20of%20university/event%20and%20activites/yoga.jpg" },
  { icon: Music, label: "Cultural Festivals", tag: "Celebrate", img: "/assets/images%20of%20university/event%20and%20activites/lamp.jpeg" },
  { icon: HomeIcon, label: "Hostels & Dining", tag: "Live", img: "/assets/images%20of%20university/campus%20life/435A1853.JPG" },
  { icon: BookOpen, label: "Library & Labs", tag: "Learn", img: "/assets/images%20of%20university/campus%20life/2U8A2387.JPG" },
  { icon: HandHeart, label: "Community Outreach", tag: "Serve", img: "/assets/images%20of%20university/event%20and%20activites/nurse.jpeg" },
];

/* Clinical & career network — honest health-sciences adaptation of Medicaps' placements/recruiters band */
export const OUTCOMES = [
  { v: "100%", l: "Clinical exposure from year one" },
  { v: "800+", l: "Teaching-hospital beds for training" },
  { v: "7", l: "Health-science disciplines under one campus" },
];
export const PARTNERS = [
  "Superspeciality Teaching Hospital", "District Health Network", "AYUSH Wellness Centres",
  "Rural Outreach Clinics", "Diagnostic & Imaging Labs", "Rehabilitation Centres",
];

export const CONTACT = {
  tollFree: "1800-571-2131",
  phone: "07272-482580",
  email: "registrar@amaltasuniversity.in",
  address: "Village Bangar, Dewas–Ujjain Highway, District Dewas, MP 455001",
};

/* ─── ABOUT US page data ─────────────────────────────────── */

export const UNIVERSITY_MILESTONES = [
  { year: "2013", title: "Foundation Laid", desc: "Shri Suresh Singh Bhadoria established Mayank Welfare Society, resolving to bring quality healthcare education to Dewas and the Malwa heartland." },
  { year: "2015", title: "Medical Sciences Opens", desc: "Institute of Medical Sciences admitted its first MBBS cohort, anchored by the founding 800+ bed teaching hospital — live clinical learning from day one." },
  { year: "2016", title: "BAMS & BHMS Institutes", desc: "Ayurvedic College & Research Centre and Institute of Homoeopathy launched, recognising India's plural healing traditions as equally worthy of academic excellence." },
  { year: "2017", title: "Nursing Institute Inaugurated", desc: "The lamp-lighting ceremony welcomed the first batch of B.Sc. Nursing students — a tradition that continues to define the Amaltas spirit." },
  { year: "2019", title: "Pharmacy & University Status", desc: "Institute of Pharmacy established. Madhya Pradesh gazette-notified Amaltas University, unifying all institutes under one academic umbrella." },
  { year: "2022", title: "Allied & Rehabilitation Sciences", desc: "A dedicated institute for speech-language pathology, clinical psychology, physiotherapy and medical imaging sciences joined the Amaltas family." },
  { year: "2024", title: "Guinness World Record", desc: "Over 35,000 participants gathered for a single mass yoga event — an unprecedented testament to community, wellness and Amaltas's spirit of togetherness." },
  { year: "2026", title: "Ph.D. Research Expansion", desc: "Doctoral programmes launched across all seven health disciplines, cementing Amaltas as a research-driven force in Indian health-sciences education." },
];

export const VISION_MISSION = {
  vision: "To be a premier health-sciences university recognised for producing compassionate, competent healers — rooted in India's plural medical traditions and prepared for the demands of global healthcare.",
  mission: [
    "Provide integrated health-sciences education blending classical Indian medicine with evidence-based modern practice.",
    "Deliver live hospital-embedded training from the very first year of every programme.",
    "Foster research, innovation and community service as inseparable from academic rigour.",
    "Make quality medical education accessible to talented students regardless of socioeconomic background.",
    "Build a campus culture where every student is known by name and mentored toward their fullest potential.",
  ],
  values: [
    { icon: HandHeart, t: "Compassion First",   d: "Every clinical interaction, every lesson, begins with the understanding that healing is a human act above all else." },
    { icon: Award,     t: "Academic Rigour",    d: "Standards that meet and exceed national regulatory benchmarks in every programme and every discipline." },
    { icon: Users,     t: "Community Service",  d: "Outreach clinics, wellness camps and rural health missions are woven into our academic calendar — not added as an afterthought." },
    { icon: Sparkles,  t: "Inclusive Excellence", d: "Merit-based and need-based scholarships ensure that talent — not tuition — determines who heals tomorrow." },
  ],
};

export const AWARDS = [
  {
    title: "Guinness World Record — Mass Yoga",
    year: "2024",
    org: "Guinness World Records",
    desc: "35,000+ participants joined a single mass yoga gathering under the AYUSH Ministry's Yoga Mahotsav programme — an unprecedented display of wellness and community that set a global record.",
    type: "World Record",
    color: "#F6A000",
    featured: true,
    number: "35,000+",
    img: "/assets/images%20of%20university/event%20and%20activites/yoga.jpg",
  },
  {
    title: "Excellence in Medical Education",
    year: "2023",
    org: "Government of Madhya Pradesh",
    desc: "Recognised for outstanding contribution to healthcare education and community health outreach across the Malwa region of central India.",
    type: "State Award",
    color: "#15843F",
  },
  {
    title: "Best Healthcare University — Central India",
    year: "2022",
    org: "Times Education Awards",
    desc: "Awarded in the category of Best Healthcare University for academic excellence, clinical infrastructure, and measurable student outcomes.",
    type: "Education Award",
    color: "#872822",
  },
  {
    title: "AYUSH Innovation Excellence",
    year: "2022",
    org: "Ministry of AYUSH, Government of India",
    desc: "Recognised for integrating classical Ayurveda and Homoeopathy with modern research methodologies to advance integrative medicine.",
    type: "National Award",
    color: "#15843F",
  },
];

export const ACCREDITATIONS = [
  { short: "NMC",    color: "#1B3E8F", logo: "/assets/images%20of%20university/recognisation/nmc.jpg",    name: "National Medical Commission",              desc: "Statutory recognition for MBBS and postgraduate medical programmes.",                    scope: "Institute of Medical Sciences"      },
  { short: "CCIM",   color: "#2E7D32", logo: "/assets/images%20of%20university/recognisation/ccim.png",      name: "Central Council of Indian Medicine",          desc: "Approval for Bachelor of Ayurvedic Medicine & Surgery (BAMS).",                          scope: "Ayurvedic College & Research Centre" },
  { short: "CCH",    color: "#6A1B9A", logo: "/assets/images%20of%20university/recognisation/ccrh.jpg",      name: "Central Council of Homoeopathy",              desc: "Recognition for BHMS programme under the national homeopathic regulatory framework.",     scope: "Institute of Homoeopathy"           },
  { short: "INC",    color: "#00695C", logo: "/assets/images%20of%20university/recognisation/inc-logo.png",  name: "Indian Nursing Council",                      desc: "Approval for B.Sc. Nursing and Post Basic B.Sc. Nursing programmes.",                    scope: "Institute of Nursing Sciences"      },
  { short: "PCI",    color: "#D84315", logo: "/assets/images%20of%20university/recognisation/pci-logo.png",  name: "Pharmacy Council of India",                   desc: "Affiliation for Bachelor of Pharmacy (B.Pharma) and Diploma in Pharmacy (D.Pharma).",    scope: "Institute of Pharmacy"              },
  { short: "RCI",    color: "#1565C0", logo: "/assets/images%20of%20university/recognisation/rci.png",       name: "Rehabilitation Council of India",             desc: "Approval for B.A.S.L.P. and allied rehabilitation science courses.",                     scope: "Allied & Rehabilitation Sciences"   },
  { short: "UGC",    color: "#0D1B5E", logo: "/assets/images%20of%20university/recognisation/ugc.png",       name: "University Grants Commission",                desc: "Recognition as a Private University under Section 2(f) of the UGC Act, 1956.",           scope: "University-wide"                   },
  { short: "MPUREC", color: "#6D4C41", logo: "/assets/images%20of%20university/recognisation/mppurc.jpg",    name: "MP Private University Regulatory Commission", desc: "Established under the MP Niji Vishwavidyalaya (Sthapana Aur Sanchalan) Adhiniyam.",    scope: "University-wide"                   },
  { short: "NABH",   color: "#880E4F", logo: "/assets/images%20of%20university/recognisation/nabh-logo.png", name: "Natl. Accreditation Board for Hospitals",     desc: "NABH-linked teaching hospital ensuring patient safety and quality care standards.",       scope: "Teaching Hospital"                  },
];

export const DISCLOSURE_SECTIONS = [
  {
    title: "University Profile",
    items: [
      { label: "Name of University",    value: "Amaltas University" },
      { label: "Tagline",               value: "Where Healing Grows" },
      { label: "Established",           value: "Notified under the Madhya Pradesh Private University Act" },
      { label: "Founding Society",      value: "Mayank Welfare Society" },
      { label: "Chancellor",            value: "Mrs. Aruna Bhadoria" },
      { label: "Pro-Chancellor",        value: "Dr. Salil Bhargava" },
      { label: "Vice Chancellor",       value: "Dr. RK Singh" },
      { label: "Registrar",             value: "Shri Sanjay Rambole" },
      { label: "Address",               value: "Village Bangar, Dewas–Ujjain Highway, District Dewas, Madhya Pradesh – 455001" },
      { label: "Website",               value: "www.amaltasuniversity.in" },
    ],
  },
  {
    title: "Academic Information",
    items: [
      { label: "Number of Institutes",       value: "7 Health-Science Institutes" },
      { label: "Programmes Offered",         value: "MBBS · MD/MS · BAMS · BHMS · B.Sc. Nursing · Post Basic B.Sc. Nursing · B.Pharma · D.Pharma · BPT · BMLT · DMLT · BASLP · B.Sc. Clinical Psychology (Hons)" },
      { label: "Teaching Hospital",          value: "1500+ bed Superspeciality Teaching Hospital (integrated on campus)" },
      { label: "Medium of Instruction",      value: "English (Hindi language support available)" },
      { label: "Academic Calendar",          value: "August – June (Annual System)" },
      { label: "Ph.D. Programmes",          value: "Available across all 7 health-science disciplines from 2026" },
    ],
  },
  {
    title: "Infrastructure",
    items: [
      { label: "Campus Location",      value: "Village Bangar, Dewas–Ujjain Highway, Dewas, MP" },
      { label: "Library",              value: "Central library with digital access, e-journals, and specialised medical databases" },
      { label: "Hostels",              value: "Separate, fully-equipped hostels for male and female students with 24/7 security" },
      { label: "Laboratories",         value: "Discipline-specific labs including anatomy, pharmacognosy, homoeopathic pharmacy, physiotherapy, simulation, and imaging" },
      { label: "Sports & Recreation",  value: "Sports grounds, gym, yoga centre, and cultural facilities" },
      { label: "Canteen & Dining",     value: "Multi-cuisine mess with nutritious meal plans; separate facilities for boys and girls hostels" },
    ],
  },
  {
    title: "Admissions & Contact",
    items: [
      { label: "General Enquiry",       value: "+91 9404956221" },
      { label: "BAMS Helpline",         value: "+91 7880154605" },
      { label: "Allied Sciences",       value: "+91 9617245556" },
      { label: "Office Number",         value: "07272-482580" },
      { label: "Toll Free",             value: "1800-571-2131" },
      { label: "Email",                 value: "registrar@amaltasuniversity.in" },
      { label: "Admissions Portal",     value: "Online application via official website" },
    ],
  },
];

export const CHANCELLOR_MESSAGE = {
  salutation: "Dear Friends,",
  paragraphs: [
    "At Amaltas University, we believe that the highest calling of any institution is not merely to teach, but to transform. When a young student walks through our gates, they carry with them the hopes of families, the dreams of communities, and the responsibility of a nation's health future.",
    "The name 'Amaltas' — the Indian laburnum — blooms in brilliant gold before it shades anyone. It gives first, without condition. That is the spirit we have tried to build here. Our seven institutes exist not as separate schools, but as one living ecosystem, each discipline in conversation with the others — much as the body itself works, as a whole.",
    "I am proud of what our students have achieved: the research they have pursued, the communities they have served in our outreach clinics, and the world record we set together in 2024 as thirty-five thousand souls breathed in unison. These moments remind us why we exist.",
    "Our teaching hospital is not a resource that supplements education — it is the education. From the first year, our students walk wards, observe procedures, and carry the weight of real responsibility. That is our promise and our method.",
    "As you explore Amaltas University, I invite you not only to study our programmes and infrastructure, but to feel our purpose. Come and see a campus where healing is not a subject — it is a way of life.",
  ],
  closing: "With faith in tomorrow's healers,",
  name: "Mrs. Aruna Bhadoria",
  role: "Chancellor, Amaltas University",
  photo: "/assets/images%20of%20university/leadership/Smt.Arunaji-Bhadoriya-Chancellor.jpg",
  quote: "Amaltas doesn't just teach medicine — it nurtures the spirit of service that medicine demands of every healer.",
};

export const VC_MESSAGE = {
  salutation: "Dear Students and Colleagues,",
  paragraphs: [
    "Excellence in health sciences demands that we walk the razor's edge between compassion and competence. At Amaltas, we have built a curriculum that refuses to separate the two — because a brilliant clinician who lacks empathy, and a caring doctor who lacks skill, are both insufficient.",
    "Our students learn beside practising clinicians from their very first year. They see, they feel, they understand — long before they are certified. That is the Amaltas pedagogy, and it is what sets our graduates apart.",
    "I am personally committed to raising our research culture, our faculty quality, and our institutional depth, so that an Amaltas degree is recognised not merely as a qualification, but as a mark of a trusted healer.",
  ],
  closing: "With respect and high expectations,",
  name: "Dr. RK Singh",
  role: "Vice Chancellor, Amaltas University",
  photo: null,
};

/* Assurance — answers the objections families actually weigh before saying yes.
   Concept copy; reuses facts already stated elsewhere in this file. */
export const ASSURANCE = [
  {
    icon: BadgeIndianRupee,
    t: "Scholarships & support",
    d: "Merit and need-based scholarships, plus guidance on education loans and government schemes — so a deserving student is never turned away by cost alone.",
  },
  {
    icon: FileText,
    t: "Transparent fees",
    d: "A clear, all-inclusive fee structure shared up front. No hidden charges — you know exactly what each year of study costs before you commit.",
  },
  {
    icon: HomeIcon,
    t: "Safe, separate hostels",
    d: "Fully-equipped, separate hostels for male and female students with 24/7 security, wardens, and a nutritious multi-cuisine mess on campus.",
  },
  {
    icon: HandHeart,
    t: "Anti-ragging & welfare",
    d: "A strict zero-tolerance anti-ragging policy, mentor-faculty for every student, and counselling support — a campus where every student is known by name.",
  },
  {
    icon: HeartPulse,
    t: "Care, around the clock",
    d: "A 1500+ bed superspeciality teaching hospital on campus means students live beside round-the-clock medical care, not far from it.",
  },
  {
    icon: Stethoscope,
    t: "Clinical training from day one",
    d: "Real wards, clinics, and labs from the first year — students graduate into a profession, not a job search, having already learned by caring.",
  },
];
