import { Card, CardContent, Box, Typography, Chip } from '@mui/material';
import { PersonOutlined, EmailOutlined } from '@mui/icons-material';
import type { User } from '../../types';
import { getRoleColor, getRoleText } from '../../utils/userUtils';

interface UserInfoCardProps {
  user: User;
}

export function UserInfoCard({ user }: UserInfoCardProps) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <PersonOutlined sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6">
            שלום, {user.name}!
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <EmailOutlined sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography variant="body1" color="text.secondary">
            {user.email}
          </Typography>
        </Box>

        <Box>
          <Chip 
            label={getRoleText(user.role)} 
            color={getRoleColor(user.role)}
            sx={{ fontWeight: 'bold' }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
