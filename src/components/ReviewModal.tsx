import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import { BookOpen, BookmarkSimple, Check, CircleNotch, X } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import classnames from 'classnames'

import { Book } from '@/@types/book'
import { Review } from '@/@types/review'
import { api } from '@/lib/axios'
import { formatDateFromNow } from '@/utils/formatDateFromNow'

import { StarReview } from './StarReview'
import { Spinner } from './Spinner'
import { StarReviewInput } from './StarReviewInput'
import { SignInModal } from './SignInModal'

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
  isOpen: boolean
  onClose: (isModalOpen: boolean) => void
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

export function ReviewModal({ bookId, isOpen, onClose }: ReviewModalProps) {
  const [reviewText, setReviewText] = useState('')
  const [selectedStarsReviewAmount, setSelectedStarsReviewAmount] = useState(0)
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)
  const [isReviewBoxOpen, setIsReviewBoxOpen] = useState(false)
  const [isSubmitingReview, setIsSubmitingReview] = useState(false)

  const { data: session, status } = useSession()

  const {
    data: book,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [`bookDetails_${bookId}`],
    queryFn: () => getBookDetails(bookId),
  })

  const userHasReviewedBook =
    book && session
      ? book.ratings.find((review) => review.user.id === session.user.id)
      : null

  const bookCategories = book
    ? book.categories.map((category) => category.category.name)
    : []

  function handleOpenReviewBox() {
    if (status === 'unauthenticated') {
      setIsSignInModalOpen(true)
      return
    }

    setIsReviewBoxOpen(true)
  }

  async function handleCreateReview() {
    setIsSubmitingReview(true)

    if (!reviewText.trim()) {
      window.alert("The review can't be blank.")
      return
    } else if (selectedStarsReviewAmount === 0) {
      window.alert('You need to select a rate for this book.')
      return
    }

    try {
      await api.post('/reviews', {
        bookId,
        description: reviewText,
        rate: selectedStarsReviewAmount,
      })

      refetch()
      setReviewText('')
      setSelectedStarsReviewAmount(0)
      setIsReviewBoxOpen(false)
    } catch (err) {
      console.log(err)
    } finally {
      setIsSubmitingReview(false)
    }
  }

  function toggleModalVisibility(open: boolean) {
    // Reseting all states before opening or closing the modal
    setReviewText('')
    setSelectedStarsReviewAmount(0)
    setIsSignInModalOpen(false)
    setIsReviewBoxOpen(false)

    onClose(open)
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={toggleModalVisibility} modal>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-[rgba(0,0,0,0.3)]" />

        <Dialog.Content className="fixed top-0 bottom-0 right-0 w-full md:w-[660px] py-4 md:py-6 px-6 md:px-12 overflow-y-auto bg-gray-800">
          <Dialog.Close asChild>
            <X
              size={28}
              weight="bold"
              className="p-1 ml-auto text-gray-400 rounded cursor-pointer transition-colors hover:bg-opacity-5 hover:bg-gray-100"
            />
          </Dialog.Close>

          {!isLoading && book ? (
            <>
              <div className="w-full flex flex-col pt-6 pb-6 sm:pb-10 px-8 mt-4 bg-gray-700 rounded-lg">
                <div className="flex gap-8">
                  <Image
                    src={book.cover_url}
                    alt={book.name}
                    width={172}
                    height={242}
                    className="w-[80px] h-[110px] sm:w-[172px] sm:h-[242px] rounded-lg"
                  />

                  <div className="flex flex-col gap-1 sm:gap-0">
                    <h2 className="text-lg font-bold leading-shorter">
                      {book.name}
                    </h2>
                    <span className="text-gray-300 text-sm sm:text-base">
                      {book.author}
                    </span>

                    <div className="flex flex-col gap-1 mt-auto">
                      <StarReview stars={book.rate} />
                      <span className="text-gray-400 text-sm sm:text-base">
                        {book.ratings.length} reviews
                      </span>
                    </div>
                  </div>
                </div>

                <hr className="mt-10 mb-6 bg-gray-600 border-none h-px" />

                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-10">
                  <div className="w-full sm:w-1/2 flex items-center gap-4">
                    <BookmarkSimple size={24} className="text-green-100" />
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm text-gray-300">
                        Category
                      </span>
                      <span className="text-sm sm:text-base font-bold text-gray-200">
                        {bookCategories.join(', ')}
                      </span>
                    </div>
                  </div>

                  <div className="w-full sm:w-1/2 flex items-center gap-4">
                    <BookOpen size={24} className="text-green-100" />
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm text-gray-300">
                        Pages
                      </span>
                      <span className="text-sm sm:text-base font-bold text-gray-200">
                        {book.total_pages}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-10 mb-4">
                <span className="text-sm">Reviews</span>

                {!isReviewBoxOpen && !userHasReviewedBook && (
                  <button
                    className="flex items-center gap-2 px-2 py-1 font-bold text-sm text-purple-100 transition-colors rounded hover:bg-opacity-5 hover:bg-purple-100"
                    onClick={handleOpenReviewBox}
                  >
                    Review it
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-3">
                {isReviewBoxOpen && session && (
                  <div className="p-6 rounded-lg bg-gray-700">
                    <header className="flex items-center gap-3 sm:gap-4">
                      <div className="flex items-center justify-center h-7 w-7 sm:h-10 sm:w-10 bg-gradient-to-b from-green-100 to-purple-100 rounded-full">
                        <Image
                          src={session.user.avatar_url}
                          alt={session.user.name}
                          height={36}
                          width={36}
                          className="h-6 w-6 sm:w-9 sm:h-9 rounded-full object-cover"
                        />
                      </div>

                      <div className="flex flex-col flex-1">
                        <p className="text-gray-100 font-bold text-sm sm:text-base">
                          {session.user.name}
                        </p>
                      </div>

                      <StarReviewInput
                        selectedStarsAmount={selectedStarsReviewAmount}
                        onSelectStarsAmount={setSelectedStarsReviewAmount}
                      />
                    </header>

                    <div className="relative">
                      <textarea
                        placeholder="Write your review"
                        maxLength={450}
                        rows={9}
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        className="w-full py-3 px-5 mt-6 text-sm rounded border border-gray-500 text-gray-100 bg-gray-800 placeholder:text-gray-400 focus:border-green-100 focus:outline-none"
                      ></textarea>
                      <span className="absolute bottom-3 right-3 text-sm text-gray-400">
                        {reviewText.length}/450
                      </span>
                    </div>

                    <footer className="flex justify-end items-center gap-2 mt-3">
                      <button
                        className="p-1 sm:p-2 rounded bg-gray-600 transition-colors hover:bg-gray-500 disabled:opacity-90 disabled:cursor-not-allowed disabled:hover:bg-gray-600"
                        onClick={() => setIsReviewBoxOpen(false)}
                        disabled={isSubmitingReview}
                      >
                        <X size={24} className="text-purple-100" />
                      </button>

                      <button
                        className="p-1 sm:p-2 rounded bg-gray-600 transition-colors hover:bg-gray-500 disabled:opacity-90 disabled:cursor-not-allowed disabled:hover:bg-gray-600"
                        onClick={handleCreateReview}
                        disabled={isSubmitingReview}
                      >
                        {!isSubmitingReview ? (
                          <Check size={24} className="text-green-100" />
                        ) : (
                          <CircleNotch
                            size={24}
                            className="text-gray-100 animate-spin"
                          />
                        )}
                      </button>
                    </footer>
                  </div>
                )}

                {book.ratings.length > 0 ? (
                  book.ratings.map((review) => (
                    <div
                      key={review.id}
                      className={classnames('p-6 rounded-lg', {
                        'bg-gray-600':
                          session && session.user.id === review.user.id,
                        'bg-gray-700':
                          !session || session.user.id !== review.user.id,
                      })}
                    >
                      <header className="flex items-start gap-3 sm:gap-4">
                        <Link
                          href={`/${review.user.id}/profile`}
                          className="flex items-center justify-center h-7 w-7 sm:h-10 sm:w-10 bg-gradient-to-b from-green-100 to-purple-100 rounded-full"
                        >
                          <Image
                            src={review.user.avatar_url}
                            alt={review.user.name}
                            height={36}
                            width={36}
                            className="h-6 w-6 sm:w-9 sm:h-9 rounded-full object-cover"
                          />
                        </Link>

                        <div className="flex flex-col flex-1">
                          <p className="text-gray-100 font-bold text-sm sm:text-base">
                            {review.user.name}
                          </p>
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

      <SignInModal isOpen={isSignInModalOpen} onClose={setIsSignInModalOpen} />
    </Dialog.Root>
  )
}
