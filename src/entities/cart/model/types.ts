import type { ProductCategories } from '@/entities/product/model/types'

export type CartLine = {
  itemId?: string // for server
  productId: string
  title: string
  description: string
  price: number
  image: string
  category: ProductCategories
  quantity: number
}
