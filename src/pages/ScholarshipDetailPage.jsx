// Trang chi tiết học bổng
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { contentService } from "../services/contentService";
import { Toast, useToast } from "../components/Toast";
import { FaArrowLeft, FaMapMarkerAlt, FaEnvelope, FaBuilding, FaCheckCircle, FaFileAlt, FaMoneyBillWave, FaGlobe, FaPhone } from "react-icons/fa";

function ScholarshipDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast, showToast, hideToast } = useToast();
  const [scholarship, setScholarship] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadScholarship = async () => {
      try {
        setIsLoading(true);
        const response = await contentService.getScholarship(id);
        // Backend trả về: { success: true, data: { scholarship: {...} } }
        const scholarshipData = response.data.data?.scholarship || response.data.scholarship || response.data.data || response.data;
        if (!scholarshipData) {
          throw new Error("Không tìm thấy học bổng");
        }
        // Parse content to extract requirements and documents if needed
        const content = scholarshipData.content || "";
        const requirements = content.includes("Yêu cầu:") 
          ? content.split("Yêu cầu:")[1]?.split("\n\n")[0]?.split("\n").filter(l => l.trim().startsWith("-")).map(l => l.trim().substring(1).trim())
          : [];
        const documents = content.includes("Giấy tờ cần thiết:")
          ? content.split("Giấy tờ cần thiết:")[1]?.split("\n\n")[0]?.split("\n").filter(l => l.trim().startsWith("-")).map(l => l.trim().substring(1).trim())
          : [];
        
        setScholarship({
          ...scholarshipData,
          id: scholarshipData._id || scholarshipData.id,
          organization: scholarshipData.organization || "",
          requirements: requirements.length > 0 ? requirements : scholarshipData.requirements || [],
          documents: documents.length > 0 ? documents : scholarshipData.documents || [],
        });
      } catch (error) {
        console.error("Error loading scholarship:", error);
        showToast("Không thể tải thông tin học bổng. Vui lòng thử lại sau.", "error");
        setTimeout(() => {
          navigate("/scholarships");
        }, 2000);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadScholarship();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (isLoading || !scholarship) {
    return (
      <div className="page-wrapper min-h-screen py-8 flex items-center justify-center">
        <div className="text-center">
          {isLoading ? (
            <p className="text-gray-600">Đang tải...</p>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy học bổng</h1>
              <button
                onClick={() => navigate("/scholarships")}
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
            onClick={() => navigate("/scholarships")}
            className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors mb-4 cursor-pointer"
          >
            <FaArrowLeft className="w-5 h-5" />
            <span>Quay lại danh sách</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {scholarship.title}
          </h1>
          <div className="flex items-center gap-2 text-purple-600 font-medium">
            <FaBuilding className="w-5 h-5" />
            <span>{scholarship.organization}</span>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Mô tả chương trình
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {scholarship.description}
            </p>
          </div>

          {/* Mức hỗ trợ */}
          {scholarship.amount && (
            <div className="mb-6 bg-green-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <FaMoneyBillWave className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Mức hỗ trợ</h4>
                  <p className="text-gray-700 font-medium">{scholarship.amount}</p>
                </div>
              </div>
            </div>
          )}

          {/* Yêu cầu/Điều kiện */}
          {scholarship.requirements && scholarship.requirements.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FaCheckCircle className="w-5 h-5 text-purple-600" />
                Yêu cầu / Điều kiện
              </h3>
              <ul className="space-y-2">
                {scholarship.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-700">
                    <span className="text-purple-600 font-bold mt-1">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Hồ sơ cần thiết */}
          {scholarship.documents && scholarship.documents.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FaFileAlt className="w-5 h-5 text-blue-600" />
                Hồ sơ cần thiết
              </h3>
              <ul className="space-y-2">
                {scholarship.documents.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-700">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-4 mb-6">
            {scholarship.location && (
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Địa điểm</h4>
                  <p className="text-gray-700">{scholarship.location}</p>
                </div>
              </div>
            )}

            {scholarship.contact && (
              <div className="flex items-start gap-3">
                <FaPhone className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Liên hệ</h4>
                  <p className="text-gray-700">{scholarship.contact}</p>
                </div>
              </div>
            )}

            {scholarship.email && (
              <div className="flex items-start gap-3">
                <FaEnvelope className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                  <a
                    href={`mailto:${scholarship.email}`}
                    className="text-purple-600 hover:text-purple-700 underline break-all"
                  >
                    {scholarship.email}
                  </a>
                </div>
              </div>
            )}

            {scholarship.website && (
              <div className="flex items-start gap-3">
                <FaGlobe className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Website</h4>
                  <a
                    href={scholarship.website.startsWith("http") ? scholarship.website : `https://${scholarship.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-700 underline break-all"
                  >
                    {scholarship.website}
                  </a>
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

export default ScholarshipDetailPage;


