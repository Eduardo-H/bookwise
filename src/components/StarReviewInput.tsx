import { useState } from 'react'
import { Star } from 'phosphor-react'

interface StarReviewInputProps {
  selectedStarsAmount: number
  onSelectStarsAmount: (amount: number) => void
}

export function StarReviewInput({
  selectedStarsAmount,
  onSelectStarsAmount,
}: StarReviewInputProps) {
  const [currentStarNumberHovered, setCurrentStarNumberHovered] = useState(0)

  const starArray = [1, 2, 3, 4, 5]

  return (
    <div
      className="flex items-center gap-1"
      onMouseLeave={() => setCurrentStarNumberHovered(0)}
    >
      {starArray.map((item) => (
        <Star
          key={item}
          size={24}
          weight={
            currentStarNumberHovered >= item || selectedStarsAmount >= item
              ? 'fill'
              : 'regular'
          }
          onMouseOver={() => setCurrentStarNumberHovered(item)}
          onClick={() => onSelectStarsAmount(item)}
          className="text-purple-100 cursor-pointer"
        />
      ))}
    </div>
  )
}
