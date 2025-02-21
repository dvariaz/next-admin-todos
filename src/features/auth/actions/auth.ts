import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

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
