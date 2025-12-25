import { useForm } from 'react-hook-form';
import { Box, TextField, Button } from '@mui/material';
import { Send } from '@mui/icons-material';

interface AddCommentFormData {
  content: string;
}

interface AddCommentFormProps {
  onSubmit: (content: string) => Promise<void>;
  isSubmitting?: boolean;
}

export function AddCommentForm({ onSubmit, isSubmitting }: AddCommentFormProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<AddCommentFormData>();

  const handleFormSubmit = async (data: AddCommentFormData) => {
    await onSubmit(data.content);
    reset();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <TextField
        fullWidth
        multiline
        rows={3}
        label="הוסף תגובה"
        placeholder="כתוב את תגובתך כאן..."
        error={!!errors.content}
        helperText={errors.content?.message}
        {...register('content', {
          required: 'שדה חובה',
          minLength: {
            value: 3,
            message: 'התגובה חייבת להכיל לפחות 3 תווים'
          }
        })}
      />
      <Button
        type="submit"
        variant="contained"
        startIcon={<Send />}
        sx={{ mt: 2 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'שולח...' : 'שלח תגובה'}
      </Button>
    </Box>
  );
}