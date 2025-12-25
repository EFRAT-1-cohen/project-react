import { useAuth } from '../context/useAuth';
import { LoginOutlined } from '@mui/icons-material';
import { LoginForm } from '../components/auth/LoginForm';
import { TestUsers } from '../components/auth/TestUsers';
import { useNavigate, Link } from 'react-router-dom';  
import { Container, Paper, Typography, Box, Link as MuiLink } from '@mui/material';  
import Swal from 'sweetalert2';
interface LoginFormData {
  email: string;
  password: string;
}

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      
      await Swal.fire({
        icon: 'success',
        title: 'התחברת בהצלחה!',
        showConfirmButton: false,
        timer: 1500
      });
      
      navigate('/dashboard');
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'שגיאה',
        text: 'שם משתמש או סיסמה שגויים',
      });
    }
  };

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
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <LoginOutlined sx={{ fontSize: 40, mr: 1, color: 'primary.main' }} />
            <Typography component="h1" variant="h4">
              התחברות
            </Typography>
          </Box>
          
          <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 3 }}>
            מערכת Helpdesk
          </Typography>

          <LoginForm onSubmit={handleSubmit} />
          <TestUsers />
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              עדיין אין לך חשבון?{' '}
              <MuiLink component={Link} to="/register" underline="hover">
                הירשם כאן
              </MuiLink>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}