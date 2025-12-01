// Trang hỗ trợ khác
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { contentService } from "../services/contentService";
import useDataCacheStore from "../store/dataCacheStore";
import { Toast, useToast } from "../components/Toast";
import {
  FaHeart,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaBuilding,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

function CharityPage() {
  const navigate = useNavigate();
  const { toast, showToast, hideToast } = useToast();
  const getCache = useDataCacheStore((state) => state.getCache);
  const setCache = useDataCacheStore((state) => state.setCache);
  const [charityPrograms, setCharityPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCharities = async () => {
      // Kiểm tra cache trước
      const cacheKey = "charities";
      const cachedData = getCache(cacheKey);

      if (cachedData) {
        setCharityPrograms(cachedData);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await contentService.getCharities();
        // Backend trả về: { success: true, data: { charities: [...], pagination: {...} } }
        const charities =
          response.data.data?.charities ||
          response.data.charities ||
          response.data.data ||
          response.data ||
          [];
        // Map _id to id for compatibility
        const mappedCharities = Array.isArray(charities)
          ? charities.map((charity) => ({
              ...charity,
              id: charity._id || charity.id,
              organization: charity.organization || charity.title,
            }))
          : [];
        setCharityPrograms(mappedCharities);
        // Lưu vào cache
        setCache(cacheKey, mappedCharities);
      } catch (error) {
        console.error("Error loading charities:", error);
        showToast(
          "Không thể tải danh sách chương trình hỗ trợ. Vui lòng thử lại sau.",
          "error"
        );
        setCharityPrograms([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadCharities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Memoize charity programs để tránh re-render không cần thiết
  const memoizedCharityPrograms = useMemo(
    () => charityPrograms,
    [charityPrograms]
  );

  const handleCardClick = (program) => {
    navigate(`/charity/${program.id}`);
  };

  return (
    <div className="page-wrapper min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <FaHeart className="w-8 h-8 text-pink-500" />
            Hỗ trợ khác
          </h1>
          <p className="text-gray-600">
            Các chương trình hỗ trợ dành cho người khuyết tật
          </p>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-md">
            <p className="text-gray-600 text-lg">
              Đang tải danh sách chương trình hỗ trợ...
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {memoizedCharityPrograms.map((program) => (
              <div
                key={program.id}
                onClick={() => handleCardClick(program)}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col h-full overflow-hidden"
              >
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-purple-600 transition-colors">
                    {program.title}
                  </h2>
                  <p className="text-purple-600 font-medium mb-2 line-clamp-1">
                    {program.organization}
                  </p>
                  <p className="text-gray-700 mb-4 line-clamp-3 flex-grow">
                    {program.description}
                  </p>
                  {program.amount && (
                    <div className="mb-3 px-3 py-2 bg-green-50 rounded-lg flex items-center gap-2">
                      <FaMoneyBillWave className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <p className="text-sm font-semibold text-green-700 line-clamp-2">
                        {program.amount}
                      </p>
                    </div>
                  )}
                  <div className="mb-4 space-y-1">
                    {program.location && (
                      <p className="text-sm text-gray-600 line-clamp-1 flex items-center gap-2">
                        <FaMapMarkerAlt className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                        {program.location}
                      </p>
                    )}
                    {program.address && (
                      <p className="text-sm text-gray-600 line-clamp-1 flex items-center gap-2">
                        <FaBuilding className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                        {program.address.split("|")[0].trim()}
                      </p>
                    )}
                    {program.contact && (
                      <p className="text-sm text-gray-600 line-clamp-1 flex items-center gap-2">
                        <FaPhone className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
                        {program.contact.split("|")[0].trim()}
                      </p>
                    )}
                    {program.email && (
                      <p className="text-sm text-gray-600 line-clamp-1 flex items-center gap-2">
                        <FaEnvelope className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                        {program.email.split(" ")[0]}
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

export default CharityPage;
