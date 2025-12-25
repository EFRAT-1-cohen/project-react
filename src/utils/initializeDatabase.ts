import { ticketsService } from '../services/ticketsService';

export async function initializeDatabase() {
  try {
    console.log('🔄 Initializing database...');
    
    // בדיקה - מה יש
    const existingStatuses = await ticketsService.getStatuses();
    
    // אם יש פחות מ-3, נוסיף את החסרים
    const requiredStatuses = ['open', 'in_progress', 'closed'];
    
    for (const statusName of requiredStatuses) {
      const exists = existingStatuses.some(s => s.name === statusName);
      if (!exists) {
        console.log(`➕ Adding status: ${statusName}`);
        await ticketsService.createStatus(statusName);
      }
    }
    
    console.log('✅ Database initialized');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
  }
}