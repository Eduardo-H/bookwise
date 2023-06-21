import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { prisma } from '@/lib/prisma'
import { buildNextAuthOptions } from '../auth/[...nextauth]/route'

export async function POST(request: Request) {
  const session = await getServerSession(buildNextAuthOptions())

  if (!session) {
    return NextResponse.json(
      {
        message: 'No session found',
      },
      { status: 401 },
    )
  }

  const { bookId, description, rate } = await request.json()

  const review = await prisma.rating.create({
    data: {
      book_id: bookId,
      description,
      rate,
      user_id: session.user.id,
    },
    include: {
      user: true,
    },
  })

  return NextResponse.json(review)
}
