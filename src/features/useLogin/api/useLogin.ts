import { useCartStore } from '@/app/stores/cart'
import { httpClient } from '@/shared/api/httpClient'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { LoginDto, PublicUserDto } from '../model/types.api'
import { useRouter } from 'vue-router'
import { userApi } from '@/entities/user/api/api'
import { useMergeCart } from '@/entities/cart/api/useMergeCart'
import { storeToRefs } from 'pinia'
import { mapCartLinesToMergeCartDto } from '@/entities/cart/lib/mappers'

export const useLogin = () => {
  const qc = useQueryClient()
  const router = useRouter()
  const { mutate: mergeCart, isPending: mergeCartPending } = useMergeCart()
  return useMutation({
    mutationKey: ['login'],
    mutationFn: async (dto: LoginDto) => {
      const localCart = useCartStore()
      const items = storeToRefs(localCart).items
      const mergeCartItems = mapCartLinesToMergeCartDto(items.value)
      await mergeCart(mergeCartItems)
      return httpClient<PublicUserDto>(userApi.login.url(), {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(dto),
      })
    },
    onSuccess: async (data) => {
      qc.setQueryData(['current-user'], data)
      // qc.invalidateQueries({ queryKey: ['current-user'] })
      await router.replace({ name: 'profile' })
    },
  })
}
