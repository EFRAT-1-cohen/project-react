import { api } from './api';
import type { Ticket, Comment, Status, Priority } from '../types';

export const ticketsService = {
  // קבלת כל הטיקטים (מסונן לפי role בשרת)
  async getAllTickets(): Promise<Ticket[]> {
    const response = await api.get<Ticket[]>('/tickets');
    return response.data;
  },

  // קבלת טיקט בודד
  async getTicketById(id: number): Promise<Ticket> {
    const response = await api.get<Ticket>(`/tickets/${id}`);
    return response.data;
  },

  // יצירת טיקט חדש (customer בלבד)
  async createTicket(data: { subject: string; description: string; priority_id?: number }): Promise<Ticket> {
    const response = await api.post<Ticket>('/tickets', data);
    return response.data;
  },

// עדכון טיקט (agent/admin בלבד)
async updateTicket(
  ticketId: number, 
  data: {
    status_id?: number;
    priority_id?: number;
    assigned_to?: number | null;
  }
): Promise<Ticket> {
  const response = await api.patch(`/tickets/${ticketId}`, data);
  return response.data;
},
// מחיקת טיקט (admin בלבד)
async deleteTicket(ticketId: number): Promise<void> {
  await api.delete(`/tickets/${ticketId}`);
},

  // קבלת תגובות לטיקט
  async getComments(ticketId: number): Promise<Comment[]> {
    const response = await api.get<Comment[]>(`/tickets/${ticketId}/comments`);
    return response.data;
  },

  // הוספת תגובה
  async addComment(ticketId: number, content: string): Promise<Comment> {
    const response = await api.post<Comment>(`/tickets/${ticketId}/comments`, { content });
    return response.data;
  },

  // קבלת סטטוסים
  async getStatuses(): Promise<Status[]> {
    const response = await api.get<Status[]>('/statuses');
    return response.data;
  },
 // יצירת סטטוס חדש (admin בלבד) 
  async createStatus(name: string): Promise<{ id: number; name: string }> {
    const response = await api.post<{ id: number; name: string }>('/statuses', { name });
    return response.data;
  },
  // קבלת רמות דחיפות
  async getPriorities(): Promise<Priority[]> {
    const response = await api.get<Priority[]>('/priorities');
    return response.data;
  },
   // יצירת עדיפות חדשה (admin בלבד)
  async createPriority(name: string): Promise<{ id: number; name: string }> {
    const response = await api.post<{ id: number; name: string }>('/priorities', { name });
    return response.data;
  },
};