import { httpClient } from '@/shared/api/httpClient'
import { useQuery } from '@tanstack/vue-query'
import type { Product } from '../model/types.api'
import { productApi } from './api'

export const useGetProduct = (productId: string) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: async () =>
      httpClient<Product>(productApi.getProduct.url(productId), { method: 'GET' }),
  })
}
