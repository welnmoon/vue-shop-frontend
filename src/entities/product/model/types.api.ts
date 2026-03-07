import type { ProductCategories } from './types'

export type ProductFromServer = {
  id: string
  createdAt: Date
  category: ProductCategories
  title: string
  description: string
  price: number
  image: string
}
