import { cartApi } from '@/entities/cart/api/api'
import type { CartWithItems } from '@/entities/cart/model/types.api'
import { httpClient } from '@/shared/api/httpClient'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { DeleteCartItemParams } from '../model/types.api'

export const useDeleteCartItem = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationKey: ['cart'],
    mutationFn: async ({ itemId }: DeleteCartItemParams) =>
      httpClient<CartWithItems>(cartApi.deleteCartItem.url(itemId), {
        method: 'DELETE',
        credentials: 'include',
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['cart'] })
    },
  })
}
