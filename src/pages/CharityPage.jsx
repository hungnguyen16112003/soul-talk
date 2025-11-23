// Trang từ thiện
import { useState } from "react";
import { charityPrograms } from "../data/mockData";
import { Toast, useToast } from "../components/Toast";
import { FaTimes, FaMapMarkerAlt, FaEnvelope, FaBuilding } from "react-icons/fa";

function CharityPage() {
  const { toast, showToast, hideToast } = useToast();
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRegister = (program, fromModal = false) => {
    showToast(
      `Đã đăng ký chương trình: ${program.title}. Chúng tôi sẽ liên hệ với bạn sớm!`,
      "success"
    );
    if (fromModal) {
      setIsModalOpen(false);
      setSelectedProgram(null);
    }
  };

  const handleViewDetails = (program) => {
    setSelectedProgram(program);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProgram(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            💝 Chương trình từ thiện
          </h1>
          <p className="text-gray-600">
            Các chương trình hỗ trợ dành cho người khuyết tật
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {charityPrograms.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow flex flex-col h-full"
            >
              <h2 
                className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-purple-600 transition-colors"
                onClick={() => handleViewDetails(program)}
              >
                {program.title}
              </h2>
              <p className="text-purple-600 font-medium mb-2 line-clamp-1">
                {program.organization}
              </p>
              <p className="text-gray-700 mb-4 line-clamp-3 flex-grow">
                {program.description}
              </p>
              <div className="mb-4 space-y-1">
                <p className="text-sm text-gray-600 line-clamp-1">
                  📍 {program.location}
                </p>
                <p className="text-sm text-gray-600 line-clamp-1">
                  📧 {program.contact}
                </p>
              </div>
              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => handleViewDetails(program)}
                  className="flex-1 border-2 border-purple-600 text-purple-600 py-2 rounded-lg hover:bg-purple-50 transition-all font-medium cursor-pointer"
                >
                  Xem chi tiết
                </button>
                <button
                  onClick={() => handleRegister(program)}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg hover:shadow-lg transition-all font-medium cursor-pointer"
                >
                  Đăng ký ngay
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal chi tiết */}
      {isModalOpen && selectedProgram && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-start rounded-t-xl">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedProgram.title}
                </h2>
                <div className="flex items-center gap-2 text-purple-600 font-medium">
                  <FaBuilding className="w-4 h-4" />
                  <span>{selectedProgram.organization}</span>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="ml-4 text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full cursor-pointer"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Mô tả chương trình
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {selectedProgram.description}
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Địa điểm</h4>
                    <p className="text-gray-700">{selectedProgram.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaEnvelope className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Liên hệ</h4>
                    <p className="text-gray-700">{selectedProgram.contact}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex gap-3 rounded-b-xl">
              <button
                onClick={closeModal}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-100 transition-all font-medium cursor-pointer"
              >
                Đóng
              </button>
              <button
                onClick={() => handleRegister(selectedProgram, true)}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg hover:shadow-lg transition-all font-medium cursor-pointer"
              >
                Đăng ký ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CharityPage;

