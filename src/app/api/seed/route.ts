import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma';

export async function POST() {
  await prisma.todo.deleteMany();

  await prisma.todo.createMany({
    data: [
      { description: 'Soul stone' },
      { description: 'Time stone' },
      { description: 'Space stone' },
      { description: 'Reality stone' },
    ]
  })

  return NextResponse.json({
    message: 'Seed executed'
  });
}
