import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import type { UserRole } from '../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, token, isLoading } = useAuth();

  // אם עדיין טוען - אפשר להציג loader
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // אם אין token - הפנה ל-login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // אם יש הגבלת תפקידים - בדוק אם המשתמש מורשה
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // הכל בסדר - הצג את הקומפוננטה
  return <>{children}</>;
}