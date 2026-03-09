import { httpClient } from '@/shared/api/httpClient'
import { useQuery } from '@tanstack/vue-query'
import type { CartWithItems } from '../model/types.api'
import { cartApi } from './api'

export const useGetCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: async () => httpClient<CartWithItems>(cartApi.getCart.url(), { method: 'GET' }),
    staleTime: 10_000,
  })
}
