import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { Loading } from '../components/common/Loading';
import { CreateTicketForm } from '../components/tickets/CreateTicketForm';
import { ticketsService } from '../services/ticketsService';
import type { Priority } from '../types';
import Swal from 'sweetalert2';

interface CreateTicketFormData {
  subject: string;
  description: string;
  priority_id: number;
}

export function CreateTicket() {
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadPriorities();
  }, []);

  const loadPriorities = async () => {
    try {
      const data = await ticketsService.getPriorities();
      setPriorities(data);
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'שגיאה',
        text: 'לא ניתן לטעון את רמות הדחיפות',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: CreateTicketFormData) => {
    try {
      setIsSubmitting(true);
      await ticketsService.createTicket(data);
      
      await Swal.fire({
        icon: 'success',
        title: 'הטיקט נוצר בהצלחה!',
        text: 'ניצור קשר בהקדם האפשרי',
        showConfirmButton: false,
        timer: 2000
      });
      
      navigate('/tickets');
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'שגיאה',
        text: 'לא ניתן ליצור את הטיקט. נסה שוב.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <AppLayout>
        <Loading message="טוען..." />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          פתיחת טיקט חדש
        </Typography>
        
        <Alert severity="info" sx={{ mb: 3 }}>
          מלא את הפרטים הבאים ונחזור אליך בהקדם האפשרי
        </Alert>

        <Paper sx={{ p: 3 }}>
          <CreateTicketForm 
            onSubmit={handleSubmit} 
            priorities={priorities}
            isSubmitting={isSubmitting}
          />
        </Paper>
      </Box>
    </AppLayout>
  );
}