// Trang chăm sóc sức khỏe
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { contentService } from "../services/contentService";
import useDataCacheStore from "../store/dataCacheStore";
import { Toast, useToast } from "../components/Toast";
import { FaHospital, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

function HealthCarePage() {
  const navigate = useNavigate();
  const { toast, showToast, hideToast } = useToast();
  const getCache = useDataCacheStore((state) => state.getCache);
  const setCache = useDataCacheStore((state) => state.setCache);
  const [healthCareServices, setHealthCareServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {
    const loadHealthCares = async () => {
      // Kiểm tra cache trước
      const cacheKey = "healthcare";
      const cachedData = getCache(cacheKey);

      if (cachedData) {
        setHealthCareServices(cachedData);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await contentService.getHealthCares();
        // Backend trả về: { success: true, data: { healthcare: [...], pagination: {...} } }
        const healthCares =
          response.data.data?.healthcare ||
          response.data.healthcare ||
          response.data.data ||
          response.data ||
          [];
        // Map _id to id for compatibility
        const mappedHealthCares = Array.isArray(healthCares)
          ? healthCares.map((healthCare) => ({
              ...healthCare,
              id: healthCare._id || healthCare.id,
              hospital: healthCare.hospital || healthCare.title,
            }))
          : [];
        setHealthCareServices(mappedHealthCares);
        // Lưu vào cache
        setCache(cacheKey, mappedHealthCares);
      } catch (error) {
        console.error("Error loading healthcare services:", error);
        showToast(
          "Không thể tải danh sách dịch vụ chăm sóc sức khỏe. Vui lòng thử lại sau.",
          "error"
        );
        setHealthCareServices([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadHealthCares();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCardClick = (service) => {
    navigate(`/healthcare/${service.id}`);
  };

  // Filter services by location
  const filteredServices = useMemo(() => {
    if (!locationFilter) return healthCareServices;
    return healthCareServices.filter(
      (service) =>
        service.location === locationFilter || service.region === locationFilter
    );
  }, [locationFilter, healthCareServices]);

  return (
    <div className="page-wrapper min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <FaHospital className="w-8 h-8 text-red-500" />
            Dịch vụ chăm sóc sức khỏe
          </h1>
          <p className="text-gray-600">
            Dịch vụ y tế và chăm sóc sức khỏe dành cho người khuyết tật
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
              Đang tải danh sách dịch vụ chăm sóc sức khỏe...
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                onClick={() => handleCardClick(service)}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col h-full overflow-hidden"
              >
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-purple-600 transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-purple-600 font-medium mb-2 line-clamp-1">
                    {service.hospital}
                  </p>
                  <p className="text-gray-700 mb-4 line-clamp-3 flex-grow">
                    {service.description}
                  </p>
                  <div className="mb-4 space-y-1">
                    {service.address ? (
                      <p className="text-sm text-gray-600 line-clamp-1 flex items-center gap-2">
                        <FaMapMarkerAlt className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                        {service.address.split("\n")[0].trim()}
                      </p>
                    ) : service.location ? (
                      <p className="text-sm text-gray-600 line-clamp-1 flex items-center gap-2">
                        <FaMapMarkerAlt className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                        {service.location}
                      </p>
                    ) : null}
                    {service.contact && (
                      <p className="text-sm text-gray-600 line-clamp-1 flex items-center gap-2">
                        <FaPhone className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
                        {service.contact.split(" - ")[0].trim()}
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

export default HealthCarePage;
