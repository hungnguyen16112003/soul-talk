// Trang onboarding cho người tìm việc - chọn loại khuyết tật và mức độ
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toast, useToast } from "../components/Toast";
import { disabilityTypes, severityLevels } from "../data/mockData";

function OnboardingPage() {
  const navigate = useNavigate();
  const { toast, showToast, hideToast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedDisability, setSelectedDisability] = useState(null);
  const [selectedSeverity, setSelectedSeverity] = useState(null);

  // Xử lý chọn loại khuyết tật
  const handleSelectDisability = (type) => {
    setSelectedDisability(type);
  };

  // Chuyển sang bước 2
  const handleNextToStep2 = () => {
    if (!selectedDisability) {
      showToast("Vui lòng chọn loại khuyết tật!", "warning");
      return;
    }
    setStep(2);
  };

  // Xử lý chọn mức độ
  const handleSelectSeverity = (level) => {
    setSelectedSeverity(level);
  };

  // Hoàn thành onboarding
  const handleComplete = () => {
    if (!selectedSeverity) {
      showToast("Vui lòng chọn mức độ!", "warning");
      return;
    }

    // Lưu profile vào localStorage
    const profile = {
      disabilityType: selectedDisability.name,
      severityLevel: selectedSeverity.name,
      completedAt: new Date().toISOString(),
    };
    localStorage.setItem("jobSeekerProfile", JSON.stringify(profile));

    showToast("Cập nhật hồ sơ thành công!", "success");
    setTimeout(() => {
      navigate("/jobseeker");
    }, 1000);
  };

  // Bỏ qua onboarding
  const handleSkip = () => {
    navigate("/jobseeker");
  };

  return (
    <div className="page-wrapper min-h-screen py-8">
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Hoàn thiện hồ sơ của bạn
          </h1>
          <p className="text-gray-600">
            Thông tin này giúp chúng tôi tìm công việc phù hợp nhất cho bạn
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= 1
                  ? "bg-amber-600 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              1
            </div>
            <div
              className={`w-20 h-1 ${
                step >= 2 ? "bg-amber-600" : "bg-gray-300"
              }`}
            />
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= 2
                  ? "bg-amber-600 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              2
            </div>
            <div
              className={`w-20 h-1 ${
                step >= 3 ? "bg-amber-600" : "bg-gray-300"
              }`}
            />
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= 3
                  ? "bg-amber-600 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              3
            </div>
          </div>
        </div>

        {/* Step 1: Chọn loại khuyết tật */}
        {step === 1 && (
          <div className="bg-white rounded-xl p-8 shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Bước 1: Chọn loại khuyết tật
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {disabilityTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleSelectDisability(type)}
                  className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
                    selectedDisability?.id === type.id
                      ? "border-amber-600 bg-amber-50 scale-105"
                      : "border-gray-300 hover:border-amber-300"
                  }`}
                >
                  <div className="text-4xl mb-2">{type.icon}</div>
                  <div className="font-semibold text-gray-900">{type.name}</div>
                </button>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleNextToStep2}
                className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all cursor-pointer"
              >
                Tiếp tục →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Chọn mức độ */}
        {step === 2 && (
          <div className="bg-white rounded-xl p-8 shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Bước 2: Chọn mức độ
            </h2>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {severityLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => handleSelectSeverity(level)}
                  className={`p-6 rounded-xl border-2 transition-all text-left cursor-pointer ${
                    selectedSeverity?.id === level.id
                      ? "border-amber-600 bg-amber-50 scale-105"
                      : "border-gray-300 hover:border-amber-300"
                  }`}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {level.name}
                  </h3>
                  <p className="text-gray-600">{level.description}</p>
                </button>
              ))}
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="text-gray-600 hover:text-gray-900 px-6 py-2 rounded-lg border border-gray-300 hover:border-gray-400 transition-all cursor-pointer"
              >
                ← Quay lại
              </button>
              <button
                onClick={handleComplete}
                className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all cursor-pointer"
              >
                Hoàn thành
              </button>
            </div>
          </div>
        )}

        {/* Nút bỏ qua */}
        <div className="text-center mt-6">
          <button
            onClick={handleSkip}
            className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
          >
            Bỏ qua
          </button>
        </div>
      </div>
    </div>
  );
}

export default OnboardingPage;


