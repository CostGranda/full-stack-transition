import type { Task } from '@/lib/tasks';
import { TableRow } from './TableRow';

interface TaskTableProps {
  tasks: Task[];
}

export function TaskTable({ tasks }: TaskTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-gray-300 bg-gray-50">
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Task</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Due Date</th>
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
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
