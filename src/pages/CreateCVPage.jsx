// Trang tạo CV mới
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaPlus,
  FaTrash,
  FaCamera,
  FaTimes,
  FaLightbulb,
  FaClipboardList,
  FaBullseye,
  FaLaptopCode,
  FaHandshake,
  FaGraduationCap,
  FaBriefcase,
  FaTrophy,
  FaGlobe,
  FaPalette,
  FaFileAlt,
} from "react-icons/fa";
import useAuthStore from "../store/authStore";
import { cvService } from "../services/cvService";
import { Toast, useToast } from "../components/Toast";

function CreateCVPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { toast, showToast, hideToast } = useToast();
  const avatarInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    objective: "",
    avatar: "", // Ảnh đại diện (base64)
    softSkills: [""], // Kỹ năng mềm
    technicalSkills: [""], // Kỹ năng chuyên môn
    education: [
      {
        school: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    experience: [
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    certifications: [""],
    languages: [""],
    cvColor: "#000000", // Màu mặc định cho CV
  });

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

  // Danh sách màu preset (màu đen đặt đầu tiên vì là mặc định)
  const colorPresets = [
    { name: "Đen", value: "#000000" },
    { name: "Tím", value: "#9333ea" },
    { name: "Xanh dương", value: "#3b82f6" },
    { name: "Xanh lá", value: "#10b981" },
    { name: "Đỏ", value: "#ef4444" },
    { name: "Cam", value: "#f97316" },
    { name: "Hồng", value: "#ec4899" },
    { name: "Indigo", value: "#6366f1" },
    { name: "Teal", value: "#14b8a6" },
    { name: "Vàng", value: "#eab308" },
    { name: "Nâu", value: "#a16207" },
    { name: "Xám", value: "#6b7280" },
  ];

  // Hàm điền dữ liệu mẫu
  const fillSampleData = () => {
    setFormData({
      fullName: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      phone: "0901234567",
      address: "123 Đường ABC, Quận 1, Miền Nam",
      dateOfBirth: "2003-11-16",
      gender: "Nam",
      objective:
        "Tìm kiếm cơ hội phát triển sự nghiệp trong lĩnh vực công nghệ thông tin, đặc biệt là phát triển web và ứng dụng di động. Mong muốn được làm việc trong môi trường chuyên nghiệp, năng động và có cơ hội học hỏi, phát triển kỹ năng.",
      softSkills: [
        "Giao tiếp",
        "Làm việc nhóm",
        "Quản lý thời gian",
        "Giải quyết vấn đề",
      ],
      technicalSkills: [
        "JavaScript",
        "React",
        "Node.js",
        "HTML/CSS",
        "TypeScript",
        "Git",
      ],
      education: [
        {
          school: "Đại học Bách Khoa Miền Nam",
          degree: "Cử nhân",
          major: "Khoa học Máy tính",
          startDate: "2021-09",
          endDate: "2025-06",
          description:
            "Tốt nghiệp loại Khá (GPA: 3.5/4.0). Tham gia các dự án nghiên cứu về trí tuệ nhân tạo và phát triển ứng dụng web.",
        },
      ],
      experience: [
        {
          company: "Công ty Công nghệ XYZ",
          position: "Frontend Developer",
          startDate: "2023-03",
          endDate: "2024-12",
          description:
            "- Phát triển và bảo trì ứng dụng web sử dụng React và TypeScript\n- Tối ưu hóa hiệu suất và trải nghiệm người dùng\n- Hợp tác với team backend để tích hợp API\n- Tham gia code review và training cho junior developers",
        },
        {
          company: "Công ty Phần mềm ABC",
          position: "Junior Web Developer",
          startDate: "2022-07",
          endDate: "2023-02",
          description:
            "- Phát triển website cho khách hàng sử dụng HTML, CSS, JavaScript\n- Tạo responsive design cho mobile và desktop\n- Fix bugs và maintain codebase\n- Học hỏi và áp dụng best practices",
        },
      ],
      certifications: [
        "TOEIC 850 điểm",
        "Chứng chỉ React Developer",
        "AWS Certified Cloud Practitioner",
      ],
      languages: [
        "Tiếng Việt (Bản ngữ)",
        "Tiếng Anh (Thành thạo)",
        "Tiếng Nhật (Cơ bản)",
      ],
      cvColor: "#000000", // Màu mặc định
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
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

    // Read file as base64
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        avatar: reader.result,
      }));
    };
    reader.onerror = () => {
      showToast("Lỗi khi đọc file!", "error");
    };
    reader.readAsDataURL(file);
    e.target.value = ""; // Reset input
  };

  const handleRemoveAvatar = () => {
    setFormData((prev) => ({
      ...prev,
      avatar: "",
    }));
  };

  const handleArrayChange = (index, value, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleAddItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [
        ...prev[field],
        field === "education"
          ? {
              school: "",
              degree: "",
              major: "",
              startDate: "",
              endDate: "",
              description: "",
            }
          : field === "experience"
          ? {
              company: "",
              position: "",
              startDate: "",
              endDate: "",
              description: "",
            }
          : "",
      ],
    }));
  };

  const handleRemoveItem = (index, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleComplexChange = (index, field, subField, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) =>
        i === index ? { ...item, [subField]: value } : item
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.fullName || !formData.email) {
      showToast(
        "Vui lòng điền đầy đủ thông tin bắt buộc (Họ tên, Email)",
        "warning"
      );
      return;
    }

    try {
      setIsLoading(true);

      // Tạo HTML CV
      const html = generateCVHTML(formData);

      // Tạo Blob từ HTML và chuyển đổi sang base64
      const blob = new Blob([html], { type: "text/html" });
      const reader = new FileReader();

      reader.onloadend = async () => {
        try {
          // Gọi API để tạo CV
          const response = await cvService.createCV({
            name: `${formData.fullName || "CV"}_${Date.now()}.html`,
            html: html,
            data: reader.result,
          });

          showToast("Tạo CV thành công!", "success");

          // Navigate về trang quản lý CV sau 1 giây
          setTimeout(() => {
            navigate("/manage-cv");
          }, 1000);
        } catch (error) {
          console.error("Error creating CV:", error);
          const errorMessage =
            error?.response?.data?.error ||
            error?.message ||
            "Không thể tạo CV. Vui lòng thử lại sau.";
          showToast(errorMessage, "error");
        } finally {
          setIsLoading(false);
        }
      };

      reader.onerror = () => {
        showToast("Lỗi khi đọc file!", "error");
        setIsLoading(false);
      };

      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      showToast("Có lỗi xảy ra. Vui lòng thử lại sau.", "error");
      setIsLoading(false);
    }
  };

  // Set mặc định từ user khi component mount
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || user.name || "",
        email: prev.email || user.email || "",
        avatar: prev.avatar || user.avatar || "",
      }));
    }
  }, [user]);

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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/manage-cv")}
            className="mb-4 text-amber-600 hover:text-amber-700 font-medium flex items-center gap-2 cursor-pointer"
          >
            <FaArrowLeft className="w-4 h-4" />
            Quay lại
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tạo CV mới</h1>
          <p className="text-gray-600">Điền thông tin để tạo CV của bạn</p>
        </div>

        {/* Form Content */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <div className="space-y-6">
            {/* Quick Action Button */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-800 font-medium mb-1 flex items-center gap-2">
                  <FaLightbulb className="w-4 h-4 text-yellow-500" />
                  Muốn test nhanh?
                </p>
                <p className="text-xs text-blue-600">
                  Nhấn nút bên dưới để điền sẵn dữ liệu mẫu vào form
                </p>
              </div>
              <button
                type="button"
                onClick={fillSampleData}
                className="px-4 py-2 text-white rounded-lg hover:shadow-lg transition-all cursor-pointer font-medium text-sm whitespace-nowrap animate-gradient-slide flex items-center gap-2"
              >
                <FaFileAlt className="w-4 h-4" />
                Điền dữ liệu mẫu
              </button>
            </div>

            {/* Thông tin cá nhân */}
            <div className="bg-amber-50 rounded-lg p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaClipboardList className="w-5 h-5 text-blue-600" />
                Thông tin cá nhân
              </h3>

              <div className="flex flex-col md:flex-row gap-6 mb-4">
                {/* Ảnh đại diện - Bên trái */}
                <div className="flex-shrink-0">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ảnh đại diện
                  </label>
                  <div className="flex flex-col items-center md:items-start gap-3">
                    <div className="relative">
                      {formData.avatar ? (
                        <div className="relative group">
                          <img
                            src={formData.avatar}
                            alt="Avatar"
                            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                          />
                          <button
                            type="button"
                            onClick={handleRemoveAvatar}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors cursor-pointer opacity-0 group-hover:opacity-100 shadow-lg"
                          >
                            <FaTimes className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <div className="w-32 h-32 rounded-full bg-gray-200 border-4 border-white shadow-lg flex items-center justify-center">
                          <FaCamera className="w-10 h-10 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => avatarInputRef.current?.click()}
                      className="px-4 py-2 text-white rounded-lg hover:shadow-lg transition-all cursor-pointer font-medium text-sm flex items-center gap-2 animate-gradient-slide"
                    >
                      <FaCamera className="w-4 h-4" />
                      {formData.avatar ? "Thay đổi ảnh" : "Chọn ảnh"}
                    </button>
                    <p className="text-xs text-gray-600 text-center md:text-left">
                      JPG, PNG (Max 5MB)
                    </p>
                    <input
                      ref={avatarInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Thông tin cá nhân - Bên phải */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Địa chỉ
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ngày sinh
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Giới tính
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="">Chọn giới tính</option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                      <option value="Khác">Khác</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Mục tiêu nghề nghiệp */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaBullseye className="w-5 h-5 text-red-500" />
                Mục tiêu nghề nghiệp
              </h3>
              <textarea
                name="objective"
                value={formData.objective}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Viết mục tiêu nghề nghiệp của bạn..."
              />
            </div>

            {/* Kỹ năng chuyên môn */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <FaLaptopCode className="w-5 h-5 text-blue-600" />
                  Kỹ năng chuyên môn
                </h3>
                <button
                  type="button"
                  onClick={() => handleAddItem("technicalSkills")}
                  className="text-amber-600 hover:text-amber-700 flex items-center gap-1 text-sm font-medium cursor-pointer"
                >
                  <FaPlus className="w-4 h-4" />
                  Thêm kỹ năng chuyên môn
                </button>
              </div>
              <div className="space-y-2">
                {formData.technicalSkills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) =>
                        handleArrayChange(
                          index,
                          e.target.value,
                          "technicalSkills"
                        )
                      }
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Ví dụ: JavaScript, React, Node.js, Python"
                    />
                    {formData.technicalSkills.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveItem(index, "technicalSkills")
                        }
                        className="text-red-600 hover:text-red-700 p-2 cursor-pointer"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Kỹ năng mềm */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <FaHandshake className="w-5 h-5 text-green-600" />
                  Kỹ năng mềm
                </h3>
                <button
                  type="button"
                  onClick={() => handleAddItem("softSkills")}
                  className="text-amber-600 hover:text-amber-700 flex items-center gap-1 text-sm font-medium cursor-pointer"
                >
                  <FaPlus className="w-4 h-4" />
                  Thêm kỹ năng mềm
                </button>
              </div>
              <div className="space-y-2">
                {formData.softSkills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) =>
                        handleArrayChange(index, e.target.value, "softSkills")
                      }
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Ví dụ: Giao tiếp, Làm việc nhóm, Quản lý thời gian"
                    />
                    {formData.softSkills.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(index, "softSkills")}
                        className="text-red-600 hover:text-red-700 p-2 cursor-pointer"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Học vấn */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <FaGraduationCap className="w-5 h-5 text-blue-600" />
                  Học vấn
                </h3>
                <button
                  type="button"
                  onClick={() => handleAddItem("education")}
                  className="text-amber-600 hover:text-amber-700 flex items-center gap-1 text-sm font-medium cursor-pointer"
                >
                  <FaPlus className="w-4 h-4" />
                  Thêm học vấn
                </button>
              </div>
              <div className="space-y-4">
                {formData.education.map((edu, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-gray-900">
                        Học vấn #{index + 1}
                      </h4>
                      {formData.education.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(index, "education")}
                          className="text-red-600 hover:text-red-700 cursor-pointer"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Trường học
                        </label>
                        <input
                          type="text"
                          value={edu.school}
                          onChange={(e) =>
                            handleComplexChange(
                              index,
                              "education",
                              "school",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Bằng cấp
                        </label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) =>
                            handleComplexChange(
                              index,
                              "education",
                              "degree",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Chuyên ngành
                        </label>
                        <input
                          type="text"
                          value={edu.major}
                          onChange={(e) =>
                            handleComplexChange(
                              index,
                              "education",
                              "major",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Từ
                          </label>
                          <input
                            type="month"
                            value={edu.startDate}
                            onChange={(e) =>
                              handleComplexChange(
                                index,
                                "education",
                                "startDate",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Đến
                          </label>
                          <input
                            type="month"
                            value={edu.endDate}
                            onChange={(e) =>
                              handleComplexChange(
                                index,
                                "education",
                                "endDate",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Mô tả
                        </label>
                        <textarea
                          value={edu.description}
                          onChange={(e) =>
                            handleComplexChange(
                              index,
                              "education",
                              "description",
                              e.target.value
                            )
                          }
                          rows={2}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Kinh nghiệm */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <FaBriefcase className="w-5 h-5 text-gray-700" />
                  Kinh nghiệm làm việc
                </h3>
                <button
                  type="button"
                  onClick={() => handleAddItem("experience")}
                  className="text-amber-600 hover:text-amber-700 flex items-center gap-1 text-sm font-medium cursor-pointer"
                >
                  <FaPlus className="w-4 h-4" />
                  Thêm kinh nghiệm
                </button>
              </div>
              <div className="space-y-4">
                {formData.experience.map((exp, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-gray-900">
                        Kinh nghiệm #{index + 1}
                      </h4>
                      {formData.experience.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(index, "experience")}
                          className="text-red-600 hover:text-red-700 cursor-pointer"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Công ty
                        </label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) =>
                            handleComplexChange(
                              index,
                              "experience",
                              "company",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Vị trí
                        </label>
                        <input
                          type="text"
                          value={exp.position}
                          onChange={(e) =>
                            handleComplexChange(
                              index,
                              "experience",
                              "position",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Từ
                          </label>
                          <input
                            type="month"
                            value={exp.startDate}
                            onChange={(e) =>
                              handleComplexChange(
                                index,
                                "experience",
                                "startDate",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Đến
                          </label>
                          <input
                            type="month"
                            value={exp.endDate}
                            onChange={(e) =>
                              handleComplexChange(
                                index,
                                "experience",
                                "endDate",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Mô tả công việc
                        </label>
                        <textarea
                          value={exp.description}
                          onChange={(e) =>
                            handleComplexChange(
                              index,
                              "experience",
                              "description",
                              e.target.value
                            )
                          }
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="Mô tả các công việc bạn đã làm..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chứng chỉ */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <FaTrophy className="w-5 h-5 text-yellow-500" />
                  Chứng chỉ
                </h3>
                <button
                  type="button"
                  onClick={() => handleAddItem("certifications")}
                  className="text-amber-600 hover:text-amber-700 flex items-center gap-1 text-sm font-medium cursor-pointer"
                >
                  <FaPlus className="w-4 h-4" />
                  Thêm chứng chỉ
                </button>
              </div>
              <div className="space-y-2">
                {formData.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={cert}
                      onChange={(e) =>
                        handleArrayChange(
                          index,
                          e.target.value,
                          "certifications"
                        )
                      }
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Ví dụ: TOEIC 850, IELTS 7.0"
                    />
                    {formData.certifications.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveItem(index, "certifications")
                        }
                        className="text-red-600 hover:text-red-700 p-2 cursor-pointer"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Ngôn ngữ */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <FaGlobe className="w-5 h-5 text-blue-600" />
                  Ngôn ngữ
                </h3>
                <button
                  type="button"
                  onClick={() => handleAddItem("languages")}
                  className="text-amber-600 hover:text-amber-700 flex items-center gap-1 text-sm font-medium cursor-pointer"
                >
                  <FaPlus className="w-4 h-4" />
                  Thêm ngôn ngữ
                </button>
              </div>
              <div className="space-y-2">
                {formData.languages.map((lang, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={lang}
                      onChange={(e) =>
                        handleArrayChange(index, e.target.value, "languages")
                      }
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Ví dụ: Tiếng Anh (Trung bình), Tiếng Nhật (Cơ bản)"
                    />
                    {formData.languages.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(index, "languages")}
                        className="text-red-600 hover:text-red-700 p-2 cursor-pointer"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Chọn màu CV */}
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaPalette className="w-5 h-5 text-purple-600" />
                Chọn màu cho CV
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Màu chủ đạo của CV
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={formData.cvColor}
                      onChange={(e) =>
                        handleChange({
                          target: { name: "cvColor", value: e.target.value },
                        })
                      }
                      className="w-16 h-16 rounded-lg border-2 border-gray-300 cursor-pointer"
                    />
                    <div className="flex-1">
                      <input
                        type="text"
                        name="cvColor"
                        value={formData.cvColor}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent font-mono text-sm"
                        placeholder="#000000"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Màu có sẵn
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {colorPresets.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() =>
                          handleChange({
                            target: { name: "cvColor", value: color.value },
                          })
                        }
                        className={`relative w-10 h-10 rounded-full border-2 transition-all cursor-pointer ${
                          formData.cvColor === color.value
                            ? "border-gray-900 scale-110 shadow-lg ring-2 ring-offset-2 ring-amber-500"
                            : "border-gray-300 hover:border-gray-400 hover:scale-105"
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      >
                        {formData.cvColor === color.value && (
                          <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                            ✓
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-xs text-gray-600 flex items-center gap-2">
                    <FaLightbulb className="w-3 h-3 text-yellow-500" />
                    Màu này sẽ được áp dụng cho tiêu đề, đường viền và các phần
                    nhấn mạnh trong CV
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/manage-cv")}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer font-medium"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-2 text-white rounded-lg hover:shadow-lg transition-all cursor-pointer font-medium ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "animate-gradient-slide"
              }`}
            >
              {isLoading ? "Đang tạo CV..." : "Tạo CV"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Hàm tạo HTML cho CV
function generateCVHTML(data) {
  return `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CV - ${data.fullName || "CV"}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      padding: 40px;
      background: #fff;
    }
    .cv-container {
      max-width: 210mm;
      margin: 0 auto;
      background: white;
      padding: 40px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    .header {
      position: relative;
      border-bottom: 3px solid ${data.cvColor || "#000000"};
      padding-bottom: 20px;
      margin-bottom: 30px;
      min-height: 120px;
    }
    .avatar-container {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    .avatar-img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid ${data.cvColor || "#000000"};
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .header-content {
      width: 100%;
      text-align: center;
    }
    .header h1 {
      color: ${data.cvColor || "#000000"};
      font-size: 32px;
      margin-bottom: 10px;
      text-align: center;
    }
    .header p {
      color: #666;
      font-size: 14px;
      text-align: center;
      margin-bottom: 4px;
    }
    .section {
      margin-bottom: 30px;
    }
    .section-title {
      color: ${data.cvColor || "#000000"};
      font-size: 20px;
      border-bottom: 2px solid ${
        data.cvColor ? data.cvColor + "40" : "#00000040"
      };
      padding-bottom: 5px;
      margin-bottom: 15px;
    }
    .info-row {
      display: flex;
      margin-bottom: 8px;
    }
    .info-label {
      font-weight: bold;
      width: 120px;
      color: #555;
    }
    .info-value {
      flex: 1;
      color: #333;
    }
    .item {
      margin-bottom: 20px;
      padding-left: 20px;
      border-left: 3px solid ${
        data.cvColor ? data.cvColor + "60" : "#00000060"
      };
    }
    .item-title {
      font-weight: bold;
      font-size: 16px;
      color: ${data.cvColor || "#000000"};
      margin-bottom: 5px;
    }
    .item-subtitle {
      color: #666;
      font-size: 14px;
      margin-bottom: 5px;
    }
    .item-date {
      color: #999;
      font-size: 12px;
      margin-bottom: 8px;
    }
    .item-description {
      color: #555;
      font-size: 14px;
      line-height: 1.6;
    }
    .skills-list, .languages-list, .certifications-list {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    .tag {
      background: #f3f4f6;
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 14px;
      color: #333;
    }
    @media print {
      body {
        padding: 0;
      }
      .cv-container {
        box-shadow: none;
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="cv-container">
    <div class="header">
      ${
        data.avatar
          ? `<div class="avatar-container"><img src="${data.avatar}" alt="Avatar" class="avatar-img" /></div>`
          : ""
      }
      <div class="header-content">
        <h1>${data.fullName || ""}</h1>
        <p>${data.email || ""} ${data.phone ? "| " + data.phone : ""}</p>
        <p>${data.address || ""}</p>
      </div>
    </div>

    ${
      data.objective
        ? `
    <div class="section">
      <h2 class="section-title">Mục tiêu nghề nghiệp</h2>
      <p>${data.objective}</p>
    </div>
    `
        : ""
    }

    ${
      (data.softSkills && data.softSkills.filter((s) => s.trim()).length > 0) ||
      (data.technicalSkills &&
        data.technicalSkills.filter((s) => s.trim()).length > 0)
        ? `
    <div class="section">
      <h2 class="section-title">Kỹ năng</h2>
      ${
        data.technicalSkills &&
        data.technicalSkills.filter((s) => s.trim()).length > 0
          ? `
      <div style="margin-bottom: 15px;">
        <h3 style="font-weight: 600; font-size: 16px; color: #555; margin-bottom: 8px;">Kỹ năng chuyên môn</h3>
        <div class="skills-list">
          ${data.technicalSkills
            .filter((s) => s.trim())
            .map((skill) => `<span class="tag">${skill}</span>`)
            .join("")}
        </div>
      </div>
      `
          : ""
      }
      ${
        data.softSkills && data.softSkills.filter((s) => s.trim()).length > 0
          ? `
      <div>
        <h3 style="font-weight: 600; font-size: 16px; color: #555; margin-bottom: 8px;">Kỹ năng mềm</h3>
        <div class="skills-list">
          ${data.softSkills
            .filter((s) => s.trim())
            .map((skill) => `<span class="tag">${skill}</span>`)
            .join("")}
        </div>
      </div>
      `
          : ""
      }
    </div>
    `
        : ""
    }

    ${
      data.experience.filter((exp) => exp.company || exp.position).length > 0
        ? `
    <div class="section">
      <h2 class="section-title">Kinh nghiệm làm việc</h2>
      ${data.experience
        .filter((exp) => exp.company || exp.position)
        .map(
          (exp) => `
        <div class="item">
          <div class="item-title">${exp.position || ""}</div>
          <div class="item-subtitle">${exp.company || ""}</div>
          <div class="item-date">${exp.startDate || ""} - ${
            exp.endDate || "Hiện tại"
          }</div>
          ${
            exp.description
              ? `<div class="item-description">${exp.description.replace(
                  /\n/g,
                  "<br>"
                )}</div>`
              : ""
          }
        </div>
      `
        )
        .join("")}
    </div>
    `
        : ""
    }

    ${
      data.education.filter((edu) => edu.school).length > 0
        ? `
    <div class="section">
      <h2 class="section-title">Học vấn</h2>
      ${data.education
        .filter((edu) => edu.school)
        .map(
          (edu) => `
        <div class="item">
          <div class="item-title">${edu.degree || ""} ${
            edu.major ? "- " + edu.major : ""
          }</div>
          <div class="item-subtitle">${edu.school || ""}</div>
          <div class="item-date">${edu.startDate || ""} - ${
            edu.endDate || "Hiện tại"
          }</div>
          ${
            edu.description
              ? `<div class="item-description">${edu.description.replace(
                  /\n/g,
                  "<br>"
                )}</div>`
              : ""
          }
        </div>
      `
        )
        .join("")}
    </div>
    `
        : ""
    }

    ${
      data.certifications.filter((c) => c.trim()).length > 0
        ? `
    <div class="section">
      <h2 class="section-title">Chứng chỉ</h2>
      <div class="certifications-list">
        ${data.certifications
          .filter((c) => c.trim())
          .map((cert) => `<span class="tag">${cert}</span>`)
          .join("")}
      </div>
    </div>
    `
        : ""
    }

    ${
      data.languages.filter((l) => l.trim()).length > 0
        ? `
    <div class="section">
      <h2 class="section-title">Ngôn ngữ</h2>
      <div class="languages-list">
        ${data.languages
          .filter((l) => l.trim())
          .map((lang) => `<span class="tag">${lang}</span>`)
          .join("")}
      </div>
    </div>
    `
        : ""
    }
  </div>
</body>
</html>
  `;
}

export default CreateCVPage;
