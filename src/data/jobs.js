/* ─── JOB OPENINGS page data ──────────────────────────────────
   Transcribed from the university's recruitment posters (the poster images
   themselves are shown on the page and open full-size on click).
   Each opening is either a vacancy ("hiring") or an invitation for vendor
   proposals ("proposal"). Proposals carry a `deadline` and show as Closed
   once that date has passed. */

export const JOB_CONTACT = { email: "recruit@amaltasuniversity.in", phone: "9752447825" };

const IMG = "/assets/images%20of%20university/job-openings";

export const JOB_CATEGORIES = ["Leadership & Administration", "Faculty", "Nursing & Healthcare", "Vendor Proposals"];

export const JOB_OPENINGS = [
  {
    id: "leadership-team",
    category: "Leadership & Administration",
    type: "hiring",
    title: "Join our Leadership Team",
    org: "Amaltas University, Dewas",
    image: `${IMG}/leadership-team.webp`,
    summary: "Be a part of a dynamic team shaping the future of education, healthcare and excellence.",
    roles: [
      { title: "Registrar", experience: "8 – 10 Years", points: ["Oversee academic & administrative functions of the University.", "Ensure statutory compliance and regulatory coordination.", "Lead policy implementation and institutional development."] },
      { title: "Medical Superintendent", experience: "10 – 15 Years", points: ["Oversee overall hospital operations and clinical services.", "Ensure quality patient care and compliance with standards.", "Lead and manage medical and administrative teams."] },
      { title: "ICN (Infection Control Nurse)", experience: "3 – 7 Years", points: ["Implement infection control policies and protocols.", "Monitor and audit IPC practices across departments.", "Train staff and ensure compliance with NABH standards."] },
      { title: "Dean", experience: "10 – 15 Years", points: ["Provide academic leadership and strategic direction.", "Foster research, innovation and academic excellence.", "Mentor faculty and develop academic programs."] },
      { title: "Pharmacy Manager", experience: "8 – 12 Years", points: ["Manage pharmacy operations and ensure availability of medicines.", "Ensure compliance with drug regulations and quality standards.", "Lead pharmacy team and optimize processes."] },
      { title: "Purchase Manager", experience: "8 – 12 Years", points: ["Manage procurement planning and vendor relationships.", "Ensure timely purchase and cost-effective procurement.", "Maintain quality standards and compliance."] },
      { title: "Civil Engineer", experience: "5 – 10 Years", points: ["Oversee construction and maintenance of campus infrastructure.", "Ensure quality, safety and timely completion of projects.", "Manage contractors and site operations."] },
      { title: "Digital Marketer", experience: "2 – 5 Years", points: ["Plan and execute digital marketing campaigns.", "Manage social media, SEO/SEM and online platforms.", "Analyze performance and generate leads."] },
      { title: "Marketing Executive", experience: "2 – 5 Years", points: ["Assist in planning and executing marketing activities.", "Coordinate events, promotions and branding.", "Support lead generation and admissions marketing."] },
      { title: "Quality Manager", experience: "8 – 12 Years", points: ["Develop and implement quality management systems.", "Ensure compliance with NABH and NABL standards.", "Lead audits, quality improvement and risk management."] },
      { title: "Quality Executive", experience: "2 – 5 Years", points: ["Assist in documentation and implementation of quality processes.", "Ensure compliance with NABH/NABL standards.", "Conduct internal audits and track corrective actions.", "Support quality improvement initiatives."] },
      { title: "Yoga Teacher", experience: "2 – 5 Years", points: ["Conduct yoga sessions for students and staff.", "Promote health, wellness and stress management.", "Design wellness programs and workshops."] },
      { title: "Estate Manager", experience: "8 – 12 Years", points: ["Oversee maintenance of campus infrastructure and facilities.", "Manage vendors, contracts and facility services.", "Ensure safety, compliance and cost-effective operations."] },
    ],
    apply: "Take the next step in your career with Amaltas University Dewas. Send your resume to the email below.",
    address: "Amaltas University Dewas, Gram Bangar, Dewas–Ujjain Bypass, Dist. Dewas, Madhya Pradesh",
    closing: "Be a part of our mission to deliver quality education and healthcare for a better tomorrow.",
  },
  {
    id: "appointments",
    category: "Leadership & Administration",
    type: "hiring",
    title: "Appointments — Invites application for the post of",
    org: "Amaltas University, Dewas (A Unit of Amaltas Educational Welfare Society)",
    image: `${IMG}/appointments.webp`,
    roles: [
      { title: "Registrar", education: "Master's in Administration / Higher Education", points: ["Custodian of university records, statutes, ordinances, and official seal.", "Ensure timely statutory filings with UGC, AICTE, NMC, INC, and State Government.", "Prepare and monitor compliance calendars for all departments.", "Coordinate governance activities of Governing Council, Academic Council, and statutory committees."] },
      { title: "Dean", education: "Ph.D. / Doctorate in the specific field", points: ["Academic leadership of MBBS and allied medical programs.", "Ensure compliance with UGC, NMC (National Medical Commission), and statutory regulations.", "Oversee curriculum design, teaching schedules, and examination systems.", "Supervise Heads of Departments (HoDs), faculty, and administrative staff.", "Promote research, publications, and medical innovations."] },
      { title: "Medical Superintendent", education: "MBBS + MD/MS", points: ["Overseeing clinical operations, coordinating medical staff, ensuring patient safety, and managing hospital accreditation standards."] },
      { title: "Estate Manager", education: "Bachelor's in Facility Management / Civil Engineering", points: ["Maintaining physical infrastructure, managing facility vendors, handling property, and supervising renovations."] },
      { title: "Purchase Officer", education: "Bachelor's in Supply Chain / Commerce / Business", points: ["Plan, source, and procure materials, equipment, and services for University, Hospital, and Hostel operations.", "Ensure transparent vendor selection through quotations, tenders, and comparative statements.", "Maintain vendor database and negotiate contracts for cost effective procurement.", "Verify quality, quantity, and specifications of goods before acceptance."] },
      { title: "Pharmacy Manager", education: "B.Pharm / PharmD + Valid Pharmacist License", points: ["Dispensing medication safely, managing drug inventory levels, ensuring narcotics law compliance, and supervising pharmacy staff."] },
    ],
    apply: "For more information contact on the number below.",
    noEmail: true,
  },
  {
    id: "faculty",
    category: "Faculty",
    type: "hiring",
    title: "Faculty Positions — MPT & MMLT",
    org: "Amaltas University, Dewas",
    image: `${IMG}/faculty-mpt-mmlt.webp`,
    summary: "Build your future with us. Applications are invited for the following faculty positions at Amaltas University, Dewas.",
    roles: [
      { title: "MPT", education: "MPT in relevant specialization with teaching / clinical experience (preferred).", points: ["MPT – Neuro", "MPT – Sports"] },
      { title: "MMLT", education: "MMLT / M.Sc. in relevant subject with teaching / clinical experience (preferred).", points: ["Microbiology", "Histopathology", "Hematology", "Biochemistry"] },
    ],
    blocks: [{ title: "Why join us", items: ["Conducive Academic Environment", "Supportive & Collaborative Team", "Opportunities for Research & Professional Growth"] }],
    facts: [["Location", "Amaltas University, Dewas"]],
    apply: "Interested candidates may share their updated CV at the email below.",
  },
  {
    id: "staff-nurses",
    category: "Nursing & Healthcare",
    type: "hiring",
    title: "B.Sc Nursing Staff Nurses",
    org: "Amaltas University, Dewas (M.P.)",
    image: `${IMG}/bsc-nursing-staff-nurses.webp`,
    summary: "We are looking for compassionate, dedicated and enthusiastic B.Sc Nursing professionals to provide quality nursing care and ensure patient safety and comfort. Be a part of a team that delivers excellent care, every day.",
    facts: [
      ["Location", "Amaltas University, Dewas (M.P.)"],
      ["Experience", "2 – 5 years (Only B.Sc Nursing)"],
      ["Qualification", "B.Sc Nursing with valid registration (Only)"],
      ["Employment type", "Full-time, Permanent"],
      ["Department", "Nursing Services"],
    ],
    blocks: [
      { title: "Key responsibilities", items: ["Provide quality nursing care to patients and assist in their recovery and well-being.", "Monitor vital signs and report any changes to the concerned nursing in-charge / doctor.", "Administer medications and treatments as per physician orders.", "Assist in procedures and ensure patient safety.", "Maintain accurate nursing documentation and reports.", "Educate patients and families about health and wellness.", "Ensure infection control and maintain hygiene standards.", "Collaborate with the healthcare team for holistic patient care.", "Respond promptly to patient needs and emergencies."] },
      { title: "Required skills", items: ["Strong clinical knowledge and nursing skills.", "Good communication and interpersonal skills.", "Compassionate and patient-focused.", "Ability to work in shifts and under pressure.", "Attention to detail and documentation.", "Team player with a positive attitude."] },
      { title: "Why join us", items: ["Career Growth Opportunities", "Supportive & Professional Team", "Meaningful Impact in Healthcare", "Learning & Development"] },
    ],
    apply: "Apply now — share your updated CV at the email below.",
  },
  {
    id: "icn-in-charge",
    category: "Nursing & Healthcare",
    type: "hiring",
    title: "ICN In-Charge (Infection Control Nurse In-Charge)",
    org: "Amaltas University Hospital, Dewas",
    image: `${IMG}/icn-in-charge.webp`,
    summary: "We are looking for a dedicated and experienced Infection Control Nurse In-Charge to lead and manage the Infection Control team and ensure a safe, clean and infection-free environment for patients, staff and visitors. Be a part of our healthcare team!",
    facts: [
      ["Location", "Amaltas University Hospital, Dewas"],
      ["Qualification", "B.Sc. / GNM Nursing; Infection Control certification required"],
      ["Experience", "2 – 5 years in Hospital Infection Control"],
    ],
    blocks: [
      { title: "Key responsibilities", items: ["Direct daily infection control surveillance and audit operations across all intensive care units (ICUs), Operation Theatres (OTs), and inpatient wards.", "Lead and coordinate monthly Infection Control Committee (ICC) meetings, presenting quarterly HAI rates.", "Maintain complete compliance with NABH Infection Control (HIC) standards, serving as the primary lead during accreditation audits.", "Implement and monitor infection control policies and procedures.", "Conduct regular audits and training for staff on infection control practices.", "Manage hospital-wide Bio-Medical Waste (BMW) handling protocols and oversee bio-safety compliance across biomedical waste segregation points."] },
    ],
    apply: "Interested candidates can share their updated CV at the email below, or apply through the application form.",
    applyUrl: "https://lnkd.in/dK2bhbWr",
  },
  {
    id: "hostel-mess",
    category: "Vendor Proposals",
    type: "proposal",
    title: "Hostel Mess & Catering Services",
    org: "Hostel Administration, Amaltas University",
    image: `${IMG}/hostel-mess-catering.webp`,
    summary: "Applications / proposals are invited from reputed and experienced agencies for providing hostel mess and catering services.",
    deadline: "2026-07-05",
    blocks: [
      { title: "Scope of work", items: ["Preparation and serving of hygienic breakfast, lunch, evening snacks, and dinner.", "Maintenance of cleanliness and food quality standards.", "Supply of adequate manpower and kitchen management."] },
      { title: "Eligibility", items: ["Experience in hostel / institutional catering services.", "Valid registration and necessary licenses.", "Ability to provide quality food services on a regular basis."] },
    ],
    apply: "Interested agencies may submit their detailed proposals along with relevant documents and experience certificates.",
  },
  {
    id: "housekeeping",
    category: "Vendor Proposals",
    type: "proposal",
    title: "Housekeeping & Sanitation Services",
    org: "Amaltas University, Dewas",
    image: `${IMG}/housekeeping-sanitation.webp`,
    summary: "Amaltas University invites sealed proposals from eligible agencies / service providers for providing Housekeeping and Sanitation Services at the university campus.",
    deadline: "2026-07-05",
    apply: "Interested agencies are requested to submit their proposals before the deadline. Only complete proposals received on or before the last date will be considered. Email for submission & enquiries is below.",
  },
  {
    id: "security",
    category: "Vendor Proposals",
    type: "proposal",
    title: "Security Services",
    org: "Amaltas University, Dewas",
    image: `${IMG}/security-services.webp`,
    summary: "Applications / proposals are invited from reputed and experienced agencies for providing security services.",
    deadline: "2026-07-05",
    blocks: [
      { title: "Scope of work", items: ["Deployment of trained and professional security personnel.", "24×7 security and surveillance of campus premises.", "Access control and visitor management.", "Emergency response and incident reporting.", "Ensuring safety, discipline and security of students, staff and property."] },
      { title: "Eligibility", items: ["Experience in providing security services to institutions / organizations.", "Valid registration and necessary licenses.", "Availability of trained and verified security personnel.", "Ability to provide reliable and round-the-clock services."] },
    ],
    apply: "Interested agencies may submit their detailed proposals along with relevant documents and experience certificates.",
  },
];
