import { Link } from 'react-router-dom';
import { Container, Paper, TextField, Button, Typography, Box, Avatar } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function RegisterPage() {
  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    }}>
      <Container maxWidth="xs">
        <Paper elevation={10} sx={{
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56 }}>
            <PersonAddIcon fontSize="large" />
          </Avatar>

          <Typography component="h1" variant="h5" fontWeight="bold" sx={{ color: '#333' }}>
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Join us to start organizing
          </Typography>

          <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
             <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3, mb: 2, py: 1.5, borderRadius: '12px', fontSize: '1rem', fontWeight: 'bold',
                background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                boxShadow: '0 3px 5px 2px rgba(105, 105, 255, .3)',
                transition: 'transform 0.2s',
                '&:hover': { background: 'linear-gradient(45deg, #5a6fd6 30%, #6a4391 90%)', transform: 'scale(1.02)' }
              }}
            >
              Sign Up
            </Button>
            <Box textAlign="center" mt={2}>
               <Typography variant="body2">
                  Already have an account?{' '}
                  <Link to="/login" style={{ textDecoration: 'none', color: '#764ba2', fontWeight: 'bold' }}>
                    Sign In
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