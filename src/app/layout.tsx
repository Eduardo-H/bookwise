import { Nunito_Sans } from 'next/font/google'

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
        {children}
      </body>
    </html>
  )
}
