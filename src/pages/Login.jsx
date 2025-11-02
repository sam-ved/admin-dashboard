import React, { useState } from 'react';
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  Container,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  PersonOutline,
  LockOutlined,
  Email,
  Phone,
  AccountCircle,
  Language,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { authService } from '../services/authService';

const MotionCard = motion(Card);
const MotionBox = motion(Box);

const Login = ({ onLoginSuccess }) => {
  const { t, i18n } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState(i18n.language);

  const [loginData, setLoginData] = useState({
    identifier: '',
    password: '',
  });

  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    username: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await authService.login(loginData);

    if (result.success) {
      onLoginSuccess();
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      alert('Registration successful! You can now login.');
      setIsLogin(true);
      setSignupData({
        name: '',
        email: '',
        username: '',
        mobile: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        position: 'relative',
        overflow: 'hidden',
        p: 2,
      }}
    >
      {/* Floating Animated Shapes */}
      <MotionBox
        animate={{
          y: [0, -30, 0],
          rotate: [0, 180, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        sx={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
          top: '10%',
          left: '10%',
          filter: 'blur(2px)',
        }}
      />
      <MotionBox
        animate={{
          y: [0, 40, 0],
          rotate: [360, 180, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        sx={{
          position: 'absolute',
          width: 250,
          height: 250,
          borderRadius: '70% 30% 30% 70% / 70% 70% 30% 30%',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
          bottom: '15%',
          right: '15%',
          filter: 'blur(2px)',
        }}
      />
      <MotionBox
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 25, repeat: Infinity }}
        sx={{
          position: 'absolute',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1), transparent)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Main Card Container */}
      <Container maxWidth="sm">
        <MotionCard
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
          sx={{
            position: 'relative',
            zIndex: 1,
            p: 4,
            boxShadow: '0 30px 90px rgba(0,0,0,0.3)',
            borderRadius: 5,
            backdropFilter: 'blur(20px)',
            background: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid rgba(255,255,255,0.3)',
          }}
        >
          {/* Glowing Effect on Card */}
          <Box
            sx={{
              position: 'absolute',
              top: -2,
              left: -2,
              right: -2,
              bottom: -2,
              borderRadius: 5,
              background: 'linear-gradient(135deg, #667eea, #764ba2, #f093fb, #667eea)',
              backgroundSize: '300% 300%',
              animation: 'gradientShift 5s ease infinite',
              zIndex: -1,
              filter: 'blur(10px)',
              opacity: 0.5,
              '@keyframes gradientShift': {
                '0%': { backgroundPosition: '0% 50%' },
                '50%': { backgroundPosition: '100% 50%' },
                '100%': { backgroundPosition: '0% 50%' },
              },
            }}
          />

          {/* Language Selector */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <FormControl size="small" sx={{ minWidth: 130 }}>
              <Select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <Language sx={{ color: '#667eea' }} />
                  </InputAdornment>
                }
                sx={{
                  borderRadius: 2,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#667eea',
                  },
                }}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="hi">हिंदी</MenuItem>
                <MenuItem value="mr">मराठी</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Logo/Icon with Animation */}
          <MotionBox
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            sx={{ textAlign: 'center', mb: 2 }}
          >
            <Box
              sx={{
                width: 100,
                height: 100,
                margin: '0 auto',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
              }}
            >
              <Typography sx={{ fontSize: 50 }}>🏛️</Typography>
            </Box>
          </MotionBox>

          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {t('login.title')}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('login.subtitle')}
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.form
                key="login"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                onSubmit={handleLoginSubmit}
              >
                <Typography variant="h6" gutterBottom sx={{ mb: 2, color: '#333' }}>
                  {t('login.welcome')}
                </Typography>

                <TextField
                  fullWidth
                  label={t('login.identifier')}
                  name="identifier"
                  value={loginData.identifier}
                  onChange={handleLoginChange}
                  margin="normal"
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': {
                        borderColor: '#667eea',
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutline sx={{ color: '#667eea' }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label={t('login.password')}
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={loginData.password}
                  onChange={handleLoginChange}
                  margin="normal"
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': {
                        borderColor: '#667eea',
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined sx={{ color: '#667eea' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <MotionBox
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    disabled={loading}
                    sx={{
                      mt: 3,
                      py: 1.5,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5568d3 0%, #6a4091 100%)',
                        boxShadow: '0 12px 32px rgba(102, 126, 234, 0.6)',
                      },
                      transition: 'all 0.3s',
                    }}
                  >
                    {loading ? '...' : t('login.loginButton')}
                  </Button>
                </MotionBox>

                <Button
                  fullWidth
                  onClick={() => setIsLogin(false)}
                  sx={{
                    mt: 2,
                    color: '#667eea',
                    '&:hover': {
                      background: 'rgba(102, 126, 234, 0.1)',
                    },
                  }}
                >
                  {t('login.switchToSignup')}
                </Button>
              </motion.form>
            ) : (
              <motion.form
                key="signup"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                onSubmit={handleSignupSubmit}
              >
                <Typography variant="h6" gutterBottom sx={{ mb: 2, color: '#333' }}>
                  {t('signup.title')}
                </Typography>

                <TextField
                  fullWidth
                  label={t('signup.name')}
                  name="name"
                  value={signupData.name}
                  onChange={handleSignupChange}
                  margin="normal"
                  required
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': { borderColor: '#667eea' },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle sx={{ color: '#667eea' }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label={t('signup.email')}
                  name="email"
                  type="email"
                  value={signupData.email}
                  onChange={handleSignupChange}
                  margin="normal"
                  required
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': { borderColor: '#667eea' },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: '#667eea' }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label={t('signup.username')}
                  name="username"
                  value={signupData.username}
                  onChange={handleSignupChange}
                  margin="normal"
                  required
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': { borderColor: '#667eea' },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutline sx={{ color: '#667eea' }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label={t('signup.mobile')}
                  name="mobile"
                  value={signupData.mobile}
                  onChange={handleSignupChange}
                  margin="normal"
                  required
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': { borderColor: '#667eea' },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone sx={{ color: '#667eea' }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label={t('signup.password')}
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={signupData.password}
                  onChange={handleSignupChange}
                  margin="normal"
                  required
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': { borderColor: '#667eea' },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined sx={{ color: '#667eea' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label={t('signup.confirmPassword')}
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={signupData.confirmPassword}
                  onChange={handleSignupChange}
                  margin="normal"
                  required
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': { borderColor: '#667eea' },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined sx={{ color: '#667eea' }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <MotionBox whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    disabled={loading}
                    sx={{
                      mt: 3,
                      py: 1.5,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5568d3 0%, #6a4091 100%)',
                        boxShadow: '0 12px 32px rgba(102, 126, 234, 0.6)',
                      },
                    }}
                  >
                    {loading ? '...' : t('login.signupButton')}
                  </Button>
                </MotionBox>

                <Button
                  fullWidth
                  onClick={() => setIsLogin(true)}
                  sx={{
                    mt: 2,
                    color: '#667eea',
                    '&:hover': {
                      background: 'rgba(102, 126, 234, 0.1)',
                    },
                  }}
                >
                  {t('login.switchToLogin')}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </MotionCard>
      </Container>
    </Box>
  );
};

export default Login;
