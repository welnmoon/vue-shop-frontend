import type { Product } from '@/entities/product/model/types'

export type CartWithItems = Cart & {
  items: CartItem[]
}

export type Cart = {
  id: string
  createdAt: string
  userId: string
  updatedAt: string
}

export type CartItem = {
  id: string
  createdAt: string
  updatedAt: string
  cartId: string
  productId: string
  quantity: number
  product: Product
}
