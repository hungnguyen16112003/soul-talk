// Trang chi tiết công việc
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jobService } from "../services/jobService";
import { applicationService } from "../services/applicationService";
import { cvService } from "../services/cvService";
import { Toast, useToast } from "../components/Toast";
import useAuthStore from "../store/authStore";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaMoneyBillWave,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimes,
} from "react-icons/fa";
import SelectCVModal from "../components/SelectCVModal";

function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  const { toast, showToast, hideToast } = useToast();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSelectCVModalOpen, setIsSelectCVModalOpen] = useState(false);
  const [existingApplication, setExistingApplication] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [myApplications, setMyApplications] = useState([]);

  useEffect(() => {
    const loadJob = async () => {
      try {
        setIsLoading(true);
        const response = await jobService.getJob(id);
        // Backend trả về: { success: true, data: { job: {...} } }
        const jobData =
          response.data.data?.job ||
          response.data.job ||
          response.data.data ||
          response.data;
        if (!jobData) {
          throw new Error("Không tìm thấy công việc");
        }
        // Map _id to id for compatibility
        setJob({
          ...jobData,
          id: jobData._id || jobData.id,
        });
      } catch (error) {
        console.error("Error loading job:", error);
        showToast(
          "Không thể tải thông tin công việc. Vui lòng thử lại sau.",
          "error"
        );
        setTimeout(() => {
          navigate("/jobseeker");
        }, 2000);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadJob();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Load my applications to check if already applied
  useEffect(() => {
    const loadMyApplications = async () => {
      if (!isAuthenticated || user?.role !== "jobseeker") return;

      try {
        const response = await applicationService.getMyApplications();
        const appsData =
          response.data.data?.applications || response.data.applications || [];
        setMyApplications(appsData);
      } catch (error) {
        console.error("Error loading my applications:", error);
        // Silent fail - không hiển thị lỗi vì đây chỉ là check
      }
    };

    if (isAuthenticated && user?.role === "jobseeker") {
      loadMyApplications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user?.role]);

  const handleApply = async () => {
    if (!isAuthenticated) {
      showToast("Vui lòng đăng nhập để ứng tuyển!", "warning");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
      return;
    }

    if (user?.role === "employer") {
      showToast("Bạn đang đăng nhập với vai trò nhà tuyển dụng!", "warning");
      return;
    }

    // Check if already applied from myApplications list
    const existingApp = myApplications.find((app) => {
      const appJobId = app.job?._id || app.job?.id || app.job;
      const currentJobId = id || job?.id || job?._id;
      // Compare as strings to handle ObjectId comparison
      return String(appJobId) === String(currentJobId);
    });

    if (existingApp) {
      // Map application data for dialog
      const applicationData = {
        id: existingApp._id || existingApp.id,
        status: existingApp.status || "pending",
        job: {
          title: existingApp.job?.title || job?.title || "",
          company: existingApp.job?.company || job?.company || "",
        },
        cv: {
          name: existingApp.cv?.name || "",
          fileName: existingApp.cv?.fileName || "",
        },
        createdAt: existingApp.createdAt,
        updatedAt: existingApp.updatedAt,
      };
      setExistingApplication(applicationData);
      setShowConfirmDialog(true);
      return;
    }

    // Check if user has CVs from API
    try {
      const cvsResponse = await cvService.getCVs();
      const cvsData = cvsResponse.data.data?.cvs || cvsResponse.data.cvs || [];
      if (cvsData.length === 0) {
        showToast(
          "Bạn chưa có CV nào. Vui lòng tải lên hoặc tạo CV trước!",
          "warning"
        );
        setTimeout(() => {
          navigate("/manage-cv");
        }, 1500);
        return;
      }
    } catch (error) {
      console.error("Error checking CVs:", error);
      showToast("Không thể kiểm tra CV. Vui lòng thử lại sau.", "error");
      return;
    }

    // Open CV selection modal
    setIsSelectCVModalOpen(true);
  };

  const handleConfirmReapply = async () => {
    setShowConfirmDialog(false);
    
    // Check if user has CVs from API
    try {
      const cvsResponse = await cvService.getCVs();
      const cvsData = cvsResponse.data.data?.cvs || cvsResponse.data.cvs || [];
      if (cvsData.length === 0) {
        showToast(
          "Bạn chưa có CV nào. Vui lòng tải lên hoặc tạo CV trước!",
          "warning"
        );
        setTimeout(() => {
          navigate("/manage-cv");
        }, 1500);
        return;
      }
    } catch (error) {
      console.error("Error checking CVs:", error);
      showToast("Không thể kiểm tra CV. Vui lòng thử lại sau.", "error");
      return;
    }

    // Open CV selection modal
    setIsSelectCVModalOpen(true);
  };

  const handleCVSelected = async (selectedCV, jobId) => {
    try {
      const isUpdate = existingApplication !== null;
      showToast(
        isUpdate ? "Đang cập nhật đơn ứng tuyển..." : "Đang gửi đơn ứng tuyển...",
        "info"
      );

      // Send application to backend
      const response = await applicationService.createApplication(
        jobId,
        selectedCV.id,
        "" // coverLetter - có thể thêm sau
      );

      if (response && response.success) {
        const message = response.data?.message || 
          (isUpdate 
            ? "Đơn ứng tuyển đã được cập nhật thành công!" 
            : "Ứng tuyển thành công! Chúng tôi sẽ liên hệ với bạn sớm.");
        showToast(message, "success");
        setIsSelectCVModalOpen(false);
        setExistingApplication(null); // Reset existing application
        
        // Reload my applications to update the list
        try {
          const response = await applicationService.getMyApplications();
          const appsData =
            response.data.data?.applications || response.data.applications || [];
          setMyApplications(appsData);
        } catch (error) {
          console.error("Error reloading applications:", error);
        }
      } else {
        const errorMessage =
          response?.error ||
          response?.message ||
          "Không thể gửi đơn ứng tuyển. Vui lòng thử lại sau.";
        showToast(errorMessage, "error");
      }
    } catch (error) {
      console.error("Error applying for job:", error);
      const errorMessage =
        error?.response?.data?.error ||
        error?.message ||
        "Không thể gửi đơn ứng tuyển. Vui lòng thử lại sau.";
      showToast(errorMessage, "error");
    }
  };

  if (isLoading || !job) {
    return (
      <div className="page-wrapper min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Đang tải...</p>
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-purple-600 hover:text-purple-700 font-medium flex items-center gap-2 cursor-pointer"
        >
          ← Quay lại
        </button>

        {/* Job Header */}
        <div className="bg-white rounded-xl p-8 shadow-md mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {job.title}
              </h1>
              <p className="text-xl text-purple-600 font-medium mb-4">
                {job.company}
              </p>
              <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMoneyBillWave className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="font-semibold">{job.salary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      job.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {job.status === "active" ? "Còn tuyển" : "Tạm dừng"}
                  </span>
                </div>
              </div>

              {job.disabilityTypes && job.disabilityTypes.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.disabilityTypes.map((type, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                    >
                      {type}
                    </span>
                  ))}
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    Mức độ: {job.severityLevel}
                  </span>
                </div>
              )}
            </div>

            {job.employerAvatar && (
              <div className="text-6xl ml-4">{job.employerAvatar}</div>
            )}
          </div>

          {/* Apply button */}
          {job.status === "active" && (
            <button
              onClick={handleApply}
              className="w-full md:w-auto animate-gradient-slide text-white px-8 py-3 rounded-lg shadow-md hover:shadow-xl transition-all font-semibold text-lg cursor-pointer"
            >
              Ứng tuyển ngay
            </button>
          )}
        </div>

        {/* Job Description */}
        <div className="bg-white rounded-xl p-8 shadow-md mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Mô tả công việc
          </h2>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">
            {job.description}
          </p>
        </div>

        {/* Requirements */}
        {job.requirements && job.requirements.length > 0 && (
          <div className="bg-white rounded-xl p-8 shadow-md mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Yêu cầu</h2>
            <ul className="space-y-2">
              {job.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-700">
                  <span className="text-purple-600 font-bold mt-1">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Contact Information */}
        {(job.contact || job.address || job.email || job.website) && (
          <div className="bg-white rounded-xl p-8 shadow-md mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Thông tin liên hệ
            </h2>
            <div className="space-y-4">
              {job.contact && (
                <div className="flex items-start gap-3">
                  <FaPhone className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Số điện thoại
                    </h4>
                    <p className="text-gray-700">{job.contact}</p>
                  </div>
                </div>
              )}
              {job.address && (
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Địa chỉ
                    </h4>
                    <p className="text-gray-700 whitespace-pre-line">
                      {job.address}
                    </p>
                  </div>
                </div>
              )}
              {job.email && (
                <div className="flex items-start gap-3">
                  <FaEnvelope className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <a
                      href={`mailto:${job.email}`}
                      className="text-purple-600 hover:text-purple-700 underline"
                    >
                      {job.email}
                    </a>
                  </div>
                </div>
              )}
              {job.website && (
                <div className="flex items-start gap-3">
                  <FaGlobe className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Website/Facebook
                    </h4>
                    <a
                      href={
                        job.website.startsWith("http")
                          ? job.website
                          : `https://${job.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-700 underline break-all"
                    >
                      {job.website}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Why This Job Is Suitable */}
        <div className="bg-purple-50 rounded-xl p-8 shadow-md mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Tại sao công việc này phù hợp với bạn?
          </h2>
          <ul className="space-y-3 text-gray-700">
            {job.disabilityTypes && job.disabilityTypes.length > 0 && (
              <li className="flex items-start gap-3">
                <FaCheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>
                  Công việc phù hợp với người khuyết tật:{" "}
                  {job.disabilityTypes.join(", ")}
                </span>
              </li>
            )}
            <li className="flex items-start gap-3">
              <FaCheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Mức độ khuyết tật phù hợp: {job.severityLevel}</span>
            </li>
            <li className="flex items-start gap-3">
              <FaCheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>
                Công ty cam kết tạo môi trường làm việc hỗ trợ và thân thiện
              </span>
            </li>
          </ul>
        </div>

        {/* Apply button (bottom) */}
        {job.status === "active" && (
          <div className="bg-white rounded-xl p-6 shadow-md sticky bottom-4">
            <button
              onClick={handleApply}
              className="w-full animate-gradient-slide text-white px-8 py-4 rounded-lg shadow-md hover:shadow-xl transition-all font-semibold text-lg cursor-pointer"
            >
              Ứng tuyển ngay
            </button>
          </div>
        )}
      </div>

      {/* Select CV Modal */}
      <SelectCVModal
        isOpen={isSelectCVModalOpen}
        onClose={() => setIsSelectCVModalOpen(false)}
        onSelect={handleCVSelected}
        jobId={job?.id}
      />

      {/* Confirm Reapply Dialog */}
      {showConfirmDialog && existingApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <FaExclamationTriangle className="w-6 h-6 text-amber-500" />
                <h3 className="text-xl font-bold text-gray-900">
                  Bạn đã ứng tuyển công việc này
                </h3>
              </div>
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                Bạn đã ứng tuyển cho vị trí <strong>{existingApplication.job?.title}</strong> tại{" "}
                <strong>{existingApplication.job?.company}</strong> với trạng thái{" "}
                <span className="font-semibold">
                  {existingApplication.status === "pending"
                    ? "Chờ xem xét"
                    : existingApplication.status === "reviewing"
                    ? "Đang xem xét"
                    : existingApplication.status === "accepted"
                    ? "Đã chấp nhận"
                    : existingApplication.status === "rejected"
                    ? "Đã từ chối"
                    : existingApplication.status}
                </span>
                .
              </p>
              {existingApplication.cv && (
                <p className="text-sm text-gray-600 mb-2">
                  CV đã gửi: <strong>{existingApplication.cv.name || existingApplication.cv.fileName}</strong>
                </p>
              )}
              {existingApplication.createdAt && (
                <p className="text-sm text-gray-600 mb-2">
                  Ngày đã ứng tuyển: <strong>
                    {new Date(existingApplication.createdAt).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </strong>
                </p>
              )}
              <p className="text-sm text-gray-600">
                Bạn có muốn cập nhật đơn ứng tuyển với CV mới không?
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmReapply}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-lg hover:from-amber-600 hover:to-yellow-600 transition-all font-medium animate-gradient-slide"
              >
                Cập nhật đơn ứng tuyển
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobDetailPage;
