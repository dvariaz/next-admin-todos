'use client';

import clsx from 'clsx';
import { Todo } from '@prisma/client';

export interface IProps extends Todo {
  onChange?: (checked: boolean) => void
  className?: string;
}

const TodoItem: React.FC<IProps> = ({ description, completed, className, onChange }) => {
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    if (onChange) onChange(evt.target.checked);
  }

  return (
    <div className={clsx("relative flex p-4 pr-10 bg-gray-750 border border-gray-700 hover:border-gray-600 rounded-xl min-h-[160px] font-light", className)}>
      <div className='absolute top-4 right-4'>
        <input type="checkbox" checked={completed} readOnly onChange={handleChange}/>
      </div>
      <p className={clsx(completed && 'line-through')}>{description}</p>
    </div>
  )
}

export default TodoItem;
