import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Paper, Typography, Box, Link as MuiLink } from '@mui/material';
import { RegisterForm } from '../components/auth/RegisterForm';
import { authService } from '../services/authService';
import Swal from 'sweetalert2';

export function Register() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (data: { name: string; email: string; password: string }) => {
    try {
      setIsSubmitting(true);
      await authService.register(data.name, data.email, data.password);
      
      await Swal.fire({
        icon: 'success',
        title: 'נרשמת בהצלחה!',
        text: 'עכשיו תוכל להתחבר למערכת',
        showConfirmButton: true,
      });
      
      navigate('/login');
    } catch (error: unknown) {
      const message = error && typeof error === 'object' && 'response' in error
        ? 'האימייל כבר קיים במערכת'
        : 'לא ניתן להירשם';
        
      Swal.fire({
        icon: 'error',
        title: 'שגיאה',
        text: message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            הרשמה למערכת Helpdesk
          </Typography>
          
          <RegisterForm onSubmit={handleRegister} isSubmitting={isSubmitting} />
          
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              כבר יש לך חשבון?{' '}
              <MuiLink component={Link} to="/login" underline="hover">
                התחבר כאן
              </MuiLink>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}