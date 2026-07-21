import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import EnquiryWidget from "./components/EnquiryWidget.jsx";
import { ScrollToTop } from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Institutions from "./pages/Institutions.jsx";
import Admissions from "./pages/Admissions.jsx";
import Why from "./pages/Why.jsx";
import Leadership from "./pages/Leadership.jsx";
import LeaderMessage from "./pages/LeaderMessage.jsx";
import Voices from "./pages/Voices.jsx";
import NotFound from "./pages/NotFound.jsx";
import TheUniversity from "./pages/about/TheUniversity.jsx";
import AwardsRankings from "./pages/about/AwardsRankings.jsx";
import Accreditations from "./pages/about/Accreditations.jsx";
import MandatoryDisclosure from "./pages/about/MandatoryDisclosure.jsx";
import FeeDetails from "./pages/FeeDetails.jsx";
import Eligibility from "./pages/Eligibility.jsx";
import AdmissionProcedure from "./pages/AdmissionProcedure.jsx";
import HostelAccommodation from "./pages/student-life/HostelAccommodation.jsx";
import CampusLife from "./pages/student-life/CampusLife.jsx";
import AcademicFacilities from "./pages/facilities/AcademicFacilities.jsx";
import CampusFacilities from "./pages/facilities/CampusFacilities.jsx";
import NewsAndPress from "./pages/happenings/NewsAndPress.jsx";
import Events from "./pages/happenings/Events.jsx";
import PhotoGallery from "./pages/happenings/PhotoGallery.jsx";
import Alumni from "./pages/Alumni.jsx";
import AlumniLeadership from "./pages/alumni/Leadership.jsx";
import AlumniEngage from "./pages/alumni/Engage.jsx";
import AlumniAssist from "./pages/alumni/Assist.jsx";
import AlumniAchievers from "./pages/alumni/Achievers.jsx";
import AlumniGivingBack from "./pages/alumni/GivingBack.jsx";
import Mainpopup from "./components/Mainpopup.jsx";
import IQAC from "./pages/IQAC.jsx";

/* Real WhatsApp glyph (lucide-react ships no brand icons) */
function WhatsAppIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.386.7 4.607 1.907 6.47L4 29l7.72-1.87A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.8a9.76 9.76 0 0 1-4.98-1.36l-.357-.212-4.583 1.11 1.13-4.47-.233-.366A9.75 9.75 0 0 1 5.2 15c0-5.955 4.85-10.8 10.804-10.8 5.954 0 10.8 4.845 10.8 10.8s-4.846 10.8-10.8 10.8Zm5.94-8.09c-.325-.163-1.925-.95-2.223-1.058-.298-.109-.515-.163-.732.163-.217.325-.84 1.058-1.03 1.276-.19.217-.38.244-.705.081-.325-.163-1.372-.505-2.613-1.611-.966-.861-1.618-1.924-1.808-2.249-.19-.325-.02-.5.143-.663.147-.146.325-.38.488-.57.163-.19.217-.325.325-.542.108-.217.054-.407-.027-.57-.081-.163-.732-1.766-1.004-2.42-.264-.636-.532-.55-.732-.56l-.624-.011c-.217 0-.57.081-.868.407-.298.325-1.138 1.112-1.138 2.712 0 1.6 1.165 3.146 1.327 3.363.163.217 2.294 3.502 5.558 4.912.777.335 1.383.535 1.856.685.78.248 1.49.213 2.052.129.626-.093 1.925-.787 2.196-1.548.271-.76.271-1.412.19-1.548-.081-.136-.298-.217-.623-.38Z"/>
    </svg>
  );
}

/* Sticky conversion actions — WhatsApp + back-to-top on every page; Enquire on all pages except the homepage */
function GlobalFabs() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fab-stack" aria-hidden="false">
      {!isHome && <EnquiryWidget className="fab fab-enquire" />}
      <a
        href="https://wa.me/919977544111?text=Hi%2C%20I%27d%20like%20to%20know%20about%20admissions%20at%20Amaltas%20University."
        target="_blank" rel="noreferrer"
        className="fab fab-wa" aria-label="Chat with admissions on WhatsApp"
      >
        <WhatsAppIcon size={24} />
        <span className="fab-tip">Chat with us</span>
      </a>
      <button
        className={`fab fab-top ${showTop ? "show" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
}

export default function App() {

  return (
    <div className="amaltas">
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/institutions" element={<Institutions />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/why" element={<Why />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/leadership/:slug" element={<LeaderMessage />} />
          <Route path="/voices" element={<Voices />} />
          <Route path="/iqac" element={<IQAC />} />
          <Route path="/about/university" element={<TheUniversity />} />
          <Route path="/about/awards" element={<AwardsRankings />} />
          <Route path="/about/accreditations" element={<Accreditations />} />
          <Route path="/about/disclosure" element={<MandatoryDisclosure />} />
          <Route path="/admissions/fees" element={<FeeDetails />} />
          <Route path="/admissions/eligibility" element={<Eligibility />} />
          <Route path="/admissions/procedure" element={<AdmissionProcedure />} />
          <Route path="/student-life/hostel" element={<HostelAccommodation />} />
          <Route path="/student-life/campus-life" element={<CampusLife />} />
          <Route path="/facilities/academic" element={<AcademicFacilities />} />
          <Route path="/facilities/campus" element={<CampusFacilities />} />
          <Route path="/happenings/news" element={<NewsAndPress />} />
          <Route path="/happenings/events" element={<Events />} />
          <Route path="/happenings/photo-gallery" element={<PhotoGallery />} />
          <Route path="/alumni" element={<Alumni />} />
          <Route path="/alumni/leadership" element={<AlumniLeadership />} />
          <Route path="/alumni/engage" element={<AlumniEngage />} />
          <Route path="/alumni/assist" element={<AlumniAssist />} />
          <Route path="/alumni/achievers" element={<AlumniAchievers />} />
          <Route path="/alumni/giving-back" element={<AlumniGivingBack />} />
          <Route path="/test" element={<Mainpopup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <GlobalFabs />
    </div>
  );
}
