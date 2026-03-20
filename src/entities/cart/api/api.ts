export const cartApi = {
  getCart: {
    url: () => 'cart',
  },
  deleteCart: {
    url: () => 'cart',
  },
  addCartItem: {
    url: () => 'cart/items',
  },
  deleteCartItem: {
    url: (itemId: string) => `cart/items/${itemId}`,
  },
  updateCartItem: {
    url: (itemId: string) => `cart/items/${itemId}`,
  },
  mergeCart: {
    url: () => 'cart/merge',
  },
}
