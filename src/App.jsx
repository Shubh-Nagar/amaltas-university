import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { ScrollToTop } from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Institutions from "./pages/Institutions.jsx";
import Admissions from "./pages/Admissions.jsx";
import Why from "./pages/Why.jsx";
import Leadership from "./pages/Leadership.jsx";
import Voices from "./pages/Voices.jsx";
import NotFound from "./pages/NotFound.jsx";
import TheUniversity from "./pages/about/TheUniversity.jsx";
import BoardOfManagement from "./pages/about/BoardOfManagement.jsx";
import ChancellorMessage from "./pages/about/ChancellorMessage.jsx";
import AwardsRankings from "./pages/about/AwardsRankings.jsx";
import Accreditations from "./pages/about/Accreditations.jsx";
import MandatoryDisclosure from "./pages/about/MandatoryDisclosure.jsx";
import FounderChairmanMessage from "./pages/about/FounderChairmanMessage.jsx";
import ChairmanMessage from "./pages/about/ChairmanMessage.jsx";
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
          <Route path="/voices" element={<Voices />} />
          <Route path="/iqac" element={<IQAC />} />
          <Route path="/about/university" element={<TheUniversity />} />
          <Route path="/about/leadership" element={<BoardOfManagement />} />
          <Route path="/about/chancellor" element={<ChancellorMessage />} />
          <Route path="/about/awards" element={<AwardsRankings />} />
          <Route path="/about/accreditations" element={<Accreditations />} />
          <Route path="/about/disclosure" element={<MandatoryDisclosure />} />
          <Route path="/about/founder-chairman-message" element={<FounderChairmanMessage />} />
          <Route path="/about/chairman-message" element={<ChairmanMessage />} />
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
    </div>
  );
}
