import { useState, useEffect } from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, 
  FormControl, InputLabel, Select, MenuItem, FormGroup, FormControlLabel, Checkbox 
} from '@mui/material'; // <--- Import komponen baru
import api from '../services/api';

const navy = '#0F172A';
const gold = '#B78628';

const inputStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: '#F8F9FA',
    '&.Mui-focused fieldset': { border: `1px solid ${gold}` },
  },
  mb: 2
};

function CreateTaskDialog({ open, onClose, onTaskCreated, taskToEdit }) {
  // 1. Tambahkan state baru
  const [formData, setFormData] = useState({ 
    title: '', description: '', checkInDate: '', dueDate: '',
    bedType: 'King', isSmoking: false, hasConnecting: false, hasBreakfast: false
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title || '',
        description: taskToEdit.description || '',
        checkInDate: taskToEdit.checkInDate || '',
        dueDate: taskToEdit.dueDate || '',
        // Load data existing
        bedType: taskToEdit.bedType || 'King',
        isSmoking: taskToEdit.isSmoking || false,
        hasConnecting: taskToEdit.hasConnecting || false,
        hasBreakfast: taskToEdit.hasBreakfast || false,
      });
    } else {
      setFormData({ 
        title: '', description: '', checkInDate: '', dueDate: '', 
        bedType: 'King', isSmoking: false, hasConnecting: false, hasBreakfast: false 
      });
    }
  }, [taskToEdit, open]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (taskToEdit) {
        await api.put(`/tasks/${taskToEdit.id}`, formData);
      } else {
        await api.post('/tasks', formData);
      }
      onTaskCreated(); 
      onClose();
    } catch (error) {
      alert("Failed to save request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: { borderRadius: '12px', padding: '10px', minWidth: '450px' } }}>
      <DialogTitle sx={{ fontWeight: '700', fontSize: '1.5rem', color: navy, fontFamily: 'serif' }}>
        {taskToEdit ? 'Edit Booking' : 'New Guest Booking'}
      </DialogTitle>
      
      <DialogContent>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField fullWidth label="Room Number" name="title" value={formData.title} onChange={handleChange} sx={inputStyle} InputLabelProps={{ sx: { color: navy } }} />
          
          {/* BARIS TANGGAL */}
          <Box display="flex" gap={2} mb={2}>
            <TextField fullWidth type="date" label="Check-In" name="checkInDate" value={formData.checkInDate} onChange={handleChange} sx={inputStyle} InputLabelProps={{ shrink: true }} />
            <TextField fullWidth type="date" label="Check-Out" name="dueDate" value={formData.dueDate} onChange={handleChange} sx={inputStyle} InputLabelProps={{ shrink: true }} />
          </Box>

          {/* BARIS TIPE KAMAR (Dropdown) */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="bed-label">Bed Type</InputLabel>
            <Select
              labelId="bed-label"
              name="bedType"
              value={formData.bedType}
              label="Bed Type"
              onChange={handleChange}
              sx={{ borderRadius: '8px', bgcolor: '#F8F9FA' }}
            >
              <MenuItem value="King">King Bed</MenuItem>
              <MenuItem value="Queen">Queen Bed</MenuItem>
              <MenuItem value="Twin">Twin Bed</MenuItem>
            </Select>
          </FormControl>

          {/* PILIHAN FASILITAS (Checkboxes) */}
          <FormGroup row sx={{ justifyContent: 'space-between', px: 1, mb: 2 }}>
             <FormControlLabel 
                control={<Checkbox name="isSmoking" checked={formData.isSmoking} onChange={handleChange} sx={{ color: navy, '&.Mui-checked': { color: gold } }} />} 
                label="Smoking Area" 
             />
             <FormControlLabel 
                control={<Checkbox name="hasConnecting" checked={formData.hasConnecting} onChange={handleChange} sx={{ color: navy, '&.Mui-checked': { color: gold } }} />} 
                label="Connecting Door" 
             />
             <FormControlLabel 
                control={<Checkbox name="hasBreakfast" checked={formData.hasBreakfast} onChange={handleChange} sx={{ color: navy, '&.Mui-checked': { color: gold } }} />} 
                label="Breakfast" 
             />
          </FormGroup>

          <TextField fullWidth label="Special Requests / Notes" name="description" multiline rows={2} value={formData.description} onChange={handleChange} sx={inputStyle} />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} sx={{ color: '#64748B' }}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading} sx={{ borderRadius: '8px', bgcolor: gold, fontWeight: '600' }}>
          {loading ? 'Saving...' : 'Save Booking'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateTaskDialog;