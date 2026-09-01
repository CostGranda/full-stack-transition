import { prisma } from './prisma';

export interface Task {
  id: number;
  title: string;
  status: 'pending' | 'completed';
  dueDate?: string;
}

export async function getTasks(): Promise<Task[]> {
  const rows = await prisma.task.findMany({ orderBy: { id: 'asc' } });
  return rows.map(row => ({
    ...row,
    status: row.status as Task['status'],
    dueDate: row.dueDate ?? undefined,
  }));
}
