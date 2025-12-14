import { Card, CardContent, Typography, Box, IconButton, Tooltip, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

function TaskCard({ id, title, description, status, dueDate, onDelete, onEdit, onToggleStatus }) { 
  const isCompleted = status === 'Completed';
  
  // Theme Colors
  const navy = '#0F172A';
  const gold = '#B78628';

  return (
    <Card sx={{
      height: '100%',
      borderRadius: '8px', // Sharper corners for a "Ticket" look
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      borderLeft: isCompleted ? `4px solid #34C759` : `4px solid ${gold}`, // Gold stripe on the left
      display: 'flex',
      flexDirection: 'column',
      opacity: isCompleted ? 0.6 : 1,
      transition: 'all 0.2s',
      '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)' }
    }}>
      <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        
        <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
           {/* Room Number / Title */}
           <Typography variant="h6" fontWeight="700" color={navy} sx={{ fontFamily: 'serif' }}>
              {title}
           </Typography>
           
           {/* Due Date Badge */}
           {dueDate && (
             <Chip label={dueDate} size="small" sx={{ bgcolor: '#F1F5F9', color: navy, fontWeight: 600, borderRadius: '4px' }} />
           )}
        </Box>

        <Typography variant="body2" color="#64748B" sx={{ mb: 3, lineHeight: 1.6, flexGrow: 1 }}>
          {description || "No details provided."}
        </Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center" pt={2} borderTop="1px solid #F1F5F9">
           <Typography variant="caption" fontWeight="600" sx={{ color: isCompleted ? '#34C759' : gold, textTransform: 'uppercase', letterSpacing: '1px' }}>
              {status === 'Completed' ? 'RESOLVED' : 'OPEN TICKET'}
           </Typography>

           <Box>
              <Tooltip title={isCompleted ? "Mark as Open" : "Resolve Ticket"}>
                <IconButton size="small" onClick={() => onToggleStatus(id, status)} sx={{ color: isCompleted ? '#34C759' : '#94A3B8' }}>
                    {isCompleted ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
                </IconButton>
              </Tooltip>

              <IconButton size="small" onClick={() => onEdit({ id, title, description, status, dueDate })} sx={{ color: '#94A3B8' }}>
                  <EditIcon fontSize="small" />
              </IconButton>
              
              <IconButton size="small" onClick={() => onDelete(id)} sx={{ color: '#94A3B8', '&:hover': { color: '#EF4444' } }}>
                  <DeleteIcon fontSize="small" />
              </IconButton>
           </Box>
        </Box>

      </CardContent>
    </Card>
  );
}

export default TaskCard;