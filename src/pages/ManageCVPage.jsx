// Trang quản lý CV cho người tìm việc
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { Toast, useToast } from "../components/Toast";
import { cvService } from "../services/cvService";
import {
  FaUpload,
  FaTrash,
  FaDownload,
  FaEye,
  FaStar,
  FaFilePdf,
  FaFileWord,
  FaFileAlt,
  FaPlus,
  FaEllipsisV,
} from "react-icons/fa";

function ManageCVPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { toast, showToast, hideToast } = useToast();
  const fileInputRef = useRef(null);

  const [cvs, setCvs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cvToDelete, setCvToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRefs = useRef({});

  // Route protection
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (user?.role === "employer") {
      navigate("/employer");
      return;
    }
  }, [isAuthenticated, user, navigate]);

  // Load CVs from API
  useEffect(() => {
    const loadCVs = async () => {
      if (!isAuthenticated || !user || user?.role === "employer") return;

      try {
        setIsLoading(true);
        const response = await cvService.getCVs();
        const cvsData = response.data.data?.cvs || response.data.cvs || [];
        // Map _id to id and ensure type/fileType compatibility
        const mappedCVs = cvsData.map((cv) => ({
          ...cv,
          id: cv._id || cv.id,
          uploadDate: cv.createdAt || cv.uploadDate,
          type: cv.fileType || cv.type, // Use fileType from API, fallback to type
          fileType: cv.fileType || cv.type, // Ensure both fields exist
          size: cv.fileSize || cv.size || 0, // Map fileSize to size for compatibility
          fileSize: cv.fileSize || cv.size || 0, // Ensure both fields exist
        }));
        setCvs(mappedCVs);
      } catch (error) {
        console.error("Error loading CVs:", error);
        showToast("Không thể tải danh sách CV. Vui lòng thử lại sau.", "error");
        setCvs([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated && user && user?.role !== "employer") {
      loadCVs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openMenuId !== null) {
        const menuRef = menuRefs.current[openMenuId];
        if (menuRef && !menuRef.contains(event.target)) {
          setOpenMenuId(null);
        }
      }
    };

    if (openMenuId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuId]);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      showToast("Chỉ chấp nhận file PDF hoặc Word!", "warning");
      e.target.value = "";
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      showToast("Kích thước file không được vượt quá 10MB!", "warning");
      e.target.value = "";
      return;
    }

    try {
      setIsLoading(true);
      const response = await cvService.uploadCV(file, file.name);
      const cvData = response.data.data?.cv || response.data.cv;
      const newCV = {
        ...cvData,
        id: cvData._id || cvData.id,
        uploadDate: cvData.createdAt || new Date().toISOString(),
        type: cvData.fileType || cvData.type || file.type,
        fileType: cvData.fileType || cvData.type || file.type,
        size: cvData.fileSize || cvData.size || file.size || 0,
        fileSize: cvData.fileSize || cvData.size || file.size || 0,
      };
      setCvs((prev) => [newCV, ...prev]);
      showToast("Tải lên CV thành công!", "success");
    } catch (error) {
      console.error("Error uploading CV:", error);
      const errorMessage =
        error?.response?.data?.error ||
        error?.message ||
        "Không thể tải lên CV. Vui lòng thử lại sau.";
      showToast(errorMessage, "error");
    } finally {
      setIsLoading(false);
      e.target.value = ""; // Reset input
    }
  };

  const handleDeleteClick = (cv) => {
    setCvToDelete(cv);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!cvToDelete) return;

    try {
      setIsLoading(true);
      await cvService.deleteCV(cvToDelete.id);
      setCvs((prev) => prev.filter((cv) => cv.id !== cvToDelete.id));
      setIsDeleteModalOpen(false);
      setCvToDelete(null);
      showToast("Đã xóa CV thành công!", "success");
    } catch (error) {
      console.error("Error deleting CV:", error);
      const errorMessage =
        error?.response?.data?.error ||
        error?.message ||
        "Không thể xóa CV. Vui lòng thử lại sau.";
      showToast(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setCvToDelete(null);
  };

  const handleSetDefault = async (cvId) => {
    try {
      setIsLoading(true);
      await cvService.setDefaultCV(cvId);
      setCvs((prev) =>
        prev.map((cv) => ({
          ...cv,
          isDefault: cv.id === cvId,
        }))
      );
      setOpenMenuId(null); // Close menu
      showToast("Đã đặt CV mặc định!", "success");
    } catch (error) {
      console.error("Error setting default CV:", error);
      const errorMessage =
        error?.response?.data?.error ||
        error?.message ||
        "Không thể đặt CV mặc định. Vui lòng thử lại sau.";
      showToast(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (cv) => {
    try {
      showToast("Đang tải xuống CV...", "info");
      await cvService.downloadCV(cv.id);
      showToast("Tải xuống CV thành công!", "success");
    } catch (error) {
      console.error("Error downloading CV:", error);
      const errorMessage =
        error?.message || "Không thể tải xuống CV. Vui lòng thử lại sau.";
      showToast(errorMessage, "error");
    }
  };

  const handlePreview = async (cv) => {
    try {
      showToast("Đang tải CV...", "info");

      const cvFileType = cv.fileType || cv.type;

      // If HTML CV, fetch full CV data to get HTML
      if (cvFileType === "text/html") {
        // Try to get HTML from current cv object first
        if (cv.html) {
          const newWindow = window.open("", "_blank");
          if (newWindow) {
            newWindow.document.write(cv.html);
            newWindow.document.close();
            showToast("Đã mở CV trong tab mới", "success");
          } else {
            showToast(
              "Không thể mở tab mới. Vui lòng kiểm tra cài đặt trình duyệt.",
              "warning"
            );
          }
          return;
        }

        // If not in object, fetch from API
        try {
          const response = await cvService.getCV(cv.id);
          const cvData = response.data.data?.cv || response.data.cv;
          if (cvData && cvData.html) {
            const newWindow = window.open("", "_blank");
            if (newWindow) {
              newWindow.document.write(cvData.html);
              newWindow.document.close();
              showToast("Đã mở CV trong tab mới", "success");
            } else {
              showToast(
                "Không thể mở tab mới. Vui lòng kiểm tra cài đặt trình duyệt.",
                "warning"
              );
            }
            return;
          }
        } catch (apiError) {
          console.error("Error fetching CV from API:", apiError);
          showToast(
            "Không thể tải CV từ server. Vui lòng thử lại sau.",
            "error"
          );
          return;
        }
      }

      // For file-based CVs (PDF, Word), download and open
      const baseURL =
        import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const token = localStorage.getItem("token");

      if (!token) {
        showToast("Vui lòng đăng nhập lại để xem CV", "error");
        return;
      }

      const response = await fetch(`${baseURL}/cvs/${cv.id}/download`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to download CV");
      }

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      // Determine file type and open accordingly
      if (cvFileType === "application/pdf") {
        // For PDF, open in new tab
        window.open(blobUrl, "_blank");
        showToast("Đã mở CV trong tab mới", "success");
      } else {
        // For Word documents, create download link
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = cv.name || cv.fileName || "CV";
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast("Đã tải CV xuống. Vui lòng mở file để xem.", "success");
      }

      // Clean up blob URL after a delay
      setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
      }, 1000);
    } catch (error) {
      console.error("Error previewing CV:", error);
      const errorMessage =
        error?.message || "Không thể xem CV. Vui lòng thử lại sau.";
      showToast(errorMessage, "error");
    }
  };

  const getFileIcon = (fileType) => {
    // Handle null/undefined
    if (!fileType) {
      return <FaFileAlt className="w-6 h-6 text-gray-500" />;
    }

    // Convert to string if needed
    const typeStr = String(fileType).toLowerCase();

    if (typeStr === "application/pdf") {
      return <FaFilePdf className="w-6 h-6 text-red-500" />;
    } else if (
      typeStr.includes("word") ||
      typeStr.includes("msword") ||
      typeStr.includes("wordprocessingml")
    ) {
      return <FaFileWord className="w-6 h-6 text-blue-500" />;
    } else if (typeStr === "text/html") {
      return <FaFileAlt className="w-6 h-6 text-green-500" />;
    }
    return <FaFileAlt className="w-6 h-6 text-gray-500" />;
  };

  const formatFileSize = (bytes) => {
    // Handle null, undefined, NaN, or invalid values
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

  if (!isAuthenticated || user?.role === "employer") {
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 text-amber-600 hover:text-amber-700 font-medium flex items-center gap-2 cursor-pointer"
          >
            ← Quay lại
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <FaFilePdf className="w-8 h-8 text-amber-600" />
            Quản lý CV
          </h1>
          <p className="text-gray-600">
            Tải lên và quản lý CV của bạn để ứng tuyển
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Tải lên hoặc tạo CV mới
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-amber-300 rounded-xl p-8 text-center hover:bg-amber-50 transition-colors cursor-pointer"
            >
              <FaUpload className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <p className="text-gray-700 font-medium mb-2">Tải lên CV</p>
              <p className="text-sm text-gray-500">
                Hỗ trợ file PDF, Word (Tối đa 10MB)
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
            <div
              onClick={() => navigate("/create-cv")}
              className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center hover:bg-blue-50 transition-colors cursor-pointer"
            >
              <FaPlus className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <p className="text-gray-700 font-medium mb-2">Tạo CV mới</p>
              <p className="text-sm text-gray-500">Tạo CV trực tiếp trên web</p>
            </div>
          </div>
        </div>

        {/* CVs List */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Danh sách CV ({cvs.length})
          </h2>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Đang tải danh sách CV...</p>
            </div>
          ) : cvs.length === 0 ? (
            <div className="text-center py-12">
              <FaFileAlt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Bạn chưa có CV nào</p>
              <p className="text-sm text-gray-500">
                Tải lên CV đầu tiên của bạn để bắt đầu ứng tuyển
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cvs.map((cv) => (
                <div
                  key={cv.id}
                  className="border border-gray-200 rounded-lg p-4 sm:p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0 w-full sm:w-auto">
                      <div className="mt-1 flex-shrink-0">
                        {getFileIcon(cv.fileType || cv.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900 truncate text-sm sm:text-base">
                            {cv.name}
                          </h3>
                          {cv.isDefault && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium flex-shrink-0 w-fit">
                              Mặc định
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm text-gray-600">
                          <span>
                            {formatFileSize(cv.size || cv.fileSize || 0)}
                          </span>
                          <span className="hidden sm:inline">•</span>
                          <span>
                            {(cv.fileType || cv.type) === "text/html"
                              ? "Tạo từ web"
                              : "Tải lên"}
                            : {formatDate(cv.uploadDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:ml-4 w-full sm:w-auto justify-end sm:justify-start">
                      <button
                        onClick={() => handlePreview(cv)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        title="Xem CV"
                      >
                        <FaEye className="w-4 h-4 sm:w-4 sm:h-4" />
                      </button>
                      <button
                        onClick={() => handleDownload(cv)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors cursor-pointer"
                        title="Tải xuống"
                      >
                        <FaDownload className="w-4 h-4 sm:w-4 sm:h-4" />
                      </button>
                      <div
                        className="relative"
                        ref={(el) => {
                          if (el) {
                            menuRefs.current[cv.id] = el;
                          } else {
                            delete menuRefs.current[cv.id];
                          }
                        }}
                      >
                        <button
                          onClick={() =>
                            setOpenMenuId(openMenuId === cv.id ? null : cv.id)
                          }
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                          title="Tùy chọn"
                        >
                          <FaEllipsisV className="w-3.5 h-3.5 sm:w-3.5 sm:h-3.5" />
                        </button>
                        {openMenuId === cv.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10 animate-scale-in">
                            <button
                              onClick={() => {
                                handleSetDefault(cv.id);
                                setOpenMenuId(null); // Đóng menu ngay lập tức
                              }}
                              disabled={cv.isDefault}
                              className={`w-full px-4 py-3 text-left text-sm rounded-t-lg transition-colors cursor-pointer flex items-center gap-2 ${
                                cv.isDefault
                                  ? "text-gray-400 bg-gray-50 cursor-not-allowed"
                                  : "text-gray-700 hover:bg-gray-50"
                              }`}
                            >
                              <FaStar
                                className={`w-4 h-4 ${
                                  cv.isDefault
                                    ? "text-gray-400"
                                    : "text-yellow-500"
                                }`}
                              />
                              {cv.isDefault
                                ? "Đã đặt mặc định"
                                : "Đặt làm mặc định"}
                            </button>
                            <div className="border-t border-gray-200"></div>
                            <button
                              onClick={() => {
                                handleDeleteClick(cv);
                                setOpenMenuId(null);
                              }}
                              className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 rounded-b-lg transition-colors cursor-pointer flex items-center gap-2"
                            >
                              <FaTrash className="w-4 h-4" />
                              Xóa CV
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && cvToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl animate-scale-in">
            <div className="px-6 py-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaTrash className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Xác nhận xóa
                  </h3>
                  <p className="text-sm text-gray-600">
                    Hành động này không thể hoàn tác
                  </p>
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                Bạn có chắc chắn muốn xóa CV{" "}
                <strong>"{cvToDelete.name}"</strong> không?
                {cvToDelete.isDefault && cvs.length > 1 && (
                  <span className="block mt-2 text-sm text-gray-600">
                    CV khác sẽ được đặt làm mặc định.
                  </span>
                )}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleCancelDelete}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-100 transition-all font-medium cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-all font-medium cursor-pointer"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageCVPage;
