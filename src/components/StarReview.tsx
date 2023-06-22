/* eslint-disable array-callback-return */
import { Star } from 'phosphor-react'

interface StarReviewProps {
  stars: number
}

export function StarReview({ stars }: StarReviewProps) {
  const fullStars =
    Math.floor(stars) > 0
      ? Array.apply(null, Array(Math.floor(stars))).map(() => {})
      : Array(0)
  const emptyStart =
    Math.floor(5 - stars) > 0
      ? Array.apply(null, Array(Math.floor(5 - stars))).map(() => {})
      : Array(0)

  return (
    <div className="flex items-center gap-1">
      {fullStars.map((item, i) => (
        <Star
          key={`fullStar_${i}`}
          size={16}
          weight="fill"
          className="text-purple-100"
        />
      ))}

      {emptyStart.map((item, i) => (
        <Star
          key={`emptyStar_${i}`}
          size={16}
          weight="regular"
          className="text-purple-100"
        />
      ))}
    </div>
  )
}
