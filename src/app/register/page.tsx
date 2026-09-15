import { redirect } from 'next/navigation';

import { RegisterForm } from '@/features/auth/components/RegisterForm';
import { getCurrentUser } from '@/lib/auth/session';

export default async function RegisterPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect('/');
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-slate-100 to-slate-200 px-4 py-10">
      <RegisterForm />
    </main>
  );
}
