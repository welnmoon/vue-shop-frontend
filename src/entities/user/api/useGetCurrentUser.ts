import { httpClient } from '@/shared/api/httpClient'
import { useQuery } from '@tanstack/vue-query'
import type { PublicUserDto } from '../model/types.api'

export const getCurrentUser = async () => {
  try {
    return await httpClient<PublicUserDto>('auth/me', {
      method: 'GET',
      credentials: 'include',
    })
  } catch (e) {
    if (e instanceof Error && (e.message.includes('401') || e.message.includes('Unauth'))) {
      return null
    }

    throw e
  }
}

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ['current-user'],
    staleTime: 7 * 24 * 60 * 60 * 1000,
    queryFn: getCurrentUser,
  })
}
