import { Header, TaskList } from '@/components';
import { getTasks } from '@/lib/tasks';

export default async function HomePage() {
  const tasks = await getTasks();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <TaskList initialTasks={tasks} />
        </div>
      </main>
    </div>
  );
}
