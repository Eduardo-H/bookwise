import classnames from 'classnames'
import Image from 'next/image'
import { StarReview } from './StarReview'
import { ButtonHTMLAttributes } from 'react'

interface BookCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
  ...rest
}: BookCardProps) {
  return (
    <button
      className="flex gap-5 p-5 rounded-lg border border-gray-700 bg-gray-700 transition-color hover:border-gray-600"
      {...rest}
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

      <div className="flex flex-col h-full items-start">
        <h6 className="text-base font-bold text-start leading-shorter text-gray-100">
          {title}
        </h6>
        <span className="text-sm leading-tall text-gray-400">{author}</span>

        <div className="mt-auto">
          <StarReview stars={stars} />
        </div>
      </div>
    </button>
  )
}
