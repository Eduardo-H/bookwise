'use client'

import { queryClient } from '@/lib/queryClient'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

interface RQProviderProps {
  children: ReactNode
}

export function RQProvider({ children }: RQProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
