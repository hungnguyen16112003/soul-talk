// Trang học bổng
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { contentService } from "../services/contentService";
import useDataCacheStore from "../store/dataCacheStore";
import { Toast, useToast } from "../components/Toast";
import {
  FaGraduationCap,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";

function ScholarshipPage() {
  const navigate = useNavigate();
  const { toast, showToast, hideToast } = useToast();
  const getCache = useDataCacheStore((state) => state.getCache);
  const setCache = useDataCacheStore((state) => state.setCache);
  const [scholarships, setScholarships] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadScholarships = async () => {
      // Kiểm tra cache trước
      const cacheKey = "scholarships";
      const cachedData = getCache(cacheKey);

      if (cachedData) {
        setScholarships(cachedData);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await contentService.getScholarships();
        // Backend trả về: { success: true, data: { scholarships: [...], pagination: {...} } }
        const scholarshipsData =
          response.data.data?.scholarships ||
          response.data.scholarships ||
          response.data.data ||
          response.data ||
          [];
        // Map _id to id for compatibility
        const mappedScholarships = Array.isArray(scholarshipsData)
          ? scholarshipsData.map((scholarship) => ({
              ...scholarship,
              id: scholarship._id || scholarship.id,
              organization: scholarship.organization || "",
            }))
          : [];
        setScholarships(mappedScholarships);
        // Lưu vào cache
        setCache(cacheKey, mappedScholarships);
      } catch (error) {
        console.error("Error loading scholarships:", error);
        showToast(
          "Không thể tải danh sách học bổng. Vui lòng thử lại sau.",
          "error"
        );
        setScholarships([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadScholarships();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Memoize scholarships để tránh re-render không cần thiết
  const memoizedScholarships = useMemo(() => scholarships, [scholarships]);

  const handleCardClick = (scholarship) => {
    navigate(`/scholarships/${scholarship.id}`);
  };

  return (
    <div className="page-wrapper min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <FaGraduationCap className="w-8 h-8 text-blue-500" />
            Học bổng
          </h1>
          <p className="text-gray-600">
            Các chương trình học bổng dành cho người khuyết tật
          </p>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-md">
            <p className="text-gray-600 text-lg">
              Đang tải danh sách học bổng...
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {memoizedScholarships.map((scholarship) => (
              <div
                key={scholarship.id}
                onClick={() => handleCardClick(scholarship)}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col h-full overflow-hidden"
              >
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-purple-600 transition-colors">
                    {scholarship.title}
                  </h2>
                  <p className="text-purple-600 font-medium mb-2 line-clamp-1">
                    {scholarship.organization}
                  </p>
                  <p className="text-gray-700 mb-4 line-clamp-3 flex-grow">
                    {scholarship.description}
                  </p>
                  {scholarship.amount && (
                    <div className="mb-3  py-2 bg-green-50 rounded-lg flex items-center gap-2">
                      <FaMoneyBillWave className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <p className="text-sm font-semibold text-green-700 line-clamp-2">
                        {scholarship.amount}
                      </p>
                    </div>
                  )}
                  <div className="mb-4 space-y-1">
                    {scholarship.location && (
                      <p className="text-sm text-gray-600 line-clamp-1 flex items-center gap-2">
                        <FaMapMarkerAlt className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                        {scholarship.location}
                      </p>
                    )}
                    {scholarship.contact && (
                      <p className="text-sm text-gray-600 line-clamp-1 flex items-center gap-2">
                        <FaEnvelope className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                        {scholarship.contact}
                      </p>
                    )}
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

export default ScholarshipPage;
