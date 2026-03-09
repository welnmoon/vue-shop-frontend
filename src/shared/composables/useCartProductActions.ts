import type { CartWithItems } from '@/entities/cart/model/types.api'
import { useDeleteCartItem } from '@/features/DeleteCartItem/api/useDeleteCartItem'
import { useUpdateCartItem } from '@/features/UpdateCartItem/api/useUpdateCartItem'
import type { Ref } from 'vue'

export const useCartProductActions = (
  cart: Ref<CartWithItems, CartWithItems> | Ref<undefined, undefined>,
) => {
  const { mutate: updateCartItem, isPending: updateCartItemPending } = useUpdateCartItem()
  const { mutate: deleteCartItem, isPending: deleteCartItemPending } = useDeleteCartItem()

  const handleIncrease = (id: string) => {
    const quantity = cart.value?.items.find((i) => i.id === id)?.quantity
    updateCartItem({ dto: { quantity: quantity ? quantity + 1 : 1 }, itemId: id })
  }

  const handleDecrease = (id: string) => {
    const quantity = cart.value?.items.find((i) => i.id === id)?.quantity
    updateCartItem({ dto: { quantity: quantity ? quantity - 1 : 1 }, itemId: id })
  }

  const handleRemove = (id: string) => {
    deleteCartItem({ itemId: id })
  }

  return {
    handleIncrease,
    handleDecrease,
    handleRemove,
  }
}
