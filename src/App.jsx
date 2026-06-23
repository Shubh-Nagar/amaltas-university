import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { ScrollToTop } from "./components/Layout.jsx";
import AdmissionPopup from "./components/AdmissionPopup.jsx";
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

export default function App() {

  return (
    <div className="amaltas">
      <AdmissionPopup />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
