import { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  MenuItem 
} from '@mui/material';
import type { Ticket, Status, Priority, User } from '../../types';

interface UpdateTicketDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: UpdateTicketData) => Promise<void>;
  ticket: Ticket;
  statuses: Status[];
  priorities: Priority[];
  agents: User[];
  canAssign: boolean;
}

export interface UpdateTicketData {
  status_id?: number;
  priority_id?: number;
  assigned_to?: number | null;
}

export function UpdateTicketDialog({
  open,
  onClose,
  onSave,
  ticket,
  statuses,
  priorities,
  agents,
  canAssign,
}: UpdateTicketDialogProps) {
  
  const [statusId, setStatusId] = useState<number>(ticket.status_id || 1);
  const [priorityId, setPriorityId] = useState<number>(ticket.priority_id || 2);
  const [assignedTo, setAssignedTo] = useState<number | null>(ticket.assigned_to || null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setStatusId(ticket.status_id || 1);
    setPriorityId(ticket.priority_id || 2);
    setAssignedTo(ticket.assigned_to || null);
  }, [ticket]);

 const handleSave = async () => {
  try {
    setIsSaving(true);
    const data: UpdateTicketData = {
      status_id: statusId,
      priority_id: priorityId,
    };
    
    // רק אם מנהל ויש הקצאה - נשלח את השדה
    if (canAssign && assignedTo !== null) {
      data.assigned_to = assignedTo;
    }
    
    await onSave(data);
    onClose();
  } finally {
    setIsSaving(false);
  }
};
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>עדכון טיקט</DialogTitle>
      <DialogContent>
        <TextField
          select
          fullWidth
          margin="normal"
          label="סטטוס"
          value={statusId}
          onChange={(e) => setStatusId(Number(e.target.value))}
        >
          {statuses.map((status) => (
            <MenuItem key={status.id} value={status.id}>
              {status.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          fullWidth
          margin="normal"
          label="דחיפות"
          value={priorityId}
          onChange={(e) => setPriorityId(Number(e.target.value))}
        >
          {priorities.map((priority) => (
            <MenuItem key={priority.id} value={priority.id}>
              {priority.name}
            </MenuItem>
          ))}
        </TextField>

        {canAssign && (
          <TextField
            select
            fullWidth
            margin="normal"
            label="הקצה ל-Agent"
            value={assignedTo || ''}
            onChange={(e) => setAssignedTo(e.target.value ? Number(e.target.value) : null)}
          >
            <MenuItem value="">ללא הקצאה</MenuItem>
            {agents.map((agent) => (
              <MenuItem key={agent.id} value={agent.id}>
                {agent.name} ({agent.email})
              </MenuItem>
            ))}
          </TextField>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isSaving}>
          ביטול
        </Button>
        <Button onClick={handleSave} variant="contained" disabled={isSaving}>
          {isSaving ? 'שומר...' : 'שמור'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}