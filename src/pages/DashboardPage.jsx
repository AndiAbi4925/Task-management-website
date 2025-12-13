import { AppBar, Toolbar, Typography, Container, Grid, Button, Box, Paper, IconButton, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TaskCard from '../components/TaskCard';

// A simple reusable component for the "Stats" cards
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
  const tasks = [
    { id: 1, title: "Final Project", description: "Complete the backend API integration.", status: "Pending", dueDate: "Oct 15" },
    { id: 2, title: "Groceries", description: "Buy milk, coffee, and apples.", status: "Completed", dueDate: "Oct 12" },
    { id: 3, title: "Team Sync", description: "Discuss roadmap via Zoom.", status: "Pending", dueDate: "Oct 18" },
    { id: 4, title: "Workout", description: "30 mins cardio and legs.", status: "Pending", dueDate: "Oct 20" },
  ];

  // Calculate stats dynamically
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const pendingTasks = tasks.filter(t => t.status === 'Pending').length;

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#F5F5F7', pb: 10 }}>
      
      {/* Navbar */}
      <AppBar position="sticky" elevation={0} sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.72)',
        backdropFilter: 'saturate(180%) blur(20px)',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        color: '#1d1d1f'
      }}>
        <Toolbar>
          <Typography variant="h6" fontWeight="600" sx={{ flexGrow: 1, letterSpacing: '-0.5px' }}>
            TaskMaster
          </Typography>
          
          {/* Link Avatar to Profile Page */}
          <IconButton component={Link} to="/profile" sx={{ p: 0, mr: 2 }}>
             <Avatar sx={{ bgcolor: '#0071e3', width: 32, height: 32 }}>A</Avatar>
          </IconButton>
          
          <Button component={Link} to="/login" sx={{ color: '#86868b', textTransform: 'none', fontSize: '0.9rem', fontWeight: 600 }}>
            Log out
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 5 }}>
        
        {/* NEW: Stats Overview Section */}
        <Grid container spacing={3} mb={6}>
            <Grid item xs={12} sm={4}>
                <StatCard title="Total Tasks" value={totalTasks} color="#0071e3" icon={<AddIcon />} />
            </Grid>
            <Grid item xs={12} sm={4}>
                <StatCard title="Pending" value={pendingTasks} color="#FF9500" icon={<AccessTimeIcon />} />
            </Grid>
            <Grid item xs={12} sm={4}>
                <StatCard title="Completed" value={completedTasks} color="#34C759" icon={<CheckCircleOutlineIcon />} />
            </Grid>
        </Grid>

        {/* Task List Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" fontWeight="700" sx={{ letterSpacing: '-0.02em' }}>
            My Tasks
          </Typography>
          
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            sx={{
                borderRadius: '980px',
                padding: '10px 24px',
                textTransform: 'none',
                fontWeight: '600',
                backgroundColor: '#0071e3',
                boxShadow: 'none',
                '&:hover': { backgroundColor: '#0077ED', boxShadow: 'none' }
            }}
          >
            New Task
          </Button>
        </Box>

        {/* Task Grid */}
        <Grid container spacing={3}>
          {tasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              <TaskCard {...task} />
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
}

export default DashboardPage;