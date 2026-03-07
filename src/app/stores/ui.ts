import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('ui', {
  state: () => ({
    isCartDrawerOpen: false,
  }),

  actions: {
    openCartDrawer() {
      this.isCartDrawerOpen = true
      lockScroll()
    },

    closeCartDrawer() {
      this.isCartDrawerOpen = false
      unlockScroll()
    },
    toggleCartDrawer() {
      this.isCartDrawerOpen ? this.closeCartDrawer() : this.openCartDrawer()
    },
  },
})

const setOverflow = (value: string) => {
  document.documentElement.style.overflow = value
  document.body.style.overflow = value

  document.querySelector('#app')?.setAttribute('style', `overflow:${value}`)
  document.querySelector('.v-main')?.setAttribute('style', `overflow:${value}`)
  document.querySelector('.v-application__wrap')?.setAttribute('style', `overflow:${value}`)
}
export const lockScroll = () => setOverflow('hidden')
export const unlockScroll = () => setOverflow('')
