// Zustand store cho quản lý authentication và user data
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { authService } from "../services/authService";

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      isAuthenticated: false,
      selectedRegion: null,
      userPreferences: null,
      token: null,

      // Actions
      login: async (email, password, role) => {
        try {
          const response = await authService.login(email, password, role);

          if (response && response.success && response.data) {
            const userData = response.data.user;
            const userRoles = userData.roles || [userData.role];
            const currentRole = userData.role || role || userRoles[0];

            const userInfo = {
              id: userData.id || userData._id || userData.id,
              name: userData.name,
              email: userData.email,
              phone: userData.phone,
              role: currentRole,
              roles: userRoles,
              avatar: userData.avatar,
              disabilityType: userData.disabilityType,
              severityLevel: userData.severityLevel,
              region: userData.region,
              loginTime: new Date().toISOString(),
            };

            // Ensure token is saved
            if (response.data.token) {
              localStorage.setItem("token", response.data.token);
            }

            // Lưu role hiện tại vào localStorage
            localStorage.setItem("current-role", currentRole);

            set({
              user: userInfo,
              isAuthenticated: true,
              token: response.data.token,
            });

            // Đánh dấu đã đăng nhập để không hiển thị modal
            localStorage.setItem("preferences-completed", "true");

            return { success: true };
          }

          const errorMsg =
            response?.error || response?.message || "Đăng nhập thất bại";
          return { success: false, error: errorMsg };
        } catch (error) {
          // Extract error message
          let errorMsg =
            "Có lỗi xảy ra khi đăng nhập. Vui lòng kiểm tra backend có đang chạy không.";
          if (error?.error) {
            errorMsg = error.error;
          } else if (error?.message) {
            errorMsg = error.message;
          }

          return { success: false, error: errorMsg };
        }
      },

      register: async (userData) => {
        try {
          const response = await authService.register(userData);

          if (response && response.success && response.data) {
            const userDataFromResponse = response.data.user;
            const userRoles = userDataFromResponse.roles || [
              userDataFromResponse.role,
            ];
            const currentRole = userDataFromResponse.role || userRoles[0];

            const userInfo = {
              id:
                userDataFromResponse.id ||
                userDataFromResponse._id ||
                userDataFromResponse.id,
              name: userDataFromResponse.name,
              email: userDataFromResponse.email,
              phone: userDataFromResponse.phone,
              role: currentRole,
              roles: userRoles,
              avatar: userDataFromResponse.avatar,
              disabilityType: userDataFromResponse.disabilityType,
              severityLevel: userDataFromResponse.severityLevel,
              region: userDataFromResponse.region,
              registerTime: new Date().toISOString(),
              loginTime: new Date().toISOString(),
            };

            // Ensure token is saved
            if (response.data.token) {
              localStorage.setItem("token", response.data.token);
            }

            // Lưu role hiện tại vào localStorage
            localStorage.setItem("current-role", currentRole);

            set({
              user: userInfo,
              isAuthenticated: true,
              token: response.data.token,
            });

            // Đánh dấu đã đăng nhập để không hiển thị modal
            localStorage.setItem("preferences-completed", "true");

            return { success: true };
          }

          // Handle response without success
          const errorMsg =
            response?.error || response?.message || "Đăng ký thất bại";
          return { success: false, error: errorMsg };
        } catch (error) {
          // Extract error message
          let errorMsg =
            "Có lỗi xảy ra khi đăng ký. Vui lòng kiểm tra backend có đang chạy không.";
          if (error?.error) {
            errorMsg = error.error;
          } else if (error?.message) {
            errorMsg = error.message;
          }

          return { success: false, error: errorMsg };
        }
      },

      // Load user from token on app start
      loadUser: async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            set({ user: null, isAuthenticated: false, token: null });
            return;
          }

          const response = await authService.getMe();
          if (response && response.success && response.data) {
            const userData = response.data.user;
            // Lấy role từ localStorage nếu có (role đã chọn khi login), nếu không thì lấy từ API
            const savedRole = localStorage.getItem("current-role");
            const userRoles = userData.roles || [];
            let currentRole =
              savedRole && userRoles.includes(savedRole)
                ? savedRole
                : userData.role || userRoles[0] || "jobseeker";

            // Nếu admin và không có role saved, ưu tiên employer
            if (userRoles.includes("admin") && !savedRole) {
              currentRole = userRoles.includes("employer")
                ? "employer"
                : userRoles[0] || "jobseeker";
            }

            const userInfo = {
              id: userData.id || userData._id || userData.id,
              name: userData.name,
              email: userData.email,
              phone: userData.phone,
              role: currentRole,
              roles: userRoles,
              avatar: userData.avatar,
              disabilityType: userData.disabilityType,
              severityLevel: userData.severityLevel,
              region: userData.region,
              preferences: userData.preferences,
              companyName: userData.companyName,
              companyAddress: userData.companyAddress,
              companyWebsite: userData.companyWebsite,
            };

            // Lưu role hiện tại vào localStorage
            localStorage.setItem("current-role", currentRole);

            set({
              user: userInfo,
              isAuthenticated: true,
              token: token,
            });
          } else {
            set({ user: null, isAuthenticated: false, token: null });
            localStorage.removeItem("token");
          }
        } catch (error) {
          set({ user: null, isAuthenticated: false, token: null });
          localStorage.removeItem("token");
        }
      },

      setSelectedRegion: (region) => {
        set({ selectedRegion: region });
      },

      setUserPreferences: (preferences) => {
        // Không persist preferences, chỉ lưu trong memory cho session hiện tại
        set({ userPreferences: preferences });
      },

      updateUser: (userData) => {
        // Update user data in store
        set((state) => ({
          user: {
            ...state.user,
            ...userData,
          },
        }));
      },

      logout: () => {
        authService.logout();
        localStorage.removeItem("current-role"); // Xóa role khi logout
        set({
          user: null,
          isAuthenticated: false,
          selectedRegion: null,
          token: null,
          // KHÔNG xóa userPreferences khi logout để modal không hiển thị lại
          // userPreferences: null,
        });
        // KHÔNG xóa preferences-completed để modal không hiển thị lại sau logout
        // localStorage.removeItem('preferences-completed');
      },
    }),
    {
      name: "soul-talk-auth", // localStorage key
      storage: createJSONStorage(() => localStorage),
      // Chỉ lưu user, isAuthenticated, selectedRegion
      partialize: (state) => {
        return {
          user: state.user,
          isAuthenticated: state.isAuthenticated,
          selectedRegion: state.selectedRegion,
        };
      },
    }
  )
);

export default useAuthStore;
