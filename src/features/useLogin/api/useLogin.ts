import { httpClient } from '@/shared/api/httpClient'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { LoginDto, PublicUserDto } from '../model/types.api'

export const useLogin = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: async (dto: LoginDto) =>
      httpClient<PublicUserDto>(`auth/login`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(dto),
      }),
  })
}
