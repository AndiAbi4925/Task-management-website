import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Paper, TextField, Button, Typography, Box, Alert } from '@mui/material';
import api from '../services/api';

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

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing again
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // --- 1. Validation Checks ---
    
    // Email Check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        setError("Please enter a valid email address.");
        return;
    }

    // Password Check: 8 chars, 1 Uppercase, 1 Number
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
        setError("Password must be at least 8 characters long, contain 1 Uppercase letter, and 1 Number.");
        return;
    }

    // --- 2. Send to Backend ---
    try {
      await api.post('/auth/register', formData);
      alert("Account created! Please log in.");
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', bgcolor: '#F5F5F7' }}>
      <Container maxWidth="xs">
        <Typography variant="h3" fontWeight="700" textAlign="center" mb={4} sx={{ letterSpacing: '-0.02em' }}>
          Create account.
        </Typography>

        <Paper elevation={0} sx={{ padding: 5, borderRadius: '24px', backgroundColor: '#FFFFFF', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
          
          {/* Error Alert */}
          {error && <Alert severity="error" sx={{ mb: 2, borderRadius: '12px' }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
                <Typography variant="body2" fontWeight="600" ml={1} mb={1} color="text.secondary">Full Name</Typography>
                <TextField fullWidth name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} sx={inputStyle} />
            </Box>

            <Box>
                <Typography variant="body2" fontWeight="600" ml={1} mb={1} color="text.secondary">Email</Typography>
                <TextField fullWidth name="email" placeholder="name@example.com" value={formData.email} onChange={handleChange} sx={inputStyle} />
            </Box>

            <Box>
                <Typography variant="body2" fontWeight="600" ml={1} mb={1} color="text.secondary">Password</Typography>
                <TextField fullWidth name="password" type="password" placeholder="8+ chars, 1 Upper, 1 Number" value={formData.password} onChange={handleChange} sx={inputStyle} />
            </Box>

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, py: 1.8, borderRadius: '980px', fontSize: '1.05rem', fontWeight: '600', textTransform: 'none', backgroundColor: '#0071e3', boxShadow: 'none', '&:hover': { backgroundColor: '#0077ED', boxShadow: 'none' } }}>
              Sign Up
            </Button>

            <Box textAlign="center" mt={3}>
               <Typography variant="body2" color="#86868b">
                  Already have an account? <Link to="/login" style={{ textDecoration: 'none', color: '#0071e3', fontWeight: '500' }}>Sign in</Link>
               </Typography>
            </Box>

          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default RegisterPage;