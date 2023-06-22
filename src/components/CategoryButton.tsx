import { ButtonHTMLAttributes } from 'react'
import classnames from 'classnames'

interface CategoryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  selected?: boolean
}

export function CategoryButton({
  title,
  selected = false,
  ...rest
}: CategoryButtonProps) {
  return (
    <button
      className={classnames(
        'min-w-fit px-4 py-1 border rounded-full transition-colors hover:bg-purple-200 hover:text-gray-100',
        {
          'text-gray-100 bg-purple-200 border-purple-200': selected,
          'border-purple-100 text-purple-100': !selected,
        },
      )}
      {...rest}
    >
      {title}
    </button>
  )
}
