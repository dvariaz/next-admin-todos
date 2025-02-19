'use client';

import clsx from 'clsx';
import { CiLogout } from 'react-icons/ci';
import { IoShieldOutline } from 'react-icons/io5';
import { useSession, signOut, signIn } from 'next-auth/react';

interface IProps {
  className?: string;
}

const LogoutButton: React.FC<IProps> = ({ className }) => {
  const { status } = useSession();

  if (status === 'loading') {
    return (
      <button className={clsx("cursor-pointer flex justify-center items-center gap-4 p-4 hover:bg-gray-700", className)}>
        <IoShieldOutline />
        <span>Wait...</span>
      </button>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <button
        className={clsx("cursor-pointer flex justify-center items-center gap-4 p-4 hover:bg-gray-700", className)}
        onClick={() => signIn()}>
        <CiLogout />
        <span>Log In</span>
      </button>
    )
  }

  return (
    <button
      className={clsx("cursor-pointer flex justify-center items-center gap-4 p-4 hover:bg-gray-700", className)}
      onClick={() => signOut()}>
      <CiLogout />
      <span>Logout</span>
    </button>
  )
}

export default LogoutButton