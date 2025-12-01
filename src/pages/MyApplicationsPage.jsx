// Trang danh sách đơn ứng tuyển cho người tìm việc
import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { Toast, useToast } from "../components/Toast";
import { applicationService } from "../services/applicationService";
import {
  FaBriefcase,
  FaBuilding,
  FaMapMarkerAlt,
  FaDollarSign,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaFileAlt,
  FaEye,
  FaArrowLeft,
} from "react-icons/fa";

function MyApplicationsPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const { toast, showToast, hideToast } = useToast();

  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalApplications, setTotalApplications] = useState(0);
  const [visibleCount, setVisibleCount] = useState(5);
  const [filters, setFilters] = useState({
    jobTitle: "",
    status: "",
  });

  // Route protection
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (user?.role !== "jobseeker") {
      navigate("/");
      return;
    }
  }, [isAuthenticated, user, navigate]);

  // Load applications from API (mỗi lần lấy 20 đơn vào state)
  const loadApplications = useCallback(
    async (page = 1, append = false) => {
      if (!isAuthenticated || user?.role !== "jobseeker") return;

      try {
        setIsLoading(true);
        const response = await applicationService.getMyApplications({
          page,
          limit: page === 1 ? 10 : 20, // Load 10 items first, then 20 for pagination
        });
        const appsData =
          response.data.data?.applications || response.data.applications || [];

        const pagination =
          response.data.data?.pagination || response.data.pagination || {};
        const total = pagination.total || appsData.length;
        const hasMoreData =
          pagination.hasMore !== undefined
            ? pagination.hasMore
            : page * 20 < total;

        setHasMore(hasMoreData);
        setTotalApplications(total);
        setCurrentPage(page);

        // Map _id to id for compatibility
        const mappedApps = appsData.map((app) => ({
          ...app,
          id: app._id || app.id,
          jobId: app.job?._id || app.job?.id || app.job,
          jobTitle: app.job?.title || "",
          jobCompany: app.job?.company || "",
          jobLocation: app.job?.location || "",
          jobSalary: app.job?.salary || "",
          jobStatus: app.job?.status || "active",
          cvName: app.cv?.name || "",
          appliedDate: app.createdAt || app.appliedDate,
          status: app.status || "pending",
          employerNotes: app.employerNotes || "",
        }));

        if (append) {
          setApplications((prev) => {
            const existingIds = new Set(prev.map((a) => a.id));
            const newOnes = mappedApps.filter((a) => !existingIds.has(a.id));
            return [...prev, ...newOnes];
          });
        } else {
          setApplications(mappedApps);
          setVisibleCount(Math.min(5, mappedApps.length)); // Show 5 items initially
        }
      } catch (error) {
        console.error("Error loading applications:", error);
        showToast(
          "Không thể tải danh sách đơn ứng tuyển. Vui lòng thử lại sau.",
          "error"
        );
        if (!append) {
          setApplications([]);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [isAuthenticated, user, showToast]
  );

  // Initial load - only when component mounts and user is authenticated
  useEffect(() => {
    if (isAuthenticated && user?.role === "jobseeker") {
      loadApplications(1, false);
    }
  }, [isAuthenticated, user?.role]); // Remove loadApplications to prevent unnecessary re-runs

  // Filter applications
  useEffect(() => {
    let filtered = applications;

    if (filters.jobTitle) {
      filtered = filtered.filter((app) =>
        app.jobTitle.toLowerCase().includes(filters.jobTitle.toLowerCase())
      );
    }

    if (filters.status) {
      filtered = filtered.filter((app) => app.status === filters.status);
    }

    setFilteredApplications(filtered);
    setVisibleCount(Math.min(5, filtered.length));
  }, [applications, filters]);

  // Realtime updates removed - users need to manually refresh to see status changes

  const getStatusIcon = (status) => {
    switch (status) {
      case "accepted":
        return <FaCheckCircle className="w-5 h-5 text-green-500" />;
      case "rejected":
        return <FaTimesCircle className="w-5 h-5 text-red-500" />;
      case "reviewing":
        return <FaEye className="w-5 h-5 text-blue-500" />;
      default:
        return <FaHourglassHalf className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "accepted":
        return "Đã chấp nhận";
      case "rejected":
        return "Đã từ chối";
      case "reviewing":
        return "Đang xem xét";
      default:
        return "Chờ xử lý";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "reviewing":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  if (isLoading && applications.length === 0) {
    return (
      <div className="page-wrapper min-h-screen py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96"></div>
            </div>
          </div>

          {/* Skeleton filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Skeleton applications */}
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                    <div className="flex gap-4">
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper min-h-screen py-8">
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
            >
              <FaArrowLeft className="w-4 h-4" />
              Quay lại
            </button>
            <h1 className="text-3xl font-bold text-gray-900">
              Đơn Ứng Tuyển Của Tôi
            </h1>
            <p className="text-gray-600 mt-2">
              Quản lý và theo dõi trạng thái các đơn ứng tuyển đã gửi
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tìm theo tên công việc
              </label>
              <input
                type="text"
                value={filters.jobTitle}
                onChange={(e) =>
                  setFilters({ ...filters, jobTitle: e.target.value })
                }
                placeholder="Nhập tên công việc..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trạng thái
              </label>
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Tất cả</option>
                <option value="pending">Chờ xử lý</option>
                <option value="reviewing">Đang xem xét</option>
                <option value="accepted">Đã chấp nhận</option>
                <option value="rejected">Đã từ chối</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => setFilters({ jobTitle: "", status: "" })}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                Xóa bộ lọc
              </button>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <FaFileAlt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Chưa có đơn ứng tuyển nào
              </h3>
              <p className="text-gray-600 mb-6">
                Bạn chưa gửi đơn ứng tuyển nào. Hãy tìm việc và ứng tuyển ngay!
              </p>
              <Link
                to="/jobseeker"
                className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <FaBriefcase className="w-4 h-4 mr-2" />
                Tìm việc ngay
              </Link>
            </div>
          ) : (
            <>
              {filteredApplications
                .slice(0, visibleCount)
                .map((application) => (
                  <div
                    key={application.id}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            {getStatusIcon(application.status)}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                              {application.jobTitle}
                            </h3>
                            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-3">
                              <div className="flex items-center gap-1">
                                <FaBuilding className="w-4 h-4" />
                                <span>{application.jobCompany}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <FaMapMarkerAlt className="w-4 h-4" />
                                <span>{application.jobLocation}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <FaDollarSign className="w-4 h-4" />
                                <span>{application.jobSalary}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                  application.status
                                )}`}
                              >
                                {getStatusText(application.status)}
                              </span>
                              <div className="flex items-center gap-1 text-gray-500">
                                <FaClock className="w-4 h-4" />
                                <span className="text-sm">
                                  Ứng tuyển:{" "}
                                  {new Date(
                                    application.appliedDate
                                  ).toLocaleDateString("vi-VN")}
                                </span>
                              </div>
                            </div>
                            {application.employerNotes && (
                              <div className="mt-3 p-3 bg-gray-50 rounded-md">
                                <p className="text-sm text-gray-700">
                                  <strong>Ghi chú từ nhà tuyển dụng:</strong>{" "}
                                  {application.employerNotes}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <Link
                          to={`/job/${application.jobId}`}
                          className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          <FaEye className="w-4 h-4 mr-2" />
                          Xem chi tiết
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}

              {/* Load More Button */}
              {(hasMore ||
                (totalApplications > 0 &&
                  applications.length < totalApplications &&
                  visibleCount < filteredApplications.length)) && (
                <div className="text-center pt-4">
                  <button
                    onClick={() => {
                      if (isLoading) return; // Prevent multiple clicks

                      const nextVisible = Math.min(
                        visibleCount + 5,
                        filteredApplications.length
                      );
                      setVisibleCount(nextVisible);

                      if (
                        hasMore &&
                        filteredApplications.length - nextVisible <= 5
                      ) {
                        const nextPage = currentPage + 1;
                        setCurrentPage(nextPage);
                        loadApplications(nextPage, true);
                      }
                    }}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-6 py-2 rounded-lg hover:from-amber-600 hover:to-yellow-600 transition-all font-medium flex items-center space-x-2 mx-auto cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>
                      {isLoading
                        ? "Đang tải..."
                        : `Xem thêm (${Math.max(
                            0,
                            visibleCount < totalApplications
                              ? totalApplications - visibleCount
                              : 0
                          )} đơn còn lại)`}
                    </span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyApplicationsPage;
