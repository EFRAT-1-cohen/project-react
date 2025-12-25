import { Box, Paper, Typography, Chip, Divider, Grid } from '@mui/material';
import { AccessTime, Person, Label, Flag } from '@mui/icons-material';
import type { Ticket } from '../../types';
import { getStatusColor, getPriorityColor, formatDate } from '../../utils/ticketUtils';

interface TicketDetailsProps {
  ticket: Ticket;
}

export function TicketDetails({ ticket }: TicketDetailsProps) {
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
        <Typography variant="h5" component="h2">
          {ticket.subject}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {ticket.status_name && (
            <Chip 
              label={ticket.status_name} 
              color={getStatusColor(ticket.status_name)}
              icon={<Label />}
            />
          )}
          {ticket.priority_name && (
            <Chip 
              label={ticket.priority_name} 
              color={getPriorityColor(ticket.priority_name)}
              icon={<Flag />}
            />
          )}
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-wrap' }}>
        {ticket.description}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Person color="action" />
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">
                נוצר על ידי
              </Typography>
              <Typography variant="body2">
                {ticket.created_by_name || 'לא ידוע'}
              </Typography>
            </Box>
          </Box>
        </Grid>

        {ticket.assigned_to_name && (
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Person color="primary" />
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  מוקצה ל
                </Typography>
                <Typography variant="body2">
                  {ticket.assigned_to_name}
                </Typography>
              </Box>
            </Box>
          </Grid>
        )}

        <Grid size={{ xs: 12, sm: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccessTime color="action" />
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">
                תאריך יצירה
              </Typography>
              <Typography variant="body2">
                {formatDate(ticket.created_at)}
              </Typography>
            </Box>
          </Box>
        </Grid>

        {ticket.updated_at && (
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccessTime color="action" />
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  עודכן לאחרונה
                </Typography>
                <Typography variant="body2">
                  {formatDate(ticket.updated_at)}
                </Typography>
              </Box>
            </Box>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
}
