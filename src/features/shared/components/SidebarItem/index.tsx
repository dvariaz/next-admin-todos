'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface IProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SidebarItem: React.FC<IProps> = ({ href, icon, label }) => {
  const pathname = usePathname();

  return (
    <Link href={href} className={clsx("flex justify-center md:justify-start items-center p-4 hover:bg-gray-700 rounded-xl", pathname === href && 'bg-gray-700')}>
      {icon}
      <span className="hidden md:block md:ml-2">
        {label}
      </span>
    </Link>
  )
}

export default SidebarItem;
