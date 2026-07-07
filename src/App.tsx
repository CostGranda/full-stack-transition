import { Header, TaskTable, Button, Input } from './components';

function App() {
  const staticTasks = [
    { id: 1, title: 'Task 1', status: 'pending' as const, dueDate: '2026-07-10' },
    { id: 2, title: 'Task 2', status: 'pending' as const, dueDate: '2026-07-15' },
    { id: 3, title: 'Task 3', status: 'completed' as const, dueDate: '2026-07-05' },
    { id: 4, title: 'Task 4', status: 'pending' as const, dueDate: '2026-07-20' },
    { id: 5, title: 'Task 5', status: 'completed' as const, dueDate: '2026-07-07' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6 flex gap-4">
            <Input placeholder="Add a new task..." />
            <Button>Add Task</Button>
          </div>

          <h2 className="text-xl font-semibold text-emerald-900 mb-4">Tasks</h2>
          <TaskTable tasks={staticTasks} />
        </div>
      </main>
    </div>
  );
}

export default App;
