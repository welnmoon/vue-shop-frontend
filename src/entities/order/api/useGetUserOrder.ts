import { httpClient } from '@/shared/api/httpClient'
import { useQuery } from '@tanstack/vue-query'
import { orderApi } from './orderApi'
import type { OrderWithItems } from '../model/types/order-user'

export const useGetUserOrder = (orderId?: string) => {
  return useQuery({
    queryKey: ['orders', 'my', orderId],
    enabled: Boolean(orderId),
    queryFn: async () => {
      if (!orderId) {
        throw new Error('orderId is required')
      }

      return httpClient<OrderWithItems>(orderApi.getMyOrderById.url(orderId), {
        method: 'GET',
        credentials: 'include',
      })
    },
  })
}
