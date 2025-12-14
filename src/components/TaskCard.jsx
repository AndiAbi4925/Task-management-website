import { Card, CardContent, Typography, Box, IconButton, Tooltip, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

// Icons Baru
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import SmokeFreeIcon from '@mui/icons-material/SmokeFree';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import BedIcon from '@mui/icons-material/Bed';

function TaskCard({ 
  id, title, description, status, dueDate, checkInDate, 
  bedType, isSmoking, hasConnecting, hasBreakfast, // <--- Props baru
  onDelete, onEdit, onToggleStatus 
}) { 
  const isCompleted = status === 'Completed';
  const navy = '#0F172A';
  const gold = '#B78628';

  return (
    <Card sx={{
      height: '100%', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
      borderLeft: isCompleted ? `4px solid #34C759` : `4px solid ${gold}`,
      opacity: isCompleted ? 0.6 : 1, transition: 'all 0.2s', '&:hover': { transform: 'translateY(-2px)' }
    }}>
      <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* JUDUL + ICON BED TYPE */}
        <Box display="flex" justifyContent="space-between" alignItems="start" mb={1}>
           <Typography variant="h6" fontWeight="700" color={navy} sx={{ fontFamily: 'serif' }}>
              {title}
           </Typography>
           <Chip 
             icon={<BedIcon sx={{ fontSize: 16 }}/>} 
             label={bedType || "King"} 
             size="small" 
             sx={{ bgcolor: '#F1F5F9', color: navy, fontWeight: 600, height: 24 }} 
           />
        </Box>

        {/* TANGGAL */}
        {(checkInDate || dueDate) && (
            <Box display="flex" alignItems="center" gap={1} mb={2} sx={{ color: '#64748B', fontSize: '0.8rem', fontWeight: 500 }}>
                <CalendarTodayIcon sx={{ fontSize: 14, color: gold }} />
                <span>{checkInDate || '?'} — {dueDate || '?'}</span>
            </Box>
        )}

        {/* BARIS FASILITAS (ICONS) */}
        <Box display="flex" gap={1} mb={2}>
            {/* Smoking Status */}
            <Tooltip title={isSmoking ? "Smoking Room" : "Non-Smoking"}>
               <Box sx={{ p: 0.5, borderRadius: 1, bgcolor: isSmoking ? '#fee2e2' : '#dcfce7', color: isSmoking ? '#ef4444' : '#22c55e', display: 'flex' }}>
                  {isSmoking ? <SmokingRoomsIcon fontSize="small"/> : <SmokeFreeIcon fontSize="small"/>}
               </Box>
            </Tooltip>

            {/* Breakfast */}
            {hasBreakfast && (
               <Tooltip title="Breakfast Included">
                 <Box sx={{ p: 0.5, borderRadius: 1, bgcolor: '#fef3c7', color: '#d97706', display: 'flex' }}>
                    <RestaurantIcon fontSize="small"/>
                 </Box>
               </Tooltip>
            )}

            {/* Connecting Door */}
            {hasConnecting && (
               <Tooltip title="Has Connecting Door">
                 <Box sx={{ p: 0.5, borderRadius: 1, bgcolor: '#e0f2fe', color: '#0ea5e9', display: 'flex' }}>
                    <MeetingRoomIcon fontSize="small"/>
                 </Box>
               </Tooltip>
            )}
        </Box>

        <Typography variant="body2" color="#64748B" sx={{ mb: 3, lineHeight: 1.5, flexGrow: 1 }}>
          {description || "No special requests."}
        </Typography>

        {/* TOMBOL ACTION (Tetap sama) */}
        <Box display="flex" justifyContent="space-between" alignItems="center" pt={2} borderTop="1px solid #F1F5F9">
           <Typography variant="caption" fontWeight="600" sx={{ color: isCompleted ? '#34C759' : gold, textTransform: 'uppercase', letterSpacing: '1px' }}>
              {status === 'Completed' ? 'CHECKED OUT' : 'OCCUPIED'}
           </Typography>
           <Box>
              <IconButton size="small" onClick={() => onToggleStatus(id, status)} sx={{ color: isCompleted ? '#34C759' : '#94A3B8' }}>
                  {isCompleted ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
              </IconButton>
              <IconButton size="small" onClick={() => onEdit({ id, title, description, status, dueDate, checkInDate, bedType, isSmoking, hasConnecting, hasBreakfast })} sx={{ color: '#94A3B8' }}>
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