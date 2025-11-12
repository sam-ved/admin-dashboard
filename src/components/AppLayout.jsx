import React, { useState } from 'react';
import { Box, Toolbar, Container } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header'; // Import Header
import Footer from './Footer'; // Import Footer
import Dashboard from '../pages/Dashboard';
import Complaints from '../pages/Complaints';
import Analytics from '../pages/Analytics';

const AppLayout = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
      {/* Header is now added */}
      <Header />
      
      <Sidebar currentPage={currentPage} onPageChange={handlePageChange} />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          minHeight: '100vh',
          overflow: 'auto',
          // Use flexbox to make the Footer stick to the bottom
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* This Toolbar acts as a spacer for the fixed Header */}
        <Toolbar /> 
        
        {/* This Container holds the page content */}
        <Container maxWidth="xl" sx={{ py: 4, flexGrow: 1 }}>
          {renderPage()}
        </Container>
        
        {/* Footer is now added */}
        <Footer />
      </Box>
    </Box>
  );
};

export default AppLayout;