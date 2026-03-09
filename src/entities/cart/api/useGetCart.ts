import { httpClient } from '@/shared/api/httpClient'
import { useQuery } from '@tanstack/vue-query'
import type { CartWithItems } from '../model/types.api'

export const useGetCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: async () => httpClient<CartWithItems>('cart', { method: 'GET' }),
  })
}
