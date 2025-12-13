import { Link } from 'react-router-dom';
import { Container, Paper, TextField, Button, Typography, Box } from '@mui/material';

// Reusing the clean input style
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
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', bgcolor: '#F5F5F7' }}>
      <Container maxWidth="xs">
        
        <Typography variant="h3" fontWeight="700" textAlign="center" mb={4} sx={{ letterSpacing: '-0.02em' }}>
          Create account.
        </Typography>

        <Paper elevation={0} sx={{
          padding: 5,
          borderRadius: '24px',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        }}>
          
          <Box component="form" noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            
            <Box>
                <Typography variant="body2" fontWeight="600" ml={1} mb={1} color="text.secondary">Full Name</Typography>
                <TextField fullWidth id="name" name="name" placeholder="John Doe" sx={inputStyle} />
            </Box>

            <Box>
                <Typography variant="body2" fontWeight="600" ml={1} mb={1} color="text.secondary">Email</Typography>
                <TextField fullWidth id="email" name="email" placeholder="name@example.com" sx={inputStyle} />
            </Box>

            <Box>
                <Typography variant="body2" fontWeight="600" ml={1} mb={1} color="text.secondary">Password</Typography>
                <TextField fullWidth name="password" type="password" id="password" placeholder="Create a password" sx={inputStyle} />
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                py: 1.8,
                borderRadius: '980px',
                fontSize: '1.05rem',
                fontWeight: '600',
                textTransform: 'none',
                backgroundColor: '#0071e3',
                boxShadow: 'none',
                '&:hover': { backgroundColor: '#0077ED', boxShadow: 'none' }
              }}
            >
              Sign Up
            </Button>

            <Box textAlign="center" mt={3}>
               <Typography variant="body2" color="#86868b">
                  Already have an account?{' '}
                  <Link to="/login" style={{ textDecoration: 'none', color: '#0071e3', fontWeight: '500' }}>
                    Sign in
                  </Link>
               </Typography>
            </Box>

          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default RegisterPage;