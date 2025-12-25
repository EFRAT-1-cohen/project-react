import type { AuthResponse, User } from '../types';
import { api } from './api';

export const authService = {
  // התחברות
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  // הרשמה (customer בלבד)
  async register(name: string, email: string, password: string): Promise<{ id: number }> {
    const response = await api.post<{ id: number }>('/auth/register', {
      name,
      email,
      password,
    });
    return response.data;
  },

  // קבלת פרטי המשתמש המחובר
  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },

  // התנתקות (מחיקת token מ-localStorage)
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};