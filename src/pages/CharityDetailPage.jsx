// Trang chi tiết hỗ trợ khác
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { contentService } from "../services/contentService";
import { Toast, useToast } from "../components/Toast";
import { FaArrowLeft, FaMapMarkerAlt, FaEnvelope, FaBuilding, FaCheckCircle, FaFileAlt, FaMoneyBillWave, FaGlobe, FaPhone, FaFacebook } from "react-icons/fa";

function CharityDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast, showToast, hideToast } = useToast();
  const [program, setProgram] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCharity = async () => {
      try {
        setIsLoading(true);
        const response = await contentService.getCharity(id);
        // Backend trả về: { success: true, data: { charity: {...} } }
        const charityData = response.data.data?.charity || response.data.charity || response.data.data || response.data;
        if (!charityData) {
          throw new Error("Không tìm thấy chương trình");
        }
        setProgram({
          ...charityData,
          id: charityData._id || charityData.id,
          organization: charityData.organization || charityData.title,
        });
      } catch (error) {
        console.error("Error loading charity:", error);
        showToast("Không thể tải thông tin chương trình. Vui lòng thử lại sau.", "error");
        setTimeout(() => {
          navigate("/charity");
        }, 2000);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadCharity();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (isLoading || !program) {
    return (
      <div className="page-wrapper min-h-screen py-8 flex items-center justify-center">
        <div className="text-center">
          {isLoading ? (
            <p className="text-gray-600">Đang tải...</p>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy chương trình</h1>
              <button
                onClick={() => navigate("/charity")}
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
            onClick={() => navigate("/charity")}
            className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors mb-4 cursor-pointer"
          >
            <FaArrowLeft className="w-5 h-5" />
            <span>Quay lại danh sách</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {program.title}
          </h1>
          <div className="flex items-center gap-2 text-purple-600 font-medium">
            <FaBuilding className="w-5 h-5" />
            <span>{program.organization}</span>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Mô tả chương trình
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {program.description}
            </p>
          </div>

          {/* Mức hỗ trợ */}
          {program.amount && (
            <div className="mb-6 bg-green-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <FaMoneyBillWave className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Mức hỗ trợ</h4>
                  <p className="text-gray-700 font-medium">{program.amount}</p>
                </div>
              </div>
            </div>
          )}

          {/* Yêu cầu/Điều kiện */}
          {program.requirements && program.requirements.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FaCheckCircle className="w-5 h-5 text-purple-600" />
                Yêu cầu / Điều kiện
              </h3>
              <ul className="space-y-2">
                {program.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-700">
                    <span className="text-purple-600 font-bold mt-1">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Hồ sơ cần thiết */}
          {program.documents && program.documents.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FaFileAlt className="w-5 h-5 text-blue-600" />
                Hồ sơ cần thiết
              </h3>
              <ul className="space-y-2">
                {program.documents.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-700">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-4 mb-6">
            {program.address && (
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Địa chỉ</h4>
                  <p className="text-gray-700 whitespace-pre-line">{program.address}</p>
                </div>
              </div>
            )}

            {program.location && (
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Khu vực hoạt động</h4>
                  <p className="text-gray-700">{program.location}</p>
                </div>
              </div>
            )}

            {program.contact && (
              <div className="flex items-start gap-3">
                <FaPhone className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Hotline</h4>
                  <p className="text-gray-700 whitespace-pre-line">{program.contact}</p>
                </div>
              </div>
            )}

            {program.email && (
              <div className="flex items-start gap-3">
                <FaEnvelope className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                  <a
                    href={`mailto:${program.email.split(' ')[0]}`}
                    className="text-purple-600 hover:text-purple-700 underline break-all"
                  >
                    {program.email}
                  </a>
                </div>
              </div>
            )}

            {program.website && (
              <div className="flex items-start gap-3">
                <FaGlobe className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Website</h4>
                  <a
                    href={program.website.startsWith("http") ? program.website : `https://${program.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-700 underline break-all"
                  >
                    {program.website}
                  </a>
                </div>
              </div>
            )}

            {program.facebook && (
              <div className="flex items-start gap-3">
                <FaFacebook className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Facebook</h4>
                  <a
                    href={program.facebook.startsWith("http") ? program.facebook : `https://${program.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-700 underline break-all"
                  >
                    {program.facebook}
                  </a>
                </div>
              </div>
            )}

            {program.bankAccount && (
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <FaMoneyBillWave className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Thông tin ủng hộ Quỹ hội</h4>
                    <p className="text-gray-700 whitespace-pre-line text-sm">{program.bankAccount}</p>
                  </div>
                </div>
              </div>
            )}

            {program.moreInfo && (
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <FaBuilding className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Thông tin thêm</h4>
                    {program.moreInfo.startsWith("http") ? (
                      <a
                        href={program.moreInfo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-700 underline break-all"
                      >
                        {program.moreInfo}
                      </a>
                    ) : (
                      <p className="text-gray-700 whitespace-pre-line text-sm">{program.moreInfo}</p>
                    )}
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

export default CharityDetailPage;


