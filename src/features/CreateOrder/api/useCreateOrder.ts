import { httpClient } from '@/shared/api/httpClient'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { CreateOrder } from '../model/schema'
import { orderApi } from '@/entities/order/api/orderApi'
import { useRouter } from 'vue-router'
import { useCart } from '@/shared/composables/useCart'

export const useCreateOrder = () => {
  const qc = useQueryClient()
  const router = useRouter()
  const { clearCart } = useCart()

  return useMutation({
    mutationKey: ['order'],
    mutationFn: async (dto: CreateOrder) =>
      httpClient(orderApi.createOrder.url(), {
        method: 'POST',
        body: JSON.stringify(dto),
        credentials: 'include',
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['order'] })
      router.push({ name: 'profile' })
      clearCart()
    },
  })
}
