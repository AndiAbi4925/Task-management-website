import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate allows us to change pages
import { Container, Paper, TextField, Button, Typography, Box, Alert } from '@mui/material';
import api from '../services/api'; // Import our new helper

const inputStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: '#f5f5f7',
    '& fieldset': { border: 'none' },
    '&:hover fieldset': { border: 'none' },
    '&.Mui-focused fieldset': { border: '1px solid #0071e3' },
    '& input': { padding: '16px' },
  },
};

function LoginPage() {
  const navigate = useNavigate();
  // State to store what the user types
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  // Handle typing in the boxes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Send data to Backend
      const response = await api.post('/auth/login', formData);
      
      // 2. If successful, save the token to the browser
      localStorage.setItem('token', response.data.token);
      
      // 3. Go to Dashboard
      navigate('/dashboard');
      
    } catch (err) {
      // If error, show the message from the server
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', bgcolor: '#F5F5F7' }}>
      <Container maxWidth="xs">
        <Typography variant="h3" fontWeight="700" textAlign="center" mb={4} sx={{ letterSpacing: '-0.02em' }}>
          Welcome back.
        </Typography>

        <Paper elevation={0} sx={{ p: 5, borderRadius: '24px', backgroundColor: '#FFFFFF', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
          
          {/* Show Error Message if login fails */}
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
                <Typography variant="body2" fontWeight="600" ml={1} mb={1} color="text.secondary">Email</Typography>
                <TextField fullWidth name="email" onChange={handleChange} sx={inputStyle} />
            </Box>

            <Box>
                <Typography variant="body2" fontWeight="600" ml={1} mb={1} color="text.secondary">Password</Typography>
                <TextField fullWidth name="password" type="password" onChange={handleChange} sx={inputStyle} />
            </Box>

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, py: 1.8, borderRadius: '980px', fontSize: '1.05rem', fontWeight: '600', textTransform: 'none', backgroundColor: '#0071e3', boxShadow: 'none', '&:hover': { backgroundColor: '#0077ED', boxShadow: 'none' } }}>
              Sign In
            </Button>

            <Box textAlign="center" mt={3}>
               <Typography variant="body2" color="#86868b">
                  Don't have an account? <Link to="/register" style={{ textDecoration: 'none', color: '#0071e3', fontWeight: '500' }}>Sign up</Link>
               </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default LoginPage;