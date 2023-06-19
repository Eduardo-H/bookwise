import { Book } from './book'
import { User } from './user'

export interface Review {
  id: string
  rate: number
  description: string
  created_at: Date
  user: User
  book: Book
}
