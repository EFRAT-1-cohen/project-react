/**
 * פונקציות עזר לצבעי סטטוסים ועדיפויות
 */

export type ChipColor = 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';

/**
 * מחזיר צבע עבור סטטוס
 */
export function getStatusColor(status?: string | null): ChipColor {
  switch (status?.toLowerCase()) {
    case 'open':
      return 'warning';
    case 'closed':
      return 'success';
    case 'in_progress':
      return 'info';
    case 'pending':
      return 'secondary';
    case 'on_hold':
      return 'error';
    default:
      return 'default';
  }
}

/**
 * מחזיר צבע עבור עדיפות
 */
export function getPriorityColor(priority?: string | null): ChipColor {
  switch (priority?.toLowerCase()) {
    case 'high':
    case 'urgent':
      return 'error';
    case 'medium':
      return 'warning';
    case 'low':
      return 'success';
    default:
      return 'default';
  }
}

/**
 * פורמט תאריך בעברית
 */
export function formatDate(dateString?: string, includeTime = true): string {
  if (!dateString) return '';
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  
  if (includeTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }
  
  return new Date(dateString).toLocaleDateString('he-IL', options);
}
