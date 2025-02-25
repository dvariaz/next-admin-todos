import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma';

export async function POST() {
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      email: 'test@mail.com',
      password: bcrypt.hashSync('123456'),
      roles: ['super-user', 'admin', 'client'],
      todos: {
        create: [
          { description: 'Soul stone', completed: true },
          { description: 'Time stone' },
          { description: 'Space stone' },
          { description: 'Reality stone' },
        ]
      }
    }
  })

  return NextResponse.json({
    message: 'Seed executed'
  });
}
