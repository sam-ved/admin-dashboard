import React, { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import Sidebar from './Sidebar';
import Dashboard from '../pages/Dashboard';
import Complaints from '../pages/Complaints'; // Import the new Complaints page
import Analytics from '../pages/Analytics'; // Import the Analytics page

const AppLayout = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // This function now renders the correct page based on state
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onPageChange={handlePageChange} />;
      case 'complaints':
        return <Complaints />;
      case 'analytics':
        return <Analytics />;
      default:
        return <Dashboard onPageChange={handlePageChange} />;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar currentPage={currentPage} onPageChange={handlePageChange} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default', // Use theme background color
          minHeight: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar /> {/* Spacer for top */}
        {/* Call the renderPage function */}
        {renderPage()}
      </Box>
    </Box>
  );
};

export default AppLayout;