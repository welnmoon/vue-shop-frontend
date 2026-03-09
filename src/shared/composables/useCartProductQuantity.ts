import { useGetCart } from '@/entities/cart/api/useGetCart'
import { computed, unref, type MaybeRef } from 'vue'

export const useCartProductQuantity = (productId: MaybeRef<string>) => {
  const { data: cart } = useGetCart()

  const quantity = computed(() => {
    const id = unref(productId)
    return cart.value?.items.find((item) => item.productId === id)?.quantity ?? 0
  })

  const isInCart = computed(() => quantity.value > 0)

  return {
    quantity,
    isInCart,
  }
}
