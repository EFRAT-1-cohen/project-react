import { useAuth } from '../context/useAuth';
import { AppLayout } from '../components/layout/AppLayout';
import { CustomerDashboard } from '../components/dashboard/roles/CustomerDashboard';
import { AgentDashboard } from '../components/dashboard/roles/AgentDashboard';
import { AdminDashboard } from '../components/dashboard/roles/AdminDashboard';

export function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  const renderDashboard = () => {
    switch (user.role) {
      case 'customer':
        return <CustomerDashboard user={user} />;
      case 'agent':
        return <AgentDashboard user={user} />;
      case 'admin':
        return <AdminDashboard user={user} />;
      default:
        return null;
    }
  };

  return (
    <AppLayout>
      {renderDashboard()}
    </AppLayout>
  );
}