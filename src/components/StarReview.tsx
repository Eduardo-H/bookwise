import { Star } from 'phosphor-react'

interface StarReviewProps {
  stars: number
}

export function StarReview({ stars }: StarReviewProps) {
  return (
    <div className="flex items-center gap-1">
      <Star
        size={16}
        weight={stars >= 1 ? 'fill' : 'regular'}
        className="text-purple-100"
      />
      <Star
        size={16}
        weight={stars >= 2 ? 'fill' : 'regular'}
        className="text-purple-100"
      />
      <Star
        size={16}
        weight={stars >= 3 ? 'fill' : 'regular'}
        className="text-purple-100"
      />
      <Star
        size={16}
        weight={stars >= 4 ? 'fill' : 'regular'}
        className="text-purple-100"
      />
      <Star
        size={16}
        weight={stars >= 5 ? 'fill' : 'regular'}
        className="text-purple-100"
      />
    </div>
  )
}
