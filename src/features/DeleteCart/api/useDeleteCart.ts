import { cartApi } from '@/entities/cart/api/api'
import { httpClient } from '@/shared/api/httpClient'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

export const useDeleteCart = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationKey: ['cart'],
    mutationFn: async () =>
      httpClient<void>(cartApi.deleteCart.url(), {
        method: 'DELETE',
        credentials: 'include',
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['cart'] })
    },
  })
}
