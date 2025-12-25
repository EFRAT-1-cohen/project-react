import type { UserRole } from "../types";

export interface RouteConfig {
  path: string;
  label: string;
  allowedRoles?: UserRole[];
  showInMenu?: boolean;
}

export const routes: RouteConfig[] = [
  {
    path: '/dashboard',
    label: 'לוח בקרה',
    showInMenu: true,
  },
  {
    path: '/tickets',
    label: 'טיקטים',
    showInMenu: true,
  },
  {
    path: '/tickets/new',
    label: 'טיקט חדש',
    allowedRoles: ['customer'],
    showInMenu: true,
  },
  {
    path: '/users',
    label: 'משתמשים',
    allowedRoles: ['admin'],
    showInMenu: true,
  },
];

// Helper function to check if user can access route
export function canAccessRoute(route: RouteConfig, userRole?: UserRole): boolean {
  if (!route.allowedRoles) return true;
  if (!userRole) return false;
  return route.allowedRoles.includes(userRole);
}