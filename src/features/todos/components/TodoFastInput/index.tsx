'use client';

import clsx from 'clsx';
import { Todo } from '@prisma/client';
import { FormEvent } from 'react';

interface IProps {
  onSubmit?: (payload: Pick<Todo, 'description'>) => void
  className?: string
}

const TodoFastInput: React.FC<IProps> = ({ onSubmit, className }) => {
  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();

    if (onSubmit) {
      const formData = new FormData(evt.currentTarget as HTMLFormElement);
      onSubmit(Object.fromEntries(formData) as Pick<Todo, 'description'>);
      (evt.currentTarget as HTMLFormElement).reset();
    };
  }

  return (
    <form
      className={clsx("flex gap-4 flex-col md:flex-row", className)}
      onSubmit={handleSubmit}>
      <input
        name="description"
        type="text"
        className="flex-1 bg-gray-900 border border-gray-700 px-2 py-1 rounded-lg"
        placeholder="What do you need to do?"
        autoComplete='off' />

      <button type="submit" className="px-2 py-1 ml-2 bg-blue-700 hover:bg-blue-600 rounded-lg min-w-[100px] cursor-pointer">Add</button>
    </form>
  )
}

export default TodoFastInput;