// Trang hướng nghiệp
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { careerGuidanceArticles } from "../data/mockData";
import { FaMapMarkerAlt } from "react-icons/fa";

function CareerGuidancePage() {
  const navigate = useNavigate();
  const [locationFilter, setLocationFilter] = useState("");

  const handleCardClick = (article) => {
    navigate(`/career-guidance/${article.id}`);
  };

  // Filter articles by location
  const filteredArticles = useMemo(() => {
    if (!locationFilter) return careerGuidanceArticles;
    return careerGuidanceArticles.filter(
      (article) => article.location === locationFilter
    );
  }, [locationFilter]);

  return (
    <div className="page-wrapper min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🎯 Hướng nghiệp
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
                    <p className="text-sm text-gray-600 line-clamp-1">
                      📍 {article.location}
                    </p>
                  )}
                  {article.address && (
                    <p className="text-sm text-gray-600 line-clamp-1">
                      🏢 {article.address.split("\n")[0].trim()}
                    </p>
                  )}
                  {article.contact && (
                    <p className="text-sm text-gray-600 line-clamp-1">
                      📞{" "}
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
      </div>
    </div>
  );
}

export default CareerGuidancePage;
