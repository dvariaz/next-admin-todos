'use server';

import { Todo } from '@prisma/client';
import prisma from '@/lib/prisma';
import { getCurrentSession } from '@/features/auth/actions/auth';

export const getTodos = async () => {
  const session = await getCurrentSession();

  const todos = await prisma.todo.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' }
  });

  return todos
}

export const createTodo = async (payload: Pick<Todo, 'description'>) => {
  const session = await getCurrentSession();

  const { description } = payload
  
  const newTodo = await prisma.todo.create({
    data: {
      userId: session.user.id,
      description
    }
  })

  return newTodo
}

export const updateTodo = async (todoId: string, payload: Pick<Todo, 'description' | 'completed'>) => {
  const session = await getCurrentSession();

  const { description, completed } = payload

  await prisma.todo.findFirstOrThrow({
    where: { id: todoId, userId: session.user.id }
  });

  const updatedTodo = await prisma.todo.update({
    where: { id: todoId, userId: session.user.id },
    data: { description, completed }
  });

  return updatedTodo;
}

export const deleteCompletedTodos = async () => {
  const session = await getCurrentSession();

  const deletedTodos = await prisma.todo.deleteMany({
    where: { userId: session.user.id, completed: true }
  })

  return deletedTodos
}
