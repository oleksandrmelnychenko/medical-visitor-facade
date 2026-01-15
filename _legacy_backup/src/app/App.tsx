import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AppointmentPage } from "./pages/AppointmentPage";
import { PatientCenteredCarePage } from "./pages/PatientCenteredCarePage";
import { AboutGmedPage } from "./pages/AboutGmedPage";
import { FindDoctorPage } from "./pages/FindDoctorPage";
import { LocationsPage } from "./pages/LocationsPage";
import { PatientServicesPage } from "./pages/PatientServicesPage";
import { MedicalRecordsPage } from "./pages/MedicalRecordsPage";
import { InsurancePage } from "./pages/InsurancePage";
import { PatientPortalPage } from "./pages/PatientPortalPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { DataSecurityPage } from "./pages/DataSecurityPage";
import { HIPAACompliancePage } from "./pages/HIPAACompliancePage";
import { PatientRightsPage } from "./pages/PatientRightsPage";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        
        {/* Main Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/appointment" element={<AppointmentPage />} />
            
            {/* Care at Gmed */}
            <Route path="/patient-centered-care" element={<PatientCenteredCarePage />} />
            <Route path="/about-gmed" element={<AboutGmedPage />} />
            <Route path="/find-doctor" element={<FindDoctorPage />} />
            <Route path="/locations" element={<LocationsPage />} />
            
            {/* Patient Care */}
            <Route path="/patient-services" element={<PatientServicesPage />} />
            <Route path="/medical-records" element={<MedicalRecordsPage />} />
            <Route path="/insurance" element={<InsurancePage />} />
            <Route path="/patient-portal" element={<PatientPortalPage />} />
            
            {/* Trust & Confidentiality */}
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/data-security" element={<DataSecurityPage />} />
            <Route path="/hipaa-compliance" element={<HIPAACompliancePage />} />
            <Route path="/patient-rights" element={<PatientRightsPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}