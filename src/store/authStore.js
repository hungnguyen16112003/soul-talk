// Zustand store cho quản lý authentication và user data
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      // State
      user: null,
      isAuthenticated: false,

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

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "soul-talk-auth", // localStorage key
      storage: createJSONStorage(() => localStorage),
      // Chỉ lưu user và isAuthenticated
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
