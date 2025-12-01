// Component Header dùng chung cho các trang
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  FaUser,
  FaChartBar,
  FaFileAlt,
  FaEdit,
  FaSignOutAlt,
  FaChevronDown,
  FaFilePdf,
  FaHome,
  FaBriefcase,
  FaHeart,
  FaGraduationCap,
  FaHospital,
  FaBullseye,
  FaComments,
} from "react-icons/fa";
import useAuthStore from "../store/authStore";
import NotificationDropdown from "./NotificationDropdown";

function Header() {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  // Helper function to build avatar URL
  const getAvatarUrl = (avatar) => {
    if (!avatar) return null;
    if (avatar.startsWith("http")) return avatar;
    if (avatar.startsWith("/")) {
      return `${import.meta.env.VITE_API_URL || "http://localhost:5000"}${avatar}`;
    }
    return `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/uploads/${avatar}`;
  };

  // Tính toán isEmployer từ user role - chỉ check role hiện tại, không check roles array
  // Nếu user đang đăng nhập với role "jobseeker" thì không hiển thị UI employer
  const isEmployer = user?.role === "employer";
  const isJobSeeker = user?.role === "jobseeker";
  const isAdmin = user?.roles?.includes("admin");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const navRef = useRef(null);
  const linkRefs = useRef({});
  const indicatorRef = useRef(null);
  const userMenuRef = useRef(null);
  const mobileUserMenuRef = useRef(null);
  const moreMenuRef = useRef(null);

  // Lắng nghe cuộn để làm header trong suốt hơn khi scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const desktopMenu = userMenuRef.current;
      const mobileMenu = mobileUserMenuRef.current;

      // Kiểm tra nếu click ngoài cả desktop và mobile menu
      const isOutsideDesktop =
        !desktopMenu || !desktopMenu.contains(event.target);
      const isOutsideMobile = !mobileMenu || !mobileMenu.contains(event.target);

      if (isOutsideDesktop && isOutsideMobile) {
        setUserMenuOpen(false);
      }
    };

    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuOpen]);

  // Close more menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setMoreMenuOpen(false);
      }
    };

    if (moreMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [moreMenuOpen]);


  // Kiểm tra route active
  const isActive = useCallback(
    (path) => {
      if (path === "/") {
        return location.pathname === "/";
      }
      if (path === "/jobseeker") {
        return (
          location.pathname === "/jobseeker" ||
          location.pathname.startsWith("/job")
        );
      }
      return location.pathname.startsWith(path);
    },
    [location.pathname]
  );

  // Cập nhật indicator position
  useEffect(() => {
    const updateIndicator = () => {
      if (!indicatorRef.current || !navRef.current) return;

      const activeLink = Object.entries(linkRefs.current).find(
        ([path, link]) => {
          if (!link) return false;
          return isActive(path);
        }
      );

      const activeElement = activeLink ? activeLink[1] : null;

      if (!activeElement) {
        indicatorRef.current.style.transition =
          "width 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease";
        indicatorRef.current.style.opacity = "0";
        indicatorRef.current.style.width = "0";
        return;
      }

      const navRect = navRef.current.getBoundingClientRect();
      const linkRect = activeElement.getBoundingClientRect();

      const newLeft = linkRect.left - navRect.left;
      const newWidth = linkRect.width;

      // Lấy vị trí hiện tại của indicator từ DOM (không phải từ style)
      const currentRect = indicatorRef.current.getBoundingClientRect();
      const currentLeft = currentRect.left - navRect.left;
      const currentWidth = currentRect.width;

      // Nếu vị trí và kích thước giống nhau (trong phạm vi 1px), không cần animate
      if (
        Math.abs(currentLeft - newLeft) < 1 &&
        Math.abs(currentWidth - newWidth) < 1
      ) {
        return;
      }

      // Bước 1: Tắt transition và set vị trí hiện tại (từ DOM thực tế)
      indicatorRef.current.style.transition = "none";
      indicatorRef.current.style.opacity = currentWidth > 0 ? "1" : "0";
      indicatorRef.current.style.width = `${currentWidth}px`;
      indicatorRef.current.style.transform = `translateX(${currentLeft}px)`;

      // Force reflow - buộc browser render ngay
      void indicatorRef.current.offsetHeight;

      // Bước 2: Sau khi browser đã render reset, bật transition và animate
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (indicatorRef.current) {
            indicatorRef.current.style.transition =
              "width 1.2s cubic-bezier(0.4, 0, 0.2, 1), transform 1.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease";
            indicatorRef.current.style.opacity = "1";
            indicatorRef.current.style.width = `${newWidth}px`;
            indicatorRef.current.style.transform = `translateX(${newLeft}px)`;
          }
        });
      });
    };

    // Delay nhỏ để đảm bảo DOM đã update sau khi route change
    const timeoutId = setTimeout(updateIndicator, 50);

    window.addEventListener("resize", updateIndicator);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", updateIndicator);
    };
  }, [location.pathname, isAuthenticated, isEmployer, isActive]);

  const getActiveClass = (path) => {
    const baseClass =
      "relative px-4 py-2 rounded-full font-medium z-10 transition-colors duration-200";
    const activeClass = isActive(path)
      ? "text-white font-semibold"
      : "text-gray-700 hover:text-amber-700";

    return `${baseClass} ${activeClass}`;
  };

  const getMobileActiveClass = (path) => {
    const baseClass =
      "relative px-4 py-2 rounded-full font-medium z-10 transition-all duration-200";
    const activeClass = isActive(path)
      ? "text-white font-semibold animate-gradient-slide"
      : "text-gray-700 hover:text-amber-700 hover:bg-amber-50";

    return `${baseClass} ${activeClass}`;
  };

  const sloganTexts = [
    "🌱 EqualHire - Kết nối cơ hội, truyền cảm hứng vượt lên giới hạn",
    "🤝 Đồng hành cùng người khuyết tật Việt Nam chinh phục ước mơ",
    "🚀 Việc làm, học bổng, sức khỏe & cộng đồng hỗ trợ khắp 63 tỉnh thành",
  ];

  return (
    <>
      <header
        className={`!fixed !z-2 top-0 inset-x-0 z-50 border-b border-gray-200 transition-all duration-300 ${
          isHeaderScrolled
            ? "bg-white/50 backdrop-blur-md shadow-sm"
            : "bg-white/95 backdrop-blur"
        }`}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/equalhireLogo-removebg.png"
                alt="EqualHire"
                className="!h-12 sm:h-12 w-auto object-fit flex items-center"
              />
            </Link>

            {/* Desktop Menu */}
            <nav
              ref={navRef}
              className="hidden md:flex items-center space-x-2 relative"
            >
              {/* Sliding background indicator */}
              <div
                ref={indicatorRef}
                className="absolute h-10 rounded-full animate-gradient-slide z-0 pointer-events-none"
                style={{
                  width: 0,
                  opacity: 0,
                  transform: "translateX(0)",
                  transition:
                    "width 1.2s cubic-bezier(0.4, 0, 0.2, 1), transform 1.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease",
                  willChange: "transform, width",
                }}
              />

              {/* Menu cho Employer - chỉ hiển thị Quản lý tin và Hỏi đáp */}
              {isAuthenticated && isEmployer ? (
                <>
                  <Link
                    ref={(el) => (linkRefs.current["/employer"] = el)}
                    to="/employer"
                    className={getActiveClass("/employer")}
                  >
                    Quản lý tin
                  </Link>

                  <Link
                    ref={(el) => (linkRefs.current["/review-faq"] = el)}
                    to="/review-faq"
                    className={getActiveClass("/review-faq")}
                  >
                    Hỏi đáp
                  </Link>
                </>
              ) : (
                <>
                  {/* Menu cho người tìm việc hoặc chưa đăng nhập */}
                  <Link
                    ref={(el) => (linkRefs.current["/"] = el)}
                    to="/"
                    className={getActiveClass("/")}
                  >
                    <FaHome className="inline-block w-4 h-4 mr-1.5 text-amber-600" />
                    Trang chủ
                  </Link>

                  <Link
                    ref={(el) => (linkRefs.current["/jobseeker"] = el)}
                    to="/jobseeker"
                    className={getActiveClass("/jobseeker")}
                  >
                    <FaBriefcase className="inline-block w-4 h-4 mr-1.5 text-blue-600" />
                    Tìm việc
                  </Link>

                  {/* Các mục phụ - chỉ hiển thị trên desktop (lg+) */}
                  <Link
                    ref={(el) => (linkRefs.current["/charity"] = el)}
                    to="/charity"
                    className={`${getActiveClass("/charity")} hidden lg:block`}
                  >
                    <FaHeart className="inline-block w-4 h-4 mr-1.5 text-red-500" />
                    Hỗ trợ khác
                  </Link>

                  <Link
                    ref={(el) => (linkRefs.current["/scholarships"] = el)}
                    to="/scholarships"
                    className={`${getActiveClass(
                      "/scholarships"
                    )} hidden lg:block`}
                  >
                    <FaGraduationCap className="inline-block w-4 h-4 mr-1.5 text-purple-600" />
                    Học bổng
                  </Link>

                  <Link
                    ref={(el) => (linkRefs.current["/healthcare"] = el)}
                    to="/healthcare"
                    className={`${getActiveClass(
                      "/healthcare"
                    )} hidden lg:block`}
                  >
                    <FaHospital className="inline-block w-4 h-4 mr-1.5 text-green-600" />
                    Sức khỏe
                  </Link>

                  <Link
                    ref={(el) => (linkRefs.current["/career-guidance"] = el)}
                    to="/career-guidance"
                    className={`${getActiveClass(
                      "/career-guidance"
                    )} hidden lg:block`}
                  >
                    <FaBullseye className="inline-block w-4 h-4 mr-1.5 text-orange-600" />
                    Hướng nghiệp
                  </Link>

                  <Link
                    ref={(el) => (linkRefs.current["/review-faq"] = el)}
                    to="/review-faq"
                    className={`${getActiveClass(
                      "/review-faq"
                    )} hidden lg:block`}
                  >
                    <FaComments className="inline-block w-4 h-4 mr-1.5 text-cyan-600" />
                    Hỏi đáp
                  </Link>

                  {/* Dropdown "Khác" cho tablet - hiển thị từ md đến lg */}
                  <div
                    className="md:block lg:hidden relative"
                    ref={moreMenuRef}
                  >
                    <button
                      ref={(el) => {
                        if (
                          isActive("/charity") ||
                          isActive("/scholarships") ||
                          isActive("/healthcare") ||
                          isActive("/career-guidance") ||
                          isActive("/review-faq")
                        ) {
                          linkRefs.current["/more"] = el;
                        }
                      }}
                      onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                      className={`relative px-4 py-2 rounded-full font-medium z-10 transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                        isActive("/charity") ||
                        isActive("/scholarships") ||
                        isActive("/healthcare") ||
                        isActive("/career-guidance") ||
                        isActive("/review-faq")
                          ? "text-white font-semibold animate-gradient-slide"
                          : "text-gray-700 hover:text-amber-700"
                      }`}
                    >
                      <span>Khác</span>
                      <FaChevronDown
                        className={`w-3 h-3 transition-transform duration-200 ${
                          moreMenuOpen ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown menu */}
                    {moreMenuOpen && (
                      <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                        <Link
                          to="/charity"
                          onClick={() => setMoreMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-200"
                        >
                          <FaHeart className="w-4 h-4 text-red-500" />
                          <span>Hỗ trợ khác</span>
                        </Link>
                        <Link
                          to="/scholarships"
                          onClick={() => setMoreMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-200"
                        >
                          <FaGraduationCap className="w-4 h-4 text-purple-600" />
                          <span>Học bổng</span>
                        </Link>
                        <Link
                          to="/healthcare"
                          onClick={() => setMoreMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-200"
                        >
                          <FaHospital className="w-4 h-4 text-green-600" />
                          <span>Sức khỏe</span>
                        </Link>
                        <Link
                          to="/career-guidance"
                          onClick={() => setMoreMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-200"
                        >
                          <FaBullseye className="w-4 h-4 text-orange-600" />
                          <span>Hướng nghiệp</span>
                        </Link>
                        <Link
                          to="/review-faq"
                          onClick={() => setMoreMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-200"
                        >
                          <FaComments className="w-4 h-4 text-cyan-600" />
                          <span>Hỏi đáp</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </>
              )}

              <div className="flex items-center space-x-2 ml-2 relative">
                {isAuthenticated ? (
                  <>
                    {/* Notification Bell */}
                    <NotificationDropdown />
                    
                    <div className="relative" ref={userMenuRef}>
                      {/* User Avatar Button */}
                      <button
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-amber-50 transition-colors cursor-pointer"
                      >
                      {user?.avatar ? (
                        <img
                          src={getAvatarUrl(user.avatar)}
                          alt="Avatar"
                          onError={(e) => {
                            console.error("Header avatar load error:", user?.avatar);
                            e.target.style.display = 'none';
                          }}
                          className="w-8 h-8 rounded-full object-cover border-2 border-amber-600"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-amber-300 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {user?.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                      )}
                      <span className="text-sm font-semibold text-gray-700 hidden sm:block">
                        {user?.name?.split(" ").pop() || "User"}
                      </span>
                      <FaChevronDown
                        className={`w-3 h-3 text-gray-600 transition-transform ${
                          userMenuOpen ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {userMenuOpen && (
                      <div className="absolute right-0 top-20 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                        <div className="px-4 py-3 border-b border-gray-200">
                          <div className="flex items-center gap-3 mb-2">
                            {user?.avatar ? (
                              <img
                                src={getAvatarUrl(user.avatar)}
                                alt="Avatar"
                                onError={(e) => {
                                  console.error("Header dropdown avatar load error:", user?.avatar);
                                  e.target.style.display = 'none';
                                }}
                                className="w-10 h-10 rounded-full object-cover border-2 border-amber-600"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-amber-300 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                {user?.name?.charAt(0).toUpperCase() || "U"}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-900 truncate">
                                {user?.name}
                              </p>
                              <p className="text-xs text-gray-600 truncate">
                                {user?.email}
                              </p>
                            </div>
                          </div>
                          <p className="text-xs text-amber-700">
                            {user?.role === "employer"
                              ? "Nhà tuyển dụng"
                              : "Người tìm việc"}
                          </p>
                        </div>
                        <Link
                          to="/profile"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-200"
                        >
                          <FaUser className="w-4 h-4 text-blue-600" />
                          <span>Thông tin tài khoản</span>
                        </Link>
                        {isEmployer ? (
                          <>
                            <Link
                              to="/employer/dashboard"
                              onClick={() => setUserMenuOpen(false)}
                              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-200"
                            >
                              <FaChartBar className="w-4 h-4 text-green-600" />
                              <span>Dashboard</span>
                            </Link>
                            <Link
                              to="/employer/applications"
                              onClick={() => setUserMenuOpen(false)}
                              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-200"
                            >
                              <FaFileAlt className="w-4 h-4 text-indigo-600" />
                              <span>Đơn ứng tuyển</span>
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link
                              to="/manage-cv"
                              onClick={() => setUserMenuOpen(false)}
                              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-200"
                            >
                              <FaFilePdf className="w-4 h-4 text-red-600" />
                              <span>Quản lý CV</span>
                            </Link>
                            <Link
                              to="/my-applications"
                              onClick={() => setUserMenuOpen(false)}
                              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-200"
                            >
                              <FaFileAlt className="w-4 h-4 text-indigo-600" />
                              <span>Đơn đã ứng tuyển</span>
                            </Link>
                          </>
                        )}
                        <div className="border-t border-gray-200 mt-2 pt-2">
                          <button
                            onClick={() => {
                              logout();
                              setUserMenuOpen(false);
                              window.location.href = "/";
                            }}
                            className="w-full flex items-center gap-2 text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200 cursor-pointer"
                          >
                            <FaSignOutAlt className="w-4 h-4" />
                            <span>Đăng xuất</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  </>
                ) : (
                  <>
                    <Link
                      ref={(el) => (linkRefs.current["/login"] = el)}
                      to="/login"
                      className={getActiveClass("/login")}
                    >
                      Đăng nhập
                    </Link>

                    <Link
                      ref={(el) => (linkRefs.current["/register"] = el)}
                      to="/register"
                      className={getActiveClass("/register", true)}
                    >
                      Đăng ký
                    </Link>
                  </>
                )}
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-700 hover:text-amber-700 cursor-pointer"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <nav className="md:hidden pb-4 mt-10 animate-fade-in">
              <div className="flex flex-col space-y-2">
                {/* Menu cho Employer */}
                {isAuthenticated && isEmployer ? (
                  <>
                    <Link
                      to="/"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`${getMobileActiveClass(
                        "/"
                      )} text-left flex items-center gap-2`}
                    >
                      <FaHome className="w-4 h-4 text-amber-600" />
                      <span>Trang chủ</span>
                    </Link>

                    <Link
                      to="/employer"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`${getMobileActiveClass(
                        "/employer"
                      )} text-left`}
                    >
                      Quản lý tin
                    </Link>

                    <Link
                      to="/review-faq"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`${getMobileActiveClass(
                        "/review-faq"
                      )} text-left`}
                    >
                      Hỏi đáp
                    </Link>
                  </>
                ) : (
                  <>
                    {/* Menu cho người tìm việc hoặc chưa đăng nhập */}
                    <Link
                      to="/"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`${getMobileActiveClass(
                        "/"
                      )} text-left flex items-center gap-2`}
                    >
                      <FaHome className="w-4 h-4 text-amber-600" />
                      <span>Trang chủ</span>
                    </Link>

                    <Link
                      to="/jobseeker"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`${getMobileActiveClass(
                        "/jobseeker"
                      )} text-left flex items-center gap-2`}
                    >
                      <FaBriefcase className="w-4 h-4 text-blue-600" />
                      <span>Tìm việc</span>
                    </Link>

                    <Link
                      to="/charity"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`${getMobileActiveClass(
                        "/charity"
                      )} text-left flex items-center gap-2`}
                    >
                      <FaHeart className="w-4 h-4 text-red-500" />
                      <span>Hỗ trợ khác</span>
                    </Link>

                    <Link
                      to="/scholarships"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`${getMobileActiveClass(
                        "/scholarships"
                      )} text-left flex items-center gap-2`}
                    >
                      <FaGraduationCap className="w-4 h-4 text-purple-600" />
                      <span>Học bổng</span>
                    </Link>

                    <Link
                      to="/healthcare"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`${getMobileActiveClass(
                        "/healthcare"
                      )} text-left flex items-center gap-2`}
                    >
                      <FaHospital className="w-4 h-4 text-green-600" />
                      <span>Sức khỏe</span>
                    </Link>

                    <Link
                      to="/career-guidance"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`${getMobileActiveClass(
                        "/career-guidance"
                      )} text-left flex items-center gap-2`}
                    >
                      <FaBullseye className="w-4 h-4 text-orange-600" />
                      <span>Hướng nghiệp</span>
                    </Link>

                    <Link
                      to="/review-faq"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`${getMobileActiveClass(
                        "/review-faq"
                      )} text-left flex items-center gap-2`}
                    >
                      <FaComments className="w-4 h-4 text-cyan-600" />
                      <span>Hỏi đáp</span>
                    </Link>
                  </>
                )}

                <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
                  {isAuthenticated ? (
                    <div className="relative" ref={mobileUserMenuRef}>
                      {/* User Button - tương tự desktop */}
                      <button
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-amber-50 transition-colors cursor-pointer text-left"
                      >
                        {user?.avatar ? (
                          <img
                            src={getAvatarUrl(user.avatar)}
                            alt="Avatar"
                            onError={(e) => {
                              console.error("Mobile header avatar load error:", user?.avatar);
                              e.target.style.display = 'none';
                            }}
                            className="w-10 h-10 rounded-full object-cover border-2 border-amber-600"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-amber-300 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {user?.name?.charAt(0).toUpperCase() || "U"}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {user?.name}
                          </p>
                          <p className="text-xs text-gray-600 truncate">
                            {user?.role === "employer"
                              ? "Nhà tuyển dụng"
                              : "Người tìm việc"}
                          </p>
                        </div>
                        <FaChevronDown
                          className={`w-4 h-4 text-gray-600 transition-transform flex-shrink-0 ${
                            userMenuOpen ? "transform rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Dropdown Menu - chỉ hiển thị khi userMenuOpen = true */}
                      {userMenuOpen && (
                        <div className="mt-2 bg-white rounded-xl border border-gray-200 py-2 shadow-lg">
                          <Link
                            to="/profile"
                            onClick={() => {
                              setUserMenuOpen(false);
                              setIsMobileMenuOpen(false);
                            }}
                            className={`flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-200 ${
                              isActive("/profile")
                                ? "bg-amber-50 text-amber-700"
                                : ""
                            }`}
                          >
                            <FaUser className="w-4 h-4" />
                            <span>Thông tin tài khoản</span>
                          </Link>
                          {isEmployer ? (
                            <>
                              <Link
                                to="/employer/dashboard"
                                onClick={() => {
                                  setUserMenuOpen(false);
                                  setIsMobileMenuOpen(false);
                                }}
                                className={`flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-200 ${
                                  isActive("/employer/dashboard")
                                    ? "bg-amber-50 text-amber-700"
                                    : ""
                                }`}
                              >
                                <FaChartBar className="w-4 h-4" />
                                <span>Dashboard</span>
                              </Link>
                              <Link
                                to="/employer/applications"
                                onClick={() => {
                                  setUserMenuOpen(false);
                                  setIsMobileMenuOpen(false);
                                }}
                                className={`flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-200 ${
                                  isActive("/employer/applications")
                                    ? "bg-amber-50 text-amber-700"
                                    : ""
                                }`}
                              >
                                <FaFileAlt className="w-4 h-4" />
                                <span>Đơn ứng tuyển</span>
                              </Link>
                            </>
                          ) : (
                            <>
                              <Link
                                to="/manage-cv"
                                onClick={() => {
                                  setUserMenuOpen(false);
                                  setIsMobileMenuOpen(false);
                                }}
                                className={`flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-200 ${
                                  isActive("/manage-cv")
                                    ? "bg-amber-50 text-amber-700"
                                    : ""
                                }`}
                              >
                                <FaFilePdf className="w-4 h-4" />
                                <span>Quản lý CV</span>
                              </Link>
                              <Link
                                to="/my-applications"
                                onClick={() => {
                                  setUserMenuOpen(false);
                                  setIsMobileMenuOpen(false);
                                }}
                                className={`flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-200 ${
                                  isActive("/my-applications")
                                    ? "bg-amber-50 text-amber-700"
                                    : ""
                                }`}
                              >
                                <FaFileAlt className="w-4 h-4" />
                                <span>Đơn đã ứng tuyển</span>
                              </Link>
                            </>
                          )}
                          <div className="border-t border-gray-200 mt-2 pt-2">
                            <button
                              onClick={() => {
                                logout();
                                setUserMenuOpen(false);
                                setIsMobileMenuOpen(false);
                                window.location.href = "/";
                              }}
                              className="w-full flex items-center gap-2 text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200 cursor-pointer"
                            >
                              <FaSignOutAlt className="w-4 h-4" />
                              <span>Đăng xuất</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`${getMobileActiveClass(
                          "/login"
                        )} text-left`}
                      >
                        Đăng nhập
                      </Link>

                      <Link
                        to="/register"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`${getMobileActiveClass(
                          "/register"
                        )} text-left`}
                      >
                        Đăng ký
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </nav>
          )}
        </div>
      </header>
      <div className="slogan-marquee">
        <div className="slogan-marquee__track">
          {[...sloganTexts, ...sloganTexts].map((text, index) => (
            <span className="slogan-marquee__item" key={`slogan-${index}`}>
              {text}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default Header;
