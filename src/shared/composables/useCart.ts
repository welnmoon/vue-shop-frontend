import { useCartStore } from '@/app/stores/cart'
import { useGetCart } from '@/entities/cart/api/useGetCart'
import {
  mapLocalCartItemsToCartLines,
  mapServerCartItemsToCartLines,
} from '@/entities/cart/lib/mappers'
import type { CartLine } from '@/entities/cart/model/types'
import type { Product } from '@/entities/product/model/types.api'
import { useGetCurrentUser } from '@/entities/user/api/useGetCurrentUser'
import { useAddCartItem } from '@/features/CreateCartItem/api/useAddCartItem'
import { useDeleteCartItem } from '@/features/DeleteCartItem/api/useDeleteCartItem'
import { useUpdateCartItem } from '@/features/UpdateCartItem/api/useUpdateCartItem'
import { storeToRefs } from 'pinia'
import { computed, type ComputedRef } from 'vue'

export const useCart = () => {
  const { data: currentUser, isLoading: currentUserIsLoading } = useGetCurrentUser()
  const { mutate: addCartItem, isPending: addItemPending } = useAddCartItem()
  const { mutate: deleteCartItem, isPending: deleteItemPending } = useDeleteCartItem()
  const { mutate: updateCartItem, isPending: updateItemPending } = useUpdateCartItem()
  const { data: serverCart, isLoading: serverCartIsLoading } = useGetCart()

  const cartStore = useCartStore()
  const { items: localCartItems } = storeToRefs(cartStore)

  const isAuthenticated = computed(() => !!currentUser.value)
  const isLoading = computed(() => currentUserIsLoading.value && serverCartIsLoading.value)

  const items: ComputedRef<CartLine[]> = computed(() => {
    if (isAuthenticated.value) {
      return mapServerCartItemsToCartLines(serverCart.value?.items ?? [])
    }

    return mapLocalCartItemsToCartLines(localCartItems.value)
  })

  const totalCount = computed(() => {
    return items.value.reduce((acc, item) => acc + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return items.value.reduce((acc, item) => acc + item.price * item.quantity, 0)
  })

  const getItem = (item?: Product) => {
    if (!item) return undefined
    return items.value.find((i) => i.productId === item.id)
  }

  const addItem = (product: Product) => {
    if (isAuthenticated.value) {
      addCartItem({ productId: product.id, quantity: 1 })
    } else {
      cartStore.addItem(product)
    }
  }

  const removeItem = (item: CartLine) => {
    if (isAuthenticated.value) {
      deleteCartItem({ itemId: item.itemId! })
    } else {
      cartStore.removeItem(item.productId)
    }
  }

  const increaseItem = (item: CartLine) => {
    const quantity = items.value?.find((i) => i.productId === item.productId)?.quantity
    const nextQuantity = quantity ? quantity + 1 : 1
    if (isAuthenticated.value) {
      if (!item.itemId) return
      updateCartItem({ dto: { quantity: nextQuantity }, itemId: item.itemId })
    } else {
      cartStore.increaseItem(item.productId)
    }
  }

  const decreaseItem = (item: CartLine) => {
    const quantity = items.value?.find((i) => i.productId === item.productId)?.quantity
    const nextQuantity = quantity ? quantity - 1 : 1
    if (isAuthenticated.value) {
      if (!item.itemId) return
      if (nextQuantity < 1) {
        deleteCartItem({ itemId: item.itemId })
        return
      }
      updateCartItem({ dto: { quantity: nextQuantity }, itemId: item.itemId })
    } else {
      cartStore.decreaseItem(item.productId)
    }
  }

  return {
    items,
    totalCount,
    totalPrice,
    isLoading,
    addItem,
    removeItem,
    increaseItem,
    decreaseItem,
    addItemPending,
    deleteItemPending,
    updateItemPending,
    getItem,
  }
}
