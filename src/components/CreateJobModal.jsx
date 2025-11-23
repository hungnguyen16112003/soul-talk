// Modal tạo/chỉnh sửa tin tuyển dụng
import { useState, useEffect } from "react";
import { Toast, useToast } from "./Toast";
import { disabilityTypes, severityLevels } from "../data/mockData";

function CreateJobModal({ isOpen, onClose, onSave, editingJob = null }) {
  const { toast, showToast, hideToast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "TP.HCM",
    salary: "",
    description: "",
    requirements: [],
    disabilityTypes: [],
    severityLevel: "Nhẹ",
    status: "active",
  });

  const [newRequirement, setNewRequirement] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingJob) {
      setFormData({
        title: editingJob.title || "",
        company: editingJob.company || "",
        location: editingJob.location || "TP.HCM",
        salary: editingJob.salary || "",
        description: editingJob.description || "",
        requirements: editingJob.requirements || [],
        disabilityTypes: editingJob.disabilityTypes || [],
        severityLevel: editingJob.severityLevel || "Nhẹ",
        status: editingJob.status || "active",
      });
    } else {
      setFormData({
        title: "",
        company: "",
        location: "TP.HCM",
        salary: "",
        description: "",
        requirements: [],
        disabilityTypes: [],
        severityLevel: "Nhẹ",
        status: "active",
      });
    }
  }, [editingJob, isOpen]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.title) newErrors.title = "Vui lòng nhập tiêu đề!";
    if (!formData.company) newErrors.company = "Vui lòng nhập tên công ty!";
    if (!formData.salary) newErrors.salary = "Vui lòng nhập mức lương!";
    if (!formData.description)
      newErrors.description = "Vui lòng nhập mô tả!";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast("Vui lòng điền đầy đủ thông tin!", "error");
      return;
    }

    onSave(formData);
    showToast(
      editingJob ? "Cập nhật tin thành công!" : "Tạo tin thành công!",
      "success"
    );
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />

      <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {editingJob ? "Chỉnh sửa tin tuyển dụng" : "Tạo tin tuyển dụng"}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-2xl cursor-pointer"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Địa điểm *
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="Hà Nội">Hà Nội</option>
                <option value="TP.HCM">TP.HCM</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mô tả *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className={`w-full px-3 py-2 border rounded-lg ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Yêu cầu
            </label>
            <div className="flex gap-2 mb-2">
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
                placeholder="Nhập yêu cầu và nhấn Enter"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
              />
              <button
                type="button"
                onClick={handleAddRequirement}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer"
              >
                Thêm
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.requirements.map((req, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-2"
                >
                  {req}
                  <button
                    type="button"
                    onClick={() => handleRemoveRequirement(idx)}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loại khuyết tật phù hợp
            </label>
            <div className="grid grid-cols-3 gap-2">
              {disabilityTypes.map((type) => (
                <label
                  key={type.id}
                  className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-purple-50"
                >
                  <input
                    type="checkbox"
                    checked={formData.disabilityTypes.includes(type.name)}
                    onChange={() => handleDisabilityTypeChange(type.name)}
                    className="rounded"
                  />
                  <span>{type.icon}</span>
                  <span className="text-sm">{type.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mức độ
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
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
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

          <div className="flex gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all cursor-pointer"
            >
              {editingJob ? "Cập nhật" : "Tạo tin"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateJobModal;


