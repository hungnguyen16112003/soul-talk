// App Router - Quản lý routing cho ứng dụng
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "../components/Header";
import LandingPage from "../pages/LandingPage";
import HomePage from "../pages/HomePage";
import JobSeekerPage from "../pages/JobSeekerPage";
import EmployerPage from "../pages/EmployerPage";
import JobDetailPage from "../pages/JobDetailPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import OnboardingPage from "../pages/OnboardingPage";
import CharityPage from "../pages/CharityPage";
import CharityDetailPage from "../pages/CharityDetailPage";
import ScholarshipPage from "../pages/ScholarshipPage";
import ScholarshipDetailPage from "../pages/ScholarshipDetailPage";
import HealthCarePage from "../pages/HealthCarePage";
import HealthCareDetailPage from "../pages/HealthCareDetailPage";
import CareerGuidancePage from "../pages/CareerGuidancePage";
import CareerGuidanceDetailPage from "../pages/CareerGuidanceDetailPage";
import SuccessStoryDetailPage from "../pages/SuccessStoryDetailPage";
import ReviewFAQPage from "../pages/ReviewFAQPage";
import EmployerDashboardPage from "../pages/EmployerDashboardPage";
import EmployerApplicationsPage from "../pages/EmployerApplicationsPage";
import ProfilePage from "../pages/ProfilePage";
import ManageCVPage from "../pages/ManageCVPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/jobseeker" element={<JobSeekerPage />} />
          <Route path="/job/:id" element={<JobDetailPage />} />
          <Route path="/employer" element={<EmployerPage />} />
          <Route
            path="/employer/dashboard"
            element={<EmployerDashboardPage />}
          />
          <Route
            path="/employer/applications"
            element={<EmployerApplicationsPage />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/manage-cv" element={<ManageCVPage />} />
          <Route path="/charity" element={<CharityPage />} />
          <Route path="/charity/:id" element={<CharityDetailPage />} />
          <Route path="/scholarships" element={<ScholarshipPage />} />
          <Route
            path="/scholarships/:id"
            element={<ScholarshipDetailPage />}
          />
          <Route path="/healthcare" element={<HealthCarePage />} />
          <Route path="/healthcare/:id" element={<HealthCareDetailPage />} />
          <Route path="/career-guidance" element={<CareerGuidancePage />} />
          <Route
            path="/career-guidance/:id"
            element={<CareerGuidanceDetailPage />}
          />
          <Route
            path="/success-stories/:id"
            element={<SuccessStoryDetailPage />}
          />
          <Route path="/review-faq" element={<ReviewFAQPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;
