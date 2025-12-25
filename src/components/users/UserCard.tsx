import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import { Person, Email, CalendarToday } from '@mui/icons-material';
import type { User } from '../../types';
import { getRoleColor, getRoleText } from '../../utils/userUtils';
import { formatDate } from '../../utils/ticketUtils';

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Person color="primary" />
            <Typography variant="h6">
              {user.name}
            </Typography>
          </Box>
          <Chip 
            label={getRoleText(user.role)} 
            color={getRoleColor(user.role)}
            size="small"
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Email fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </Box>

          {user.created_at && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarToday fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                נרשם בתאריך: {formatDate(user.created_at, false)}
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
