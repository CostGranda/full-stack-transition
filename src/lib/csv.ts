import type { Task } from './tasks';

function escapeCsvValue(value: string | number | undefined): string {
  const output = String(value ?? '');
  if (output.includes(',') || output.includes('"') || output.includes('\n') || output.includes('\r')) {
    return `"${output.replace(/"/g, '""')}"`;
  }

  return output;
}

export function tasksToCsv(tasks: Task[]): string {
  const header = ['id', 'title', 'status', 'dueDate'];
  const rows = tasks.map(task => [task.id, task.title, task.status, task.dueDate ?? '']);

  return [header, ...rows]
    .map(row => row.map(value => escapeCsvValue(value)).join(','))
    .join('\n');
}
