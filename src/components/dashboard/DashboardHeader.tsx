import { Box, Typography, Button } from '@mui/material';
import { LogoutOutlined } from '@mui/icons-material';

interface DashboardHeaderProps {
  onLogout: () => void;
}

export function DashboardHeader({ onLogout }: DashboardHeaderProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      <Typography variant="h4" component="h1">
        לוח בקרה
      </Typography>
      <Button
        variant="outlined"
        color="error"
        startIcon={<LogoutOutlined />}
        onClick={onLogout}
      >
        התנתק
      </Button>
    </Box>
  );
}