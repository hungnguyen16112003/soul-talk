// Data Cache Store - Cache dữ liệu để tránh tải lại khi chuyển trang
import { create } from "zustand";

const CACHE_DURATION = 5 * 60 * 1000; // 5 phút

const useDataCacheStore = create((set, get) => ({
  // Cache data với structure: { data: [...], timestamp: Date, filters: {...} }
  cache: {
    jobs: null,
    charities: null,
    scholarships: null,
    healthcare: null,
    careerGuidance: null,
    successStories: null,
    faqs: null,
    comments: null,
  },

  // Set cache data
  setCache: (key, data, filters = {}) => {
    set((state) => ({
      cache: {
        ...state.cache,
        [key]: {
          data,
          timestamp: Date.now(),
          filters,
        },
      },
    }));
  },

  // Get cache data nếu còn valid
  getCache: (key, filters = {}) => {
    const cached = get().cache[key];
    if (!cached) return null;

    // Kiểm tra xem cache có hết hạn không
    const isExpired = Date.now() - cached.timestamp > CACHE_DURATION;

    // Kiểm tra xem filters có thay đổi không
    const filtersChanged =
      JSON.stringify(cached.filters) !== JSON.stringify(filters);

    if (isExpired || filtersChanged) {
      return null;
    }

    return cached.data;
  },

  // Clear cache cho một key cụ thể
  clearCache: (key) => {
    set((state) => ({
      cache: {
        ...state.cache,
        [key]: null,
      },
    }));
  },

  // Clear tất cả cache
  clearAllCache: () => {
    set({
      cache: {
        jobs: null,
        charities: null,
        scholarships: null,
        healthcare: null,
        careerGuidance: null,
        successStories: null,
        faqs: null,
        comments: null,
      },
    });
  },
}));

export default useDataCacheStore;


