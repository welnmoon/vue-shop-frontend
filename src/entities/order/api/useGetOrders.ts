import { httpClient } from '@/shared/api/httpClient'
import { useQuery } from '@tanstack/vue-query'
import { orderApi } from './orderApi'
import type { OrderWithItems } from '../model/types/order-user'

export const useGetOrders = () => {
  return useQuery({
    queryKey: ['orders', 'my'],
    queryFn: async () =>
      httpClient<OrderWithItems[]>(orderApi.getMyOrders.url(), {
        method: 'GET',
        credentials: 'include',
      }),
  })
}
