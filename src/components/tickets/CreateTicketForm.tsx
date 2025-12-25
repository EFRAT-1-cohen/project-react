import { useForm } from 'react-hook-form';
import { Box, TextField, Button, MenuItem } from '@mui/material';
import type { Priority } from '../../types';

interface CreateTicketFormData {
  subject: string;
  description: string;
  priority_id: number;
}

interface CreateTicketFormProps {
  onSubmit: (data: CreateTicketFormData) => Promise<void>;
  priorities: Priority[];
  isSubmitting?: boolean;
}

export function CreateTicketForm({ onSubmit, priorities, isSubmitting }: CreateTicketFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateTicketFormData>({
    defaultValues: {
      priority_id: 2, // medium by default
    }
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextField
        margin="normal"
        fullWidth
        label="נושא הטיקט *"
        autoFocus
        error={!!errors.subject}
        helperText={errors.subject?.message}
        {...register('subject', {
          required: 'שדה חובה',
          minLength: {
            value: 3,
            message: 'הנושא חייב להכיל לפחות 3 תווים'
          }
        })}
      />

      <TextField
        margin="normal"
        fullWidth
        label="תיאור הבעיה *"
        multiline
        rows={6}
        error={!!errors.description}
        helperText={errors.description?.message}
        {...register('description', {
          required: 'שדה חובה',
          minLength: {
            value: 10,
            message: 'התיאור חייב להכיל לפחות 10 תווים'
          }
        })}
      />

      <TextField
        select
        margin="normal"
        fullWidth
        label="רמת דחיפות"
        defaultValue={2}
        {...register('priority_id', {
          valueAsNumber: true,
        })}
      >
        {priorities.map((priority) => (
          <MenuItem key={priority.id} value={priority.id}>
            {priority.name}
          </MenuItem>
        ))}
      </TextField>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, py: 1.5 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'שולח...' : 'פתח טיקט'}
      </Button>
    </Box>
  );
}