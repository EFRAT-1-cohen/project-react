import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography, CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import { 
  ConfirmationNumber, 
  Assessment
} from '@mui/icons-material';

export function AgentDashboard() {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: 'הטיקטים שלי',
      icon: <ConfirmationNumber sx={{ fontSize: 60 }} />,
      color: '#f50057',
      path: '/tickets',
      description: 'צפייה בטיקטים שהוקצו אליי'
    },
    {
      title: 'דוחות וסטטיסטיקות',
      icon: <Assessment sx={{ fontSize: 60 }} />,
      color: '#ff9800',
      path: '/reports',
      description: 'ניתוח ביצועים אישיים'
    },
  ];

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        פאנל נציג
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