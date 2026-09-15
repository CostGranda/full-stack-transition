'use server';

import { revalidatePath } from 'next/cache';

import { ROUTES } from '@/lib/routes';
import { getCurrentUser } from '@/lib/auth/session';
import type { Task } from '@/lib/tasks';
import { createTask, deleteTask, updateTask } from '@/lib/tasks';

export async function createTaskAction(title: string, dueDate?: string): Promise<Task> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('You must be signed in to create a task.');
  }

  const createdTask = await createTask(title, dueDate, user.id);
  revalidatePath(ROUTES.home);
  return createdTask;
}

export async function toggleTaskStatusAction(id: number, status: 'pending' | 'completed') {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('You must be signed in to update a task.');
  }

  await updateTask(id, { status }, user.id);
  revalidatePath(ROUTES.home);
}

export async function updateTaskTitleAction(id: number, title: string) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('You must be signed in to update a task.');
  }

  await updateTask(id, { title }, user.id);
  revalidatePath(ROUTES.home);
}

export async function updateTaskDueDateAction(id: number, dueDate: string | null) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('You must be signed in to update a task.');
  }

  await updateTask(id, { dueDate }, user.id);
  revalidatePath(ROUTES.home);
}

export async function deleteTaskAction(id: number) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('You must be signed in to delete a task.');
  }

  await deleteTask(id, user.id);
  revalidatePath(ROUTES.home);
}
