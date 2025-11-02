import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, CircularProgress, Alert, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AnalyticsCards from '../components/AnalyticsCards';
import ComplaintsTable from '../components/ComplaintsTable';
import DepartmentChart from '../components/DepartmentChart';
import AreaChart from '../components/AreaChart';
import { complaintService } from '../services/complaintService';
import { socketService } from '../services/socketService';

const Dashboard = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [analytics, setAnalytics] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [areaData, setAreaData] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Fetch all data
  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');

      // Fetch all data in parallel
      const [analyticsRes, complaintsRes, departmentRes, areaRes] = await Promise.all([
        complaintService.getAnalytics(),
        complaintService.getAllComplaints(),
        complaintService.getDepartmentStats(),
        complaintService.getAreaStats(),
      ]);

      setAnalytics(analyticsRes);
      setComplaints(complaintsRes);
      setDepartmentData(departmentRes);
      setAreaData(areaRes);
      setLastUpdate(new Date());
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load dashboard data. Please check your backend connection.');
    } finally {
      setLoading(false);
    }
  };

  // Setup Socket.IO for real-time updates
  useEffect(() => {
    // Initial data fetch
    fetchData();

    // Connect to socket
    socketService.connect();

    // Listen for new complaints
    socketService.onNewComplaint((newComplaint) => {
      console.log('New complaint received:', newComplaint);
      setComplaints((prev) => [newComplaint, ...prev]);
      // Refresh analytics
      fetchData();
    });

    // Listen for complaint updates
    socketService.onComplaintUpdate((updatedComplaint) => {
      console.log('Complaint updated:', updatedComplaint);
      setComplaints((prev) =>
        prev.map((c) => (c.id === updatedComplaint.id ? updatedComplaint : c))
      );
      // Refresh analytics
      fetchData();
    });

    // Listen for analytics updates
    socketService.onAnalyticsUpdate((newAnalytics) => {
      console.log('Analytics updated:', newAnalytics);
      setAnalytics(newAnalytics);
    });

    // Auto-refresh every 30 seconds as backup
    const interval = setInterval(() => {
      console.log('Auto-refreshing data...');
      fetchData();
    }, 30000); // 30 seconds

    // Cleanup on unmount
    return () => {
      socketService.removeListeners();
      socketService.disconnect();
      clearInterval(interval);
    };
  }, []);

  // Handle manual refresh
  const handleRefresh = () => {
    fetchData();
  };

  if (loading && !analytics) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {t('dashboard.title')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('dashboard.lastUpdate')}: {lastUpdate.toLocaleString('en-IN')}
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Analytics Cards */}
      <Box sx={{ mb: 4 }}>
        <AnalyticsCards analytics={analytics} />
      </Box>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <DepartmentChart departmentData={departmentData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <AreaChart areaData={areaData} />
        </Grid>
      </Grid>

      {/* Complaints Table */}
      <ComplaintsTable
        complaints={complaints}
        onRefresh={handleRefresh}
        onStatusUpdate={fetchData}
      />
    </Container>
  );
};

export default Dashboard;
