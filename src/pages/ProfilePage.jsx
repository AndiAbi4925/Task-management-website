import { useEffect, useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Box, Avatar, Divider, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import api from '../services/api'; // Import your API helper

const inputStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: '#f5f5f7',
    '& fieldset': { border: 'none' },
    '&:hover fieldset': { border: 'none' },
    '&.Mui-focused fieldset': { border: '1px solid #0071e3' },
  },
};

function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    title: '',
    password: ''
  });

  // 1. Fetch User Data on Load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/auth/me');
        const user = response.data;
        
        // Split "Andi Abi" into "Andi" and "Abi" for the inputs
        const names = user.name ? user.name.split(' ') : ['',''];
        
        setFormData({
          firstName: names[0] || '',
          lastName: names.slice(1).join(' ') || '',
          email: user.email || '',
          title: user.title || 'Product Designer', // Default if empty
          password: '' // Keep password empty
        });
      } catch (error) {
        alert("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // 2. Handle Typing
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle Save
  const handleSave = async () => {
    try {
      await api.put('/auth/profile', formData);
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Failed to update profile.");
    }
  };

  if (loading) return <Typography sx={{p:5}}>Loading profile...</Typography>;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F5F5F7', py: 8 }}>
      <Container maxWidth="md">
        
        <Box display="flex" alignItems="center" mb={4}>
          <Button startIcon={<ArrowBackIcon />} component={Link} to="/dashboard" sx={{ color: '#86868b', textTransform: 'none', mr: 2 }}>
            Back to Dashboard
          </Button>
          <Typography variant="h4" fontWeight="700">Account Settings</Typography>
        </Box>

        <Grid container spacing={4}>
            {/* Left Side: Avatar */}
            <Grid item xs={12} md={4}>
                <Paper elevation={0} sx={{ p: 4, borderRadius: '24px', textAlign: 'center' }}>
                    <Avatar sx={{ width: 100, height: 100, bgcolor: '#0071e3', fontSize: '2.5rem', margin: '0 auto', mb: 2 }}>
                        {formData.firstName[0]}
                    </Avatar>
                    <Typography variant="h6" fontWeight="600">{formData.firstName} {formData.lastName}</Typography>
                    <Typography variant="body2" color="text.secondary">{formData.title}</Typography>
                </Paper>
            </Grid>

            {/* Right Side: Edit Form */}
            <Grid item xs={12} md={8}>
                <Paper elevation={0} sx={{ p: 4, borderRadius: '24px' }}>
                    <Typography variant="h6" fontWeight="600" mb={3}>Personal Information</Typography>
                    
                    <Grid container spacing={2} mb={3}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="caption" fontWeight="600" ml={1} mb={1} display="block" color="text.secondary">First Name</Typography>
                            <TextField 
                                fullWidth name="firstName" value={formData.firstName} onChange={handleChange} sx={inputStyle} 
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="caption" fontWeight="600" ml={1} mb={1} display="block" color="text.secondary">Last Name</Typography>
                            <TextField 
                                fullWidth name="lastName" value={formData.lastName} onChange={handleChange} sx={inputStyle} 
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="caption" fontWeight="600" ml={1} mb={1} display="block" color="text.secondary">Email Address</Typography>
                            <TextField 
                                fullWidth name="email" value={formData.email} onChange={handleChange} sx={inputStyle} 
                            />
                        </Grid>
                        {/* NEW TITLE INPUT */}
                         <Grid item xs={12}>
                            <Typography variant="caption" fontWeight="600" ml={1} mb={1} display="block" color="text.secondary">Job Title</Typography>
                            <TextField 
                                fullWidth name="title" value={formData.title} onChange={handleChange} sx={inputStyle} 
                            />
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 4 }} />

                    <Typography variant="h6" fontWeight="600" mb={3}>Security</Typography>
                    <Box mb={3}>
                         <Typography variant="caption" fontWeight="600" ml={1} mb={1} display="block" color="text.secondary">New Password</Typography>
                         <TextField 
                            fullWidth type="password" name="password" placeholder="Leave blank to keep current" 
                            value={formData.password} onChange={handleChange} sx={inputStyle} 
                         />
                    </Box>

                    <Box display="flex" justifyContent="flex-end" gap={2}>
                        <Button component={Link} to="/dashboard" sx={{ color: '#86868b', textTransform: 'none', fontWeight: '600' }}>Cancel</Button>
                        <Button 
                            onClick={handleSave}
                            variant="contained" sx={{ bgcolor: '#0071e3', borderRadius: '20px', px: 4, textTransform: 'none', fontWeight: '600', boxShadow: 'none' }}>
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