// Trang quản lý CV cho người tìm việc
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { Toast, useToast } from "../components/Toast";
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
import CreateCVModal from "../components/CreateCVModal";

function ManageCVPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { toast, showToast, hideToast } = useToast();
  const fileInputRef = useRef(null);

  const [cvs, setCvs] = useState([]);
  const [cvToDelete, setCvToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateCVModalOpen, setIsCreateCVModalOpen] = useState(false);
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

  // Load CVs from localStorage
  useEffect(() => {
    const savedCVs = localStorage.getItem(`cvs_${user?.id}`);
    if (savedCVs) {
      const parsedCVs = JSON.parse(savedCVs);
      // Sort by uploadDate or id (newest first)
      const sortedCVs = parsedCVs.sort((a, b) => {
        const dateA = new Date(a.uploadDate || a.id);
        const dateB = new Date(b.uploadDate || b.id);
        return dateB - dateA; // Newest first
      });
      setCvs(sortedCVs);
    }
  }, [user?.id]);

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

  // Save CVs to localStorage
  const saveCVsToStorage = (newCVs) => {
    // Sort by uploadDate or id (newest first)
    const sortedCVs = newCVs.sort((a, b) => {
      const dateA = new Date(a.uploadDate || a.id);
      const dateB = new Date(b.uploadDate || b.id);
      return dateB - dateA; // Newest first
    });
    localStorage.setItem(`cvs_${user?.id}`, JSON.stringify(sortedCVs));
    setCvs(sortedCVs);
  };

  const handleFileSelect = (e) => {
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
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      showToast("Kích thước file không được vượt quá 10MB!", "warning");
      return;
    }

    // Read file as base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const newCV = {
        id: Date.now(),
        name: file.name,
        size: file.size,
        type: file.type,
        data: reader.result,
        uploadDate: new Date().toISOString(),
        isDefault: cvs.length === 0, // First CV is default
      };

      const updatedCVs = [...cvs, newCV];
      // Sort by uploadDate or id (newest first)
      const sortedCVs = updatedCVs.sort((a, b) => {
        const dateA = new Date(a.uploadDate || a.id);
        const dateB = new Date(b.uploadDate || b.id);
        return dateB - dateA; // Newest first
      });
      saveCVsToStorage(sortedCVs);
      showToast("Tải lên CV thành công!", "success");
    };
    reader.onerror = () => {
      showToast("Lỗi khi đọc file!", "error");
    };
    reader.readAsDataURL(file);
    e.target.value = ""; // Reset input
  };

  const handleDeleteClick = (cv) => {
    setCvToDelete(cv);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (cvToDelete) {
      const updatedCVs = cvs.filter((cv) => cv.id !== cvToDelete.id);
      // If deleted CV was default, set first CV as default
      if (cvToDelete.isDefault && updatedCVs.length > 0) {
        updatedCVs[0].isDefault = true;
      }
      saveCVsToStorage(updatedCVs);
      setIsDeleteModalOpen(false);
      setCvToDelete(null);
      showToast("Đã xóa CV thành công!", "success");
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setCvToDelete(null);
  };

  const handleSetDefault = (cvId) => {
    const updatedCVs = cvs.map((cv) => ({
      ...cv,
      isDefault: cv.id === cvId,
    }));
    // Sort by uploadDate or id (newest first)
    const sortedCVs = updatedCVs.sort((a, b) => {
      const dateA = new Date(a.uploadDate || a.id);
      const dateB = new Date(b.uploadDate || b.id);
      return dateB - dateA; // Newest first
    });
    saveCVsToStorage(sortedCVs);
    setOpenMenuId(null); // Close menu
    showToast("Đã đặt CV mặc định!", "success");
  };

  const handleDownload = (cv) => {
    const link = document.createElement("a");
    link.href = cv.data;
    link.download = cv.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Đang tải xuống CV...", "info");
  };

  const handlePreview = (cv) => {
    // Nếu CV là HTML (được tạo từ form), mở HTML trực tiếp
    if (cv.type === "text/html" && cv.html) {
      const newWindow = window.open("", "_blank");
      if (newWindow) {
        newWindow.document.write(cv.html);
        newWindow.document.close();
      }
      return;
    }

    // Chuyển đổi data URL sang Blob URL để mở trong tab mới
    try {
      // Lấy base64 data từ data URL
      const base64Data = cv.data.split(',')[1];
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: cv.type });
      const blobUrl = URL.createObjectURL(blob);
      
      // Mở file trong tab mới
      const link = document.createElement("a");
      link.href = blobUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Giải phóng blob URL sau một khoảng thời gian
      setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
      }, 100);
    } catch (error) {
      console.error("Lỗi khi mở file:", error);
      showToast("Không thể mở file. Vui lòng thử tải xuống.", "error");
    }
  };

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
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleCreateCV = (cvData, fileName) => {
    const newCV = {
      id: Date.now(),
      name: fileName,
      size: cvData.size || 0,
      type: cvData.type || "text/html",
      data: cvData.data,
      uploadDate: new Date().toISOString(),
      isDefault: cvs.length === 0, // First CV is default
      html: cvData.html, // Store HTML for preview
    };

    const updatedCVs = [...cvs, newCV];
    // Sort by uploadDate or id (newest first)
    const sortedCVs = updatedCVs.sort((a, b) => {
      const dateA = new Date(a.uploadDate || a.id);
      const dateB = new Date(b.uploadDate || b.id);
      return dateB - dateA; // Newest first
    });
    saveCVsToStorage(sortedCVs);
    showToast("Tạo CV thành công!", "success");
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
              <p className="text-gray-700 font-medium mb-2">
                Tải lên CV
              </p>
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
              onClick={() => setIsCreateCVModalOpen(true)}
              className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center hover:bg-blue-50 transition-colors cursor-pointer"
            >
              <FaPlus className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <p className="text-gray-700 font-medium mb-2">
                Tạo CV mới
              </p>
              <p className="text-sm text-gray-500">
                Tạo CV trực tiếp trên web
              </p>
            </div>
          </div>
        </div>

        {/* CVs List */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Danh sách CV ({cvs.length})
          </h2>

          {cvs.length === 0 ? (
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
                      <div className="mt-1 flex-shrink-0">{getFileIcon(cv.type)}</div>
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
                          <span>{formatFileSize(cv.size)}</span>
                          <span className="hidden sm:inline">•</span>
                          <span>Tải lên: {formatDate(cv.uploadDate)}</span>
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
                          onClick={() => setOpenMenuId(openMenuId === cv.id ? null : cv.id)}
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
                              <FaStar className={`w-4 h-4 ${cv.isDefault ? "text-gray-400" : "text-yellow-500"}`} />
                              {cv.isDefault ? "Đã đặt mặc định" : "Đặt làm mặc định"}
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

      {/* Create CV Modal */}
      <CreateCVModal
        isOpen={isCreateCVModalOpen}
        onClose={() => setIsCreateCVModalOpen(false)}
        onSave={handleCreateCV}
      />

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
                  <h3 className="text-xl font-bold text-gray-900">Xác nhận xóa</h3>
                  <p className="text-sm text-gray-600">Hành động này không thể hoàn tác</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                Bạn có chắc chắn muốn xóa CV <strong>"{cvToDelete.name}"</strong> không?
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

