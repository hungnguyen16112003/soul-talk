// Trang hướng nghiệp
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { contentService } from "../services/contentService";
import useDataCacheStore from "../store/dataCacheStore";
import { Toast, useToast } from "../components/Toast";
import {
  FaMapMarkerAlt,
  FaBullseye,
  FaBuilding,
  FaPhone,
} from "react-icons/fa";

function CareerGuidancePage() {
  const navigate = useNavigate();
  const { toast, showToast, hideToast } = useToast();
  const getCache = useDataCacheStore((state) => state.getCache);
  const setCache = useDataCacheStore((state) => state.setCache);
  const [careerGuidanceArticles, setCareerGuidanceArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {
    const loadCareerGuidances = async () => {
      // Kiểm tra cache trước
      const cacheKey = "careerGuidance";
      const cachedData = getCache(cacheKey);

      if (cachedData) {
        setCareerGuidanceArticles(cachedData);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await contentService.getCareerGuidances();
        // Backend trả về: { success: true, data: { careerGuidances: [...], pagination: {...} } }
        const articles =
          response.data.data?.careerGuidances ||
          response.data.careerGuidances ||
          response.data.data ||
          response.data ||
          [];
        // Map _id to id for compatibility
        const mappedArticles = Array.isArray(articles)
          ? articles.map((article) => ({
              ...article,
              id: article._id || article.id,
              author: article.author || "",
              location: article.location || article.category || "",
            }))
          : [];
        setCareerGuidanceArticles(mappedArticles);
        // Lưu vào cache
        setCache(cacheKey, mappedArticles);
      } catch (error) {
        console.error("Error loading career guidance articles:", error);
        showToast(
          "Không thể tải danh sách bài viết hướng nghiệp. Vui lòng thử lại sau.",
          "error"
        );
        setCareerGuidanceArticles([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadCareerGuidances();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCardClick = (article) => {
    navigate(`/career-guidance/${article.id}`);
  };

  // Filter articles by location
  const filteredArticles = useMemo(() => {
    if (!locationFilter) return careerGuidanceArticles;
    return careerGuidanceArticles.filter(
      (article) =>
        article.location === locationFilter ||
        article.category === locationFilter
    );
  }, [locationFilter, careerGuidanceArticles]);

  return (
    <div className="page-wrapper min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <FaBullseye className="w-8 h-8 text-orange-500" />
            Hướng nghiệp
          </h1>
          <p className="text-gray-600">
            Các trung tâm hướng nghiệp và dạy nghề cho người khuyết tật
          </p>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <label className="text-sm font-medium text-gray-700">
              Lọc theo khu vực:
            </label>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent cursor-pointer"
            >
              <option value="">Tất cả</option>
              <option value="Miền Bắc">Miền Bắc</option>
              <option value="Miền Trung">Miền Trung</option>
              <option value="Miền Nam">Miền Nam</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-md">
            <p className="text-gray-600 text-lg">
              Đang tải danh sách bài viết hướng nghiệp...
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => handleCardClick(article)}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col h-full overflow-hidden"
              >
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-purple-600 transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-sm text-purple-600 font-medium mb-2 line-clamp-1">
                    {article.author}
                  </p>
                  <p className="text-gray-700 mb-4 line-clamp-3 flex-grow">
                    {article.content}
                  </p>
                  <div className="mb-4 space-y-1">
                    {article.location && (
                      <p className="text-sm text-gray-600 line-clamp-1 flex items-center gap-2">
                        <FaMapMarkerAlt className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                        {article.location}
                      </p>
                    )}
                    {article.address && (
                      <p className="text-sm text-gray-600 line-clamp-1 flex items-center gap-2">
                        <FaBuilding className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                        {article.address.split("\n")[0].trim()}
                      </p>
                    )}
                    {article.contact && (
                      <p className="text-sm text-gray-600 line-clamp-1 flex items-center gap-2">
                        <FaPhone className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
                        {article.contact
                          .split(" – ")[0]
                          .split(" hoặc ")[0]
                          .trim()}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-xs text-gray-500 line-clamp-1">
                      {article.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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

export default CareerGuidancePage;
