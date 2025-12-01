// Trang quản lý đơn ứng tuyển cho nhà tuyển dụng
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { Toast, useToast } from "../components/Toast";
import { applicationService } from "../services/applicationService";
import { cvService } from "../services/cvService";
import socketService from "../services/socketService";
import {
  FaFilePdf,
  FaFileWord,
  FaFileAlt,
  FaEye,
  FaDownload,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

function EmployerApplicationsPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const { toast, showToast, hideToast } = useToast();

  // Check if user is admin
  const isAdmin = useMemo(() => {
    const userRoles = user?.roles || [];
    return userRoles.includes("admin");
  }, [user]);

  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredApplications, setFilteredApplications] = useState([]);
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
    if (user?.role !== "employer" && user?.role !== "admin") {
      navigate("/");
      return;
    }
  }, [isAuthenticated, user, navigate]);

  // Load applications from API
  useEffect(() => {
    const loadApplications = async () => {
      if (
        !isAuthenticated ||
        (user?.role !== "employer" && user?.role !== "admin")
      )
        return;

      try {
        setIsLoading(true);
        const response = await applicationService.getAllEmployerApplications();
        const appsData =
          response.data.data?.applications || response.data.applications || [];
        // Map _id to id for compatibility
        const mappedApps = appsData.map((app) => ({
          ...app,
          id: app._id || app.id,
          jobId: app.job?._id || app.job?.id || app.job,
          jobTitle: app.job?.title || "",
          jobCompany: app.job?.company || "",
          jobEmployer: app.job?.employer || null, // For admin to see employer info
          applicantName: app.jobSeeker?.name || "",
          applicantEmail: app.jobSeeker?.email || "",
          applicantPhone: app.jobSeeker?.phone || "",
          applicantAvatar: app.jobSeeker?.avatar || "",
          appliedDate: app.createdAt || app.appliedDate,
          cvId: app.cv?._id || app.cv?.id || app.cv,
          cvName: app.cv?.name || "",
          cvFileName: app.cv?.fileName || "",
          cvFileType: app.cv?.fileType || app.cv?.type || "",
        }));
        setApplications(mappedApps);
      } catch (error) {
        console.error("Error loading applications:", error);
        showToast(
          "Không thể tải danh sách đơn ứng tuyển. Vui lòng thử lại sau.",
          "error"
        );
        setApplications([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (
      isAuthenticated &&
      (user?.role === "employer" || user?.role === "admin")
    ) {
      loadApplications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user]);

  // Setup Socket.io for realtime notifications
  useEffect(() => {
    if (
      !isAuthenticated ||
      (user?.role !== "employer" && user?.role !== "admin")
    )
      return;

    const token = localStorage.getItem("token");
    if (!token) return;

    // Connect socket
    const socket = socketService.connect(token);

    // Listen for new applications
    socket.on("new-application", (data) => {
      showToast(
        `Có đơn ứng tuyển mới từ ${data.application.jobSeeker.name} cho công việc "${data.application.job.title}"`,
        "info"
      );

      // Add new application to list
      const newApp = {
        ...data.application,
        id: data.application._id,
        jobId: data.application.job._id,
        jobTitle: data.application.job.title,
        jobCompany: data.application.job.company || "",
        jobEmployer: data.application.job.employer || null,
        applicantName: data.application.jobSeeker.name,
        applicantEmail: data.application.jobSeeker.email,
        applicantPhone: data.application.jobSeeker.phone || "",
        applicantAvatar: data.application.jobSeeker.avatar || "",
        appliedDate: data.application.createdAt,
        cvId: data.application.cv._id,
        cvName: data.application.cv.name,
        cvFileName: data.application.cv.fileName || "",
        cvFileType: data.application.cv.fileType || "",
      };

      setApplications((prev) => [newApp, ...prev]);
    });

    return () => {
      socket.off("new-application");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user]);

  // Filter applications
  useEffect(() => {
    let result = [...applications];

    if (filters.jobTitle) {
      result = result.filter((app) =>
        app.jobTitle.toLowerCase().includes(filters.jobTitle.toLowerCase())
      );
    }

    if (filters.status) {
      result = result.filter((app) => app.status === filters.status);
    }

    setFilteredApplications(result);
  }, [filters, applications]);

  const handleStatusChange = async (appId, newStatus) => {
    try {
      await applicationService.updateApplicationStatus(appId, newStatus, "");
      showToast(
        `Đã cập nhật trạng thái ${
          newStatus === "accepted"
            ? "chấp nhận"
            : newStatus === "rejected"
            ? "từ chối"
            : "đang xem xét"
        }!`,
        "success"
      );

      // Update local state
      setApplications((prev) =>
        prev.map((app) =>
          app.id === appId ? { ...app, status: newStatus } : app
        )
      );
    } catch (error) {
      console.error("Error updating application status:", error);
      const errorMessage =
        error?.response?.data?.error ||
        error?.message ||
        "Không thể cập nhật trạng thái. Vui lòng thử lại sau.";
      showToast(errorMessage, "error");
    }
  };

  const handleViewCV = async (cvId) => {
    try {
      showToast("Đang tải CV...", "info");

      // First, get CV details to check file type
      const cvResponse = await cvService.getCV(cvId);
      const cvData = cvResponse.data.data?.cv || cvResponse.data.cv;

      if (!cvData) {
        throw new Error("Không tìm thấy CV");
      }

      const cvFileType = cvData.fileType || cvData.type;

      // If HTML CV, open in new tab
      if (cvFileType === "text/html" && cvData.html) {
        const newWindow = window.open("", "_blank");
        if (newWindow) {
          newWindow.document.write(cvData.html);
          newWindow.document.close();
          showToast("Đã mở CV trong tab mới", "success");
        } else {
          showToast(
            "Không thể mở tab mới. Vui lòng kiểm tra cài đặt trình duyệt.",
            "warning"
          );
        }
        return;
      }

      // For file-based CVs (PDF, Word), download and open
      const baseURL =
        import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const token = localStorage.getItem("token");

      if (!token) {
        showToast("Vui lòng đăng nhập lại để xem CV", "error");
        return;
      }

      const response = await fetch(`${baseURL}/cvs/${cvId}/download`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Không thể tải CV");
      }

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      // Determine file type and open accordingly
      if (cvFileType === "application/pdf") {
        // For PDF, open in new tab
        window.open(blobUrl, "_blank");
        showToast("Đã mở CV trong tab mới", "success");
      } else {
        // For Word documents, create download link
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = cvData.name || cvData.fileName || "CV";
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast("Đã tải CV xuống. Vui lòng mở file để xem.", "success");
      }

      // Clean up blob URL after a delay
      setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
      }, 1000);
    } catch (error) {
      console.error("Error viewing CV:", error);
      const errorMessage =
        error?.response?.data?.error ||
        error?.message ||
        "Không thể xem CV. Vui lòng thử lại sau.";
      showToast(errorMessage, "error");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getFileIcon = (fileType) => {
    if (!fileType) return <FaFileAlt className="w-4 h-4 text-gray-500" />;
    const typeStr = String(fileType).toLowerCase();
    if (typeStr === "application/pdf") {
      return <FaFilePdf className="w-4 h-4 text-red-500" />;
    } else if (
      typeStr.includes("word") ||
      typeStr.includes("msword") ||
      typeStr.includes("wordprocessingml")
    ) {
      return <FaFileWord className="w-4 h-4 text-blue-500" />;
    } else if (typeStr === "text/html") {
      return <FaFileAlt className="w-4 h-4 text-green-500" />;
    }
    return <FaFileAlt className="w-4 h-4 text-gray-500" />;
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "pending":
        return "Đang xem xét";
      case "accepted":
        return "Đã chấp nhận";
      case "rejected":
        return "Đã từ chối";
      default:
        return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "accepted":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (
    !isAuthenticated ||
    (user?.role !== "employer" && user?.role !== "admin")
  ) {
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
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Đơn ứng tuyển
              </h1>
              <p className="text-gray-600">
                {isAdmin
                  ? "Quản lý toàn bộ đơn ứng tuyển trên hệ thống"
                  : "Quản lý và xử lý đơn ứng tuyển của ứng viên"}
              </p>
            </div>
            {isAdmin && (
              <div className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold text-sm">
                🔑 Chế độ Admin
              </div>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tìm kiếm theo công việc
              </label>
              <input
                type="text"
                value={filters.jobTitle}
                onChange={(e) =>
                  setFilters({ ...filters, jobTitle: e.target.value })
                }
                placeholder="Tên công việc..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trạng thái
              </label>
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">Tất cả</option>
                <option value="pending">Đang xem xét</option>
                <option value="accepted">Đã chấp nhận</option>
                <option value="rejected">Đã từ chối</option>
              </select>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                Danh sách đơn ứng tuyển ({filteredApplications.length})
              </h2>
              {isAdmin && (
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                  Đang xem tất cả đơn ứng tuyển
                </span>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="p-12 text-center">
              <p className="text-gray-600">
                Đang tải danh sách đơn ứng tuyển...
              </p>
            </div>
          ) : filteredApplications.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {filteredApplications.map((app) => (
                <div
                  key={app.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {app.applicantName}
                      </h3>
                      <p className="text-purple-600 font-medium mb-2">
                        {app.jobTitle}
                        {app.jobCompany && ` - ${app.jobCompany}`}
                      </p>
                      {isAdmin && app.jobEmployer && (
                        <div className="mb-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            👤 Nhà tuyển dụng:{" "}
                            {typeof app.jobEmployer === "object"
                              ? app.jobEmployer.name ||
                                app.jobEmployer.email ||
                                "N/A"
                              : "N/A"}
                          </span>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <FaEnvelope className="w-3 h-3 text-blue-500" />
                          {app.applicantEmail}
                        </span>
                        {app.applicantPhone && (
                          <span className="flex items-center gap-1">
                            <FaPhone className="w-3 h-3 text-green-500" />
                            {app.applicantPhone}
                          </span>
                        )}
                        <span>📅 {formatDate(app.appliedDate)}</span>
                      </div>
                      {app.cvName && (
                        <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                          {getFileIcon(app.cvFileType)}
                          <span>CV: {app.cvName}</span>
                        </div>
                      )}
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        app.status
                      )}`}
                    >
                      {getStatusLabel(app.status)}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    {app.cvId && (
                      <button
                        onClick={() => handleViewCV(app.cvId)}
                        className="text-amber-600 hover:text-amber-700 font-medium text-sm cursor-pointer flex items-center gap-2"
                      >
                        <FaEye className="w-4 h-4" />
                        Xem CV
                      </button>
                    )}
                    {app.cvId && (
                      <button
                        onClick={async () => {
                          try {
                            await cvService.downloadCV(app.cvId);
                            showToast("Đã tải CV xuống", "success");
                          } catch (error) {
                            showToast(
                              "Không thể tải CV. Vui lòng thử lại sau.",
                              "error"
                            );
                          }
                        }}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm cursor-pointer flex items-center gap-2"
                      >
                        <FaDownload className="w-4 h-4" />
                        Tải CV
                      </button>
                    )}
                    {app.status === "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStatusChange(app.id, "accepted")}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm cursor-pointer"
                        >
                          Chấp nhận
                        </button>
                        <button
                          onClick={() => handleStatusChange(app.id, "rejected")}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm cursor-pointer"
                        >
                          Từ chối
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-gray-600">Không có đơn ứng tuyển nào</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployerApplicationsPage;
