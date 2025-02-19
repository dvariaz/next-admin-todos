import clsx from 'clsx';
import { User } from 'next-auth';

import { INavigationItem } from './types';


import Brand from '@/features/shared/components/Brand';
import ProfileCard from '@/features/shared/components/ProfileCard';
import SidebarItem from '@/features/shared/components/SidebarItem';
import LogoutButton from '@/features/auth/components/LogoutButton';

interface IProps {
  user: Pick<User, 'name' | 'image' | 'roles'>;
  items: INavigationItem[];
  className?: string;
}

const Sidebar: React.FC<IProps> = ({ user, items, className }) => {
  return (
    <aside className={clsx("flex flex-col w-18 md:w-xs h-screen border-r border-r-gray-700 pt-10 shrink-0", className)}>
      <Brand className='my-3 mx-auto px-2 md:px-6'/>

      <ProfileCard
        name={user.name as string}
        photoSrc={user.image as string}
        className="my-4 xl:my-14 px-2 md:px-6"
        roles={user.roles as string[]} />

      <nav className="flex-1 px-2 md:px-6">
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

      <LogoutButton className="w-full border-t border-t-gray-700" />
    </aside>
  )
}

export default Sidebar;
