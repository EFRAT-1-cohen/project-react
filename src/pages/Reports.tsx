import { useState, useEffect } from 'react';
import { Typography, Paper } from '@mui/material';
import Grid2 from '@mui/material/Grid';
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  LineChart,
  Line,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts';
import { AppLayout } from '../components/layout/AppLayout';
import { Loading } from '../components/common/Loading';
import { ticketsService } from '../services/ticketsService';
import type { Ticket, Status, Priority } from '../types';

export function Reports() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [ticketsData, statusesData, prioritiesData] = await Promise.all([
        ticketsService.getAllTickets(),
        ticketsService.getStatuses(),
        ticketsService.getPriorities(),
      ]);
      setTickets(ticketsData);
      setStatuses(statusesData);
      setPriorities(prioritiesData);
    } catch {
      // שגיאה
    } finally {
      setIsLoading(false);
    }
  };

  // סטטיסטיקות כלליות - דינמי
  const totalTickets = tickets.length;

  // מיפוי דינמי של צבעים לסטטוסים
  const statusColorMap: { [key: string]: string } = {
    'open': '#ff9800',
    'in_progress': '#2196f3',
    'closed': '#4caf50',
    'pending': '#9c27b0',
    'on_hold': '#f44336',
  };

  // חישוב סטטיסטיקות לפי סטטוס - דינמי מהשרת
  const statusStats = statuses.map(status => ({
    id: status.id,
    name: status.name,
    count: tickets.filter(t => t.status_id === status.id).length,
    color: statusColorMap[status.name] || '#757575' // צבע דיפולט אם לא מוגדר
  }));

  // נתונים לתרשים עוגה - רק סטטוסים עם ערך
  const statusData = statusStats
    .filter(s => s.count > 0)
    .map(s => ({
      name: s.name,
      value: s.count,
      color: s.color
    }));

  // חישוב סטטיסטיקות לפי עדיפות - דינמי מהשרת
  const priorityData = priorities.map(priority => ({
    name: priority.name,
    כמות: tickets.filter(t => t.priority_id === priority.id).length
  }));

  // טיקטים לפי חודש (6 חודשים אחרונים)
  const getMonthlyData = () => {
    const monthlyData: { [key: string]: number } = {};
    const now = new Date();
    
    // יצירת 6 חודשים אחרונים
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = date.toLocaleDateString('he-IL', { month: 'short', year: 'numeric' });
      monthlyData[monthKey] = 0;
    }

    // ספירת טיקטים לפי חודש
    tickets.forEach(ticket => {
      if (ticket.created_at) {
        const ticketDate = new Date(ticket.created_at);
        const monthKey = ticketDate.toLocaleDateString('he-IL', { month: 'short', year: 'numeric' });
        if (monthlyData[monthKey] !== undefined) {
          monthlyData[monthKey]++;
        }
      }
    });

    return Object.entries(monthlyData).map(([חודש, טיקטים]) => ({ חודש, טיקטים }));
  };

  const monthlyData = getMonthlyData();

  // נציגים עם הכי הרבה טיקטים
  const getAgentStats = () => {
    const agentTickets: { [key: string]: number } = {};
    
    tickets.forEach(ticket => {
      const agentName = ticket.assigned_to_name || 'לא משויך';
      agentTickets[agentName] = (agentTickets[agentName] || 0) + 1;
    });

    return Object.entries(agentTickets)
      .map(([נציג, טיקטים]) => ({ נציג, טיקטים }))
      .sort((a, b) => b.טיקטים - a.טיקטים)
      .slice(0, 5);
  };

  const agentStats = getAgentStats();

  if (isLoading) {
    return (
      <AppLayout>
        <Loading message="טוען נתונים..." />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        📊 דוחות וסטטיסטיקות
      </Typography>

      {/* כרטיסי סיכום - דינמי לפי סטטוסים */}
      <Grid2 container spacing={3} sx={{ mb: 4 }}>
        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#e3f2fd' }}>
            <Typography variant="h3" color="primary" fontWeight="bold">
              {totalTickets}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              סך הכל טיקטים
            </Typography>
          </Paper>
        </Grid2>

        {statusStats.slice(0, 3).map((status, index) => {
          const bgColors = ['#fff3e0', '#e1f5fe', '#e8f5e9'];
          const textColors = ['warning.main', 'info.main', 'success.main'];
          
          return (
            <Grid2 key={status.id} size={{ xs: 12, sm: 6, md: 3 }}>
              <Paper sx={{ p: 3, textAlign: 'center', bgcolor: bgColors[index] || '#f5f5f5' }}>
                <Typography variant="h3" color={textColors[index] || 'text.primary'} fontWeight="bold">
                  {status.count}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {status.name}
                </Typography>
              </Paper>
            </Grid2>
          );
        })}
      </Grid2>

      {/* גרפים */}
      <Grid2 container spacing={3}>
        {/* תרשים עוגה - סטטוסים */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              התפלגות לפי סטטוס
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid2>

        {/* תרשים עמודות - עדיפויות */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              התפלגות לפי עדיפות
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={priorityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="כמות" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid2>

        {/* תרשים קו - מגמה חודשית */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              מגמת טיקטים - 6 חודשים אחרונים
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="חודש" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="טיקטים" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid2>

        {/* תרשים עמודות - נציגים */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              5 הנציגים המובילים
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={agentStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="נציג" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="טיקטים" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid2>
      </Grid2>
    </AppLayout>
  );
}
