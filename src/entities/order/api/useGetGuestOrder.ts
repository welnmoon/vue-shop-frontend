import { httpClient } from '@/shared/api/httpClient'
import { useQuery } from '@tanstack/vue-query'
import { orderApi } from './orderApi'
import type { OrderWithItems } from '../model/types/order-user'

export const useGetGuestOrder = (orderId?: string, token?: string) => {
  return useQuery({
    queryKey: ['orders', 'guest', orderId, token],
    enabled: Boolean(orderId),
    queryFn: async () => {
      if (!orderId) {
        throw new Error('orderId is required')
      }

      const baseUrl = orderApi.getGuestOrderById.url(orderId)
      const url = token ? `${baseUrl}?token=${encodeURIComponent(token)}` : baseUrl

      return httpClient<OrderWithItems>(url, {
        method: 'GET',
        credentials: 'include',
      })
    },
  })
}
