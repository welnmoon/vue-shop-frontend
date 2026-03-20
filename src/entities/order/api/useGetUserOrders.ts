import { httpClient } from '@/shared/api/httpClient'
import { useQuery } from '@tanstack/vue-query'
import { orderApi } from './orderApi'
import type { OrderWithItems } from '../model/types/order-user'
import { computed, toValue, type MaybeRef } from 'vue'

export const useGetUserOrders = (isAuthenticated: MaybeRef<boolean>) => {
  return useQuery({
    queryKey: ['orders', 'my'],
    enabled: computed(() => toValue(isAuthenticated)),
    queryFn: async () =>
      httpClient<OrderWithItems[]>(orderApi.getMyOrders.url(), {
        method: 'GET',
        credentials: 'include',
      }),
  })
}
