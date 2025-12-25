import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  TextField, 
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Add } from '@mui/icons-material';
import { AppLayout } from '../components/layout/AppLayout';
import { ticketsService } from '../services/ticketsService';
import type { Status, Priority } from '../types';
import Swal from 'sweetalert2';

export function ManageSystem() {
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [newStatusName, setNewStatusName] = useState('');
  const [newPriorityName, setNewPriorityName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [statusesData, prioritiesData] = await Promise.all([
        ticketsService.getStatuses(),
        ticketsService.getPriorities(),
      ]);
      setStatuses(statusesData);
      setPriorities(prioritiesData);
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'שגיאה',
        text: 'לא ניתן לטעון נתונים',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddStatus = async () => {
    if (!newStatusName.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'שגיאה',
        text: 'נא להזין שם סטטוס',
      });
      return;
    }

    try {
      await ticketsService.createStatus(newStatusName);
      await Swal.fire({
        icon: 'success',
        title: 'הסטטוס נוסף בהצלחה!',
        showConfirmButton: false,
        timer: 1500
      });
      setNewStatusName('');
      loadData();
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'שגיאה',
        text: 'לא ניתן להוסיף סטטוס',
      });
    }
  };

  const handleAddPriority = async () => {
    if (!newPriorityName.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'שגיאה',
        text: 'נא להזין שם עדיפות',
      });
      return;
    }

    try {
      await ticketsService.createPriority(newPriorityName);
      await Swal.fire({
        icon: 'success',
        title: 'העדיפות נוספה בהצלחה!',
        showConfirmButton: false,
        timer: 1500
      });
      setNewPriorityName('');
      loadData();
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'שגיאה',
        text: 'לא ניתן להוסיף עדיפות',
      });
    }
  };

  if (isLoading) {
    return (
      <AppLayout>
        <Typography>טוען...</Typography>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Typography variant="h4" gutterBottom>
        ⚙️ ניהול מערכת
      </Typography>

      <Grid container spacing={3}>
        {/* ניהול סטטוסים */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              ניהול סטטוסים
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <TextField
                fullWidth
                label="שם סטטוס חדש"
                placeholder="לדוגמה: pending"
                value={newStatusName}
                onChange={(e) => setNewStatusName(e.target.value)}
              />
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleAddStatus}
                disabled={!newStatusName.trim()}
              >
                הוסף
              </Button>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Typography variant="subtitle2" gutterBottom>
              סטטוסים קיימים ({statuses.length})
            </Typography>
            <List dense>
              {statuses.map((status) => (
                <ListItem key={status.id}>
                  <ListItemText
                    primary={`${status.id}. ${status.name}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* ניהול עדיפויות */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              ניהול עדיפויות
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <TextField
                fullWidth
                label="שם עדיפות חדשה"
                placeholder="לדוגמה: urgent"
                value={newPriorityName}
                onChange={(e) => setNewPriorityName(e.target.value)}
              />
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleAddPriority}
                disabled={!newPriorityName.trim()}
              >
                הוסף
              </Button>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Typography variant="subtitle2" gutterBottom>
              עדיפויות קיימות ({priorities.length})
            </Typography>
            <List dense>
              {priorities.map((priority) => (
                <ListItem key={priority.id}>
                  <ListItemText
                    primary={`${priority.id}. ${priority.name}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </AppLayout>
  );
}