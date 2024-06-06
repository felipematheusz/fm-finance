import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import db from '@/lib/db';
import { compareSync } from 'bcrypt-ts';

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const email = credentials.email as string
        const password = credentials.password as string

        if (!email || !password) {
          return null
        }

        const user = await db.user.findUnique({
          where: {
            email
          }
        })

        if (!user) {
          return null
        }

        const match = compareSync(password, user.password)

        if (!match) {
          return null
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      }
    },

    ),

  ],
  callbacks: {
    async session({ session, token }) {

      if (token && typeof token.id === 'string') {
        session.user.id = token.id;
      }
      return session;
    },
    async jwt({ token, user }) {

      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
});