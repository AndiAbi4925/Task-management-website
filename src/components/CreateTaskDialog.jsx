import { useState, useEffect } from 'react'; // <--- Added useEffect
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box } from '@mui/material';
import api from '../services/api';

const inputStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: '#f5f5f7',
    '& fieldset': { border: 'none' },
    '&:hover fieldset': { border: 'none' },
    '&.Mui-focused fieldset': { border: '1px solid #0071e3' },
    '& input': { padding: '14px' },
  },
  mb: 2
};

// 1. Accept 'taskToEdit' prop
function CreateTaskDialog({ open, onClose, onTaskCreated, taskToEdit }) {
  const [formData, setFormData] = useState({ title: '', description: '', dueDate: '' });
  const [loading, setLoading] = useState(false);

  // 2. When the dialog opens, check if we are editing
  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title || '',
        description: taskToEdit.description || '',
        dueDate: taskToEdit.dueDate || ''
      });
    } else {
      // If creating new, reset the form
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
        // 3a. If editing, send PUT request
        await api.put(`/tasks/${taskToEdit.id}`, formData);
      } else {
        // 3b. If creating, send POST request
        await api.post('/tasks', formData);
      }
      
      onTaskCreated(); 
      onClose();
      setFormData({ title: '', description: '', dueDate: '' });

    } catch (error) {
      console.error(error);
      alert("Failed to save task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{ sx: { borderRadius: '24px', padding: '10px', minWidth: '400px' } }}
    >
      {/* Dynamic Title */}
      <DialogTitle sx={{ fontWeight: '700', fontSize: '1.5rem' }}>
        {taskToEdit ? 'Edit Task' : 'New Task'}
      </DialogTitle>
      
      <DialogContent>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            fullWidth
            placeholder="What needs to be done?"
            name="title"
            value={formData.title}
            onChange={handleChange}
            sx={inputStyle}
            autoFocus
          />
          <TextField
            fullWidth
            placeholder="Add a description..."
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={3}
            sx={inputStyle}
          />
          <TextField
            fullWidth
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            sx={inputStyle}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} sx={{ color: '#86868b', fontWeight: '600' }}>Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={loading}
          sx={{
            borderRadius: '980px',
            textTransform: 'none',
            fontWeight: '600',
            backgroundColor: '#0071e3',
            boxShadow: 'none',
          }}
        >
          {loading ? 'Saving...' : (taskToEdit ? 'Update Task' : 'Create Task')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateTaskDialog;