import { Box, Grid, Paper, Typography, Button } from '@mui/material';
import { AddCircleOutline, ConfirmationNumber } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import type { User } from '../../../types';

interface CustomerDashboardProps {
  user: User;
}

export function CustomerDashboard({ user }: CustomerDashboardProps) {
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        שלום {user.name}! 👋
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        ברוך הבא למערכת ניהול הטיקטים
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper 
            sx={{ 
              p: 3, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              cursor: 'pointer',
              '&:hover': { bgcolor: 'action.hover' }
            }}
            onClick={() => navigate('/tickets/new')}
          >
            <AddCircleOutline sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              פתח טיקט חדש
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              יש לך בעיה או שאלה? פתח טיקט ונחזור אליך בהקדם
            </Typography>
            <Button variant="contained" sx={{ mt: 2 }}>
              פתח טיקט
            </Button>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper 
            sx={{ 
              p: 3, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              cursor: 'pointer',
              '&:hover': { bgcolor: 'action.hover' }
            }}
            onClick={() => navigate('/tickets')}
          >
            <ConfirmationNumber sx={{ fontSize: 60, color: 'secondary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              הטיקטים שלי
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              צפה בכל הטיקטים שפתחת ובסטטוס שלהם
            </Typography>
            <Button variant="outlined" sx={{ mt: 2 }}>
              צפה בטיקטים
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}