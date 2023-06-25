import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const userId = params.id

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      ratings: {
        include: {
          book: true,
        },
        orderBy: {
          created_at: 'desc',
        },
      },
    },
  })

  const categoriesCountRaw: { name: string; total_books: bigint }[] =
    await prisma.$queryRaw`
      SELECT
        categories.name,
        COUNT(DISTINCT categories.id) AS total_books
      FROM
        ratings
      INNER JOIN books ON books.id = ratings.book_id
      INNER JOIN CategoriesOnBooks ON CategoriesOnBooks.book_id = books.id
      INNER JOIN categories ON categories.id = CategoriesOnBooks.categoryId
      WHERE ratings.user_id = ${userId}
      GROUP BY categories.id      
      ORDER BY total_books DESC
    `

  const mostReadCategory =
    categoriesCountRaw.length > 0 ? categoriesCountRaw[0].name : null

  return NextResponse.json({ user, mostReadCategory })
}
