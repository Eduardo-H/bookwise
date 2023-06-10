'use client'

import Link from 'next/link'
import { CaretRight, TrendUp } from 'phosphor-react'

import { Book } from '@/@types/book'
import { Review } from '@/@types/review'
import { api } from '@/lib/axios'

import { BookCard } from '@/components/BookCard'
import { ReviewCard } from '@/components/ReviewCard'
import { Sidebar } from './components/Sidebar'
import { useQuery } from '@tanstack/react-query'

async function getMostRecentReviews(): Promise<Review[]> {
  const response = await api.get<Review[]>('/reviews/most-recent')

  return response.data
}

async function getMostPopularBooks(): Promise<Book[]> {
  const response = await api.get<Book[]>('/books/most-popular')

  return response.data
}

export default function Home() {
  const { data: mostRecentReviews } = useQuery({
    queryKey: ['mostRecentReviews'],
    queryFn: getMostRecentReviews,
  })
  const { data: mostPopularBooks } = useQuery({
    queryKey: ['mostPopularBooks'],
    queryFn: getMostPopularBooks,
  })

  console.log(mostRecentReviews)

  return (
    <>
      <Sidebar />

      <main className="pl-80 flex-1 px-24 pb-5">
        <header className="flex gap-3 mt-16 mb-10">
          <TrendUp size={32} className="text-green-100" />
          <h2 className="text-2xl font-bold">Home</h2>
        </header>

        <div className="grid grid-cols-[70%_30%]  gap-16">
          <div className="flex flex-col gap-3">
            <h6 className="text-sm mb-2 pt-2">Most recent reviews</h6>

            {mostRecentReviews ? (
              mostRecentReviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  reviewer={review.user}
                  book={review.book}
                  stars={review.rate}
                  review={review.description}
                  reviewDate={review.created_at}
                />
              ))
            ) : (
              <span>No data</span>
            )}
          </div>

          <div>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <h6 className="text-sm">Popular books</h6>
                <Link
                  href="/"
                  className="flex items-center gap-2 p-2 font-bold text-sm text-purple-100 transition-colors rounded hover:bg-opacity-5 hover:bg-purple-100"
                >
                  See all
                  <CaretRight weight="bold" size={16} />
                </Link>
              </div>

              {mostPopularBooks ? (
                mostPopularBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    title={book.name}
                    author={book.author}
                    coverUrl={book.cover_url}
                    stars={4}
                    variant="small"
                  />
                ))
              ) : (
                <span>No data</span>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
