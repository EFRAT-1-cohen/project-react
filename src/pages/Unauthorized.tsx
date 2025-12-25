import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';

export function Unauthorized() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
        }}
      >
        <LockIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
        
        <Typography variant="h3" component="h1" gutterBottom>
          אין לך הרשאה
        </Typography>
        
        <Typography variant="h6" color="text.secondary" paragraph>
          אין לך הרשאת גישה לעמוד זה
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          אנא פנה למנהל המערכת אם אתה סבור שזו טעות
        </Typography>

        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/dashboard')}
          >
            חזרה לדף הבית
          </Button>
          
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate(-1)}
          >
            חזור לעמוד הקודם
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
