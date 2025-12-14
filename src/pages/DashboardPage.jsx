import { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Button, Box, Paper, IconButton, Avatar, Chip } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RoomServiceIcon from '@mui/icons-material/RoomService'; // New Icon
import CleaningServicesIcon from '@mui/icons-material/CleaningServices'; // New Icon
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TaskCard from '../components/TaskCard';
import api from '../services/api';
import CreateTaskDialog from '../components/CreateTaskDialog'; 

// --- THEME COLORS ---
const THEME = {
  primary: '#0F172A', // Royal Navy
  gold: '#B78628',    // Luxury Gold
  bg: '#F8F9FA',      // Porcelain White
  white: '#FFFFFF'
};

function StatCard({ title, value, icon, color }) {
    return (
        <Paper elevation={0} sx={{ p: 3, borderRadius: '12px', display: 'flex', alignItems: 'center', gap: 2, height: '100%', border: '1px solid rgba(0,0,0,0.05)' }}>
            <Box sx={{ p: 1.5, borderRadius: '8px', bgcolor: `${color}15`, color: color }}>
                {icon}
            </Box>
            <Box>
                <Typography variant="body2" color="text.secondary" fontWeight="600" textTransform="uppercase" letterSpacing={1}>{title}</Typography>
                <Typography variant="h4" fontWeight="700" color={THEME.primary}>{value}</Typography>
            </Box>
        </Paper>
    );
}

function DashboardPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [openDialog, setOpenDialog] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      if (error.response?.status === 401) navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm("Delete this request record?")) {
      try { await api.delete(`/tasks/${id}`); fetchTasks(); } catch (error) { alert("Failed to delete"); }
    }
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setOpenDialog(true);
  };

  const handleAddNew = () => {
    setTaskToEdit(null);
    setOpenDialog(true);
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'Completed' ? 'Pending' : 'Completed';
      await api.put(`/tasks/${id}`, { status: newStatus });
      fetchTasks();
    } catch (error) { alert("Failed to update status"); }
  };

  useEffect(() => { fetchTasks(); }, [navigate]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const pendingTasks = tasks.filter(t => t.status === 'Pending').length;

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: THEME.bg, pb: 10 }}>
      
      {/* HEADER: Royal Navy for that "Uniform" look */}
      <AppBar position="sticky" elevation={0} sx={{ backgroundColor: THEME.primary, color: THEME.white }}>
        <Toolbar>
          <RoomServiceIcon sx={{ mr: 2, color: THEME.gold }} />
          <Typography variant="h6" fontWeight="700" sx={{ flexGrow: 1, letterSpacing: '1px', fontFamily: 'serif' }}>
            CONCIERGE LINK
          </Typography>
          <IconButton component={Link} to="/profile" sx={{ p: 0, mr: 2 }}>
             <Avatar sx={{ bgcolor: THEME.gold, width: 32, height: 32, fontSize: '0.9rem' }}>S</Avatar>
          </IconButton>
          <Button onClick={() => { localStorage.removeItem('token'); navigate('/login'); }} sx={{ color: 'rgba(255,255,255,0.7)' }}>Sign Out</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 5 }}>
        
        {/* STATS AREA */}
        <Grid container spacing={3} mb={6}>
            <Grid item xs={12} sm={4}><StatCard title="Active Requests" value={totalTasks} color={THEME.primary} icon={<RoomServiceIcon />} /></Grid>
            <Grid item xs={12} sm={4}><StatCard title="Pending Attention" value={pendingTasks} color={THEME.gold} icon={<CleaningServicesIcon />} /></Grid>
            <Grid item xs={12} sm={4}><StatCard title="Resolved" value={completedTasks} color="#34C759" icon={<CheckCircleOutlineIcon />} /></Grid>
        </Grid>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Box>
            <Typography variant="h4" fontWeight="700" color={THEME.primary} sx={{ fontFamily: 'serif' }}>Guest Requests</Typography>
            <Typography variant="body2" color="text.secondary">Real-time housekeeping and concierge queue</Typography>
          </Box>
          <Button 
            onClick={handleAddNew} 
            variant="contained" 
            startIcon={<AddIcon />} 
            sx={{ 
                borderRadius: '8px', // More square = more formal
                padding: '10px 24px', 
                textTransform: 'none', 
                fontWeight: '600', 
                backgroundColor: THEME.gold, // GOLD BUTTON
                '&:hover': { backgroundColor: '#9A7020' },
                boxShadow: 'none' 
            }}
          >
            New Request
          </Button>
        </Box>

        <Grid container spacing={3}>
          {loading ? ( <Typography sx={{ p: 4 }}>Loading queue...</Typography> ) : 
           tasks.length === 0 ? ( <Typography sx={{ p: 4 }}>No active requests.</Typography> ) : (
             tasks.map((task) => (
                <Grid item xs={12} sm={6} md={4} key={task.id}>
                  <TaskCard 
                    {...task} 
                    onDelete={handleDeleteTask}
                    onEdit={handleEditTask}
                    onToggleStatus={handleToggleStatus} 
                  />
                </Grid>
             ))
          )}
        </Grid>

        <CreateTaskDialog 
          open={openDialog} 
          onClose={() => setOpenDialog(false)} 
          onTaskCreated={fetchTasks} 
          taskToEdit={taskToEdit} 
        />

      </Container>
    </Box>
  );
}

export default DashboardPage;