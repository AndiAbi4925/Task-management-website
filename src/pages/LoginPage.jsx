import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Paper, TextField, Button, Typography, Box, Alert } from '@mui/material';
import api from '../services/api';

const navy = '#0F172A';
const gold = '#B78628';

const inputStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: '#F8F9FA',
    '&.Mui-focused fieldset': { border: `1px solid ${gold}` },
  },
};

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Simple Email Check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        setError("Please enter a valid staff email.");
        return;
    }

    try {
      const response = await api.post('/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', bgcolor: '#F8F9FA' }}>
      <Container maxWidth="xs">
        <Typography variant="h4" fontWeight="700" textAlign="center" mb={1} color={navy} sx={{ fontFamily: 'serif' }}>
          Concierge Access
        </Typography>
        <Typography variant="body2" textAlign="center" mb={4} color="text.secondary">
          Please log in to manage guest requests.
        </Typography>

        <Paper elevation={0} sx={{ padding: 5, borderRadius: '12px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF' }}>
          
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
                <Typography variant="caption" fontWeight="600" ml={1} mb={1} color={navy} textTransform="uppercase">Email</Typography>
                <TextField fullWidth name="email" placeholder="staff@hotel.com" value={formData.email} onChange={handleChange} sx={inputStyle} />
            </Box>

            <Box>
                <Typography variant="caption" fontWeight="600" ml={1} mb={1} color={navy} textTransform="uppercase">Password</Typography>
                <TextField fullWidth name="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} sx={inputStyle} />
            </Box>

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, py: 1.5, borderRadius: '8px', fontSize: '1rem', fontWeight: '600', textTransform: 'none', backgroundColor: navy, '&:hover': { backgroundColor: '#1E293B' } }}>
              Sign In
            </Button>

            <Box textAlign="center" mt={3}>
               <Typography variant="body2" color="#64748B">
                  New staff member? <Link to="/register" style={{ textDecoration: 'none', color: gold, fontWeight: '600' }}>Create Staff ID</Link>
               </Typography>
            </Box>

          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default LoginPage;