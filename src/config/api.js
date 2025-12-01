// API Configuration
import axios from "axios";

// Base URL for API
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => {
    return response.data; // Return data directly
  },
  (error) => {
    if (error.response) {
      // Server responded with error
      const errorData = error.response.data || {};
      const message = errorData.error || errorData.message || "Có lỗi xảy ra";

      // Handle 401 - Unauthorized (chỉ redirect nếu không phải login/register)
      if (error.response.status === 401) {
        const url = error.config?.url || "";
        // Không redirect nếu đang ở trang login/register
        if (!url.includes("/auth/login") && !url.includes("/auth/register")) {
          localStorage.removeItem("token");
          localStorage.removeItem("soul-talk-auth");
          // Chỉ redirect nếu không phải đang ở trang login
          if (
            window.location.pathname !== "/login" &&
            window.location.pathname !== "/register"
          ) {
            window.location.href = "/login";
          }
        }
      }

      return Promise.reject({
        message,
        error: message,
        status: error.response.status,
        data: errorData,
      });
    } else if (error.request) {
      // Request made but no response
      return Promise.reject({
        message:
          "Không thể kết nối đến server. Vui lòng kiểm tra backend có đang chạy tại http://localhost:5000 không.",
        error:
          "Không thể kết nối đến server. Vui lòng kiểm tra backend có đang chạy tại http://localhost:5000 không.",
        status: 0,
      });
    } else {
      // Error setting up request
      return Promise.reject({
        message: error.message || "Có lỗi xảy ra khi gửi request",
        error: error.message || "Có lỗi xảy ra khi gửi request",
        status: 0,
      });
    }
  }
);

export default api;
