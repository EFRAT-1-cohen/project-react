import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography, CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import { 
  People, 
  ConfirmationNumber, 
  Assessment
} from '@mui/icons-material';
import { Settings } from '@mui/icons-material';

export function AdminDashboard() {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: 'ניהול משתמשים',
      icon: <People sx={{ fontSize: 60 }} />,
      color: '#3f51b5',
      path: '/users',
      description: 'צפייה וניהול משתמשים'
    },
    {
      title: 'ניהול טיקטים',
      icon: <ConfirmationNumber sx={{ fontSize: 60 }} />,
      color: '#f50057',
      path: '/tickets',
      description: 'צפייה בכל הטיקטים'
    },
    {
      title: 'דוחות וסטטיסטיקות',
      icon: <Assessment sx={{ fontSize: 60 }} />,
      color: '#ff9800',
      path: '/reports',
      description: 'גרפים וניתוחי נתונים'
    },
    {
  title: 'ניהול מערכת',
  icon: <Settings sx={{ fontSize: 60 }} />,
  color: '#9c27b0',
  path: '/manage-system',
  description: 'ניהול סטטוסים ועדיפויות'
},
  ];

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        פאנל ניהול
      </Typography>

      <Grid container spacing={3}>
        {menuItems.map((item) => (
          <Grid key={item.title} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card 
              elevation={3}
              sx={{
                height: '100%',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                }
              }}
            >
              <CardActionArea 
                onClick={() => navigate(item.path)}
                sx={{ height: '100%' }}
              >
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Box sx={{ color: item.color, mb: 2 }}>
                    {item.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}