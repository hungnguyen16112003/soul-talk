// Trang chi tiết hướng nghiệp
import { useParams, useNavigate } from "react-router-dom";
import { careerGuidanceArticles } from "../data/mockData";
import { FaArrowLeft, FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, FaFacebook, FaUser, FaCalendarAlt } from "react-icons/fa";

function CareerGuidanceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = careerGuidanceArticles.find((a) => a.id === parseInt(id));

  if (!article) {
    return (
      <div className="page-wrapper min-h-screen py-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy bài viết</h1>
          <button
            onClick={() => navigate("/career-guidance")}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Quay lại
          </button>
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
            <div className="flex items-center gap-2">
              <FaUser className="w-4 h-4 text-purple-600" />
              <span className="font-medium">{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="w-4 h-4 text-purple-600" />
              <span>{article.date}</span>
            </div>
            {article.location && (
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="w-4 h-4 text-purple-600" />
                <span>{article.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Giới thiệu
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {article.content}
            </p>
          </div>

          <div className="space-y-4 mb-6">
            {article.address && (
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Địa chỉ</h4>
                  <p className="text-gray-700 whitespace-pre-line">{article.address}</p>
                </div>
              </div>
            )}

            {article.location && (
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Khu vực</h4>
                  <p className="text-gray-700">{article.location}</p>
                </div>
              </div>
            )}

            {article.contact && (
              <div className="flex items-start gap-3">
                <FaPhone className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Liên hệ</h4>
                  <p className="text-gray-700 whitespace-pre-line">{article.contact}</p>
                </div>
              </div>
            )}

            {article.email && (
              <div className="flex items-start gap-3">
                <FaEnvelope className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                  <a
                    href={`mailto:${article.email.split(',')[0].trim()}`}
                    className="text-purple-600 hover:text-purple-700 underline break-all"
                  >
                    {article.email}
                  </a>
                </div>
              </div>
            )}

            {article.website && (
              <div className="flex items-start gap-3">
                <FaGlobe className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Website</h4>
                  <a
                    href={article.website.startsWith("http") ? article.website : `https://${article.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-700 underline break-all"
                  >
                    {article.website}
                  </a>
                </div>
              </div>
            )}

            {article.fanpage && (
              <div className="flex items-start gap-3">
                <FaFacebook className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Fanpage</h4>
                  <a
                    href={article.fanpage.startsWith("http") ? article.fanpage : `https://${article.fanpage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-700 underline break-all"
                  >
                    {article.fanpage}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CareerGuidanceDetailPage;


