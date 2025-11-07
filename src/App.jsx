import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Login from './pages/Login';
import AppLayout from './components/AppLayout';
import { authService } from './services/authService';
import './i18n'; // Import i18n configuration

// Create Material-UI theme
// ... other imports
import './i18n'; 

// START: REPLACE your old theme with this
const theme = createTheme({
  palette: {
    mode: 'light', // Set a consistent light mode
    primary: {
      main: '#3f51b5', // A professional Material UI blue
      light: '#7986cb',
      dark: '#303f9f',
    },
    secondary: {
      main: '#f50057', // A strong accent color
      light: '#ff4081',
      dark: '#c51162',
    },
    background: {
      default: '#f5f7fa', // A light gray for the page background
      paper: '#ffffff', // For Cards, DataGrids, Sidebar
    },
    text: {
      primary: '#111827',   // Darker text for headings
      secondary: '#6b7285', // Lighter gray for body text
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      fontSize: '2.125rem',
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    // Add component overrides for a consistent look
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)', // Softer, consistent shadow
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8, // Match button/card radius
          },
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none', // Remove the default border
          '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
            outline: 'none', // Remove the blue outline on click
          },
          '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': {
            outline: 'none', // Remove the blue outline on click
          },
        },
        columnHeader: {
          backgroundColor: '#f5f7fa', // Match the page background
          fontWeight: 700,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Match other inputs
        },
      },
    },
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const authenticated = authService.isAuthenticated();
    setIsAuthenticated(authenticated);
    setLoading(false);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  if (loading) {
    return null; // Or a loading spinner
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isAuthenticated ? (
        <AppLayout />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </ThemeProvider>
  );
}

export default App;
