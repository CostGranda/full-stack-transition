'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { Button, Input } from '@/components/ui';

import { loginAction } from '../actions';

export function LoginForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
      <div className="mb-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Welcome back</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Sign in</h1>
      </div>

      <form action={loginAction} className="space-y-4">
        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            Invalid email or password.
          </div>
        ) : null}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
          <Input
            name="email"
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-lg"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
          <Input
            name="password"
            type="password"
            placeholder="••••••••"
            className="w-full rounded-lg"
          />
        </div>

        <Button type="submit" className="w-full rounded-lg">Sign in</Button>
      </form>

      <p className="mt-5 text-center text-sm text-slate-600">
        No account yet?{' '}
        <Link href="/register" className="font-medium text-emerald-700 hover:text-emerald-800">
          Create one
        </Link>
      </p>
    </div>
  );
}
