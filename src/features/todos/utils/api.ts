import { Todo } from '@prisma/client'

export const createTodo = async (payload: Pick<Todo, 'description'>) => {
  const { description } = payload

  const newTodo = await fetch('/api/todos', {
    method: 'POST',
    body: JSON.stringify({ description })
  })

  return newTodo.json()
}

export const updateTodo = async (todoId: string, payload: Pick<Todo, 'description' | 'completed'>) => {
  const { description, completed } = payload

  const updatedTodo = await fetch(`/api/todos/${todoId}`, {
    method: 'PUT',
    body: JSON.stringify({ description, completed })
  })

  return updatedTodo.json()
}

export const deleteCompletedTodos = async () => {
  const deletedTodos = await fetch('/api/todos', {
    method: 'DELETE'
  })

  return deletedTodos.json()
}
