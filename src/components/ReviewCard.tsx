import Image from 'next/image'
import dayjs from '@/lib/dayjs'

import { StarReview } from './StarReview'
import { User } from '@/@types/user'
import { Book } from '@/@types/book'
import Link from 'next/link'

interface ReviewCardProps {
  reviewer: User
  review: string
  reviewDate: Date
  stars: number
  book: Book
}

export function ReviewCard({
  reviewer,
  review,
  reviewDate,
  stars,
  book,
}: ReviewCardProps) {
  const formatedReviewDate = dayjs().to(dayjs(reviewDate))

  return (
    <div className="flex flex-col gap-8 bg-gray-700 p-6 rounded-lg">
      <header>
        <div className="flex items-center gap-4">
          <Link
            href={`/${reviewer.id}/profile`}
            className="flex items-center justify-center h-10 w-10 bg-gradient-to-b from-green-100 to-purple-100 rounded-full"
          >
            <Image
              src={reviewer.avatar_url}
              alt={reviewer.name}
              height={36}
              width={36}
              className="rounded-full h-9 w-9 object-cover"
            />
          </Link>

          <div className="flex flex-col flex-1">
            <p className="text-gray-100">{reviewer.name}</p>
            <span className="text-sm text-gray-400">{formatedReviewDate}</span>
          </div>

          <StarReview stars={stars} />
        </div>
      </header>

      <div className="flex gap-5">
        <Image
          src={book.cover_url}
          alt={`Cover of the book ${book.name}`}
          height={152}
          width={108}
          className="h-[152px] w-[108px] rounded"
        />

        <div>
          <h5 className="font-bold">{book.name}</h5>
          <span className="text-sm text-gray-400">{book.author}</span>

          <article className="text-sm text-justify mt-5">{review}</article>
        </div>
      </div>
    </div>
  )
}
