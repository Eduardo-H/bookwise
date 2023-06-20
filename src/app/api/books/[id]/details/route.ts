import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  console.log(params)

  const bookId = params.id

  const book = await prisma.book.findUnique({
    where: { id: bookId },
    include: {
      ratings: {
        include: {
          user: true,
        },
      },
      categories: {
        select: {
          category: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  })

  const bookRate = await prisma.rating.aggregate({
    where: {
      book_id: bookId,
    },
    _avg: { rate: true },
  })

  return NextResponse.json({ ...book, rate: bookRate._avg.rate })
}
