import {
  Microscope, GraduationCap, HeartPulse, FlaskConical, Stethoscope,
  Activity, Brain, Building2, Users, Award, Sparkles,
  Calendar, Download, MessageSquare, Newspaper, Image,
  FileText, ClipboardCheck, BadgeIndianRupee,
  Trophy, Music, Dumbbell, BookOpen, Home as HomeIcon, HandHeart,
  Leaf, Heart, Star,
} from "lucide-react";

export const INSTITUTIONS = [
  {
    icon: Stethoscope, tag: "MBBS · MD · MS",
    name: "Amaltas Institute of Medical Sciences",
    desc: "A teaching hospital with 1500+ beds where students train beside practising clinicians from day one.",
    img: "/assets/images%20of%20university/all%20institutes/medical.png",
    studentImg: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=700&q=75",
    programs: ["M.B.B.S.", "MD / MS", "DM / M.Ch."],
    website: "https://amaltasmedicalcollege.in/",
  },
  {
    icon: HeartPulse, tag: "BAMS",
    name: "Amaltas Ayurvedic College & Research Centre",
    desc: "Classical Ayurveda met with modern research, clinical wards, and a dedicated herbal pharmacy.",
    img: "/assets/images%20of%20university/all%20institutes/ayurveda.png",
    studentImg: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=700&q=75",
    programs: ["B.A.M.S."],
    website: "http://amaltasgroup.co.in/ayurvedic/",
  },
  {
    icon: Activity, tag: "BHMS",
    name: "Amaltas Institute of Homoeopathy",
    desc: "Evidence-informed homoeopathic medicine with an integrated outpatient department.",
    img: "/assets/images%20of%20university/all%20institutes/homoepathy.png",
    studentImg: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=700&q=75",
    programs: ["B.H.M.S."],
    website: "https://snow-parrot-499878.hostingersite.com/",
  },
  {
    icon: GraduationCap, tag: "B.Sc · PB B.Sc Nursing",
    name: "Amaltas Institute of Nursing Sciences",
    desc: "Simulation labs, the lamp-lighting tradition, and placements across the Amaltas hospital network.",
    img: "/assets/images%20of%20university/all%20institutes/nursing.jpeg",
    studentImg: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=700&q=75",
    programs: ["B.Sc. Nursing", "Post Basic B.Sc. Nursing", "M.Sc. Nursing", "GNM", "PhD Nursing"],
    website: "http://amaltasgroup.co.in/nursing/",
  },
  {
    icon: FlaskConical, tag: "B.Pharm · D.Pharm",
    name: "Amaltas Institute of Pharmacy",
    desc: "Formulation, pharmacology and analysis labs aligned to PCI standards and industry demand.",
    img: "/assets/images%20of%20university/all%20institutes/pharmacy.png",
    studentImg: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=700&q=75",
    programs: ["B.Pharm", "D.Pharm"],
    website: "http://amaltasgroup.co.in/pharmacy/",
  },
  {
    icon: Microscope, tag: "BPT · BMLT · DMLT",
    name: "Amaltas Institute of Paramedical Sciences",
    desc: "Hands-on allied health training in physiotherapy, imaging and laboratory technology.",
    img: "/assets/images%20of%20university/all%20institutes/paramedical.jpg",
    studentImg: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?auto=format&fit=crop&w=700&q=75",
    programs: [
      "B.P.T.", "B.M.L.T.", "B.X.R.T.", "D.M.L.T.",
      "Diploma in Cath Lab Technology", "Diploma in Dialysis Technology",
      "Certificate in OT Technician", "Certificate in X-Ray Technician", "Certificate in USG Technician",
    ],
    website: "http://amaltasgroup.co.in/paramedical/#close",
  },
  // Hidden — Allied & Rehabilitation Sciences institute temporarily unlisted.
  // {
  //   icon: Brain, tag: "Clinical Psy · BASLP · PDCP",
  //   name: "Amaltas Allied & Rehabilitation Sciences",
  //   desc: "Speech, language, hearing and clinical psychology programmes with live rehabilitation clinics.",
  //   img: "/assets/images%20of%20university/all%20institutes/alied.jpg",
  //   studentImg: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=700&q=75",
  //   programs: ["B.Sc. Clinical Psychology (Hons)", "B.A.S.L.P.", "PDCP", "ISITEP (HI/ID)"],
  //   website: "https://amaltasuniversity.in/courses/department-of-allied-rehabilitation-sciences/",
  // },
];

export const PROGRAMS = [
  { n: "M.B.B.S.", d: "Undergraduate Medicine · NEET UG", t: "Medical" },
  { n: "MD / MS", d: "Postgraduate Specialisation · NEET PG", t: "Medical" },
  // { n: "DM / M.Ch.", d: "Super-Specialisation · NEET SS", t: "Medical" },
  { n: "B.A.M.S.", d: "Ayurvedic Medicine & Surgery · NEET UG", t: "Ayurveda" },
  { n: "B.H.M.S.", d: "Homoeopathic Medicine & Surgery · NEET UG", t: "Homoeopathy" },
  { n: "B.Sc. Nursing", d: "Nursing Sciences · PNST", t: "Nursing" },
  { n: "Post Basic B.Sc. Nursing", d: "Nursing Sciences", t: "Nursing" },
  { n: "M.Sc. Nursing", d: "Postgraduate Nursing", t: "Nursing" },
  { n: "GNM", d: "General Nursing & Midwifery", t: "Nursing" },
  { n: "PhD Nursing", d: "Doctoral Nursing", t: "Nursing" },
  { n: "B.Pharm", d: "Pharmacy · 12th with PCB/PCM", t: "Pharmacy" },
  { n: "D.Pharm", d: "Diploma in Pharmacy · 12th with PCB/PCM", t: "Pharmacy" },
  { n: "B.P.T.", d: "Bachelor of Physiotherapy", t: "Paramedical" },
  { n: "B.M.L.T.", d: "Bachelor of Medical Lab Technology", t: "Paramedical" },
  { n: "B.X.R.T.", d: "Bachelor of X-Ray Technology", t: "Paramedical" },
  { n: "D.M.L.T.", d: "Diploma in Medical Lab Technology", t: "Paramedical" },
  { n: "Diploma in Cath Lab Technology", d: "Allied Health Sciences", t: "Paramedical" },
  { n: "Diploma in Dialysis Technology", d: "Allied Health Sciences", t: "Paramedical" },
  { n: "Certificate in OT Technician", d: "Allied Health Sciences", t: "Paramedical" },
  { n: "Certificate in X-Ray Technician", d: "Allied Health Sciences", t: "Paramedical" },
  { n: "Certificate in USG Technician", d: "Ultrasound Technician", t: "Paramedical" },
  // Hidden — Allied & Rehabilitation Sciences programmes temporarily unlisted.
  // { n: "B.Sc. Clinical Psychology (Hons)", d: "Rehabilitation Sciences", t: "Allied" },
  // { n: "B.A.S.L.P.", d: "Audiology & Speech-Language Pathology", t: "Allied" },
  // { n: "ISITEP (HI/ID)", d: "Hearing / Intellectual Disability Programmes", t: "Allied" },
  // { n: "PDCP", d: "Professional Diploma in Clinical Psychology", t: "Allied" },
];
export const FILTERS = ["All", "Medical", "Ayurveda", "Homoeopathy", "Nursing", "Pharmacy", "Paramedical" /* , "Allied" */];

export const DEPARTMENT_HIGHLIGHTS = [
  {
    id: "Medical",
    name: "Amaltas Institute of Medical Sciences",
    highlights: [
      { t: "Premier Medical Education Institution", d: "Established in 2016 to strengthen regional healthcare through quality medical education." },
      { t: "NMC-Recognized MBBS & MD/MS Programs", d: "Comprehensive undergraduate and postgraduate medical programs approved by NMC." },
      { t: "Extensive Clinical Training", d: "Hands-on learning through a 1400+ bed multispecialty teaching hospital." },
      { t: "Technology-Integrated & Patient-Centered Learning", d: "Modern curriculum combining advanced technology with traditional clinical skills." },
      { t: "Ethical & Compassionate Healthcare Professionals", d: "Focused on developing skilled doctors committed to lifelong learning and community well-being." },
    ],
  },
  {
    id: "Ayurveda",
    name: "Amaltas Institute of Ayurveda",
    highlights: [
      { t: "NCISM-Approved Excellence", d: "Indian System of Medicine (NCISM), professional B.A.M.S. education combined with rigorous clinical standards." },
      { t: "100-Bed Fully Functional Ayurvedic Hospital", d: "Comprehensive in-patient (IPD) and out-patient (OPD) facilities providing intensive medical training and high patient exposure." },
      { t: "Advanced Panchakarma Therapy & Research Unit", d: "Equipped with a specialized state-of-the-art Panchakarma center providing complete traditional detoxification, rejuvenation, and hands-on clinical mastery." },
      { t: "Integrated & Evidence-Based Learning", d: "Merging traditional Ayurvedic principles with modern medical advancements, backed by full-scale anatomy and physiology laboratories." },
      { t: "Ethical Healthcare Professionals", d: "Deeply committed to nurturing skilled Ayurvedic physicians, prioritizing community well-being, lifestyle disorders management, and lifelong clinical learning." },
    ],
  },
  {
    id: "Homoeopathy",
    name: "Amaltas Institute of Homoeopathy",
    highlights: [
      { t: "Premier Homoeopathic Medical Education Institution, Established in 2024", d: "Dedicated to strengthening regional healthcare through quality homoeopathic medical education and patient care." },
      { t: "NCH, Government of India-Recognized BHMS Program", d: "Comprehensive undergraduate homoeopathic medical education approved by the National Commission for Homoeopathy (NCH)." },
      { t: "Extensive Clinical Training & Hands-on Learning", d: "Practical clinical exposure through an attached 50-bed teaching hospital, community outreach programs, and supervised patient care." },
      { t: "Technology-Integrated & Patient-Centered Learning", d: "Modern curriculum combining advanced educational technology with classical homoeopathic principles and clinical skills." },
      { t: "Ethical & Compassionate Healthcare Professionals", d: "Focused on developing competent homoeopathic physicians committed to lifelong learning, research, and community well-being." },
    ],
  },
  {
    id: "Nursing",
    name: "Amaltas Institute of Nursing Sciences",
    highlights: [
      { t: "Premier Nursing Education Institution", d: "Established in 2016 to strengthen regional healthcare through quality Nursing education." },
      { t: "INC & MPNRC Recognized Programs", d: "Comprehensive undergraduate and postgraduate Nursing programs approved by INC & MPNRC." },
      { t: "Extensive Clinical Training", d: "Hands-on learning through a 1400+ bed multispecialty teaching hospital." },
      { t: "Technology-Integrated & Patient-Centered Learning", d: "Modern curriculum combining advanced technology with traditional clinical skills." },
      { t: "Ethical & Compassionate Healthcare Professionals", d: "Focused on developing skilled Nursing Faculty committed to lifelong learning and community well-being." },
    ],
  },
  {
    id: "Pharmacy",
    name: "Amaltas Institute of Pharmacy",
    highlights: [
      { t: "Premier Pharmacy Education Institution", d: "Established in 2023 to strengthen regional healthcare through quality Pharmacy education." },
      { t: "Pharmacy Council of India", d: "Courses and curriculum are approved by PCI." },
      { t: "Extensive Clinical Training", d: "Hands-on learning through a 1400+ bed multispecialty teaching hospital." },
      { t: "Technology-Integrated & Patient-Centered Learning", d: "Modern curriculum combining advanced technology with traditional clinical skills." },
      { t: "Ethical & Compassionate Healthcare Professionals", d: "Focused on developing skilled pharmacists committed to lifelong learning and community well-being." },
    ],
  },
  {
    id: "Paramedical",
    name: "Amaltas Institute of Paramedical Sciences",
    highlights: [
      { t: "Premier Paramedical Education Institution", d: "Established in 2016 to strengthen regional healthcare through quality medical education." },
      { t: "Affiliated to Madhya Pradesh Paramedical Council, Bhopal", d: "Courses recognised under the state paramedical council." },
      { t: "Extensive Clinical Training", d: "Hands-on learning through a 1400+ bed multispecialty teaching hospital." },
      { t: "Technology-Integrated & Patient-Centered Learning", d: "A future-ready curriculum designed to develop competent, skilled, and confident healthcare professionals." },
      { t: "Ethical & Compassionate Healthcare Professionals", d: "Focused on developing skilled healthcare professionals committed to lifelong learning and community well-being." },
    ],
  },
  // Hidden — Allied & Rehabilitation Sciences department temporarily unlisted.
  // {
  //   id: "Allied",
  //   name: "Department of Allied & Rehabilitation Sciences",
  //   highlights: [
  //     { t: "Recognized by the Rehabilitation Council of India (RCI)", d: "Ensures that rehabilitation and special education programs meet national standards and prepare qualified rehabilitation professionals." },
  //     { t: "Professional Registration Opportunities", d: "Eligible graduates from approved programs can seek registration in the Central Rehabilitation Register (CRR), enhancing professional credibility and employability." },
  //     { t: "Industry-Oriented Curriculum", d: "Programs aligned with RCI guidelines and disability rehabilitation standards." },
  //     { t: "Multidisciplinary Learning Environment", d: "Integration of rehabilitation sciences, psychology, special education, speech and hearing, disability studies, and community rehabilitation." },
  //   ],
  // },
];

export const WHY = [
  { icon: Building2, img: "/assets/images%20of%20university/The%20Amaltas%20difference/hospital.jpg",     t: "Hospital-Embedded Learning", d: "A live superspeciality hospital is your classroom — real patients, real outcomes, from year one." },
  { icon: Users,     img: "/assets/images%20of%20university/photo-gallery/2U8A1767.jpg",                   t: "Mentors, Not Just Lecturers", d: "Renowned clinicians and scholars who know your name and shape your path." },
  { icon: Award,     img: "/assets/images%20of%20university/recognisations.png",                          t: "Recognised & Accredited",    d: "Programmes structured to national regulatory standards across every health discipline." },
  { icon: Sparkles, img: "/assets/images%20of%20university/The%20Amaltas%20difference/scolarship.JPG",    t: "Scholarships That Reach",    d: "Merit and need-based aid so that talent — not tuition — decides who heals tomorrow." },
];

export const LEADERS = [
  { slug: "founder-chairman", role: "Hon'ble Founder Chairman", nm: "Shri Suresh Singh Bhadoria", org: "Mayank Welfare Society", bio: "Founder-chairman whose vision built the Amaltas group from a single welfare society into a full health-sciences university.", photo: "/assets/images%20of%20university/leadership/suresh-sir.jpeg" },
  { slug: "chairman", role: "Hon'ble Chairman", nm: "Shri Mayankraj Singh Bhadoria", org: "Mayank Welfare Society", bio: "Visionary founder whose tireless dedication and philanthropic resolve laid the cornerstone of the Amaltas group and its mission to serve society.", photo: "/assets/images%20of%20university/leadership/mayank.jpeg" },
  { slug: "chancellor", role: "Hon'ble Chancellor", nm: "Mrs. Aruna Bhadoria", org: "Amaltas University", bio: "Chancellor guiding the institution's commitment to accessible, community-rooted medical education.", photo: "/assets/images%20of%20university/leadership/Smt.Arunaji-Bhadoriya-Chancellor.jpg" },
  { slug: "pro-chancellor", role: "Hon'ble Pro-Chancellor", nm: "Dr. Salil Bhargava", org: "Amaltas University", bio: "Pro-Chancellor bringing decades of clinical and academic leadership to the university's growth.", photo: "/assets/images%20of%20university/leadership/salil-sir.png" },
  { slug: "vice-chancellor", role: "Hon'ble Vice Chancellor", nm: "Dr. R.K. Singh", org: "Amaltas University", bio: "Vice Chancellor overseeing academic standards, research and the student experience across all institutions.", photo: "/assets/images%20of%20university/leadership/vc-sir.jpeg" },
  { slug: "registrar", role: "Registrar", nm: "Dr. Abhay Gupta", org: "Amaltas University", bio: "Registrar responsible for governance, admissions integrity and university administration.", photo: "/assets/images%20of%20university/leadership/registrar-sir.jpeg" },
];

export const VOICES = [
  { q: "I walked into a real hospital ward in my second month. Nowhere else gives you that. Amaltas didn't just teach me medicine — it made me a doctor patients trust.", n: "Final-year MBBS student", r: "Institute of Medical Sciences", photo: "/assets/images%20of%20university/testimonials/t1.JPG" },
  { q: "I came from a small town and was nervous at first, but the faculty know me by name and the labs stay open whenever I want extra practice. The campus feels like a family that happens to be world-class.", n: "B.Pharm student", r: "Institute of Pharmacy", photo: "/assets/images%20of%20university/testimonials/t2.JPG" },
  { q: "The research culture surprised me. We were publishing and presenting before I expected to even understand the labs. The mentorship is the real differentiator.", n: "BAMS graduate", r: "Ayurvedic College & Research Centre", photo: "/assets/images%20of%20university/testimonials/435A1861.JPG" },
  { q: "From the lamp-lighting ceremony to my first clinical posting, I felt I belonged. The simulation labs prepared me for a career, not just an exam.", n: "B.Sc. Nursing student", r: "Institute of Nursing Sciences", photo: "/assets/images%20of%20university/testimonials/t3.JPG" },
];

export const STATS = [
  { v: 10, suf: "+", l: "Years shaping healers" },
  { v: 6, suf: "", l: "Health-science institutions" },
  { v: 3000, suf: "+", l: "Students" },
  { v: 400, suf: "+", l: "Faculty Members" },
];

export const NAV = [
  {
    label: "About Us",
    to: "/about/university",
    mega: true,
    children: [
      { to: "/about/university",     label: "The University",             desc: "Our story, vision & mission",  icon: Building2     },
      { to: "/leadership",           label: "Leadership",                 desc: "Board, chancellors & messages", icon: Users         },
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
      // { to: "/admissions", label: "Scholarship" },
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
      { to: "/student-life/campus-life", label: "Campus Life" },
      { to: "/student-life/hostel", label: "Hostel & Accommodation" },
    ],
  },
  {
    label: "Facilities",
    to: "#",
    children: [
      { to: "/facilities/academic", label: "Academic Facilities" },
      { to: "/facilities/campus", label: "Campus Facilities" },
    ],
  },
  {
    label: "Happenings",
    to: "#",
    children: [
      { to: "/happenings/events", label: "Events" },
      { to: "/happenings/news", label: "News & Press Releases" },
      { to: "/happenings/photo-gallery", label: "Photo Gallery" },
    ],
  },
  {
    label: "Alumni",
    to: "/alumni",
    children: [
      { to: "/alumni",              label: "Alumni Home"     },
      { to: "/alumni/leadership",   label: "Leadership"      },
      { to: "/alumni/engage",       label: "Engage"          },
      { to: "/alumni/assist",       label: "Alumni Assist"   },
      { to: "/alumni/achievers",    label: "Alumni Achievers"},
      { to: "/alumni/giving-back",  label: "Giving Back"     },
    ],
  },
];

export const ANNOUNCEMENTS = [
  "Admission Open for Academic Year 2026-27 — Apply Today",
  "Amaltas University sets a World Record — 35,000+ participants in a single mass yoga gathering",
  { text: "International Journal of Rural Health & Medicine Website Launch — Visit at ", linkText: "www.ijrhm.com", href: "https://www.ijrhm.com" },
];

export const QUICK_LINKS = [
  { label: "Photogallery", to: "#", icon: Image },
  { label: "Upcoming Events", to: "#", icon: Calendar, isNew: true },
  { label: "Ph.D. Entrance 2026", to: "#", icon: GraduationCap, isNew: true },
  { label: "IQAC", to: "/iqac", icon: Award },
  { label: "News & Press Releases", to: "#", icon: Newspaper },
  { label: "NCMSAP Certificates", to: "#", icon: Download },
  { label: "Alumni Network", to: "/alumni", icon: Users },
  { label: "Grievances", to: "#", icon: MessageSquare },
];

export const EVENTS = [
  {
    date: "2026",
    tag: "Global Congress",
    tagColor: "#15843F",
    title: "Early Detection Saves Lives: AI & Bronchoscopy in Focus at Bronchopulmonary World Congress 2026",
    desc: "Amaltas University hosted the Bronchopulmonary World Congress 2026, convening pulmonologists, researchers and clinicians from across the globe — spotlighting the growing role of AI and advanced bronchoscopy in the early detection of respiratory disease.",
    img: "/assets/images%20of%20university/events/u1.jpg",
  },
  {
    date: "2026",
    tag: "Environment",
    tagColor: "#15843F",
    title: "World Environment Day Celebration at Amaltas University",
    desc: "Students, faculty and staff came together to mark World Environment Day with tree-plantation drives, awareness walks and sustainability pledges across the campus — reaffirming the Amaltas commitment to a greener, healthier future.",
    img: "/assets/images%20of%20university/events/we1.jpg",
  },
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
    desc: "Amaltas University announces entrance examinations for Ph.D. programs across Medical Sciences, Nursing, and Pharmacy.",
    tag: "Admissions",
    img: "/assets/images%20of%20university/campus%20life/2U8A2387.JPG",
  },
  {
    date: "May 2026",
    title: "World Record in Mass Yoga Achieved",
    desc: "The Amaltas group set a world record with over 35,000 participants in a single mass yoga gathering, celebrating wellness and community.",
    tag: "Achievement",
    img: "/assets/images%20of%20university/event%20and%20activites/yoga.jpg",
  },
  // Hidden — news item about the Allied & Rehabilitation Sciences labs.
  // {
  //   date: "Apr 2026",
  //   title: "New Allied & Rehabilitation Sciences Labs Inaugurated",
  //   desc: "State-of-the-art rehabilitation and speech-language pathology labs inaugurated to support clinical training in allied health sciences.",
  //   tag: "Infrastructure",
  //   img: "/assets/images%20of%20university/event%20and%20activites/nurse.jpeg",
  // },
];

export const FAQS = [
  {
    q: "How do I apply for admission to Amaltas University?",
    a: "You can apply online through our admissions portal or visit the campus directly. For assistance, call our helpline at +91 9977544111 or email registrar@amaltasuniversity.in. Our admissions team is available to guide you through every step.",
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
    line: "Six institutions. One living teaching hospital. A university built so the people who will care for India learn by caring — from the very first day.",
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
];

/* Life at Amaltas — clickable campus-life grid (Medicaps "Life@MU" pattern) */
export const LIFE = [
  { icon: Dumbbell, label: "Sports & Athletics", tag: "Play", img: "/assets/images%20of%20university/campus%20life/sport.JPG" },
  { icon: Trophy, label: "Yoga & Wellness", tag: "World record", img: "/assets/images%20of%20university/event%20and%20activites/yoga.jpg" },
  { icon: Music, label: "Cultural Festivals", tag: "Celebrate", img: "/assets/images%20of%20university/event%20and%20activites/lamp.jpeg" },
  { icon: HomeIcon, label: "Hostels & Dining", tag: "Live", img: "/assets/images%20of%20university/campus%20life/435A1853.JPG" },
  { icon: BookOpen, label: "Library & Labs", tag: "Learn", img: "/assets/images%20of%20university/campus%20life/2U8A2387.JPG" },
  { icon: HandHeart, label: "Community Outreach", tag: "Serve", img: "/assets/images%20of%20university/event%20and%20activites/nurse.jpeg" },
  { icon: Dumbbell, label: "Badminton", tag: "Play", img: "/assets/images%20of%20university/campus%20life/IMG-20250307-WA0065.jpg" },
  { icon: Dumbbell, label: "Football", tag: "Play", img: "/assets/images%20of%20university/campus%20life/IMG-20250307-WA0066.jpg" },
  { icon: Dumbbell, label: "Cricket", tag: "Play", img: "/assets/images%20of%20university/campus%20life/IMG-20250307-WA0067.jpg" },
  { icon: Dumbbell, label: "Volleyball", tag: "Play", img: "/assets/images%20of%20university/campus%20life/IMG-20250307-WA0072.jpg" },
  { icon: Trophy, label: "Kabaddi", tag: "Compete", img: "/assets/images%20of%20university/campus%20life/IMG-20250307-WA0073.jpg" },
  { icon: Trophy, label: "Mass Yoga Day", tag: "World record", img: "/assets/images%20of%20university/campus%20life/P3_yoga.jpg" },
  { icon: Leaf, label: "Green Campus", tag: "Sustain", img: "/assets/images%20of%20university/campus%20life/green.png" },
  { icon: Music, label: "Culture & Celebration", tag: "Celebrate", img: "/assets/images%20of%20university/campus%20life/435A9602.JPG" },
  { icon: GraduationCap, label: "Classrooms & Lectures", tag: "Learn", img: "/assets/images%20of%20university/campus%20life/2U8A8968.jpg" },
];

/* Clinical & career network — honest health-sciences adaptation of Medicaps' placements/recruiters band */
export const OUTCOMES = [
  { v: "100%", l: "Clinical exposure from year one" },
  { v: "800+", l: "Teaching-hospital beds for training" },
  { v: "6", l: "Health-science disciplines under one campus" },
];
export const PARTNERS = [
  "Superspeciality Teaching Hospital", "District Health Network", "AYUSH Wellness Centres",
  "Rural Outreach Clinics", "Diagnostic & Imaging Labs", "Rehabilitation Centres",
];

export const CONTACT = {
  tollFree: "9977544111",
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
  // Hidden — timeline entry for the Allied & Rehabilitation Sciences institute.
  // { year: "2022", title: "Allied & Rehabilitation Sciences", desc: "A dedicated institute for speech-language pathology, clinical psychology, physiotherapy and medical imaging sciences joined the Amaltas family." },
  { year: "2026", title: "World Record", desc: "Over 35,000 participants gathered for a single mass yoga event — an unprecedented testament to community, wellness and Amaltas's spirit of togetherness." },
  { year: "2026", title: "Ph.D. Research Expansion", desc: "Doctoral programmes launched across all six health disciplines, cementing Amaltas as a research-driven force in Indian health-sciences education." },
];

export const VISION_MISSION = {
  vision: "To be a premier health-sciences university shaping compassionate, competent healers across diverse medical traditions for global healthcare.",
  mission: [
    "Integrated Education: Blend classical Indian wisdom with modern, evidence-based medicine.",
    "Immersive Training: Provide live hospital-embedded clinical practice from day one.",
    "Impactful Research: Drive innovation, research, and community service alongside academic rigor.",
    "Accessible Excellence: Deliver high-quality medical education to every talented mind.",
    "Mentorship-Driven Culture: Nurture students individually toward their highest personal and professional potential.",
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
    title: "World Record — Mass Yoga",
    year: "2026",
    org: "Ministry of AYUSH, Government of India",
    desc: "35,000+ participants joined a single mass yoga gathering under the AYUSH Ministry's Yoga Mahotsav programme — an unprecedented display of wellness and community that set a global record.",
    type: "World Record",
    color: "#12863F",
    featured: true,
    number: "35,000+",
    img: "/assets/images%20of%20university/campus%20life/yoga-hall.jpeg",
    certificate: {
      title: "World Record — Thalassemia Awareness Oath Ceremony",
      year: "2024",
      org: "World Book of Records, London",
      desc: "Provisional Certificate awarded for organising the oath ceremony “Let Us Make Indore Thalassemia Mukt” — Thalassemia blood-test awareness before marriage involving 6,500 students, in collaboration with Malwanchal University and the Thalassemia and Child Welfare Group, Indore.",
      img: "/assets/images%20of%20university/yoga2024.jpeg",
    },
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
  { short: "NCH",    color: "#6A1B9A", logo: "/assets/images%20of%20university/recognisation/nch.png",      name: "National Commission for Homoeopathy",         desc: "Recognition for BHMS programme under the national homeopathic regulatory framework.",     scope: "Institute of Homoeopathy"           },
  { short: "INC",    color: "#00695C", logo: "/assets/images%20of%20university/recognisation/inc-logo.png",  name: "Indian Nursing Council",                      desc: "Approval for B.Sc. Nursing and Post Basic B.Sc. Nursing programmes.",                    scope: "Institute of Nursing Sciences"      },
  { short: "PCI",    color: "#D84315", logo: "/assets/images%20of%20university/recognisation/pci-logo.png",  name: "Pharmacy Council of India",                   desc: "Affiliation for Bachelor of Pharmacy (B.Pharm) and Diploma in Pharmacy (D.Pharm).",    scope: "Institute of Pharmacy"              },
  // Hidden — RCI approval tied to the Allied & Rehabilitation Sciences institute.
  // { short: "RCI",    color: "#1565C0", logo: "/assets/images%20of%20university/recognisation/rci.png",       name: "Rehabilitation Council of India",             desc: "Approval for B.A.S.L.P. and allied rehabilitation science courses.",                     scope: "Allied & Rehabilitation Sciences"   },
  { short: "UGC",    color: "#0D1B5E", logo: "/assets/images%20of%20university/recognisation/ugc.png",       name: "University Grants Commission",                desc: "Recognition as a Private University under Section 2(f) of the UGC Act, 1956.",           scope: "University-wide"                   },
  { short: "MPPURC", color: "#6D4C41", logo: "/assets/images%20of%20university/recognisation/mppurc.jpg",    name: "MP Private University Regulatory Commission", desc: "Established under the MP Niji Vishwavidyalaya (Sthapana Aur Sanchalan) Adhiniyam.",    scope: "University-wide"                   },
  { short: "NABH",   color: "#880E4F", logo: "/assets/images%20of%20university/recognisation/nabh-logo.png", name: "Natl. Accreditation Board for Hospitals",     desc: "NABH-linked teaching hospital ensuring patient safety and quality care standards.",       scope: "Teaching Hospital"                  },
  { short: "NABL",   color: "#4527A0", logo: "/assets/images%20of%20university/recognisation/NABL.png",     name: "Natl. Accreditation Board for Testing and Calibration Laboratories", desc: "NABL accreditation for diagnostic and testing laboratories ensuring calibrated, quality-assured results.", scope: "Teaching Hospital"                  },
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
      { label: "Vice Chancellor",       value: "Dr. R.K. Singh" },
      { label: "Registrar",             value: "Dr. Abhay Gupta" },
      { label: "Address",               value: "Village Bangar, Dewas–Ujjain Highway, District Dewas, Madhya Pradesh – 455001" },
      { label: "Website",               value: "www.amaltasuniversity.in" },
    ],
  },
  {
    title: "Academic Information",
    items: [
      { label: "Number of Institutes",       value: "6 Health-Science Institutes" },
      { label: "Programmes Offered",         value: "MBBS · MD/MS · BAMS · BHMS · B.Sc. Nursing · Post Basic B.Sc. Nursing · B.Pharm · D.Pharm · BPT · BMLT · DMLT" },
      { label: "Teaching Hospital",          value: "1500+ bed Superspeciality Teaching Hospital (integrated on campus)" },
      { label: "Medium of Instruction",      value: "English (Hindi language support available)" },
      { label: "Academic Calendar",          value: "August – June (Annual System)" },
      { label: "Ph.D. Programmes",          value: "Available across all 6 health-science disciplines from 2026" },
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
      { label: "General Enquiry",       value: "+91 9977544111" },
      { label: "BAMS Helpline",         value: "+91 7880154605" },
      // { label: "Allied Sciences",       value: "+91 9617245556" },
      { label: "Office Number",         value: "07272-482580" },
      { label: "Email",                 value: "registrar@amaltasuniversity.in" },
      { label: "Admissions Portal",     value: "Online application via official website" },
    ],
  },
];

// Chancellor's Message — consumed by both the /about/university preview
// (TheUniversity.jsx) and reused as LEADER_MESSAGES.chancellor for the full
// /leadership/chancellor page (LeaderMessage.jsx).
export const CHANCELLOR_MESSAGE = {
  salutation: "Dear Students,",
  // Full letter body; the preview on /about/university only shows paragraphs[1].
  paragraphs: [
    "At Amaltas University, we believe that the highest calling of any institution is not merely to teach, but to transform. When a young student walks through our gates, they carry with them the hopes of families, the dreams of communities, and the responsibility of a nation's health future.",
    "The name Amaltas—the Indian laburnum—blooms in brilliant gold, offering shade and beauty without condition. That is the spirit we have cultivated here. Our six institutes exist not as separate schools, but as one living ecosystem, where disciplines converse with one another—just as the human body works as a whole.",
    "I am proud of what our students have achieved: the research they have pursued, the communities they have served in our outreach clinics, and the world record we set together in 2026 as thirty-five thousand souls breathed in unison. These moments remind us why we exist.",
    "Our teaching hospital is not a resource that supplements education — *it is the education*. From the first year, our students walk wards, observe procedures, and carry the weight of real responsibility. That is our promise and our method.",
    "As you explore Amaltas University, I invite you not only to study our programmes and infrastructure, but to feel our purpose. Come and see a campus where healing is not a subject — it is a way of life.",
  ],
  closing: "With faith in tomorrow's healers,",
  name: "Mrs. Aruna Bhadoria",
  role: "Chancellor, Amaltas University",
  photo: "/assets/images%20of%20university/leadership/Smt.Arunaji-Bhadoriya-Chancellor.jpg",
  // Pull quote shown in the /about/university preview card, above paragraphs[1].
  quote: "Amaltas doesn't just teach medicine — it nurtures the spirit of service that medicine demands of every healer.",
};

export const VC_MESSAGE = {
  salutation: "Dear Students",
  paragraphs: [
    "As Kulguru (Vice-Chancellor) of Amaltas University, I would create an environment of academic freedom in the University where bright minds meet, discover, and learn to serve society by being a part of a global university of higher learning.",
    "Leading this institution, I aim to inspire a passion for knowledge, strong problem-solving capabilities, and excellent leadership and communication skills among our students, faculty, and staff. I also want to instill a deep sense of mutual respect, equity, and dignity, empowering our community to offer the highest level of service to those in need.",
    "Echoing the words of the poet W.B. Yeats, who noted that education is \"not the filling of a pail, but the lighting of a fire,\" my mission as an educator is to ignite curiosity. I strive to develop lifelong learners equipped with the essential skills to serve society effectively. Furthermore, I am committed to advancing knowledge through a rigorous yet joyful academic and research culture.",
    "I will encourage the academic staff to upgrade their qualifications and skills in order to improve the overall quality of research and teaching-learning at the University by creating a congenial learning environment, developing an effective mechanism for student feedback, and attracting scholars from reputed national and international institutions. I will also encourage innovation in education, original research in sciences, patient-oriented discoveries, and motivate creative young minds to reach their fullest potential. Advocacy for community wellness and public welfare, with emphasis on quality and value in all endeavours, will be my prime motto.",
    "I will promote and preserve academic freedom and diversity to provide need-based and quality-centric education in all branches of sciences, as may be deemed appropriate from time to time, enabling students to reap the benefits of tertiary education. The University shall emerge as a centre of excellence for research and development, contributing to the dissemination of knowledge and its relevant applications at regional, national, and global levels.",
    "I will establish institutions of research, university colleges, departments, laboratories, and hospitals, and encourage cooperation among them for their fullest development and manifestation. For this purpose, I will coordinate with other universities and relevant authorities as well. The University will institute and award fellowships, scholarships, studentships, exhibitions, medals, and prizes to recognize and encourage excellence in science, service, research, and the overall development of its institutions.",
    "Last but not least, my emphasis will be on creating an environment that nurtures students into becoming good human beings who derive satisfaction from alleviating the sufferings of mankind and serving humanity. They will become individuals of strong ethical values who respect and love their profession. They will be compassionate, knowledgeable, hardworking, and kind-hearted individuals. In such students, I see the true reflection of my vision, and their achievements will be a matter of pride and fulfilment for me.",
    "I acknowledge the thoughtful vision and painstaking humanitarian efforts put forth by our respected Shri Suresh Singh Bhadoria Ji, Founder Chairman, to build and carry forward this mission for the welfare of the people living in the rural areas of Dewas district and surrounding regions.",
  ],
  closing: "With respect and high expectations,",
  name: "Dr. R.K. Singh",
  role: "Vice Chancellor, Amaltas University",
  photo: "/assets/images%20of%20university/leadership/vc-sir.jpeg",
  quote: "My mission as an educator is to ignite curiosity and develop lifelong learners equipped to serve society effectively.",
};

// Full message-page content for every /leadership/:slug route (LeaderMessage.jsx).
// Keyed by LEADERS[].slug. Chancellor & Vice Chancellor reuse the letter text
// already authored above; the rest are authored directly here.
export const LEADER_MESSAGES = {
  "founder-chairman": {
    salutation: "Dear Students,",
    paragraphs: [
      "When I established Mayank Welfare Society in 2013, I carried a single, unwavering conviction: that the people of Malwa — of Dewas, of every village and town across this heartland — deserved world-class healthcare education within reach. Not in a distant city, not beyond the means of the ordinary family, but here, close to home.",
      "I have spent my life in service of this community. I have seen the consequences of a healthcare gap — families travelling hundreds of kilometres for treatment, young people with the aptitude to become doctors but no institution willing to open its doors to them. Amaltas was my answer to that silence.",
      "Building a university is not the work of one man or one year. It is the accumulation of thousands of decisions, sacrifices, and acts of faith. Every building you walk through, every laboratory you learn in, every patient you will one day treat — each of these traces its origin to a belief that service is the highest calling.",
      "To our students: you did not come to Amaltas by accident. You came because something in you recognised this place as more than an institution — it is a family, a mission, and a promise. I ask only one thing of you: carry that promise into the world with the same sincerity with which we planted it.",
      "Amaltas means Cassia fistula — the golden shower tree. It blooms fully, without hesitation, transforming its surroundings. I hope each of you will do the same.",
    ],
    closing: "With deep respect and enduring hope,",
    quote: "I did not build Amaltas for today — I built it for every generation of healer that will follow.",
    heroEyebrow: "A message from the Founder",
    heroTitle: "Rooted in service, grown with purpose.",
    heroBg: "/assets/images%20of%20university/photo-gallery/DJI_0019.jpg",
    stats: [
      { icon: Leaf, label: "Founded", value: "2013", desc: "Mayank Welfare Society established" },
      { icon: Heart, label: "Mission", value: "Service", desc: "Healthcare access for Malwa heartland" },
      { icon: Star, label: "Legacy", value: "10+ Years", desc: "Of uninterrupted commitment" },
    ],
  },
  chairman: {
    salutation: "Dear Students,",
    paragraphs: [
      "I grew up watching my father build something from nothing — a welfare society, then a hospital, then a university. I did not merely inherit a title when I became Chairman. I inherited a responsibility: to ensure that what he started would not only survive but flourish in ways even he had not yet imagined.",
      "Amaltas University today stands as a testament to what focused resolve and genuine service can achieve. We are not the largest institution in India. But I believe we are among the most sincere. Every decision made at this university begins from a single question: does this serve our students and our community?",
      "In an era when education risks becoming a transaction, I am determined that Amaltas remains a transformation. The student who walks into our Institute of Medical Sciences, our Ayurvedic College, our Pharmacy or Nursing programmes — they are not customers. They are the future of healthcare in this region, and we owe them the very best we have.",
      "I am particularly proud of the clinical exposure we provide from the earliest semesters. Theory without practice produces knowledge without confidence. Our teaching hospital, our community outreach programmes, our research culture — these exist because we believe a healer must know the world they are healing.",
      "To every student reading this: Amaltas chose you as much as you chose us. We will not let you down. I give you my personal commitment to that.",
    ],
    closing: "With respect and confidence in what we will build together,",
    quote: "Every student who graduates from Amaltas carries with them the weight of a community's hope and the strength of a family's belief.",
    heroEyebrow: "A message from the Chairman",
    heroTitle: "A vision inherited, a future earned.",
    heroBg: "/assets/images%20of%20university/The%20Amaltas%20difference/hospital.jpg",
    stats: [
      { icon: GraduationCap, label: "Academic Excellence", value: "First priority", desc: "Curriculum, faculty, and outcomes held to the highest standard" },
      { icon: Stethoscope, label: "Clinical Depth", value: "From Semester 1", desc: "Real hospital exposure before graduation year" },
      { icon: Building2, label: "Infrastructure", value: "Continually growing", desc: "State-of-the-art labs, simulation centres, libraries" },
    ],
  },
  chancellor: {
    salutation: CHANCELLOR_MESSAGE.salutation,
    paragraphs: CHANCELLOR_MESSAGE.paragraphs,
    closing: CHANCELLOR_MESSAGE.closing,
    quote: CHANCELLOR_MESSAGE.quote,
    heroEyebrow: "A note from the Chancellor",
    heroTitle: "Dear student, this is for you.",
    heroBg: "/assets/images%20of%20university/our%20purpose/university.png",
    stats: [
      { icon: HandHeart, label: "Focus", value: "Nurturing Care", desc: "Guiding an institution rooted in compassion and access" },
      { icon: Users, label: "Community", value: "Malwa Region", desc: "Bringing world-class healthcare education close to home" },
      { icon: Trophy, label: "Milestone", value: "35,000+", desc: "Participants in the 2026 mass yoga world record" },
    ],
  },
  "vice-chancellor": {
    salutation: VC_MESSAGE.salutation,
    paragraphs: VC_MESSAGE.paragraphs,
    closing: VC_MESSAGE.closing,
    quote: VC_MESSAGE.quote,
    heroEyebrow: "A message from the Vice Chancellor",
    heroTitle: "Igniting curiosity, one mind at a time.",
    heroBg: "/assets/images%20of%20university/photo-gallery/2U8A8968.jpg",
    stats: [
      { icon: BookOpen, label: "Focus", value: "Academic Freedom", desc: "Fostering a rigorous, curiosity-driven research culture" },
      { icon: Users, label: "Community", value: "Student-Centred", desc: "Mutual respect, equity and dignity for every learner" },
      { icon: Award, label: "Vision", value: "Centre of Excellence", desc: "Research and development at a global scale" },
    ],
  },
  // PLACEHOLDER — Pro-Chancellor has no authored letter yet; replace with his
  // real message when available. Drafted generically from his LEADERS bio line.
  "pro-chancellor": {
    salutation: "Dear Students,",
    paragraphs: [
      "It is a privilege to serve Amaltas University as Pro-Chancellor, working alongside a leadership team committed to bridging rigorous academics with genuine clinical practice.",
      "Over decades in clinical and academic settings, I have seen how the strongest healthcare professionals are shaped as much by mentorship and hands-on exposure as by textbooks. That belief guides how we grow every institute at Amaltas.",
      "I am committed to supporting our faculty and students as they build a university that the Malwa region can rely on for generations to come.",
    ],
    closing: "With commitment to your growth,",
    quote: "The strongest healthcare professionals are shaped as much by mentorship and hands-on exposure as by textbooks.",
    heroEyebrow: "A message from the Pro-Chancellor",
    heroTitle: "Bridging clinical practice and academic vision.",
    heroBg: "/assets/images%20of%20university/photo-gallery/2U8A9378.jpg",
    stats: [
      { icon: Stethoscope, label: "Focus", value: "Clinical Practice", desc: "Decades of hands-on healthcare leadership" },
      { icon: GraduationCap, label: "Role", value: "Academic Bridge", desc: "Connecting classroom learning to real practice" },
      { icon: ClipboardCheck, label: "Priority", value: "Faculty Growth", desc: "Supporting educators across every institute" },
    ],
  },
  // PLACEHOLDER — Registrar has no authored letter yet; replace with his
  // real message when available. Drafted generically from his LEADERS bio line.
  registrar: {
    salutation: "Dear Students,",
    paragraphs: [
      "As Registrar, my role is to ensure that the university runs with the integrity, transparency, and consistency our students and families expect from us.",
      "From admissions to examinations to daily administration, our office works to make sure the systems behind your education are dependable — so that your focus can stay where it belongs: on learning.",
      "I welcome every student and parent to reach out to our administration with questions or concerns. Good governance is a promise we intend to keep every single day.",
    ],
    closing: "With commitment to integrity and service,",
    quote: "Good governance is a promise we intend to keep every single day.",
    heroEyebrow: "A message from the Registrar",
    heroTitle: "Governance built on integrity.",
    heroBg: "/assets/images%20of%20university/campus%20life/2U8A2387.JPG",
    stats: [
      { icon: FileText, label: "Focus", value: "Admissions Integrity", desc: "Transparent, dependable enrolment processes" },
      { icon: ClipboardCheck, label: "Oversight", value: "University Administration", desc: "Consistent systems across every institute" },
      { icon: Building2, label: "Priority", value: "Governance", desc: "Reliable structure behind student life" },
    ],
  },
};

/* Extracted from public/assets/docs/IQAC for Website.pdf */
export const IQAC_MESSAGE = {
  heading: "Working Together for Excellence: The IQAC Vision",
  paragraphs: [
    "The Internal Quality Assurance Cell (IQAC) of Amaltas University has been consistently working towards strengthening and sustaining quality in all academic, administrative, and institutional practices. Guided by the visionary leadership of the Founder Chairman, Shri Suresh Singh Bhadoria, and enriched by the valuable insights of Shri Mayankaraj Singh Bhadoria, the IQAC has made steady progress in fostering a culture of quality. The continued guidance and support of the Pro-Chancellor, Dr. Salil Bhargava, Vice-Chancellor, Dr. R. K. Singh, and Registrar, Dr. Abhay Gupta have been instrumental in driving these initiatives forward.",
    "The University is committed to aligning its systems and processes with the quality standards prescribed by the University Grants Commission (UGC) and the National Assessment and Accreditation Council (NAAC). While the Binary Accreditation framework proposed by NAAC is yet to be implemented, the University is proactively preparing to align with its requirements once it comes into effect. In this journey, the IQAC serves as the central coordinating body, facilitating quality enhancement initiatives across all constituent institutions.",
    "Over the past year, sustained efforts have been directed towards strengthening academic and administrative processes through systematic quality initiatives. These include enhancing teaching-learning methodologies, promoting Outcome-Based Education (OBE) and Competency-Based Medical Education (CBME), strengthening student support and mentoring systems, and establishing effective mechanisms for collecting, analysing, and utilizing stakeholder feedback. The IQAC has also actively encouraged research and innovation, organizing faculty development programmes, improved institutional data management practices, ensured timely submission of statutory reports, and enhanced interdepartmental coordination. Collectively, these initiatives have contributed to building a robust quality assurance ecosystem and preparing the University to meet national benchmarks of excellence.",
    "The successful implementation of these initiatives has been possible through the unwavering support of the University leadership and the dedicated efforts of the heads of institutions, IQAC coordinators, departmental heads, faculty members, and nodal officers across the constituent units of Amaltas University. Their commitment and collaborative approach have significantly strengthened the University's quality assurance framework.",
    "As Amaltas University continues its journey towards academic excellence and institutional growth, the IQAC remains committed to nurturing a culture of continuous improvement, innovation, accountability, and excellence. Through collective effort and a shared vision, the University is steadily progressing towards achieving higher standards of quality, excellence, and national recognition.",
  ],
  name: "Dr. Abhilasha Dutta",
  role: "Director, IQAC, Amaltas University, Dewas",
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
