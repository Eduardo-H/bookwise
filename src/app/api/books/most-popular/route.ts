import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET() {
  const mostPopularBooks = await prisma.book.findMany({
    orderBy: {
      ratings: { _count: 'desc' },
    },
    take: 5,
  })

  return NextResponse.json([...mostPopularBooks])
}
