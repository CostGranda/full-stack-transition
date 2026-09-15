import { prisma } from './prisma';

export interface Task {
  id: number;
  title: string;
  status: 'pending' | 'completed';
  dueDate?: string;
}

export function normalizeTaskTitle(value: string): string {
  const trimmedTitle = value.trim();

  if (!trimmedTitle) {
    throw new Error('Task title is required.');
  }

  return trimmedTitle;
}

export function normalizeTaskDueDate(value?: string | null): string | null | undefined {
  if (value === undefined || value === null) {
    return value ?? undefined;
  }

  const trimmedDueDate = value.trim();
  return trimmedDueDate || undefined;
}

export function mapTaskRow(row: {
  id: number;
  title: string;
  status: string;
  dueDate?: string | null;
}): Task {
  return {
    id: row.id,
    title: row.title,
    status: row.status as Task['status'],
    dueDate: row.dueDate ?? undefined,
  };
}

export async function getTasks(userId?: number): Promise<Task[]> {
  const rows = await prisma.task.findMany({
    where: userId === undefined ? undefined : { userId },
    orderBy: { id: 'asc' },
  });
  return rows.map(mapTaskRow);
}

export async function createTask(title: string, dueDate?: string, userId?: number): Promise<Task> {
  if (userId === undefined) {
    throw new Error('User is required to create a task.');
  }

  const trimmedTitle = normalizeTaskTitle(title);
  const normalizedDueDate = normalizeTaskDueDate(dueDate);

  const task = await prisma.task.create({
    data: {
      title: trimmedTitle,
      status: 'pending',
      dueDate: normalizedDueDate ?? null,
      userId,
    },
  });

  return mapTaskRow(task);
}

export async function updateTask(
  id: number,
  data: { title?: string; status?: Task['status']; dueDate?: string | null },
  userId?: number
): Promise<Task> {
  const existingTask = await prisma.task.findUnique({ where: { id } });
  if (userId !== undefined && existingTask && existingTask.userId !== userId) {
    throw new Error('Unauthorized task update.');
  }

  const nextData: { title?: string; status?: Task['status']; dueDate?: string | null } = {};

  if (data.title !== undefined) {
    nextData.title = normalizeTaskTitle(data.title);
  }

  if (data.status !== undefined) {
    nextData.status = data.status;
  }

  if (data.dueDate !== undefined) {
    nextData.dueDate = data.dueDate === null ? null : normalizeTaskDueDate(data.dueDate) ?? null;
  }

  const task = await prisma.task.update({
    where: { id },
    data: nextData,
  });

  return mapTaskRow(task);
}

export async function deleteTask(id: number, userId?: number): Promise<void> {
  const existingTask = await prisma.task.findUnique({ where: { id } });
  if (userId !== undefined && existingTask && existingTask.userId !== userId) {
    throw new Error('Unauthorized task delete.');
  }

  await prisma.task.delete({ where: { id } });
}
