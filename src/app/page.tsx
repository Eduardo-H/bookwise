'use client'

import Link from 'next/link'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
import { CaretRight, TrendUp } from 'phosphor-react'

import { BookCard } from '@/components/BookCard'
import { ReviewCard } from '@/components/ReviewCard'
import { Sidebar } from './components/Sidebar'

export default function Home() {
  dayjs.extend(relativeTime)

  const bookCover = ''

  const user = {
    id: '1',
    name: 'Eduardo Oliveira',
    avatarUrl: 'https://github.com/Eduardo-H.png',
  }

  const book = {
    id: '1',
    title: 'The Hobbit',
    author: 'J.R.R Tolkien',
    coverUrl: bookCover,
  }

  const review =
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam quam rem itaque tempora alias reprehenderit non officiis provident repellat.'

  const reviewDate = new Date('2023-06-07')

  return (
    <>
      <Sidebar />

      <main className="flex-1 px-24">
        <header className="flex gap-3 mt-16 mb-10">
          <TrendUp size={32} className="text-green-100" />
          <h2 className="text-2xl font-bold">Home</h2>
        </header>

        <div className="grid grid-cols-[65%_35%]  gap-16">
          <div className="flex flex-col gap-3">
            <h6 className="text-sm mb-2 pt-2">Most recent reviews</h6>

            <ReviewCard
              reviewer={user}
              book={book}
              stars={4}
              review={review}
              reviewDate={reviewDate}
            />
            <ReviewCard
              reviewer={user}
              book={book}
              stars={4}
              review={review}
              reviewDate={reviewDate}
            />
            <ReviewCard
              reviewer={user}
              book={book}
              stars={4}
              review={review}
              reviewDate={reviewDate}
            />
            <ReviewCard
              reviewer={user}
              book={book}
              stars={4}
              review={review}
              reviewDate={reviewDate}
            />
          </div>

          <div>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <h6 className="text-sm">Popular books</h6>
                <Link
                  href="/"
                  className="flex items-center gap-2 p-2 text-sm text-purple-100 transition-colors rounded hover:bg-opacity-5 hover:bg-purple-100"
                >
                  See all
                  <CaretRight weight="bold" size={16} />
                </Link>
              </div>

              <BookCard
                title="The Hobbit"
                author="J.R.R. Tolkien"
                coverUrl={bookCover}
                stars={4}
                variant="small"
              />
              <BookCard
                title="The Hobbit"
                author="J.R.R. Tolkien"
                coverUrl={bookCover}
                stars={4}
                variant="small"
              />
              <BookCard
                title="The Hobbit"
                author="J.R.R. Tolkien"
                coverUrl={bookCover}
                stars={4}
                variant="small"
              />
              <BookCard
                title="The Hobbit"
                author="J.R.R. Tolkien"
                coverUrl={bookCover}
                stars={4}
                variant="small"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
