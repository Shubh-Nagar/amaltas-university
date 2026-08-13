import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, CalendarDays, X, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { PageHero } from "../../components/Layout.jsx";
import { Reveal } from "../../components/Primitives.jsx";
import { C } from "../../theme.js";
import { CONTACT } from "../../data/content.js";

/* builds encoded gallery paths from a folder name + file list */
const EV_BASE = "/assets/images%20of%20university/events";
const gal = (folder, files) => files.map((f) => `${EV_BASE}/${encodeURIComponent(folder)}/${f}`);

const EVENTS = [
  {
    img: "/assets/images%20of%20university/events/antiragging%20campaign/1.jpeg",
    date: "12 August 2026",
    title: "Anti-Ragging Campaign — Kadam Badhao, Ragging Hatao",
    desc: "\"A campus free of fear, a campus full of cheer: let's make it real.\" Amaltas University pledged for a ragging-free campus, calling on students to build camaraderie, not chaos, and join the 'Good Bye Ragging' movement.",
    gallery: gal("antiragging campaign", ["1.jpeg", "2.jpeg", "3.jpeg"]),
  },
  {
    img: "/assets/images%20of%20university/events/अंतिम%20विदाई%20में%20भी%20परोपकार/1.jpeg",
    date: "11 August 2026",
    title: "अंतिम विदाई में भी परोपकार: सेवाधाम आश्रम के कर्मयोगी का देहदान एवं नेत्र दान, समाज के लिए बने मिसाल",
    desc: "देवास: मानवता की सेवा और चिकित्सा शिक्षा के क्षेत्र में देवास का अमलतास मेडिकल कॉलेज एक ऐतिहासिक पल का साक्षी बना। सेवाधाम आश्रम (अंकितग्राम) में निवासरत 65 वर्षीय विजय दीनानाथ बाथम का देहदान संकल्प मंगलवार को पूरे राजकीय सम्मान के साथ पूर्ण हुआ। मध्यप्रदेश के मुख्यमंत्री डॉ. मोहन यादव की मंशानुसार, देहदानियों को सर्वोच्च सम्मान देने के लिए अमलतास मेडिकल कॉलेज परिसर में पुलिस विभाग की टुकड़ी द्वारा 'गार्ड ऑफ ऑनर' प्रदान किया गया। इस भावुक क्षण के दौरान वहां उपस्थित पुलिस बल, कॉलेज डीन डॉ. ए.के. पिठावा, एनाटॉमी विभाग के हेड डॉ. करखायले एम. एल, मेडिकल छात्र, डॉक्टर्स ने नम आंखों से इस महान आत्मा को अंतिम विदाई दी। यह पुनीत कार्य सेवाधाम आश्रम, ग्राम अम्बोदिया (उज्जैन) के संस्थापक श्री सुधीर भाई गोयल के विशेष प्रयासों से संपन्न हुआ। देहदान अधिकारी श्री गजानंद चौहान एवं मो. रेहानुद्दीन ने कॉर्निया एवं देहदान की प्रक्रिया की जानकारी दी और इसे संपन्न कराया। अमलतास वेलफेयर सोसायटी के चेयरमैन महोदय ने श्री सुधीर भाई गोयल जी के प्रति हृदय से आभार व्यक्त किया।",
    gallery: gal("अंतिम विदाई में भी परोपकार", ["1.jpeg", "2.jpeg", "3.jpeg"]),
  },
  {
    img: "/assets/images%20of%20university/events/Pediatrics%20UG%20Quiz%20Competition%202026/1.jpeg",
    date: "1 August 2026",
    title: "Pediatrics UG Quiz Competition 2026",
    desc: "The Pediatrics UG Quiz Competition was successfully conducted at Amaltas Institute of Medical Sciences. MBBS students showcased their knowledge, teamwork and clinical skills with great enthusiasm and excellence — knowledge today, better care tomorrow.",
    gallery: gal("Pediatrics UG Quiz Competition 2026", ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg"]),
  },
  {
    img: "/assets/images%20of%20university/events/World%20Breastfeeding%20Week/1.jpeg",
    date: "2026",
    title: "World Breastfeeding Week Celebration",
    desc: "Nourishing the future, one feed at a time — Amaltas marked World Breastfeeding Week by creating spaces where every parent feels supported, celebrating the grit, grace and dedication behind the breastfeeding journey.",
    gallery: gal("World Breastfeeding Week", ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg"]),
  },
  {
    img: "/assets/images%20of%20university/events/Guru%20Purnima%20Mahotsav/1.jpeg",
    date: "29 July 2026",
    title: "अमलतास इंस्टीट्यूट ऑफ आयुर्वेद में श्रद्धा एवं उत्साह के साथ मनाया गया 'गुरु पूर्णिमा महोत्सव'",
    desc: "देवास: अमलतास इंस्टीट्यूट ऑफ आयुर्वेद में 'गुरु पूर्णिमा' का पावन पर्व अत्यंत श्रद्धा, उत्साह और गरिमामय वातावरण में संपन्न हुआ। कार्यक्रम की शुरुआत भगवान धन्वंतरि और महर्षि चरक के पूजन व वंदना के साथ हुई। समारोह के दौरान विद्यार्थियों ने अपने गुरुजनों का पारंपरिक रूप से तिलक लगाकर और पुष्पगुच्छ भेंट कर आत्मीय स्वागत किया तथा उनके प्रति कृतज्ञता व्यक्त की।",
    gallery: gal("Guru Purnima Mahotsav", ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg"]),
  },
  {
    img: "/assets/images%20of%20university/events/Tree%20Plantation%20by%20Special%20Guest/1.jpg",
    date: "24 July 2026",
    title: "अमलतास विश्वविद्यालय में पधारे विशेष अतिथि द्वारा पौधारोपण",
    desc: "अमलतास विश्वविद्यालय में पधारे विशेष अतिथि द्वारा परिसर में पौधारोपण किया गया, जो पर्यावरण संरक्षण एवं हरियाली को बढ़ावा देने की दिशा में विश्वविद्यालय की प्रतिबद्धता को दर्शाता है।",
    gallery: gal("Tree Plantation by Special Guest", ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"]),
  },
  {
    img: "/assets/images%20of%20university/events/Medhavi%20Samman%20Samaroh/1.jpeg",
    date: "23 July 2026",
    title: "दैनिक भास्कर मेधावी सम्मान समारोह",
    desc: "दैनिक भास्कर द्वारा आयोजित मेधावी सम्मान समारोह में देवास जिले के 54 स्कूलों के 700 से अधिक प्रतिभाशाली विद्यार्थियों को उनकी शैक्षणिक उत्कृष्टता के लिए सम्मानित किया गया। इस गरिमामयी अवसर पर अमलतास यूनिवर्सिटी के चेयरमैन श्री मयंकराज सिंह भदौरिया विशेष अतिथि के रूप में उपस्थित रहे और विद्यार्थियों को उनके उज्ज्वल भविष्य के लिए शुभकामनाएँ देते हुए मेहनत, अनुशासन और लक्ष्य के प्रति समर्पण का संदेश दिया।",
    gallery: gal("Medhavi Samman Samaroh", ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg"]),
  },
  {
    img: "/assets/images%20of%20university/events/World%20Brain%20Day/1.jpeg",
    date: "22 July 2026",
    title: "World Brain Day",
    desc: "Amaltas observed World Brain Day on 22 July 2026 with an awareness programme highlighting brain health and neurological wellbeing.",
    gallery: gal("World Brain Day", ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg"]),
  },
  {
    img: "/assets/images%20of%20university/events/Visit%20to%20Anatomy%20Lab/1.jpeg",
    date: "20 July 2026",
    title: "Student Visit to Anatomy Lab",
    desc: "Students visited the Anatomy Lab on 20 July 2026 for a hands-on academic session.",
    gallery: gal("Visit to Anatomy Lab", ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg", "7.jpeg"]),
  },
  {
    img: "/assets/images%20of%20university/events/u1.jpg",
    date: "4 July 2026",
    title: "Early Detection Saves Lives: AI & Bronchoscopy in Focus at Bronchopulmonary World Congress 2026",
    desc: "Amaltas University hosted the Bronchopulmonary World Congress 2026, convening pulmonologists, researchers and clinicians from across the globe. Sessions spotlighted the growing role of artificial intelligence and advanced bronchoscopy in the early detection of respiratory disease — alongside keynote lectures, hands-on demonstrations and collaborative research presentations.",
    gallery: gal("Bronchopulmonary World Congress", [
      "1078759148.jpg", "1098045294.jpg", "2961273970.jpg", "3098288172.jpg", "3159100228.jpg",
      "369119561.jpg", "4007722889.jpg", "4186091772.jpg", "45357817.jpg",
    ]),
  },
  {
    img: "/assets/images%20of%20university/events/International%20Yoga%20Day/1.jpg",
    date: "21 June 2026",
    title: "अंतरराष्ट्रीय योग दिवस प्रेरणादायक वातावरण में मनाया गया",
    desc: "अमलतास विश्वविद्यालय में अंतरराष्ट्रीय योग दिवस प्रेरणादायक वातावरण में मनाया गया। विद्यार्थियों, शिक्षकों एवं स्टाफ ने सामूहिक रूप से योगाभ्यास कर स्वस्थ जीवनशैली और आत्मिक शांति का संदेश दिया।",
    gallery: gal("International Yoga Day", ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg"]),
  },
  {
    img: "/assets/images%20of%20university/events/MoU%20Vikram%20University/1.jpg",
    date: "9 June 2026",
    title: "अमलतास विश्वविद्यालय और विक्रम विश्वविद्यालय के बीच MoU हस्ताक्षरित",
    desc: "देवास। चिकित्सा शिक्षा, अनुसंधान एवं नवाचार को नई दिशा देने के उद्देश्य से अमलतास विश्वविद्यालय, देवास एवं विक्रम विश्वविद्यालय, उज्जैन के मध्य एक महत्वपूर्ण समझौता ज्ञापन (MoU) पर हस्ताक्षर किए गए। इस शैक्षणिक एवं शोध सहयोग के तहत चिकित्सा, फार्मेसी, बायोटेक्नोलॉजी, मॉलिक्यूलर बायोलॉजी, माइक्रोबायोलॉजी तथा स्वास्थ्य विज्ञान के क्षेत्रों में संयुक्त अनुसंधान को बढ़ावा दिया जाएगा। इस अवसर पर विक्रम विश्वविद्यालय के कुलगुरु प्रो. अर्पण भारद्वाज, अमलतास विश्वविद्यालय के कुलगुरु डॉ. आर.के. सिंह, प्रो-चांसलर डॉ. सलिल भार्गव सहित अन्य वरिष्ठ शिक्षाविद उपस्थित रहे।",
    gallery: gal("MoU Vikram University", ["1.jpg", "2.jpg", "3.jpg", "4.jpg"]),
  },
  {
    img: "/assets/images%20of%20university/events/we1.jpg",
    date: "5 June 2026",
    title: "World Environment Day Celebration at Amaltas University",
    desc: "Students, faculty and staff came together to mark World Environment Day with tree-plantation drives, awareness walks and sustainability pledges across the campus. The celebration reaffirmed the Amaltas commitment to a greener, healthier future — where healing grows for both people and the planet.",
    gallery: gal("World Environment Day", [
      "1631972698.jpg", "2603873168.jpg", "2754476936.jpg", "3031353413.jpg", "3554367168.jpg", "3658607544.jpg",
    ]),
  },
  {
    img: "/assets/images%20of%20university/events/P1_yoga.jpg",
    date: "1 June 2026",
    title: "Index Group & Amaltas Set a World Record with a Mass Yoga Session of 35,000+ Participants",
    desc: "In partnership with the Index Group, Amaltas took part in a record-setting mass yoga session with more than 35,000 participants. The sea of practitioners moved as one through guided asanas and pranayama, celebrating wellness, discipline and the enduring spirit of community that defines campus life.",
    gallery: gal("World Record with a Mass Yoga Session", [
      "1672916145.jpg", "2381182752.jpg", "2533750096.jpg", "3118974039.jpg",
    ]),
  },
  {
    img: "/assets/images%20of%20university/events/WhatsApp-Image-2026-05-13-at-13.48.30.jpeg",
    date: "2026",
    title: "Nurses Day Celebration",
    desc: "The Amaltas Institute of Nursing Sciences honoured its students and faculty on International Nurses Day with a heartfelt ceremony of lamp-lighting, oath renewal and cultural performances — a tribute to the compassion, courage and care that nurses bring to every bedside.",
    gallery: gal("Nurses Day Celebration", [
      "184447220.jpeg", "1984864632.jpeg", "2016098136.jpeg", "2344910398.jpeg", "3000633580.jpeg",
      "3189715197.jpeg", "373299387.jpeg", "3853472221.jpeg", "405114523.jpeg",
    ]),
  },
  {
    img: "/assets/images%20of%20university/events/WhatsApp-Image-2026-04-23-at-10.46.55-2.jpeg",
    date: "2026",
    title: "Grand Lamp Lighting & Oath Taking Ceremony held at Amaltas Institute of Nursing Science, Dewas",
    desc: "The incoming nursing cohort was formally welcomed at the Grand Lamp Lighting & Oath Taking Ceremony at the Amaltas Institute of Nursing Science, Dewas. Carrying the lamp — a symbol of knowledge and service — students pledged themselves to the Nightingale ideals of dignity, integrity and selfless patient care.",
    gallery: gal("Grand Lamp Lighting", [
      "141757211.jpeg", "2548327512.jpeg", "2777917031.jpeg", "3367670757.jpeg", "3806233540.jpeg", "902668302.jpeg",
    ]),
  },
  {
    img: "/assets/images%20of%20university/events/WhatsApp-Image-2026-04-18-at-18.06.07.jpeg",
    date: "2026",
    title: "Workshop on Advanced Medical Techniques at Amaltas Medical College",
    desc: "Amaltas Medical College conducted an intensive workshop on advanced medical techniques, giving students and young clinicians hands-on exposure to modern diagnostic and procedural skills. Expert-led stations, simulation practice and live demonstrations bridged classroom theory with real-world clinical confidence.",
    gallery: gal("Workshop on Advanced Medical", [
      "135491927.jpeg", "1460543249.jpeg", "2688546606.jpeg", "3461667021.jpeg", "35206013.jpeg",
      "395516020.jpeg", "4105597983.jpeg",
    ]),
  },
  {
    img: "/assets/images%20of%20university/events/2.jpeg",
    date: "2026",
    title: "World Homoeopathy Day Celebration",
    desc: "The Amaltas Institute of Homoeopathy marked World Homoeopathy Day with lectures, awareness sessions and student presentations honouring the legacy of Dr. Samuel Hahnemann. The celebration reaffirmed the university's commitment to gentle, patient-centred healing and the continued advancement of homoeopathic education and research.",
    gallery: gal("World Homoeopathy Day Celebration", [
      "1059695508.jpeg", "147216227.jpeg", "1509994228.jpeg", "1629207928.jpeg", "2412249410.jpeg",
      "2588556869.jpeg", "3056387985.jpeg", "31754711.jpeg", "3217034130.jpeg", "4184558858.jpeg",
    ]),
  },
  {
    img: "/assets/images%20of%20university/events/WhatsApp-Image-2026-04-13-at-10.13.17-1.jpeg",
    date: "2026",
    title: "Celebrating the Healing Power of Nature",
  },
  {
    img: "/assets/images%20of%20university/events/WhatsApp-Image-2026-04-13-at-16.58.39.jpeg",
    date: "2026",
    title: "Graduation Ceremony",
    desc: "Amaltas University celebrated its graduating cohort at a proud convocation of caps, gowns and heartfelt farewells. Faculty, families and friends gathered to honour the achievements of the new healers stepping into the world — a milestone marking the end of one journey and the beginning of a lifetime of care and service.",
    gallery: gal("Graduation Ceremony", [
      "123863021.jpeg", "1518999223.jpeg", "2091041859.jpeg", "2275031415.jpeg", "2435276082.jpeg",
      "2694355762.jpeg", "283588566.jpeg", "2912066821.jpeg", "3058615207.jpeg", "3543631332.jpeg",
      "3731153976.jpeg", "4254481663.jpeg", "45267966.jpeg", "503457223.jpeg", "566631592.jpeg",
      "705010436.jpeg", "967192149.jpeg",
    ]),
  },
  {
    img: "/assets/images%20of%20university/events/WhatsApp-Image-2026-03-23-at-21.48.31.jpeg",
    date: "2026",
    title: "National Conference on “Emerging Trends in Artificial Intelligence for Advanced Health Care Delivery”",
    desc: "Amaltas University hosted a National Conference exploring how artificial intelligence is reshaping modern healthcare delivery. Academicians, clinicians and industry experts shared research on AI-driven diagnostics, predictive care and digital health — sparking rich discussion on the future of technology-enabled, patient-first medicine.",
    gallery: gal("National Conference", [
      "1213249757.jpeg", "1322534202.jpeg", "1505087871.jpeg", "1624770962.jpeg", "1740693344.jpeg",
      "1864246546.jpeg", "1987359000.jpeg", "24447729.jpeg", "2702887579.jpeg", "3791936862.jpeg",
      "3806879209.jpeg", "3930057147.jpeg", "4068829486.jpeg", "408677529.jpeg", "422106650.jpeg",
      "997386420.jpeg", "998804634.jpeg",
    ]),
  },
  {
    img: "/assets/images%20of%20university/events/WhatsApp-Image-2026-03-17-at-15.26.47.jpeg",
    date: "2026",
    title: "Orientation at Amaltas Institute of Medical Sciences",
  },
  {
    img: "/assets/images%20of%20university/events/WhatsApp-Image-2026-03-10-at-16.48.43.jpeg",
    date: "2026",
    title: "Women's Day Celebration 2k26",
  },
  {
    img: "/assets/images%20of%20university/events/WhatsApp-Image-2026-03-07-at-14.58.06.jpeg",
    date: "2026",
    title: "National Pharmacy Education Day",
  },
  {
    img: "/assets/images%20of%20university/events/3.jpeg",
    date: "2026",
    title: "Holi Celebrated with Great Joy at Amaltas Institute of Ayurveda",
  },
  {
    img: "/assets/images%20of%20university/events/WhatsApp-Image-2026-02-20-at-17.13.30.jpeg",
    date: "2026",
    title: "Amaltas Ayurveda Wins First Prize at Mahakal Van Mela 2026, Provides Free Treatment to 4,000 Patients",
  },
  {
    img: "/assets/images%20of%20university/events/feb-1.jpeg",
    date: "2026",
    title: "Freshers' Party",
  },
  {
    img: "/assets/images%20of%20university/events/jan-1.jpeg",
    date: "2026",
    title: "CME on “Mantrayoga as Mind Medicine”",
  },
  {
    img: "/assets/images%20of%20university/events/WhatsApp-Image-2025-12-18-at-15.07.02.jpeg",
    date: "2025",
    title: "Two-Day NCMSAP 2025 Held at Amaltas University, Dewas",
  },
];

export default function Events() {
  const [open, setOpen] = useState(null);        // event object shown in the modal
  const [lightbox, setLightbox] = useState(null); // index into open.gallery, or null

  // body-scroll lock + Escape / arrow-key handling while a modal is open
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (lightbox !== null) setLightbox(null);
        else setOpen(null);
      } else if (lightbox !== null && open.gallery) {
        if (e.key === "ArrowRight") setLightbox((i) => (i + 1) % open.gallery.length);
        if (e.key === "ArrowLeft") setLightbox((i) => (i - 1 + open.gallery.length) % open.gallery.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lightbox]);

  return (
    <>
      <PageHero
        crumb="Happenings / Events"
        eyebrow="Happenings"
        title="Events."
        sub="A look at the conferences, ceremonies, workshops, and celebrations that fill the Amaltas campus calendar."
        bgImg="/assets/images%20of%20university/events/P1_yoga.jpg"
      />

      {/* ── EVENTS GRID ── */}
      <section className="sec wrap">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 24 }}>
          {EVENTS.map((ev, i) => {
            const hasGallery = Array.isArray(ev.gallery) && ev.gallery.length > 0;
            return (
              <Reveal key={ev.img} delay={`d${(i % 3) + 1}`}>
                <div
                  className="card-lift"
                  onClick={hasGallery ? () => setOpen(ev) : undefined}
                  role={hasGallery ? "button" : undefined}
                  tabIndex={hasGallery ? 0 : undefined}
                  onKeyDown={hasGallery ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(ev); } } : undefined}
                  aria-label={hasGallery ? `${ev.title} — view photo gallery` : undefined}
                  style={{ background: "#fff", borderRadius: 18, overflow: "hidden", border: "1px solid rgba(11,44,24,.07)", height: "100%", display: "flex", flexDirection: "column", cursor: hasGallery ? "pointer" : "default" }}
                >
                  <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
                    <img
                      src={ev.img}
                      alt={ev.title}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                    {hasGallery && (
                      <span className="ev-photo-badge">
                        <Images size={13} /> {ev.gallery.length} photos
                      </span>
                    )}
                  </div>
                  <div style={{ padding: "18px 20px 22px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: C.slate, marginBottom: 9 }}>
                      <CalendarDays size={13} /> {ev.date}
                    </div>
                    <h3 style={{ fontSize: 15.5, lineHeight: 1.4, margin: 0 }}>{ev.title}</h3>
                    {hasGallery && (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 5, marginTop: 12, fontSize: 12.5, fontWeight: 700, color: C.emerald }}>
                        View gallery <ArrowRight size={14} />
                      </span>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: `radial-gradient(120% 140% at 80% 20%,${C.emerald} 0%,${C.navy} 55%)`, padding: "100px 0" }}>
        <div className="wrap" style={{ textAlign: "center", color: C.ivory }}>
          <Reveal>
            <span className="eyebrow" style={{ color: C.goldL }}>Be part of it</span>
            <h2 style={{ color: C.ivory, margin: "14px auto 0", maxWidth: 600 }}>Campus life never stands still.</h2>
            <p style={{ color: "rgba(247,244,236,.72)", fontSize: 16, maxWidth: 460, margin: "16px auto 34px", lineHeight: 1.7 }}>
              From conferences to celebrations, there's always something happening at Amaltas. Reach out to learn what's next.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/admissions" className="btn btn-gold">
                Begin Application <ArrowRight size={17} />
              </Link>
              <a href={`tel:${CONTACT.tollFree.replace(/-/g, "")}`} className="btn btn-ghost">
                <Phone size={15} /> {CONTACT.tollFree}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── EVENT GALLERY MODAL ── */}
      {open && (
        <div className="ev-modal-backdrop" onClick={() => setOpen(null)}>
          <div className="ev-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={open.title}>
            <button className="ev-modal-close" onClick={() => setOpen(null)} aria-label="Close">
              <X size={18} />
            </button>
            <div className="ev-modal-date"><CalendarDays size={13} /> {open.date}</div>
            <h2 className="ev-modal-title">{open.title}</h2>
            {open.desc && <p className="ev-modal-desc">{open.desc}</p>}
            {Array.isArray(open.gallery) && open.gallery.length > 0 && (
              <div className="ev-modal-gallery">
                {open.gallery.map((src, i) => (
                  <button key={src} className="ev-modal-thumb" onClick={() => setLightbox(i)} aria-label={`Open photo ${i + 1}`}>
                    <img src={src} alt={`${open.title} — photo ${i + 1}`} loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── FULL-SIZE LIGHTBOX ── */}
      {open && lightbox !== null && open.gallery && (
        <div className="ev-lightbox" onClick={() => setLightbox(null)}>
          <button className="ev-lightbox-close" onClick={() => setLightbox(null)} aria-label="Close photo">
            <X size={22} />
          </button>
          {open.gallery.length > 1 && (
            <button
              className="ev-lightbox-nav prev"
              onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + open.gallery.length) % open.gallery.length); }}
              aria-label="Previous photo"
            >
              <ChevronLeft size={26} />
            </button>
          )}
          <img className="ev-lightbox-img" src={open.gallery[lightbox]} alt={`${open.title} — photo ${lightbox + 1}`} onClick={(e) => e.stopPropagation()} />
          {open.gallery.length > 1 && (
            <button
              className="ev-lightbox-nav next"
              onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % open.gallery.length); }}
              aria-label="Next photo"
            >
              <ChevronRight size={26} />
            </button>
          )}
          <div className="ev-lightbox-count">{lightbox + 1} / {open.gallery.length}</div>
        </div>
      )}
    </>
  );
}
