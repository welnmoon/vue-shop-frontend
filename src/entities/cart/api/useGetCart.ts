import { httpClient } from '@/shared/api/httpClient'
import { useQuery } from '@tanstack/vue-query'
import type { CartWithItems } from '../model/types.api'
import { cartApi } from './api'
import { toValue, type MaybeRef } from 'vue'

export const useGetCart = (enabled: MaybeRef<boolean>) => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: async () => httpClient<CartWithItems>(cartApi.getCart.url(), { method: 'GET' }),
    staleTime: 1000 * 60 * 5, // 5 min
    enabled: () => toValue(enabled), // что за toValue?
    refetchOnMount: false, // для чего?
    refetchOnWindowFocus: false, // для чего?
    refetchOnReconnect: false, // для чего?
  })
}
