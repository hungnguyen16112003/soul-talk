// Trang chăm sóc sức khỏe
import { useState } from "react";
import { healthCareServices } from "../data/mockData";
import { Toast, useToast } from "../components/Toast";
import { FaTimes, FaMapMarkerAlt, FaPhone, FaHospital, FaCalendarAlt } from "react-icons/fa";

function HealthCarePage() {
  const { toast, showToast, hideToast } = useToast();
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookAppointment = (service, fromModal = false) => {
    showToast(
      `Đã đặt lịch: ${service.title}. Chúng tôi sẽ liên hệ với bạn để xác nhận!`,
      "success"
    );
    if (fromModal) {
      setIsModalOpen(false);
      setSelectedService(null);
    }
  };

  const handleViewDetails = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
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
            🏥 Dịch vụ chăm sóc sức khỏe
          </h1>
          <p className="text-gray-600">
            Dịch vụ y tế và chăm sóc sức khỏe dành cho người khuyết tật
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {healthCareServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col h-full overflow-hidden"
            >
              {service.image && (
                <div className="w-full h-48 overflow-hidden bg-gray-200">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
              <div className="p-6 flex flex-col flex-grow">
                <h2 
                  className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-purple-600 transition-colors"
                  onClick={() => handleViewDetails(service)}
                >
                  {service.title}
                </h2>
              <p className="text-purple-600 font-medium mb-2 line-clamp-1">
                {service.hospital}
              </p>
              <p className="text-gray-700 mb-4 line-clamp-3 flex-grow">
                {service.description}
              </p>
              <div className="mb-4 space-y-1">
                <p className="text-sm text-gray-600 line-clamp-1">
                  📍 {service.location}
                </p>
                <p className="text-sm text-gray-600 line-clamp-1">
                  📞 {service.contact}
                </p>
              </div>
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => handleViewDetails(service)}
                    className="flex-1 border-2 border-purple-600 text-purple-600 py-2 rounded-lg hover:bg-purple-50 transition-all font-medium cursor-pointer"
                  >
                    Xem chi tiết
                  </button>
                  <button
                    onClick={() => handleBookAppointment(service)}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg hover:shadow-lg transition-all font-medium cursor-pointer"
                  >
                    Đặt lịch hẹn
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal chi tiết */}
      {isModalOpen && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-xl">
              {selectedService.image && (
                <div className="w-full h-64 overflow-hidden bg-gray-200">
                  <img
                    src={selectedService.image}
                    alt={selectedService.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
              <div className="px-6 py-4 flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedService.title}
                  </h2>
                  <div className="flex items-center gap-2 text-purple-600 font-medium">
                    <FaHospital className="w-4 h-4" />
                    <span>{selectedService.hospital}</span>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="ml-4 text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full cursor-pointer"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Mô tả dịch vụ
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {selectedService.description}
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Địa điểm</h4>
                    <p className="text-gray-700">{selectedService.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaPhone className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Liên hệ</h4>
                    <p className="text-gray-700">{selectedService.contact}</p>
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
                onClick={() => handleBookAppointment(selectedService, true)}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2 cursor-pointer"
              >
                <FaCalendarAlt className="w-4 h-4" />
                <span>Đặt lịch hẹn</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HealthCarePage;

