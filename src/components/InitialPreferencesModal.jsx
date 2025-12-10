// Modal chọn thông tin ban đầu: miền, loại khuyết tật, mức độ
import { useState } from "react";
import { 
  FaMapMarkerAlt, 
  FaTimes, 
  FaCheck, 
  FaDeaf,
  FaEye,
  FaWheelchair,
  FaBrain,
  FaHandsHelping
} from "react-icons/fa";
import { disabilityTypes, severityLevels } from "../data/mockData";

const regions = [
  { id: "mien-bac", name: "Miền Bắc" },
  { id: "mien-trung", name: "Miền Trung" },
  { id: "mien-nam", name: "Miền Nam" },
];

function InitialPreferencesModal({ isOpen, onComplete, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedDisability, setSelectedDisability] = useState(null);
  const [selectedSeverity, setSelectedSeverity] = useState(null);

  if (!isOpen) return null;

  // Hàm đóng modal và reset về null
  const handleClose = () => {
    onComplete({
      region: null,
      disabilityType: null,
      severityLevel: null,
    });
    if (onClose) {
      onClose();
    }
  };

  const handleNext = () => {
    if (step === 1 && !selectedRegion) {
      return;
    }
    if (step === 2 && !selectedDisability) {
      return;
    }
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    if (!selectedSeverity) {
      return;
    }
    onComplete({
      region: selectedRegion,
      disabilityType: selectedDisability?.name,
      severityLevel: selectedSeverity?.name,
    });
  };

  return (
    <div
      className="!fixed inset-0 !z-[99] flex items-center justify-center p-4 bg-white/40 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl shadow-amber-100/70 border border-amber-100 max-w-2xl w-full p-6 animate-scale-in max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="w-6 h-6 text-amber-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              Thiết lập thông tin tìm việc
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                step >= 1
                  ? "bg-amber-500 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {step > 1 ? <FaCheck className="w-4 h-4" /> : "1"}
            </div>
            <div
              className={`w-12 h-1 ${
                step >= 2 ? "bg-amber-500" : "bg-gray-300"
              }`}
            />
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                step >= 2
                  ? "bg-amber-500 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {step > 2 ? <FaCheck className="w-4 h-4" /> : "2"}
            </div>
            <div
              className={`w-12 h-1 ${
                step >= 3 ? "bg-amber-500" : "bg-gray-300"
              }`}
            />
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                step >= 3
                  ? "bg-amber-500 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              3
            </div>
          </div>
        </div>

        {/* Step 1: Chọn miền */}
        {step === 1 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Bước 1: Chọn khu vực tìm việc
            </h3>
            <p className="text-gray-600 mb-6">
              Vui lòng chọn khu vực bạn muốn tìm việc để chúng tôi có thể đề
              xuất các công việc phù hợp nhất cho bạn.
            </p>
            <div className="space-y-3">
              {regions.map((region) => (
                <button
                  key={region.id}
                  onClick={() => setSelectedRegion(region.name)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left cursor-pointer ${
                    selectedRegion === region.name
                      ? "border-amber-500 bg-amber-50 shadow-md"
                      : "border-gray-200 hover:border-amber-300 hover:bg-amber-50/60"
                  }`}
                >
                  <span
                    className={`text-lg font-semibold ${
                      selectedRegion === region.name
                        ? "text-amber-700"
                        : "text-gray-700"
                    }`}
                  >
                    {region.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Chọn loại khuyết tật */}
        {step === 2 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Bước 2: Chọn loại khuyết tật
            </h3>
            <p className="text-gray-600 mb-6">
              Thông tin này giúp chúng tôi tìm công việc phù hợp nhất với khả
              năng của bạn.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {disabilityTypes.map((type) => {
                // Map icon name to React Icon component
                let IconComponent = null;
                let iconColor = "text-amber-600";
                
                if (type.name === "Khuyết tật nghe, nói") {
                  IconComponent = FaDeaf;
                  iconColor = "text-blue-600";
                } else if (type.name === "Khuyết tật nhìn") {
                  IconComponent = FaEye;
                  iconColor = "text-purple-600";
                } else if (type.name === "Khuyết tật vận động") {
                  IconComponent = FaWheelchair;
                  iconColor = "text-green-600";
                } else if (type.name === "Khuyết tật trí tuệ" || type.name === "Khuyết tật thần kinh, tâm thần") {
                  IconComponent = FaBrain;
                  iconColor = "text-pink-600";
                } else if (type.name === "Khuyết tật khác") {
                  IconComponent = FaHandsHelping;
                  iconColor = "text-amber-600";
                }

                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedDisability(type)}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      selectedDisability?.id === type.id
                        ? "border-amber-500 bg-amber-50 scale-105"
                        : "border-gray-300 hover:border-amber-300"
                    }`}
                  >
                    {IconComponent && (
                      <div className="flex justify-center mb-2">
                        <IconComponent className={`w-12 h-12 ${iconColor}`} />
                      </div>
                    )}
                    <div className="font-semibold text-gray-900 text-sm text-center">
                      {type.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Chọn mức độ */}
        {step === 3 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Bước 3: Chọn mức độ
            </h3>
            <p className="text-gray-600 mb-6">
              Vui lòng chọn mức độ khuyết tật để chúng tôi có thể đề xuất công
              việc phù hợp nhất.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {severityLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setSelectedSeverity(level)}
                  className={`p-6 rounded-xl border-2 transition-all text-left cursor-pointer ${
                    selectedSeverity?.id === level.id
                      ? "border-amber-500 bg-amber-50 scale-105"
                      : "border-gray-300 hover:border-amber-300"
                  }`}
                >
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {level.name}
                  </h4>
                  <p className="text-gray-600 text-sm">{level.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between mt-6 gap-3">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all cursor-pointer"
            >
              ← Quay lại
            </button>
          ) : (
            <div></div>
          )}
          <div className="flex gap-3">
            {step < 3 ? (
              <button
                onClick={handleNext}
                disabled={
                  (step === 1 && !selectedRegion) ||
                  (step === 2 && !selectedDisability)
                }
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  (step === 1 && selectedRegion) ||
                  (step === 2 && selectedDisability)
                    ? "bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-white shadow-md hover:shadow-lg cursor-pointer animate-gradient-slide"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Tiếp tục →
              </button>
            ) : (
              <button
                onClick={handleComplete}
                disabled={!selectedSeverity}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedSeverity
                    ? "bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-white shadow-md hover:shadow-lg cursor-pointer animate-gradient-slide"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Hoàn thành
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InitialPreferencesModal;
