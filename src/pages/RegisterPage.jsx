import { useState } from 'react'; // 1. Import useState
import { Link, useNavigate } from 'react-router-dom'; // 2. Import useNavigate
import { Container, Paper, TextField, Button, Typography, Box, Alert } from '@mui/material';
import api from '../services/api'; // 3. Import your API helper

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
  
  // 4. State to hold user input
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState(''); // To show error messages

  // 5. Update state when typing
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 6. The Logic: Send data to backend
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop page refresh
    setError('');

    try {
      // Send data to backend
      const response = await api.post('/auth/register', formData);

      // If successful, the backend should return the user info.
      // NOTE: Usually register logs you in automatically. 
      // If your backend sends a token, save it here:
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      // Redirect to Login (or Dashboard if your register auto-logins)
      alert("Account created! Please log in.");
      navigate('/login');

    } catch (err) {
      // Show error from backend (like "Email already taken")
      setError(err.response?.data?.message || "Registration failed");
    }
  };

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
          
          {/* Display Error Message if exists */}
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            
            <Box>
                <Typography variant="body2" fontWeight="600" ml={1} mb={1} color="text.secondary">Full Name</Typography>
                <TextField 
                  fullWidth 
                  id="name" 
                  name="name" 
                  placeholder="John Doe" 
                  value={formData.name}     // <--- Connected
                  onChange={handleChange}   // <--- Connected
                  sx={inputStyle} 
                />
            </Box>

            <Box>
                <Typography variant="body2" fontWeight="600" ml={1} mb={1} color="text.secondary">Email</Typography>
                <TextField 
                  fullWidth 
                  id="email" 
                  name="email" 
                  placeholder="name@example.com" 
                  value={formData.email}    // <--- Connected
                  onChange={handleChange}   // <--- Connected
                  sx={inputStyle} 
                />
            </Box>

            <Box>
                <Typography variant="body2" fontWeight="600" ml={1} mb={1} color="text.secondary">Password</Typography>
                <TextField 
                  fullWidth 
                  name="password" 
                  type="password" 
                  id="password" 
                  placeholder="Create a password" 
                  value={formData.password} // <--- Connected
                  onChange={handleChange}   // <--- Connected
                  sx={inputStyle} 
                />
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