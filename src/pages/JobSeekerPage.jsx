// Trang tìm việc cho người tìm việc - hiển thị danh sách việc với filters
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JobCard from "../components/JobCard";
import { mockJobs, disabilityTypes, severityLevels } from "../data/mockData";
import useAuthStore from "../store/authStore";
import InitialPreferencesModal from "../components/InitialPreferencesModal";

// Hàm bỏ dấu tiếng Việt để tìm kiếm không phân biệt có/không dấu
const removeVietnameseAccents = (str) => {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};

function JobSeekerPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userPreferences = useAuthStore((state) => state.userPreferences);
  const setUserPreferences = useAuthStore((state) => state.setUserPreferences);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [hasClosedModal, setHasClosedModal] = useState(false);

  // Load guest preferences (khi chưa đăng nhập)
  const [guestPreferences, setGuestPreferences] = useState(() => {
    if (!isAuthenticated) {
      const saved = localStorage.getItem("guestPreferences");
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });
  
  // Cập nhật guestPreferences khi authentication state thay đổi
  useEffect(() => {
    if (!isAuthenticated) {
      const saved = localStorage.getItem("guestPreferences");
      setGuestPreferences(saved ? JSON.parse(saved) : null);
    } else {
      // Khi đã đăng nhập, xóa guest preferences
      setGuestPreferences(null);
    }
  }, [isAuthenticated]);
  
  const preferences = userPreferences || guestPreferences;

  // Load profile từ localStorage nếu có
  const [profile] = useState(() => {
    const saved = localStorage.getItem("jobSeekerProfile");
    return saved ? JSON.parse(saved) : null;
  });

  const [jobs] = useState(mockJobs);
  const [filteredJobs, setFilteredJobs] = useState(mockJobs);
  
  // Khởi tạo filters từ preferences hoặc profile
  const [filters, setFilters] = useState(() => {
    const prefs = preferences || userPreferences;
    return {
      search: "",
      disabilityType: prefs?.disabilityType || profile?.disabilityType || "",
      severityLevel: prefs?.severityLevel || profile?.severityLevel || "",
      location: prefs?.region || "",
      status: "active",
    };
  });

  // Hiển thị modal mỗi lần vào trang khi chưa đăng nhập (chỉ chạy một lần khi mount)
  useEffect(() => {
    // Chỉ hiển thị modal khi chưa đăng nhập, modal chưa được mở và user chưa đóng modal trong session này
    if (!isAuthenticated && !showPreferencesModal && !hasClosedModal) {
      setShowPreferencesModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Chỉ chạy một lần khi component mount

  // Cập nhật filters khi preferences thay đổi
  useEffect(() => {
    const prefs = preferences || userPreferences;
    if (prefs) {
      setFilters((prev) => ({
        ...prev,
        disabilityType: prefs.disabilityType || prev.disabilityType,
        severityLevel: prefs.severityLevel || prev.severityLevel,
        location: prefs.region || prev.location,
      }));
    }
  }, [preferences, userPreferences]);

  // Filter jobs
  useEffect(() => {
    let result = [...jobs];

    // Filter by search (không phân biệt có/không dấu)
    if (filters.search) {
      const searchNormalized = removeVietnameseAccents(filters.search.toLowerCase());
      result = result.filter(
        (job) =>
          removeVietnameseAccents(job.title.toLowerCase()).includes(searchNormalized) ||
          removeVietnameseAccents(job.company.toLowerCase()).includes(searchNormalized) ||
          removeVietnameseAccents(job.description.toLowerCase()).includes(searchNormalized)
      );
    }

    // Filter by disability type
    if (filters.disabilityType) {
      result = result.filter((job) =>
        job.disabilityTypes?.includes(filters.disabilityType)
      );
    }

    // Filter by severity level
    if (filters.severityLevel) {
      result = result.filter((job) => job.severityLevel === filters.severityLevel);
    }

    // Filter by location
    if (filters.location) {
      result = result.filter((job) => job.location === filters.location);
    }

    // Filter by status
    if (filters.status) {
      result = result.filter((job) => job.status === filters.status);
    }

    setFilteredJobs(result);
  }, [filters, jobs]);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    const prefs = preferences || userPreferences;
    setFilters({
      search: "",
      disabilityType: "",
      severityLevel: "",
      location: prefs?.region || "",
      status: "active",
    });
  };

  const handlePreferencesComplete = (prefs) => {
    // Đóng modal trước
    setShowPreferencesModal(false);
    // Đánh dấu đã đóng modal để không tự động mở lại
    setHasClosedModal(true);
    
    // Nếu có preferences (user đã chọn xong)
    if (prefs && (prefs.region || prefs.disabilityType || prefs.severityLevel)) {
      // Nếu user đã đăng nhập, lưu vào store
      if (isAuthenticated) {
        setUserPreferences(prefs);
      } else {
        // Nếu chưa đăng nhập, lưu vào localStorage tạm thời (guest preferences)
        localStorage.setItem("guestPreferences", JSON.stringify(prefs));
        // Cập nhật guestPreferences state
        setGuestPreferences(prefs);
      }
      
      // Cập nhật filters ngay lập tức
      setFilters((prev) => ({
        ...prev,
        disabilityType: prefs.disabilityType || prev.disabilityType,
        severityLevel: prefs.severityLevel || prev.severityLevel,
        location: prefs.region || prev.location,
      }));
    } else {
      // Nếu không có preferences (user đóng modal mà chưa chọn xong)
      // Không lưu gì cả và reset filters về trạng thái ban đầu (hiển thị tất cả)
      setFilters({
        search: "",
        disabilityType: "",
        severityLevel: "",
        location: "",
        status: "active",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <InitialPreferencesModal
        isOpen={showPreferencesModal}
        onComplete={handlePreferencesComplete}
        onClose={() => setShowPreferencesModal(false)}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tìm việc làm</h1>
          <p className="text-gray-600">
            Tìm công việc phù hợp với khả năng của bạn
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tìm kiếm
              </label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                placeholder="Tên công việc, công ty..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            {/* Disability Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Loại khuyết tật
              </label>
              <select
                value={filters.disabilityType}
                onChange={(e) =>
                  handleFilterChange("disabilityType", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">Tất cả</option>
                {disabilityTypes.map((type) => (
                  <option key={type.id} value={type.name}>
                    {type.icon} {type.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Severity Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mức độ
              </label>
              <select
                value={filters.severityLevel}
                onChange={(e) =>
                  handleFilterChange("severityLevel", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">Tất cả</option>
                {severityLevels.map((level) => (
                  <option key={level.id} value={level.name}>
                    {level.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Địa điểm
              </label>
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">Tất cả địa điểm</option>
                <option value="Miền Bắc">Miền Bắc</option>
                <option value="Miền Nam">Miền Nam</option>
                <option value="Miền Trung">Miền Trung</option>
              </select>
            </div>
          </div>

          {/* Clear filters button */}
          {(filters.search ||
            filters.disabilityType ||
            filters.severityLevel ||
            filters.location) && (
            <div className="mt-4">
              <button
                onClick={clearFilters}
                className="text-purple-600 hover:text-purple-700 text-sm font-medium cursor-pointer"
              >
                Xóa bộ lọc
              </button>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Tìm thấy <span className="font-semibold">{filteredJobs.length}</span>{" "}
            công việc phù hợp
          </p>
        </div>

        {/* Job List */}
        {filteredJobs.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 text-center shadow-md">
            <p className="text-gray-600 text-lg mb-4">
              Không tìm thấy công việc phù hợp
            </p>
            <button
              onClick={clearFilters}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Xóa bộ lọc để xem tất cả
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobSeekerPage;
