import { Alert, Typography } from '@mui/material';

export function TestUsers() {
  return (
    <Alert severity="info" sx={{ mt: 3 }}>
      <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
        משתמשי בדיקה:
      </Typography>
      <Typography variant="body2">Admin: admin@example.com</Typography>
      <Typography variant="body2">Agent: agent@example.com</Typography>
      <Typography variant="body2">Customer: customer1@example.com</Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>סיסמה לכולם: password</Typography>
    </Alert>
  );
}