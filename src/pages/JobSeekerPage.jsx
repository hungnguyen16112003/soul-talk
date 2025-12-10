// Trang tìm việc cho người tìm việc - hiển thị danh sách việc với filters
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import JobCard from "../components/JobCard";
import { disabilityTypes, severityLevels } from "../data/mockData";
import { jobService } from "../services/jobService";
import useAuthStore from "../store/authStore";
import useDataCacheStore from "../store/dataCacheStore";
import { Toast, useToast } from "../components/Toast";

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
  const preferences = userPreferences;

  // Load profile từ localStorage nếu có
  const [profile] = useState(() => {
    const saved = localStorage.getItem("jobSeekerProfile");
    return saved ? JSON.parse(saved) : null;
  });

  const { toast, showToast, hideToast } = useToast();
  const getCache = useDataCacheStore((state) => state.getCache);
  const setCache = useDataCacheStore((state) => state.setCache);

  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(10); // Hiển thị 10 công việc đầu tiên

  // Hàm phân loại ngành nghề
  const getJobCategory = (job) => {
    const title = job.title.toLowerCase();
    const description = job.description.toLowerCase();
    const combined = title + " " + description;

    if (
      combined.includes("lập trình") ||
      combined.includes("công nghệ") ||
      combined.includes("phần mềm") ||
      combined.includes("máy tính") ||
      combined.includes("vi tính")
    ) {
      return "Công nghệ";
    }
    if (
      combined.includes("dạy") ||
      combined.includes("giáo dục") ||
      combined.includes("học") ||
      combined.includes("tuyển sinh") ||
      combined.includes("đào tạo")
    ) {
      return "Giáo dục";
    }
    if (
      combined.includes("may") ||
      combined.includes("điêu khắc") ||
      combined.includes("chạm trổ") ||
      combined.includes("lao động phổ thông") ||
      combined.includes("vận hành") ||
      combined.includes("quản lý kho") ||
      combined.includes("thủ công")
    ) {
      return "Lao động tay chân";
    }
    return "Khác";
  };

  // Danh sách ngành nghề
  const jobCategories = [
    { value: "", label: "Tất cả ngành nghề" },
    { value: "Công nghệ", label: "Công nghệ" },
    { value: "Giáo dục", label: "Giáo dục" },
    { value: "Lao động tay chân", label: "Lao động tay chân" },
    { value: "Khác", label: "Khác" },
  ];

  // Khởi tạo filters từ user data hoặc preferences
  const [filters, setFilters] = useState(() => {
    // Ưu tiên lấy từ user data, nếu không có thì lấy từ preferences
    const userDisabilityType = user?.disabilityType || "";
    const userSeverityLevel = user?.severityLevel || "";
    const userRegion = user?.region || "";

    // Map disabilityType: nếu là "Khác" hoặc "Khuyết tật khác" thì để trống
    const mappedDisabilityType = (userDisabilityType === "Khác" || userDisabilityType === "Khuyết tật khác") ? "" : userDisabilityType;

    return {
      search: "",
      category: "",
      disabilityType: mappedDisabilityType,
      severityLevel: userSeverityLevel,
      location: userRegion,
      status: "active",
    };
  });

  // Cập nhật filters khi user data thay đổi
  useEffect(() => {
    // Ưu tiên lấy từ user data
    if (user && (user.disabilityType || user.severityLevel || user.region)) {
      const mappedDisabilityType = (user.disabilityType === "Khác" || user.disabilityType === "Khuyết tật khác") ? "" : (user.disabilityType || "");
      setFilters((prev) => ({
        ...prev,
        disabilityType: mappedDisabilityType,
        severityLevel: user.severityLevel || prev.severityLevel,
        location: user.region || prev.location,
      }));
    } else {
      // Nếu user chưa có data, thử lấy từ preferences (cho guest users)
      const prefs = preferences || userPreferences;
      if (
        prefs &&
        (prefs.disabilityType || prefs.severityLevel || prefs.region)
      ) {
        const mappedDisability =
          (prefs.disabilityType === "Khác" || prefs.disabilityType === "Khuyết tật khác") ? "" : prefs.disabilityType;
        setFilters((prev) => ({
          ...prev,
          disabilityType: mappedDisability || prev.disabilityType,
          severityLevel: prefs.severityLevel || prev.severityLevel,
          location: prefs.region || prev.location,
        }));
      }
    }
  }, [user, preferences, userPreferences]);

  // Load jobs from API với cache
  useEffect(() => {
    const loadJobs = async () => {
      // Kiểm tra cache trước
      const cacheKey = "jobs";
      const cacheFilters = { status: "active" };
      const cachedData = getCache(cacheKey, cacheFilters);

      if (cachedData) {
        setJobs(cachedData);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await jobService.getJobs({ status: "active" }); // Lấy jobs active
        // Backend trả về: { success: true, data: { jobs: [...], pagination: {...} } }
        const jobsData =
          response.data.data?.jobs ||
          response.data.jobs ||
          response.data.data ||
          response.data ||
          [];
        // Map _id to id for compatibility and ensure requirements is an array
        const mappedJobs = Array.isArray(jobsData)
          ? jobsData.map((job) => {
              let requirements = [];
              if (job.requirements) {
                if (Array.isArray(job.requirements)) {
                  requirements = job.requirements;
                } else if (typeof job.requirements === 'string') {
                  try {
                    const parsed = JSON.parse(job.requirements);
                    requirements = Array.isArray(parsed) ? parsed : [];
                  } catch {
                    requirements = [];
                  }
                }
              }
              return {
                ...job,
                id: job._id || job.id,
                requirements: requirements,
              };
            })
          : [];
        setJobs(mappedJobs);
        // Lưu vào cache
        setCache(cacheKey, mappedJobs, cacheFilters);
      } catch (error) {
        console.error("Error loading jobs:", error);
        showToast(
          "Không thể tải danh sách công việc. Vui lòng thử lại sau.",
          "error"
        );
        setJobs([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filter jobs - sử dụng useMemo để cache filtered results
  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    // Filter by search (không phân biệt có/không dấu)
    if (filters.search) {
      const searchNormalized = removeVietnameseAccents(
        filters.search.toLowerCase()
      );
      result = result.filter(
        (job) =>
          removeVietnameseAccents(job.title.toLowerCase()).includes(
            searchNormalized
          ) ||
          removeVietnameseAccents(job.company.toLowerCase()).includes(
            searchNormalized
          ) ||
          removeVietnameseAccents(job.description.toLowerCase()).includes(
            searchNormalized
          )
      );
    }

    // Filter by category
    if (filters.category) {
      result = result.filter((job) => getJobCategory(job) === filters.category);
    }

    // Filter by disability type
    if (filters.disabilityType) {
      result = result.filter((job) =>
        job.disabilityTypes?.includes(filters.disabilityType)
      );
    }

    // Filter by severity level
    if (filters.severityLevel) {
      result = result.filter(
        (job) => job.severityLevel === filters.severityLevel
      );
    }

    // Filter by location
    if (filters.location) {
      result = result.filter((job) => job.location === filters.location);
    }

    // Filter by status
    if (filters.status) {
      result = result.filter((job) => job.status === filters.status);
    }

    return result;
  }, [filters, jobs]);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "",
      disabilityType: "",
      severityLevel: "",
      location: "",
      status: "active",
    });
  };

  return (
    <div className="page-wrapper min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tìm việc làm
          </h1>
          <p className="text-gray-600">
            Tìm công việc phù hợp với khả năng của bạn
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngành nghề
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
              >
                {jobCategories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="">Tất cả</option>
                {disabilityTypes
                  .filter((type) => type.name !== "Khuyết tật khác")
                  .map((type) => (
                    <option key={type.id} value={type.name}>
                      {type.name}
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="">Tất cả</option>
                <option value="Miền Bắc">Miền Bắc</option>
                <option value="Miền Nam">Miền Nam</option>
                <option value="Miền Trung">Miền Trung</option>
              </select>
            </div>
          </div>

          {/* Clear filters button */}
          {(filters.search ||
            filters.category ||
            filters.disabilityType ||
            filters.severityLevel ||
            filters.location) && (
            <div className="mt-4">
              <button
                onClick={clearFilters}
                className="text-amber-600 hover:text-amber-700 text-sm font-medium cursor-pointer"
              >
                Xóa bộ lọc
              </button>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {isLoading ? (
              "Đang tải..."
            ) : (
              <>
                Tìm thấy{" "}
                <span className="font-semibold">{filteredJobs.length}</span>{" "}
                công việc phù hợp
              </>
            )}
          </p>
        </div>

        {/* Job List */}
        {isLoading ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-md">
            <p className="text-gray-600 text-lg">
              Đang tải danh sách công việc...
            </p>
          </div>
        ) : filteredJobs.length > 0 ? (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.slice(0, visibleCount).map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            {/* Nút Xem thêm */}
            {filteredJobs.length > 10 &&
              visibleCount < filteredJobs.length && (
                <div className="text-center pt-8">
                  <button
                    onClick={() => {
                      // Tăng thêm 10 công việc để hiển thị
                      const nextVisible = Math.min(
                        visibleCount + 10,
                        filteredJobs.length
                      );
                      setVisibleCount(nextVisible);
                    }}
                    className="animate-gradient-slide text-[#7a5a15] px-6 py-3 rounded-lg hover:shadow-lg transition-all font-medium flex items-center space-x-2 mx-auto"
                  >
                    <span>
                      Xem thêm ({Math.max(
                        0,
                        filteredJobs.length - visibleCount
                      )} công việc còn lại)
                    </span>
                  </button>
                </div>
              )}
          </>
        ) : (
          <div className="bg-white rounded-xl p-12 text-center shadow-md">
            <p className="text-gray-600 text-lg mb-4">
              Không tìm thấy công việc phù hợp
            </p>
            <button
              onClick={clearFilters}
              className="text-amber-600 hover:text-amber-700 font-medium"
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
