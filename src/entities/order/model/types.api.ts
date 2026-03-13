import type { Product } from '@/entities/product/model/types.api'

export const deliveryMethods = ['pickup', 'delivery'] as const
export type DeliveryMethods = (typeof deliveryMethods)[number]
export const paymentMethods = ['cash', 'card'] as const
export type PaymentMethods = (typeof paymentMethods)[number]

export type Order = {
  id: string
  createdAt: string
  updatedAt: string
  userId: string
  fullName: string
  email: string
  phone: string
  city: string
  street: string
  postalCode: string
  comment?: string
  agreeToTerms: boolean
  deliveryMethod: DeliveryMethods
  paymentMethod: PaymentMethods
}

export type OrderItem = {
  id: string
  orderId: string
  productId: string
  quantity: number
  price: number
}

export type OrderWithItems = Order & {
  items: (OrderItem & { product: Product })[]
}
