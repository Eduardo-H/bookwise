import { Nunito_Sans } from 'next/font/google'

import { NextAuthProvider, ReactQueryProvider } from './providers'

import '../styles/global.css'

const nunito = Nunito_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'BookWise',
  description: 'Read and comment about your books.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${nunito.className} flex min-h-screen`}>
        <NextAuthProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
