import { Header } from '@/components';
import { TaskShell } from '@/features/tasks/components/TaskShell';
import { requireUser } from '@/lib/auth/session';
import { getTasks } from '@/lib/tasks';

export default async function HomePage() {
  const user = await requireUser();
  const tasks = await getTasks(user.id);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userName={user.name ?? user.email} />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <TaskShell initialTasks={tasks} />
      </main>
    </div>
  );
}
