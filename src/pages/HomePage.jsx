// Trang chủ mới với phần câu chuyện thành công
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { contentService } from "../services/contentService";
import useDataCacheStore from "../store/dataCacheStore";
import { Toast, useToast } from "../components/Toast";
import {
  FaCalendarAlt,
  FaArrowRight,
  FaQuoteLeft,
  FaGlobe,
} from "react-icons/fa";

const formatDate = (dateString) => {
  if (!dateString) return "Cập nhật gần đây";
  try {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return "Cập nhật gần đây";
  }
};

const getExcerpt = (fullText, limit = 420) => {
  if (!fullText) return "";
  // Loại bỏ marker chèn ảnh như [IMAGE:...]
  const withoutImages = fullText.replace(/\[IMAGE:[^\]]+\]/g, " ");
  const normalized = withoutImages.replace(/\s+/g, " ").trim();
  return normalized.length > limit
    ? `${normalized.slice(0, limit).trim()}...`
    : normalized;
};

function HomePage() {
  const navigate = useNavigate();
  const { toast, showToast, hideToast } = useToast();
  const getCache = useDataCacheStore((state) => state.getCache);
  const setCache = useDataCacheStore((state) => state.setCache);
  const [successStories, setSuccessStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSuccessStories = async () => {
      // Kiểm tra cache trước
      const cacheKey = "successStories";
      const cachedData = getCache(cacheKey);

      if (cachedData) {
        setSuccessStories(cachedData);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await contentService.getSuccessStories();
        // Backend trả về: { success: true, data: { successStories: [...], pagination: {...} } }
        const stories = response.data.data?.successStories || response.data.successStories || response.data.data || response.data || [];
        // Map _id to id for compatibility
        const mappedStories = Array.isArray(stories) ? stories.map((story) => ({
          ...story,
          id: story._id || story.id,
        })) : [];
        setSuccessStories(mappedStories);
        // Lưu vào cache
        setCache(cacheKey, mappedStories);
      } catch (error) {
        console.error("Error loading success stories:", error);
        showToast("Không thể tải câu chuyện thành công. Vui lòng thử lại sau.", "error");
        setSuccessStories([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadSuccessStories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Memoize success stories để tránh re-render không cần thiết
  const memoizedSuccessStories = useMemo(() => successStories, [successStories]);

  const featuredStory = useMemo(() => memoizedSuccessStories[0], [memoizedSuccessStories]);
  const galleryStories = useMemo(() => memoizedSuccessStories.slice(1, 5), [memoizedSuccessStories]);
  const listStories = useMemo(() => memoizedSuccessStories.slice(1), [memoizedSuccessStories]);

  const featuredExcerpt = useMemo(
    () => getExcerpt(featuredStory?.story || ""),
    [featuredStory?.story]
  );

  return (
    <div className="page-wrapper min-h-screen pb-16">
      <div className="relative z-10">
        {/* Hero section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 lg:pt-20">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 lg:p-14 relative overflow-hidden">
            <div className="absolute inset-y-0 right-0 opacity-10 pointer-events-none hidden md:block">
              <div className="w-80 h-full bg-gradient-to-b from-amber-200 via-amber-100 to-white blur-3xl" />
            </div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-flex items-center px-4 py-1 rounded-full bg-amber-50 text-amber-700 font-medium text-sm">
                  🌱 Nền tảng hỗ trợ người khuyết tật
                </span>
                <h1 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight mt-6">
                  Kết nối cơ hội, truyền cảm hứng vượt lên giới hạn
                </h1>
                <p className="text-lg text-gray-600 mt-6">
                  EqualHire cung cấp việc làm, học bổng và các chương trình hỗ
                  trợ chuyên biệt cho người khuyết tật tại Việt Nam.
                </p>

                <div className="flex flex-wrap gap-4 mt-8">
                  <button
                    onClick={() => navigate("/jobseeker")}
                    className="px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:shadow-lg transition-all cursor-pointer"
                  >
                    Tìm việc phù hợp
                  </button>
                  <button
                    onClick={() => navigate("/register")}
                    className="px-6 py-3 rounded-full font-semibold border-2 border-amber-200 text-amber-700 bg-white hover:border-amber-400 transition-all cursor-pointer"
                  >
                    Tham gia cộng đồng
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl p-6 shadow-inner">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Những con số nổi bật
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Công việc phù hợp", value: "150+" },
                    { label: "Suất học bổng", value: "40+" },
                    { label: "Chương trình hỗ trợ", value: "60+" },
                    { label: "Thành viên tích cực", value: "5.000+" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-white rounded-xl p-4 shadow-sm"
                    >
                      <p className="text-2xl font-bold text-amber-600">
                        {stat.value}
                      </p>
                      <p className="text-gray-600 text-sm">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success stories */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="bg-white rounded-3xl shadow-lg p-6 md:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <p className="text-sm font-semibold text-amber-600 uppercase tracking-wide">
                  Câu chuyện thành công
                </p>
                <h2 className="text-3xl font-bold text-gray-900">
                  Truyền cảm hứng từ những người dẫn đầu
                </h2>
              </div>
              <button
                onClick={() =>
                  featuredStory &&
                  navigate(`/success-stories/${featuredStory.id}`)
                }
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gray-200 text-gray-700 hover:border-amber-300 hover:text-amber-600 transition-colors cursor-pointer"
              >
                Xem chi tiết
                <FaArrowRight className="w-4 h-4" />
              </button>
            </div>

            {isLoading ? (
              <div className="bg-white rounded-xl p-12 text-center shadow-md">
                <p className="text-gray-600 text-lg">Đang tải câu chuyện thành công...</p>
              </div>
            ) : (
              <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-10">
                {/* Left column */}
                <div className="space-y-6">
                  {featuredStory && (
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Video/Ảnh bên trái - 50% */}
                    {featuredStory.videoUrl ? (
                      <div
                        className="relative w-full rounded-2xl overflow-hidden shadow-md bg-gray-100"
                        style={{ paddingBottom: "56.25%" }}
                      >
                        <iframe
                          src={`${featuredStory.videoUrl}?autoplay=1&mute=1`}
                          title={featuredStory.name}
                          className="absolute top-0 left-0 w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <div className="relative overflow-hidden rounded-2xl h-[320px] shadow-md group">
                        <img
                          src={featuredStory.image}
                          alt={featuredStory.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <p className="text-sm uppercase tracking-wide text-amber-100 mb-2">
                            {featuredStory.region || "Việt Nam"}
                          </p>
                          <h3 className="text-2xl font-bold mb-3">
                            {featuredStory.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-white/80">
                            <span className="flex items-center gap-2">
                              <FaCalendarAlt className="w-4 h-4" />
                              {formatDate(featuredStory.publishedAt)}
                            </span>
                            <span className="flex items-center gap-2">
                              <FaGlobe className="w-4 h-4" />
                              {featuredStory.source}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Thông tin bên phải - 50% */}
                    <article className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                          <span className="flex items-center gap-2">
                            <FaCalendarAlt className="w-4 h-4 text-amber-500" />
                            {formatDate(featuredStory.publishedAt)}
                          </span>
                          <span>•</span>
                          <span>{featuredStory.source}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-snug">
                          {featuredStory.name}
                        </h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                          {featuredExcerpt}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          navigate(`/success-stories/${featuredStory.id}`)
                        }
                        className="inline-flex items-center gap-2 text-amber-600 font-semibold hover:text-amber-700 transition-colors cursor-pointer"
                      >
                        Đọc hành trình truyền cảm hứng
                        <FaArrowRight className="w-4 h-4" />
                      </button>
                    </article>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {galleryStories.map((story) => (
                    <button
                      key={story.id}
                      onClick={() => navigate(`/success-stories/${story.id}`)}
                      className="relative rounded-2xl overflow-hidden h-40 shadow group cursor-pointer"
                    >
                      <img
                        src={story.image}
                        alt={story.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-left text-white">
                        <p className="text-xs uppercase tracking-wide text-amber-100">
                          {story.region || "Việt Nam"}
                        </p>
                        <p className="text-sm font-semibold line-clamp-2">
                          {story.name}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-5 border-t border-gray-100 pt-5">
                {listStories.map((story) => (
                  <button
                    key={story.id}
                    onClick={() => navigate(`/success-stories/${story.id}`)}
                    className="w-full text-left rounded-2xl border border-gray-100 p-4 hover:border-amber-200 hover:shadow transition-all cursor-pointer bg-white/60"
                  >
                    <div className="flex items-center justify-between mb-2 text-sm text-gray-500">
                      <span className="flex items-center gap-2">
                        <FaCalendarAlt className="w-4 h-4 text-amber-500" />
                        {formatDate(story.publishedAt)}
                      </span>
                      <span className="text-amber-600 font-medium">
                        {story.region || "Việt Nam"}
                      </span>
                    </div>
                    <p className="font-semibold text-gray-900">{story.title}</p>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2 flex items-start gap-2">
                      <FaQuoteLeft className="w-4 h-4 text-amber-200 flex-shrink-0 mt-1" />
                      {getExcerpt(story.story, 180)}
                    </p>
                  </button>
                ))}
              </div>
            </div>
            )}
          </div>
        </section>
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

export default HomePage;
