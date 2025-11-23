// Trang chi tiết công việc
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { mockJobs } from "../data/mockData";
import { Toast, useToast } from "../components/Toast";
import useAuthStore from "../store/authStore";

function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  const { toast, showToast, hideToast } = useToast();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const foundJob = mockJobs.find((j) => j.id === parseInt(id));
    if (foundJob) {
      setJob(foundJob);
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  const handleApply = () => {
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

    showToast("Ứng tuyển thành công! Chúng tôi sẽ liên hệ với bạn sớm.", "success");
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
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
                  <span>📍</span>
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>💰</span>
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
              className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all font-semibold text-lg cursor-pointer"
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Yêu cầu
            </h2>
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

        {/* Why This Job Is Suitable */}
        <div className="bg-purple-50 rounded-xl p-8 shadow-md mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Tại sao công việc này phù hợp với bạn?
          </h2>
          <ul className="space-y-3 text-gray-700">
            {job.disabilityTypes && job.disabilityTypes.length > 0 && (
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <span>
                  Công việc phù hợp với người khuyết tật:{" "}
                  {job.disabilityTypes.join(", ")}
                </span>
              </li>
            )}
            <li className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <span>Mức độ khuyết tật phù hợp: {job.severityLevel}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
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
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg hover:shadow-lg transition-all font-semibold text-lg cursor-pointer"
            >
              Ứng tuyển ngay
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobDetailPage;

