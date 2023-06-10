import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET() {
  const mostRecentBookReviews = await prisma.rating.findMany({
    orderBy: {
      created_at: 'asc',
    },
    include: {
      user: true,
      book: true,
    },
    take: 10,
  })

  return NextResponse.json([...mostRecentBookReviews])
}
