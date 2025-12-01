// App Router - Quản lý routing cho ứng dụng
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "../components/Header";
import LandingPage from "../pages/LandingPage";
import HomePage from "../pages/HomePage";
import JobSeekerPage from "../pages/JobSeekerPage";
import EmployerPage from "../pages/EmployerPage";
import JobDetailPage from "../pages/JobDetailPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
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
import MyApplicationsPage from "../pages/MyApplicationsPage";
import ProfilePage from "../pages/ProfilePage";
import ManageCVPage from "../pages/ManageCVPage";
import CreateCVPage from "../pages/CreateCVPage";
import CreateJobPage from "../pages/CreateJobPage";
import InitialPreferencesModal from "../components/InitialPreferencesModal";
import useAuthStore from "../store/authStore";

function AppRouter() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const setUserPreferences = useAuthStore((state) => state.setUserPreferences);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  useEffect(() => {
    // Kiểm tra xem đã có token hoặc đã đăng nhập chưa
    const token = localStorage.getItem("token");
    const persistedAuth = localStorage.getItem("soul-talk-auth");

    // Nếu đã đăng nhập hoặc có token, không hiển thị modal
    if (
      isAuthenticated ||
      token ||
      (persistedAuth && JSON.parse(persistedAuth).isAuthenticated)
    ) {
      setShowPreferencesModal(false);
      setHasCheckedAuth(true);
      return;
    }

    // Kiểm tra xem đã từng hoàn thành preferences chưa
    const preferencesCompleted = localStorage.getItem("preferences-completed");
    if (preferencesCompleted === "true") {
      setShowPreferencesModal(false);
      setHasCheckedAuth(true);
      return;
    }

    // Chỉ hiển thị modal cho guest (chưa đăng nhập và chưa hoàn thành preferences)
    setHasCheckedAuth(true);
    let timeoutId;
    timeoutId = setTimeout(() => {
      setShowPreferencesModal(true);
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [isAuthenticated, user]);

  // Đóng modal ngay khi đăng nhập thành công
  useEffect(() => {
    if (isAuthenticated) {
      setShowPreferencesModal(false);
    }
  }, [isAuthenticated]);

  const handleGlobalPreferencesComplete = (prefs) => {
    if (
      prefs &&
      (prefs.region || prefs.disabilityType || prefs.severityLevel)
    ) {
      // Lưu preferences vào global store cho cả guest và user đăng nhập
      setUserPreferences(prefs);
      // Đánh dấu đã hoàn thành preferences
      localStorage.setItem("preferences-completed", "true");
    }
    setShowPreferencesModal(false);
  };

  return (
    <BrowserRouter>
      {!isAuthenticated && showPreferencesModal && hasCheckedAuth && (
        <InitialPreferencesModal
          isOpen={showPreferencesModal}
          onComplete={handleGlobalPreferencesComplete}
          onClose={() => {
            setShowPreferencesModal(false);
            localStorage.setItem("preferences-completed", "true");
          }}
        />
      )}
      <Header />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/jobseeker" element={<JobSeekerPage />} />
          <Route path="/job/:id" element={<JobDetailPage />} />
          <Route path="/employer" element={<EmployerPage />} />
          <Route path="/employer/create-job" element={<CreateJobPage />} />
          <Route
            path="/employer/dashboard"
            element={<EmployerDashboardPage />}
          />
          <Route
            path="/employer/applications"
            element={<EmployerApplicationsPage />}
          />
          <Route path="/my-applications" element={<MyApplicationsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/manage-cv" element={<ManageCVPage />} />
          <Route path="/create-cv" element={<CreateCVPage />} />
          <Route path="/charity" element={<CharityPage />} />
          <Route path="/charity/:id" element={<CharityDetailPage />} />
          <Route path="/scholarships" element={<ScholarshipPage />} />
          <Route path="/scholarships/:id" element={<ScholarshipDetailPage />} />
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
