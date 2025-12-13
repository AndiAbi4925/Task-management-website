import { AppBar, Toolbar, Typography, Container, Grid, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import TaskCard from '../components/TaskCard';

function DashboardPage() {
  const tasks = [
    { id: 1, title: "Final Project", description: "Complete the backend API integration.", status: "Pending", dueDate: "Oct 15" },
    { id: 2, title: "Groceries", description: "Buy milk, coffee, and apples.", status: "Completed", dueDate: "Oct 12" },
    { id: 3, title: "Team Sync", description: "Discuss roadmap via Zoom.", status: "Pending", dueDate: "Oct 18" },
    { id: 4, title: "Workout", description: "30 mins cardio and legs.", status: "Pending", dueDate: "Oct 20" },
  ];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#F5F5F7', pb: 10 }}>
      
      {/* Navbar: Frosted Glass effect, but normal text */}
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
          <Button component={Link} to="/login" sx={{ color: '#0071e3', textTransform: 'none', fontSize: '1rem' }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        
        {/* Header Section */}
        <Box display="flex" justifyContent="space-between" alignItems="flex-end" mb={6}>
          <Box>
            <Typography variant="h2" fontWeight="700" sx={{ letterSpacing: '-0.02em', mb: 1 }}>
              My Tasks
            </Typography>
            <Typography variant="h6" color="#86868b" fontWeight="400">
              Overview of your current progress.
            </Typography>
          </Box>
          
          {/* Action Button */}
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            sx={{
                borderRadius: '980px',
                padding: '10px 24px',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: '#0071e3',
                boxShadow: 'none',
                '&:hover': { backgroundColor: '#0077ED', boxShadow: 'none' }
            }}
          >
            New Task
          </Button>
        </Box>

        {/* The Grid */}
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