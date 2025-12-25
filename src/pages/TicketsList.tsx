import { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { Loading } from '../components/common/Loading';
import { TicketCard } from '../components/tickets/TicketCard';
import { TicketFilters } from '../components/tickets/TicketFilters';
import { ticketsService } from '../services/ticketsService';
import { useAuth } from '../context/useAuth';
import type { Ticket, Status, Priority } from '../types';
import Swal from 'sweetalert2';

export function TicketsList() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');

  const { user } = useAuth();
  const navigate = useNavigate();

  const filterTickets = useCallback(() => {
    let filtered = [...tickets];

    if (searchTerm) {
      filtered = filtered.filter(
        (ticket) =>
          ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedStatus) {
      filtered = filtered.filter(
        (ticket) => ticket.status_id?.toString() === selectedStatus
      );
    }

    if (selectedPriority) {
      filtered = filtered.filter(
        (ticket) => ticket.priority_id?.toString() === selectedPriority
      );
    }

    setFilteredTickets(filtered);
  }, [tickets, searchTerm, selectedStatus, selectedPriority]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterTickets();
  }, [filterTickets]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [ticketsData, statusesData, prioritiesData] = await Promise.all([
        ticketsService.getAllTickets(),
        ticketsService.getStatuses(),
        ticketsService.getPriorities(),
      ]);
      
      setTickets(ticketsData);
      setStatuses(statusesData);
      setPriorities(prioritiesData);
      setError('');
    } catch {
      setError('שגיאה בטעינת הטיקטים');
      Swal.fire({
        icon: 'error',
        title: 'שגיאה',
        text: 'לא ניתן לטעון את הטיקטים',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <AppLayout>
        <Loading message="טוען טיקטים..." />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          טיקטים
        </Typography>
        {user?.role === 'customer' && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate('/tickets/new')}
          >
            טיקט חדש
          </Button>
        )}
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <TicketFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedPriority={selectedPriority}
        onPriorityChange={setSelectedPriority}
        statuses={statuses}
        priorities={priorities}
      />

      {filteredTickets.length === 0 ? (
        <Alert severity="info">
          {tickets.length === 0 ? 'אין טיקטים להצגה' : 'לא נמצאו טיקטים מתאימים לחיפוש'}
        </Alert>
      ) : (
        <Box>
          {filteredTickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </Box>
      )}
    </AppLayout>
  );
}