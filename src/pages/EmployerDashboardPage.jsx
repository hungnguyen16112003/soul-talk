// Trang dashboard cho nhà tuyển dụng
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mockJobs } from "../data/mockData";
import useAuthStore from "../store/authStore";

function EmployerDashboardPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [jobs] = useState(mockJobs);

  // Route protection
  useEffect(() => {
    if (!isAuthenticated || user?.role !== "employer") {
      navigate("/login");
    }
  }, [isAuthenticated, user, navigate]);

  // Statistics
  const stats = {
    total: jobs.length,
    active: jobs.filter((j) => j.status === "active").length,
    paused: jobs.filter((j) => j.status === "paused").length,
    applications: 24, // Mock data
  };

  // Recent jobs
  const recentJobs = jobs.slice(0, 5);

  if (!isAuthenticated || user?.role !== "employer") {
    return null;
  }

  return (
    <div className="page-wrapper min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Tổng quan về hoạt động tuyển dụng của bạn
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {stats.applications}
            </div>
            <div className="text-gray-600">Đơn ứng tuyển</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Thao tác nhanh
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate("/employer")}
              className="p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition-colors text-left cursor-pointer"
            >
              <div className="text-2xl mb-2">📝</div>
              <h3 className="font-semibold text-gray-900">Quản lý tin</h3>
              <p className="text-sm text-gray-600">Xem và quản lý tin tuyển dụng</p>
            </button>
            <button
              onClick={() => navigate("/employer/applications")}
              className="p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition-colors text-left cursor-pointer"
            >
              <div className="text-2xl mb-2">📋</div>
              <h3 className="font-semibold text-gray-900">Đơn ứng tuyển</h3>
              <p className="text-sm text-gray-600">Xem và xử lý đơn ứng tuyển</p>
            </button>
            <button
              onClick={() => {
                navigate("/employer");
                setTimeout(() => {
                  document
                    .querySelector('[onclick*="setIsCreateModalOpen"]')
                    ?.click();
                }, 100);
              }}
              className="p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition-colors text-left cursor-pointer"
            >
              <div className="text-2xl mb-2">➕</div>
              <h3 className="font-semibold text-gray-900">Tạo tin mới</h3>
              <p className="text-sm text-gray-600">Đăng tin tuyển dụng mới</p>
            </button>
          </div>
        </div>

        {/* Recent Jobs */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Tin tuyển dụng gần đây
          </h2>
          <div className="space-y-4">
            {recentJobs.map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.company}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      job.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {job.status === "active" ? "Còn tuyển" : "Tạm dừng"}
                  </span>
                  <button
                    onClick={() => navigate(`/employer`)}
                    className="text-purple-600 hover:text-purple-700 font-medium text-sm cursor-pointer"
                  >
                    Xem chi tiết →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployerDashboardPage;

