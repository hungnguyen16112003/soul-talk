// Modal chọn CV để ứng tuyển
import { useState, useEffect } from "react";
import {
  FaTimes,
  FaFilePdf,
  FaFileWord,
  FaFileAlt,
  FaCheck,
  FaEnvelope,
  FaPhone,
  FaInfoCircle,
} from "react-icons/fa";
import useAuthStore from "../store/authStore";
import { cvService } from "../services/cvService";
import { Toast, useToast } from "./Toast";

function SelectCVModal({ isOpen, onClose, onSelect, jobId }) {
  const user = useAuthStore((state) => state.user);
  const { toast, showToast, hideToast } = useToast();
  const [cvs, setCvs] = useState([]);
  const [selectedCVId, setSelectedCVId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load CVs from API
  useEffect(() => {
    const loadCVs = async () => {
      if (!isOpen || !user?.id) return;

      try {
        setIsLoading(true);
        const response = await cvService.getCVs();
        const cvsData = response.data.data?.cvs || response.data.cvs || [];
        // Map _id to id for compatibility
        const mappedCVs = cvsData.map((cv) => ({
          ...cv,
          id: cv._id || cv.id,
          uploadDate: cv.createdAt || cv.uploadDate,
          type: cv.fileType || cv.type,
          fileType: cv.fileType || cv.type,
          size: cv.fileSize || cv.size || 0,
          fileSize: cv.fileSize || cv.size || 0,
        }));
        setCvs(mappedCVs);

        // Set default CV as selected if exists
        const defaultCV = mappedCVs.find((cv) => cv.isDefault);
        if (defaultCV) {
          setSelectedCVId(defaultCV.id);
        } else if (mappedCVs.length > 0) {
          setSelectedCVId(mappedCVs[0].id);
        }
      } catch (error) {
        console.error("Error loading CVs:", error);
        showToast("Không thể tải danh sách CV. Vui lòng thử lại sau.", "error");
        setCvs([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      loadCVs();
    }
  }, [isOpen, user?.id]);

  const getFileIcon = (fileType) => {
    if (fileType === "application/pdf") {
      return <FaFilePdf className="w-6 h-6 text-red-500" />;
    } else if (
      fileType.includes("word") ||
      fileType.includes("msword") ||
      fileType.includes("wordprocessingml")
    ) {
      return <FaFileWord className="w-6 h-6 text-blue-500" />;
    } else if (fileType === "text/html") {
      return <FaFileAlt className="w-6 h-6 text-green-500" />;
    }
    return <FaFileAlt className="w-6 h-6 text-gray-500" />;
  };

  const formatFileSize = (bytes) => {
    if (!bytes || isNaN(bytes) || bytes === 0) {
      return "0 B";
    }
    const size = Number(bytes);
    if (isNaN(size) || size < 0) {
      return "0 B";
    }
    if (size < 1024) return size + " B";
    if (size < 1024 * 1024) return (size / 1024).toFixed(2) + " KB";
    return (size / (1024 * 1024)).toFixed(2) + " MB";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleConfirm = () => {
    if (selectedCVId) {
      const selectedCV = cvs.find((cv) => cv.id === selectedCVId);
      if (selectedCV) {
        onSelect(selectedCV, jobId);
        onClose();
      }
    }
  };

  const handleClose = () => {
    setSelectedCVId(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-xl max-w-2xl w-full shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-900">
            Chọn CV để ứng tuyển
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Đang tải danh sách CV...</p>
            </div>
          ) : cvs.length === 0 ? (
            <div className="text-center py-12">
              <FaFileAlt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Bạn chưa có CV nào</p>
              <p className="text-sm text-gray-500 mb-6">
                Vui lòng tải lên hoặc tạo CV trước khi ứng tuyển
              </p>
              <button
                onClick={handleClose}
                className="px-6 py-2 text-white rounded-lg hover:shadow-lg transition-all font-medium cursor-pointer animate-gradient-slide"
              >
                Đóng
              </button>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-4">
                Chọn CV bạn muốn sử dụng để ứng tuyển cho công việc này:
              </p>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {cvs.map((cv) => (
                  <div
                    key={cv.id}
                    onClick={() => setSelectedCVId(cv.id)}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedCVId === cv.id
                        ? "border-amber-500 bg-amber-50"
                        : "border-gray-200 hover:border-amber-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        {getFileIcon(cv.fileType || cv.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {cv.name}
                          </h3>
                          {cv.isDefault && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium flex-shrink-0">
                              Mặc định
                            </span>
                          )}
                          {selectedCVId === cv.id && (
                            <FaCheck className="w-5 h-5 text-amber-600 flex-shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>
                            {formatFileSize(cv.size || cv.fileSize || 0)}
                          </span>
                          <span>•</span>
                          <span>
                            {(cv.fileType || cv.type) === "text/html"
                              ? "Tạo từ web"
                              : "Tải lên"}
                            : {formatDate(cv.uploadDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {cvs.length > 0 && (
          <div className="sticky bottom-0 bg-white border-t border-gray-200">
            {/* Note */}
            <div className="px-6 py-3 bg-blue-50 border-b border-blue-100">
              <div className="flex items-start gap-3">
                <FaInfoCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-blue-800 font-medium mb-1">
                    💡 Mẹo nhận phản hồi nhanh hơn:
                  </p>
                  <p className="text-xs text-blue-700 leading-relaxed">
                    Bạn có thể gửi CV qua email hoặc liên hệ trực tiếp qua số
                    điện thoại của nhà tuyển dụng để nhận phản hồi nhanh hơn.
                    Thông tin liên hệ có trong phần chi tiết công việc.
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="px-6 py-4 flex gap-3">
              <button
                onClick={handleClose}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-100 transition-all font-medium cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirm}
                disabled={!selectedCVId}
                className={`flex-1 py-3 rounded-lg transition-all font-medium cursor-pointer ${
                  selectedCVId
                    ? "text-white hover:shadow-lg animate-gradient-slide"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Xác nhận ứng tuyển
              </button>
            </div>
          </div>
        )}
      </div>
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />
    </div>
  );
}

export default SelectCVModal;
