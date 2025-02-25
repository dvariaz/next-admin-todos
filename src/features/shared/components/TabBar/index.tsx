'use client';

import clsx from 'clsx';
import { ITabItem } from './types';
import { useEffect } from 'react';

interface IProps {
  currentTabId?: string;
  tabItems: ITabItem[];
  onChangeTab?: (tabId: string) => void;
  className?: string;
}

const TabBar: React.FC<IProps> = ({ currentTabId, tabItems, onChangeTab, className }) => {
  useEffect(() => {
    if (!onChangeTab) return;

    const isValidTabId = !currentTabId || !tabItems.map((item) => item.id).includes(currentTabId);
    
    if (isValidTabId) onChangeTab(tabItems[0].id);
  }, [])

  const handleInputChange = (itemId: string) => {
    if (onChangeTab) {
      onChangeTab(itemId)
    }
  }

  return (
    <div className={clsx("bg-gray-750 px-2 py-3 rounded-lg", className)}>
      <ul
        className="flex gap-4"
        data-testid="tab-bar">
        {
          tabItems.map((item) => (
            <li key={item.id}>
              <input
                id={item.id}
                checked={currentTabId === item.id}
                type="radio"
                className="appearance-none"
                data-testid="tab-item"
                onChange={() => handleInputChange(item.id)}/>
              <label
                htmlFor={item.id}
                className={clsx("p-2 cursor-pointer hover:bg-gray-600 rounded-md", currentTabId === item.id && 'bg-indigo-600 hover:bg-indigo-500')}>
                {item.label}
              </label>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default TabBar;
