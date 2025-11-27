// Trang chi tiết câu chuyện thành công
import { useParams, useNavigate } from "react-router-dom";
import { successStories } from "../data/mockData";
import { FaArrowLeft, FaUser, FaExternalLinkAlt } from "react-icons/fa";

function SuccessStoryDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const story = successStories.find((s) => s.id === parseInt(id));

  if (!story) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy câu chuyện</h1>
          <button
            onClick={() => navigate("/success-stories")}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header với nút quay lại */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/success-stories")}
            className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors mb-4 cursor-pointer"
          >
            <FaArrowLeft className="w-5 h-5" />
            <span>Quay lại danh sách</span>
          </button>
          <div className="flex items-start gap-4 mb-4">
            <div className="text-6xl flex-shrink-0">{story.image}</div>
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {story.name}
              </h1>
              <h2 className="text-xl font-medium text-purple-600 mb-3">
                {story.title}
              </h2>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
              {story.story}
            </p>
          </div>

          {/* Source */}
          {story.source && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Nguồn:</span>
                {story.sourceUrl ? (
                  <a
                    href={story.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-700 underline flex items-center gap-1"
                  >
                    {story.source}
                    <FaExternalLinkAlt className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="font-medium">{story.source}</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SuccessStoryDetailPage;

