import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Divider, Alert } from '@mui/material';
import { ArrowBack, Edit, Delete } from '@mui/icons-material';
import { AppLayout } from '../components/layout/AppLayout';
import { Loading } from '../components/common/Loading';
import { TicketDetails } from '../components/tickets/TicketDetails';
import { CommentCard } from '../components/tickets/CommentCard';
import { AddCommentForm } from '../components/tickets/AddCommentForm';
import { UpdateTicketDialog, type UpdateTicketData } from '../components/tickets/UpdateTicketDialog';
import { ticketsService } from '../services/ticketsService';
import { usersService } from '../services/usersService';
import { useAuth } from '../context/useAuth';
import type { Ticket, Comment, Status, Priority, User } from '../types';
import Swal from 'sweetalert2';

export function TicketView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [agents, setAgents] = useState<User[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

  const canEdit = user?.role === 'admin' || user?.role === 'agent';
  const canDelete = user?.role === 'admin';
  const canAssign = user?.role === 'admin';

  const loadData = useCallback(async () => {
    if (!id) return;
    
    try {
      setIsLoading(true);
      const promises: Promise<unknown>[] = [
        ticketsService.getTicketById(Number(id)),
        ticketsService.getComments(Number(id)),
        ticketsService.getStatuses(),
       
        ticketsService.getPriorities(),
      ];

      if (canAssign) {
        promises.push(usersService.getAgents());
      }

      const results = await Promise.all(promises);
      
      setTicket(results[0] as Ticket);
      setComments(results[1] as Comment[]);
      setStatuses(results[2] as Status[]);
      setPriorities(results[3] as Priority[]);
      
      if (canAssign && results[4]) {
        setAgents(results[4] as User[]);
      }
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'שגיאה',
        text: 'לא ניתן לטעון את הטיקט',
      });
      navigate('/tickets');
    } finally {
      setIsLoading(false);
    }
  }, [id, canAssign, navigate]);

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id, loadData]);

  const handleAddComment = async (content: string) => {
    if (!id) return;
    
    try {
      setIsSubmitting(true);
      const newComment = await ticketsService.addComment(Number(id), content);
      setComments([...comments, newComment]);
      
      await Swal.fire({
        icon: 'success',
        title: 'התגובה נוספה!',
        showConfirmButton: false,
        timer: 1500
      });
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'שגיאה',
        text: 'לא ניתן להוסיף תגובה',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateTicket = async (data: UpdateTicketData) => {
    if (!id || !ticket) return;
    
    try {
      const updatedTicket = await ticketsService.updateTicket(Number(id), data);
      setTicket(updatedTicket);
      
      await Swal.fire({
        icon: 'success',
        title: 'הטיקט עודכן בהצלחה!',
        showConfirmButton: false,
        timer: 1500
      });
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'שגיאה',
        text: 'לא ניתן לעדכן את הטיקט',
      });
    }
  };

  const handleDeleteTicket = async () => {
    if (!ticket) return;

    const result = await Swal.fire({
      title: 'האם אתה בטוח?',
      html: `האם ברצונך למחוק את הטיקט <strong>#${ticket.id}</strong>?<br/><small>פעולה זו לא ניתנת לביטול</small>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'כן, מחק',
      cancelButtonText: 'ביטול',
      confirmButtonColor: '#d33',
    });

    if (result.isConfirmed) {
      try {
        await ticketsService.deleteTicket(ticket.id);
        
        await Swal.fire({
          icon: 'success',
          title: 'הטיקט נמחק בהצלחה!',
          showConfirmButton: false,
          timer: 1500
        });
        
        navigate('/tickets');
      } catch {
        Swal.fire({
          icon: 'error',
          title: 'שגיאה',
          text: 'לא ניתן למחוק את הטיקט',
        });
      }
    }
  };

  if (isLoading) {
    return (
      <AppLayout>
        <Loading message="טוען טיקט..." />
      </AppLayout>
    );
  }

  if (!ticket) {
    return (
      <AppLayout>
        <Alert severity="error">הטיקט לא נמצא</Alert>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/tickets')}
        >
          חזרה לטיקטים
        </Button>

        <Box sx={{ display: 'flex', gap: 1 }}>
          {canEdit && (
            <Button
              variant="outlined"
              startIcon={<Edit />}
              onClick={() => setUpdateDialogOpen(true)}
            >
              ערוך
            </Button>
          )}
          
          {canDelete && (
            <Button
              variant="outlined"
              color="error"
              startIcon={<Delete />}
              onClick={handleDeleteTicket}
            >
              מחק
            </Button>
          )}
        </Box>
      </Box>

      <TicketDetails ticket={ticket} />

      <Typography variant="h6" gutterBottom>
        תגובות ({comments.length})
      </Typography>
      
      <Divider sx={{ mb: 3 }} />

      {comments.length === 0 ? (
        <Alert severity="info" sx={{ mb: 3 }}>
          אין תגובות עדיין. היה הראשון להגיב!
        </Alert>
      ) : (
        <Box sx={{ mb: 3 }}>
          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </Box>
      )}

      <Typography variant="h6" gutterBottom>
        הוסף תגובה
      </Typography>
      <AddCommentForm onSubmit={handleAddComment} isSubmitting={isSubmitting} />

      {canEdit && (
        <UpdateTicketDialog
          open={updateDialogOpen}
          onClose={() => setUpdateDialogOpen(false)}
          onSave={handleUpdateTicket}
          ticket={ticket}
          statuses={statuses}
          priorities={priorities}
          agents={agents}
          canAssign={canAssign}
        />
      )}
    </AppLayout>
  );
}