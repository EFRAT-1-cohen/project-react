import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterFormProps {
  onSubmit: (data: Omit<RegisterFormData, 'confirmPassword'>) => Promise<void>;
  isSubmitting?: boolean;
}

export function RegisterForm({ onSubmit, isSubmitting }: RegisterFormProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch('password');

const handleFormSubmit = async (data: RegisterFormData) => {
  const registerData = {
    name: data.name,
    email: data.email,
    password: data.password
  };
  await onSubmit(registerData);
};

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <TextField
        margin="normal"
        fullWidth
        label="שם מלא"
        autoFocus
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
        margin="normal"
        fullWidth
        label="אימייל"
        autoComplete="email"
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
        margin="normal"
        fullWidth
        label="סיסמה"
        type={showPassword ? 'text' : 'password'}
        autoComplete="new-password"
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
        margin="normal"
        fullWidth
        label="אימות סיסמה"
        type={showConfirmPassword ? 'text' : 'password'}
        autoComplete="new-password"
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...register('confirmPassword', {
          required: 'שדה חובה',
          validate: (value) => value === password || 'הסיסמאות לא תואמות'
        })}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, py: 1.5 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'נרשם...' : 'הרשמה'}
      </Button>
    </Box>
  );
}