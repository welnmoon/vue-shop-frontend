import { httpClient } from '@/shared/api/httpClient'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { cartApi } from '@/entities/cart/api/api'
import type { AddCartItemDto } from '../model/types.api'

export const useAddCartItem = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationKey: ['cart'],
    mutationFn: async (dto: AddCartItemDto) =>
      httpClient(cartApi.addCartItem.url(), {
        method: 'POST',
        body: JSON.stringify(dto),
        credentials: 'include',
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['cart'] })
    },
    // TODO: add optymistic update
  })
}
