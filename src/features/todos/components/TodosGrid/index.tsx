'use client';

import { Todo } from '@prisma/client';
import TodoFastInput from '@/features/todos/components/TodoFastInput';
import TodoItem from '@/features/todos/components/TodoItem';
import { useRouter } from 'next/navigation';
import { IoTrashBin } from 'react-icons/io5';

interface IProps {
  todos: Todo[];
  onCreate?: (payload: Pick<Todo, 'description'>) => Promise<void>;
  onUpdate?: (todo: Todo) => Promise<void>
  onDeleteCompleted?: () => Promise<void>
}

const TodosGrid: React.FC<IProps> = ({ todos, onCreate, onUpdate, onDeleteCompleted }) => {
  const router = useRouter();

  const handleCreateItem = async (payload: Pick<Todo, 'description'>) => {
    if (onCreate) {
      await onCreate(payload);
      
      router.refresh();
    }
  }

  const handleItemChange = async (todo: Todo) => {
    if (onUpdate) {
      await onUpdate(todo);

      router.refresh();
    }
    
  }

  const handleCleanCompleted = async (evt: React.MouseEvent) => {
    evt.preventDefault();
    if (onDeleteCompleted) {
      await onDeleteCompleted();

      router.refresh();
    }
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row mb-8 gap-4">
        <TodoFastInput
          className="flex-1"
          onSubmit={handleCreateItem} />

        <div className="w-full md:w-auto">
          <button
            className="pl-3 pr-4 py-1 ml-2 bg-red-700 hover:bg-red-600 rounded-lg w-full md:w-auto cursor-pointer flex justify-center items-center text-nowrap"
            onClick={handleCleanCompleted}>
            <IoTrashBin size={18} className="mr-2"/>
            Clean completed
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          todos.map((todo) => (
            <TodoItem key={todo.id} {...todo} onChange={(newValue) => handleItemChange({...todo, completed: newValue})}/>
          ))
        }
      </div>
    </div>
  )
}

export default TodosGrid;