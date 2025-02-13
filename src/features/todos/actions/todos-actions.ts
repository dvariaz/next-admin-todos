'use server';

import { Todo } from '@prisma/client';
import prisma from '@/lib/prisma';

export const getTodos = async () => {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return todos
}

export const createTodo = async (payload: Pick<Todo, 'description'>) => {
  const { description } = payload
  
  const newTodo = await prisma.todo.create({
    data: { description }
  })

  return newTodo
}

export const updateTodo = async (todoId: string, payload: Pick<Todo, 'description' | 'completed'>) => {
  const { description, completed } = payload

  await prisma.todo.findFirstOrThrow({
    where: { id: todoId }
  });

  const updatedTodo = await prisma.todo.update({
    where: { id: todoId },
    data: { description, completed }
  });

  return updatedTodo;
}

export const deleteCompletedTodos = async () => {
  const deletedTodos = await prisma.todo.deleteMany({
    where: { completed: true }
  })

  return deletedTodos
}
