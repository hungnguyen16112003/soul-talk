// Trang chi tiết hướng nghiệp
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { contentService } from "../services/contentService";
import { Toast, useToast } from "../components/Toast";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaFacebook,
  FaUser,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

function CareerGuidanceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast, showToast, hideToast } = useToast();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCareerGuidance = async () => {
      try {
        setIsLoading(true);

        const response = await contentService.getCareerGuidance(id);
        const articleData =
          response.data.data?.careerGuidance ||
          response.data.careerGuidance ||
          response.data.data ||
          response.data;

        if (!articleData) throw new Error("Không tìm thấy bài viết");

        setArticle({
          ...articleData,
          id: articleData._id || articleData.id,
          author: articleData.author || "Không có",
          location: articleData.location || articleData.category || "",
          region: articleData.category || "",
          date:
            articleData.date ||
            new Date(articleData.createdAt).toLocaleDateString("vi-VN"),
          updated:
            new Date(articleData.updatedAt).toLocaleString("vi-VN") || "",
        });
      } catch (error) {
        console.error("Error loading career guidance:", error);
        showToast(
          "Không thể tải thông tin bài viết. Vui lòng thử lại sau.",
          "error"
        );

        setTimeout(() => navigate("/career-guidance"), 2000);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) loadCareerGuidance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (isLoading || !article) {
    return (
      <div className="page-wrapper min-h-screen py-8 flex items-center justify-center">
        <div className="text-center">
          {isLoading ? (
            <p className="text-gray-600">Đang tải...</p>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Không tìm thấy bài viết
              </h1>
              <button
                onClick={() => navigate("/career-guidance")}
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
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/career-guidance")}
            className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors mb-4 cursor-pointer"
          >
            <FaArrowLeft className="w-5 h-5" />
            <span>Quay lại danh sách</span>
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-2">
            {/* <div className="flex items-center gap-2">
              <FaUser className="w-4 h-4 text-purple-600" />
              <span className="font-medium">{article.author}</span>
            </div> */}

            <div className="flex items-center gap-2">
              <FaCalendarAlt className="w-4 h-4 text-purple-600" />
              <span>{article.date}</span>
            </div>

            {article.region && (
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="w-4 h-4 text-purple-600" />
                <span>{article.region}</span>
              </div>
            )}
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 text-sm">
            {article.isActive ? (
              <p className="flex items-center gap-2 text-green-600">
                <FaCheckCircle /> Đang hoạt động
              </p>
            ) : (
              <p className="flex items-center gap-2 text-red-600">
                <FaTimesCircle /> Ngừng hoạt động
              </p>
            )}
          </div>
        </div>

        {/* Nội dung chính */}
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          {/* ẢNH ĐẠI DIỆN */}
          {article.image && (
            <div className="mb-6">
              <img
                src={article.image}
                alt={article.title}
                className="w-full rounded-xl shadow-md"
              />
            </div>
          )}

          {/* MÔ TẢ */}
          {article.description && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Mô tả
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {article.description}
              </p>
            </div>
          )}

          {/* GIỚI THIỆU */}
          {article.content && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Giới thiệu
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {article.content}
              </p>
            </div>
          )}

          <div className="space-y-4 mb-6">
            {/* ADD: Địa chỉ */}
            {article.address && (
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Địa chỉ</h4>
                  <p className="text-gray-700 whitespace-pre-line">
                    {article.address}
                  </p>
                </div>
              </div>
            )}

            {/* Khu vực */}
            {article.region && (
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Khu vực</h4>
                  <p className="text-gray-700">{article.region}</p>
                </div>
              </div>
            )}

            {/* Liên hệ */}
            {article.contact && (
              <div className="flex items-start gap-3">
                <FaPhone className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Liên hệ</h4>
                  <p className="text-gray-700 whitespace-pre-line">
                    {article.contact}
                  </p>
                </div>
              </div>
            )}

            {/* Email */}
            {article.email && (
              <div className="flex items-start gap-3">
                <FaEnvelope className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                  <a
                    href={`mailto:${article.email.split(",")[0].trim()}`}
                    className="text-purple-600 hover:text-purple-700 underline break-all"
                  >
                    {article.email}
                  </a>
                </div>
              </div>
            )}

            {/* Website */}
            {article.website && (
              <div className="flex items-start gap-3">
                <FaGlobe className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Website</h4>
                  <a
                    href={
                      article.website.startsWith("http")
                        ? article.website
                        : `https://${article.website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-700 underline break-all"
                  >
                    {article.website}
                  </a>
                </div>
              </div>
            )}

            {/* Fanpage */}
            {article.fanpage && (
              <div className="flex items-start gap-3">
                <FaFacebook className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Fanpage</h4>
                  <a
                    href={
                      article.fanpage.startsWith("http")
                        ? article.fanpage
                        : `https://${article.fanpage}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-700 underline break-all"
                  >
                    {article.fanpage}
                  </a>
                </div>
              </div>
            )}

            {/* Ngày cập nhật */}
            {article.updated && (
              <div className="flex items-start gap-3">
                <FaCalendarAlt className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Cập nhật lần cuối
                  </h4>
                  <p className="text-gray-700">{article.updated}</p>
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

export default CareerGuidanceDetailPage;
