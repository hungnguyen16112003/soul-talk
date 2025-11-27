// Trang chăm sóc sức khỏe
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { healthCareServices } from "../data/mockData";

function HealthCarePage() {
  const navigate = useNavigate();
  const [locationFilter, setLocationFilter] = useState("");

  const handleCardClick = (service) => {
    navigate(`/healthcare/${service.id}`);
  };

  // Filter services by location
  const filteredServices = useMemo(() => {
    if (!locationFilter) return healthCareServices;
    return healthCareServices.filter((service) => service.location === locationFilter);
  }, [locationFilter]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🏥 Dịch vụ chăm sóc sức khỏe
          </h1>
          <p className="text-gray-600">
            Dịch vụ y tế và chăm sóc sức khỏe dành cho người khuyết tật
          </p>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <label className="text-sm font-medium text-gray-700">Lọc theo khu vực:</label>
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
                  <p className="text-sm text-gray-600 line-clamp-1">
                    📍 {service.location}
                  </p>
                  {service.address && (
                    <p className="text-sm text-gray-600 line-clamp-1">
                      🏢 {service.address.split('\n')[0].trim()}
                    </p>
                  )}
                  {service.contact && (
                    <p className="text-sm text-gray-600 line-clamp-1">
                      📞 {service.contact.split(' - ')[0].trim()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HealthCarePage;

