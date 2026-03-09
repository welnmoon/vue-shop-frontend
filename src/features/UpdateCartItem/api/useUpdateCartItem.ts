import { cartApi } from '@/entities/cart/api/api'
import type { CartWithItems } from '@/entities/cart/model/types.api'
import { httpClient } from '@/shared/api/httpClient'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { UpdateCartItemParams } from '../model/types.api'

export const useUpdateCartItem = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationKey: ['cart'],
    mutationFn: async ({ itemId, dto }: UpdateCartItemParams) =>
      httpClient<CartWithItems>(cartApi.updateCartItem.url(itemId), {
        method: 'PATCH',
        body: JSON.stringify(dto),
        credentials: 'include',
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['cart'] })
    },
  })
}
