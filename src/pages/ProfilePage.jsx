// Trang thông tin tài khoản
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { Toast, useToast } from "../components/Toast";
import { FaCamera, FaTimes } from "react-icons/fa";

function ProfilePage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const login = useAuthStore((state) => state.login);
  const { toast, showToast, hideToast } = useToast();
  const fileInputRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  // Route protection
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Load user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.role || "",
      });
      if (user.avatar) {
        setAvatarPreview(user.avatar);
      }
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.email) {
      showToast("Vui lòng điền đầy đủ thông tin!", "warning");
      return;
    }

    // Update user in store
    const updatedUser = {
      ...user,
      ...formData,
      avatar: avatarPreview || user?.avatar,
    };
    login(updatedUser);

    setIsEditing(false);
    showToast("Cập nhật thông tin thành công!", "success");
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      showToast("Vui lòng chọn file ảnh!", "warning");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showToast("Kích thước file không được vượt quá 5MB!", "warning");
      return;
    }

    // Read file as base64
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
      // Auto-save avatar
      const updatedUser = {
        ...user,
        avatar: reader.result,
      };
      login(updatedUser);
      showToast("Cập nhật ảnh đại diện thành công!", "success");
    };
    reader.onerror = () => {
      showToast("Lỗi khi đọc file!", "error");
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview(null);
    const updatedUser = {
      ...user,
      avatar: null,
    };
    login(updatedUser);
    showToast("Đã xóa ảnh đại diện!", "success");
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarView = (e) => {
    e.stopPropagation();
    if (avatarPreview || user?.avatar) {
      setIsAvatarModalOpen(true);
    }
  };

  if (!isAuthenticated) {
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 text-amber-600 hover:text-amber-700 font-medium flex items-center gap-2 cursor-pointer"
          >
            ← Quay lại
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Thông tin tài khoản
          </h1>
          <p className="text-gray-600">
            Quản lý thông tin cá nhân và cài đặt tài khoản của bạn
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-md mb-6">
          {/* Avatar Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-8 pb-8 border-b border-gray-200">
            <div className="relative flex-shrink-0">
              {avatarPreview || user?.avatar ? (
                <div className="relative">
                  <img
                    src={avatarPreview || user?.avatar}
                    alt="Avatar"
                    onClick={handleAvatarView}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white shadow-md cursor-pointer hover:opacity-90 transition-opacity"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveAvatar();
                    }}
                    className="absolute -top-1 -right-1 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg cursor-pointer z-10"
                    title="Xóa ảnh đại diện"
                  >
                    <FaTimes className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center text-white text-3xl sm:text-4xl font-bold">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
              <button
                onClick={handleAvatarClick}
                className="absolute -bottom-1 -right-1 w-8 h-8 sm:w-9 sm:h-9 bg-amber-600 text-white rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors shadow-lg border-2 border-white cursor-pointer z-10"
                title="Cập nhật ảnh đại diện"
              >
                <FaCamera className="w-4 h-4" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 truncate">
                {user?.name || "Chưa có tên"}
              </h2>
              <p className="text-amber-600 font-medium mb-1">
                {user?.role === "employer"
                  ? "Nhà tuyển dụng"
                  : "Người tìm việc"}
              </p>
              <p className="text-gray-600 text-sm truncate">{user?.email}</p>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full sm:w-auto px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                Chỉnh sửa
              </button>
            )}
          </div>

          {/* Form Section */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và tên *
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Nhập họ và tên"
                  />
                ) : (
                  <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">
                    {formData.name || "Chưa có"}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Nhập email"
                  />
                ) : (
                  <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">
                    {formData.email || "Chưa có"}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Nhập số điện thoại"
                  />
                ) : (
                  <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">
                    {formData.phone || "Chưa có"}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vai trò
                </label>
                <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">
                  {formData.role === "employer"
                    ? "Nhà tuyển dụng"
                    : formData.role === "jobseeker"
                    ? "Người tìm việc"
                    : "Chưa có"}
                </p>
              </div>
            </div>

            {/* Edit Buttons */}
            {isEditing && (
              <div className="flex gap-4 pt-4 border-t border-gray-200">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-lg hover:shadow-lg transition-all cursor-pointer"
                >
                  Lưu thay đổi
                </button>
                <button
                  onClick={() => {
                    setFormData({
                      name: user?.name || "",
                      email: user?.email || "",
                      phone: user?.phone || "",
                      role: user?.role || "",
                    });
                    setIsEditing(false);
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Hủy
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info for Job Seeker */}
        {user?.role === "jobseeker" && (
          <div className="bg-white rounded-xl p-8 shadow-md">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Hồ sơ tìm việc
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loại khuyết tật
                </label>
                <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">
                  {(() => {
                    const profile = localStorage.getItem("jobSeekerProfile");
                    if (profile) {
                      const parsed = JSON.parse(profile);
                      return parsed.disabilityType || "Chưa cập nhật";
                    }
                    return "Chưa cập nhật";
                  })()}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mức độ
                </label>
                <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">
                  {(() => {
                    const profile = localStorage.getItem("jobSeekerProfile");
                    if (profile) {
                      const parsed = JSON.parse(profile);
                      return parsed.severityLevel || "Chưa cập nhật";
                    }
                    return "Chưa cập nhật";
                  })()}
                </p>
              </div>
              <button
                onClick={() => navigate("/onboarding")}
                className="text-amber-600 hover:text-amber-700 font-medium text-sm cursor-pointer"
              >
                Cập nhật hồ sơ tìm việc →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal hiển thị ảnh avatar lớn */}
      {isAvatarModalOpen && (avatarPreview || user?.avatar) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setIsAvatarModalOpen(false)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
            <img
              src={avatarPreview || user?.avatar}
              alt="Avatar"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setIsAvatarModalOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 rounded-full flex items-center justify-center transition-all shadow-lg cursor-pointer"
              title="Đóng"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;


