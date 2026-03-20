import { useGetGuestOrders } from '@/entities/order/api/useGetGuestOrders'
import { useGetUserOrders } from '@/entities/order/api/useGetUserOrders'
import { useGetCurrentUser } from '@/entities/user/api/useGetCurrentUser'
import { getGuestOrdersAccess } from '@/features/CreateOrder/lib/guest-order'
import { computed } from 'vue'

export const useOrders = () => {
  const { data: user, isLoading: userIsLoading } = useGetCurrentUser()

  const isAuthenticated = computed(() => Boolean(user.value))

  const guestAccessList = computed(() => getGuestOrdersAccess() ?? [])

  const canLoadGuestOrders = computed(() => !userIsLoading.value && !isAuthenticated.value)
  const canLoadUserOrders = computed(() => !userIsLoading.value && isAuthenticated.value)

  const guestOrdersQuery = useGetGuestOrders(guestAccessList, canLoadGuestOrders)
  const userOrdersQuery = useGetUserOrders(canLoadUserOrders)

  const orders = computed(() =>
    isAuthenticated.value
      ? (userOrdersQuery.data.value ?? [])
      : (guestOrdersQuery.data.value ?? []),
  )

  const isLoading = computed(() => {
    if (userIsLoading.value) {
      return true
    }

    return isAuthenticated.value ? userOrdersQuery.isLoading.value : guestOrdersQuery.isLoading.value
  })

  const isError = computed(() =>
    isAuthenticated.value ? userOrdersQuery.isError.value : guestOrdersQuery.isError.value,
  )

  const error = computed(() =>
    isAuthenticated.value ? userOrdersQuery.error.value : guestOrdersQuery.error.value,
  )

  const refetch = () => {
    return isAuthenticated.value ? userOrdersQuery.refetch() : guestOrdersQuery.refetch()
  }

  return { orders, isLoading, isError, error, refetch, isAuthenticated }
}
