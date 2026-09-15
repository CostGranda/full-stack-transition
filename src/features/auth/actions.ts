'use server';

import { redirect } from 'next/navigation';

import { prisma } from '@/lib/prisma';
import { ROUTES } from '@/lib/routes';
import { createSessionForUser, destroySession, getCurrentUser, hashPassword, verifyPassword } from '@/lib/auth/session';

export async function loginAction(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const password = String(formData.get('password') ?? '');

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (!existingUser || !verifyPassword(password, existingUser.passwordHash)) {
    redirect(`${ROUTES.login}?error=invalid`);
  }

  await createSessionForUser(existingUser.id);
  redirect(ROUTES.home);
}

export async function registerAction(formData: FormData) {
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const password = String(formData.get('password') ?? '');

  if (!name || !email || password.length < 6) {
    redirect(`${ROUTES.register}?error=invalid`);
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    redirect(`${ROUTES.register}?error=email_taken`);
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash: hashPassword(password),
    },
  });

  await createSessionForUser(user.id);
  redirect(ROUTES.home);
}

export async function logoutAction() {
  const user = await getCurrentUser();
  if (user) {
    await destroySession();
  }
  redirect(ROUTES.login);
}
