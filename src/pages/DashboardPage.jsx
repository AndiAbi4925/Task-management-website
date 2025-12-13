import { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Button, Box, Paper, IconButton, Avatar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TaskCard from '../components/TaskCard';
import api from '../services/api';
// Step 1: Import the Dialog component here
import CreateTaskDialog from '../components/CreateTaskDialog'; 

function StatCard({ title, value, icon, color }) {
    return (
        <Paper elevation={0} sx={{ p: 3, borderRadius: '20px', display: 'flex', alignItems: 'center', gap: 2, height: '100%' }}>
            <Box sx={{ p: 1.5, borderRadius: '16px', bgcolor: `${color}20`, color: color }}>
                {icon}
            </Box>
            <Box>
                <Typography variant="body2" color="text.secondary" fontWeight="600">{title}</Typography>
                <Typography variant="h5" fontWeight="700">{value}</Typography>
            </Box>
        </Paper>
    );
}

function DashboardPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Step 2: State to control opening/closing the dialog
  const [openDialog, setOpenDialog] = useState(false);

  // Define fetchTasks function
  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
          navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch tasks when page loads
  useEffect(() => {
    fetchTasks();
  }, [navigate]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const pendingTasks = tasks.filter(t => t.status === 'Pending').length;

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#F5F5F7', pb: 10 }}>
      {/* Navbar */}
      <AppBar position="sticky" elevation={0} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.72)', backdropFilter: 'saturate(180%) blur(20px)', borderBottom: '1px solid rgba(0,0,0,0.05)', color: '#1d1d1f' }}>
        <Toolbar>
          <Typography variant="h6" fontWeight="600" sx={{ flexGrow: 1, letterSpacing: '-0.5px' }}>TaskMaster</Typography>
          <IconButton component={Link} to="/profile" sx={{ p: 0, mr: 2 }}>
             <Avatar sx={{ bgcolor: '#0071e3', width: 32, height: 32 }}>A</Avatar>
          </IconButton>
          <Button onClick={() => {
              localStorage.removeItem('token');
              navigate('/login');
          }} sx={{ color: '#86868b', textTransform: 'none', fontSize: '0.9rem', fontWeight: 600 }}>Log out</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 5 }}>
        
        {/* Stats */}
        <Grid container spacing={3} mb={6}>
            <Grid item xs={12} sm={4}><StatCard title="Total Tasks" value={totalTasks} color="#0071e3" icon={<AddIcon />} /></Grid>
            <Grid item xs={12} sm={4}><StatCard title="Pending" value={pendingTasks} color="#FF9500" icon={<AccessTimeIcon />} /></Grid>
            <Grid item xs={12} sm={4}><StatCard title="Completed" value={completedTasks} color="#34C759" icon={<CheckCircleOutlineIcon />} /></Grid>
        </Grid>

        {/* Header Area */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" fontWeight="700" sx={{ letterSpacing: '-0.02em' }}>My Tasks</Typography>
          
          {/* Step 3: The Button - We added onClick here */}
          <Button 
            onClick={() => setOpenDialog(true)} 
            variant="contained" 
            startIcon={<AddIcon />} 
            sx={{ borderRadius: '980px', padding: '10px 24px', textTransform: 'none', fontWeight: '600', backgroundColor: '#0071e3', boxShadow: 'none', '&:hover': { backgroundColor: '#0077ED', boxShadow: 'none' } }}
          >
            New Task
          </Button>
        </Box>

        {/* Task Grid */}
        <Grid container spacing={3}>
          {loading ? (
             <Typography sx={{ p: 4 }}>Loading tasks...</Typography>
          ) : tasks.length === 0 ? (
             <Typography sx={{ p: 4, color: '#888' }}>No tasks found. Create one!</Typography>
          ) : (
             tasks.map((task) => (
                <Grid item xs={12} sm={6} md={4} key={task.id}>
                  <TaskCard {...task} />
                </Grid>
             ))
          )}
        </Grid>

        {/* Step 4: The Dialog Component - Placed at the very end */}
        <CreateTaskDialog 
          open={openDialog} 
          onClose={() => setOpenDialog(false)} 
          onTaskCreated={fetchTasks} 
        />

      </Container>
    </Box>
  );
}

export default DashboardPage;