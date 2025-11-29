// Trang đăng nhập
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Toast, useToast } from "../components/Toast";
import useAuthStore from "../store/authStore";
import { FaEye, FaEyeSlash, FaUserTie, FaBriefcase } from "react-icons/fa";

function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const { toast, showToast, hideToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  // Dữ liệu đăng nhập mẫu (pre-filled)
  const [formData, setFormData] = useState({
    email: "demo@equalhire.vn",
    password: "demo123",
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

  // Xử lý submit đăng nhập
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation đơn giản
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Vui lòng nhập email!";
    }
    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Thực hiện đăng nhập
    const userData = {
      id: `user-${Date.now()}`,
      name:
        formData.role === "employer"
          ? "Nhà Tuyển Dụng Demo"
          : "Người Tìm Việc Demo",
      email: formData.email,
      role: formData.role,
    };

    login(userData);
    showToast("Đăng nhập thành công!", "success");

    // Nếu là người tìm việc
    if (formData.role === "jobseeker") {
      // Sau khi đăng nhập người tìm việc, chuyển thẳng đến trang tìm việc
      setTimeout(() => {
        navigate("/jobseeker");
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
            Đăng nhập
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="font-medium text-purple-600 hover:text-purple-500"
            >
              Đăng ký ngay
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
                onClick={() => setFormData({ ...formData, role: "jobseeker" })}
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
                onClick={() => setFormData({ ...formData, role: "employer" })}
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

          {/* Nút đăng nhập */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 text-sm font-semibold rounded-full text-white animate-gradient-slide shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 cursor-pointer"
            >
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
