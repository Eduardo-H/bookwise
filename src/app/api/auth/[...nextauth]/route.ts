import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'
import GitHubProvider, { GithubProfile } from 'next-auth/providers/github'

import { PrismaAdapter } from '@/lib/auth/prismaAdapter'

export function buildNextAuthOptions(): NextAuthOptions {
  return {
    adapter: PrismaAdapter(),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        authorization: {
          params: {
            prompt: 'consent',
            access_type: 'offline',
            response_type: 'code',
            scope:
              'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
          },
        },
        profile(profile: GoogleProfile) {
          return {
            id: profile.sub,
            name: profile.name,
            avatar_url: profile.picture,
          }
        },
      }),
      GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID ?? '',
        clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
        authorization: {
          params: {
            scope: 'read:user',
          },
        },
        profile(profile: GithubProfile) {
          return {
            id: String(profile.id),
            name: profile.name!,
            avatar_url: profile.avatar_url,
          }
        },
      }),
    ],
    callbacks: {
      async signIn({ account }) {
        if (
          account?.provider === 'google' &&
          account?.scope?.includes(
            'https://www.googleapis.com/auth/userinfo.profile',
          )
        ) {
          return true
        } else if (
          account?.provider === 'github' &&
          account?.scope?.includes('read:user')
        ) {
          return true
        }

        return '/login'
      },
      async session({ session, user }) {
        return {
          ...session,
          user,
        }
      },
    },
  }
}

const handler = NextAuth(buildNextAuthOptions())

export { handler as GET, handler as POST }
