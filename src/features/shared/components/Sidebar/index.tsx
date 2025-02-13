import clsx from 'clsx';

import { INavigationItem } from './types';

import Brand from '@/features/shared/components/Brand';
import ProfileCard from '@/features/shared/components/ProfileCard';
import SidebarItem from '@/features/shared/components/SidebarItem';

interface IProps {
  items: INavigationItem[];
  className?: string;
}

const Sidebar: React.FC<IProps> = ({ items, className }) => {
  return (
    <aside className={clsx("flex flex-col w-18 md:w-xs h-screen border-r border-r-gray-700 py-10 px-2 md:px-6", className)}>
      <Brand className='my-3 mx-auto'/>

      <ProfileCard
        name="Jesse Sullivan"
        photoSrc="https://www.kellyheckphotography.com/wp-content/uploads/2022/02/Amber-1705-cropped.jpg"
        className="my-14" />

      <nav>
        <ul className="flex flex-col gap-2">
          {
            items.map((item) => (
              <li key={item.href}>
                <SidebarItem {...item} />
              </li>
            ))
          }
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar;
