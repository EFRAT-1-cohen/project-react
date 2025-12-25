import { Card, CardContent, CardActions, Typography, Chip, Box, Button } from '@mui/material';
import { AccessTime, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import type { Ticket } from '../../types';
import { getStatusColor, getPriorityColor, formatDate } from '../../utils/ticketUtils';

interface TicketCardProps {
  ticket: Ticket;
}

export function TicketCard({ ticket }: TicketCardProps) {
  const navigate = useNavigate();

  return (
    <Card sx={{ mb: 2, '&:hover': { boxShadow: 4 } }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
          <Typography variant="h6" component="div">
            {ticket.subject}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {ticket.status_name && (
              <Chip 
                label={ticket.status_name} 
                color={getStatusColor(ticket.status_name)}
                size="small"
              />
            )}
            {ticket.priority_name && (
              <Chip 
                label={ticket.priority_name} 
                color={getPriorityColor(ticket.priority_name)}
                size="small"
              />
            )}
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {ticket.description && ticket.description.length > 100 
            ? `${ticket.description.substring(0, 100)}...` 
            : ticket.description}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {ticket.created_by_name && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Person fontSize="small" color="action" />
              <Typography variant="caption" color="text.secondary">
                נוצר על ידי: {ticket.created_by_name}
              </Typography>
            </Box>
          )}
          
          {ticket.assigned_to_name && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Person fontSize="small" color="primary" />
              <Typography variant="caption" color="text.secondary">
                מוקצה ל: {ticket.assigned_to_name}
              </Typography>
            </Box>
          )}

          {ticket.created_at && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <AccessTime fontSize="small" color="action" />
              <Typography variant="caption" color="text.secondary">
                {formatDate(ticket.created_at)}
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
      
      <CardActions>
        <Button size="small" onClick={() => navigate(`/tickets/${ticket.id}`)}>
          צפה בפרטים
        </Button>
      </CardActions>
    </Card>
  );
}
