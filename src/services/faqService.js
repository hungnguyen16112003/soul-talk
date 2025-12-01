// FAQ and Comment API Service
import api from '../config/api';

export const faqService = {
  // Get all FAQs
  getFAQs: async () => {
    return await api.get('/faqs');
  },

  // Get single FAQ
  getFAQ: async (id) => {
    return await api.get(`/faqs/${id}`);
  }
};

export const commentService = {
  // Get all comments with pagination
  getComments: async (page = 1, limit = 10) => {
    return await api.get(`/comments?page=${page}&limit=${limit}`);
  },

  // Get single comment
  getComment: async (id) => {
    return await api.get(`/comments/${id}`);
  },

  // Create comment (question)
  createComment: async (question) => {
    return await api.post('/comments', { question });
  },

  // Add reply to comment
  addReply: async (commentId, answer) => {
    return await api.post(`/comments/${commentId}/replies`, { answer });
  },

  // Update comment
  updateComment: async (commentId, question) => {
    return await api.put(`/comments/${commentId}`, { question });
  },

  // Delete comment
  deleteComment: async (commentId) => {
    return await api.delete(`/comments/${commentId}`);
  }
};

export const ratingService = {
  // Get all ratings with pagination
  getRatings: async (page = 1, limit = 10) => {
    return await api.get(`/ratings?page=${page}&limit=${limit}`);
  },

  // Get single rating
  getRating: async (id) => {
    return await api.get(`/ratings/${id}`);
  },

  // Create new rating
  createRating: async (ratingData) => {
    return await api.post('/ratings', ratingData);
  },

  // Update rating
  updateRating: async (id, ratingData) => {
    return await api.put(`/ratings/${id}`, ratingData);
  },

  // Delete rating
  deleteRating: async (id) => {
    return await api.delete(`/ratings/${id}`);
  },

  // Get user's own rating
  getUserRating: async () => {
    return await api.get('/ratings/user/me');
  }
};

