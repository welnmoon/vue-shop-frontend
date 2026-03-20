export const orderApi = {
  createOrder: {
    url: () => 'orders',
  },
  getMyOrders: {
    url: () => 'orders/my',
  },
  getGuestOrderById: {
    url: (orderId: string) => `orders/guest/${orderId}`,
  },
  getMyOrderById: {
    url: (orderId: string) => `orders/my/${orderId}`,
  },
  getGuestOrders: {
    url: () => 'orders/guest',
  },
}
