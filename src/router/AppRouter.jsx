// App Router - Quản lý routing cho ứng dụng
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "../components/Header";
import LandingPage from "../pages/LandingPage";
import JobSeekerPage from "../pages/JobSeekerPage";
import EmployerPage from "../pages/EmployerPage";
import JobDetailPage from "../pages/JobDetailPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import OnboardingPage from "../pages/OnboardingPage";
import CharityPage from "../pages/CharityPage";
import HealthCarePage from "../pages/HealthCarePage";
import CareerGuidancePage from "../pages/CareerGuidancePage";
import SuccessStoriesPage from "../pages/SuccessStoriesPage";
import ReviewFAQPage from "../pages/ReviewFAQPage";
import EmployerDashboardPage from "../pages/EmployerDashboardPage";
import EmployerApplicationsPage from "../pages/EmployerApplicationsPage";
import ProfilePage from "../pages/ProfilePage";
import ManageCVPage from "../pages/ManageCVPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<JobSeekerPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/jobseeker" element={<JobSeekerPage />} />
        <Route path="/job/:id" element={<JobDetailPage />} />
        <Route path="/employer" element={<EmployerPage />} />
        <Route path="/employer/dashboard" element={<EmployerDashboardPage />} />
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
        <Route path="/healthcare" element={<HealthCarePage />} />
        <Route path="/career-guidance" element={<CareerGuidancePage />} />
        <Route path="/success-stories" element={<SuccessStoriesPage />} />
        <Route path="/review-faq" element={<ReviewFAQPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
