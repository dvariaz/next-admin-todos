import bcrypt from 'bcryptjs';
import { getServerSession, Session } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '@/features/auth/config';

export const getCurrentSession = async (): Promise<Required<Session>> => {
  const currentSession = await getServerSession(authOptions);

  if (!currentSession?.user) throw new Error('There is no user connected');

  return currentSession as Required<Session>;
};

export const signInWithCredentials = async (email: string, password: string) => {
  if (!email || !password) return null;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return await createUser(email, password);
  
  if (!bcrypt.compareSync(password, user.password ?? '')) return null;

  return user;
}

export const createUser = async (email: string, password: string) => {
  const user = await prisma.user.create({
    data: {
      email,
      password: bcrypt.hashSync(password),
      name: email.split('@')[0],
    }
  });

  return user;
}
