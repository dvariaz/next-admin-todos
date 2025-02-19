import { NextAuthOptions } from "next-auth";
import { Adapter } from 'next-auth/adapters';
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID ?? '',
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? '',
    }),
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID ?? '',
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? '',
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token }) {
      const dbUser = await prisma.user.findUnique({ where: { email: token.email ?? 'no-email' } });

      token.roles = dbUser?.roles as string[] ?? ['no-roles'];
      token.id = dbUser?.id ?? 'no-uuid';

      return token
    },

    async session({ session, token }) {
      if (!session || !session.user) return session;

      session.user.id = token.id;
      session.user.roles = token.roles;

      return session;
    }
  }
}
