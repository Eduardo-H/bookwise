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
        orderBy: {
          created_at: 'desc',
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

  const bookRateAvg = await prisma.rating.aggregate({
    where: {
      book_id: bookId,
    },
    _avg: { rate: true },
  })

  let bookRate = 0

  if (bookRateAvg._avg.rate) {
    bookRate =
      Math.round(bookRateAvg._avg.rate) <= 5
        ? Math.round(bookRateAvg._avg.rate)
        : 5
  }

  return NextResponse.json({ ...book, rate: bookRate })
}
