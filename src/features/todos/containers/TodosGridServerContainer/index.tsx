import { revalidatePath } from 'next/cache';
import { Todo } from '@prisma/client';

import TodosGrid from '@/features/todos/components/TodosGrid';
import { createTodo, deleteCompletedTodos, updateTodo } from '@/features/todos/actions/todos-actions';

interface IProps {
  todos: Todo[];
}

const TodosGridServerContainer: React.FC<IProps> = ({ todos }) => {
  const handleCreateTodo = async (payload: Pick<Todo, 'description'>) => {
    'use server';
    await createTodo(payload);
    revalidatePath('/dashboard/server-todos');
  }

  const handleUpdateTodo = async (todo: Todo) => {
    'use server';
    await updateTodo(todo.id, todo);
    revalidatePath('/dashboard/server-todos');
  }

  const handleDeleteCompleted = async () => {
    'use server';
    await deleteCompletedTodos();
    revalidatePath('/dashboard/server-todos');
  }

  return (
    <TodosGrid
      todos={todos}
      onCreate={handleCreateTodo}
      onUpdate={handleUpdateTodo}
      onDeleteCompleted={handleDeleteCompleted} />
  )
}

export default TodosGridServerContainer;