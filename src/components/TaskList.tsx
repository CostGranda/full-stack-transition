'use client';

import { useState, useEffect } from 'react';
import type { Task } from '@/lib/tasks';
import { TaskTable } from './TaskTable';
import { Button } from './Button';
import { Input } from './Input';

const STORAGE_KEY = 'tasks';

interface TaskListProps {
  initialTasks: Task[];
}

export function TaskList({ initialTasks }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [input, setInput] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  function addTask() {
    const trimmed = input.trim();
    if (!trimmed) return;

    const next: Task = {
      id: tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
      title: trimmed,
      status: 'pending',
    };

    const updated = [...tasks, next];
    setTasks(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setInput('');
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') addTask();
  }

  return (
    <>
      <div className="mb-6 flex gap-4">
        <Input
          placeholder="Add a new task..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={addTask}>Add Task</Button>
      </div>

      <h2 className="text-xl font-semibold text-emerald-900 mb-4">Tasks</h2>
      <TaskTable tasks={tasks} />
    </>
  );
}
