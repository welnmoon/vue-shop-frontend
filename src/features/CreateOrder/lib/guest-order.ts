const GUEST_ORDER_STORAGE_KEY = 'guest_orders'

export type GuestOrderAccess = {
  orderId: string
  token: string
  createdAt: string
}

export const saveGuestOrderAccess = (order: GuestOrderAccess) => {
  const raw = localStorage.getItem(GUEST_ORDER_STORAGE_KEY)
  const current: GuestOrderAccess[] = raw ? JSON.parse(raw) : []

  const next = current.filter((x) => x.orderId !== order.orderId)

  next.push(order)

  localStorage.setItem(GUEST_ORDER_STORAGE_KEY, JSON.stringify(next))
}

export const getGuestOrdersAccess = (): GuestOrderAccess[] => {
  const raw = localStorage.getItem(GUEST_ORDER_STORAGE_KEY)
  return raw ? JSON.parse(raw) : []
}

export const getGuestOrderAccess = (orderId: string) => {
  return getGuestOrdersAccess().find((x) => x.orderId === orderId) ?? null
}
