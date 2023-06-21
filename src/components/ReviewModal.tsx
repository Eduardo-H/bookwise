import Image from 'next/image'
import { BookOpen, BookmarkSimple, Check, X } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'

import { Book } from '@/@types/book'

import { StarReview } from './StarReview'
import { Review } from '@/@types/review'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { Spinner } from './Spinner'
import Link from 'next/link'
import { formatDateFromNow } from '@/utils/formatDateFromNow'

import googleIcon from '../assets/svg/google-icon.svg'
import githubIcon from '../assets/svg/github-icon.svg'
import { useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { StarReviewInput } from './StarReviewInput'

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
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)
  const [isReviewBoxOpen, setIsReviewBoxOpen] = useState(false)
  const [reviewText, setReviewText] = useState('')
  const [selectedStarsReviewAmount, setSelectedStarsReviewAmount] = useState(0)

  const { data: session, status } = useSession()

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

  async function handleSignInWithGoogle() {
    await signIn('google')
    setIsSignInModalOpen(false)
  }

  async function handleSignInWithGitHub() {
    await signIn('github')
    setIsSignInModalOpen(false)
  }

  function handleOpenReviewBox() {
    if (status === 'unauthenticated') {
      setIsSignInModalOpen(true)
      return
    }

    setIsReviewBoxOpen(true)
  }

  async function handleCreateReview() {
    if (!reviewText.trim()) {
      window.alert("The review can't be blank.")
      return
    } else if (selectedStarsReviewAmount === 0) {
      window.alert('You need to select a rate for this book.')
      return
    }

    const response = await api.post('/reviews', {
      bookId,
      description: reviewText,
      rate: selectedStarsReviewAmount,
    })

    console.log(response.data)

    setReviewText('')
    setSelectedStarsReviewAmount(0)
    setIsReviewBoxOpen(false)
  }

  return (
    <>
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

                {!isReviewBoxOpen && (
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
                    <header className="flex items-center gap-4">
                      <div className="flex items-center justify-center h-10 w-10 bg-gradient-to-b from-green-100 to-purple-100 rounded-full">
                        <Image
                          src={session.user.avatar_url}
                          alt={session.user.name}
                          height={36}
                          width={36}
                          className="rounded-full h-9 w-9 object-cover"
                        />
                      </div>

                      <div className="flex flex-col flex-1">
                        <p className="text-gray-100 font-bold">
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
                        className="w-full py-3 px-5 mt-6 text-sm rounded border border-gray-500 text-gray-100 bg-gray-800 placeholder:text-gray-400"
                      ></textarea>
                      <span className="absolute bottom-3 right-3 text-sm text-gray-400">
                        {reviewText.length}/450
                      </span>
                    </div>

                    <footer className="flex justify-end items-center gap-2 mt-3">
                      <button
                        className="p-2 rounded bg-gray-600 transition-colors hover:bg-gray-500"
                        onClick={() => setIsReviewBoxOpen(false)}
                      >
                        <X size={24} className="text-purple-100" />
                      </button>

                      <button
                        className="p-2 rounded bg-gray-600 transition-colors hover:bg-gray-500"
                        onClick={handleCreateReview}
                      >
                        <Check size={24} className="text-green-100" />
                      </button>
                    </footer>
                  </div>
                )}

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
                          <p className="text-gray-100 font-bold">
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

      <Dialog.Root open={isSignInModalOpen} onOpenChange={setIsSignInModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-[rgba(0,0,0,0.3)]" />

          <Dialog.Content className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[90%] max-w-[516px] py-14 px-[4.5rem] bg-gray-700 rounded-xl">
            <Dialog.Close asChild>
              <X
                size={28}
                weight="bold"
                className="fixed p-1 top-4 right-4 text-gray-400 rounded cursor-pointer transition-colors hover:bg-opacity-5 hover:bg-gray-100"
              />
            </Dialog.Close>

            <p className="text-center font-bold">Sign in to review this book</p>

            <div className="flex flex-col gap-4 mt-10">
              <button
                className="flex items-center gap-5 py-5 px-6 rounded-lg bg-gray-600 transition-colors hover:bg-gray-500"
                onClick={handleSignInWithGoogle}
              >
                <Image
                  src={googleIcon}
                  alt="Google logo"
                  width={24}
                  height={24}
                />
                <span className="text-lg font-bold">Sign in with Google</span>
              </button>

              <button
                className="flex items-center gap-5 py-5 px-6 rounded-lg bg-gray-600 transition-colors hover:bg-gray-500"
                onClick={handleSignInWithGitHub}
              >
                <Image
                  src={githubIcon}
                  alt="GitHub logo"
                  width={24}
                  height={24}
                />
                <span className="text-lg font-bold">Sign in with GitHub</span>
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}
