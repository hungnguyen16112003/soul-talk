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

  if (!isAuthenticated) {
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 text-purple-600 hover:text-purple-700 font-medium flex items-center gap-2 cursor-pointer"
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
        <div className="bg-white rounded-xl p-8 shadow-md mb-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
            <div className="relative group">
              {avatarPreview || user?.avatar ? (
                <div className="relative">
                  <img
                    src={avatarPreview || user?.avatar}
                    alt="Avatar"
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                  />
                  <button
                    onClick={handleRemoveAvatar}
                    className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                    title="Xóa ảnh đại diện"
                  >
                    <FaTimes className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
              <button
                onClick={handleAvatarClick}
                className="absolute -bottom-1 -right-1 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors shadow-lg border-2 border-white cursor-pointer"
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
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {user?.name || "Chưa có tên"}
              </h2>
              <p className="text-purple-600 font-medium mb-1">
                {user?.role === "employer"
                  ? "Nhà tuyển dụng"
                  : "Người tìm việc"}
              </p>
              <p className="text-gray-600 text-sm">{user?.email}</p>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors cursor-pointer"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
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
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all cursor-pointer"
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
                className="text-purple-600 hover:text-purple-700 font-medium text-sm cursor-pointer"
              >
                Cập nhật hồ sơ tìm việc →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;


