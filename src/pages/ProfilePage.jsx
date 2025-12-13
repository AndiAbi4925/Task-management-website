import { Container, Paper, TextField, Button, Typography, Box, Avatar, Divider, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F5F5F7', py: 8 }}>
      <Container maxWidth="md">
        
        {/* Header with Back Button */}
        <Box display="flex" alignItems="center" mb={4}>
          <Button startIcon={<ArrowBackIcon />} component={Link} to="/dashboard" sx={{ color: '#86868b', textTransform: 'none', mr: 2 }}>
            Back to Dashboard
          </Button>
          <Typography variant="h4" fontWeight="700">Account Settings</Typography>
        </Box>

        <Grid container spacing={4}>
            {/* Left Side: Avatar & Basic Info */}
            <Grid item xs={12} md={4}>
                <Paper elevation={0} sx={{ p: 4, borderRadius: '24px', textAlign: 'center' }}>
                    <Avatar sx={{ width: 100, height: 100, bgcolor: '#0071e3', fontSize: '2.5rem', margin: '0 auto', mb: 2 }}>
                        A
                    </Avatar>
                    <Typography variant="h6" fontWeight="600">Andi Abi</Typography>
                    <Typography variant="body2" color="text.secondary">Product Designer</Typography>
                    <Button variant="outlined" fullWidth sx={{ mt: 3, borderRadius: '20px', textTransform: 'none', borderColor: '#d1d1d6', color: '#1d1d1f' }}>
                        Change Avatar
                    </Button>
                </Paper>
            </Grid>

            {/* Right Side: Edit Form */}
            <Grid item xs={12} md={8}>
                <Paper elevation={0} sx={{ p: 4, borderRadius: '24px' }}>
                    <Typography variant="h6" fontWeight="600" mb={3}>Personal Information</Typography>
                    
                    <Grid container spacing={2} mb={3}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="caption" fontWeight="600" ml={1} mb={1} display="block" color="text.secondary">First Name</Typography>
                            <TextField fullWidth defaultValue="Andi" sx={inputStyle} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="caption" fontWeight="600" ml={1} mb={1} display="block" color="text.secondary">Last Name</Typography>
                            <TextField fullWidth defaultValue="Abi" sx={inputStyle} />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="caption" fontWeight="600" ml={1} mb={1} display="block" color="text.secondary">Email Address</Typography>
                            <TextField fullWidth defaultValue="andi@example.com" sx={inputStyle} />
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 4 }} />

                    <Typography variant="h6" fontWeight="600" mb={3}>Security</Typography>
                    <Box mb={3}>
                         <Typography variant="caption" fontWeight="600" ml={1} mb={1} display="block" color="text.secondary">New Password</Typography>
                         <TextField fullWidth type="password" placeholder="Leave blank to keep current" sx={inputStyle} />
                    </Box>

                    <Box display="flex" justifyContent="flex-end" gap={2}>
                        <Button sx={{ color: '#86868b', textTransform: 'none', fontWeight: '600' }}>Cancel</Button>
                        <Button variant="contained" sx={{ bgcolor: '#0071e3', borderRadius: '20px', px: 4, textTransform: 'none', fontWeight: '600', boxShadow: 'none' }}>
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