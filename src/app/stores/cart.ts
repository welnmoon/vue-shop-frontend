import { defineStore } from 'pinia'
import type { LocalCartItem } from './types'
import type { Product } from '@/entities/product/model/types.api'

export type CartState = LocalCartItem[]
// Проблема, когда нет auth локальная корзина работает не верно
// Также при добавлении карт item локально корзина продолжает зарпашивать данные с бэка
function loadCart(): CartState {
  const raw = localStorage.getItem('cart')

  if (!raw) return []

  try {
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function findCartItem(items: CartState, id: string) {
  return items.find((item) => item.productId === id)
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: loadCart() as CartState,
  }),

  getters: {
    itemsCount: (state) => state.items.reduce((acc, item) => acc + item.quantity, 0),

    totalPrice: (state) => state.items.reduce((acc, item) => acc + item.price * item.quantity, 0),

    getItems: (state) => state.items,

    getItemById: (state) => (id: string) => findCartItem(state.items, id),

    getItemQuantity: (state) => (id: string) => findCartItem(state.items, id)?.quantity,

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

    removeItem(id: string) {
      this.items = this.items.filter((item) => item.productId !== id)

      this.saveCart()
    },

    decreaseItem(id: string) {
      const existing = findCartItem(this.items, id)

      if (existing && existing.quantity > 1) {
        existing.quantity--
      } else {
        this.removeItem(id)
      }

      this.saveCart()
    },

    increaseItem(id: string) {
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
