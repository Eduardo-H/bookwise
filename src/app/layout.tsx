import { Nunito_Sans } from 'next/font/google'

import '../styles/global.css'
import { RQProvider } from './components/RQProvider'

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
        <RQProvider>{children}</RQProvider>
      </body>
    </html>
  )
}
