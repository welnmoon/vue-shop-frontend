<script setup lang="ts">
import { useUIStore } from '@/app/stores/ui'
import { useCart } from '@/shared/composables/useCart'
import CartDrawer from '../CartDrawer/CartDrawer.vue'
import BaseText from '@/shared/ui/BaseHeading/BaseText.vue'

const { totalCount, isLoading } = useCart()

const uiStore = useUIStore()
</script>

<template>
  <header class="w-full border-b bg-white">
    <div class="w-full px-4">
      <div class="max-w-7xl mx-auto flex items-center h-14 gap-4 md:gap-7 lg:gap-10">
        <BaseText text="Vue shop" level="h3" class="text-md font-semibold shrink-0" />

        <nav class="flex gap-3 md:gap-5 text-sm text-gray-700">
          <RouterLink to="/" class="hover:text-black">Home</RouterLink>
          <RouterLink to="/about" class="hover:text-black">About</RouterLink>
          <RouterLink to="/" class="hover:text-black">Contact</RouterLink>
        </nav>

        <div class="flex items-center gap-3 md:gap-4 ml-auto">
          <RouterLink to="/login"><i class="pi pi-user cursor-pointer text-base"></i></RouterLink>
          <button
            type="button"
            class="relative cursor-pointer text-base"
            @click="uiStore.toggleCartDrawer"
          >
            <i class="pi pi-shopping-cart"></i>
            <div
              class="absolute top-0 w-4 h-4 text-xs -right-2 -translate-y-1/2 bg-red-600 text-white rounded-full flex items-center justify-center"
            >
              {{ isLoading ? 0 : totalCount }}
            </div>
          </button>
        </div>
      </div>
    </div>
  </header>

  <CartDrawer v-model="uiStore.isCartDrawerOpen" />
</template>
