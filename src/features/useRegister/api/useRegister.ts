import { httpClient } from '@/shared/api/httpClient'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { PublicUserDto, RegisterDto } from '../model/types.api'
import { userApi } from '@/entities/user/api/api'
import { useRouter } from 'vue-router'

export const useRegister = () => {
  const qc = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationKey: ['register'],
    mutationFn: async (dto: RegisterDto) =>
      httpClient<PublicUserDto>(userApi.register.url(), {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(dto),
      }),
    onSuccess: (data) => {
      qc.setQueryData(['current-user'], data)
      qc.invalidateQueries({ queryKey: ['current-user'] })
      router.push({ name: 'profile' })
    },
  })
}
