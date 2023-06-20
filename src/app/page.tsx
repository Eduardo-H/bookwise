'use client'

import Link from 'next/link'
import { CaretRight, TrendUp } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'

import { Book } from '@/@types/book'
import { Review } from '@/@types/review'
import { api } from '@/lib/axios'

import { BookCard } from '@/components/BookCard'
import { ReviewCard } from '@/components/ReviewCard'
import { useQuery } from '@tanstack/react-query'
import { Sidebar } from '@/components/Sidebar'
import { Spinner } from '@/components/Spinner'
import { useState } from 'react'
import { ReviewModal } from '@/components/ReviewModal'

async function getMostRecentReviews(): Promise<Review[]> {
  const response = await api.get<Review[]>('/reviews/most-recent')

  return response.data
}

async function getMostPopularBooks(): Promise<Book[]> {
  const response = await api.get<Book[]>('/books/most-popular')

  return response.data
}

export default function Home() {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null)

  const { data: mostRecentReviews, isLoading: isLoadingReviews } = useQuery({
    queryKey: ['mostRecentReviews'],
    queryFn: getMostRecentReviews,
  })
  const { data: mostPopularBooks, isLoading: isLoadingPopularBooks } = useQuery(
    {
      queryKey: ['mostPopularBooks'],
      queryFn: getMostPopularBooks,
    },
  )

  function handleSelectBook(bookId: string) {
    setSelectedBookId(bookId)
    setIsReviewModalOpen(true)
  }

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

            {isLoadingReviews ? (
              <div className="flex justify-center mt-12">
                <Spinner />
              </div>
            ) : mostRecentReviews ? (
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
                  href="/explore"
                  className="flex items-center gap-2 p-2 font-bold text-sm text-purple-100 transition-colors rounded hover:bg-opacity-5 hover:bg-purple-100"
                >
                  See all
                  <CaretRight weight="bold" size={16} />
                </Link>
              </div>

              {isLoadingPopularBooks ? (
                <div className="flex justify-center mt-12">
                  <Spinner />
                </div>
              ) : mostPopularBooks ? (
                <Dialog.Root
                  open={isReviewModalOpen}
                  onOpenChange={setIsReviewModalOpen}
                >
                  {mostPopularBooks.map((book) => (
                    <BookCard
                      key={book.id}
                      title={book.name}
                      author={book.author}
                      coverUrl={book.cover_url}
                      stars={book.rate}
                      variant="small"
                      onClick={() => handleSelectBook(book.id)}
                    />
                  ))}

                  <ReviewModal bookId={selectedBookId} />
                </Dialog.Root>
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
