import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'
import { dbUsers } from 'database'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: { label: 'E-Mail', type: 'email', placeholder: 'Your E-Mail' },
        password: { label: 'Password', type: 'password', placeholder: 'Your password' },
      },
      async authorize(credentials) {
        return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password)
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  session: {
    maxAge: 2592000, // 30d
    strategy: 'jwt',
    updateAge: 86400, // 1d
  },

  // Custom pages
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
  },
  // Callbacks
  callbacks: {
    async jwt({ account, token, user }) {
      if (account) {
        token.accessToken = account.access_token
        switch (account.type) {
          case 'oauth':
            token.user = await dbUsers.oAuthToDbUser(user?.email || '', user?.name || '')
            break
          case 'credentials':
            token.user = user
            break

          default:
            break
        }
      }
      return token
    },
    async session({ session, token, user }) {
      session.accessToken = token.access_token
      session.user = token.user as any
      return session
    },
  },
})
