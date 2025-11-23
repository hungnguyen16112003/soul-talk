// Trang quản lý cho nhà tuyển dụng
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JobCard from "../components/JobCard";
import CreateJobModal from "../components/CreateJobModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { mockJobs } from "../data/mockData";
import { Toast, useToast } from "../components/Toast";
import useAuthStore from "../store/authStore";

function EmployerPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  const { toast, showToast, hideToast } = useToast();
  const [jobs, setJobs] = useState([...mockJobs]);
  const [filteredJobs, setFilteredJobs] = useState([...mockJobs]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    status: "",
  });

  // Route protection
  useEffect(() => {
    if (!isAuthenticated || user?.role !== "employer") {
      navigate("/login");
    }
  }, [isAuthenticated, user, navigate]);

  // Filter jobs
  useEffect(() => {
    let result = [...jobs];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(searchLower) ||
          job.company.toLowerCase().includes(searchLower)
      );
    }

    if (filters.location) {
      result = result.filter((job) => job.location === filters.location);
    }

    if (filters.status) {
      result = result.filter((job) => job.status === filters.status);
    }

    setFilteredJobs(result);
  }, [filters, jobs]);

  // Statistics
  const stats = {
    total: jobs.length,
    active: jobs.filter((j) => j.status === "active").length,
    paused: jobs.filter((j) => j.status === "paused").length,
  };

  const handleCreateJob = (jobData) => {
    const newJob = {
      ...jobData,
      id: Date.now(),
      employerAvatar: "👨‍💼",
    };
    setJobs((prev) => [...prev, newJob]);
    showToast("Tạo tin tuyển dụng thành công!", "success");
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setIsCreateModalOpen(true);
  };

  const handleUpdateJob = (jobData) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === editingJob.id ? { ...job, ...jobData } : job))
    );
    setEditingJob(null);
    showToast("Cập nhật tin tuyển dụng thành công!", "success");
  };

  const handleDeleteJob = (job) => {
    setJobToDelete(job);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (jobToDelete) {
      setJobs((prev) => prev.filter((job) => job.id !== jobToDelete.id));
      showToast("Xóa tin tuyển dụng thành công!", "success");
      setJobToDelete(null);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isAuthenticated || user?.role !== "employer") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white mb-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-2">
            Chào mừng, {user?.name || "Nhà tuyển dụng"}!
          </h1>
          <p className="text-purple-100">
            Quản lý tin tuyển dụng và tìm kiếm nhân tài phù hợp
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => {
              setEditingJob(null);
              setIsCreateModalOpen(true);
            }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-left cursor-pointer"
          >
            <div className="text-3xl mb-2">➕</div>
            <h3 className="font-bold text-lg mb-1">Tạo tin tuyển dụng</h3>
            <p className="text-purple-100 text-sm">Đăng tin tuyển dụng mới</p>
          </button>

          <button
            onClick={() => navigate("/employer/dashboard")}
            className="bg-white text-gray-900 p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-left border-2 border-purple-200 cursor-pointer"
          >
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-bold text-lg mb-1">Dashboard</h3>
            <p className="text-gray-600 text-sm">Xem thống kê và báo cáo</p>
          </button>

          <button
            onClick={() => navigate("/employer/applications")}
            className="bg-white text-gray-900 p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-left border-2 border-purple-200 cursor-pointer"
          >
            <div className="text-3xl mb-2">📝</div>
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
                <option value="Hà Nội">Hà Nội</option>
                <option value="TP.HCM">TP.HCM</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Danh sách tin tuyển dụng ({filteredJobs.length})
          </h2>
        </div>

        {filteredJobs.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                showActions={true}
                onEdit={handleEditJob}
                onDelete={handleDeleteJob}
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
              onClick={() => {
                setEditingJob(null);
                setIsCreateModalOpen(true);
              }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all cursor-pointer"
            >
              ➕ Tạo tin tuyển dụng
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
      <CreateJobModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingJob(null);
        }}
        onSave={editingJob ? handleUpdateJob : handleCreateJob}
        editingJob={editingJob}
      />

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
