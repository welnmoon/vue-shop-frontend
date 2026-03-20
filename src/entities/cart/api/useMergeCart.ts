import { httpClient } from '@/shared/api/httpClient'
import { useMutation } from '@tanstack/vue-query'
import { cartApi } from './api'
import type { CartWithItems, MergeCartDto } from '../model/types.api'

export const useMergeCart = () => {
  return useMutation({
    mutationKey: [''],
    mutationFn: async (dto: MergeCartDto) => {
      return httpClient<CartWithItems>(cartApi.mergeCart.url(), {
        method: 'POST',
        body: JSON.stringify(dto),
        credentials: 'include',
      })
    },
  })
}
