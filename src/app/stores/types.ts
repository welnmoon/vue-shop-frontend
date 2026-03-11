import type { Product } from '@/entities/product/model/types.api'

export type LocalCartItem = {
  productId: string
  title: string
  description: string
  price: number
  image: string
  category: Product['category']
  quantity: number
}
