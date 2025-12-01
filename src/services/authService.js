// Authentication API Service
import api from '../config/api';

export const authService = {
  // Register new user
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      
      if (response && response.success && response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response;
    } catch (error) {
      // Re-throw để authStore có thể xử lý
      throw error;
    }
  },

  // Login user
  login: async (email, password, role) => {
    try {
      const response = await api.post('/auth/login', { email, password, role });
      
      if (response && response.success && response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response;
    } catch (error) {
      // Re-throw để authStore có thể xử lý
      throw error;
    }
  },

  // Get current user
  getMe: async () => {
    return await api.get('/auth/me');
  },

  // Logout (clear token)
  logout: () => {
    localStorage.removeItem('token');
  }
};

