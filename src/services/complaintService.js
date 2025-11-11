import api from './api';

export const complaintService = {
  // Existing functions...
  getAllComplaints: async () => {
    const response = await api.get('/complaints/view');
    return response.data;
  },

  getAnalytics: async () => {
    const response = await api.get('/analytics/dashboard');
    return response.data;
  },

  getDepartmentStats: async () => {
    const response = await api.get('/analytics/by-department');
    return response.data;
  },

  getAreaStats: async () => {
    const response = await api.get('/heatmap/area-stats');
    return response.data;
  },

  updateComplaintStatus: async (complaintId, status) => {
    const response = await api.put(`/complaints/${complaintId}/status`, {
      newStatus: status,
    });
    return response.data;
  },

  // NEW: Advanced Analytics Functions
  getFilteredAnalytics: async (timeFilter, areaFilter, departmentFilter) => {
    const response = await api.get('/complaints/analytics/filtered', {
      params: {
        timeFilter,
        areaFilter: areaFilter !== 'all' ? areaFilter : undefined,
        departmentFilter: departmentFilter !== 'all' ? departmentFilter : undefined,
      },
    });
    return response.data;
  },

  getTrendData: async (period) => {
    const response = await api.get(`/complaints/analytics/trends/${period}`);
    return response.data;
  },

  getResponseTimeStats: async () => {
    const response = await api.get('/complaints/analytics/response-time');
    return response.data;
  },
};
