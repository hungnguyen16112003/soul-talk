// Component Notification Dropdown
import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  FaBell,
  FaTimes,
  FaFileAlt,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import socketService from "../services/socketService";
import useAuthStore from "../store/authStore";
import { notificationService } from "../services/notificationService";

function NotificationDropdown() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  // Chỉ check role hiện tại, không check roles array
  const isEmployer = user?.role === "employer";
  const isJobSeeker = user?.role === "jobseeker";
  const isAdmin = user?.roles?.includes("admin");

  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);
  const dropdownRef = useRef(null);
  const lastLoadTime = useRef(0);

  // Load notifications from API (mỗi lần lấy 20 cái vào state)
  const loadNotifications = useCallback(
    async (page = 1, append = false) => {
      if (!isAuthenticated || !user?.id) {
        setNotifications([]);
        setUnreadCount(0);
        return;
      }

      try {
        setIsLoading(true);
        const response = await notificationService.getNotifications({
          limit: 20,
          page,
        });
        const notificationsData =
          response.data.data?.notifications ||
          response.data.notifications ||
          [];

        const pagination =
          response.data.data?.pagination || response.data.pagination || {};
        const total = pagination.total || notificationsData.length;
        const hasMoreData =
          pagination.hasMore !== undefined
            ? pagination.hasMore
            : page * 20 < total;

        setHasMore(hasMoreData);
        setCurrentPage(page);

        // Map _id to id for consistency
        let mappedNotifications = notificationsData.map((n) => ({
          ...n,
          id: n._id || n.id,
          createdAt: n.createdAt || n.createdAt,
        }));

        console.log("📋 Raw notifications from API:", notificationsData.length);
        console.log("📋 Mapped notifications:", mappedNotifications.length);
        console.log(
          "📋 Notification types:",
          mappedNotifications.map((n) => ({
            id: n.id,
            type: n.type,
            title: n.title,
          }))
        );

        // Filter notifications based on user role
        if (isJobSeeker) {
          console.log(
            "👤 Filtering for jobseeker - before:",
            mappedNotifications.length
          );
          // Jobseekers see "application-status" and "cv-viewed" notifications
          // They don't see "new-application" notifications from employers
          mappedNotifications = mappedNotifications.filter(
            (n) => n.type === "application-status" || n.type === "cv-viewed"
          );
          console.log(
            "👤 Filtering for jobseeker - after:",
            mappedNotifications.length
          );
        } else if (isEmployer || isAdmin) {
          console.log(
            "🏢 Filtering for employer - before:",
            mappedNotifications.length
          );
          // Employers don't see "application-status" and "cv-viewed" notifications in dropdown
          // (they create "application-status" when updating status, and "cv-viewed" is for jobseekers)
          mappedNotifications = mappedNotifications.filter(
            (n) => n.type !== "application-status" && n.type !== "cv-viewed"
          );
          console.log(
            "🏢 Filtering for employer - after:",
            mappedNotifications.length
          );
        }

        if (append) {
          // Append thêm vào cuối danh sách, tránh trùng id
          setNotifications((prev) => {
            const existingIds = new Set(prev.map((n) => n.id));
            const newOnes = mappedNotifications.filter(
              (n) => !existingIds.has(n._id || n.id)
            );
            return [...prev, ...newOnes];
          });
        } else {
          setNotifications(mappedNotifications);
          setVisibleCount(Math.min(5, mappedNotifications.length));
        }

        // Get unread count
        const unreadResponse = await notificationService.getUnreadCount();
        const count =
          unreadResponse.data.data?.count || unreadResponse.data.count || 0;
        setUnreadCount(count);
      } catch (error) {
        console.error("Error loading notifications:", error);
        setNotifications([]);
        setUnreadCount(0);
      } finally {
        setIsLoading(false);
      }
    },
    [isAuthenticated, user?.id, isJobSeeker, isEmployer, isAdmin]
  );

  // Load notifications when component mounts or user changes
  useEffect(() => {
    loadNotifications(1, false);
  }, [loadNotifications]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Socket.io realtime connection for notifications
  useEffect(() => {
    if (!isAuthenticated) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    const socket = socketService.connect(token);

    // For employers: new application notification
    // Notification is already created in database by backend, just reload
    const handleNewApplication = () => {
      if (isEmployer || isAdmin) {
        // Debounce to avoid multiple rapid calls
        const now = Date.now();
        if (now - lastLoadTime.current > 500) {
          // Reduced from 1000ms to 500ms
          // Only reload if more than 0.5 second passed
          lastLoadTime.current = now;
          // Reload notifications from API to get the new one
          loadNotifications(1, false);
        }
      }
    };

    // For job seekers: CV viewed notification
    // Notification is already created in database by backend, just reload
    const handleCVViewed = (data) => {
      console.log("👁️ Frontend received cv-viewed event:", data);
      if (isJobSeeker) {
        console.log(
          "👤 User is jobseeker, reloading notifications for CV viewed"
        );
        // Debounce to avoid multiple rapid calls
        const now = Date.now();
        if (now - lastLoadTime.current > 500) {
          // Reduced from 1000ms to 500ms
          // Only reload if more than 0.5 second passed
          lastLoadTime.current = now;
          console.log(
            "🔄 Reloading notifications for CV viewed after debounce"
          );
          // Reload notifications from API to get the new one
          loadNotifications(1, false);
        } else {
          console.log("⏳ Skipping CV viewed reload due to debounce");
        }
      } else {
        console.log("👤 User is not jobseeker, ignoring CV viewed event");
      }
    };

    // For job seekers: application status updated
    // Notification is already created in database by backend, just reload
    const handleApplicationStatusUpdated = (data) => {
      console.log(
        "📢 Frontend received application-status-updated event:",
        data
      );
      console.log(
        "📢 Current user role - isJobSeeker:",
        isJobSeeker,
        "user:",
        user?.id
      );
      if (isJobSeeker) {
        console.log("👤 User is jobseeker, reloading notifications");
        // Jobseeker gets notification in dropdown when employer updates their application status
        const now = Date.now();
        if (now - lastLoadTime.current > 500) {
          // Reduced debounce from 1000ms to 500ms
          lastLoadTime.current = now;
          console.log(
            "🔄 Reloading notifications for jobseeker after debounce"
          );
          loadNotifications(1, false);
        } else {
          console.log("⏳ Skipping reload due to debounce");
        }
      } else if (isEmployer || isAdmin) {
        console.log("🏢 User is employer - realtime status update sent");
        // Employer sent the update, they don't get notification for their own action
        console.log(
          "ℹ️ Status update sent:",
          data.status,
          "for job:",
          data.jobTitle
        );
      } else {
        console.log("👤 User role not recognized, ignoring event");
      }
    };

    const setupListeners = () => {
      if (!socketService.isConnected) {
        console.log("🔄 Socket not connected yet, waiting...");
        setTimeout(setupListeners, 100);
        return;
      }

      console.log(
        "🔌 Setting up socket listeners for user:",
        user?.id,
        "role:",
        user?.role
      );
      console.log("🔌 Socket connected:", socketService.isConnected);
      console.log("🔌 isJobSeeker:", isJobSeeker);

      if (isEmployer || isAdmin) {
        socketService.on("new-application", handleNewApplication);
        console.log("👂 Listening for new-application events");
      }
      if (isJobSeeker) {
        socketService.on("cv-viewed", handleCVViewed);
        console.log("👂 Jobseeker listening for cv-viewed events");
        socketService.on(
          "application-status-updated",
          handleApplicationStatusUpdated
        );
        console.log(
          "👂 Listening for cv-viewed and application-status-updated events"
        );
      }
    };

    if (socketService.isConnected) {
      setupListeners();
    } else {
      socket.on("connect", setupListeners);
    }

    return () => {
      socketService.off("new-application", handleNewApplication);
      socketService.off("cv-viewed", handleCVViewed);
      socketService.off(
        "application-status-updated",
        handleApplicationStatusUpdated
      );
    };
  }, [
    isAuthenticated,
    isEmployer,
    isJobSeeker,
    isAdmin,
    loadNotifications,
    user?.id,
    user?.role,
  ]);

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      await notificationService.markAsRead(notificationId);
      // Update local state
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
      );
      // Reload unread count
      const unreadResponse = await notificationService.getUnreadCount();
      const count =
        unreadResponse.data.data?.count || unreadResponse.data.count || 0;
      setUnreadCount(count);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      // Update local state
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  // Delete notification
  const deleteNotification = async (notificationId) => {
    try {
      await notificationService.deleteNotification(notificationId);
      // Update local state
      setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
      // Reload unread count
      const unreadResponse = await notificationService.getUnreadCount();
      const count =
        unreadResponse.data.data?.count || unreadResponse.data.count || 0;
      setUnreadCount(count);
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  // Get notification icon
  const getNotificationIcon = (notification) => {
    const { type, title } = notification;

    switch (type) {
      case "new-application":
        return <FaFileAlt className="w-4 h-4 text-blue-500" />;
      case "cv-viewed":
        return <FaEye className="w-4 h-4 text-green-500" />;
      case "application-status":
        // Check if it's accepted or rejected based on title
        if (title?.includes("chấp nhận") || title?.includes("accepted")) {
          return <FaCheckCircle className="w-4 h-4 text-green-500" />; // Icon check, màu xanh cho accepted
        } else if (title?.includes("từ chối") || title?.includes("rejected")) {
          return <FaTimes className="w-4 h-4 text-red-500" />; // Icon close, màu đỏ cho rejected
        } else {
          return <FaCheckCircle className="w-4 h-4 text-amber-500" />; // Mặc định
        }
      default:
        return <FaBell className="w-4 h-4 text-gray-500" />;
    }
  };

  // Get notification link
  const getNotificationLink = (notification) => {
    console.log("Processing notification:", {
      type: notification.type,
      data: notification.data,
      hasJobId: notification.data?.jobId,
      jobIdValue: notification.data?.jobId,
    });

    if (notification.type === "new-application") {
      return "/employer/applications";
    }

    // For application status updates, try to navigate to job detail if jobId exists
    if (notification.type === "application-status") {
      const jobId = notification.data?.jobId;
      if (
        jobId &&
        typeof jobId === "string" &&
        jobId.length > 0 &&
        jobId !== ""
      ) {
        console.log("Navigating to job detail:", `/job/${jobId}`);
        return `/job/${jobId}`;
      }
      // Fallback to jobseeker page if no jobId
      console.log(
        "No valid jobId found for application-status, navigating to jobseeker page. jobId:",
        jobId
      );
      return "/jobseeker";
    }

    // For CV viewed notifications, navigate to jobseeker page
    if (notification.type === "cv-viewed") {
      return "/jobseeker";
    }

    return "#";
  };

  if (!isAuthenticated) return null;

  return (
    <div className="relative z-[100]" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-700 hover:text-amber-600 transition-colors duration-200"
      >
        <FaBell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-20 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200  max-h-96 overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Thông báo</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-amber-600 hover:text-amber-700 font-medium"
              >
                Đánh dấu tất cả đã đọc
              </button>
            )}
          </div>

          <div className="overflow-y-auto flex-1">
            {isLoading ? (
              <div className="px-4 py-8 text-center text-gray-500">
                <p>Đang tải thông báo...</p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500">
                <FaBell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p>Chưa có thông báo nào</p>
              </div>
            ) : (
              <>
                <div className="divide-y divide-gray-100">
                  {notifications.slice(0, visibleCount).map((notification) => (
                    <Link
                      key={notification.id}
                      to={getNotificationLink(notification)}
                      onClick={() => {
                        markAsRead(notification.id);
                        setIsOpen(false);
                      }}
                      className={`block px-4 py-3 hover:bg-gray-50 transition-colors duration-200 ${
                        !notification.read ? "bg-amber-50" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-gray-900">
                                {notification.title}
                              </p>
                              <p className="text-xs text-gray-600 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {new Date(
                                  notification.createdAt
                                ).toLocaleString("vi-VN")}
                              </p>
                            </div>
                            {!notification.read && (
                              <span className="flex-shrink-0 w-2 h-2 bg-amber-500 rounded-full mt-1"></span>
                            )}
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                              className="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <FaTimes className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {(visibleCount < notifications.length || hasMore) && (
                  <div className="border-t border-gray-100 px-4 py-2 text-center">
                    <button
                      onClick={() => {
                        if (visibleCount < notifications.length) {
                          const nextVisible = Math.min(
                            visibleCount + 5,
                            notifications.length
                          );
                          setVisibleCount(nextVisible);
                        } else if (hasMore) {
                          const nextPage = currentPage + 1;
                          setCurrentPage(nextPage);
                          loadNotifications(nextPage, true);
                        }
                      }}
                      disabled={isLoading}
                      className="text-xs font-medium text-amber-600 hover:text-amber-700 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Đang tải..." : "Xem thêm thông báo"}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationDropdown;
