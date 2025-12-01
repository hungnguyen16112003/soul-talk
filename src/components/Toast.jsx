// Component Toast để hiển thị thông báo
import { useEffect, useState, useCallback } from "react";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";

export const Toast = ({
  message,
  type = "success",
  isVisible,
  onClose,
  duration = 5000,
}) => {
  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  // Auto close timer
  useEffect(() => {
    if (isVisible && message) {
      // Error messages hiển thị lâu hơn
      const toastDuration = type === "error" ? 6000 : duration;
      const timer = setTimeout(() => {
        handleClose();
      }, toastDuration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, message, duration, type, handleClose]);

  // Không render nếu không có message hoặc không visible
  if (!message || !isVisible) return null;

  const icons = {
    success: <FaCheckCircle className="text-green-500" />,
    error: <FaExclamationCircle className="text-red-500" />,
    warning: <FaExclamationTriangle className="text-yellow-500" />,
    info: <FaInfoCircle className="text-blue-500" />,
  };

  const bgColors = {
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200",
    warning: "bg-yellow-50 border-yellow-200",
    info: "bg-blue-50 border-blue-200",
  };

  return (
    <div
      className={`fixed top-27 right-4 min-w-[300px] max-w-md p-4 rounded-lg shadow-2xl border ${bgColors[type]} transform transition-all duration-300 translate-x-0 opacity-100`}
      role="alert"
      aria-live="assertive"
      style={{
        zIndex: 100,
        pointerEvents: "auto",
        position: "fixed",
      }}
    >
      <div className="flex items-start gap-3">
        <div className="text-xl">{icons[type]}</div>
        <div className="flex-1">
          <p
            className={`font-medium ${
              type === "success"
                ? "text-green-800"
                : type === "error"
                ? "text-red-800"
                : type === "warning"
                ? "text-yellow-800"
                : "text-blue-800"
            }`}
          >
            {message}
          </p>
        </div>
        <button
          onClick={handleClose}
          className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

// Hook để sử dụng Toast dễ dàng hơn
export const useToast = () => {
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success",
  });

  const showToast = (message, type = "success") => {
    // Đảm bảo message không rỗng
    if (!message) return;

    setToast({
      isVisible: true,
      message: String(message), // Đảm bảo message là string
      type,
    });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };

  return {
    toast,
    showToast,
    hideToast,
  };
};

export default Toast;
