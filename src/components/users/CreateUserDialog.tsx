import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  MenuItem,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface CreateUserFormData {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface CreateUserDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: CreateUserFormData) => Promise<void>;
}

export function CreateUserDialog({ open, onClose, onSave }: CreateUserDialogProps) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<CreateUserFormData>({
    defaultValues: {
      role: 'customer',
    }
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleFormSubmit = async (data: CreateUserFormData) => {
    await onSave(data);
    reset();
    setShowPassword(false);
  };

  const handleClose = () => {
    reset();
    setShowPassword(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>יצירת משתמש חדש</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="שם מלא *"
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register('name', {
              required: 'שדה חובה',
              minLength: {
                value: 2,
                message: 'השם חייב להכיל לפחות 2 תווים'
              }
            })}
          />

          <TextField
            fullWidth
            margin="normal"
            label="אימייל *"
            type="email"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email', {
              required: 'שדה חובה',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'כתובת אימייל לא תקינה'
              }
            })}
          />

          <TextField
            fullWidth
            margin="normal"
            label="סיסמה *"
            type={showPassword ? 'text' : 'password'}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...register('password', {
              required: 'שדה חובה',
              minLength: {
                value: 6,
                message: 'הסיסמה חייבת להכיל לפחות 6 תווים'
              }
            })}
          />

          <TextField
            select
            fullWidth
            margin="normal"
            label="תפקיד *"
            defaultValue="customer"
            {...register('role', { required: 'שדה חובה' })}
          >
            <MenuItem value="customer">לקוח</MenuItem>
            <MenuItem value="agent">נציג</MenuItem>
            <MenuItem value="admin">מנהל</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isSubmitting}>
            ביטול
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? 'יוצר...' : 'צור משתמש'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}