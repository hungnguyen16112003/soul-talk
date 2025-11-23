// Component Toast để hiển thị thông báo
import { useEffect, useState } from "react";
import { FaCheckCircle, FaExclamationCircle, FaExclamationTriangle, FaInfoCircle, FaTimes } from "react-icons/fa";

export const Toast = ({ message, type = "success", isVisible, onClose, duration = 3000 }) => {
  const [shouldRender, setShouldRender] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration]);

  const handleClose = () => {
    setShouldRender(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };

  if (!shouldRender && !isVisible) return null;

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
      className={`fixed top-4 right-4 z-50 min-w-[300px] max-w-md p-4 rounded-lg shadow-lg border ${bgColors[type]} transform transition-all duration-300 ${
        isVisible && shouldRender ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="text-xl">{icons[type]}</div>
        <div className="flex-1">
          <p className={`font-medium ${
            type === "success" ? "text-green-800" :
            type === "error" ? "text-red-800" :
            type === "warning" ? "text-yellow-800" :
            "text-blue-800"
          }`}>
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
    setToast({
      isVisible: true,
      message,
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

