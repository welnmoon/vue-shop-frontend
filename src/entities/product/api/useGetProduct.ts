import { httpClient } from '@/shared/api/httpClient'
import { useQuery } from '@tanstack/vue-query'
import type { ProductFromServer } from '../model/types.api'
import { productApi } from './api'

export const useGetProduct = (productId: string) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: async () =>
      httpClient<ProductFromServer>(productApi.getProduct.url(productId), { method: 'GET' }),
  })
}
