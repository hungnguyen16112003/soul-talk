// Trang quản lý cho nhà tuyển dụng
import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import JobCard from "../components/JobCard";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { Toast, useToast } from "../components/Toast";
import useAuthStore from "../store/authStore";
import { jobService } from "../services/jobService";
import { FaPlusCircle, FaClipboardList } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

// Hàm bỏ dấu tiếng Việt để tìm kiếm không phân biệt có/không dấu
const removeVietnameseAccents = (str) => {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};

function EmployerPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Helper function to check if user has employer access
  const hasEmployerAccess = () => {
    if (!isAuthenticated || !user) return false;
    const userRoles = user?.roles || [];
    const currentRole = user?.role;
    const hasRole =
      userRoles.includes("employer") || userRoles.includes("admin");
    const isUsingRole =
      currentRole === "employer" ||
      (userRoles.includes("admin") && currentRole !== "jobseeker");
    return hasRole && isUsingRole;
  };

  const { toast, showToast, hideToast } = useToast();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    status: "",
  });

  // Route protection
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!hasEmployerAccess()) {
      navigate("/login");
    }
  }, [isAuthenticated, user, navigate]);

  // Check if user is admin
  const isAdmin = useMemo(() => {
    const userRoles = user?.roles || [];
    return userRoles.includes("admin");
  }, [user]);

  // Load jobs from API
  useEffect(() => {
    const loadJobs = async () => {
      if (!hasEmployerAccess()) return;

      try {
        setIsLoading(true);
        const response = await jobService.getMyJobs();
        if (response && response.success && response.data) {
          const jobsData = response.data.jobs || [];
          // Map _id to id for compatibility and ensure requirements is an array
          const mappedJobs = jobsData.map((job) => {
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
          });
          setJobs(mappedJobs);
        }
      } catch (error) {
        const errorMessage =
          error?.error || error?.message || "Không thể tải danh sách công việc";
        showToast(errorMessage, "error");
      } finally {
        setIsLoading(false);
      }
    };

    if (hasEmployerAccess()) {
      loadJobs();
    }
  }, [isAuthenticated, user, location.key]);

  const filteredJobs = useMemo(() => {
    let result = [...jobs];

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
          )
      );
    }

    if (filters.location) {
      result = result.filter((job) => job.location === filters.location);
    }

    if (filters.status) {
      result = result.filter((job) => job.status === filters.status);
    }

    return result;
  }, [filters, jobs]);

  // Statistics
  const stats = {
    total: jobs.length,
    active: jobs.filter((j) => j.status === "active").length,
    paused: jobs.filter((j) => j.status === "paused").length,
  };


  const handleEditJob = (job) => {
    navigate("/employer/create-job", { state: { editingJob: job } });
  };


  const handleDeleteJob = (job) => {
    setJobToDelete(job);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!jobToDelete) return;

    const jobId = jobToDelete._id || jobToDelete.id;
    if (!jobId) {
      showToast("Không tìm thấy ID công việc cần xóa", "error");
      return;
    }

    try {
      const response = await jobService.deleteJob(jobId);
      if (response && response.success) {
        // Reload jobs from API
        const jobsResponse = await jobService.getMyJobs();
        if (jobsResponse && jobsResponse.success && jobsResponse.data) {
          const jobsData = jobsResponse.data.jobs || [];
          const mappedJobs = jobsData.map((job) => ({
            ...job,
            id: job._id || job.id,
          }));
          setJobs(mappedJobs);
        }
        showToast("Xóa tin tuyển dụng thành công!", "success");
        setJobToDelete(null);
        setIsDeleteModalOpen(false);
      } else {
        const errorMessage =
          response?.error || response?.message || "Xóa tin tuyển dụng thất bại";
        showToast(errorMessage, "error");
      }
    } catch (error) {
      const errorMessage =
        error?.error ||
        error?.message ||
        "Có lỗi xảy ra khi xóa tin tuyển dụng";
      showToast(errorMessage, "error");
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!hasEmployerAccess()) {
    return null;
  }

  return (
    <div className="page-wrapper min-h-screen py-8">
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Banner */}
        <div className="animate-gradient-slide rounded-xl p-8 text-white mb-8 shadow-lg overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Chào mừng, {user?.name || "Nhà tuyển dụng"}!
              </h1>
              <p className="text-white/90">
                {isAdmin
                  ? "Quản lý toàn bộ tin tuyển dụng trên hệ thống"
                  : "Quản lý tin tuyển dụng và tìm kiếm nhân tài phù hợp"}
              </p>
            </div>
            {isAdmin && (
              <div className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold text-sm">
                🔑 Chế độ Admin
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => {
              navigate("/employer/create-job");
            }}
            className="bg-white text-gray-900 p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-left border-2 border-purple-200 cursor-pointer"
          >
            <FaPlusCircle className="w-10 h-10 mb-3 text-green-500" />
            <h3 className="font-bold text-lg mb-1">Tạo tin tuyển dụng</h3>
            <p className="text-gray-600 text-sm">Đăng tin tuyển dụng mới</p>
          </button>

          <button
            onClick={() => navigate("/employer/dashboard")}
            className="bg-white text-gray-900 p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-left border-2 border-purple-200 cursor-pointer"
          >
            <MdDashboard className="w-10 h-10 mb-3 text-orange-500" />
            <h3 className="font-bold text-lg mb-1">Dashboard</h3>
            <p className="text-gray-600 text-sm">Xem thống kê và báo cáo</p>
          </button>

          <button
            onClick={() => navigate("/employer/applications")}
            className="bg-white text-gray-900 p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-left border-2 border-purple-200 cursor-pointer"
          >
            <FaClipboardList className="w-10 h-10 mb-3 text-blue-500" />
            <h3 className="font-bold text-lg mb-1">Đơn ứng tuyển</h3>
            <p className="text-gray-600 text-sm">Quản lý đơn ứng tuyển</p>
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {stats.total}
            </div>
            <div className="text-gray-600">Tổng số tin</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {stats.active}
            </div>
            <div className="text-gray-600">Đang tuyển</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-3xl font-bold text-gray-600 mb-1">
              {stats.paused}
            </div>
            <div className="text-gray-600">Tạm dừng</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Địa điểm
              </label>
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">Tất cả</option>
                <option value="Miền Bắc">Miền Bắc</option>
                <option value="Miền Nam">Miền Nam</option>
                <option value="Miền Trung">Miền Trung</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trạng thái
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">Tất cả</option>
                <option value="active">Còn tuyển</option>
                <option value="paused">Tạm dừng</option>
              </select>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Danh sách tin tuyển dụng ({filteredJobs.length})
            </h2>
            {isAdmin && (
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                Đang xem tất cả tin tuyển dụng
              </span>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-md">
            <div className="text-4xl mb-4 animate-pulse">⏳</div>
            <p className="text-gray-600">Đang tải danh sách công việc...</p>
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <JobCard
                key={job._id || job.id}
                job={job}
                showActions={true}
                onEdit={handleEditJob}
                onDelete={handleDeleteJob}
                isAdmin={isAdmin}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 text-center shadow-md">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Chưa có tin tuyển dụng
            </h3>
            <p className="text-gray-600 mb-6">
              Tạo tin tuyển dụng đầu tiên để bắt đầu tìm kiếm nhân tài
            </p>
            <button
              onClick={() => navigate("/employer/create-job")}
              className="bg-white text-gray-900 px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all border-2 border-purple-200 cursor-pointer"
            >
              <span className="flex items-center justify-center gap-2 font-semibold">
                <FaPlusCircle className="w-5 h-5 text-purple-500" />
                Tạo tin tuyển dụng
              </span>
            </button>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 bg-purple-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            💡 Cần hỗ trợ?
          </h3>
          <p className="text-gray-700 mb-4">
            Nếu bạn gặp khó khăn trong việc đăng tin tuyển dụng, vui lòng liên
            hệ với chúng tôi.
          </p>
          <button className="text-purple-600 hover:text-purple-700 font-medium cursor-pointer">
            Liên hệ hỗ trợ →
          </button>
        </div>
      </div>

      {/* Modals */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setJobToDelete(null);
        }}
        onConfirm={confirmDelete}
        job={jobToDelete}
      />
    </div>
  );
}

export default EmployerPage;
