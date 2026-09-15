import type { Task } from '@/lib/tasks';

import { TableRow } from './TableRow';

interface TaskTableProps {
  tasks: Task[];
  onToggleStatus: (id: number, status: Task['status']) => void;
  onDelete: (id: number) => void;
  onSaveTitle: (id: number, title: string) => void;
}

export function TaskTable({ tasks, onToggleStatus, onDelete, onSaveTitle }: TaskTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-gray-300 bg-gray-50">
            <th className="w-16 px-6 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
            <th className="min-w-[260px] px-6 py-3 text-left text-sm font-semibold text-gray-700">Task</th>
            <th className="w-40 px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
            <th className="w-32 px-6 py-3 text-left text-sm font-semibold text-gray-700">Due Date</th>
            <th className="w-32 px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <TableRow
              key={task.id}
              id={task.id}
              title={task.title}
              status={task.status}
              dueDate={task.dueDate}
              onToggleStatus={() => onToggleStatus(task.id, task.status)}
              onDelete={() => onDelete(task.id)}
              onSaveTitle={title => onSaveTitle(task.id, title)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
