import { httpClient } from '@/shared/api/httpClient'
import { useQuery } from '@tanstack/vue-query'
import type { ProductFromServer } from '../model/types.api'
export const useGetProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => httpClient<ProductFromServer[]>('products', { method: 'GET' }),
  })
}
