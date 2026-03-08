import { httpClient } from '@/shared/api/httpClient'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { PublicUserDto, RegisterDto } from '../model/types.api'

export const useRegister = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationKey: ['register'],
    mutationFn: async (dto: RegisterDto) =>
      httpClient<PublicUserDto>(`auth/register`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(dto),
      }),
    onSuccess: (data) => {
      qc.setQueryData(['current-user'], data)
      qc.invalidateQueries({ queryKey: ['current-user'] })
    },
  })
}
