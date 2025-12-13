import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// 1. Add 'onEdit' to the props list
function TaskCard({ id, title, description, status, dueDate, onDelete, onEdit }) { 
  const isCompleted = status === 'Completed';
  const statusColor = isCompleted ? '#34C759' : '#FF9500';

  return (
    <Card sx={{
      height: '100%',
      borderRadius: '22px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
      border: '1px solid rgba(0,0,0,0.02)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.2s ease',
      '&:hover': { transform: 'scale(1.02)' }
    }}>
      <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box display="flex" alignItems="center" gap={1}>
             <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: statusColor }} />
             <Typography variant="caption" fontWeight="600" sx={{ color: statusColor, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {status}
             </Typography>
          </Box>
          <Typography variant="caption" color="#86868b" fontWeight="500">
            {dueDate}
          </Typography>
        </Box>

        <Typography variant="h5" fontWeight="700" sx={{ letterSpacing: '-0.01em', mb: 1 }}>
          {title}
        </Typography>

        <Typography variant="body1" color="#1d1d1f" sx={{ opacity: 0.8, lineHeight: 1.6, flexGrow: 1 }}>
          {description}
        </Typography>

        <Box display="flex" justifyContent="flex-end" gap={1} mt={3}>
           {/* 2. Attach the onEdit function here */}
           <IconButton 
             size="small" 
             onClick={() => onEdit({ id, title, description, status, dueDate })} 
             sx={{ color: '#86868b' }}
           >
              <EditIcon fontSize="small" />
           </IconButton>
           
           <IconButton 
             size="small" 
             onClick={() => onDelete(id)} 
             sx={{ color: '#86868b', '&:hover': { color: '#FF3B30' } }}
           >
              <DeleteIcon fontSize="small" />
           </IconButton>
        </Box>

      </CardContent>
    </Card>
  );
}

export default TaskCard;