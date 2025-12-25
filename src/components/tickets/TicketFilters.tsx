import { Box, TextField, MenuItem } from '@mui/material';
import type { Status, Priority } from '../../types';

interface TicketFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  selectedPriority: string;
  onPriorityChange: (value: string) => void;
  statuses: Status[];
  priorities: Priority[];
}

export function TicketFilters({
  searchTerm,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  selectedPriority,
  onPriorityChange,
  statuses,
  priorities,
}: TicketFiltersProps) {
  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
      <TextField
        label="חיפוש"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ minWidth: 200, flex: 1 }}
        placeholder="חפש לפי נושא או תיאור..."
      />

      <TextField
        select
        label="סטטוס"
        size="small"
        value={selectedStatus}
        onChange={(e) => onStatusChange(e.target.value)}
        sx={{ minWidth: 150 }}
      >
        <MenuItem value="">הכל</MenuItem>
        {statuses.map((status) => (
          <MenuItem key={status.id} value={status.id.toString()}>
            {status.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="דחיפות"
        size="small"
        value={selectedPriority}
        onChange={(e) => onPriorityChange(e.target.value)}
        sx={{ minWidth: 150 }}
      >
        <MenuItem value="">הכל</MenuItem>
        {priorities.map((priority) => (
          <MenuItem key={priority.id} value={priority.id.toString()}>
            {priority.name}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}