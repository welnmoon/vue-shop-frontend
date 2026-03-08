import { httpClient } from '@/shared/api/httpClient'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { LoginDto, PublicUserDto } from '../model/types.api'
import { useRouter } from 'vue-router'

export const useLogin = () => {
  const qc = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationKey: ['login'],
    mutationFn: async (dto: LoginDto) =>
      httpClient<PublicUserDto>(`auth/login`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(dto),
      }),
    onSuccess: async (data) => {
      qc.setQueryData(['current-user'], data)
      // qc.invalidateQueries({ queryKey: ['current-user'] })
      await router.replace({ name: 'profile' })
    },
  })
}
