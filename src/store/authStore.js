// Zustand store cho quản lý authentication và user data
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      // State
      user: null,
      isAuthenticated: false,
      selectedRegion: null,
      userPreferences: null,

      // Actions
      login: (userData) => {
        const userInfo = {
          ...userData,
          loginTime: new Date().toISOString(),
        };
        set({
          user: userInfo,
          isAuthenticated: true,
        });
      },

      register: (userData) => {
        const userInfo = {
          ...userData,
          registerTime: new Date().toISOString(),
          loginTime: new Date().toISOString(),
        };
        set({
          user: userInfo,
          isAuthenticated: true,
        });
      },

      setSelectedRegion: (region) => {
        set({ selectedRegion: region });
      },

      setUserPreferences: (preferences) => {
        set({ userPreferences: preferences });
        // Zustand persist sẽ tự động lưu vào localStorage với key "soul-talk-auth"
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          selectedRegion: null,
          // KHÔNG xóa userPreferences khi logout để modal không hiển thị lại
          // userPreferences: null,
        });
      },
    }),
    {
      name: "soul-talk-auth", // localStorage key
      storage: createJSONStorage(() => localStorage),
      // Chỉ lưu user, isAuthenticated, selectedRegion và userPreferences
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        selectedRegion: state.selectedRegion,
        userPreferences: state.userPreferences,
      }),
    }
  )
);

export default useAuthStore;
