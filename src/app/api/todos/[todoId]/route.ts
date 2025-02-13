import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma';
import * as yup from 'yup';
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';

interface Segments {
  params: {
    todoId: string;
  }
}

export async function GET(_request: NextRequest, { params }: Segments) {
  try {
    const { todoId: id } = await params

    const todo = await prisma.todo.findFirst({
      where: { id }
    });

    if (!todo) return NextResponse.json({
      message: `Todo with id=${id} not found`
    }, { status: 404 });

    return NextResponse.json(todo);
  } catch (err: unknown) {
    console.error(err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

const putSchema = yup.object({
  description: yup.string().optional(),
  completed: yup.boolean().optional()
})

export async function PUT(request: NextRequest, { params }: Segments) {
  const { todoId: id } = await params;
  
  try {
    const validatedBody = await putSchema.validate(await request.json());

    await prisma.todo.findFirstOrThrow({
      where: { id }
    });

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: validatedBody,
    });

    return NextResponse.json(updatedTodo);
  } catch (err: unknown) {
    if (err instanceof yup.ValidationError) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    }

    if (err instanceof PrismaClientValidationError) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    }

    if (err instanceof PrismaClientKnownRequestError) {
      switch (err.code) {
        case 'P2025':
          return NextResponse.json({ message: `Todo with id=${id} not found` }, { status: 404 });
        default:
          return NextResponse.json({ message: err.message }, { status: 500 });
      }
    }

    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
