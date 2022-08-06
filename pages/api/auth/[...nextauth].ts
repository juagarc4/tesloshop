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
        // console.log(credentials)
        // TODO: Validate against DB
        return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password)
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  // Callbacks
  callbacks: {
    async jwt({ account, token, user }) {
      if (account) {
        token.accessToken = account.access_token
        switch (account.type) {
          case 'oauth':
            // TODO: Create user of verify against DB it it exists
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
