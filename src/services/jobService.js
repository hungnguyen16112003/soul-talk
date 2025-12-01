// Job API Service
import api from '../config/api';

export const jobService = {
  // Get all jobs with filters
  getJobs: async (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.search) params.append('search', filters.search);
    if (filters.category) params.append('category', filters.category);
    if (filters.disabilityType) params.append('disabilityType', filters.disabilityType);
    if (filters.severityLevel) params.append('severityLevel', filters.severityLevel);
    if (filters.location) params.append('location', filters.location);
    if (filters.status) params.append('status', filters.status);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);

    return await api.get(`/jobs?${params.toString()}`);
  },

  // Get single job
  getJob: async (id) => {
    return await api.get(`/jobs/${id}`);
  },

  // Create job (employer only)
  createJob: async (jobData) => {
    return await api.post('/jobs', jobData);
  },

  // Update job (employer only)
  updateJob: async (id, jobData) => {
    return await api.put(`/jobs/${id}`, jobData);
  },

  // Delete job (employer only)
  deleteJob: async (id) => {
    return await api.delete(`/jobs/${id}`);
  },

  // Get employer's jobs
  getMyJobs: async () => {
    return await api.get('/jobs/employer/my-jobs');
  },

  // Get job statistics
  getJobStats: async () => {
    return await api.get('/jobs/employer/stats');
  }
};

