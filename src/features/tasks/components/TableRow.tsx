'use client';

import { Check, CheckCheck, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TableRowProps {
  id: string | number;
  title: string;
  status: 'completed' | 'pending';
  dueDate?: string;
  onToggleStatus: () => void;
  onDelete: () => void;
  onSaveTitle: (title: string) => void;
}

export function TableRow({
  id,
  title,
  status,
  dueDate,
  onToggleStatus,
  onDelete,
  onSaveTitle,
}: TableRowProps) {
  const [draftTitle, setDraftTitle] = useState(title);
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle');

  useEffect(() => {
    setDraftTitle(title);
  }, [title]);

  async function handleCommit() {
    const trimmed = draftTitle.trim();
    if (!trimmed || trimmed === title) {
      setSaveState('idle');
      return;
    }

    setSaveState('saving');
    onSaveTitle(trimmed);
    setDraftTitle(trimmed);
    setSaveState('saved');
    window.setTimeout(() => setSaveState('idle'), 1200);
  }

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="px-6 py-3 text-left text-sm">{id}</td>
      <td className="px-6 py-3 text-left text-sm font-medium align-top">
        <div className="flex min-w-[360px] max-w-[520px] flex-col gap-1">
          <textarea
            value={draftTitle}
            onChange={e => setDraftTitle(e.target.value)}
            onBlur={() => void handleCommit()}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                void handleCommit();
              }
            }}
            rows={2}
            className={
              saveState === 'saved'
                ? 'w-full resize-y border border-emerald-300 rounded bg-emerald-50 px-2 py-2 leading-relaxed text-slate-800 whitespace-pre-wrap'
                : 'w-full resize-y border border-gray-200 rounded px-2 py-2 leading-relaxed text-slate-800 whitespace-pre-wrap'
            }
          />
          {saveState !== 'idle' ? (
            <span className="text-[10px] font-medium text-emerald-700">
              {saveState === 'saving' ? 'Saving...' : 'Saved'}
            </span>
          ) : null}
        </div>
      </td>
      <td className="px-6 py-3 text-left">
        <span
          className={
            status === 'completed'
              ? 'px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-800'
              : 'px-2 py-1 rounded text-xs font-semibold bg-yellow-100 text-yellow-800'
          }
        >
          {status}
        </span>
      </td>
      <td className="px-6 py-3 text-left text-sm">{dueDate || '-'}</td>
      <td className="px-6 py-3 text-left text-sm">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={status === 'completed' ? 'Mark task as pending' : 'Mark task as completed'}
            title={status === 'completed' ? 'Mark task as pending' : 'Mark task as completed'}
            onClick={onToggleStatus}
            className={
              status === 'completed'
                ? 'inline-flex h-9 w-9 items-center justify-center rounded bg-emerald-100 text-emerald-700 transition hover:bg-emerald-200'
                : 'inline-flex h-9 w-9 items-center justify-center rounded bg-blue-100 text-blue-700 transition hover:bg-blue-200'
            }
          >
            {status === 'completed' ? <CheckCheck size={16} /> : <Check size={16} />}
          </button>

          <button
            type="button"
            aria-label="Delete task"
            title="Delete task"
            onClick={onDelete}
            className="inline-flex h-9 w-9 items-center justify-center rounded bg-red-100 text-red-700 transition hover:bg-red-200"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}
