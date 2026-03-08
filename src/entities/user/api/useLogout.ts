import { httpClient } from '@/shared/api/httpClient'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'

export const logout = async () =>
  httpClient<void>('auth/logout', {
    method: 'POST',
    credentials: 'include',
  })

export const useLogout = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: logout,
    onSuccess: async () => {
      queryClient.setQueryData(['current-user'], null)
      await router.replace({ name: 'login' })
    },
  })
}
