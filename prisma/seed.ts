import 'dotenv/config';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

import { hashPassword } from '@/lib/auth/session';
import { PrismaClient } from './generated/client';

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      name: 'Demo User',
      email: 'demo@example.com',
      passwordHash: hashPassword('password123'),
    },
  });

  await prisma.task.createMany({
    data: [
      { userId: user.id, title: 'Task 1', status: 'pending', dueDate: '2026-07-10' },
      { userId: user.id, title: 'Task 2', status: 'pending', dueDate: '2026-07-15' },
      { userId: user.id, title: 'Task 3', status: 'completed', dueDate: '2026-07-05' },
      { userId: user.id, title: 'Task 4', status: 'pending', dueDate: '2026-07-20' },
      { userId: user.id, title: 'Task 5', status: 'completed', dueDate: '2026-07-07' },
    ],
  });

  console.log('Seeded demo user and 5 tasks.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
