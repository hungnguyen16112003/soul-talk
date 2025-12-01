// User API Service
import api from '../config/api';

export const userService = {
  // Get user profile
  getProfile: async () => {
    return await api.get('/users/profile');
  },

  // Update user profile
  updateProfile: async (profileData, avatarFile) => {
    if (avatarFile) {
      const formData = new FormData();
      Object.keys(profileData).forEach(key => {
        if (profileData[key] !== undefined) {
          formData.append(key, profileData[key]);
        }
      });
      formData.append('avatar', avatarFile);

      return await api.put('/users/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } else {
      return await api.put('/users/profile', profileData);
    }
  },

  // Update user preferences
  updatePreferences: async (preferences) => {
    return await api.put('/users/preferences', preferences);
  },

  // Change password
  changePassword: async (passwordData) => {
    return await api.put('/users/change-password', passwordData);
  }
};

