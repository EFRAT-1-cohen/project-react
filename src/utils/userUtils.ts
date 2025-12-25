/**
 * פונקציות עזר לתפקידי משתמשים
 */

export type ChipColor = 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';

/**
 * מחזיר צבע עבור תפקיד משתמש
 */
export function getRoleColor(role: string): ChipColor {
  switch (role) {
    case 'admin':
      return 'error';
    case 'agent':
      return 'warning';
    case 'customer':
      return 'success';
    default:
      return 'default';
  }
}

/**
 * מחזיר טקסט בעברית עבור תפקיד משתמש
 */
export function getRoleText(role: string): string {
  switch (role) {
    case 'admin':
      return 'מנהל';
    case 'agent':
      return 'נציג';
    case 'customer':
      return 'לקוח';
    default:
      return role;
  }
}
