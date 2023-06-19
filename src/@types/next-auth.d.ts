import NextAuth from 'next-auth'

declare module 'next-auth' {
  export interface User {
    id: string
    name: string
    avatar_url: string
  }

  interface Session {
    user: User
  }
}
