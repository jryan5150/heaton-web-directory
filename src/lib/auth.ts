import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        // For demo purposes, using hardcoded credentials
        // In production, this should check against your database
        const validCredentials = [
          { username: 'admin', password: 'password123', name: 'Admin User', email: 'admin@heaton.com' },
          { username: 'user', password: 'user123', name: 'Regular User', email: 'user@heaton.com' }
        ]

        const user = validCredentials.find(u => u.username === credentials.username)

        if (user && await bcrypt.compare(credentials.password, await bcrypt.hash(user.password, 10))) {
          return {
            id: user.username,
            name: user.name,
            email: user.email,
          }
        }

        return null
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
}