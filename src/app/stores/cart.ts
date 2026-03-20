import { defineStore } from 'pinia'
import type { LocalCartItem } from './types'
import type { Product } from '@/entities/product/model/types.api'

export type CartState = LocalCartItem[]
function loadCart(): CartState {
  const raw = localStorage.getItem('cart')

  if (!raw) return []

  try {
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function findCartItem(items: CartState, id: string | number) {
  return items.find((item) => String(item.productId) === String(id))
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: loadCart() as CartState,
  }),

  getters: {
    itemsCount: (state) => state.items.reduce((acc, item) => acc + item.quantity, 0),

    totalPrice: (state) => state.items.reduce((acc, item) => acc + item.price * item.quantity, 0),

    getItems: (state) => state.items,

    getItemById: (state) => (id: string | number) => findCartItem(state.items, id),

    getItemQuantity: (state) => (id: string | number) => findCartItem(state.items, id)?.quantity,

    getCartPrice: (state) => state.items.reduce((acc, i) => acc + i.price * i.quantity, 0),
  },

  actions: {
    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.items))
    },
    addItem(product: Product) {
      const existing = findCartItem(this.items, product.id)

      if (existing) {
        this.increaseItem(product.id)
      } else {
        this.items.push({ ...product, quantity: 1, productId: product.id })
        this.saveCart()
      }
    },

    removeItem(id: string | number) {
      this.items = this.items.filter((item) => String(item.productId) !== String(id))

      this.saveCart()
    },

    decreaseItem(id: string | number) {
      const existing = findCartItem(this.items, id)

      if (existing && existing.quantity > 1) {
        existing.quantity--
      } else {
        this.removeItem(id)
      }

      this.saveCart()
    },

    increaseItem(id: string | number) {
      const existing = findCartItem(this.items, id)

      if (existing) {
        existing.quantity++
        this.saveCart()
      }
    },

    clearCart() {
      this.items = []
      this.saveCart()
    },
  },
})
