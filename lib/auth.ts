import CredentialsProvider from 'next-auth/providers/credentials'
import dbConnect from './dbConnect'
import UserModel from './models/UserModel'
import bcrypt from 'bcryptjs'
import NextAuth from 'next-auth'
export const config = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        dbConnect()
        if (credentials == null) return null

        const user = await UserModel.findOne({ email: credentials.email })
        if (!user) return null

        //    check if password is correct
        const isMatchPassword = await bcrypt.compare(
          credentials.password as string,
          user.password
        )
        if (!isMatchPassword) return null

        return user
      },
    }),
  ],
  pages: {
    signIn: '/signin',
    register: '/register',
    error: '/signin',
  },
  callbacks: {
    authorized({ request, auth }: any) {
      const protectedPaths = [
        /\/checkout/,
        /\/payment/,
        /\/place-order/,
        /\/profile/,
        /\/order\/{.*}/,
        /\/admin/,
      ]
      const pathName = request.nextUrl
      if (protectedPaths.some((path) => path.test(pathName))) return !!auth

      return true
    },
    async jwt({ user, trigger, session, token }: any) {
      if (user) {
        token.user = {
          _id: user._id,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
        }
      }
      if (trigger === 'update' && session) {
        token.user = {
          ...token.user,
          email: session.user.email,
          name: session.user.name,
        }
      }
      return token
    },
    session: async ({ session, token }: any) => {
      if (token) {
        session.user = token.user
      }
      return session
    },
  },
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(config)
