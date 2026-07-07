interface TableRowProps {
  id: string | number;
  title: string;
  status: 'completed' | 'pending';
  dueDate?: string;
}

export function TableRow({ id, title, status, dueDate }: TableRowProps) {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="px-6 py-3 text-left text-sm">{id}</td>
      <td className="px-6 py-3 text-left text-sm font-medium">{title}</td>
      <td className="px-6 py-3 text-left">
        <span className={status === 'completed' ? 'px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-800' : 'px-2 py-1 rounded text-xs font-semibold bg-yellow-100 text-yellow-800'}>
          {status}
        </span>
      </td>
      <td className="px-6 py-3 text-left text-sm">{dueDate || '-'}</td>
    </tr>
  );
}
