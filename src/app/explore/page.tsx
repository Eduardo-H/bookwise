'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Binoculars, MagnifyingGlass, X } from 'phosphor-react'

import { api } from '@/lib/axios'
import { Book } from '@/@types/book'

import { BookCard } from '@/components/BookCard'
import { Sidebar } from '@/components/Sidebar'
import { CategoryButton } from '@/components/CategoryButton'
import { Spinner } from '@/components/Spinner'
import { categories } from '../../../prisma/constants/categories'
import { ReviewModal } from '@/components/ReviewModal'

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null)

  const {
    data: books,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['books', selectedCategory, searchQuery],
    queryFn: getBooks,
  })

  async function getBooks(): Promise<Book[]> {
    const query = searchQuery.trim() ? `query=${searchQuery}` : ''
    const category =
      selectedCategory !== 'All' ? `category=${selectedCategory}` : ''

    const response = await api.get<Book[]>(`/books?${category}&${query}`)

    return response.data
  }

  function handleSelectCategory(category: string) {
    setSelectedCategory(category)
    refetch()
  }

  function handleSelectBook(bookId: string) {
    setSelectedBookId(bookId)
    setIsReviewModalOpen(true)
  }

  return (
    <>
      <Sidebar />

      <main className="pl-80 flex-1 px-24 pb-5">
        <header className="flex justify-between items-center mt-16 mb-10">
          <div className="flex gap-3">
            <Binoculars size={32} className="text-green-100" />
            <h2 className="text-2xl font-bold">Explore</h2>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search a book or author"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-72 h-12 pl-5 pr-12 py-3 text-sm bg-gray-800 border border-gray-500 outline-none rounded placeholder:text-gray-400 focus:border-green-100"
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
        </header>

        <div className="flex gap-2 items-center overflow-x-auto">
          <CategoryButton
            title="All"
            selected={selectedCategory === 'All'}
            onClick={() => handleSelectCategory('All')}
          />
          {categories.map((category) => (
            <CategoryButton
              key={category.id}
              title={category.name}
              selected={selectedCategory === category.name}
              onClick={() => handleSelectCategory(category.name)}
            />
          ))}
        </div>

        {!isLoading ? (
          books && books.length > 0 ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 mt-12">
              {books.map((book) => (
                <BookCard
                  key={book.id}
                  title={book.name}
                  author={book.author}
                  coverUrl={book.cover_url}
                  stars={book.rate}
                  onClick={() => handleSelectBook(book.id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center mt-12">
              <span className="text-gray-300">No book was found</span>
            </div>
          )
        ) : (
          <div className="flex justify-center mt-12">
            <Spinner />
          </div>
        )}

        <ReviewModal
          bookId={selectedBookId}
          isOpen={isReviewModalOpen}
          onClose={setIsReviewModalOpen}
        />
      </main>
    </>
  )
}
