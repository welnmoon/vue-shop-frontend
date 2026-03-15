import { httpClient } from '@/shared/api/httpClient'
import { useQuery } from '@tanstack/vue-query'
import { orderApi } from './orderApi'

export const useGetUserOrder = (orderId?: string) => {
  return useQuery({
    queryKey: ['orders', 'my', orderId],
    enabled: Boolean(orderId),
    queryFn: async () => {
      if (!orderId) {
        throw new Error('orderId is required')
      }

      return httpClient<any>(orderApi.getMyOrderById.url(orderId), {
        method: 'GET',
        credentials: 'include',
      })
    },
  })
}
