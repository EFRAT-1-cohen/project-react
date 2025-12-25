import { AppBar, Toolbar, Typography, Button, Box, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { getRoleColor, getRoleText } from '../../utils/userUtils';
import Swal from 'sweetalert2';

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'האם אתה בטוח?',
      text: 'האם ברצונך להתנתק מהמערכת?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'כן, התנתק',
      cancelButtonText: 'ביטול',
      confirmButtonColor: '#d33',
    });

    if (result.isConfirmed) {
      logout();
      navigate('/login');
    }
  };

  if (!user) return null;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 0, mr: 2 }}>
          Helpdesk
        </Typography>

        <Button 
          color="inherit" 
          onClick={() => navigate('/dashboard')}
        >
          דף הבית
        </Button>

        <Button 
          color="inherit"
          onClick={() => navigate('/tickets')}
        >
          טיקטים
        </Button>

        {user.role === 'customer' && (
          <Button 
            color="inherit"
            onClick={() => navigate('/tickets/new')}
          >
            טיקט חדש
          </Button>
        )}

        {user.role === 'admin' && (
          <Button 
            color="inherit"
            onClick={() => navigate('/users')}
          >
            משתמשים
          </Button>
        )}

        {/* דוחות - למנהל וסוכן */}
        {(user.role === 'admin' || user.role === 'agent') && (
          <Button 
            color="inherit"
            onClick={() => navigate('/reports')}
          >
            דוחות
          </Button>
        )}

        {/* ניהול מערכת - למנהל בלבד */}
        {user.role === 'admin' && (
          <Button 
            color="inherit"
            onClick={() => navigate('/manage-system')}
          >
            ניהול מערכת
          </Button>
        )}

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2">
            {user.name}
          </Typography>
          <Chip 
            label={getRoleText(user.role)} 
            color={getRoleColor(user.role)}
            size="small"
          />
          <Button 
            color="inherit" 
            onClick={handleLogout}
          >
            התנתק
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}