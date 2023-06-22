import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET() {
  const mostPopularBooks = await prisma.book.findMany({
    include: {
      ratings: true,
    },
    orderBy: {
      ratings: { _count: 'desc' },
    },
    take: 5,
  })

  const mostPopularBooksWithRating = mostPopularBooks.map((book) => {
    const rate = Math.round(
      book.ratings.reduce((acc, rating) => acc + rating.rate, 0) /
        book.ratings.length,
    )

    return {
      ...book,
      rate: rate <= 5 ? rate : 5,
    }
  })

  return NextResponse.json([...mostPopularBooksWithRating])
}
