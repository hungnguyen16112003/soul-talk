// Trang tạo/chỉnh sửa tin tuyển dụng
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { disabilityTypes, severityLevels } from "../data/mockData";
import { Toast, useToast } from "../components/Toast";
import { jobService } from "../services/jobService";
import {
  FaArrowLeft,
  FaPlus,
  FaTimes,
  FaBriefcase,
  FaBuilding,
  FaMapMarkerAlt,
  FaDollarSign,
  FaFileAlt,
  FaList,
  FaCheckCircle,
  FaExclamationTriangle,
  FaDeaf,
  FaEye,
  FaWheelchair,
  FaBrain,
  FaHandsHelping,
} from "react-icons/fa";
import useAuthStore from "../store/authStore";

function CreateJobPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast, showToast, hideToast } = useToast();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Lấy editingJob từ location.state hoặc query params
  const editingJob = location.state?.editingJob || null;

  // Initialize formData based on editingJob
  const getInitialFormData = () => {
    if (editingJob) {
      // Ensure requirements is an array
      let requirements = [];
      if (editingJob.requirements) {
        if (Array.isArray(editingJob.requirements)) {
          requirements = editingJob.requirements;
        } else if (typeof editingJob.requirements === 'string') {
          // If requirements is a string, try to parse it
          try {
            const parsed = JSON.parse(editingJob.requirements);
            requirements = Array.isArray(parsed) ? parsed : [];
          } catch {
            requirements = [];
          }
        }
      }
      
      return {
        title: editingJob.title || "",
        company: editingJob.company || "",
        location: editingJob.location || "Miền Nam",
        salary: editingJob.salary || "",
        description: editingJob.description || "",
        requirements: requirements,
        disabilityTypes: Array.isArray(editingJob.disabilityTypes) ? editingJob.disabilityTypes : (editingJob.disabilityTypes || []),
        severityLevel: editingJob.severityLevel || "Nhẹ",
        status: editingJob.status || "active",
      };
    }
    return {
      title: "",
      company: "",
      location: "Miền Nam",
      salary: "",
      description: "",
      requirements: [],
      disabilityTypes: [],
      severityLevel: "Nhẹ",
      status: "active",
    };
  };

  const [formData, setFormData] = useState(() => getInitialFormData());
  const [newRequirement, setNewRequirement] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update formData when editingJob changes
  useEffect(() => {
    const initialData = getInitialFormData();
    setFormData(initialData);
  }, [editingJob]);

  // Route protection
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const userRoles = user?.roles || [];
    const hasAccess =
      userRoles.includes("employer") || userRoles.includes("admin");
    if (!hasAccess) {
      navigate("/login");
    }
  }, [isAuthenticated, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleDisabilityTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      disabilityTypes: prev.disabilityTypes.includes(type)
        ? prev.disabilityTypes.filter((t) => t !== type)
        : [...prev.disabilityTypes, type],
    }));
  };

  const handleAddRequirement = () => {
    if (newRequirement.trim()) {
      setFormData((prev) => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()],
      }));
      setNewRequirement("");
    }
  };

  const handleRemoveRequirement = (index) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.title) newErrors.title = "Vui lòng nhập tiêu đề!";
    if (!formData.company) newErrors.company = "Vui lòng nhập tên công ty!";
    if (!formData.salary) newErrors.salary = "Vui lòng nhập mức lương!";
    if (!formData.description)
      newErrors.description = "Vui lòng nhập mô tả!";
    if (!formData.disabilityTypes || formData.disabilityTypes.length === 0) {
      newErrors.disabilityTypes =
        "Vui lòng chọn ít nhất một loại khuyết tật!";
    }
    if (!formData.severityLevel) {
      newErrors.severityLevel = "Vui lòng chọn mức độ khuyết tật!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast("Vui lòng điền đầy đủ thông tin!", "error");
      return;
    }

    setIsSubmitting(true);

    // Ensure requirements is an array
    const submitData = {
      ...formData,
      requirements: Array.isArray(formData.requirements) ? formData.requirements : []
    };

    try {
      if (editingJob) {
        // Update job
        const jobId = editingJob._id || editingJob.id;
        const response = await jobService.updateJob(jobId, submitData);
        if (response && response.success && response.data) {
          showToast("Cập nhật tin tuyển dụng thành công!", "success");
          setTimeout(() => {
            navigate("/employer");
          }, 1500);
        } else {
          const errorMessage =
            response?.error ||
            response?.message ||
            "Cập nhật tin tuyển dụng thất bại";
          showToast(errorMessage, "error");
        }
      } else {
        // Create job
        const response = await jobService.createJob(submitData);
        if (response && response.success && response.data) {
          showToast("Tạo tin tuyển dụng thành công!", "success");
          setTimeout(() => {
            navigate("/employer");
          }, 1500);
        } else {
          const errorMessage =
            response?.error ||
            response?.message ||
            "Tạo tin tuyển dụng thất bại";
          showToast(errorMessage, "error");
        }
      }
    } catch (error) {
      const errorMessage =
        error?.error ||
        error?.message ||
        "Có lỗi xảy ra khi " +
          (editingJob ? "cập nhật" : "tạo") +
          " tin tuyển dụng";
      showToast(errorMessage, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Toast
          isVisible={toast.isVisible}
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />

        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/employer")}
            className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors mb-4 cursor-pointer"
          >
            <FaArrowLeft className="w-5 h-5" />
            <span>Quay lại</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            {editingJob ? "Chỉnh sửa tin tuyển dụng" : "Tạo tin tuyển dụng"}
          </h1>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <FaFileAlt className="w-4 h-4 text-amber-500" />
                  Tiêu đề *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <FaBuilding className="w-4 h-4 text-amber-500" />
                  Công ty *
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    errors.company ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.company && (
                  <p className="text-red-500 text-xs mt-1">{errors.company}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <FaMapMarkerAlt className="w-4 h-4 text-amber-500" />
                  Địa điểm *
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="Miền Bắc">Miền Bắc</option>
                  <option value="Miền Nam">Miền Nam</option>
                  <option value="Miền Trung">Miền Trung</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <FaDollarSign className="w-4 h-4 text-amber-500" />
                  Mức lương *
                </label>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="VD: 10-15 triệu"
                  className={`w-full px-3 py-2 border rounded-lg ${
                    errors.salary ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.salary && (
                  <p className="text-red-500 text-xs mt-1">{errors.salary}</p>
                )}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <FaFileAlt className="w-4 h-4 text-amber-500" />
                Mô tả *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className={`w-full px-3 py-2 border rounded-lg ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <FaList className="w-4 h-4 text-amber-500" />
                Yêu cầu
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddRequirement();
                    }
                  }}
                  placeholder="Nhập yêu cầu và nhấn Enter hoặc click Thêm"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={handleAddRequirement}
                  disabled={!newRequirement.trim()}
                  className="px-4 py-2 text-white rounded-lg hover:shadow-lg transition-all cursor-pointer font-medium animate-gradient-slide flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaPlus className="w-4 h-4" />
                  Thêm
                </button>
              </div>
              {formData.requirements && Array.isArray(formData.requirements) && formData.requirements.length > 0 ? (
                <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  {formData.requirements.map((req, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-amber-100 text-amber-800 rounded-full text-sm flex items-center gap-2 font-medium border border-amber-200"
                    >
                      {req}
                      <button
                        type="button"
                        onClick={() => handleRemoveRequirement(idx)}
                        className="text-red-600 hover:text-red-800 cursor-pointer flex items-center hover:bg-red-50 rounded-full p-0.5 transition-colors"
                        title="Xóa yêu cầu này"
                      >
                        <FaTimes className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 border-dashed text-center text-gray-500 text-sm">
                  Chưa có yêu cầu nào. Hãy thêm yêu cầu ở trên.
                </div>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <FaCheckCircle className="w-4 h-4 text-amber-500" />
                Loại khuyết tật phù hợp *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {disabilityTypes.map((type) => {
                  // Map emoji icons to react-icons
                  const getIcon = (iconName) => {
                    switch (iconName) {
                      case "Khiếm thính":
                        return <FaDeaf className="w-5 h-5 text-blue-500" />;
                      case "Khiếm thị":
                        return <FaEye className="w-5 h-5 text-purple-500" />;
                      case "Vận động":
                        return <FaWheelchair className="w-5 h-5 text-green-500" />;
                      case "Trí tuệ":
                        return <FaBrain className="w-5 h-5 text-orange-500" />;
                      case "Khác":
                        return <FaHandsHelping className="w-5 h-5 text-amber-500" />;
                      default:
                        return <span>{type.icon}</span>;
                    }
                  };

                  return (
                    <label
                      key={type.id}
                      className={`flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.disabilityTypes.includes(type.name)
                          ? "border-amber-500 bg-amber-50"
                          : "border-gray-200 hover:border-amber-300 hover:bg-amber-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.disabilityTypes.includes(type.name)}
                        onChange={() => handleDisabilityTypeChange(type.name)}
                        className="rounded w-4 h-4 text-amber-600 focus:ring-amber-500"
                      />
                      {getIcon(type.name)}
                      <span className="text-sm font-medium">{type.name}</span>
                    </label>
                  );
                })}
              </div>
              {errors.disabilityTypes && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.disabilityTypes}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <FaExclamationTriangle className="w-4 h-4 text-amber-500" />
                  Mức độ *
                </label>
                <select
                  name="severityLevel"
                  value={formData.severityLevel}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  {severityLevels.map((level) => (
                    <option key={level.id} value={level.name}>
                      {level.name}
                    </option>
                  ))}
                </select>
                {errors.severityLevel && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.severityLevel}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <FaBriefcase className="w-4 h-4 text-amber-500" />
                  Trạng thái
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="active">Còn tuyển</option>
                  <option value="paused">Tạm dừng</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t">
              <button
                type="button"
                onClick={() => navigate("/employer")}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                disabled={isSubmitting}
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 text-white rounded-lg hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed animate-gradient-slide font-medium flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Đang xử lý...
                  </>
                ) : editingJob ? (
                  <>
                    <FaCheckCircle className="w-4 h-4" />
                    Cập nhật
                  </>
                ) : (
                  <>
                    <FaPlus className="w-4 h-4" />
                    Tạo tin
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateJobPage;

