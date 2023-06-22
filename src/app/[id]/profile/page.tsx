'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import {
  BookOpen,
  Bookmark,
  Books,
  CaretLeft,
  MagnifyingGlass,
  User as UserIcon,
  UserList,
  X,
} from 'phosphor-react'

import { api } from '@/lib/axios'
import { type User } from '@/@types/user'
import { type Review } from '@/@types/review'

import { Sidebar } from '@/components/Sidebar'
import { Spinner } from '@/components/Spinner'
import { StarReview } from '@/components/StarReview'
import { formatDateFromNow } from '@/utils/formatDateFromNow'
import { useSession } from 'next-auth/react'

interface UserReponse extends User {
  ratings: Review[]
}

interface RequestResponse {
  user: UserReponse
  mostReadCategory: string | null
}

export default function Profile({ params }: { params: { id: string } }) {
  const [searchQuery, setSearchQuery] = useState('')

  const { data: session } = useSession()

  const { data, isLoading: isLoadingReviews } = useQuery({
    queryKey: ['reviews'],
    queryFn: getUserBookReviews,
  })

  const totalPagesRead =
    data && data.user
      ? data.user.ratings.reduce(
          (acc, rating) => acc + rating.book.total_pages,
          0,
        )
      : 0

  const totalAuthorsRead: string[] = []

  data?.user.ratings.forEach((review) => {
    if (!totalAuthorsRead.includes(review.book.id)) {
      totalAuthorsRead.push(review.book.id)
    }
  })

  async function getUserBookReviews(): Promise<RequestResponse> {
    const response = await api.get<RequestResponse>(
      `/users/${params.id}/profile`,
    )

    return response.data
  }

  return (
    <>
      <Sidebar />

      <main className="pl-80 pr-[28rem] pt-16 flex-1 pb-5">
        <header className="flex mb-10">
          {session && session.user.id === params.id ? (
            <div className="flex items-center gap-3">
              <UserIcon size={32} className="text-green-100" />
              <h2 className="text-2xl font-bold">Profile</h2>
            </div>
          ) : (
            <Link
              href="/"
              className="flex items-center gap-1 px-2 py-1 rounded hover:bg-opacity-5 transition-colors hover:bg-gray-100"
            >
              <CaretLeft size={16} />
              <span className="font-bold">Back</span>
            </Link>
          )}
        </header>

        <div className="w-full relative mb-8">
          <input
            type="text"
            placeholder="Search a book or author"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-5 pr-12 py-3 text-sm bg-gray-800 border border-gray-500 outline-none rounded placeholder:text-gray-400 focus:border-green-100"
          />

          {!searchQuery.trim() ? (
            <MagnifyingGlass
              size={20}
              className="absolute right-5 top-1/2 translate-y-[-50%] text-gray-500"
            />
          ) : (
            <button onClick={() => setSearchQuery('')}>
              <X
                size={20}
                className="absolute right-5 top-1/2 translate-y-[-50%] text-green-100"
              />
            </button>
          )}
        </div>

        <div className="flex flex-col gap-5">
          {!isLoadingReviews ? (
            data && data.user.ratings.length > 0 ? (
              data.user.ratings.map((review) => (
                <div key={review.id} className="flex flex-col gap-2">
                  <span className="text-sm text-gray-300">
                    {formatDateFromNow(review.created_at)}
                  </span>

                  <div className="flex flex-col gap-6 bg-gray-700 p-6 rounded-lg">
                    <div className="flex gap-6">
                      <Image
                        src={review.book.cover_url}
                        alt={`Cover of the book ${review.book.name}`}
                        width={98}
                        height={134}
                      />

                      <div className="flex flex-col gap-1">
                        <h6 className="text-lg">{review.book.name}</h6>
                        <span className="text-sm text-gray-400">
                          {review.book.author}
                        </span>

                        <div className="mt-auto">
                          <StarReview stars={review.rate} />
                        </div>
                      </div>
                    </div>

                    <article className="text-gray-300 text-sm text-justify">
                      {review.description}
                    </article>
                  </div>
                </div>
              ))
            ) : (
              <span>No reviews found</span>
            )
          ) : (
            <div className="flex justify-center mt-12">
              <Spinner />
            </div>
          )}
        </div>
      </main>

      {data && (
        <div className="fixed top-32 right-24">
          <div className="flex flex-col items-center px-16 pb-5 rounded border-l border-gray-700">
            <header className="flex flex-col items-center">
              <div className="flex items-center justify-center h-[4.3rem] w-[4.3rem] bg-gradient-to-b from-green-100 to-purple-100 rounded-full">
                <Image
                  src={data.user.avatar_url}
                  alt={data.user.name}
                  width={72}
                  height={72}
                  className="rounded-full h-16 w-16 object-cover"
                />
              </div>

              <div className="flex flex-col items-center justify-center mt-5">
                <h2 className="text-xl font-bold">{data.user.name}</h2>
                <span className="text-sm text-gray-400">
                  member since{' '}
                  {new Date(data.user.created_at).getFullYear().toString()}
                </span>
              </div>
            </header>

            <hr className="h-1 w-8 my-8 border-none bg-gradient-to-r from-green-100 to-purple-100 rounded-full" />

            <div className="flex w-full flex-col gap-5">
              <div className="flex items-center gap-4">
                <BookOpen size={32} className="text-green-100" />
                <div className="flex flex-col">
                  <span className="text-gray-200 font-bold">
                    {totalPagesRead}
                  </span>
                  <span className="text-gray-300 text-sm">Pages read</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Books size={32} className="text-green-100" />
                <div className="flex flex-col">
                  <span className="text-gray-200 font-bold">
                    {data.user.ratings.length}
                  </span>
                  <span className="text-gray-300 text-sm">Books reviewed</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <UserList size={32} className="text-green-100" />
                <div className="flex flex-col">
                  <span className="text-gray-200 font-bold">
                    {totalAuthorsRead.length}
                  </span>
                  <span className="text-gray-300 text-sm">Authors read</span>
                </div>
              </div>

              {data.mostReadCategory && (
                <div className="flex items-center gap-4">
                  <Bookmark size={32} className="text-green-100" />
                  <div className="flex flex-col">
                    <span className="text-gray-200 font-bold">
                      {data.mostReadCategory}
                    </span>
                    <span className="text-gray-300 text-sm">
                      Most read category
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
