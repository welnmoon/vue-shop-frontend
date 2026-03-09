export const productApi = {
  getProducts: {
    url: () => 'products',
  },
  getProduct: {
    url: (productId: string) => `products/${productId}`,
  },
}
