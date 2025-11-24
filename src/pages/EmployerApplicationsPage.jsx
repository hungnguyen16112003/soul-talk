// Trang quản lý đơn ứng tuyển cho nhà tuyển dụng
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { Toast, useToast } from "../components/Toast";

function EmployerApplicationsPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const { toast, showToast, hideToast } = useToast();

  // Mock applications data
  const [applications] = useState([
    {
      id: 1,
      jobTitle: "Lập trình viên Frontend",
      applicantName: "Nguyễn Văn A",
      applicantEmail: "nguyenvana@example.com",
      applicantPhone: "0123456789",
      appliedDate: "2024-01-15",
      status: "pending",
      resume: "CV_NguyenVanA.pdf",
    },
    {
      id: 2,
      jobTitle: "Nhân viên tư vấn khách hàng",
      applicantName: "Trần Thị B",
      applicantEmail: "tranthib@example.com",
      applicantPhone: "0987654321",
      appliedDate: "2024-01-14",
      status: "accepted",
      resume: "CV_TranThiB.pdf",
    },
    {
      id: 3,
      jobTitle: "Nhập liệu viên",
      applicantName: "Lê Văn C",
      applicantEmail: "levanc@example.com",
      applicantPhone: "0912345678",
      appliedDate: "2024-01-13",
      status: "rejected",
      resume: "CV_LeVanC.pdf",
    },
  ]);

  const [filteredApplications, setFilteredApplications] = useState(applications);
  const [filters, setFilters] = useState({
    jobTitle: "",
    status: "",
  });

  // Route protection
  useEffect(() => {
    if (!isAuthenticated || user?.role !== "employer") {
      navigate("/login");
    }
  }, [isAuthenticated, user, navigate]);

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

  const handleStatusChange = (appId, newStatus) => {
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Đơn ứng tuyển
          </h1>
          <p className="text-gray-600">
            Quản lý và xử lý đơn ứng tuyển của ứng viên
          </p>
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
            <h2 className="text-xl font-bold text-gray-900">
              Danh sách đơn ứng tuyển ({filteredApplications.length})
            </h2>
          </div>

          {filteredApplications.length > 0 ? (
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
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span>📧 {app.applicantEmail}</span>
                        <span>📞 {app.applicantPhone}</span>
                        <span>📅 {app.appliedDate}</span>
                      </div>
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
                    <button
                      onClick={() => window.open(app.resume, "_blank")}
                      className="text-purple-600 hover:text-purple-700 font-medium text-sm cursor-pointer"
                    >
                      Xem CV →
                    </button>
                    {app.status === "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleStatusChange(app.id, "accepted")
                          }
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm cursor-pointer"
                        >
                          Chấp nhận
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(app.id, "rejected")
                          }
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

