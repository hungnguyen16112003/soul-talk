// Trang chi tiết dịch vụ chăm sóc sức khỏe
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { contentService } from "../services/contentService";
import { Toast, useToast } from "../components/Toast";
import { FaArrowLeft, FaMapMarkerAlt, FaPhone, FaHospital, FaEnvelope, FaGlobe, FaFax, FaFacebook, FaStar } from "react-icons/fa";

function HealthCareDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast, showToast, hideToast } = useToast();
  const [service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadHealthCare = async () => {
      try {
        setIsLoading(true);
        const response = await contentService.getHealthCare(id);
        // Backend trả về: { success: true, data: { healthcare: {...} } }
        const healthCareData = response.data.data?.healthcare || response.data.data?.healthCare || response.data.healthcare || response.data.healthCare || response.data.data || response.data;
        if (!healthCareData) {
          throw new Error("Không tìm thấy dịch vụ");
        }
        // Parse content to extract review if needed
        const content = healthCareData.content || "";
        const review = content.includes("Đánh giá:") 
          ? content.split("Đánh giá:")[1]?.trim()
          : healthCareData.review || null;
        
        setService({
          ...healthCareData,
          id: healthCareData._id || healthCareData.id,
          hospital: healthCareData.hospital || healthCareData.title,
          location: healthCareData.location || healthCareData.region,
          review: review,
        });
      } catch (error) {
        console.error("Error loading healthcare:", error);
        showToast("Không thể tải thông tin dịch vụ. Vui lòng thử lại sau.", "error");
        setTimeout(() => {
          navigate("/healthcare");
        }, 2000);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadHealthCare();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (isLoading || !service) {
    return (
      <div className="page-wrapper min-h-screen py-8 flex items-center justify-center">
        <div className="text-center">
          {isLoading ? (
            <p className="text-gray-600">Đang tải...</p>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy dịch vụ</h1>
              <button
                onClick={() => navigate("/healthcare")}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors cursor-pointer"
              >
                Quay lại
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header với nút quay lại */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/healthcare")}
            className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors mb-4 cursor-pointer"
          >
            <FaArrowLeft className="w-5 h-5" />
            <span>Quay lại danh sách</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {service.title}
          </h1>
          <div className="flex items-center gap-2 text-purple-600 font-medium">
            <FaHospital className="w-5 h-5" />
            <span>{service.hospital}</span>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Mô tả dịch vụ
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {service.description}
            </p>
          </div>

          <div className="space-y-4 mb-6">
            {service.address ? (
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Địa chỉ</h4>
                  <p className="text-gray-700 whitespace-pre-line">{service.address}</p>
                </div>
              </div>
            ) : service.location ? (
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Khu vực</h4>
                  <p className="text-gray-700">{service.location}</p>
                </div>
              </div>
            ) : null}

            {service.contact && (
              <div className="flex items-start gap-3">
                <FaPhone className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Liên hệ</h4>
                  <p className="text-gray-700 whitespace-pre-line">{service.contact}</p>
                </div>
              </div>
            )}

            {service.email && (
              <div className="flex items-start gap-3">
                <FaEnvelope className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                  <a
                    href={`mailto:${service.email}`}
                    className="text-purple-600 hover:text-purple-700 underline break-all"
                  >
                    {service.email}
                  </a>
                </div>
              </div>
            )}

            {service.website && (
              <div className="flex items-start gap-3">
                <FaGlobe className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Website</h4>
                  <a
                    href={service.website.startsWith("http") ? service.website : `https://${service.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-700 underline break-all"
                  >
                    {service.website}
                  </a>
                </div>
              </div>
            )}

            {service.fax && (
              <div className="flex items-start gap-3">
                <FaFax className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Fax</h4>
                  <p className="text-gray-700">{service.fax}</p>
                </div>
              </div>
            )}

            {service.fanpage && (
              <div className="flex items-start gap-3">
                <FaFacebook className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Fanpage</h4>
                  <a
                    href={service.fanpage.startsWith("http") ? service.fanpage : `https://${service.fanpage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-700 underline break-all"
                  >
                    {service.fanpage}
                  </a>
                </div>
              </div>
            )}

            {service.review && (
              <div className="bg-yellow-50 rounded-lg p-4 mt-4">
                <div className="flex items-start gap-3">
                  <FaStar className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Cảm nhận từ người sử dụng dịch vụ</h4>
                    <p className="text-gray-700 whitespace-pre-line text-sm">{service.review}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />
    </div>
  );
}

export default HealthCareDetailPage;


