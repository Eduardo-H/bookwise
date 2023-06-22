import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../../auth/[...nextauth]/route'

export async function GET() {
  const session = await getServerSession(buildNextAuthOptions())
  let lastUserBookReview = null

  const mostRecentBookReviews = await prisma.rating.findMany({
    where: {
      NOT: {
        user_id: session?.user.id,
      },
    },
    orderBy: {
      created_at: 'desc',
    },
    include: {
      user: true,
      book: true,
    },
    take: 10,
  })

  if (session) {
    lastUserBookReview = await prisma.rating.findFirst({
      where: {
        user_id: session.user.id,
      },
      orderBy: {
        created_at: 'desc',
      },
      include: {
        user: true,
        book: true,
      },
    })
  }

  return NextResponse.json({
    lastUserBookReview,
    mostRecentBookReviews,
  })
}
