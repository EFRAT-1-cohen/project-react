import { Box, Container, Paper, Typography, Button } from '@mui/material';
import { SearchOff as SearchOffIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: '100%', textAlign: 'center' }}>
          <SearchOffIcon sx={{ fontSize: 80, color: 'warning.main', mb: 2 }} />
          
          <Typography variant="h3" component="h1" gutterBottom color="warning.main">
            404
          </Typography>
          
          <Typography variant="h5" gutterBottom>
            הדף לא נמצא
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            הדף שחיפשת אינו קיים במערכת
          </Typography>

          <Button 
            variant="contained" 
            onClick={() => navigate('/dashboard')}
            size="large"
          >
            חזרה לדף הבית
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}