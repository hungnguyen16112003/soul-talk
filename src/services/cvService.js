// CV API Service
import api from '../config/api';

export const cvService = {
  // Get all CVs
  getCVs: async () => {
    return await api.get('/cvs');
  },

  // Get single CV
  getCV: async (id) => {
    return await api.get(`/cvs/${id}`);
  },

  // Upload CV file
  uploadCV: async (file, name) => {
    const formData = new FormData();
    formData.append('cv', file);
    if (name) formData.append('name', name);

    return await api.post('/cvs', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Create CV from HTML form
  createCV: async (cvData) => {
    return await api.post('/cvs/create', cvData);
  },

  // Set default CV
  setDefaultCV: async (id) => {
    return await api.put(`/cvs/${id}/set-default`);
  },

  // Delete CV
  deleteCV: async (id) => {
    return await api.delete(`/cvs/${id}`);
  },

  // Download CV
  downloadCV: async (id) => {
    const baseURL = api.defaults.baseURL || 'http://localhost:5000/api';
    const response = await fetch(`${baseURL}/cvs/${id}/download`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Download failed');
    }
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CV-${id}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
};

