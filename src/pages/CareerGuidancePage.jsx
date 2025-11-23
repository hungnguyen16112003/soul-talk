// Trang hướng nghiệp
import { useState } from "react";
import { careerGuidanceArticles } from "../data/mockData";
import { FaTimes, FaUser, FaCalendarAlt } from "react-icons/fa";

function CareerGuidancePage() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReadMore = (article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🎯 Hướng nghiệp
          </h1>
          <p className="text-gray-600">
            Bài viết và tư vấn về định hướng nghề nghiệp
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {careerGuidanceArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow flex flex-col h-full"
            >
              <h2 
                className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-purple-600 transition-colors"
                onClick={() => handleReadMore(article)}
              >
                {article.title}
              </h2>
              <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                Tác giả: {article.author}
              </p>
              <p className="text-gray-700 mb-4 line-clamp-3 flex-grow">
                {article.content}
              </p>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-xs text-gray-500 line-clamp-1">
                  {article.date}
                </span>
                <button 
                  onClick={() => handleReadMore(article)}
                  className="text-purple-600 hover:text-purple-700 font-medium text-sm whitespace-nowrap hover:underline transition-all cursor-pointer"
                >
                  Đọc thêm →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal đọc thêm */}
      {isModalOpen && selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-start rounded-t-xl">
              <div className="flex-1 pr-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {selectedArticle.title}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaUser className="w-4 h-4 text-purple-600" />
                    <span className="font-medium">{selectedArticle.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="w-4 h-4 text-purple-600" />
                    <span>{selectedArticle.date}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full flex-shrink-0 cursor-pointer"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-6">
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
                  {selectedArticle.content}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 rounded-b-xl">
              <button
                onClick={closeModal}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg hover:shadow-lg transition-all font-medium cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CareerGuidancePage;

