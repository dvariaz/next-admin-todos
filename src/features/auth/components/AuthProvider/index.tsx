'use client';

import { SessionProvider } from 'next-auth/react';

interface IProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<IProps> = ({ children }) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
