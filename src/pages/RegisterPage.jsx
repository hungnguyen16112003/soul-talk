// Trang đăng ký
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Toast, useToast } from "../components/Toast";
import useAuthStore from "../store/authStore";
import { FaEye, FaEyeSlash, FaUserTie, FaBriefcase } from "react-icons/fa";

function RegisterPage() {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  const { toast, showToast, hideToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Dữ liệu đăng ký mẫu (pre-filled)
  const [formData, setFormData] = useState({
    name: "Nguyễn Văn Demo",
    email: "demo@example.com",
    password: "demo123",
    confirmPassword: "demo123",
    phone: "0123456789",
    role: "jobseeker", // employer hoặc jobseeker
  });

  const [errors, setErrors] = useState({});

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error khi user nhập
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Xử lý chọn vai trò
  const handleRoleChange = (role) => {
    setFormData((prev) => ({
      ...prev,
      role: role,
    }));
  };

  // Xử lý submit đăng ký
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = "Vui lòng nhập họ tên!";
    }
    if (!formData.email) {
      newErrors.email = "Vui lòng nhập email!";
    }
    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu!";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp!";
    }
    if (!formData.phone) {
      newErrors.phone = "Vui lòng nhập số điện thoại!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Thực hiện đăng ký
    const userData = {
      id: `user-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
    };

    register(userData);
    showToast("Đăng ký thành công!", "success");

    // Nếu là người tìm việc
    if (formData.role === "jobseeker") {
      // Sau khi đăng ký người tìm việc, chuyển tới onboarding
      setTimeout(() => {
        navigate("/onboarding");
      }, 1000);
    } else {
      // Redirect cho nhà tuyển dụng
      setTimeout(() => {
        navigate("/employer");
      }, 1000);
    }
  };

  return (
    <div className="page-wrapper min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />
      <div className="max-w-2xl w-full space-y-8 bg-white rounded-2xl shadow-lg p-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Đăng ký
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Đã có tài khoản?{" "}
            <Link
              to="/login"
              className="font-medium text-purple-600 hover:text-purple-500"
            >
              Đăng nhập ngay
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Chọn vai trò */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vai trò
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleRoleChange("jobseeker")}
                className={`py-3 px-4 rounded-lg border-2 transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  formData.role === "jobseeker"
                    ? "border-purple-600 bg-purple-50 text-purple-700"
                    : "border-gray-300 text-gray-700 hover:border-gray-400"
                }`}
              >
                <FaUserTie
                  className={`w-5 h-5 ${
                    formData.role === "jobseeker"
                      ? "text-purple-600"
                      : "text-gray-500"
                  }`}
                />
                <span className="font-medium">Người Tìm Việc</span>
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange("employer")}
                className={`py-3 px-4 rounded-lg border-2 transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  formData.role === "employer"
                    ? "border-purple-600 bg-purple-50 text-purple-700"
                    : "border-gray-300 text-gray-700 hover:border-gray-400"
                }`}
              >
                <FaBriefcase
                  className={`w-5 h-5 ${
                    formData.role === "employer"
                      ? "text-purple-600"
                      : "text-gray-500"
                  }`}
                />
                <span className="font-medium">Nhà Tuyển Dụng</span>
              </button>
            </div>
          </div>

          {/* Họ tên */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Họ tên
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                errors.name ? "border-red-300" : "border-gray-300"
              } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500`}
              placeholder="Họ tên"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                errors.email ? "border-red-300" : "border-gray-300"
              } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500`}
              placeholder="Email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Số điện thoại */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Số điện thoại
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                errors.phone ? "border-red-300" : "border-gray-300"
              } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500`}
              placeholder="Số điện thoại"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          {/* Mật khẩu */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Mật khẩu
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className={`appearance-none relative block w-full px-3 py-2 pr-10 border ${
                  errors.password ? "border-red-300" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500`}
                placeholder="Mật khẩu"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showPassword ? (
                  <FaEye className="w-5 h-5" />
                ) : (
                  <FaEyeSlash className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Xác nhận mật khẩu */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Xác nhận mật khẩu
            </label>
            <div className="relative mt-1">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`appearance-none relative block w-full px-3 py-2 pr-10 border ${
                  errors.confirmPassword ? "border-red-300" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500`}
                placeholder="Xác nhận mật khẩu"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showConfirmPassword ? (
                  <FaEye className="w-5 h-5" />
                ) : (
                  <FaEyeSlash className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Nút đăng ký */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 text-sm font-semibold rounded-full text-white animate-gradient-slide shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 cursor-pointer"
            >
              Đăng ký
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
