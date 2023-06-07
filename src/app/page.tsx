'use client'

import { ReviewCard } from '@/components/ReviewCard'
import { TrendUp } from 'phosphor-react'
import { Sidebar } from './components/Sidebar'

export default function Home() {
  return (
    <>
      <Sidebar />

      <main className="flex-1 px-24">
        <header className="flex gap-3 mt-16 mb-10">
          <TrendUp size={32} className="text-green-100" />
          <h2 className="text-2xl font-bold">Home</h2>
        </header>

        <div className="grid grid-cols-2">
          <ReviewCard />
        </div>
      </main>
    </>
  )
}
