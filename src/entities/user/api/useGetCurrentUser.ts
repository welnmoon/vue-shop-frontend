import { httpClient, HttpError } from '@/shared/api/httpClient'
import { useQuery } from '@tanstack/vue-query'
import type { PublicUserDto } from '../model/types.api'
import { userApi } from './api'

export const getCurrentUser = async () => {
  try {
    return await httpClient<PublicUserDto>(userApi.getCurrentUser.url(), {
      method: 'GET',
      credentials: 'include',
    })
  } catch (e) {
    if (e instanceof HttpError && e?.status === 401) {
      return null
    }
    throw e
  }
}

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ['current-user'],
    staleTime: 5 * 60 * 1000,
    queryFn: getCurrentUser,
  })
}
