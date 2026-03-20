import { httpClient } from '@/shared/api/httpClient'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { CreateOrder } from '../model/schema'
import { orderApi } from '@/entities/order/api/orderApi'
import { useRouter } from 'vue-router'
import { useCart } from '@/shared/composables/useCart'
import type { CreateOrderResponse } from '../model/types.api'
import { saveGuestOrderAccess } from '../lib/guest-order'

export const useCreateOrder = () => {
  const qc = useQueryClient()
  const router = useRouter()
  const { clearCart } = useCart()

  return useMutation({
    mutationKey: ['order'],
    mutationFn: async (dto: CreateOrder) =>
      httpClient<CreateOrderResponse>(orderApi.createOrder.url(), {
        method: 'POST',
        body: JSON.stringify(dto),
        credentials: 'include',
      }),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ['order'] })

      if (data.guestAccessToken) {
        saveGuestOrderAccess({
          orderId: data.id,
          token: data.guestAccessToken,
          createdAt: new Date().toISOString(),
        })

        clearCart()

        router.push({
          name: 'guest-order',
          params: { orderId: data.id },
          query: { token: data.guestAccessToken },
        })

        return
      }

      clearCart()

      router.push({
        name: 'order-details',
        params: { orderId: data.id },
      })
    },
  })
}
