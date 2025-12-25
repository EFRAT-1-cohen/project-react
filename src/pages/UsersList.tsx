import { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';
import { AppLayout } from '../components/layout/AppLayout';
import { Loading } from '../components/common/Loading';
import { UserCard } from '../components/users/UserCard';
import { CreateUserDialog } from '../components/users/CreateUserDialog';
import { usersService } from '../services/usersService';
import type { User } from '../types';
import Swal from 'sweetalert2';

interface CreateUserFormData {
  name: string;
  email: string;
  password: string;
  role: string;
}

export function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm]);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const data = await usersService.getAllUsers();
      setUsers(data);
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'שגיאה',
        text: 'לא ניתן לטעון את המשתמשים',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterUsers = () => {
    if (!searchTerm) {
      setFilteredUsers(users);
      return;
    }

    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleCreateUser = async (data: CreateUserFormData) => {
    try {
      await usersService.createUser(data);
      
      await Swal.fire({
        icon: 'success',
        title: 'המשתמש נוצר בהצלחה!',
        showConfirmButton: false,
        timer: 1500
      });
      
      setCreateDialogOpen(false);
      loadUsers();
    } catch (error: unknown) {
      const message = error && typeof error === 'object' && 'response' in error
        ? 'האימייל כבר קיים במערכת'
        : 'לא ניתן ליצור את המשתמש';
        
      Swal.fire({
        icon: 'error',
        title: 'שגיאה',
        text: message,
      });
      throw error;
    }
  };

  if (isLoading) {
    return (
      <AppLayout>
        <Loading message="טוען משתמשים..." />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          ניהול משתמשים
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setCreateDialogOpen(true)}
        >
          משתמש חדש
        </Button>
      </Box>

      <TextField
        fullWidth
        label="חיפוש משתמש"
        placeholder="חפש לפי שם או אימייל..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
      />

      {filteredUsers.length === 0 ? (
        <Typography color="text.secondary" textAlign="center" py={4}>
          {users.length === 0 ? 'אין משתמשים להצגה' : 'לא נמצאו משתמשים מתאימים לחיפוש'}
        </Typography>
      ) : (
        <Box>
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </Box>
      )}

      <CreateUserDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onSave={handleCreateUser}
      />
    </AppLayout>
  );
}