import { logoutAction } from '@/features/auth/actions';

interface HeaderProps {
  userName?: string | null;
}

export function Header({ userName }: HeaderProps) {
  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-emerald-900">My Todo App</h1>

        {userName ? (
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-700">{userName}</span>
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-md border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Logout
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </header>
  );
}
