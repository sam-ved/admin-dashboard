import api from './api';

export const complaintService = {
  // Existing functions...
  getAllComplaints: async () => {
    const response = await api.get('/complaints');
    return response.data;
  },

  getAnalytics: async () => {
    const response = await api.get('/complaints/analytics');
    return response.data;
  },

  getDepartmentStats: async () => {
    const response = await api.get('/complaints/department-stats');
    return response.data;
  },

  getAreaStats: async () => {
    const response = await api.get('/complaints/area-stats');
    return response.data;
  },

  updateComplaintStatus: async (complaintId, status) => {
    const response = await api.patch(`/complaints/${complaintId}/status`, {
      status,
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
