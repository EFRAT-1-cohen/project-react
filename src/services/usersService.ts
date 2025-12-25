import { api } from './api';
import type { User } from '../types';

export const usersService = {
  // קבלת כל המשתמשים (admin בלבד)
  async getAllUsers(): Promise<User[]> {
    const response = await api.get<User[]>('/users');
    return response.data;
  },

  // קבלת משתמש בודד (admin בלבד)
  async getUserById(id: number): Promise<User> {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },

  // יצירת משתמש (admin בלבד)
  async createUser(data: { name: string; email: string; password: string; role: string }): Promise<{ id: number }> {
    const response = await api.post<{ id: number }>('/users', data);
    return response.data;
  },

  // קבלת רק agents (לרשימת הקצאה)
  async getAgents(): Promise<User[]> {
    const allUsers = await this.getAllUsers();
    return allUsers.filter(user => user.role === 'agent');
  },
  
};