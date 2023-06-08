import Link from 'next/link'
import classnames from 'classnames'
import Image from 'next/image'
import { StarReview } from './StarReview'

interface BookCardProps {
  title: string
  author: string
  stars: number
  coverUrl: string
  variant?: 'small' | 'default'
}

export function BookCard({
  title,
  author,
  stars,
  coverUrl,
  variant = 'default',
}: BookCardProps) {
  return (
    <Link
      href="/"
      className="flex gap-2 p-5 bg-gray-700 rounded-lg border border-gray-700 transition-color hover:border-gray-600"
    >
      <Image
        src={coverUrl}
        width={variant === 'small' ? 64 : 108}
        height={variant === 'small' ? 94 : 152}
        alt={`Cover of the book ${title}`}
        className={classnames('rounded-lg', {
          'w-[64px] h-[94px]': variant === 'small',
          'w-[108px] h-[152px]': variant === 'default',
        })}
      />

      <div className="flex flex-col">
        <p className="text-base text-gray-100">{title}</p>
        <span className="text-sm text-gray-400">{author}</span>

        <div className="mt-auto">
          <StarReview stars={stars} />
        </div>
      </div>
    </Link>
  )
}
