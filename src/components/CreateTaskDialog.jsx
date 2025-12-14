import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box } from '@mui/material';
import api from '../services/api';

// Theme Constants
const navy = '#0F172A';
const gold = '#B78628';

const inputStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px', // Sharper corners for hotel vibe
    backgroundColor: '#F8F9FA',
    '& fieldset': { borderColor: 'rgba(0,0,0,0.1)' },
    '&:hover fieldset': { borderColor: gold },
    '&.Mui-focused fieldset': { border: `1px solid ${gold}` }, // Focus is Gold
    '& input': { padding: '14px' },
  },
  mb: 2
};

function CreateTaskDialog({ open, onClose, onTaskCreated, taskToEdit }) {
  const [formData, setFormData] = useState({ title: '', description: '', dueDate: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title || '',
        description: taskToEdit.description || '',
        dueDate: taskToEdit.dueDate || ''
      });
    } else {
      setFormData({ title: '', description: '', dueDate: '' });
    }
  }, [taskToEdit, open]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      setFormData({ title: '', description: '', dueDate: '' });
    } catch (error) {
      alert("Failed to save request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{ sx: { borderRadius: '12px', padding: '10px', minWidth: '400px' } }}
    >
      <DialogTitle sx={{ fontWeight: '700', fontSize: '1.5rem', color: navy, fontFamily: 'serif' }}>
        {taskToEdit ? 'Edit Request' : 'New Guest Request'}
      </DialogTitle>
      
      <DialogContent>
        <Box component="form" sx={{ mt: 1 }}>
          {/* Labeling it "Room Number" visually, but still "title" in code */}
          <TextField
            fullWidth
            label="Room Number / Area"
            placeholder="e.g. Room 304 or Lobby"
            name="title"
            value={formData.title}
            onChange={handleChange}
            sx={inputStyle}
            InputLabelProps={{ sx: { color: navy } }}
            autoFocus
          />
          <TextField
            fullWidth
            label="Request Details"
            placeholder="e.g. Guest requested extra pillows..."
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={3}
            sx={inputStyle}
            InputLabelProps={{ sx: { color: navy } }}
          />
          <TextField
            fullWidth
            type="date"
            label="Deadline / Check-out"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            sx={inputStyle}
            InputLabelProps={{ shrink: true, sx: { color: navy } }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} sx={{ color: '#64748B', fontWeight: '600' }}>Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={loading}
          sx={{
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: '600',
            backgroundColor: gold,
            color: '#FFFFFF',
            boxShadow: 'none',
            '&:hover': { backgroundColor: '#9A7020' }
          }}
        >
          {loading ? 'Processing...' : (taskToEdit ? 'Update Ticket' : 'Create Ticket')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateTaskDialog;