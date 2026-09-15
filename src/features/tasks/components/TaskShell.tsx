'use client';

import { useState } from 'react';

import { Button, Input } from '@/components/ui';
import { Modal } from '@/components/ui/Modal';
import type { Task } from '@/lib/tasks';

import { createTaskAction } from '../actions';
import { TaskList } from './TaskList';

interface TaskShellProps {
  initialTasks: Task[];
}

export function TaskShell({ initialTasks }: TaskShellProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeView, setActiveView] = useState<'tasks'>('tasks');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');

  async function handleCreateTask() {
    const trimmed = newTaskTitle.trim();
    if (!trimmed) return;

    const createdTask = await createTaskAction(trimmed, newTaskDueDate || undefined);
    setTasks(current => [...current, createdTask]);
    setNewTaskTitle('');
    setNewTaskDueDate('');
    setIsModalOpen(false);
    setActiveView('tasks');
  }

  function resetNewTaskForm() {
    setNewTaskTitle('');
    setNewTaskDueDate('');
    setIsModalOpen(false);
    setActiveView('tasks');
  }

  return (
    <div className="flex min-h-[70vh] rounded-xl border border-slate-200 bg-slate-50 shadow-sm">
      <aside className="w-72 border-r border-slate-200 bg-white p-4">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Menu</p>
        </div>

        <nav className="space-y-2">
          <button
            type="button"
            onClick={() => {
              setActiveView('tasks');
              setIsModalOpen(false);
            }}
            className={
              activeView === 'tasks'
                ? 'w-full rounded-lg bg-emerald-600 px-4 py-3 text-left text-sm font-medium text-white shadow-sm'
                : 'w-full rounded-lg bg-slate-100 px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-200'
            }
          >
            View tasks
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveView('tasks');
              setIsModalOpen(true);
            }}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-left text-sm font-medium text-white shadow-sm hover:bg-blue-700"
          >
            Add task
          </button>
        </nav>

        <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">Total</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{tasks.length}</p>
        </div>
      </aside>

      <main className="flex-1 p-6">
        <TaskList key={tasks.length} initialTasks={tasks} />
      </main>

      <Modal
        isOpen={isModalOpen}
        title="Add a new task"
        description="Create a task from the sidebar without leaving the page."
        onClose={resetNewTaskForm}
      >
        <div className="mx-auto max-w-md space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Task title</label>
            <Input
              placeholder="Task title"
              value={newTaskTitle}
              className="w-full rounded-lg"
              onChange={e => setNewTaskTitle(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  void handleCreateTask();
                }
              }}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Due date</label>
            <Input
              type="date"
              value={newTaskDueDate}
              className="w-full rounded-lg"
              onChange={e => setNewTaskDueDate(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={resetNewTaskForm}>
              Cancel
            </Button>
            <Button onClick={() => void handleCreateTask()}>Create task</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
