'use client'

import { TrendUp } from 'phosphor-react'

export default function Home() {
  return (
    <main className="flex-1">
      <header className="flex gap-3 mt-16 mb-10">
        <TrendUp size={32} className="text-green-100" />
        <h2 className="text-2xl font-bold">Home</h2>
      </header>
    </main>
  )
}
