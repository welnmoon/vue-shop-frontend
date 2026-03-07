import { httpClient } from '@/shared/api/httpClient'
import { useQuery } from '@tanstack/vue-query'
import type { ProductFromServer } from '../model/types.api'

export const useGetProduct = (productId: string) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: async () => httpClient<ProductFromServer>(`products/${productId}`, { method: 'GET' }),
  })
}
