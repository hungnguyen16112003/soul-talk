// Component Header dùng chung cho các trang
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  FaUser,
  FaChartBar,
  FaFileAlt,
  FaEdit,
  FaSignOutAlt,
  FaChevronDown,
  FaFilePdf,
} from "react-icons/fa";
import useAuthStore from "../store/authStore";

function Header() {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  // Tính toán isEmployer từ user role
  const isEmployer = user?.role === "employer";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navRef = useRef(null);
  const linkRefs = useRef({});
  const indicatorRef = useRef(null);
  const userMenuRef = useRef(null);
  const mobileUserMenuRef = useRef(null);
  const moreMenuRef = useRef(null);

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
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname === "/jobseeker";
    }
    return location.pathname.startsWith(path);
  };

  // Cập nhật indicator position
  useEffect(() => {
    const updateIndicator = () => {
      if (!indicatorRef.current || !navRef.current) return;

      const activeLink = Object.values(linkRefs.current).find((link) => {
        if (!link) return false;
        const path = link.getAttribute("href");
        if (!path) return false;
        if (path === "/") {
          return (
            location.pathname === "/" || location.pathname === "/jobseeker"
          );
        }
        return location.pathname.startsWith(path);
      });

      if (!activeLink) {
        indicatorRef.current.style.transition =
          "width 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease";
        indicatorRef.current.style.opacity = "0";
        indicatorRef.current.style.width = "0";
        return;
      }

      const navRect = navRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();

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
  }, [location.pathname, isAuthenticated, isEmployer]);

  const getActiveClass = (path) => {
    const baseClass =
      "relative px-4 py-2 rounded-full font-medium z-10 transition-colors duration-200";
    const activeClass = isActive(path)
      ? "text-white font-semibold"
      : "text-gray-700 hover:text-purple-600";

    return `${baseClass} ${activeClass}`;
  };

  const getMobileActiveClass = (path) => {
    const baseClass =
      "relative px-4 py-2 rounded-full font-medium z-10 transition-all duration-200";
    const activeClass = isActive(path)
      ? "text-white font-semibold animate-gradient-slide"
      : "text-gray-700 hover:text-purple-600 hover:bg-purple-50";

    return `${baseClass} ${activeClass}`;
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Soul Talk
            </h1>
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
                  Tìm việc
                </Link>

                {/* Các mục phụ - chỉ hiển thị trên desktop (lg+) */}
                <Link
                  ref={(el) => (linkRefs.current["/charity"] = el)}
                  to="/charity"
                  className={`${getActiveClass("/charity")} hidden lg:block`}
                >
                  💝 Từ thiện
                </Link>

                <Link
                  ref={(el) => (linkRefs.current["/scholarships"] = el)}
                  to="/scholarships"
                  className={`${getActiveClass(
                    "/scholarships"
                  )} hidden lg:block`}
                >
                  🎓 Học bổng
                </Link>

                <Link
                  ref={(el) => (linkRefs.current["/healthcare"] = el)}
                  to="/healthcare"
                  className={`${getActiveClass("/healthcare")} hidden lg:block`}
                >
                  🏥 Sức khỏe
                </Link>

                <Link
                  ref={(el) => (linkRefs.current["/career-guidance"] = el)}
                  to="/career-guidance"
                  className={`${getActiveClass(
                    "/career-guidance"
                  )} hidden lg:block`}
                >
                  🎯 Hướng nghiệp
                </Link>

                <Link
                  ref={(el) => (linkRefs.current["/success-stories"] = el)}
                  to="/success-stories"
                  className={`${getActiveClass(
                    "/success-stories"
                  )} hidden lg:block`}
                >
                  🌟 Câu chuyện
                </Link>

                <Link
                  ref={(el) => (linkRefs.current["/review-faq"] = el)}
                  to="/review-faq"
                  className={`${getActiveClass("/review-faq")} hidden lg:block`}
                >
                  💬 Hỏi đáp
                </Link>

                {/* Dropdown "Khác" cho tablet - hiển thị từ md đến lg */}
                <div className="md:block lg:hidden relative" ref={moreMenuRef}>
                  <button
                    ref={(el) => {
                      if (
                        isActive("/charity") ||
                        isActive("/scholarships") ||
                        isActive("/healthcare") ||
                        isActive("/career-guidance") ||
                        isActive("/success-stories") ||
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
                      isActive("/success-stories") ||
                      isActive("/review-faq")
                        ? "text-white font-semibold animate-gradient-slide"
                        : "text-gray-700 hover:text-purple-600"
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
                        className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                      >
                        💝 Từ thiện
                      </Link>
                      <Link
                        to="/scholarships"
                        onClick={() => setMoreMenuOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                      >
                        🎓 Học bổng
                      </Link>
                      <Link
                        to="/healthcare"
                        onClick={() => setMoreMenuOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                      >
                        🏥 Sức khỏe
                      </Link>
                      <Link
                        to="/career-guidance"
                        onClick={() => setMoreMenuOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                      >
                        🎯 Hướng nghiệp
                      </Link>
                      <Link
                        to="/success-stories"
                        onClick={() => setMoreMenuOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                      >
                        🌟 Câu chuyện
                      </Link>
                      <Link
                        to="/review-faq"
                        onClick={() => setMoreMenuOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                      >
                        💬 Hỏi đáp
                      </Link>
                    </div>
                  )}
                </div>
              </>
            )}

            <div className="flex items-center space-x-2 ml-2 relative">
              {isAuthenticated ? (
                <div className="relative" ref={userMenuRef}>
                  {/* User Avatar Button */}
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-purple-50 transition-colors cursor-pointer"
                  >
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt="Avatar"
                        className="w-8 h-8 rounded-full object-cover border-2 border-purple-600"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
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
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <div className="flex items-center gap-3 mb-2">
                          {user?.avatar ? (
                            <img
                              src={user.avatar}
                              alt="Avatar"
                              className="w-10 h-10 rounded-full object-cover border-2 border-purple-600"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
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
                        <p className="text-xs text-purple-600">
                          {user?.role === "employer"
                            ? "Nhà tuyển dụng"
                            : "Người tìm việc"}
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                      >
                        <FaUser className="w-4 h-4" />
                        <span>Thông tin tài khoản</span>
                      </Link>
                      {isEmployer ? (
                        <>
                          <Link
                            to="/employer/dashboard"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                          >
                            <FaChartBar className="w-4 h-4" />
                            <span>Dashboard</span>
                          </Link>
                          <Link
                            to="/employer/applications"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                          >
                            <FaFileAlt className="w-4 h-4" />
                            <span>Đơn ứng tuyển</span>
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link
                            to="/onboarding"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                          >
                            <FaEdit className="w-4 h-4" />
                            <span>Cập nhật hồ sơ</span>
                          </Link>
                          <Link
                            to="/manage-cv"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                          >
                            <FaFilePdf className="w-4 h-4" />
                            <span>Quản lý CV</span>
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
            className="md:hidden text-gray-700 hover:text-purple-600 cursor-pointer"
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
          <nav className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col space-y-2">
              {/* Menu cho Employer */}
              {isAuthenticated && isEmployer ? (
                <>
                  <Link
                    to="/employer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`${getMobileActiveClass("/employer")} text-left`}
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
                    className={`${getMobileActiveClass("/")} text-left`}
                  >
                    Tìm việc
                  </Link>

                  <Link
                    to="/charity"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`${getMobileActiveClass("/charity")} text-left`}
                  >
                    💝 Từ thiện
                  </Link>

                  <Link
                    to="/scholarships"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`${getMobileActiveClass(
                      "/scholarships"
                    )} text-left`}
                  >
                    🎓 Học bổng
                  </Link>

                  <Link
                    to="/healthcare"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`${getMobileActiveClass(
                      "/healthcare"
                    )} text-left`}
                  >
                    🏥 Sức khỏe
                  </Link>

                  <Link
                    to="/career-guidance"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`${getMobileActiveClass(
                      "/career-guidance"
                    )} text-left`}
                  >
                    🎯 Hướng nghiệp
                  </Link>

                  <Link
                    to="/success-stories"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`${getMobileActiveClass(
                      "/success-stories"
                    )} text-left`}
                  >
                    🌟 Câu chuyện
                  </Link>

                  <Link
                    to="/review-faq"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`${getMobileActiveClass(
                      "/review-faq"
                    )} text-left`}
                  >
                    💬 Hỏi đáp
                  </Link>
                </>
              )}

              <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
                {isAuthenticated ? (
                  <div className="relative" ref={mobileUserMenuRef}>
                    {/* User Button - tương tự desktop */}
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-purple-50 transition-colors cursor-pointer text-left"
                    >
                      {user?.avatar ? (
                        <img
                          src={user.avatar}
                          alt="Avatar"
                          className="w-10 h-10 rounded-full object-cover border-2 border-purple-600"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
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
                          className={`flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200 ${
                            isActive("/profile")
                              ? "bg-purple-50 text-purple-600"
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
                              className={`flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200 ${
                                isActive("/employer/dashboard")
                                  ? "bg-purple-50 text-purple-600"
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
                              className={`flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200 ${
                                isActive("/employer/applications")
                                  ? "bg-purple-50 text-purple-600"
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
                              to="/onboarding"
                              onClick={() => {
                                setUserMenuOpen(false);
                                setIsMobileMenuOpen(false);
                              }}
                              className={`flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200 ${
                                isActive("/onboarding")
                                  ? "bg-purple-50 text-purple-600"
                                  : ""
                              }`}
                            >
                              <FaEdit className="w-4 h-4" />
                              <span>Cập nhật hồ sơ</span>
                            </Link>
                            <Link
                              to="/manage-cv"
                              onClick={() => {
                                setUserMenuOpen(false);
                                setIsMobileMenuOpen(false);
                              }}
                              className={`flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200 ${
                                isActive("/manage-cv")
                                  ? "bg-purple-50 text-purple-600"
                                  : ""
                              }`}
                            >
                              <FaFilePdf className="w-4 h-4" />
                              <span>Quản lý CV</span>
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
                      className={`${getMobileActiveClass("/login")} text-left`}
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
  );
}

export default Header;
