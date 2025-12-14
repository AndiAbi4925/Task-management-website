import { useEffect, useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Box, Avatar, Divider, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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

function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', title: '', password: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/auth/me');
        const user = response.data;
        const names = user.name ? user.name.split(' ') : ['',''];
        setFormData({
          firstName: names[0] || '',
          lastName: names.slice(1).join(' ') || '',
          email: user.email || '',
          title: user.title || 'Concierge Staff', // Default Title Updated
          password: '' 
        });
      } catch (error) {
        alert("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await api.put('/auth/profile', formData);
      alert("Staff profile updated successfully!");
    } catch (error) {
      alert("Failed to update profile.");
    }
  };

  if (loading) return <Typography sx={{p:5}}>Loading profile...</Typography>;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F8F9FA', py: 8 }}>
      <Container maxWidth="md">
        
        <Box display="flex" alignItems="center" mb={4}>
          <Button startIcon={<ArrowBackIcon />} component={Link} to="/dashboard" sx={{ color: '#64748B', textTransform: 'none', mr: 2 }}>
            Back to Requests
          </Button>
          <Typography variant="h4" fontWeight="700" color={navy} sx={{ fontFamily: 'serif' }}>Staff Settings</Typography>
        </Box>

        <Grid container spacing={4}>
            {/* Left Side: Avatar */}
            <Grid item xs={12} md={4}>
                <Paper elevation={0} sx={{ p: 4, borderRadius: '12px', textAlign: 'center', border: '1px solid #E2E8F0' }}>
                    <Avatar sx={{ width: 100, height: 100, bgcolor: gold, fontSize: '2.5rem', margin: '0 auto', mb: 2 }}>
                        {formData.firstName[0]}
                    </Avatar>
                    <Typography variant="h6" fontWeight="600" color={navy}>{formData.firstName} {formData.lastName}</Typography>
                    <Typography variant="body2" color="text.secondary">{formData.title}</Typography>
                </Paper>
            </Grid>

            {/* Right Side: Edit Form */}
            <Grid item xs={12} md={8}>
                <Paper elevation={0} sx={{ p: 4, borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <Typography variant="h6" fontWeight="600" mb={3} color={navy}>Staff Information</Typography>
                    
                    <Grid container spacing={2} mb={3}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="caption" fontWeight="600" ml={1} mb={1} display="block" color={navy}>First Name</Typography>
                            <TextField fullWidth name="firstName" value={formData.firstName} onChange={handleChange} sx={inputStyle} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="caption" fontWeight="600" ml={1} mb={1} display="block" color={navy}>Last Name</Typography>
                            <TextField fullWidth name="lastName" value={formData.lastName} onChange={handleChange} sx={inputStyle} />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="caption" fontWeight="600" ml={1} mb={1} display="block" color={navy}>Email Address</Typography>
                            <TextField fullWidth name="email" value={formData.email} onChange={handleChange} sx={inputStyle} />
                        </Grid>
                         <Grid item xs={12}>
                            <Typography variant="caption" fontWeight="600" ml={1} mb={1} display="block" color={navy}>Job Title / Role</Typography>
                            <TextField fullWidth name="title" value={formData.title} onChange={handleChange} sx={inputStyle} />
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 4 }} />

                    <Typography variant="h6" fontWeight="600" mb={3} color={navy}>Security</Typography>
                    <Box mb={3}>
                         <Typography variant="caption" fontWeight="600" ml={1} mb={1} display="block" color={navy}>Update Password</Typography>
                         <TextField fullWidth type="password" name="password" placeholder="Leave blank to keep current" value={formData.password} onChange={handleChange} sx={inputStyle} />
                    </Box>

                    <Box display="flex" justifyContent="flex-end" gap={2}>
                        <Button component={Link} to="/dashboard" sx={{ color: '#64748B', textTransform: 'none', fontWeight: '600' }}>Cancel</Button>
                        <Button onClick={handleSave} variant="contained" sx={{ bgcolor: navy, borderRadius: '8px', px: 4, textTransform: 'none', fontWeight: '600', '&:hover': { bgcolor: '#1E293B' } }}>
                            Save Changes
                        </Button>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProfilePage;