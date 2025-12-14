import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Paper, TextField, Button, Typography, Box } from '@mui/material';
import { toast } from 'react-hot-toast'; // <--- Import Toast
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

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        toast.error("Please enter a valid email address.");
        return;
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
        toast.error("Password too weak (Need 8+ chars, 1 Uppercase, 1 Number).");
        return;
    }

    try {
      await api.post('/auth/register', formData);
      toast.success("Staff ID Created Successfully! Please Login."); // <--- Toast Sukses
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', bgcolor: '#F8F9FA' }}>
      <Container maxWidth="xs">
        <Typography variant="h4" fontWeight="700" textAlign="center" mb={1} color={navy} sx={{ fontFamily: 'serif' }}>
          Staff Registration
        </Typography>
        <Typography variant="body2" textAlign="center" mb={4} color="text.secondary">
          Create your digital concierge profile.
        </Typography>

        <Paper elevation={0} sx={{ padding: 5, borderRadius: '12px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF' }}>
          
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
                <Typography variant="caption" fontWeight="600" ml={1} mb={1} color={navy} textTransform="uppercase">Full Name</Typography>
                <TextField fullWidth name="name" placeholder="e.g. Jane Smith" value={formData.name} onChange={handleChange} sx={inputStyle} />
            </Box>

            <Box>
                <Typography variant="caption" fontWeight="600" ml={1} mb={1} color={navy} textTransform="uppercase">Email</Typography>
                <TextField fullWidth name="email" placeholder="staff@hotel.com" value={formData.email} onChange={handleChange} sx={inputStyle} />
            </Box>

            <Box>
                <Typography variant="caption" fontWeight="600" ml={1} mb={1} color={navy} textTransform="uppercase">Password</Typography>
                <TextField fullWidth name="password" type="password" placeholder="Complex Password" value={formData.password} onChange={handleChange} sx={inputStyle} />
            </Box>

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, py: 1.5, borderRadius: '8px', fontSize: '1rem', fontWeight: '600', textTransform: 'none', backgroundColor: navy, '&:hover': { backgroundColor: '#1E293B' } }}>
              Create ID
            </Button>

            <Box textAlign="center" mt={3}>
               <Typography variant="body2" color="#64748B">
                  Already have a Staff ID? <Link to="/login" style={{ textDecoration: 'none', color: gold, fontWeight: '600' }}>Sign in</Link>
               </Typography>
            </Box>

          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default RegisterPage;