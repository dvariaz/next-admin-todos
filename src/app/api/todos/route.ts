import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma';
import * as yup from 'yup';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export async function GET(request: NextRequest) { 
  const url = new URL(request.url);

  const take = Number(url.searchParams.get('take') ?? '10')
  const skip = Number(url.searchParams.get('skip') ?? '0')

  const todos = await prisma.todo.findMany({ skip, take, orderBy: { createdAt: 'desc' } });

  return NextResponse.json(todos);
}

const postSchema = yup.object({
  description: yup.string().required(),
  completed: yup.boolean().optional().default(false)
})

export async function POST(request: NextRequest) {
  try {
    const { completed, description } = await postSchema.validate(await request.json());

    const newTodo = await prisma.todo.create({ data: { description, completed } });

    return NextResponse.json(newTodo);
  } catch (err: unknown) {
    if (err instanceof yup.ValidationError) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}


export async function DELETE() {
  try {
    await prisma.todo.deleteMany({
      where: { completed: true }
    });

    return NextResponse.json({
      message: `Completed todos deleted`
    });
  } catch (err: unknown) {
    if (err instanceof PrismaClientKnownRequestError) {
      switch (err.code) {
        case 'P2025':
          return NextResponse.json({ message: `No completed todos found` }, { status: 404 });
        default:
          return NextResponse.json({ message: err.message }, { status: 400 });
      }
    }

    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
