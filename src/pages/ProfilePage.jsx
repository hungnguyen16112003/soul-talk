// Trang thông tin tài khoản
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { Toast, useToast } from "../components/Toast";
import { userService } from "../services/userService";
import { FaCamera, FaTimes } from "react-icons/fa";
import { buildAvatarUrl } from "../config/api";

// buildAvatarUrl is imported from config/api.js

function ProfilePage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const updateUser = useAuthStore((state) => state.updateUser);

  const logout = useAuthStore((state) => state.logout);
  const { toast, showToast, hideToast } = useToast();
  const fileInputRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    // Job Seeker fields
    disabilityType: "",
    severityLevel: "",
    region: "",
    // Employer fields
    companyName: "",
    companyAddress: "",
    companyWebsite: "",
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Password change states
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

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
        // Job Seeker fields
        disabilityType: user.disabilityType || "",
        severityLevel: user.severityLevel || "",
        region: user.region || "",
        // Employer fields
        companyName: user.companyName || "",
        companyAddress: user.companyAddress || "",
        companyWebsite: user.companyWebsite || "",
      });
      if (user.avatar) {
        setAvatarPreview(buildAvatarUrl(user.avatar));
      } else {
        setAvatarPreview(null);
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

  const handleSave = async () => {
    if (!formData.name) {
      showToast("Vui lòng điền đầy đủ thông tin!", "warning");
      return;
    }

    setIsSaving(true);
    try {
      // Prepare profile data (email không được thay đổi)
      const profileData = {
        name: formData.name,
        phone: formData.phone || "",
      };

      // Add role-specific fields
      if (user?.role === "jobseeker") {
        if (formData.disabilityType)
          profileData.disabilityType = formData.disabilityType;
        if (formData.severityLevel)
          profileData.severityLevel = formData.severityLevel;
        if (formData.region) profileData.region = formData.region;
      } else if (user?.role === "employer") {
        if (formData.companyName)
          profileData.companyName = formData.companyName;
        if (formData.companyAddress)
          profileData.companyAddress = formData.companyAddress;
        if (formData.companyWebsite)
          profileData.companyWebsite = formData.companyWebsite;
      }

      // Call API to update profile
      const response = await userService.updateProfile(profileData, avatarFile);

      // API interceptor returns response.data directly, so response is already the data
      if (response.success) {
        const updatedUserData =
          response.data?.user || response.data || response.user;

        // Update user in store (keep original avatar path from backend)
        updateUser({
          name: updatedUserData.name,
          email: updatedUserData.email,
          phone: updatedUserData.phone,
          avatar: updatedUserData.avatar, // Keep original path like "/uploads/avatar-xxx.jpg"
          disabilityType: updatedUserData.disabilityType,
          severityLevel: updatedUserData.severityLevel,
          region: updatedUserData.region,
          companyName: updatedUserData.companyName,
          companyAddress: updatedUserData.companyAddress,
          companyWebsite: updatedUserData.companyWebsite,
        });

        // Reset avatar file
        setAvatarFile(null);

        // Update avatar preview if new avatar URL
        if (updatedUserData.avatar) {
          setAvatarPreview(buildAvatarUrl(updatedUserData.avatar));
        } else {
          setAvatarPreview(null);
        }

        setIsEditing(false);
        showToast("Cập nhật thông tin thành công!", "success");
      } else {
        showToast(
          response.error || response.message || "Cập nhật thông tin thất bại!",
          "error"
        );
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      console.error("Error details:", {
        message: error.message,
        error: error.error,
        response: error.response,
        data: error.data,
      });
      const errorMsg =
        error.error ||
        error.message ||
        error.data?.error ||
        "Có lỗi xảy ra khi cập nhật thông tin!";
      showToast(errorMsg, "error");
    } finally {
      setIsSaving(false);
    }
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

    // Store file for upload
    setAvatarFile(file);

    // Read file as base64 for preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };
    reader.onerror = () => {
      showToast("Lỗi khi đọc file!", "error");
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    // Show confirmation dialog
    setShowDeleteConfirm(true);
  };

  const confirmDeleteAvatar = async () => {
    setShowDeleteConfirm(false);
    try {
      // Call API to remove avatar
      const profileData = { avatar: null };
      const response = await userService.updateProfile(profileData, null);

      if (response.success) {
        // Clear avatar preview and file
        setAvatarPreview(null);
        setAvatarFile(null);
        // Update user in store with null avatar
        updateUser({ avatar: null });
        showToast("Đã xóa ảnh đại diện!", "success");
      } else {
        showToast(response.error || "Không thể xóa ảnh đại diện!", "error");
      }
    } catch (error) {
      console.error("Error removing avatar:", error);
      const errorMsg =
        error.error || error.message || "Có lỗi xảy ra khi xóa ảnh đại diện!";
      showToast(errorMsg, "error");
    }
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

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      showToast("Vui lòng nhập đầy đủ thông tin!", "warning");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast("Mật khẩu xác nhận không khớp!", "error");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      showToast("Mật khẩu mới phải có ít nhất 6 ký tự!", "warning");
      return;
    }

    setIsChangingPassword(true);
    try {
      await userService.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
        confirmPassword: passwordData.confirmPassword,
      });

      showToast(
        "Mật khẩu đã được thay đổi thành công! Bạn sẽ được đăng xuất để đăng nhập lại với mật khẩu mới.",
        "success"
      );

      // Reset form
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPasswordChange(false);

      // Force logout after password change for security
      setTimeout(() => {
        logout();
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Error changing password:", error);
      const errorMessage =
        error.response?.data?.error || "Có lỗi xảy ra khi đổi mật khẩu!";
      showToast(errorMessage, "error");
    } finally {
      setIsChangingPassword(false);
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
            <div className="relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24">
              {avatarPreview || user?.avatar ? (
                <>
                  <img
                    src={avatarPreview || buildAvatarUrl(user?.avatar)}
                    alt="Avatar"
                    onClick={handleAvatarView}
                    onError={(e) => {
                      console.error(
                        "Avatar load error - Original:",
                        user?.avatar
                      );
                      console.error("Avatar load error - URL:", e.target.src);
                      // Don't hide the image on error, just log it
                    }}
                    onLoad={() => {}}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-amber-500 shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                  />
                  {isEditing && (
                    <>
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
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAvatarClick();
                        }}
                        className="absolute -bottom-1 -right-1 w-8 h-8 sm:w-9 sm:h-9 bg-amber-600 text-white rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors shadow-lg border-2 border-white cursor-pointer z-10"
                        title="Cập nhật ảnh đại diện"
                      >
                        <FaCamera className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center text-white text-3xl sm:text-4xl font-bold">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  {isEditing && (
                    <button
                      onClick={handleAvatarClick}
                      className="absolute -bottom-1 -right-1 w-8 h-8 sm:w-9 sm:h-9 bg-amber-600 text-white rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors shadow-lg border-2 border-white cursor-pointer z-10"
                      title="Cập nhật ảnh đại diện"
                    >
                      <FaCamera className="w-4 h-4" />
                    </button>
                  )}
                </>
              )}
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
                <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">
                  {formData.email || "Chưa có"}
                </p>
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

            {/* Job Seeker Specific Fields */}
            {user?.role === "jobseeker" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loại khuyết tật
                  </label>
                  {isEditing ? (
                    <select
                      name="disabilityType"
                      value={formData.disabilityType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                    >
                      <option value="">Chọn loại khuyết tật</option>
                      <option value="Vận động">Vận động</option>
                      <option value="Khiếm thính">Khiếm thính</option>
                      <option value="Khiếm thị">Khiếm thị</option>
                      <option value="Trí tuệ">Trí tuệ</option>
                      <option value="Khác">Khác</option>
                    </select>
                  ) : (
                    <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">
                      {formData.disabilityType || "Chưa có"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mức độ
                  </label>
                  {isEditing ? (
                    <select
                      name="severityLevel"
                      value={formData.severityLevel}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                    >
                      <option value="">Chọn mức độ</option>
                      <option value="Nhẹ">Nhẹ</option>
                      <option value="Trung bình">Trung bình</option>
                      <option value="Nặng">Nặng</option>
                    </select>
                  ) : (
                    <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">
                      {formData.severityLevel || "Chưa có"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Khu vực
                  </label>
                  {isEditing ? (
                    <select
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                    >
                      <option value="">Chọn khu vực</option>
                      <option value="Miền Bắc">Miền Bắc</option>
                      <option value="Miền Trung">Miền Trung</option>
                      <option value="Miền Nam">Miền Nam</option>
                    </select>
                  ) : (
                    <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">
                      {formData.region || "Chưa có"}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Employer Specific Fields */}
            {user?.role === "employer" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên công ty
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Nhập tên công ty"
                    />
                  ) : (
                    <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">
                      {formData.companyName || "Chưa có"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website công ty
                  </label>
                  {isEditing ? (
                    <input
                      type="url"
                      name="companyWebsite"
                      value={formData.companyWebsite}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                      placeholder="https://example.com"
                    />
                  ) : (
                    <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">
                      {formData.companyWebsite || "Chưa có"}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Địa chỉ công ty
                  </label>
                  {isEditing ? (
                    <textarea
                      name="companyAddress"
                      value={formData.companyAddress}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Nhập địa chỉ công ty"
                    />
                  ) : (
                    <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">
                      {formData.companyAddress || "Chưa có"}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Edit Buttons */}
            {isEditing && (
              <div className="flex gap-4 pt-4 border-t border-gray-200">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-6 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-lg hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      <span>Đang lưu...</span>
                    </>
                  ) : (
                    "Lưu thay đổi"
                  )}
                </button>
                <button
                  onClick={() => {
                    setFormData({
                      name: user?.name || "",
                      email: user?.email || "",
                      phone: user?.phone || "",
                      role: user?.role || "",
                      disabilityType: user?.disabilityType || "",
                      severityLevel: user?.severityLevel || "",
                      region: user?.region || "",
                      companyName: user?.companyName || "",
                      companyAddress: user?.companyAddress || "",
                      companyWebsite: user?.companyWebsite || "",
                    });
                    setAvatarFile(null);
                    setAvatarPreview(user?.avatar || null);
                    setIsEditing(false);
                  }}
                  disabled={isSaving}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Hủy
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Password Change Section */}
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-md mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                Bảo mật tài khoản
              </h2>
              <p className="text-gray-600 text-sm">
                Thay đổi mật khẩu để bảo vệ tài khoản của bạn
              </p>
            </div>
            <button
              onClick={() => setShowPasswordChange(!showPasswordChange)}
              className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm font-medium"
            >
              {showPasswordChange ? "Hủy" : "Đổi mật khẩu"}
            </button>
          </div>

          {showPasswordChange && (
            <div className="border-t border-gray-200 pt-6">
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mật khẩu hiện tại
                  </label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData((prev) => ({
                        ...prev,
                        currentPassword: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                    placeholder="Nhập mật khẩu hiện tại"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mật khẩu mới
                    </label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData((prev) => ({
                          ...prev,
                          newPassword: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                      placeholder="Nhập mật khẩu mới"
                      minLength="6"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Xác nhận mật khẩu mới
                    </label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData((prev) => ({
                          ...prev,
                          confirmPassword: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                      placeholder="Nhập lại mật khẩu mới"
                      minLength="6"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordChange(false);
                      setPasswordData({
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                      });
                    }}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={isChangingPassword}
                    className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isChangingPassword ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Đang cập nhật...</span>
                      </>
                    ) : (
                      <span>Lưu thay đổi</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Dialog for Delete Avatar */}
      {showDeleteConfirm && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowDeleteConfirm(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Xác nhận xóa ảnh đại diện
            </h3>
            <p className="text-gray-600 mb-6">
              Bạn có chắc chắn muốn xóa ảnh đại diện không? Hành động này không
              thể hoàn tác.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={confirmDeleteAvatar}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal hiển thị ảnh avatar lớn */}
      {isAvatarModalOpen && (avatarPreview || user?.avatar) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setIsAvatarModalOpen(false)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
            <img
              src={avatarPreview || buildAvatarUrl(user?.avatar)}
              alt="Avatar"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              onError={(e) => {
                console.error("Avatar modal load error:", user?.avatar);
                e.target.src = "";
              }}
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
