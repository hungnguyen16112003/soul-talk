// Content API Service (Charity, Scholarship, HealthCare, CareerGuidance, SuccessStory)
import api from '../config/api';

export const contentService = {
  // Charities
  getCharities: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.region) params.append('region', filters.region);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);
    return await api.get(`/charities?${params.toString()}`);
  },

  getCharity: async (id) => {
    return await api.get(`/charities/${id}`);
  },

  // Scholarships
  getScholarships: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.region) params.append('region', filters.region);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);
    return await api.get(`/scholarships?${params.toString()}`);
  },

  getScholarship: async (id) => {
    return await api.get(`/scholarships/${id}`);
  },

  // Healthcare
  getHealthCares: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.region) params.append('region', filters.region);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);
    return await api.get(`/healthcare?${params.toString()}`);
  },

  getHealthCare: async (id) => {
    return await api.get(`/healthcare/${id}`);
  },

  // Career Guidance
  getCareerGuidances: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.region) params.append('region', filters.region);
    if (filters.location) params.append('location', filters.location);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);
    return await api.get(`/career-guidance?${params.toString()}`);
  },

  getCareerGuidance: async (id) => {
    return await api.get(`/career-guidance/${id}`);
  },

  // Success Stories
  getSuccessStories: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.region) params.append('region', filters.region);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);
    return await api.get(`/success-stories?${params.toString()}`);
  },

  getSuccessStory: async (id) => {
    return await api.get(`/success-stories/${id}`);
  }
};

