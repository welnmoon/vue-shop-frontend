import type { GuestOrderAccess } from '@/features/CreateOrder/lib/guest-order'
import { httpClient } from '@/shared/api/httpClient'
import { useQuery } from '@tanstack/vue-query'
import { computed, toValue, type MaybeRef } from 'vue'
import type { OrderWithItems } from '../model/types/order-user'
import { orderApi } from './orderApi'

export const useGetGuestOrders = (
  accessList: MaybeRef<GuestOrderAccess[] | undefined>,
  enabled: MaybeRef<boolean>,
) => {
  const resolvedAccessList = computed(() => toValue(accessList) ?? [])

  return useQuery({
    queryKey: computed(() => ['orders', 'guest', resolvedAccessList.value]),
    enabled: computed(() => resolvedAccessList.value.length > 0 && toValue(enabled)),
    queryFn: async () =>
      httpClient<OrderWithItems[]>(orderApi.getGuestOrders.url(), {
        method: 'GET',
        credentials: 'include',
        body: JSON.stringify(resolvedAccessList.value),
      }),
  })
}
