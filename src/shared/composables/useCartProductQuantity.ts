import { useGetCart } from '@/entities/cart/api/useGetCart'
import { computed, unref, type MaybeRef } from 'vue'
import { useCart } from './useCart'

export const useCartProductQuantity = (productId: MaybeRef<string>) => {
  const { items } = useCart()

  const quantity = computed(() => {
    const id = unref(productId)
    return items.value.find((item) => item.productId === id)?.quantity ?? 0
  })

  const isInCart = computed(() => quantity.value > 0)

  return {
    quantity,
    isInCart,
  }
}
