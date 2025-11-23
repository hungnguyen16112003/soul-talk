// Trang đăng nhập
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Toast, useToast } from "../components/Toast";
import useAuthStore from "../store/authStore";

function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const { toast, showToast, hideToast } = useToast();

  // Dữ liệu đăng nhập mẫu (pre-filled)
  const [formData, setFormData] = useState({
    email: "demo@soultalk.vn",
    password: "demo123",
    role: "employer", // employer hoặc jobseeker
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
      name: formData.role === "employer" ? "Nhà Tuyển Dụng Demo" : "Người Tìm Việc Demo",
      email: formData.email,
      role: formData.role,
    };

    login(userData);
    showToast("Đăng nhập thành công!", "success");

    // Redirect dựa vào role
    setTimeout(() => {
      if (formData.role === "employer") {
        navigate("/employer");
      } else {
        navigate("/");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
                onClick={() => setFormData({ ...formData, role: "employer" })}
                className={`py-3 px-4 rounded-lg border-2 transition-all cursor-pointer ${
                  formData.role === "employer"
                    ? "border-purple-600 bg-purple-50 text-purple-700"
                    : "border-gray-300 text-gray-700 hover:border-gray-400"
                }`}
              >
                💼 Nhà Tuyển Dụng
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: "jobseeker" })}
                className={`py-3 px-4 rounded-lg border-2 transition-all cursor-pointer ${
                  formData.role === "jobseeker"
                    ? "border-purple-600 bg-purple-50 text-purple-700"
                    : "border-gray-300 text-gray-700 hover:border-gray-400"
                }`}
              >
                👤 Người Tìm Việc
              </button>
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                errors.password ? "border-red-300" : "border-gray-300"
              } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500`}
              placeholder="Mật khẩu"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Nút đăng nhập */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg transition-all cursor-pointer"
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
