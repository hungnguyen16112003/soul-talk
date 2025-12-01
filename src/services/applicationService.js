// Application API Service
import api from '../config/api';

export const applicationService = {
  // Apply for job
  createApplication: async (jobId, cvId, coverLetter) => {
    return await api.post('/applications', {
      jobId,
      cvId,
      coverLetter
    });
  },

  // Get my applications (job seeker) with optional pagination
  getMyApplications: async (params = {}) => {
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.append('page', params.page);
    if (params.limit) searchParams.append('limit', params.limit);
    const query = searchParams.toString();
    const url = query
      ? `/applications/my-applications?${query}`
      : '/applications/my-applications';
    return await api.get(url);
  },

  // Get all applications for employer
  getAllEmployerApplications: async () => {
    return await api.get('/applications/employer/all');
  },

  // Get applications for a job
  getJobApplications: async (jobId) => {
    return await api.get(`/applications/job/${jobId}`);
  },

  // Get single application
  getApplication: async (id) => {
    return await api.get(`/applications/${id}`);
  },

  // Update application status
  updateApplicationStatus: async (id, status, notes) => {
    return await api.put(`/applications/${id}/status`, {
      status,
      notes
    });
  }
};

