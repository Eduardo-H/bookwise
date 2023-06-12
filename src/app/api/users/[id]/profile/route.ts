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
      GROUP BY categories.id
      HAVING ratings.user_id = ${userId}
      ORDER BY total_books DESC
    `

  const mostReadCategory = categoriesCountRaw[0].name

  return NextResponse.json({ user, mostReadCategory })
}
