'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { Button, Input } from '@/components/ui';

import { registerAction } from '../actions';

export function RegisterForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
      <div className="mb-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Create account</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Sign up</h1>
      </div>

      <form action={registerAction} className="space-y-4">
        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error === 'email_taken' ? 'That email is already registered.' : 'Please provide a name, a valid email, and a password of at least 6 characters.'}
          </div>
        ) : null}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Name</label>
          <Input name="name" placeholder="Juan" className="w-full rounded-full" />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
          <Input name="email" type="email" placeholder="you@example.com" className="w-full rounded-full" />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
          <Input name="password" type="password" placeholder="••••••••" className="w-full rounded-full" />
        </div>

        <Button className="w-full rounded-full" type="submit">Create account</Button>
      </form>

      <p className="mt-5 text-center text-sm text-slate-600">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-emerald-700 hover:text-emerald-800">
          Sign in
        </Link>
      </p>
    </div>
  );
}
