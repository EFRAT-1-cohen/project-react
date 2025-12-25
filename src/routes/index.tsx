import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { ProtectedRoute } from '../guards/ProtectedRoute';
import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import { NotFound } from '../pages/NotFound';
import { TicketsList } from '../pages/TicketsList';
import { CreateTicket } from '../pages/CreateTicket';
import { TicketView } from '../pages/TicketView';
import { UsersList } from '../pages/UsersList';
import { Reports } from '../pages/Reports';
import { Register } from '../pages/Register';
import { ManageSystem } from '../pages/ManageSystem';
import { Unauthorized } from '../pages/Unauthorized'; // ← הוסף את זה

export function AppRoutes() {
  const { token } = useAuth();

  return (
    <Routes>
      {/* Redirect root based on auth status */}
      <Route 
        path="/" 
        element={token ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} 
      />

      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} /> 

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tickets"
        element={
          <ProtectedRoute>
            <TicketsList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tickets/new"
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <CreateTicket />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tickets/:id"
        element={
          <ProtectedRoute>
            <TicketView />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <UsersList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute allowedRoles={['admin', 'agent']}>
            <Reports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manage-system"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <ManageSystem />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
