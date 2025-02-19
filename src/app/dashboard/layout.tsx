import { redirect } from 'next/navigation';
import { getServerSession, User } from 'next-auth';
import { RiLayoutMasonryFill } from 'react-icons/ri';
import { LuListTodo } from 'react-icons/lu';
import { PiComputerTowerFill } from 'react-icons/pi';
import { BiCookie } from 'react-icons/bi';
import { CiShoppingBasket, CiShoppingCart } from 'react-icons/ci';

import Sidebar from '@/features/shared/components/Sidebar';
import ShoppingCartBadge from '@/features/shopping-cart/containers/ShoppingCartBadge';
import { authOptions } from '@/features/auth/config';

interface IProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<IProps> = async ({ children }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  const loggedUser = session?.user as User;

  return (
    <div className="flex">
      <Sidebar
        user={loggedUser}
        items={[
          {
            label: 'Dashboard',
            href: '/dashboard',
            icon: <RiLayoutMasonryFill size={20} />
          },
          {
            label: 'REST Todos',
            href: '/dashboard/rest-todos',
            icon: <LuListTodo size={20} />
          },
          {
            label: 'Server actions',
            href: '/dashboard/server-todos',
            icon: <PiComputerTowerFill size={20} />
          },
          {
            label: 'Cookies',
            href: '/dashboard/cookies',
            icon: <BiCookie size={20} />
          },
          {
            label: 'Products',
            href: '/dashboard/products',
            icon: <CiShoppingBasket size={20} />
          },
          {
            label: 'Cart',
            href: '/dashboard/cart',
            icon: <CiShoppingCart size={20} />
          }
        ]} />

        <main className="flex-1 px-10 bg-gray-850">
          <header className="py-12 flex">
            <h1 className="text-3xl flex-1">Dashboard</h1>

            <ShoppingCartBadge />
          </header>

          {children}
        </main>
    </div>
  )
}

export default DashboardLayout;
