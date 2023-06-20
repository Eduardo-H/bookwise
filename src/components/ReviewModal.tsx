import Image from 'next/image'
import { BookOpen, BookmarkSimple, X } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'

import { Book } from '@/@types/book'

import { StarReview } from './StarReview'
import { Review } from '@/@types/review'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { Spinner } from './Spinner'
import Link from 'next/link'
import { formatDateFromNow } from '@/utils/formatDateFromNow'

interface Category {
  category: {
    name: string
  }
}

interface BookDetails extends Book {
  ratings: Review[]
  categories: Category[]
}

interface ReviewModalProps {
  bookId: string | null
}

async function getBookDetails(
  bookId: string | null,
): Promise<BookDetails | null> {
  if (!bookId) {
    return null
  }

  const response = await api.get<BookDetails>(`/books/${bookId}/details`)

  return response.data
}

export function ReviewModal({ bookId }: ReviewModalProps) {
  const {
    data: book,
    isLoading,
    isRefetching,
  } = useQuery({
    queryKey: [`bookDetails_${bookId}`],
    queryFn: () => getBookDetails(bookId),
  })

  const bookCategories = book
    ? book.categories.map((category) => category.category.name)
    : []

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-[rgba(0,0,0,0.3)]" />

      <Dialog.Content className="fixed top-0 bottom-0 right-0 w-[660px] py-6 px-12 overflow-y-auto bg-gray-800">
        <Dialog.Close asChild>
          <X
            size={28}
            weight="bold"
            className="p-1 ml-auto text-gray-400 rounded cursor-pointer transition-colors hover:bg-opacity-5 hover:bg-gray-100"
          />
        </Dialog.Close>

        {!isLoading && !isRefetching && book ? (
          <>
            <div className="w-full flex flex-col pt-6 pb-10 px-8 mt-4 bg-gray-700 rounded-lg">
              <div className="flex gap-8">
                <Image
                  src={book.cover_url}
                  alt={book.name}
                  width={172}
                  height={242}
                  className="rounded-lg"
                />

                <div className="flex flex-col">
                  <h2 className="text-lg font-bold">{book.name}</h2>
                  <span className="text-gray-300">{book.author}</span>

                  <div className="flex flex-col gap-1 mt-auto">
                    <StarReview stars={book.rate} />
                    <span className="text-gray-400">
                      {book.ratings.length} reviews
                    </span>
                  </div>
                </div>
              </div>

              <hr className="mt-10 mb-6 bg-gray-600 border-none h-px" />

              <div className="flex items-center gap-10">
                <div className="w-1/2 flex items-center gap-4">
                  <BookmarkSimple size={24} className="text-green-100" />
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-300">Category</span>
                    <span className="font-bold text-gray-200">
                      {bookCategories.join(', ')}
                    </span>
                  </div>
                </div>

                <div className="w-1/2 flex items-center gap-4">
                  <BookOpen size={24} className="text-green-100" />
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-300">Pages</span>
                    <span className="font-bold text-gray-200">
                      {book.total_pages}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-10 mb-4">
              <span className="text-sm">Reviews</span>

              <button className="flex items-center gap-2 px-2 py-1 font-bold text-sm text-purple-100 transition-colors rounded hover:bg-opacity-5 hover:bg-purple-100">
                Review it
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {book.ratings.length > 0 ? (
                book.ratings.map((review) => (
                  <div key={review.id} className="p-6 rounded-lg bg-gray-700">
                    <header className="flex items-start gap-4">
                      <Link
                        href={`/${review.user.id}/profile`}
                        className="flex items-center justify-center h-10 w-10 bg-gradient-to-b from-green-100 to-purple-100 rounded-full"
                      >
                        <Image
                          src={review.user.avatar_url}
                          alt={review.user.name}
                          height={36}
                          width={36}
                          className="rounded-full h-9 w-9 object-cover"
                        />
                      </Link>

                      <div className="flex flex-col flex-1">
                        <p className="text-gray-100">{review.user.name}</p>
                        <span className="text-sm text-gray-400">
                          {formatDateFromNow(review.created_at)}
                        </span>
                      </div>

                      <StarReview stars={review.rate} />
                    </header>

                    <article className="text-justify text-sm text-gray-300 mt-5">
                      {review.description}
                    </article>
                  </div>
                ))
              ) : (
                <span>No reviews made</span>
              )}
            </div>
          </>
        ) : (
          <div className="flex h-full justify-center items-center">
            <Spinner />
          </div>
        )}
      </Dialog.Content>
    </Dialog.Portal>
  )
}
