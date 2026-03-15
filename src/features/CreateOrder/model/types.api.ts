export type CreateOrderResponse = {
  id: string
  userId: string | null
  status: string
  total: number
  createdAt: string
  guestAccessToken?: string
}
