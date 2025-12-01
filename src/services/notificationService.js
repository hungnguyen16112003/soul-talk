// Notification API Service
import api from '../config/api';

export const notificationService = {
  // Get all notifications
  getNotifications: async (params = {}) => {
    const queryParams = new URLSearchParams();
    if (params.read !== undefined) {
      queryParams.append('read', params.read);
    }
    if (params.limit) {
      queryParams.append('limit', params.limit);
    }
    const queryString = queryParams.toString();
    return await api.get(`/notifications${queryString ? `?${queryString}` : ''}`);
  },

  // Get unread count
  getUnreadCount: async () => {
    return await api.get('/notifications/unread-count');
  },

  // Mark notification as read
  markAsRead: async (notificationId) => {
    return await api.put(`/notifications/${notificationId}/read`);
  },

  // Mark all notifications as read
  markAllAsRead: async () => {
    return await api.put('/notifications/read-all');
  },

  // Delete notification
  deleteNotification: async (notificationId) => {
    return await api.delete(`/notifications/${notificationId}`);
  },
};


