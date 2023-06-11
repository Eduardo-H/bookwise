import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const query = searchParams.get('query')
  const category = searchParams.get('category')

  let books

  if (query && category) {
    books = await prisma.book.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
            },
          },
          {
            author: {
              contains: query,
            },
          },
        ],
        AND: {
          categories: {
            some: {
              category: {
                name: category,
              },
            },
          },
        },
      },
      include: {
        ratings: true,
      },
      take: 16,
    })
  } else if (query) {
    books = await prisma.book.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
            },
          },
          {
            author: {
              contains: query,
            },
          },
        ],
      },
      include: {
        ratings: true,
      },
      take: 16,
    })
  } else if (category) {
    books = await prisma.book.findMany({
      where: {
        categories: {
          some: {
            category: {
              name: category,
            },
          },
        },
      },
      include: {
        ratings: true,
      },
      take: 16,
    })
  } else {
    books = await prisma.book.findMany({
      include: {
        ratings: true,
      },
      take: 16,
    })
  }

  const booksWithRating = books.map((book) => {
    const ratingsSum = book.ratings.reduce((acc, rate) => acc + rate.rate, 0)
    const rating = Math.round(ratingsSum / book.ratings.length)

    return {
      ...book,
      rate: rating,
    }
  })

  return NextResponse.json([...booksWithRating])
}
