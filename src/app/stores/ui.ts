import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('ui', {
  state: () => ({
    isCartDrawerOpen: false,
  }),

  actions: {
    toggleCartDrawer() {
      this.isCartDrawerOpen = !this.isCartDrawerOpen
    },
  },
})
