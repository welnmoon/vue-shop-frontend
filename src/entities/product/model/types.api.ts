import type { ProductCategories } from './types'

export type Product = {
  id: string
  createdAt: string
  category: ProductCategories
  title: string
  description: string
  price: number
  image: string
}

export type ProductFromServerWithQuantity = Product & {
  quantity: number
}
