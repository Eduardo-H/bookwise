import { Nunito_Sans } from 'next/font/google'

import '../styles/global.css'
import { Sidebar } from './components/Sidebar'

const inter = Nunito_Sans({ subsets: ['latin'] })

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
      <body className={`${inter.className} flex gap-24 min-h-screen`}>
        <Sidebar />
        {children}
      </body>
    </html>
  )
}
