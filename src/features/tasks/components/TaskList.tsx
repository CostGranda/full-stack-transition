'use client';

import { useState } from 'react';

import type { Task } from '@/lib/tasks';
import { tasksToCsv } from '@/lib/csv';
import { Button } from '@/components/ui';
import { Input } from '@/components/ui';

import {
  createTaskAction,
  deleteTaskAction,
  toggleTaskStatusAction,
  updateTaskTitleAction,
} from '../actions';
import { TaskTable } from './TaskTable';

interface TaskListProps {
  initialTasks: Task[];
}

function getTodayDate(): string {
  return new Date().toISOString().slice(0, 10);
}

export function TaskList({ initialTasks }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [input, setInput] = useState('');
  const [dueDate, setDueDate] = useState<string>(getTodayDate());

  async function addTask() {
    const trimmed = input.trim();
    if (!trimmed) return;

    const createdTask = await createTaskAction(trimmed, dueDate);
    setTasks(current => [...current, createdTask]);
    setInput('');
    setDueDate(getTodayDate());
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') addTask();
  }

  async function handleToggleStatus(id: number, status: Task['status']) {
    const nextStatus: Task['status'] = status === 'pending' ? 'completed' : 'pending';
    await toggleTaskStatusAction(id, nextStatus);
    setTasks(current =>
      current.map(task => (task.id === id ? { ...task, status: nextStatus } : task))
    );
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm('Are you sure you want to delete this task?');
    if (!confirmed) {
      return;
    }

    await deleteTaskAction(id);
    setTasks(current => current.filter(task => task.id !== id));
  }

  async function handleSaveTitle(id: number, title: string) {
    const trimmed = title.trim();
    if (!trimmed) return;
    await updateTaskTitleAction(id, trimmed);
    setTasks(current =>
      current.map(task => (task.id === id ? { ...task, title: trimmed } : task))
    );
  }

  function handleDownloadAll() {
    const csv = tasksToCsv(tasks);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'tasks.csv';
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <Input
          placeholder="Add a new task..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 min-w-[220px]"
        />
        <Input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          className="min-w-[180px]"
        />
        <Button onClick={addTask}>Add Task</Button>
      </div>

      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-emerald-900">Tasks</h2>
        <Button variant="secondary" onClick={handleDownloadAll}>
          Download all tasks
        </Button>
      </div>
      <TaskTable
        tasks={tasks}
        onToggleStatus={handleToggleStatus}
        onDelete={handleDelete}
        onSaveTitle={handleSaveTitle}
      />
    </>
  );
}
