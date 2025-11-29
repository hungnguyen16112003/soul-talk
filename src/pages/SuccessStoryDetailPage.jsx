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
      <div className="page-wrapper min-h-screen py-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Không tìm thấy câu chuyện
          </h1>
          <button
            onClick={() => navigate("/")}
            className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors"
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
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-amber-600 transition-colors mb-4 cursor-pointer"
          >
            <FaArrowLeft className="w-5 h-5" />
            <span>Quay lại danh sách</span>
          </button>
          <div className="flex flex-col gap-6">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-lg bg-gray-100">
              {story.videoUrl ? (
                <div
                  className="relative w-full"
                  style={{ paddingBottom: "56.25%" }}
                >
                  <iframe
                    src={`${story.videoUrl}?autoplay=1&mute=1`}
                    title={story.name}
                    className="absolute top-0 left-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : story.image ? (
                <div className="relative w-full h-64 sm:h-80">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm uppercase tracking-wide text-amber-200">
                      {story.region || "Việt Nam"}
                    </p>
                    <p className="text-xs opacity-90">
                      {story.publishedAt &&
                        new Date(story.publishedAt).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-64 sm:h-80 flex items-center justify-center text-6xl">
                  {"🌟"}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {story.name}
              </h1>
              <h2 className="text-xl font-medium text-amber-600 mb-3">
                {story.title}
              </h2>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <div className="prose max-w-none">
            {story.story.split("\n").map((paragraph, index) => {
              // Kiểm tra nếu paragraph chứa marker ảnh
              if (paragraph.includes("[IMAGE:")) {
                const imageUrl = paragraph.match(/\[IMAGE:(.+?)\]/)?.[1];
                if (imageUrl) {
                  return (
                    <div key={index} className="my-6">
                      <img
                        src={imageUrl}
                        alt={story.name}
                        className="w-full rounded-lg shadow-md"
                      />
                    </div>
                  );
                }
              }
              return (
                <p
                  key={index}
                  className="text-gray-700 leading-relaxed text-base mb-4"
                >
                  {paragraph}
                </p>
              );
            })}
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
                    className="text-amber-600 hover:text-amber-700 underline flex items-center gap-1"
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
