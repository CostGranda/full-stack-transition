export interface Task {
  id: number;
  title: string;
  status: 'pending' | 'completed';
  dueDate?: string;
}

export async function getTasks(): Promise<Task[]> {
  return [
    { id: 1, title: 'Task 1', status: 'pending', dueDate: '2026-07-10' },
    { id: 2, title: 'Task 2', status: 'pending', dueDate: '2026-07-15' },
    { id: 3, title: 'Task 3', status: 'completed', dueDate: '2026-07-05' },
    { id: 4, title: 'Task 4', status: 'pending', dueDate: '2026-07-20' },
    { id: 5, title: 'Task 5', status: 'completed', dueDate: '2026-07-07' },
  ];
}
