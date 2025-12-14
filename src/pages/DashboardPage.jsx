import { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Button, Box, Paper, IconButton, Avatar, Chip, TextField, InputAdornment } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import RoomServiceIcon from '@mui/icons-material/RoomService'; 
import CleaningServicesIcon from '@mui/icons-material/CleaningServices'; 
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TaskCard from '../components/TaskCard';
import api from '../services/api';
import CreateTaskDialog from '../components/CreateTaskDialog'; 
import { toast } from 'react-hot-toast';

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
  
  // State untuk Search dan Dialog
  const [searchTerm, setSearchTerm] = useState("");
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

  const handleDeleteTask = (id) => {
  // Panggil toast custom untuk konfirmasi
  toast((t) => (
    <Box display="flex" alignItems="center" gap={2}>
      <Typography variant="body2">Delete this request?</Typography>
      <Button 
        size="small" 
        variant="contained" 
        color="error" 
        onClick={async () => {
          toast.dismiss(t.id); // Tutup toast konfirmasi
          try { 
            await api.delete(`/tasks/${id}`); 
            toast.success("Request deleted successfully"); // Notifikasi Sukses
            fetchTasks(); 
          } catch (error) { 
            toast.error("Failed to delete request"); // Notifikasi Gagal
          }
        }}
      >
        Delete
      </Button>
      <Button size="small" onClick={() => toast.dismiss(t.id)}>Cancel</Button>
    </Box>
  ), { duration: 5000, icon: '🗑️' });
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

    // Tampilkan pesan berbeda tergantung status
    if (newStatus === 'Completed') {
        toast.success("Guest checked out / Request Resolved");
    } else {
        toast("Request reopened", { icon: '🔄' });
    }

    fetchTasks();
  } catch (error) { 
    toast.error("Failed to update status"); 
  }
};

  useEffect(() => { fetchTasks(); }, [navigate]);

  // --- LOGIC FILTERING ---
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const pendingTasks = tasks.filter(t => t.status === 'Pending').length;

  // Filter tasks berdasarkan input search (Mencari di Judul/Kamar atau Deskripsi/Nama)
  const filteredTasks = tasks.filter((task) => {
    const query = searchTerm.toLowerCase();
    const roomNumber = task.title?.toLowerCase() || "";
    const guestName = task.description?.toLowerCase() || "";
    return roomNumber.includes(query) || guestName.includes(query);
  });

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: THEME.bg, pb: 10 }}>
      
      {/* HEADER */}
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

        {/* TITLE & ACTIONS BAR */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} flexWrap="wrap" gap={2}>
          <Box>
            <Typography variant="h4" fontWeight="700" color={THEME.primary} sx={{ fontFamily: 'serif' }}>Guest Requests</Typography>
            <Typography variant="body2" color="text.secondary">Real-time housekeeping and concierge queue</Typography>
          </Box>

          <Box display="flex" gap={2}>
            {/* --- SEARCH BAR --- */}
            <TextField 
                placeholder="Search Room or Guest..." 
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ 
                    bgcolor: 'white', 
                    borderRadius: 1, 
                    '& fieldset': { border: 'none' }, // Hapus border default MUI
                    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                    width: { xs: '100%', sm: '250px' }
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon sx={{ color: '#94A3B8' }} />
                        </InputAdornment>
                    ),
                }}
            />

            <Button 
                onClick={handleAddNew} 
                variant="contained" 
                startIcon={<AddIcon />} 
                sx={{ 
                    borderRadius: '8px', 
                    padding: '10px 24px', 
                    textTransform: 'none', 
                    fontWeight: '600', 
                    backgroundColor: THEME.gold, 
                    '&:hover': { backgroundColor: '#9A7020' },
                    boxShadow: 'none',
                    whiteSpace: 'nowrap'
                }}
            >
                New Request
            </Button>
          </Box>
        </Box>

        {/* LIST OF CARDS */}
        <Grid container spacing={3}>
          {loading ? ( <Typography sx={{ p: 4 }}>Loading queue...</Typography> ) : 
           filteredTasks.length === 0 ? ( // Gunakan filteredTasks, bukan tasks
             <Box sx={{ width: '100%', textAlign: 'center', py: 5, color: '#94A3B8' }}>
                <Typography variant="h6">
                    {searchTerm ? `No results found for "${searchTerm}"` : "No active requests."}
                </Typography>
             </Box>
           ) : (
             // Loop filteredTasks agar hasil pencarian muncul
             filteredTasks.map((task) => (
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