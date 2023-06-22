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
import Image from 'next/image'
import { formatDateFromNow } from '@/utils/formatDateFromNow'
import { StarReview } from '@/components/StarReview'

interface MostRecentReviewsResponse {
  lastUserBookReview: Review | null
  mostRecentBookReviews: Review[]
}

async function getMostRecentReviews(): Promise<MostRecentReviewsResponse> {
  const response = await api.get<MostRecentReviewsResponse>(
    '/reviews/most-recent',
  )

  return response.data
}

async function getMostPopularBooks(): Promise<Book[]> {
  const response = await api.get<Book[]>('/books/most-popular')

  return response.data
}

export default function Home() {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null)

  const { data: reviews, isLoading: isLoadingReviews } = useQuery({
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
          <div className="flex flex-col">
            {reviews && reviews.lastUserBookReview && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h6 className="text-sm pt-2">Your last review</h6>

                  <Link
                    href={`/${reviews.lastUserBookReview.user.id}/profile`}
                    className="flex items-center gap-2 px-2 py-1 font-bold text-sm text-purple-100 transition-colors rounded hover:bg-opacity-5 hover:bg-purple-100"
                  >
                    See all
                    <CaretRight weight="bold" size={14} />
                  </Link>
                </div>

                <div className="flex gap-5 px-6 py-5 rounded-lg bg-gray-600 mb-10">
                  <Image
                    src={reviews.lastUserBookReview.book.cover_url}
                    alt={`Cover of the book ${reviews.lastUserBookReview.book.name}`}
                    width={108}
                    height={152}
                    className="rounded"
                  />

                  <div className="flexflex-col flex-1">
                    <header className="flex w-full items-center justify-between">
                      <span className="text-sm text-gray-300">
                        {formatDateFromNow(
                          reviews.lastUserBookReview.created_at,
                        )}
                      </span>

                      <StarReview stars={reviews.lastUserBookReview.rate} />
                    </header>

                    <div className="mt-3">
                      <h6 className="font-bold leading-short">
                        {reviews.lastUserBookReview.book.name}
                      </h6>
                      <span className="text-sm text-gray-400">
                        {reviews.lastUserBookReview.book.author}
                      </span>
                    </div>

                    <article className="text-sm text-gray-300 text-justify mt-6">
                      {reviews.lastUserBookReview.description}
                    </article>
                  </div>
                </div>
              </>
            )}

            <h6 className="text-sm mb-4 pt-2">Most recent reviews</h6>

            {isLoadingReviews ? (
              <div className="flex justify-center mt-12">
                <Spinner />
              </div>
            ) : reviews ? (
              <div className="flex flex-col gap-3">
                {reviews.mostRecentBookReviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    reviewer={review.user}
                    book={review.book}
                    stars={review.rate}
                    review={review.description}
                    reviewDate={review.created_at}
                  />
                ))}
              </div>
            ) : (
              <span>No data</span>
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h6 className="text-sm">Popular books</h6>

              <Link
                href="/explore"
                className="flex items-center gap-2 px-2 py-1 font-bold text-sm text-purple-100 transition-colors rounded hover:bg-opacity-5 hover:bg-purple-100"
              >
                See all
                <CaretRight weight="bold" size={14} />
              </Link>
            </div>

            {isLoadingPopularBooks ? (
              <div className="flex justify-center mt-12">
                <Spinner />
              </div>
            ) : mostPopularBooks ? (
              <div className="flex flex-col gap-3">
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
              </div>
            ) : (
              <span>No data</span>
            )}
          </div>
        </div>

        <Dialog.Root
          open={isReviewModalOpen}
          onOpenChange={setIsReviewModalOpen}
        >
          <ReviewModal bookId={selectedBookId} />
        </Dialog.Root>
      </main>
    </>
  )
}
