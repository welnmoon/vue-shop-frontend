import type { CartWithItems } from '@/entities/cart/model/types.api'

export const getCartItemsQuantity = (cart?: CartWithItems) => {
  if (!cart?.items) return 0
  return cart.items.reduce((total, item) => {
    return total + item.quantity
  }, 0)
}
