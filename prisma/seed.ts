import 'dotenv/config';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from './generated/client';

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.task.createMany({
    data: [
      { title: 'Task 1', status: 'pending', dueDate: '2026-07-10' },
      { title: 'Task 2', status: 'pending', dueDate: '2026-07-15' },
      { title: 'Task 3', status: 'completed', dueDate: '2026-07-05' },
      { title: 'Task 4', status: 'pending', dueDate: '2026-07-20' },
      { title: 'Task 5', status: 'completed', dueDate: '2026-07-07' },
    ],
  });
  console.log('Seeded 5 tasks.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
