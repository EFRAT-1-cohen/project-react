// User types
export type UserRole = 'admin' | 'agent' | 'customer';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  created_at?: string;
  is_active?: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Ticket types
export interface Ticket {
  id: number;
  subject: string;
  description: string;
  status_id: number;  
  status_name?: string;
  priority_id: number; 
  priority_name?: string;
  created_by?: number;
  created_by_name?: string;
  assigned_to?: number | null;
  assigned_to_name?: string | null;
  assigned_to_email?: string | null;
  created_by_email?: string | null;
  created_at?: string;
  updated_at?: string;
}

// Comment types
export interface Comment {
  id: number;
  ticket_id: number;
  author_id: number;
  author_name?: string;
  author_email?: string;
  content: string;
  created_at?: string;
}

// Status & Priority types
export interface Status {
  id: number;
  name: string;
}

export interface Priority {
  id: number;
  name: string;
}