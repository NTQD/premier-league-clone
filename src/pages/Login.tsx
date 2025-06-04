import React, { useState } from 'react';
import { Box, Button, Container, Paper, Tab, Tabs, TextField, Typography, Divider, Grid, IconButton, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import facebookLogo from '../assets/facebook-logo.svg';
import twitterLogo from '../assets/twitter-logo.svg';
import googleLogo from '../assets/google-logo.svg';
import appleLogo from '../assets/apple-logo.svg';
import Register from './Register';
import Partners from '../components/Partners';

const ADMIN_EMAIL = 'admin@premierleague.com';
const ADMIN_PASSWORD = 'admin123';

const Login = () => {
  const [tab, setTab] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [openSuccess, setOpenSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setError('');
      setOpenSuccess(true);
      setTimeout(() => {
        navigate('/thongtin');
      }, 1500);
    } else {
      setError('Sai email hoặc mật khẩu!');
    }
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'white', py: 8 }}>
      <Snackbar 
        open={openSuccess} 
        autoHideDuration={1500} 
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ 
          position: 'fixed',
          top: '50% !important',
          left: '50% !important',
          transform: 'translate(-50%, -50%) !important',
          width: 'auto',
          minWidth: '300px'
        }}
      >
        <Alert 
          onClose={handleCloseSuccess} 
          severity="success" 
          sx={{ 
            width: '100%',
            fontSize: '1.1rem',
            py: 2,
            '& .MuiAlert-icon': {
              fontSize: '2rem'
            }
          }}
        >
          Đăng nhập thành công!
        </Alert>
      </Snackbar>
      <Container maxWidth="lg">
        <Typography variant="h2" fontWeight={900} color="#fff" sx={{ mb: 4, background: 'linear-gradient(90deg, #37003c 0%, #ff0060 100%)', px: 4, py: 7, borderRadius: 2, minHeight: 120, display: 'flex', alignItems: 'center' }}>
          Your Account
        </Typography>
        <Paper elevation={2} sx={{ p: 0, borderRadius: 2 }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 0, borderBottom: '2px solid #ff0060' }}>
            <Tab label="Sign In" sx={{ fontWeight: 700, color: tab === 0 ? '#fff' : '#37003c', bgcolor: tab === 0 ? '#ff0060' : 'transparent', borderRadius: 0, minWidth: 120 }} />
            <Tab label="Register" sx={{ fontWeight: 700, color: tab === 1 ? '#fff' : '#37003c', bgcolor: tab === 1 ? '#ff0060' : 'transparent', borderRadius: 0, minWidth: 120 }} />
          </Tabs>
          {tab === 0 && (
            <Grid container>
              {/* Left: Login Form */}
              <Grid item xs={12} md={7} sx={{ p: 4, borderRight: { md: '1px solid #eee' } }}>
                <Box component="form" onSubmit={handleLogin} sx={{ maxWidth: 420, mx: 'auto' }}>
                  <Typography fontWeight={700} sx={{ mb: 1, color: '#222' }}>Email Address</Typography>
                  <TextField
                    placeholder="Email Address"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="email"
                    sx={{ mb: 2, bgcolor: '#f5f5f5' }}
                    InputProps={{ style: { fontSize: 18, height: 48 } }}
                  />
                  <Typography fontWeight={700} sx={{ mb: 1, color: '#222' }}>Password</Typography>
                  <Box sx={{ position: 'relative', mb: 2 }}>
                    <TextField
                      placeholder="Password"
                      variant="outlined"
                      fullWidth
                      margin="dense"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      autoComplete="current-password"
                      sx={{ bgcolor: '#f5f5f5' }}
                      InputProps={{ style: { fontSize: 18, height: 48 } }}
                    />
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      sx={{ position: 'absolute', right: 8, top: 8, minWidth: 0, color: '#222', fontWeight: 700 }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography color="#ff0060" fontWeight={600} fontSize={14} sx={{ cursor: 'pointer' }}>Forgot login details?</Typography>
                  </Box>
                  {error && <Typography color="error" mt={1}>{error}</Typography>}
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 1, bgcolor: '#37003c', color: '#fff', fontWeight: 700, fontSize: '1.1rem', py: 1.5, borderRadius: 2, '&:hover': { bgcolor: '#ff0060' } }}
                  >
                    Sign in
                  </Button>
                </Box>
                <Divider sx={{ my: 4 }}>or login with</Divider>
                <Box sx={{ maxWidth: 420, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button fullWidth sx={{ bgcolor: '#1877f3', color: '#fff', fontWeight: 700, fontSize: 16, justifyContent: 'center', alignItems: 'center', pl: 2, boxShadow: 'none', '&:hover': { bgcolor: '#1456b8' } }}>
                    <img src={facebookLogo} alt="Facebook" style={{ width: 28, height: 28, marginRight: 16 }} />
                    Login with Facebook
                  </Button>
                  <Button fullWidth sx={{ bgcolor: '#000', color: '#fff', fontWeight: 700, fontSize: 16, justifyContent: 'center', alignItems: 'center', pl: 2, boxShadow: 'none', '&:hover': { bgcolor: '#222' } }}>
                    <img src={twitterLogo} alt="X" style={{ width: 28, height: 28, marginRight: 16 }} />
                    Login with X
                  </Button>
                  <Button fullWidth sx={{ bgcolor: '#fff', color: '#222', fontWeight: 700, fontSize: 16, border: '1px solid #eee', justifyContent: 'center', alignItems: 'center', pl: 2, boxShadow: 'none', '&:hover': { bgcolor: '#f5f5f5', border: '1px solid #4285F4' } }}>
                    <img src={googleLogo} alt="Google" style={{ width: 28, height: 28, marginRight: 16 }} />
                    Login with Google
                  </Button>
                  <Button fullWidth sx={{ bgcolor: '#000', color: '#fff', fontWeight: 700, fontSize: 16, justifyContent: 'center', alignItems: 'center', pl: 2, boxShadow: 'none', '&:hover': { bgcolor: '#222' } }}>
                    <img src={appleLogo} alt="Apple" style={{ width: 28, height: 28, marginRight: 16 }} />
                    Login with Apple
                  </Button>
                </Box>
              </Grid>
              {/* Right: Register Info */}
              <Grid item xs={12} md={5} sx={{ p: 4, bgcolor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ width: '100%', maxWidth: 350 }}>
                  <Typography fontWeight={700} fontSize={20} sx={{ mb: 2, color: '#222' }}>Don't have a Premier League account?</Typography>
                  <Typography fontSize={15} sx={{ mb: 2, color: '#222' }}>In that case, you are missing out on:</Typography>
                  <ul style={{ color: '#222', fontSize: 15, marginBottom: 20, marginTop: 0, paddingLeft: 20 }}>
                    <li><b>Fantasy Premier League football game</b></li>
                    <li>Exclusive fan services</li>
                    <li>Customised site content</li>
                    <li>Favourite Club information and notifications</li>
                  </ul>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ bgcolor: '#ff0060', color: '#fff', fontWeight: 700, fontSize: 18, py: 1.2, borderRadius: 1, mt: 2, '&:hover': { bgcolor: '#d90050' } }}
                    onClick={() => setTab(1)}
                  >
                    Register
                  </Button>
                </Box>
              </Grid>
            </Grid>
          )}
          {tab === 1 && (
            <Register onComplete={() => setTab(0)} />
          )}
        </Paper>
      </Container>
      <Box sx={{ mt: 8 }}>
        <Partners />
      </Box>
    </Box>
  );
};

export default Login; 