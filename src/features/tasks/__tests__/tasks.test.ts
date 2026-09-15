import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { tasksToCsv } from '@/lib/csv';
import { mapTaskRow, normalizeTaskDueDate, normalizeTaskTitle } from '@/lib/tasks';

describe('task domain logic', () => {
  it('normalizes task titles by trimming spaces', () => {
    assert.equal(normalizeTaskTitle('  Buy milk  '), 'Buy milk');
  });

  it('rejects empty task titles', () => {
    assert.throws(() => normalizeTaskTitle('   '), /Task title is required\./);
    assert.throws(() => normalizeTaskTitle(''), /Task title is required\./);
  });

  it('normalizes due dates by trimming empty values', () => {
    assert.equal(normalizeTaskDueDate('  2026-09-30  '), '2026-09-30');
    assert.equal(normalizeTaskDueDate('   '), undefined);
  });

  it('maps Prisma rows into the app task shape', () => {
    const task = mapTaskRow({
      id: 5,
      title: 'Ship order',
      status: 'completed',
      dueDate: null,
    });

    assert.deepEqual(task, {
      id: 5,
      title: 'Ship order',
      status: 'completed',
      dueDate: undefined,
    });
  });

  it('keeps due dates when present', () => {
    const task = mapTaskRow({
      id: 9,
      title: 'Pay rent',
      status: 'pending',
      dueDate: '2026-09-30',
    });

    assert.equal(task.dueDate, '2026-09-30');
  });

  it('builds a CSV export for task records', () => {
    const csv = tasksToCsv([
      {
        id: 9,
        title: 'Pay rent',
        status: 'pending',
        dueDate: '2026-09-30',
      },
    ]);

    assert.equal(
      csv,
      'id,title,status,dueDate\n9,Pay rent,pending,2026-09-30'
    );
  });
});
