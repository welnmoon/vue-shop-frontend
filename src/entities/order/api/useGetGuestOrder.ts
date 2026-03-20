import { httpClient } from '@/shared/api/httpClient'
import { useQuery } from '@tanstack/vue-query'
import { orderApi } from './orderApi'
import type { OrderWithItems } from '../model/types/order-user'
import { computed, toValue, type MaybeRef } from 'vue'

export const useGetGuestOrder = (
  orderId: MaybeRef<string | undefined>,
  token: MaybeRef<string | undefined>,
) => {
  const resolvedToken = computed(() => toValue(token))
  const resolvedOrderId = computed(() => toValue(orderId))

  return useQuery({
    queryKey: ['orders', 'guest', resolvedToken.value, resolvedOrderId.value],
    enabled: computed(() => Boolean(resolvedOrderId.value) && Boolean(resolvedToken.value)),
    queryFn: async () => {
      const id = resolvedOrderId.value
      const accessToken = resolvedToken.value

      if (!id) {
        throw new Error('orderId is required')
      }

      if (!accessToken) {
        throw new Error('accessToken is required')
      }

      const baseUrl = orderApi.getGuestOrderById.url(id)
      const url = `${baseUrl}?token=${encodeURIComponent(accessToken)}`

      return httpClient<OrderWithItems>(url, {
        method: 'GET',
        credentials: 'include',
      })
    },
  })
}
