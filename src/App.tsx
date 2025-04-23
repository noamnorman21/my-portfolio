import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"; // העמוד הראשי שלך
import FacebookShare from "./pages/FacebookShare";
import PrivacyPolicy from "./pages/PrivacyPolicy";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* זה ראוט "סודי" – אין לינק אליו, רק אם מישהו מגיע ישירות ל־URL */}
      <Route path="/facebook-share" element={<FacebookShare />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    </Routes>
  );
}
