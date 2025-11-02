import React, { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import Sidebar from './Sidebar';
import Dashboard from '../pages/Dashboard';

const AppLayout = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar currentPage={currentPage} onPageChange={handlePageChange} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '#f5f7fa',
          minHeight: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar /> {/* Spacer for top */}
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'complaints' && <Dashboard />}
        {currentPage === 'analytics' && <Dashboard />}
      </Box>
    </Box>
  );
};

export default AppLayout;
