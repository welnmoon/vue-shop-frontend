import { defineStore } from 'pinia'
import { ref } from 'vue'

type DismissedMap = Record<string, boolean>
const dismissedBlockKey = 'dismissed-ui-blocks'

const loadDismissedBlocks = (): DismissedMap => {
  const raw = localStorage.getItem(dismissedBlockKey)

  if (!raw) return {}

  try {
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

export const useUIStore = defineStore('ui', {
  state: () => ({
    isCartDrawerOpen: false,
    dismissedBlocks: loadDismissedBlocks(),
  }),

  getters: {
    isBlockDismissed: (state) => (id: string) => !!state.dismissedBlocks[id],
  },

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

    // dismissed blocks
    saveDismissed() {
      localStorage.setItem(dismissedBlockKey, JSON.stringify(this.dismissedBlocks))
    },

    dismissBlock(id: string) {
      this.dismissedBlocks[id] = true
      this.saveDismissed()
    },

    resetBlock(id: string) {
      delete this.dismissedBlocks[id]
      this.saveDismissed()
    },

    resetAllDismissed() {
      this.dismissedBlocks = {}
      this.saveDismissed()
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
