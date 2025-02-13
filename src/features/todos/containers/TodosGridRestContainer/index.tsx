'use client';

import TodosGrid from '@/features/todos/components/TodosGrid';
import { Todo } from '@prisma/client';
import { createTodo, deleteCompletedTodos, updateTodo } from '@/features/todos/utils/api';

interface IProps {
  todos: Todo[];
}

const TodosGridRestContainer: React.FC<IProps> = ({ todos }) => {
  const handleCreateTodo = async (payload: Pick<Todo, 'description'>) => {
    await createTodo(payload); 
  }

  const handleUpdateTodo = async (todo: Todo) => {
    await updateTodo(todo.id, todo);
  }

  const handleDeleteCompleted = async () => {
    await deleteCompletedTodos();
  }

  return (
    <TodosGrid
      todos={todos}
      onCreate={handleCreateTodo}
      onUpdate={handleUpdateTodo}
      onDeleteCompleted={handleDeleteCompleted} />
  )
}

export default TodosGridRestContainer;